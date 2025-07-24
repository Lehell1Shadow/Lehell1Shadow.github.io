'use strict';

var flatpickrFechaMov;

$(document).ready(function () {
    if ($('#ajax-table').length) {

        $.getJSON(rootUrl + '/json/TableLanguage.json', function (data) {
            console.log("Table language success");
        })
            .always(function (data) {
                BuildTable(data);
            });

        //Initialize flat datepicker
        flatpickrFechaMov = flatpickr('#Fecha_Movimiento_Formatted', {
            mode: "single",
            altInput: true,
            dateFormat: "d/m/Y",
            altFormat: "d/m/Y",
            allowInput: true,
            disableMobile: true,
            locale: {
                firstDayOfWeek: 1
            }
        });

        $("#limpiarCuenta").click(function () {
            $("#Cuenta_Receptora_Id").val("0");
            $("#Cuenta").val("");
            $("#Referencia").val("");
            $("#Cuenta").prop("readonly", false);
        });

        $("#Cuenta").autocomplete({
            source: function (request, response) {
                $.ajax({
                    url: rootUrl + '/CuentasReceptoras/CuentaReceptora/Buscar',
                    type: 'POST',
                    dataType: "json",
                    data: {
                        filtro: request.term
                    },
                    beforeSend: function (xhr) {
                        $('#loaderCuenta').show();
                    },
                    success: function (data) {                        
                        response($.map(data, function (item) {
                            return {
                                label: item.cuenta + ' [ ' + item.clave_Referencia + '-' + item.referencia +' ]',
                                value: item.cuenta,
                                id: item.cuenta_Receptora_Id,
                                referencia: item.clave_Referencia+'-'+item.referencia,
                            };
                        }));

                        $('#loaderCuenta').hide();
                    }
                });
            },
            minLength: 5,
            select: function (event, ui) {
                $("#Cuenta_Receptora_Id").val(ui.item.id);
                $("#Referencia").val(ui.item.referencia);
                $("#Cuenta").prop("readonly", true);
            }
        });

        $('#Concepto_Id').on('change', function () {
            var tipoId = $(this).find('option:selected').attr('tipo-id');
            $('#TipoId').val(tipoId).change();
        });

        $('#btnLimpiar').on('click', () => {
            $('#Concepto_Id').val(0).change();
            $('#TipoId').val("C").change();
            $('#Monto').val(0);
            $('#Monto').val(0);
            flatpickrFechaMov.clear();
            $('#Motivo').val('');            
        });

        $('#agregar').on('click', () => {
            ValidateAdd();
        });

        $('#guardar').on('click', () => {
            ValidateGuardar();
        });
    }

    $('.autonumber').autoNumeric('init');  
    
    SetSelectedMenu('#menu_NuevoMovimientoCR');
});

function BuildTable(tableLanguage) {
    var table = $('#ajax-table').DataTable({
        responsive: true,
        processing: true,
        serverSide: false,
        ajax: {
            url: rootUrl + '/CuentasReceptoras/Movimiento/ObtenerMovimientosPorCuentaReceptora',
            type: 'POST',
            data: function (d) {
                d.cuentaReceptoraId = -1;
            }
        },
        "language": tableLanguage,
        dom: 'Bftlip',
        "buttons": [
            {
                text: '<i class="fa fa-trash fa-2x"></i>',
                titleAttr: 'Remover',
                action: function (e, dt, node, config) {
                    deleteModal(table, 'Remover', false);
                },
                enabled: false,
            }
        ],
        "columnDefs": [
            {
                targets: 0,
                data: null,
                defaultContent: '',
                orderable: false,
                "searchable": false,
                className: 'select-checkbox'
            },
            {
                "targets": [0, 1, 5, 8],
                "visible": false,
                "searchable": false
            }
        ],
        select: {
            style: 'multi'
        },
        "columns": [
            { "data": "movimiento_CR_Id" },            
            { "data": "cuenta_Receptora_Id" },
            {
                "data": "fecha",
                render: function (data, type, row) {
                    var date = new Date(data.replace(/-/g, '\/').replace(/T.+/, ''));
                    var month = date.getMonth() + 1;
                    return date.getDate() + "/" + (month.toString().length > 1 ? month : "0" + month) + "/" + date.getFullYear();
                },
            },
            { "data": "cuenta" },
            { "data": "referencia" },
            { "data": "concepto_Id" },
            { "data": "concepto" },            
            { "data": "monto" },
            { "data": "tipoId" },
            { "data": "tipo" },
            { "data": "fecha_Movimiento_Formatted" },            
            { "data": "motivo" }            
        ]
    });

    onSelectEvent(table);
}

//Events
function onSelectEvent(table) {
    table.on('select', function (e, dt, type, indexes) {
        if (type === 'row') {
            var count = table.rows({ selected: true }).count();
            if (count === 1) {
                var buttons = table.buttons([0]); //Desactivar
                buttons.enable();
            }
        }
    });

    table.on('deselect', function (e, dt, type, indexes) {
        if (type === 'row') {
            var rows = dt.rows({ selected: true }).count();
            if (rows === 0) {
                var buttons = table.buttons([0]);
                buttons.disable();
            }
        }
    });
}

var confirmChangesModal = function () {
    swal({
        id: "confirmModal",
        title: "Confirmar cambios",
        text: "¿Estás seguro(a) de guardar los cambios?",
        type: "info",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true
    }, function () {
        var form = document.querySelector("form#crearEditar");
        HandleFormSubmit(form);
    });
};

var deleteModal = function (table, mensaje, activo) {
    var count = table.rows({ selected: true }).count();
    swal({
        title: mensaje,
        text: "Estás seguro(a) de remover " + count + " movimientos(s)?",
        type: "info",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        showCancelButton: true,
        closeOnConfirm: true,
        showLoaderOnConfirm: false
    }, function () {
        RemoverMovimientos(table);
    });
};

function RemoverMovimientos(table) {
    table
        .rows({ selected: true })
        .remove()
        .draw();    

    var buttons = table.buttons([0]);
    buttons.disable();
}

function ValidateAdd() {
    var mensaje = '';
    var flag = true;
    var cuentaReceptoraId = $("#Cuenta_Receptora_Id").val();
    var conceptoId = $("#Concepto_Id").val();
    var monto = $("#Monto").val().replace(/[^0-9.-]+/g, "");
    var fecha = $('#Fecha_Movimiento_Formatted').val();

    if (cuentaReceptoraId == '0') {
        flag = false;
        mensaje += '*Favor de seleccionar una cuenta receptora\n';
    }

    if (conceptoId == '0') {
        flag = false;
        mensaje += '*Favor de seleccionar un concepto\n';
    }    

    if (monto <= 0) {        
        flag = false;
        mensaje += '*El monto solicitado no puede ser cero, favor de verficar\n';
    }

    if (fecha.length <= 0) {
        flag = false;
        mensaje += '*Favor de seleccionar una fecha de movimiento\n';
    }

    if (flag) {
        AgregaMovimiento();
    }
    else
        swal("Mensaje", mensaje, "warning");
}

function AgregaMovimiento() {
    var table = $('#ajax-table').DataTable();

    table.rows.add([{
        "movimiento_CR_Id": $('#Movimiento_CR_Id').val(),        
        "cuenta_Receptora_Id": $('#Cuenta_Receptora_Id').val(),
        "concepto_Id": $('#Concepto_Id option:selected').val(),
        "concepto": $('#Concepto_Id option:selected').text(),
        "fecha": $('#Fecha option:selected').val(),
        "fecha_Movimiento_Formatted": $('#Fecha_Movimiento_Formatted').val(),
        "monto": $('#Monto').val(),        
        "tipoId": $('#TipoId option:selected').val(),
        "tipo": $('#TipoId option:selected').text(),
        "motivo": $('#Motivo').val(),        
        "cuenta": $('#Cuenta').val(),
        "referencia": $('#Referencia').val()        
    }])
        .draw();

    $('#Monto').val(0);
    flatpickrFechaMov.clear();
    $('#Motivo').val('');
}

function ValidateGuardar() {
    var table = $('#ajax-table').DataTable();
    var count = table.rows().count();
    
    if (count > 0) {
        swal({
            id: "confirmModal",
            title: "Confirmar cambios",
            text: "¿Estás seguro(a) de guardar los movimientos?",
            type: "info",
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true
        }, function () {
            GuardarMovimientos();
        });
    }
    else
        swal("Mensaje", "*Favor de agregar al menos un movimiento.", "warning");
}

function GuardarMovimientos() {
    var data = $('#ajax-table').DataTable()
        .rows()
        .data();

    var movimientos = new Array();
    for (var i = 0; i < data.length; i++) {
        var movimiento = {
            "Movimiento_CR_Id": data[i].movimiento_CR_Id,
            "Sucursal_Id": data[i].sucursal_Id,
            "Cuenta_Receptora_Id": data[i].cuenta_Receptora_Id,
            "Concepto_Id": data[i].concepto_Id,
            "Concepto": data[i].concepto,
            "Fecha": data[i].fecha,
            "Fecha_Movimiento_Formatted": data[i].fecha_Movimiento_Formatted,
            "Monto": data[i].monto,
            "Cargo": data[i].cargo,
            "TipoId": data[i].tipoId,
            "Tipo": data[i].tipo,            
            "Motivo": data[i].motivo,                        
            "Cuenta": data[i].cuenta,
            "Referencia": data[i].referencia,
            "Clave": data[i].clave,
            "Descripcion": data[i].descripcion
        };
        movimientos.push(movimiento);
    }

    $.ajax({
        method: "POST",
        url: rootUrl + "/CuentasReceptoras/Movimiento/GuardarMovimientos",
        data: {
            "movimientos": movimientos
        }
    })
        .done(function (msg) {
            swal(msg);
            window.location.href = rootUrl + '/CuentasReceptoras/Movimiento/';
        });
} 
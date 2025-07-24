'use strict';

$(document).ready(function () {
    $.getJSON(rootUrl + '/json/TableLanguage.json', function (data) {
        console.log("Table language success");
    })
        .always(function (data) {
            BuildTable(data);
        });    

    $("#Concepto_Id").change(function () {
        var table = $('#ajax-table').DataTable();
        table.ajax.reload();
    });

    $("#tipo_cuenta_list_filter").change(function () {
        var table = $('#ajax-table').DataTable();
        table.ajax.reload();
    });

    SetSelectedMenu('#menu_MovimientosCR');
});

//Initialize table
function BuildTable(tableLanguage) {
    var table = $('#ajax-table').DataTable({
        responsive: true,
        processing: true,
        serverSide: false,
        ajax: {
            url: rootUrl + '/CuentasReceptoras/Movimiento/Obtener',
            type: 'POST',
            data: function (d) {
                d.tipoCuentaId = $('#tipo_cuenta_list_filter').val();
                d.conceptoId = $('#Concepto_Id').val();
                d.activo = $('#movimiento_activo_filter').is(":checked");                
            }
        },
        "language": tableLanguage,
        dom: 'Bftlip',
        "buttons": [
            {
                text: '<i class="fa fa-plus-square fa-2x"></i>',
                titleAttr: 'Nuevo',
                action: function (e, dt, node, config) {
                    window.location.href = rootUrl + '/CuentasReceptoras/Movimiento/Nuevo';
                }
            },
            {
                text: '<i class="fa fa-pencil-square-o fa-2x"></i>',
                titleAttr: 'Editar',
                action: function (e, dt, node, config) {
                    var dataRows = table.rows({ selected: true }).data();
                    window.location.href = rootUrl + '/CuentasReceptoras/Movimiento/Editar?id=' + dataRows[0].movimiento_CR_Id;
                },
                enabled: false
            },
            {
                text: '<i class="fa fa-trash fa-2x"></i>',
                titleAttr: 'Eliminar',
                action: function (e, dt, node, config) {
                    deleteModal(table, 'Eliminar', false);
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
                "targets": [0],
                "visible": false,
                "searchable": false
            }
        ],
        select: {
            style: 'multi'
        },
        "columns": [
            { "data": "movimiento_CR_Id" },
            {
                "data": "semana",
                render: function (data, type, row) {
                    var date = new Date(data.replace(/-/g, '\/').replace(/T.+/, ''));
                    var month = date.getMonth() + 1;
                    return date.getDate() + "/" + (month.toString().length > 1 ? month : "0" + month) + "/" + date.getFullYear();
                },
            },
            { "data": "cuenta" },           
            {
                "data": "referencia",
                render: function (data, type, row) {                    
                    return row.clave_Referencia+'-'+data;
                },
            },
            {
                "data": "concepto",
                render: function (data, type, row) {
                    return row.clave_Concepto+ '-' + data;
                },
            },
            {
                "data": "fecha_Movimiento",
                render: function (data, type, row) {
                    var date = new Date(data.replace(/-/g, '\/').replace(/T.+/, ''));
                    var month = date.getMonth() + 1;
                    return date.getDate() + "/" + (month.toString().length > 1 ? month : "0" + month) + "/" + date.getFullYear();
                },
            },            
            {
                "data": "monto",
                render: $.fn.dataTable.render.number(',', '.', 2, '$').display
            },
            { "data": "tipo" },
            { "data": "motivo" },
            { "data": "usuario_Registro" },
            { "data": "fecha_Registro" }
        ]
    });

    onSelectEvent(table);
}

var deleteModal = function (table, mensaje) {
    var count = table.rows({ selected: true }).count();
    swal({
        title: mensaje,
        text: "Estás seguro(a) de " + mensaje.toLowerCase() + " " + count + " movimiento(s)?",
        type: "info",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true
    }, function () {
        DeleteMovimientos(table);
    });
};

function DeleteMovimientos(table, activo) {
    var dataRows = table.rows({ selected: true }).data();
    var id = new Array();
    for (var i = 0; i < dataRows.length; i++) {
        id.push(dataRows[i].movimiento_CR_Id);
    }

    $.ajax({
        method: "POST",
        url: rootUrl + "/CuentasReceptoras/Movimiento/Eliminar",
        data: {
            "ids": id            
        }
    })
        .done(function (msg) {
            table.ajax.reload();
            swal(msg);
        });
}

//Events
function onSelectEvent(table) {
    table.on('select', function (e, dt, type, indexes) {
        if (type === 'row') {          
            var count = table.rows({ selected: true }).count();
            if (count === 1) {
                var buttons = table.buttons([1, 2]); //Editar, Eliminar
                buttons.enable();
            }
            else {
                var editButton = table.buttons([1]); //Editar
                editButton.disable();
            }
        }
    });

    table.on('deselect', function (e, dt, type, indexes) {
        if (type === 'row') {
            var rows = dt.rows({ selected: true }).count();
            if (rows === 0) {
                var buttons = table.buttons([1, 2]); //Editar, Eliminar

                buttons.disable();
            }
            else if (rows === 1) {
                var buttons = table.buttons([1, 2]); //Editar, Eliminar
                buttons.enable();
            }
        }
    });
} 
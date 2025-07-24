
'use strict';

$(document).ready(function () {
    $.getJSON(rootUrl + '/json/TableLanguage.json', function (data) {
        console.log("Table language success");
    })
        .always(function (data) {
            BuildTable(data);
        });    

    // Hook up the form so we can prevent it from being posted
    var form = document.querySelector("form#credit_type_edit");
    form.addEventListener("submit", function(ev) {
        ev.preventDefault();
        handleFormSubmit(form);
    });

    $("#credit_type_activo_filter").change(function () {
        var table = $('#ajax-table').DataTable();
        table.ajax.reload();

        var buttons = table.buttons([0, 1, 2, 3]);
        var checked = $(this).is(':checked');

        if (checked) {
            buttons[1].node.className = "dt-button disabled";
            buttons[2].node.className = "dt-button disabled";
            buttons[3].node.className = "d-none";
        }
        else {
            buttons[1].node.className = "dt-button disabled";
            buttons[2].node.className = "d-none";
            buttons[3].node.className = "dt-button disabled";
        }
    });  

    SetSelectedMenu('#menu_TipoCredito');
});

// Validation
// These are the constraints used to validate the form
var constraints = {
    clave: {
        presence: true,
        length: {
            minimum: 1,
            maximum: 50
        }
    },
    descripcion: {
        presence: true,
        length: {
            minimum: 1,
            maximum: 50
        }
    },
    plazo: {
        presence: true,
        numericality: {
            onlyInteger: true
        }
    },
    incremento: {
        presence: true,
        numericality: {
            onlyNumeric: true
        }
    },
    monto_inicial: {
        presence: true,
        numericality: {
            onlyNumeric: true
        }
    },
    monto_tope: {
        presence: true,
        numericality: {
            onlyNumeric: true
        }
    },
    limite_fallas: {
        presence: true,
        numericality: {
            onlyInteger: true
        }
    },
    interes: {
        presence: true,
        numericality: {
            onlyNumeric: true
        }
    },
};

// Hook up the inputs to validate on the fly
var inputs = document.querySelectorAll("input, textarea, select")
var form = document.querySelector("form#credit_type_edit");
for (var i = 0; i < inputs.length; ++i) {
    inputs.item(i).addEventListener("change", function(ev) {
        var errors = validate(form, constraints) || {};
        showErrorsForInput(this, errors[this.name]);
    });
}

function HandleFormSubmit(form) {
    var selectErrors = false;

    var errors = validate(form, constraints);
    // then we update the form to reflect the results
    showErrors(form, errors || {});

    $("#periodicidad_messages").empty();
    var value = $("#periodicidad_list").val();
    if (value === "0") {
        $("#periodicidad_messages")
            .append('<p class="text-danger error">Favor de seleccionar una periodicidad</p>');
        selectErrors = true;
    }

    if (!errors && !selectErrors) {
        SaveCreditType();
    } else {
        swal("Favor de corregir los errores");
        setTimeout(function () {
            $(".confirm").prop("disabled", false);
        }, 100);
    }
}

function SaveCreditType() {
    var creditType = {
        Tipo_Credito_Id: $("#tipo_credito_id").val(),
        Periodicidad_Id: $("#periodicidad_list").val(),
        Clave: $("#clave").val(),
        Descripcion: $("#descripcion").val(),
        Plazo: $("#plazo").val(),
        Incremento: $("#incremento").val(),
        Monto_Inicial: $("#monto_inicial").val(),
        Monto_Tope: $("#monto_tope").val(),
        Limite_Fallas: $("#limite_fallas").val(),
        Interes: $("#interes").val(),
        Cantidad_Sucursales: 0,
        Activo: $("#credit_type_edit_activo").is(":checked")        
    };

    var table = $('#ajax-table').DataTable();
    var buttons = table.buttons([1, 2, 3]); //Editar, Desactivar, Activar

    if (creditType.Tipo_Credito_Id === "" || creditType.Tipo_Credito_Id === "0") {
        $.ajax({
            method: "POST",
            url: rootUrl + "/Catalogos/TipoCredito/Guardar",
            data: {
                "tipoCredito": creditType
            },
            success: function (msg) {
                swal("Mensaje", msg, "success");
                $('#modal-credito').modal('hide');
                table.ajax.reload();
                buttons.disable();
            },
            error: function (msg) {
                swal("Error", msg, "error");
                setTimeout(function () {
                    $(".confirm").prop("disabled", false);
                }, 100);
            }
        });
    } else {
        $.ajax({
            method: "PUT",
            url: rootUrl + "/Catalogos/TipoCredito/Actualizar",
            data: {
                "tipoCredito": creditType
            },
            success: function (msg) {
                swal("Mensaje", msg, "success");
                $('#modal-credito').modal('hide');
                table.ajax.reload();
                buttons.disable();
            },
            error: function (msg) {
                swal("Error", msg, "error");
                setTimeout(function () {
                    $(".confirm").prop("disabled", false);
                }, 100);
            }
        });           
    }
}

function BuildTable(tableLanguage) {
    var table = $('#ajax-table').DataTable({
        responsive: true,
        processing: true,
        serverSide: false,
        ajax: {
            url: rootUrl + '/Catalogos/TipoCredito/Obtener',
            type: 'POST',
            data: function (d) {
                d.esActivo = $('#credit_type_activo_filter').is(":checked");
            }
        },
        "language": tableLanguage,
        dom: 'Bftlip',
        "buttons": [
            {
                text: '<i class="fa fa-plus-square fa-2x"></i>',
                titleAttr: 'Nuevo',
                action: function (e, dt, node, config) {
                    $(".form-control-cred").val("");
                    $(".js-example-basic-single-modal").val(0).change();

                    var switchActivo = $('#credit_type_edit_activo');
                    if (!switchActivo.is(":checked")) {
                        switchActivo.click();
                    }

                    $("#periodicidad_list").prop("disabled", false);

                    showErrors(form, {});   // Clean errors

                    $('.nav-tabs a[href="#general"]').tab('show');

                    var options = {
                        "backdrop": "static",
                        keyboard: true
                    };
                    $('#modal-credito').modal(options);
                    $('#modal-credito').modal('show'); 
                }
            },
            {
                text: '<i class="fa fa-pencil-square-o fa-2x"></i>',
                titleAttr: 'Editar',
                action: function (e, dt, node, config) {
                    UpdateCreditTypes(table);
                },
                enabled: false
            },
            {
                text: '<i class="fa fa-toggle-off fa-2x"></i>',
                titleAttr: 'Desactivar',
                action: function (e, dt, node, config) {
                    deleteModal(table, 'Desactivar', false);
                },
                enabled: false,
            },
            {
                text: '<i class="fa fa-toggle-on fa-2x"></i>',
                titleAttr: 'Activar',
                action: function (e, dt, node, config) {
                    deleteModal(table, 'Activar', true);
                },
                enabled: false,
                className: "d-none"
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
                "targets": [0, 1, 12, 13, 14, 15],
                "visible": false,
                "searchable": false
            }
        ],
        select: {
            style: 'multi'
        },
        "columns": [
            { "data": "tipo_Credito_Id" },
            { "data": "periodicidad_Id" },
            { "data": "clave" },
            { "data": "descripcion" },
            { "data": "periodicidad" },      
            { "data": "plazo" },              
            {
                "data": "incremento",
                render: $.fn.dataTable.render.number(',', '.', 2, '$').display
            },
            {
                "data": "monto_Inicial",
                render: $.fn.dataTable.render.number(',', '.', 2, '$').display
            },            
            {
                "data": "monto_Tope",
                render: $.fn.dataTable.render.number(',', '.', 2, '$').display
            },
            { "data": "limite_Fallas" },
            { "data": "interes" },
            {
                "data": "activo",
                render: function (data, type, row) {
                    return PrintCheckbox(data, type, row);
                },
                className: "dt-body-center"
            },
            { "data": "usuario_Registro" },
            { "data": "usuario_Modifico" },
            { "data": "fecha_Registro" },
            { "data": "fecha_Modificacion" }
        ]
    });

    onSelectEvent(table);
}

var confirmChangesModal = function () {
    swal({
        id: "confirmModal",
        title: "Confirmar cambios",
        text: "¿Estás seguro de realizar los cambios?",
        type: "info",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true
    }, function () {
        var form = document.querySelector("form#credit_type_edit");
        HandleFormSubmit(form);
    });
};

var deleteModal = function (table, mensaje, activo) {
    var count = table.rows({ selected: true }).count();
    swal({
        title: mensaje + " tipo de crédito",
        text: "Estás seguro(a) de " + mensaje.toLowerCase() + " " + count + " tipo de crédito(s)?",
        type: "info",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true
    }, function () {
            DeleteCreditTypes(table, activo);
    });
};

function UpdateCreditTypes(table) {
    showErrors(form, {});   // Clean errors

    $('.nav-tabs a[href="#general"]').tab('show');

    var dataRows = table.rows({ selected: true }).data();
    if (dataRows.length > 0) {
        var data = dataRows[0];
        $("#tipo_credito_id").val(data.tipo_Credito_Id);

        $("#periodicidad_list").val(data.periodicidad_Id).change();
        $("#periodicidad_list").prop("disabled", true);

        $("#clave").val(data.clave);
        $("#descripcion").val(data.descripcion);
        $("#plazo").val(data.plazo);
        $("#incremento").val(data.incremento);
        $("#monto_inicial").val(data.monto_Inicial);
        $("#monto_tope").val(data.monto_Tope);
        $("#limite_fallas").val(data.limite_Fallas);
        $("#interes").val(data.interes);

        var switchActivo = $('#credit_type_edit_activo');
        if (data.activo !== switchActivo.is(":checked")) {
            switchActivo.click();
        }

        var options = {
            "backdrop": "static",
            keyboard: true
        };
        $('#modal-credito').modal(options);
        $('#modal-credito').modal('show'); 
    }
}

function DeleteCreditTypes(table, activo) {
    var dataRows = table.rows({ selected: true }).data();
    var tipoCreditoIds = new Array();

    for (var i = 0; i < dataRows.length; i++) {
        tipoCreditoIds.push(dataRows[i].tipo_Credito_Id);
    }    

    $.ajax({
        method: "DELETE",
        url: rootUrl + "/Catalogos/TipoCredito/Eliminar",
        data: {
            "tipoCreditoIds": tipoCreditoIds,
            "activo": activo
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
            ////var data = table.rows(indexes).data();//.pluck('id');
            ////table.rows( { selected: true } ).indexes().length === 0
            var count = table.rows({ selected: true }).count();
            if (count === 1) {
                var buttons = table.buttons([1, 2, 3]); //Editar, Desactivar, Activar
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
                var buttons = table.buttons([1, 2, 3]); //Editar, Desactivar, Activar
                buttons.disable();
            }
            else if (rows === 1) {
                var buttons = table.buttons([1, 2, 3]); //Editar, Desactivar, Activar
                buttons.enable();
            }
        }
    });
} 
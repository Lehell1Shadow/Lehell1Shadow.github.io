'use strict';

$(document).ready(function () {
    $.getJSON(rootUrl + '/json/TableLanguage.json', function (data) {
        console.log("Table language success");
    })
        .always(function (data) {
            BuildTable(data);
        });

    //Hook up the form so we can prevent it from being posted
    var form = document.querySelector("form#concepto_edit");
    form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        handleFormSubmit(form);
    }); 

    $("#concepto_activo_filter").change(function () {
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
    
    SetSelectedMenu('#menu_Conceptos');
});

var constraints = {
    descripcion: {
        presence: true,
        length: {
            minimum: 1,
            maximum: 100
        }
    }
};

var inputs = document.querySelectorAll("input, textarea, select")
var form = document.querySelector("form#concepto_edit");
for (var i = 0; i < inputs.length; ++i) {
    inputs.item(i).addEventListener("change", function (ev) {
        var errors = validate(form, constraints) || {};
        showErrorsForInput(this, errors[this.name]);
    });
}

//Initialize table
function BuildTable(tableLanguage) {
    var table = $('#ajax-table').DataTable({
        responsive: true,
        processing: true,
        serverSide: false,
        ajax: {
            url: rootUrl + '/CuentasReceptoras/Concepto/Obtener',
            type: 'POST',
            data: function (d) {
                d.activo = $('#concepto_activo_filter').is(":checked");
            }
        },
        "language": tableLanguage,
        dom: 'Bftlip',
        "buttons": [
            {
                text: '<i class="fa fa-plus-square fa-2x"></i>',
                titleAttr: 'Nuevo',
                action: function (e, dt, node, config) {                    
                    $(".form-control-concepto").val("");                    
                    $("#concepto_id").val("-1")
                   
                    var switchCargo = $('#concepto_edit_cargo');
                    if (!switchCargo.is(":checked")) {
                        switchCargo.click();
                    }

                    var switchActivo = $('#concepto_edit_activo');
                    if (!switchActivo.is(":checked")) {
                        switchActivo.click();
                    }

                    showErrors(form, {});   // Clean errors

                    var options = {
                        "backdrop": "static",
                        keyboard: true
                    };
                    $('#modal-concepto').modal(options);
                    $('#modal-concepto').modal('show');
                }
            },
            {
                text: '<i class="fa fa-pencil-square-o fa-2x"></i>',
                titleAttr: 'Editar',
                action: function (e, dt, node, config) {
                    ObtenerDetalleConcepto(table);
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
                "targets": [0, 4, 6, 7, 8, 9],
                "visible": false,
                "searchable": false
            }
        ],
        select: {
            style: 'multi'
        },
        "columns": [
            { "data": "concepto_Id" },
            { "data": "clave" },
            { "data": "descripcion" },
            {
                "data": "cargo",
                render: function (data, type, row) {
                    return PrintCheckbox(data, type, row);
                }
            },
            { "data": "tipo" },
            {
                "data": "activo",
                render: function (data, type, row) {
                    return PrintCheckbox(data, type, row);
                }
            },
            { "data": "usuario_Registro" },
            { "data": "fecha_Registro" },
            { "data": "fecha_Registro" },
            { "data": "fecha_Modificacion" }
        ]
    });

    onSelectEvent(table);
}

var deleteModal = function (table, mensaje, activo) {
    var count = table.rows({ selected: true }).count();
    swal({
        title: mensaje,
        text: "Estás seguro(a) de " + mensaje.toLowerCase() + " " + count + " concepto(s)?",
        type: "info",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true
    }, function () {
        Delete(table, activo);
    });
};

function Delete(table, activo) {
    var dataRows = table.rows({ selected: true }).data();
    var id = new Array();
    for (var i = 0; i < dataRows.length; i++) {
        id.push(dataRows[i].concepto_Id);
    }

    $.ajax({
        method: "POST",
        url: rootUrl + "/CuentasReceptoras/Concepto/ActivarDesactivar",
        data: {
            "ids": id,
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

//Modal popup
var confirmChangesModal = function () {
    swal({
        id: "confirmModal",
        title: "Confirmar cambios",
        text: "¿Estás seguro(a) de realizar los cambios?",
        type: "info",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true
    }, function () {
        var form = document.querySelector("form#concepto_edit");
        HandleFormSubmit(form);
    });
};

//Commands
function HandleFormSubmit(form) {
    var selectErrors = false;

    var errors = validate(form, constraints);
    // then we update the form to reflect the results
    showErrors(form, errors || {});

    if (!errors && !selectErrors) {
        SaveConcepto();
    } else {
        swal("Favor de corregir los errores");
        setTimeout(function () {
            $(".confirm").prop("disabled", false);
        }, 100);
    }
}

function SaveConcepto() {
    var model = {
        Concepto_Id: $("#concepto_id").val(),
        Clave: 'C-',
        Descripcion: $("#descripcion").val(),      
        Cargo: $("#concepto_edit_cargo").is(":checked"),
        Activo: $("#concepto_edit_activo").is(":checked")  
    };

    var table = $('#ajax-table').DataTable();
    var buttons = table.buttons([1, 2, 3]); //Editar, Desactivar, Activar

    $.ajax({
        method: "POST",
        url: rootUrl + "/CuentasReceptoras/Concepto/Guardar",
        data: {
            "concepto": model
        },
        success: function (response) {
            if (response.success) {
                swal("Mensaje", response.message, "success");
                $('#modal-concepto').modal('hide');
                table.ajax.reload();
                buttons.disable();
            }
            else
                swal("Mensaje", response.message, "error");
        },
        error: function (response) {
            swal("Error", response.message, "error");
            setTimeout(function () {
                $(".confirm").prop("disabled", false);
            }, 100);
        }
    });
}

function ObtenerDetalleConcepto(table) {
    showErrors(form, {});   // Clean errors

    var dataRows = table.rows({ selected: true }).data();
    if (dataRows.length > 0) {
        var data = dataRows[0];
        $("#concepto_id").val(data.concepto_Id);        
        $("#descripcion").val(data.descripcion);                

        var switchCargo = $('#concepto_edit_cargo');
        if (data.cargo !== switchCargo.is(":checked")) {
            switchCargo.click();
        }

        var switchActivo = $('#concepto_edit_activo');
        if (data.activo !== switchActivo.is(":checked")) {
            switchActivo.click();
        }

        var options = {
            "backdrop": "static",
            keyboard: true
        };
        $('#modal-concepto').modal(options);
        $('#modal-concepto').modal('show');
    }
}
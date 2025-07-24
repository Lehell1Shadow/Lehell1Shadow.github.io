'use strict';

var flatpickrFechaIngreso;

$(document).ready(function () {
    $.getJSON(rootUrl + '/json/TableLanguage.json', function (data) {
        console.log("Table language success");
    })
        .always(function (data) {
            BuildTable(data);
        });    

    //Initialize flat datepicker
    flatpickrFechaIngreso = flatpickr('#dropper-fecha-ingreso', {
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

    // Hook up the form so we can prevent it from being posted
    var form = document.querySelector("form#supervisor_edit");
    form.addEventListener("submit", function(ev) {
        ev.preventDefault();
        handleFormSubmit(form);
    });    

    $("#executives_list_filter").change(function () {
        var table = $('#ajax-table').DataTable();
        table.ajax.reload();
    });

    $("#supervisor_activo_filter").change(function () {
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

    SetSelectedMenu('#menu_Supervisor');
});

// Validation
// These are the constraints used to validate the form
var constraints = {
    nombre: {
        // You need to pick a name
        presence: true,
        // And it must be between 3 and 50 characters long
        length: {
            minimum: 3,
            maximum: 50
        }
    },    
    numero_empleado: {
        presence: false,
        length: {
            minimum: 1,
            maximum: 20
        }
    },
    fecha_ingreso: {
        presence: true,
    }
};

// Hook up the inputs to validate on the fly
var inputs = document.querySelectorAll("input, textarea, select")
var form = document.querySelector("form#supervisor_edit");
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

    // Validate select
    $("#executive_messages").empty();
    var value = $("#executives_list").val();
    if (value === "0") {
        $("#executive_messages")
            .append('<p class="text-danger error">Favor de seleccionar un ejecutivo</p>');
        selectErrors = true;
    }

    if (!errors && !selectErrors) {
        SaveSupervisor();
    } else {
        swal("Favor de corregir los errores");
        setTimeout(function () {
            $(".confirm").prop("disabled", false);
        }, 100);
    }
}

//Modal popup
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
        var form = document.querySelector("form#supervisor_edit");
        HandleFormSubmit(form);
    });
};

var deleteModal = function (table, mensaje, activo) {
    var count = table.rows({ selected: true }).count();
    swal({
        title: mensaje + " supervisor",
        text: "Estás seguro(a) de " + mensaje.toLowerCase() + " " + count + " supervisor(es)?",
        type: "info",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true
    }, function () {
        DeleteSupervisors(table, activo);
    });
};

//Initialize table
function BuildTable(tableLanguage) {
    var table = $('#ajax-table').DataTable({      
        responsive: true,
        processing: true,
        serverSide: false,
        ajax: {
            url: rootUrl + '/Catalogos/Supervisor/Obtener',
            type: 'POST',
            data: function (d) {
                d.ejecutivoId = $("#executives_list_filter").val();
                d.activo = $('#supervisor_activo_filter').is(":checked");
                d.sucursalId = $("#branch_id").val();
            }
        },
        "language": tableLanguage,
        dom: 'Bftlip',
        "buttons": [
            {
                text: '<i class="fa fa-plus-square fa-2x"></i>',
                titleAttr: 'Nuevo',
                action: function (e, dt, node, config) {
                    limpiarModal();
                }
            },
            {
                text: '<i class="fa fa-pencil-square-o fa-2x"></i>',
                titleAttr: 'Editar',
                action: function (e, dt, node, config) {
                    UpdateSupervisors(table);
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
                "targets": [0, 1, 2, 7, 12, 13, 14, 15],
                "visible": false,
                "searchable": false
            }
        ],
        select: {
            style: 'multi'
        },
        "columns": [
            { "data": "supervisor_Id" },
            { "data": "sucursal_Id" },
            { "data": "ejecutivo_Id" },
            { "data": "nombre" },
            { "data": "clave" },
            { "data": "numero_Empleado" },
            {
                "data": "fecha_Ingreso",
                render: function (data, type, row) {
                    var date = new Date(data.replace(/-/g, '\/').replace(/T.+/, ''));
                    var month = date.getMonth() + 1;
                    return date.getDate() + "/" + (month.toString().length > 1 ? month : "0" + month) + "/" + date.getFullYear();
                },
            },
            { "data": "clave_Ejecutivo" },
            { "data": "ejecutivo" },
            {
                "data": "gestor",
                render: function (data, type, row) {
                    return PrintCheckbox(data, type, row);
                }
            },
            {
                "data": "cartera",
                render: function (data, type, row) {
                    return PrintCheckbox(data, type, row);
                }
            },
            {
                "data": "activo",
                render: function (data, type, row) {
                    return PrintCheckbox(data, type, row);
                }
            },
            { "data": "usuario_Registro" },
            { "data": "usuario_Modifico" },
            { "data": "fecha_Registro" },
            { "data": "fecha_Modificacion" }
        ]
    });

    onSelectEvent(table);
}

//Commands
function limpiarModal() {
    $(".form-control-sup").val("");
    var ejecutivoId = $("#executives_list_filter").val();
    if (ejecutivoId == -1)
        $("#executives_list").val(0).change();
    else
        $("#executives_list").val(ejecutivoId).change();

    flatpickrFechaIngreso.clear();

    var switchGestor = $('#supervisor_edit_gestor');
    if (switchGestor.is(":checked")) {
        switchGestor.click();
    }

    var switchCartera = $('#supervisor_edit_cartera');
    if (switchCartera.is(":checked")) {
        switchCartera.click();
    }

    var switchActivo = $('#supervisor_edit_activo');
    if (!switchActivo.is(":checked")) {
        switchActivo.click();
    }

    showErrors(form, {});   // Clean errors

    var options = {
        "backdrop": "static",
        keyboard: true
    };
    $('#modal-supervisor').modal(options);
    $('#modal-supervisor').modal('show');
}

function SaveSupervisor() {
    var supervisor = {
        Supervisor_Id: $("#supervisor_id").val(),
        Sucursal_Id: $("#branch_id").val(),
        Ejecutivo_Id: $("#executives_list").val(),
        Clave: "", //$("#clave").val(),
        Nombre: $("#nombre").val(),
        Numero_Empleado: $("#numero_empleado").val(),
        Fecha_Ingreso: $("#dropper-fecha-ingreso").val(),
        Gestor: $("#supervisor_edit_gestor").is(":checked"),
        Cartera: $("#supervisor_edit_cartera").is(":checked"),
        Activo: $("#supervisor_edit_activo").is(":checked")
    };

    var userName = $("#user_name_session").val();

    if (supervisor.Supervisor_Id === "0" || supervisor.Supervisor_Id === "") {
        $.ajax({
            method: "POST",
            url: rootUrl + "/Catalogos/Supervisor/Guardar",
            data: {
                "supervisor": supervisor,
                "usuario": userName
            },
            success: function (response) {
                if (response.success) {
                    swal("Mensaje", response.message, "success");
                    $('#modal-supervisor').modal('hide')
                    var table = $('#ajax-table').DataTable();
                    table.ajax.reload();
                    var buttons = table.buttons([1, 2, 3]); //Editar, Desactivar, Activar
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
    } else {
        $.ajax({
            method: "PUT",
            url: rootUrl + "/Catalogos/Supervisor/Actualizar",
            data: {
                "supervisor": supervisor,
                "usuario": userName
            },
            success: function (response) {
                if (response.success) {
                    swal("Mensaje", response.message, "success");
                    $('#modal-supervisor').modal('hide')
                    var table = $('#ajax-table').DataTable();
                    table.ajax.reload();
                    var buttons = table.buttons([1, 2, 3]); //Editar, Desactivar, Activar
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
}

function UpdateSupervisors(table) {
    showErrors(form, {});   // Clean errors

    var dataRows = table.rows({ selected: true }).data();

    if (dataRows.length > 0) {
        var data = dataRows[0];
        $("#supervisor_id").val(data.supervisor_Id);
        $("#executives_list").val(data.ejecutivo_Id).change();
        //$("#clave").val(data.clave);
        $("#nombre").val(data.nombre);
        $("#numero_empleado").val(data.numero_Empleado);

        var fechaIngreo = new Date(data.fecha_Ingreso);
        flatpickrFechaIngreso.setDate(fechaIngreo, true);

        var switchGestor = $('#supervisor_edit_gestor');
        if (data.gestor !== switchGestor.is(":checked")) {
            switchGestor.click();
        }

        var switchCartera = $('#supervisor_edit_cartera');
        if (data.cartera !== switchCartera.is(":checked")) {
            switchCartera.click();
        }

        var switchActivo = $('#supervisor_edit_activo');
        if (data.activo !== switchActivo.is(":checked")) {
            switchActivo.click();
        }

        $("#clave_ejecutivo").val(data.clave_Ejecutivo);
        $("#ejecutivo").val(data.ejecutivo);

        var options = {
            "backdrop": "static",
            keyboard: true
        };
        $('#modal-supervisor').modal(options);
        $('#modal-supervisor').modal('show'); 
    }
}

function DeleteSupervisors(table, activo) {
    var dataRows = table.rows({ selected: true }).data();
    var supervisorIds = new Array();
    for (var i = 0; i < dataRows.length; i++) {
        supervisorIds.push(dataRows[i].supervisor_Id);
    }

    var userName = $("#user_name_session").val();

    $.ajax({
        method: "DELETE",
        url: rootUrl + "/Catalogos/Supervisor/Eliminar",
        data: {
            "supervisorIds": supervisorIds,
            "activo": activo,
            "usuario": userName
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
                var buttons = table.buttons([1, 2, 3]); //Editar, Deshabilitar, Habilitar
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
                var buttons = table.buttons([1, 2, 3]); //Editar, Deshabilitar, Habilitar
                buttons.disable();
            }
            else if (rows === 1) {
                var buttons = table.buttons([1, 2, 3]); //Editar, Deshabilitar, Habilitar
                buttons.enable();
            }
        }
    });
} 
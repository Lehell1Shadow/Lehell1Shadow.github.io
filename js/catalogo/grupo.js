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
    var form = document.querySelector("form#group_edit");
    form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        handleFormSubmit(form);
    });    

    $("#executives_list_filter").change(function () {
        var _default_Id = "0";
        var executiveId = $("#executives_list_filter").val();
        var branchId = $("#branch_id").val();        

        $.ajax({
            url: rootUrl + '/Catalogos/Supervisor/Obtener',
            type: 'POST',
            data: {
                sucursalId: branchId,
                ejecutivoId: executiveId,
                activo: true
            }
        }).done(function (data) {
            var supervisorsFilter = $("#supervisors_list_filter");
            supervisorsFilter.empty();

            var supervisorsList = $("#supervisors_list");
            supervisorsList.empty();

            $("<option />", {
                val: _default_Id,
                text: "Favor de seleccionar un supervisor"
            }).appendTo(supervisorsList);

            data.data.forEach(function (element) {
                $("<option />", {
                    val: element.supervisor_Id,
                    text: element.nombre
                }).appendTo(supervisorsFilter);

                $("<option />", {
                    val: element.supervisor_Id,
                    text: element.nombre
                }).appendTo(supervisorsList);
            });

            supervisorsFilter.select2().trigger('change');
        });


    });

    $("#supervisors_list_filter").change(function () {
        var table = $('#ajax-table').DataTable();
        table.ajax.reload();
    });

    $("#group_activo_filter").change(function () {
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

    $("#txtCliente").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: rootUrl + '/Catalogos/Grupo/BuscarPersona',
                dataType: "json",
                data: {
                    q: request.term
                },
                beforeSend: function (xhr) {
                    $('#loaderCliente').show();
                },
                success: function (data) {                    
                    response($.map(data.data, function (item) {
                        return {
                            label: item.clave + "-" + item.nombre_Completo,
                            value: item.clave + "-" + item.nombre_Completo,
                            id: item.persona_Id,
                            clave: item.clave,
                        };
                    }));

                    $('#loaderCliente').hide();
                }
            });
        },
        minLength: 5,
        select: function (event, ui) {
            $("#persona_id").val(ui.item.id);
            $("#clave_Cliente").val(ui.item.clave);
            $("#txtCliente").prop("readonly", true);
        }
    });

    $("#btnLimpiarPromotor").click(function () {
        $("#persona_id").val("0");
        $("#clave_Cliente").val("");
        $("#txtCliente").val("");
        $("#txtCliente").prop("readonly", false);
        $("#txtCliente").focus();
    });   

    SetSelectedMenu('#menu_Grupo');
});

// Validation
// These are the constraints used to validate the form
var constraints = {    
    descripcion: {
        presence: true,
        length: {
            minimum: 1,
            maximum: 50
        }
    },
    fecha_ingreso: {
        presence: true,
    },
    comision: {
        presence: true,
        numericality: {
            onlyNumeric: true
        }
    },    
    limite_de_credito: {
        presence: true,
        numericality: {
            onlyNumeric: true
        }
    }
};

// Hook up the inputs to validate on the fly
var inputs = document.querySelectorAll("input, textarea, select")
var form = document.querySelector("form#group_edit");
for (var i = 0; i < inputs.length; ++i) {
    inputs.item(i).addEventListener("change", function (ev) {
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
    $("#branch_messages").empty();
    var value = $("#branches_list").val();
    if (value === "0") {
        $("#branch_messages")
            .append('<p class="text-danger error">Favor de seleccionar una sucursal</p>');
        selectErrors = true;
    }

    $("#supervisor_messages").empty();
    var value = $("#supervisors_list").val();
    if (value === "0") {
        $("#supervisor_messages")
            .append('<p class="text-danger error">Favor de seleccionar un supervisor</p>');
        selectErrors = true;
    }

    $("#persona_messages").empty();
    var value = $("#persona_id").val();
    if (value === "0") {
        $("#persona_messages")
            .append('<p class="text-danger error">Favor de seleccionar una persona</p>');
        selectErrors = true;
    }

    $("#category_group_messages").empty();
    var value = $("#category_groups_list").val();
    if (value === "0") {
        $("#category_group_messages")
            .append('<p class="text-danger error">Favor de seleccionar una categoría del grupo</p>');
        selectErrors = true;
    }

    $("#status_group_messages").empty();
    var value = $("#status_groups_list").val();
    if (value === "0") {
        $("#status_group_messages")
            .append('<p class="text-danger error">Favor de seleccionar un estatus del grupo</p>');
        selectErrors = true;
    }

    if (!errors && !selectErrors) {
        SaveGroup();
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
        text: "¿Estás seguro(a) de realizar los cambios?",
        type: "info",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true
    }, function () {
        var form = document.querySelector("form#group_edit");
        HandleFormSubmit(form);
    });
};

var deleteModal = function (table, mensaje, activo) {
    var count = table.rows({ selected: true }).count();
    swal({
        title: mensaje + " grupo",
        text: "Estás seguro(a) de " + mensaje.toLowerCase() + " " + count + " grupo(s)?",
        type: "info",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true
    }, function () {
        DeleteGroups(table, activo);
    });
};

//Initialize table
function BuildTable(tableLanguage) {
    var table = $('#ajax-table').DataTable({               
        responsive: true,
        processing: true,
        serverSide: false,
        ajax: {
            url: rootUrl + '/Catalogos/Grupo/Obtener',
            type: 'POST',
            data: function (d) {
                d.sucursalId = $("#branch_id").val();
                d.ejecutivoId = $("#executives_list_filter").val();
                d.supervisorId = $("#supervisors_list_filter").val();
                d.activo = $('#group_activo_filter').is(":checked");
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
                    UpdateGroups(table);
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
                "targets": [0, 1, 2, 3, 4, 9, 10, 11, 12, 17, 18, 19, 20, 21, 22, 23, 24],
                "visible": false,
                "searchable": false
            }
        ],
        select: {
            style: 'multi'
        },
        "columns": [
            { "data": "grupo_Id" },
            { "data": "sucursal_Id" },
            { "data": "supervisor_Id" },
            { "data": "persona_Id" },
            { "data": "status_Grupo_Id" },
            { "data": "descripcion" },
            { "data": "clave" },
            { "data": "status" },
            {
                "data": "fecha_Ingreso",
                render: function (data, type, row) {
                    var date = new Date(data.replace(/-/g, '\/').replace(/T.+/, ''));
                    var month = date.getMonth() + 1;
                    return date.getDate() + "/" + (month.toString().length > 1 ? month : "0" + month) + "/" + date.getFullYear();
                },
            },
            { "data": "comision" },
            { "data": "fijo" },
            { "data": "infonavit" },
            { "data": "limite_Credito" },
            { "data": "clave_Promotor" },
            { "data": "promotor" },
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
            { "data": "fecha_Modificacion" },
            { "data": "clave_Ejecutivo" },
            { "data": "ejecutivo" },
            { "data": "clave_Supervisor" },
            { "data": "supervisor" }
        ]
    });

    onSelectEvent(table);
}

//Commands
function limpiarModal() {
    $(".form-control-grupo").val("");
    $(".select-form").val(0).change();

    $("#txtCliente").prop("readonly", false);

    flatpickrFechaIngreso.clear();

    var switchCartera = $('#group_edit_cartera');
    if (switchCartera.is(":checked")) {
        switchCartera.click();
    }
    var switchActivo = $('#group_edit_activo');
    if (!switchActivo.is(":checked")) {
        switchActivo.click();
    }

    showErrors(form, {});   // Clean errors

    $('.nav-tabs a[href="#general"]').tab('show');

    var options = {
        "backdrop": "static",
        keyboard: true
    };
    $('#modal-grupo').modal(options);
    $('#modal-grupo').modal('show');
}
function SaveGroup() {
    var group = {
        Grupo_Id: $("#group_id").val(),
        Sucursal_Id: 0,
        Supervisor_Id: $("#supervisors_list").val(),
        Persona_Id: $("#persona_id").val(),
        Status_Grupo_Id: $("#status_grupo_id").val(),
        Clave: "",//$("#clave").val(),
        Descripcion: $("#descripcion").val(),
        Fecha_Ingreso: $("#dropper-fecha-ingreso").val(),
        Comision: $("#comision").val(),
        Fijo: $("#fijo").val(),
        Infonavit: $("#infonavit").val(),
        Limite_Credito: $("#limite_de_credito").val(),
        Cartera: $("#group_edit_cartera").is(":checked"),
        Activo: $("#group_edit_activo").is(":checked")
    };

    var branchId = $("#branch_id").val();
    var userName = $("#user_name_session").val();

    if (group.Grupo_Id === "0" || group.Grupo_Id === "") {
        $.ajax({
            method: "POST",
            url: rootUrl + "/Catalogos/Grupo/Guardar",
            data: {
                "grupoP": group,
                "sucursalId": branchId,
                "usuario": userName
            },
            success: function (response) {   
                if (response.success) {
                    swal("Mensaje", response.message, "success");
                    $('#modal-grupo').modal('hide')
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
            url: rootUrl + "/Catalogos/Grupo/Actualizar",
            data: {
                "grupoP": group,
                "sucursalId": branchId,
                "usuario": userName
            },
            success: function (response) {
                if (response.success) {
                    swal("Mensaje", response.message, "success");
                    $('#modal-grupo').modal('hide')
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

function UpdateGroups(table) {
    showErrors(form, {});   // Clean errors

    var dataRows = table.rows({ selected: true }).data();
    if (dataRows.length > 0) {
        var data = dataRows[0];
        $("#group_id").val(data.grupo_Id);
        $("#status_grupo_id").val(data.status_Grupo_Id);
        $("#supervisors_list").val(data.supervisor_Id).change();

        $("#persona_id").val(data.persona_Id);
        var promotor = data.clave_Promotor + '-' + data.promotor;
        $("#txtCliente").val(promotor);
        $("#txtCliente").prop("readonly", true);

        //$("#clave").val(data.clave);
        $("#descripcion").val(data.descripcion);
                
        var fechaIngreso = new Date(data.fecha_Ingreso);
        flatpickrFechaIngreso.setDate(fechaIngreso, true);

        $("#comision").val(data.comision);
        $("#fijo").val(data.fijo);
        $("#infonavit").val(data.infonavit);
        $("#limite_de_credito").val(data.limite_Credito);

        var switchCartera = $('#group_edit_cartera');
        if (data.cartera !== switchCartera.is(":checked")) {
            switchCartera.click();
        }

        var switchActivo = $('#group_edit_activo');
        if (data.activo !== switchActivo.is(":checked")) {
            switchActivo.click();
        }     

        var options = {
            "backdrop": "static",
            keyboard: true
        };
        $('#modal-grupo').modal(options);
        $('#modal-grupo').modal('show');
    }
}

function DeleteGroups(table, activo) {
    var dataRows = table.rows({ selected: true }).data();
    var groupIds = new Array();
    for (var i = 0; i < dataRows.length; i++) {
        groupIds.push(dataRows[i].grupo_Id);
    }

    var userName = $("#user_name_session").val();

    $.ajax({
        method: "DELETE",
        url: rootUrl + "/Catalogos/Grupo/Eliminar",
        data: {
            "grupoIds": groupIds,
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
'use strict';

$(document).ready(function () {
    $.getJSON(rootUrl + '/json/TableLanguage.json', function (data) {
        console.log("Table language success");
    }).always(function (data) {
        BuildTable(data);
    });


    $(".form-control-select").select2({
        dropdownParent: $('#modal-usuario')
    });

    // Hook up the form so we can prevent it from being posted
    var form = document.querySelector("form#usuario_edit");
    form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        handleFormSubmit(form);
    });

    $("#usuario_activo_filter").change(function () {
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

    $(".roles").change(function () {
        var id = $(this).attr('id');
        var res = id.split("_");
        var sucursalId = res[res.length - 1];
        var roleId = $(this).val();

        if (roleId === "3" || roleId =="30") { //Ejecutivo & Especial
            $("#ejecutivo_span_" + sucursalId).removeClass("d-none");
            $("#supervisor_span_" + sucursalId).addClass("d-none");
            $("#grupo_span_" + sucursalId).addClass("d-none");
        } else if (roleId === "4") { // Supervisor
            $("#supervisor_span_" + sucursalId).removeClass("d-none");
            $("#ejecutivo_span_" + sucursalId).addClass("d-none");
            $("#grupo_span_" + sucursalId).addClass("d-none");
        } else if (roleId === "5") { // Grupo
            $("#grupo_span_" + sucursalId).removeClass("d-none");
            $("#ejecutivo_span_" + sucursalId).addClass("d-none");
            $("#supervisor_span_" + sucursalId).addClass("d-none");
        } else {
            $("#ejecutivo_span_" + sucursalId).addClass("d-none");
            $("#supervisor_span_" + sucursalId).addClass("d-none");
            $("#grupo_span_" + sucursalId).addClass("d-none");

            $("#ejecutivo_" + sucursalId).prop("selectedIndex", 0);
            $("#supervisor_" + sucursalId).prop("selectedIndex", 0);
            $("#grupo_" + sucursalId).prop("selectedIndex", 0);
        }
    });
    
    SetSelectedMenu('#menu_Usuarios');
});

// Validation
// These are the constraints used to validate the form
var constraints = {
    nombre: {
        presence: true,
        length: {
            minimum: 1,
            maximum: 200
        }
    },
    usuario: {
        presence: true,
        length: {
            minimum: 0,
            maximum: 50
        }
    },
    email: {
        presence: false,
        email: true
    },
    contraseña: {
        presence: true,
        length: {
            minimum: 0,
            maximum: 100
        }
    }
};

// Hook up the inputs to validate on the fly
var inputs = document.querySelectorAll("input, textarea, select")
var form = document.querySelector("form#usuario_edit");
for (var i = 0; i < inputs.length; ++i) {
    inputs.item(i).addEventListener("change", function (ev) {
        var errors = validate(form, constraints) || {};
        showErrorsForInput(this, errors[this.name]);
    });
}

function HandleFormSubmit(form, flagCambiarPassword) {
    var roleId = $('#role').val();
    var selectErrors = false;

    var errors = validate(form, constraints);
    // then we update the form to reflect the results
    showErrors(form, errors || {});

    // Validate select
    var principalSucursalId = $("#branch_id").val();
    var principalRole = $("#role_" + principalSucursalId).val();
    $("#role_message_" + principalSucursalId).empty();
    if (principalRole === null || principalRole === "") {
        $("#role_message_" + principalSucursalId)
            .append('<p class="text-danger error">Favor de seleccionar un rol para esta sucursal</p>');
        selectErrors = true;
    }

    var roles = $(".roles");
    for (var i = 0; i < roles.length; i++) {
        var role = roles[i];
        var id = role.id;
        var res = id.split("_");
        var sucursalId = res[res.length - 1];
        var roleId = role.value;

        if (roleId === "3") {
            $("#role_message_" + sucursalId).empty();
            var value = $("#ejecutivo_" + sucursalId).val();
            if (value === null || value === "") {
                $("#role_message_" + sucursalId)
                    .append('<p class="text-danger error">Favor de seleccionar un ejecutivo</p>');
                selectErrors = true;
            }
        } else if (roleId === "4") {
            $("#role_message_" + sucursalId).empty();
            var value = $("#supervisor_" + sucursalId).val();
            if (value === null || value === "") {
                $("#role_message_" + sucursalId)
                    .append('<p class="text-danger error">Favor de seleccionar un supervisor</p>');
                selectErrors = true;
            }
        }
    }

    if (!errors && !selectErrors) {
        SaveUsuario(flagCambiarPassword);
    } else {
        swal("Favor de corregir los errores");
        setTimeout(function () {
            $(".confirm").prop("disabled", false);
        }, 100);
    }
}

function BuildTable(tableLanguage) {
    var table = $('#ajax-table').DataTable({
        responsive: true,
        processing: true,
        serverSide: false,
        ajax: {
            url: rootUrl + '/Catalogos/Usuario/Obtener',
            type: 'POST',
            data: function (d) {
                d.sucursalId = $("#branch_id").val();
                d.esActivo = $('#usuario_activo_filter').is(":checked");
            }
        },
        "language": tableLanguage,
        dom: 'Bftlip',
        "buttons": [
            {
                text: '<i class="fa fa-plus-square fa-2x"></i>',
                titleAttr: 'Nuevo',
                action: function (e, dt, node, config) {
                    $(".form-control-normal").val("");
                    $(".form-control-select").val(1).change();

                    $("#usuario_id").val("");
                    $("#representante_id").val("");

                    var switchActivo = $('#usuario_edit_activo');
                    if (!switchActivo.is(":checked")) {
                        switchActivo.click();
                    }
                    $("#password").prop("disabled", false);                    

                    $(".roles").val("").change();
                    $(".ejecutivo").val("").change();
                    $(".supervisor").val("").change();

                    showErrors(form, {});   // Clean errors

                    $("#tabPassword").addClass("d-none");
                    $('.nav-tabs a[href="#general"]').tab('show');

                    var options = {
                        "backdrop": "static",
                        keyboard: true
                    };
                    $('#modal-usuario').modal(options);
                    $('#modal-usuario').modal('show');
                }
            },
            {
                text: '<i class="fa fa-pencil-square-o fa-2x"></i>',
                titleAttr: 'Editar',
                action: function (e, dt, node, config) {
                    UpdateUsuariosLoadRoleRepresentantes(table);
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
                "targets": [0, 1, 2, 9, 10],
                "visible": false,
                "searchable": false
            }
        ],
        select: {
            style: 'multi'
        },
        "columns": [
            { "data": "usuario_Id" },
            { "data": "empresa_Id" },
            { "data": "sucursal_Id" },
            { "data": "nombre" },
            { "data": "usuario" },
            { "data": "email" },
            { "data": "nombre_Role" },            
            {
                "data": "fecha_Registro",
                render: function (data, type, row) {
                    var date = new Date(data.replace(/-/g, '\/').replace(/T.+/, ''));
                    var month = date.getMonth() + 1;
                    return date.getDate() + "/" + (month.toString().length > 1 ? month : "0" + month) + "/" + date.getFullYear();
                },
            },
            {
                "data": "activo",
                render: function (data, type, row) {
                    return PrintCheckbox(data, type, row);
                }
            },            
            { "data": "role_Id" },
            { "data": "clave_Role" }
        ]
    });
    
    onSelectEvent(table);
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

var confirmChangesModal = function () {

    var flagCambiarPassword = false;
    var nuevoPassword = $("#nuevoPassword").val();
    var confirmarPassword = $("#confirmarPassword").val();

    if (nuevoPassword == "" && confirmarPassword != "") {
        $("#nuevoPassword").focus();
        swal("Mensaje", "*Favor de escribir la nueva contraseña", "warning");
        return;
    }

    if (nuevoPassword != "")
    {        
        if (confirmarPassword == "") {
            $("#confirmarPassword").focus();
            swal("Mensaje", "*Favor de confirmar la contraseña", "warning");            
            return;
        }
        else
            if (nuevoPassword != confirmarPassword) {
                $("#nuevoPassword").focus();
                swal("Mensaje", "*Las contraseñas no coinciden, favor de verificar. ", "warning");                                
                return;
            }
            else
                flagCambiarPassword = true;
    }


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
            var form = document.querySelector("form#usuario_edit");
            HandleFormSubmit(form, flagCambiarPassword);
    });
};

var deleteModal = function (table, mensaje, activo) {
    var count = table.rows({ selected: true }).count();
    swal({
        title: mensaje + " usuario",
        text: "Estás seguro(a) de " + mensaje.toLowerCase() + " " + count + " usuario(s)?",
        type: "info",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true
    }, function () {
            DeleteUsuarios(table, activo);
    });
};

function SaveUsuario(flagCambiarPassword) {
    var usuario = {
        Usuario_Id: $("#usuario_id").val(),
        Empresa_Id: $("#empresa_id").val(),
        Sucursal_Id: $("#branch_id").val(),
        Nombre: $("#nombre").val(),
        Usuario: $("#usuario").val(),
        Password: $("#password").val(),
        Email: $("#email").val(),
        Activo: $("#usuario_edit_activo").is(":checked")        
    };    
    
    if (usuario.Usuario_Id === "") {
        $.ajax({
            method: "POST",
            url: rootUrl + "/Catalogos/Usuario/Guardar",
            data: {
                "model": usuario
            }
        })
            .done(function (msg) {
                if (!isNaN(msg)) {
                    var usuarioId = msg;
                    SaveUsuarioRole(usuarioId);
                } else {
                    swal(msg);
                    setTimeout(function () {
                        $(".confirm").prop("disabled", false);
                    }, 100);
                }
            });
    } else {       
        var nuevoPassword = "";
        if (flagCambiarPassword)
            nuevoPassword = $("#nuevoPassword").val();

        $.ajax({
            method: "PUT",
            url: rootUrl + "/Catalogos/Usuario/Actualizar",
            data: {
                "model": usuario,
                "flagNuevoPassword": flagCambiarPassword,
                "password": nuevoPassword
            }
        })
            .done(function (msg) {
                if (!isNaN(msg)) {
                    var usuarioId = msg;
                    SaveUsuarioRole(usuarioId);
                } else {
                    swal(msg);
                    setTimeout(function () {
                        $(".confirm").prop("disabled", false);
                    }, 100);
                }
            });
    }
}

function SaveUsuarioRole(usuarioId) {
    var usuarioRoleRepresentantes = new Array();

    var roles = $(".roles");
    for (var i = 0; i < roles.length; i++) {
        var role = roles[i];
        var id = role.id;
        var res = id.split("_");
        var sucursalId = res[res.length - 1];
        var roleId = role.value;

        if (roleId !== "") {
            var usuarioRoleRepresentante = {
                Id: -1,
                Usuario_Id: usuarioId,
                Representante_Id: -1,
                Role_Id: roleId,
                Sucursal_Id: sucursalId,
            };

            if (roleId === "3" || roleId === "30") {
                var ejecutivoId = $("#ejecutivo_" + sucursalId).val();
                ejecutivoId = ejecutivoId === "" ? 0 : ejecutivoId;
                usuarioRoleRepresentante.Representante_Id = ejecutivoId;
            } else if (roleId === "4") {
                var supervisorId = $("#supervisor_" + sucursalId).val();
                supervisorId = supervisorId === "" ? 0 : supervisorId;
                usuarioRoleRepresentante.Representante_Id = supervisorId;
            } else if (roleId === "5") {
                var grupoId = $("#grupo_" + sucursalId).val();
                grupoId = grupoId === "" ? 0 : grupoId;
                usuarioRoleRepresentante.Representante_Id = grupoId;
            }

            usuarioRoleRepresentantes.push(usuarioRoleRepresentante);
        }
    }    

    $.ajax({
        method: "POST",
        url: rootUrl + "/Catalogos/Usuario/GuardarRoleRepresentante",
        data: {
            "usuarioRoleRepresentantes": usuarioRoleRepresentantes
        }
    })
        .done(function (msg) {
            if (msg !== "") {
                swal(msg);
                setTimeout(function () {
                    $(".confirm").prop("disabled", false);
                }, 100);
            } else {                
                var table = $('#ajax-table').DataTable();
                table.ajax.reload();

                swal("Mensaje","Se guardo correctamente la informacion!!!","success");

                $('#modal-usuario').modal('hide');
            }
        });
}

function UpdateUsuariosLoadRoleRepresentantes(table) {
    showErrors(form, {});   // Clean errors

    var dataRows = table.rows({ selected: true }).data();
    if (dataRows.length > 0) {
        var data = dataRows[0];

        $(".roles").val("").change();
        $(".ejecutivo").val("").change();
        $(".supervisor").val("").change();

        $.ajax({
            method: "POST",
            url: rootUrl + "/Catalogos/Usuario/ObtenerUsuarioRoleRepresentantes",
            data: {
                "usuarioId": data.usuario_Id
            }
        })
            .done(function (data) {
                for (var i = 0; i < data.length; i++) {
                    var sucursalId = data[i].sucursal_Id;
                    var roleId = data[i].role_Id;
                    var representanteId = data[i].representante_Id;
                    representanteId = representanteId === "0" ? "" : representanteId;

                    $("#role_" + sucursalId).val(roleId).change();
                    if (roleId === "3" || roleId === 3 || roleId === "30" || roleId === 30) {
                        $("#ejecutivo_" + sucursalId).val(representanteId).change();
                        $("#supervisor_" + sucursalId).val("").change();
                        $("#grupo_" + sucursalId).val("").change();
                    } else if (roleId === "4" || roleId === 4) {
                        $("#supervisor_" + sucursalId).val(representanteId).change();
                        $("#ejecutivo_" + sucursalId).val("").change();
                        $("#grupo_" + sucursalId).val("").change();
                    } else if (roleId === "5" || roleId === 5) {
                        $("#grupo_" + sucursalId).val(representanteId).change();
                        $("#ejecutivo_" + sucursalId).val("").change();
                        $("#supervisor_" + sucursalId).val("").change();
                    }
                }
                UpdateUsuarios(table);
            });
    }
}

function UpdateUsuarios(table) {
    $("#nuevoPassword").val("");
    $("#confirmarPassword").val("");

    var dataRows = table.rows({ selected: true }).data();
    if (dataRows.length > 0) {        
        var data = dataRows[0];
        $("#usuario_id").val(data.usuario_Id);
        $("#nombre").val(data.nombre);
        $("#usuario").val(data.usuario);
        $("#email").val(data.email);
        $("#password").val("empty");
        $("#password").prop("disabled", true);
        var switchActivo = $('#usuario_edit_activo');
        if (data.activo !== switchActivo.is(":checked")) {
            switchActivo.click();
        }        
        $("#tabPassword").removeClass("d-none");
        
        var options = {
            "backdrop": "static",
            keyboard: true
        };
        $('#modal-usuario').modal(options);
        $('#modal-usuario').modal('show');
    }
}

function DeleteUsuarios(table, activo) {
    var dataRows = table.rows({ selected: true }).data();
    var usuarioIds = new Array();
    for (var i = 0; i < dataRows.length; i++) {
        usuarioIds.push(dataRows[i].usuario_Id);
    }

    $.ajax({
        method: "DELETE",
        url: rootUrl + "/Catalogos/Usuario/Eliminar",
        data: {
            "usuarioIds": usuarioIds,
            "activo": activo
        }
    })
        .done(function (msg) {
            table.ajax.reload();
            var buttons = table.buttons([1, 2, 3]); //Editar, Desactivar, Activar
            buttons.disable();
            swal(msg);
        });
} 
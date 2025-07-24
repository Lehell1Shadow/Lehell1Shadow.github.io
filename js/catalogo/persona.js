'use strict';

var flatpickrFechaNacimiento;

$(document).ready(function () {

    $.getJSON(rootUrl + '/json/TableLanguage.json', function (data) {
        console.log("Table language success");
    })
        .always(function (data) {
            BuildTable(data);
            BuildTableAddresses(data);           
        });

    // Initialize selects
    $(".select-form-person").select2({
        dropdownParent: $('#modal-persona')
    });

    $(".select-form-address").select2({
        dropdownParent: $('#modal-address')
    });

    $(".select-form-colonia").select2({
        dropdownParent: $('#modal-colonia')
    });

    /*numbers*/
    $('.autonumber').autoNumeric('init');
    $(".phone").inputmask({ mask: "(99) 9999-9999" });

    //Initialize flat datepicker
    flatpickrFechaNacimiento = flatpickr('#dropper-fecha-nacimiento', {
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
    var formPerson = document.querySelector("form#persona_edit");
    formPerson.addEventListener("submit", function(ev) {
        ev.preventDefault();
        handleFormSubmit(formPerson);
    });    

    $("#executives_list_filter").change(function () {        
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

            data.data.forEach(function (element) {
                $("<option />", {
                    val: element.supervisor_Id,
                    text: element.nombre
                }).appendTo(supervisorsFilter);
            });

            supervisorsFilter.select2().trigger('change');
        });
    });

    $("#supervisors_list_filter").change(function () {
        var _default_Id = "0";
        var executiveId = $("#executives_list_filter").val();
        var supervisorId = $("#supervisors_list_filter").val();
        var branchId = $("#branch_id").val();        

        $.ajax({
            url: rootUrl + '/Catalogos/Grupo/Obtener',
            type: 'POST',
            data: {
                sucursalId: branchId,
                ejecutivoId: executiveId,
                supervisorId: supervisorId,
                activo: true
            }
        }).done(function (data) {
            var groupsFilter = $("#groups_list_filter");
            var groupsList = $("#groups_list");

            groupsFilter.empty();
            groupsList.empty();

            $("<option />", {
                val: _default_Id,
                text: "Favor de seleccionar un grupo"
            }).appendTo(groupsFilter);

            $("<option />", {
                val: _default_Id,
                text: "Favor de seleccionar un grupo"
            }).appendTo(groupsList);

            data.data.forEach(function (element) {
                $("<option />", {
                    val: element.grupo_Id,
                    text: element.descripcion
                }).appendTo(groupsFilter);

                $("<option />", {
                    val: element.grupo_Id,
                    text: element.descripcion
                }).appendTo(groupsList);
            });          
        });    
    });

    $("#groups_list_filter").change(function () {
        var table = $('#ajax-table').DataTable();
        table.ajax.reload();
    });

    $("#persona_promotor_filter").change(function () {
        var table = $('#ajax-table').DataTable();
        table.ajax.reload();       
    });

    $("#persona_activo_filter").change(function () {
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

    $("#persona_edit_promotor").change(function () {
        var groupsList = $("#groups_list");                
        groupsList.val(0).change();

        if ($(this).is(":checked")) {                        
            groupsList.parents('div.form-group').hide();
        }
        else {                        
            groupsList.parents('div.form-group').show();
        }
    });
            
    $('#address-table').css('width', '100%');

    SetSelectedMenu('#menu_Persona');
});

// Validation
// These are the constraints used to validate the form
var constraintsPerson = {
    //clave: {
    //    presence: true,
    //    length: {
    //        minimum: 1,
    //        maximum: 10
    //    }
    //},
    nombre: {
        presence: true,
        length: {
            minimum: 1,
            maximum: 50
        }
    },
    apellido_paterno: {
        presence: true,
        length: {
            minimum: 1,
            maximum: 50
        }
    },
    apellido_materno: {
        presence: true,
        length: {
            minimum: 1,
            maximum: 50
        }
    },
    fecha_nacimiento: {
        presence: true,
    },   
    nuevo_monto: {
        presence: false,
        numericality: {
            onlyNumeric: true
        }
    },
};

// Hook up the inputs to validate on the fly
var inputs = document.querySelectorAll("input, textarea, select")
var formPerson = document.querySelector("form#persona_edit");
for (var i = 0; i < inputs.length; ++i) {
    inputs.item(i).addEventListener("change", function(ev) {
        var errors = validate(formPerson, constraintsPerson) || {};
        showErrorsForInput(this, errors[this.name]);
    });
}

function HandleFormSubmit(formPerson) {
    var selectErrors = false;

    var errors = false; //validate(formPerson, constraintsPerson);
    // then we update the form to reflect the results
    showErrors(formPerson, errors || {});

    // Validate select
    $("#group_messages").empty();
    if (!$("#persona_edit_promotor").is(":checked")) {
        var value = $("#groups_list").val();
        if (value === "0") {
            $("#group_messages")
                .append('<p class="text-danger error">Favor de seleccionar un grupo</p>');
            selectErrors = true;
        }
    }

    $("#state_messages").empty();
    var value = $("#states_list").val();
    if (value === "0") {
        $("#state_messages")
            .append('<p class="text-danger error">Favor de seleccionar un estado</p>');
        selectErrors = true;
    }

    $("#status_cliente_messages").empty();
    var value = $("#status_clients_list").val();
    if (value === "0") {
        $("#status_cliente_messages")
            .append('<p class="text-danger error">Favor de seleccionar un estatus</p>');
        selectErrors = true;
    }

    $("#ocupation_messages").empty();
    var value = $("#ocupations_list").val();
    if (value === "0") {
        $("#ocupation_messages")
            .append('<p class="text-danger error">Favor de seleccionar una ocupación</p>');
        selectErrors = true;
    }

    if (!errors && !selectErrors) {
        SavePersona();
    } else {
        swal("Favor de corregir los errores");
        setTimeout(function () {
            $(".confirm").prop("disabled", false);
        }, 100);
    }
}

//Initialize tables
function BuildTable(tableLanguage) {
    var table = $('#ajax-table').DataTable({
        responsive: true,
        processing: true,
        serverSide: false,
        ajax: {
            url: rootUrl + '/Catalogos/Persona/Obtener',
            type: 'POST',
            data: function (d) {
                d.ejecutivoId = $("#executives_list_filter").val();
                d.supervisorId = $("#supervisors_list_filter").val();
                d.grupoId = $("#groups_list_filter").val();
                d.promotor = $("#persona_promotor_filter").is(":checked");
                d.activo = $('#persona_activo_filter').is(":checked");
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
                    UpdatePersonas(table);                    
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
                "targets": [0],
                "visible": false,
                "searchable": false
            }
        ],
        select: {
            style: 'multi'
        },
        "columns": [            
            { "data": "persona_Id" },            
            { "data": "clave" },
            { "data": "nombre" },
            { "data": "apellido_Paterno" },
            { "data": "apellido_Materno" },
            { "data": "fecha_Nacimiento" },           
            { "data": "ine" },
            { "data": "curp" },
            { "data": "rfc" },
            { "data": "sexo" },
            { "data": "telefono1" },            
            { "data": "email" },                        
            { "data": "status" },
            { "data": "ocupacion" },                    
            {
                "data": "promotor",
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
        ]
    });
    onSelectEvent(table);
}

function BuildTableAddresses(tableLanguage) {
    var table = $('#address-table').DataTable({
        responsive: true,
        processing: false,
        serverSide: false,
        paging: false,
        ordering: false,
        ajax: {
            url: rootUrl + '/Catalogos/Direccion/Obtener',
            type: 'POST',
            data: function (d) {
                d.personaId = $("#persona_id").val();
            }
        },
        "language": tableLanguage,
        dom: 'Bfrtip',
        "buttons": [
            {
                text: '<i class="fa fa-plus-square fa-2x"></i>',
                titleAttr: 'Nuevo',
                action: function (e, dt, node, config) {
                    $(".form-control-address").val("");                    
                    $("#address_index").val(-1);

                    var switchActivo = $('#address_edit_activo');
                    if (!switchActivo.is(":checked")) {
                        switchActivo.click();
                    }

                    var neighborList = $("#neighbor_list");
                    neighborList.empty();

                    $("<option />", {
                        val: 0,
                        text: "Favor de seleccionar una colonia"
                    }).appendTo(neighborList);

                    var options = {
                        "backdrop": "static",
                        keyboard: true
                    };
                    $('#modal-address').modal(options);
                    $('#modal-address').modal('show');
                }
            },
            {
                text: '<i class="fa fa-pencil-square-o fa-2x"></i>',
                titleAttr: 'Editar',
                action: function (e, dt, node, config) {
                    UpdateAddresses(table);
                },
                enabled: false
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
                "targets": [0,1,2],
                "visible": false,
                "searchable": false
            }
        ],
        select: {
            style: 'single'
        },
        "columns": [            
            { "data": "domicilio_Id" },
            { "data": "persona_Id" },
            { "data": "colonia_Id" },
            {
                "data": "activo",
                render: function (data) {
                    return (data) ? "Si" : "No";
                }
            },
            { "data": "calle" },
            { "data": "numero_Exterior" },
            { "data": "numero_Interior" },
            { "data": "codigo_Postal" },
            { "data": "colonia" },
            { "data": "municipio" },
            { "data": "estado" }
        ]
    });
    onSelectEventAddress(table);
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
        var form = document.querySelector("form#persona_edit");
        HandleFormSubmit(form);
    });
};

var deleteModal = function (table, mensaje, activo) {
    swal({
        title: mensaje + " persona",
        text: "Estás seguro(a) de " + mensaje.toLowerCase() + " " + count + " persona(s)?",
        type: "info",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true
    }, function () {
            DeletePersonas(table, activo);
    });
};

//Commands
function limpiarModal() {
    $(".form-control-person").val("");
    //$(".select-form-person").val(0).change();

    flatpickrFechaNacimiento.clear();

    var switchPromotor = $('#persona_edit_promotor');
    if (switchPromotor.is(":checked")) {
        switchPromotor.click();
    }

    var switchActivo = $('#persona_edit_activo');
    if (!switchActivo.is(":checked")) {
        switchActivo.click();
    }

    showErrors(formPerson, {});   // Clean errors

    var addressTable = $('#address-table').DataTable();
    addressTable.clear().draw();

    $("#persona_id").val("0");    
    $('.nav-tabs a[href="#general"]').tab('show');

    var options = {
        "backdrop": "static",
        keyboard: true
    };
    $('#modal-persona').modal(options);
    $('#modal-persona').modal('show');
}

function SavePersona() {
    var persona = {
        Persona_Id: $("#persona_id").val(),
        Sucursal_Id: $("#branch_id").val(),
        Grupo_Id: $("#groups_list").val(),
        Estado_Id: $("#states_list").val(),
        Status_Cliente_Id: $("#status_clients_list").val(),
        Ocupacion_Id: $("#ocupations_list").val(),
        //Clave: $("#clave").val(),
        Nombre: $("#nombre").val(),
        Apellido_Paterno: $("#apellido_paterno").val(),
        Apellido_Materno: $("#apellido_materno").val(),
        Fecha_Nacimiento: $("#dropper-fecha-nacimiento").val(),
        INE: $("#ine").val(),
        CURP: $("#curp").val(),
        RFC: $("#rfc").val(),
        Sexo: ($('#rbMujer').is(":checked") ? "M" : "H"),
        Telefono1: $("#telefono1").val(),
        Telefono2: $("#telefono2").val(),
        Telefono3: $("#telefono3").val(),
        Monto_PreAutorizado: $("#monto_preautorizado").val(),
        Nuevo_Monto: $("#nuevo_monto").val(),
        Email: $("#email").val(),
        Promotor: $("#persona_edit_promotor").is(":checked"),
        Activo: $("#persona_edit_activo").is(":checked")        
    };
    
    var addresses = new Array();
    var table = $('#address-table').DataTable();
    table.data().each(function (d) {
        var address = {
            Domicilio_Id: d.domicilio_Id,
            Persona_Id: d.persona_Id,
            Estado_Id: d.estado_Id,
            Municipio_Id: d.municipio_Id,
            Colonia_Id: d.colonia_Id,
            Calle: d.calle,
            Numero_Exterior: d.numero_Exterior,
            Numero_Interior: d.numero_Interior,
            Estado: d.estado,
            Municipio: d.municipio,
            Colonia: d.colonia,
            Codigo_Postal: d.codigo_Postal,
            Activo: d.activo,
            Usuario_Registro: d.usuario_Registro,
            Usuario_Modifico: d.usuario_Modifico,
            Fecha_Registro: d.fecha_Registro,
            Fecha_Modificacion: d.fecha_Modificacion
        };
        addresses.push(address);
    });

    var branchId = $("#branch_id").val();
    var userName = $("#user_name_session").val();

    if (persona.Persona_Id === "0" || persona.Persona_Id === "") {
        $.ajax({
            method: "POST",
            url: rootUrl + "/Catalogos/Persona/Guardar",
            data: {
                "personaP": persona,
                "domicilios": addresses,
                "sucursalId": branchId,
                "usuario": userName
            },
            success: function (response) {        
                if (response.success) {
                    swal("Mensaje", response.message, "success");

                    $('#modal-persona').modal('hide')

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
            url: rootUrl + "/Catalogos/Persona/Actualizar",
            data: {
                "personaP": persona,
                "domicilios": addresses,
                "sucursalId": branchId,
                "usuario": userName
            },
            success: function (response) {               
                if (response.success) {
                    swal("Mensaje", response.message, "success");

                    $('#modal-persona').modal('hide')

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

function UpdatePersonas(table) {
    showErrors(formPerson, {});   // Clean errors

    var dataRows = table.rows({ selected: true }).data();
    $('.nav-tabs a[href="#general"]').tab('show');

    if (dataRows.length > 0) {
        var person = dataRows[0];       

        $.ajax({
            method: "POST",
            url: rootUrl + "/Catalogos/Persona/ObtenerPersona",
            data: {
                "personaId": person.persona_Id                
            }
        })
            .done(function (data) {
                
                $("#persona_id").val(data.persona_Id);
                $("#branches_list").val(data.sucursal_Id).change();
                $("#groups_list").val(data.grupo_Id).change();
                $("#states_list").val(data.estado_Id).change();
                $("#status_clients_list").val(data.status_Cliente_Id).change();
                $("#ocupations_list").val(data.ocupacion_Id).change();
                //$("#clave").val(data.clave);
                $("#nombre").val(data.nombre);
                $("#apellido_paterno").val(data.apellido_Paterno);
                $("#apellido_materno").val(data.apellido_Materno);
                
                var fecha = DateMxToUS(data.fecha_Nacimiento)
                var fechaNacimiento = new Date(fecha);
                flatpickrFechaNacimiento.setDate(fechaNacimiento, true);

                $("#ine").val(data.ine);
                $("#curp").val(data.curp);
                $("#rfc").val(data.rfc);
                $("#sexo").val(data.sexo);                
                $("#telefono1").val(data.telefono1);
                $("#telefono2").val(data.telefono2);
                $("#telefono3").val(data.telefono3);
                $("#monto_preautorizado").val(data.monto_PreAutorizado);
                $("#nuevo_monto").val(data.nuevo_Monto);
                $("#email").val(data.email);

                if (data.sexo == "M")
                    $("#rbMujer").prop("checked", true);
                else
                    $("#rbHombre").prop("checked", true);

                var switchPromotor = $('#persona_edit_promotor');
                if (data.promotor) {
                    switchPromotor.click();
                }

                var switchActivo = $('#persona_edit_activo');
                if (data.activo !== switchActivo.is(":checked")) {
                    switchActivo.click();
                }

                $("#address_persona_id").val(data.persona_Id);

                var addressTable = $('#address-table').DataTable();
                addressTable.ajax.reload();                 

                var options = {
                    "backdrop": "static",
                    keyboard: true
                };
                $('#modal-persona').modal(options);
                $('#modal-persona').modal('show');              
            });
    }
}

function DeletePersonas(table, activo) {
    var dataRows = table.rows({ selected: true }).data();
    var personaIds = new Array();
    for (var i = 0; i < dataRows.length; i++) {
        personaIds.push(dataRows[i].persona_Id);
    }    

    $.ajax({
        method: "DELETE",
        url: rootUrl + "/Catalogos/Persona/Eliminar",
        data: {
            "personaIds": personaIds,
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

function onSelectEventAddress(table) {
    table.on('select', function (e, dt, type, indexes) {
        if (type === 'row') {            
            var buttons = table.buttons([1]); // Edit, Principal
            buttons.enable();
        }
    });

    table.on('deselect', function (e, dt, type, indexes) {
        if (type === 'row') {
            var rows = dt.rows({ selected: true }).count();
            if (rows === 0) {
                var buttons = table.buttons([1]); // Edit, Principal
                buttons.disable();
            }
        }
    });
}
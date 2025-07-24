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

    $("#cmbZonas").change(function () {
        var table = $('#ajax-table').DataTable();
        table.ajax.reload();
    });
    
    // Hook up the form so we can prevent it from being posted
    var form = document.querySelector("form#executive_edit");
    form.addEventListener("submit", function(ev) {
        ev.preventDefault();
        handleFormSubmit(form);
    });    

    $("#executive_activo_filter").change(function () {
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
    
    SetSelectedMenu('#menu_Ejecutivo');
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
        presence: true,
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
var form = document.querySelector("form#executive_edit");
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
            url: rootUrl + '/Catalogos/Ejecutivo/Obtener',
            type: 'POST',
            data: function (d) {
                d.sucursalId = $("#branch_id").val();                
                d.activo = $('#executive_activo_filter').is(":checked");
                d.zonaId = $("#cmbZonas").val(); 
            }
        },
        "language": tableLanguage,
        dom: 'Brftlip',
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
                    UpdateExecutives(table);
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
                "targets": [0, 1, 2, 11, 12, 13, 14],
                "visible": false,
                "searchable": false
            }
        ],
        select: {
            style: 'multi'
        },
        "columns": [            
            { "data": "ejecutivo_Id" },
            { "data": "sucursal_Id" },
            { "data": "zona_Id" },            
            { "data": "nombre" },
            { "data": "clave" },          
            { "data": "zona" },
            { "data": "numero_Empleado" },            
            {
                "data": "fecha_Ingreso",
                render: function (data, type, row) {                   
                    var date = new Date(data.replace(/-/g, '\/').replace(/T.+/, ''));
                    var month = date.getMonth() + 1;
                    return date.getDate() + "/" + (month.toString().length > 1 ? month : "0" + month) + "/" + date.getFullYear();                   
                },
            },            
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
        var form = document.querySelector("form#executive_edit");
        HandleFormSubmit(form);
    });
};

var deleteModal = function (table, mensaje, activo) {
    var count = table.rows({ selected: true }).count();
    swal({
        title: mensaje + " ejecutivo",
        text: "Estás seguro(a) de " + mensaje.toLowerCase() + " " + count + " ejecutivo(s)?",
        type: "info",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true
    }, function () {
        DeleteExecutives(table, activo);
    });
};

//Commands
function limpiarModal() {
    $(".form-control-ejec").val("");
    $(".select-form").val(0).change();

    flatpickrFechaIngreso.clear();

    var switchGestor = $('#executive_edit_gestor');
    if (switchGestor.is(":checked")) {
        switchGestor.click();
    }

    var switchCartera = $('#executive_edit_cartera');
    if (switchCartera.is(":checked")) {
        switchCartera.click();
    }

    var switchActivo = $('#executive_edit_activo');
    if (!switchActivo.is(":checked")) {
        switchActivo.click();
    }

    showErrors(form, {});   // Clean errors

    var options = {
        "backdrop": "static",
        keyboard: true
    };
    $('#modal-ejecutivo').modal(options);
    $('#modal-ejecutivo').modal('show');
}
function HandleFormSubmit(form) {
    var selectErrors = false;

    var errors = validate(form, constraints);
    // then we update the form to reflect the results
    showErrors(form, errors || {});

    $("#zonas_messages").empty();
    var value = $("#zonas_list").val();
    if (value === "0") {
        $("#zonas_messages")
            .append('<p class="text-danger error">Favor de seleccionar una zona</p>');
        selectErrors = true;
    }

    if (!errors && !selectErrors) {
        SaveExecutive();
    } else {
        swal("Favor de corregir los errores");
        setTimeout(function () {
            $(".confirm").prop("disabled", false);
        }, 100);
    }
}

function SaveExecutive() {
    var executive = {
        Ejecutivo_Id: $("#executive_id").val(),
        Sucursal_Id: $("#branch_id").val(),
        Clave: "", //$("#clave").val(),
        Nombre: $("#nombre").val(),
        Numero_Empleado: $("#numero_empleado").val(),
        Fecha_Ingreso: $("#dropper-fecha-ingreso").val(),
        Gestor: $("#executive_edit_gestor").is(":checked"),
        Cartera: $("#executive_edit_cartera").is(":checked"),
        Activo: $("#executive_edit_activo").is(":checked"),        
        Zona_Id: $("#zonas_list").val()
    };

    var userName = $("#user_name_session").val();
    var table = $('#ajax-table').DataTable();
    var buttons = table.buttons([1, 2, 3]); //Editar, Desactivar, Activar

    if (executive.Ejecutivo_Id === "0") {
        $.ajax({
            method: "POST",
            url: rootUrl + "/Catalogos/Ejecutivo/Guardar",
            data: {
                "ejecutivoP": executive,
                "usuario": userName
            },
            success: function (response) {
                if (response.success) {
                    swal("Mensaje", response.message, "success");
                    $('#modal-ejecutivo').modal('hide');                    
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
    } else {
        $.ajax({
            method: "PUT",
            url: rootUrl + "/Catalogos/Ejecutivo/Actualizar",
            data: {
                "ejecutivoP": executive,
                "usuario": userName
            },
            success: function (response) {
                if (response.success) {
                    swal("Mensaje", response.message, "success");
                    $('#modal-ejecutivo').modal('hide');                    
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
}

function UpdateExecutives(table) {
    showErrors(form, {});   // Clean errors

    var dataRows = table.rows({ selected: true }).data();
    if (dataRows.length > 0) {
        var data = dataRows[0];

        $("#executive_id").val(data.ejecutivo_Id);        
        //$("#clave").val(data.clave);
        $("#zonas_list").val(data.zona_Id).change();
        $("#nombre").val(data.nombre);
        $("#numero_empleado").val(data.numero_Empleado);

        var fechaIngreo = new Date(data.fecha_Ingreso);
        flatpickrFechaIngreso.setDate(fechaIngreo, true);

        var switchGestor = $('#executive_edit_gestor');
        if (data.gestor !== switchGestor.is(":checked")) {
            switchGestor.click();
        }

        var switchCartera = $('#executive_edit_cartera');
        if (data.cartera !== switchCartera.is(":checked")) {
            switchCartera.click();
        }

        var switchActivo = $('#executive_edit_activo');
        if (data.activo !== switchActivo.is(":checked")) {
            switchActivo.click();
        }

        var options = {
            "backdrop": "static",
            keyboard: true
        };
        $('#modal-ejecutivo').modal(options);
        $('#modal-ejecutivo').modal('show');
    }
}

function DeleteExecutives(table, activo) {
    var dataRows = table.rows({ selected: true }).data();
    var executiveIds = new Array();
    for (var i = 0; i < dataRows.length; i++) {
        executiveIds.push(dataRows[i].ejecutivo_Id);
    }

    var userName = $("#user_name_session").val();

    $.ajax({
        method: "DELETE",
        url: rootUrl + "/Catalogos/Ejecutivo/Eliminar",
        data: {
            "ejecutivoIds": executiveIds,
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
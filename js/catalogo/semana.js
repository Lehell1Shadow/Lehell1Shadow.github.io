'use strict';

var flatpickrFechaInicio;
var flatpickrFechaFinal;

$(document).ready(function () {
    $.getJSON(rootUrl + '/json/TableLanguage.json', function (data) {
        console.log("Table language success");
    })
        .always(function (data) {
            BuildTable(data);
        });

    //Initialize flat datepicker
    flatpickrFechaInicio = flatpickr('#dropper-fecha-inicio', {
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

    flatpickrFechaFinal = flatpickr('#dropper-fecha-fin', {
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
    var form = document.querySelector("form#week_edit");
    form.addEventListener("submit", function(ev) {
        ev.preventDefault();
        handleFormSubmit(form);
    });    
    
    SetSelectedMenu('#menu_Semana');
});

// Validation
// These are the constraints used to validate the form
var constraints = {
    clave: {
        presence: false,
        length: {
            minimum: 1,
            maximum: 8
        }
    },
    descripcion: {
        presence: true,
        length: {
            minimum: 0,
            maximum: 20
        }
    },
    fecha_inicio: {
        presence: true,
    },
    fecha_fin: {
        presence: true,
    }
};

// Hook up the inputs to validate on the fly
var inputs = document.querySelectorAll("input, textarea, select")
var form = document.querySelector("form#week_edit");
for (var i = 0; i < inputs.length; ++i) {
    inputs.item(i).addEventListener("change", function(ev) {
        var errors = validate(form, constraints) || {};
        showErrorsForInput(this, errors[this.name]);
    });
}

function BuildTable(tableLanguage) {
    var table = $('#ajax-table').DataTable({
        responsive: true,
        processing: true,
        serverSide: false,
        ajax: {
            url: rootUrl + '/Catalogos/Semana/Obtener',
            type: 'POST'
        },
        "language": tableLanguage,
        dom: 'Bftlip',
        "buttons": [
            {
                text: '<i class="fa fa-plus-square fa-2x"></i>',
                titleAttr: 'Nuevo',
                action: function (e, dt, node, config) {
                    $(".form-control-normal").val("");
                    $(".js-example-basic-single").val(0).change();
                                        
                    flatpickrFechaInicio.clear();
                    flatpickrFechaFinal.clear();

                    var switchActual = $('#week_edit_actual');
                    if (switchActual.is(":checked")) {
                        switchActual.click();
                    }

                    var switchCaptura = $('#week_edit_captura');
                    if (switchCaptura.is(":checked")) {
                        switchCaptura.click();
                    }

                    showErrors(form, {});   // Clean errors

                    var options = {
                        "backdrop": "static",
                        keyboard: true
                    };
                    $('#modal-semana').modal(options);
                    $('#modal-semana').modal('show');
                }
            },
            {
                text: '<i class="fa fa-pencil-square-o fa-2x"></i>',
                titleAttr: 'Editar',
                action: function (e, dt, node, config) {
                    UpdateWeeks(table);
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
                "targets": [0, 7, 8, 9, 10],
                "visible": false,
                "searchable": false
            }
        ],
        select: {
            style: 'single'
        },
        "columns": [
            { "data": "semana_Id" },
            { "data": "clave" },
            { "data": "descripcion" },
            { "data": "fecha_Inicio",
                render: function (data, type, row) {
                    var date = new Date(data.replace(/-/g, '\/').replace(/T.+/, ''));
                    var month = date.getMonth() + 1;
                    return date.getDate() + "/" + (month.toString().length > 1 ? month : "0" + month) + "/" + date.getFullYear();
                }
            },
            {
                "data": "fecha_Fin",
                render: function (data, type, row) {
                    var date = new Date(data.replace(/-/g, '\/').replace(/T.+/, ''));
                    var month = date.getMonth() + 1;
                    return date.getDate() + "/" + (month.toString().length > 1 ? month : "0" + month) + "/" + date.getFullYear();
                }
            },
            {
                "data": "actual",
                render: function (data, type, row) {
                    return PrintCheckbox(data, type, row);
                },
                className: "dt-body-center"
            },
            {
                "data": "captura",
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
    table.order([0, 'desc']);
    onSelectEvent(table);
}

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
        var form = document.querySelector("form#week_edit");
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
        DeleteWeeks(table, activo);
    });
};

function HandleFormSubmit(form) {
    var selectErrors = false;

    var errors = validate(form, constraints);
    // then we update the form to reflect the results
    showErrors(form, errors || {});

    if (!errors && !selectErrors) {
        SaveWeek();
    } else {
        swal("Favor de corregir los errores");
        setTimeout(function () {
            $(".confirm").prop("disabled", false);
        }, 100);
    }
}

function SaveWeek() {
    var week = {
        Semana_Id: $("#semana_id").val(),
        Clave: $("#clave").val(),
        Descripcion: $("#descripcion").val(),
        Numero_Empleado: $("#numero_empleado").val(),
        Fecha_Inicio: DateMxToUS($("#dropper-fecha-inicio").val()),
        Fecha_Fin: DateMxToUS($("#dropper-fecha-fin").val()),
        Actual: $("#week_edit_actual").is(":checked"),
        Captura: $("#week_edit_captura").is(":checked"),
        Usuario_Registro: "",
        Usuario_Modifico: "",
        Fecha_Registro: new Date(),
        Fecha_Modificacion: new Date(),
    };

    var userName = $("#user_name_session").val();
    var table = $('#ajax-table').DataTable();

    if (week.Semana_Id === "" || week.Semana_Id === "0" || week.Semana_Id === "-1") {
        $.ajax({
            method: "POST",
            url: rootUrl + "/Catalogos/Semana/Guardar",
            data: {
                "semana": week,
                "usuario": userName
            }
        })
            .done(function (msg) {
                if (msg === "") {                   
                    table.ajax.reload();
                    table.buttons([1]).disable();
                    $('#modal-semana').modal('hide');
                    swal("Mensaje", "Se guardó correctamente la información de la semana!!!", "success");
                } else {
                    swal("Mensaje", msg, "warning");
                    setTimeout(function () {
                        $(".confirm").prop("disabled", false);
                    }, 100);
                }
            });
    } else {
        $.ajax({
            method: "PUT",
            url: rootUrl + "/Catalogos/Semana/Actualizar",
            data: {
                "semana": week,
                "usuario": userName
            }
        })
            .done(function (msg) {
                if (msg === "") {
                    table.ajax.reload();
                    table.buttons([1]).disable();
                    $('#modal-semana').modal('hide');
                    swal("Mensaje", "Se actualizó correctamente la información de la semana!!!", "success");
                } else {
                    swal("Mensaje", msg, "warning");
                    setTimeout(function () {
                        $(".confirm").prop("disabled", false);
                    }, 100);
                }
            });
    }
}

function UpdateWeeks(table) {
    showErrors(form, {});   // Clean errors

    var dataRows = table.rows({ selected: true }).data();
    if (dataRows.length > 0) {
        var data = dataRows[0];
        $("#semana_id").val(data.semana_Id);
        $("#clave").val(data.clave);
        $("#descripcion").val(data.descripcion);

        var fechaInicio = new Date(data.fecha_Inicio.replace(/-/g, '\/').replace(/T.+/, ''));
        var fechaFin = new Date(data.fecha_Fin.replace(/-/g, '\/').replace(/T.+/, ''));

        flatpickrFechaInicio.setDate(fechaInicio, true);
        flatpickrFechaFinal.setDate(fechaFin, true);


        var switchActual = $('#week_edit_actual');
        if (data.actual !== switchActual.is(":checked")) {
            switchActual.click();
        }

        var switchCaptura = $('#week_edit_captura');
        if (data.captura !== switchCaptura.is(":checked")) {
            switchCaptura.click();
        }

        var options = {
            "backdrop": "static",
            keyboard: true
        };
        $('#modal-semana').modal(options);
        $('#modal-semana').modal('show');
    }
}

function DeleteWeeks(table, activo) {
    var dataRows = table.rows({ selected: true }).data();
    var semanaIds = new Array();
    for (var i = 0; i < dataRows.length; i++) {
        semanaIds.push(dataRows[i].semana_Id);
    }

    var userName = $("#user_name_session").val();

    $.ajax({
        method: "DELETE",
        url: rootUrl + "/Catalogos/Semana/Eliminar",
        data: {
            "semanaIds": semanaIds,
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
                var buttons = table.buttons([1]); //Editar, Desactivar, Activar
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
                var buttons = table.buttons([1]); //Editar, Desactivar, Activar
                buttons.disable();
            }
            else if (rows === 1) {
                var buttons = table.buttons([1]); //Editar, Desactivar, Activar
                buttons.enable();
            }
        }
    });
}
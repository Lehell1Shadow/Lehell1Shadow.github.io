'use strict';

$(document).ready(function () {
    $.getJSON(rootUrl + '/json/TableLanguage.json', function (data) {
        console.log("Table language success");
    })
        .always(function (data) {
            BuildTable(data);
        });    

    // Hook up the form so we can prevent it from being posted
    var form = document.querySelector("form#serie_edit");
    form.addEventListener("submit", function(ev) {
        ev.preventDefault();
        handleFormSubmit(form);
    });            

    $("#serie_activo_filter").change(function () {
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

    $(".autocompleteTipoCredito").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: rootUrl + '/Catalogos/TipoCredito/BuscarTipoCredito',
                dataType: "json",
                data: {
                    claveDescripcion: request.term
                },
                success: function (data) {
                    response($.map(data.data, function (item) {
                        return {
                            label: item.clave + " - " + item.descripcion,
                            value: item.tipo_Credito_Id,
                            id: item.tipo_Credito_Id,
                            clave: item.clave,
                            descripcion: item.descripcion,
                            plazo: item.plazo,
                            incremento: item.incremento,
                            inicial: item.monto_Inicial,
                            tope: item.monto_Tope,
                            limite_Fallas: item.limite_Fallas,
                            interes: item.interes
                        };
                    }));
                }
            });
        },
        minLength: 3,
        select: function (event, ui) {
            $("#tipo_credito_Id").val(ui.item.id);
            $("#clave_tipo_credito").val(ui.item.clave);
            $("#plazo_tipo_credito").val(ui.item.plazo);
            $("#incremento_tipo_credito").val(ui.item.incremento);
            $("#inicial_tipo_credito").val(ui.item.inicial);
            $("#tope_tipo_credito").val(ui.item.tope);

            var creditType = {
                tipo_Credito_Id: ui.item.id,
                clave: ui.item.clave,
                descripcion: ui.item.descripcion,
                plazo: ui.item.plazo,
                incremento: ui.item.incremento,
                monto_Inicial: ui.item.inicial,
                monto_Tope: ui.item.tope,
                limite_Fallas: ui.item.limite_Fallas,
                interes: ui.item.interes,
                activo: true,
                usuario_Registro: "",
                usuario_Modifico: "",
                fecha_Registro: "",
                fecha_Modificacion: ""
            };

            AddCreditType(creditType);
        },
        close: function (event, ui) {
            $("#txtClave").val("");
        }
    });

    $('#credit-type-table').css('width', '100%');

    SetSelectedMenu('#menu_Serie');
});

function AddCreditType(creditType) {
    var element = $("#tipo-credito-id-" + creditType.tipo_Credito_Id);
    if (element.length != 0 || !creditType.activo) {
        return;
    }

    var list = $("#div-tipo-creditos");

    var row = $("<div />", { class: "form-group row" });
    row.appendTo(list);

    var checkboxSpan = $("<span />", { class: "col-md-2" });
    checkboxSpan.appendTo(row);

    var element = $("#tipo-credito-id-" + creditType.tipo_Credito_Id);
    if (element.length == 0) {
        var checkobx = $('<input />', { type: 'checkbox', id: "tipo-credito-id-" + creditType.tipo_Credito_Id, class: "js-switch tipo-credito-checkbox", checked: "true" })
            .data({
                switchery: true,
            });
        checkobx.appendTo(checkboxSpan);
        new Switchery($("#tipo-credito-id-" + creditType.tipo_Credito_Id)[0], { color: '#2ed8b6', jackColor: '#fff' });
    }

    var nameSpan = $("<span />", { class: "col-md-5" });
    nameSpan.appendTo(row);

    var nameLabel = $("<label />").text(creditType.clave);
    nameLabel.appendTo(nameSpan);

    var descriptionSpan = $("<span />", { class: "col-md-5" });
    descriptionSpan.appendTo(row);

    var descriptionLabel = $("<label />").text(creditType.descripcion);
    descriptionLabel.appendTo(descriptionSpan);
}

// Validation
// These are the constraints used to validate the form
var constraints = {
    clave: {
        presence: true,
        length: {
            minimum: 1,
            maximum: 10
        }
    },
    descripcion: {
        presence: true,
        length: {
            minimum: 1,
            maximum: 50
        }
    }
};

// Hook up the inputs to validate on the fly
var inputs = document.querySelectorAll("input, textarea, select")
var form = document.querySelector("form#serie_edit");
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
            url: rootUrl + '/Catalogos/Serie/Obtener',
            type: 'POST',
            data: function (d) {                
                d.esActivo = $('#serie_activo_filter').is(":checked");
            }
        },
        "language": tableLanguage,
        dom: 'Bftlip',
        "buttons": [
            {
                text: '<i class="fa fa-plus-square fa-2x"></i>',
                titleAttr: 'Nuevo',
                action: function (e, dt, node, config) {
                    $(".form-control-serie").val("");
                    $(".select.form-control").val(0).change();

                    var switchAutomatico = $('#serie_edit_automatico');
                    if (switchAutomatico.is(":checked")) {
                        switchAutomatico.click();
                    }

                    var switchActivo = $('#serie_edit_activo');
                    if (!switchActivo.is(":checked")) {
                        switchActivo.click();
                    }

                    showErrors(form, {});   // Clean errors
                    $("#div-tipo-creditos").empty();

                    $("#serie_id").val("");

                    $('.nav-tabs a[href="#general"]').tab('show');

                    var options = {
                        "backdrop": "static",
                        keyboard: true
                    };
                    $('#modal-serie').modal(options);
                    $('#modal-serie').modal('show');
                }
            },
            {
                text: '<i class="fa fa-pencil-square-o fa-2x"></i>',
                titleAttr: 'Editar',
                action: function (e, dt, node, config) {
                    UpdateSeries(table);
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
                "targets": [0, 1, 6, 7, 8, 9],
                "visible": false,
                "searchable": false
            }
        ],
        select: {
            style: 'multi'
        },
        "columns": [
            { "data": "serie_Id" },
            { "data": "sucursal_Id" },
            { "data": "clave" },
            { "data": "descripcion" },
            {
                "data": "automatico",
                render: function (data, type, row) {
                    return PrintCheckbox(data, type, row);
                },
                className: "dt-body-center"
            },
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
        var form = document.querySelector("form#serie_edit");
        HandleFormSubmit(form);
    });
};

var deleteModal = function (table, mensaje, activo) {
    var count = table.rows({ selected: true }).count();
    swal({
        title: mensaje + " serie",
        text: "Estás seguro(a) de " + mensaje.toLowerCase() + " " + count + " serie(s)?",
        type: "info",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true
    }, function () {
        DeleteSeries(table, activo);
    });
};

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

    if (!errors && !selectErrors) {
        SaveSerie();
    } else {
        swal("Favor de corregir los errores");
        setTimeout(function () {
            $(".confirm").prop("disabled", false);
        }, 100);
    }
}

function UpdateSeries(table) {
    showErrors(form, {});   // Clean errors

    $('.nav-tabs a[href="#general"]').tab('show');
    $("#div-tipo-creditos").empty();

    var dataRows = table.rows({ selected: true }).data();
    if (dataRows.length > 0) {
        var data = dataRows[0];
        $("#serie_id").val(data.serie_Id);
        $("#clave").val(data.clave);
        $("#descripcion").val(data.descripcion);

        var switchAutomatico = $('#serie_edit_automatico');
        if (data.automatico !== switchAutomatico.is(":checked")) {
            switchAutomatico.click();
        }

        var switchActivo = $('#serie_edit_activo');
        if (data.activo !== switchActivo.is(":checked")) {
            switchActivo.click();
        }

        $("#usuario_registro").text(data.usuario_Registro);
        var fecha = $.datepicker.formatDate('dd/mm/yy', new Date(data.fecha_Registro.replace(/-/g, '\/').replace(/T.+/, '')));
        $("#fecha_registro").text(fecha);
        $("#usuario_modifico").text(data.usuario_Modifico);
        fecha = (data.fecha_Modificacion === null)? "" :
            $.datepicker.formatDate('dd/mm/yy', new Date(data.fecha_Modificacion.replace(/-/g, '\/').replace(/T.+/, '')));
        $("#fecha_modificacion").text(fecha);


        $.ajax({
            url: rootUrl + '/Catalogos/Serie/ObtenerTipoCredito',
            type: 'POST',
            data: {
                serieId: data.serie_Id
            }
        }).done(function (data) {
            data.data.forEach(function (element) {
                AddCreditType(element);
            });
        });
        
        var options = {
            "backdrop": "static",
            keyboard: true
        };
        $('#modal-serie').modal(options);
        $('#modal-serie').modal('show');
    }
}

function DeleteSeries(table, activo) {
    var dataRows = table.rows({ selected: true }).data();
    var serieIds = new Array();
    for (var i = 0; i < dataRows.length; i++) {
        serieIds.push(dataRows[i].serie_Id);
    }    

    $.ajax({
        method: "DELETE",
        url: rootUrl + "/Catalogos/Serie/Eliminar",
        data: {
            "serieIds": serieIds,
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

function SaveSerie() {
    var serie = {
        Serie_Id: $("#serie_id").val(),
        Sucursal_Id: $("#branch_id").val(),
        Clave: $("#clave").val(),
        Descripcion: $("#descripcion").val(),
        Automatico: $("#serie_edit_automatico").is(":checked"),
        Activo: $("#serie_edit_activo").is(":checked"),
        Usuario_Registro: $("#usuario_registro").val(),
        Usuario_Modifico: $("#usuario_modifico").val(),
        Fecha_Registro: $("#fecha_registro").val(),
        Fecha_Modificacion: $("#fecha_modificacion").val()
    };

    var tipoCreditoIdString = "";    
    var table = $('#credit-type-table').DataTable();
    var tipoCreditos = $(".tipo-credito-checkbox");
    for (var i = 0; i < tipoCreditos.length; i++) {
        if (tipoCreditos[i].checked) {
            var id = tipoCreditos[i].id;
            id = id.split("-");
            id = id[id.length - 1];
            tipoCreditoIdString = tipoCreditoIdString + id + "|";
        }
    }

    var table = $('#ajax-table').DataTable();
    var buttons = table.buttons([1, 2, 3]); //Editar, Desactivar, Activar

    if (serie.Serie_Id === "" || serie.Serie_Id === "0" || serie.Serie_Id === "-1") {
        $.ajax({
            method: "POST",
            url: rootUrl + "/Catalogos/Serie/Guardar",
            data: {
                "serie": serie,
                "tipoCreditoIdString": tipoCreditoIdString
            },
            success: function (msg) {
                swal("Mensaje", msg, "success");
                $('#modal-serie').modal('hide');
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
            url: rootUrl + "/Catalogos/Serie/Actualizar",
            data: {
                "serie": serie,
                "tipoCreditoIdString": tipoCreditoIdString
            },
            success: function (msg) {
                swal("Mensaje", msg, "success");
                $('#modal-serie').modal('hide');
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
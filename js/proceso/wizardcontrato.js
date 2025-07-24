'use strict';

var FILE_INE;
var FILE_INE_AVAL;
let currentStep = 1;

$(document).ready(function () {
    SetSelectedMenu('#menu_WizardContrato');            
            
    $('.next-btn').on('click', function () {
        if ($('#wizardForm')[0].checkValidity()) {
                    
            if(currentStep === 1){
                if(!validarStep1())                                                    
                    return false;
            }
            else if(currentStep === 2){
                if(!validarStep2())
                    return false;
            }
            else if(currentStep === 3){
                if(!validarStep3())
                    return false;
            }
            else if(currentStep === 4){
                validarStep4();
            }
                    
            currentStep++;                    
            showStep(currentStep);

        } else {
            $('#wizardForm')[0].reportValidity();
        }
    });

    $('.prev-btn').on('click', function () {
        currentStep--;
        showStep(currentStep);
    });

    $('#wizardForm').on('submit', function (e) {
        e.preventDefault();
        alert('Form submitted successfully!');
    });

    showStep(currentStep);

    $('.js-select2').select2();

    var value = $("#serie_list").val()
    obtenerListaCreditos(value);

    $("#serie_list").change(function () {
        var value = $(this).val()

        if (value == 0) {
            $("#folio").val("0");
            $("#folio").prop("readonly", true);
        }
        else {
            var automatico = ($(this).find(':selected').attr('data-automatico') === 'True');
            if (!automatico) {
                $("#folio").val("");
                $("#folio").prop("readonly", false);
            }
            else {
                $("#folio").val("0");
                $("#folio").prop("readonly", true);
            }
        }
        obtenerListaCreditos(value);
    });

    $("#tipo_creditos_list").change(function () {
        var value = $(this).val();

        if (value == 0) {
            $("#plazo").val("");
            $("#interes").val("");
            $("#montoInicial").val("");
        }
        else {
            var periodicidad = $(this).find(':selected').attr('data-periodicidad');
            var plazo = $(this).find(':selected').attr('data-plazo');
            var interes = $(this).find(':selected').attr('data-interes');
            var montoInicial = $(this).find(':selected').attr('data-monto-inicial');

            $("#periodicidad").val(periodicidad);
            $("#plazo").val(plazo);
            $("#interes").val(interes);
            $("#montoInicial").val(montoInicial);
        }

        $("#montoSolicitado").val("");
        limpiarAmortizacion()
    });

    $("#txtGrupo").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: rootUrl + '/Procesos/Wizard/BuscarGrupo',
                dataType: "json",
                data: {
                    q: request.term
                },
                success: function (data) {                            
                    response($.map(data.data, function (item) {
                        return {
                            label: item.clave + "-" + item.descripcion,
                            value: item.clave + "-" + item.descripcion,
                            id: item.grupo_Id,
                            clave: item.clave,
                        };
                    }));
                }
            });
        },
        minLength: 4,
        select: function (event, ui) {
            $("#grupo_Id").val(ui.item.id);
            $("#clave_Grupo").val(ui.item.clave);
            $("#txtGrupo").prop("readonly", true);                    
        }
    });

    $(".nuevoContrato").click(function () {
        location.href = rootUrl + '/Procesos/Wizard/Contrato';
    });
    $("#btnLimpiarGrupo").click(function () {
        $("#grupo_Id").val("0");
        $("#clave_Grupo").val("");
        $("#txtGrupo").val("");
        $("#txtGrupo").prop("readonly", false);
        $("#txtGrupo").focus();
    });

    //Revisión INE Cliente
    $("#btnRevisionINE").click(function () {
        $('#fileImagenURI').trigger('click');
    });
    $('#fileImagenURI').change(function (e) {
        FILE_INE = e.target.files[0];                
        revisionINE();                
    });
    $("#btnLimpiarINE").click(function () {               
        limpiarRevisionINE();
    });

    //Revisión INE AVAL
        $("#btnRevisionINEAval").click(function () {
        $('#fileImagenURIAval').trigger('click');
    });
    $('#fileImagenURIAval').change(function (e) {
        FILE_INE_AVAL = e.target.files[0];
        revisionINEAval();
    });
    $("#btnLimpiarINEAval").click(function () {
        limpiarRevisionINEAval();
    });

    //Revision Cliente
    $("#btnRevisionCliente").click(function () {
        var flag = true;
        var mensaje = "";
        var clienteId = $("#cliente_Id").val();
        var claveCliente = $("#clave_Cliente").val();
        var tipoCreditoId = $("#tipo_creditos_list").val();

        if (tipoCreditoId == "0") {
            mensaje += "*Favor de seleccionar un tipo de crédito\n";
            flag = false;
        }

        if (clienteId == "0") {
            mensaje += "*Favor de seleccionar un cliente\n";
            flag = false;
        }

        if (flag == true)
            revisionCliente(claveCliente, tipoCreditoId);
        else
            swal("Mensaje", mensaje, "warning");
    });
    $("#btnLimpiarCliente").click(function () {
        limpiarCliente();               
    });
    $("#txtCliente").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: rootUrl + '/Procesos/Wizard/BuscarPersona',
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
            $("#cliente_Id").val(ui.item.id);
            $("#clave_Cliente").val(ui.item.clave);
            $("#txtCliente").prop("readonly", true);
        }
    });

    //Revision Aval
    $("#btnRevisionAval").click(function () {
        var flag = true;
        var mensaje = "";
        var clienteId = $("#cliente_Id").val();
        var avalId = $("#aval_Id").val();
        var claveAval = $("#clave_Aval").val();

        if (clienteId == "0") {
            mensaje += "*Favor de seleccionar un cliente\n";
            flag = false;
        }

        if (avalId == "0") {
            mensaje += "*Favor de seleccionar un aval\n";
            flag = false;
        }

        if (flag == true)
            revisionAval(claveAval, clienteId);
        else
            swal("Mensaje", mensaje, "warning");
    });
    $("#btnLimpiarAval").click(function () {
        limpiarAval();
    });
    $("#txtAval").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: rootUrl + '/Procesos/Wizard/BuscarPersona',
                dataType: "json",
                data: {
                    q: request.term
                },
                beforeSend: function (xhr) {
                    $('#loaderAval').show();
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

                    $('#loaderAval').hide();
                }
            });
        },
        minLength: 5,
        select: function (event, ui) {
            $("#aval_Id").val(ui.item.id);
            $("#clave_Aval").val(ui.item.clave);
            $("#txtAval").prop("readonly", true);
        }
    });

    //Persona modal popup
    $(".nuevaPersona").click(function () {
        nuevaPersona(null);
    });

    $("#btnGuardar").click(validarContrato);
});

function showStep(step) {
    if(step ===1)
        $("#wizard-title").text("Step 1: Tipo Crédito");
    else if(step === 2)
        $("#wizard-title").text("Step 2: Revisión Cliente");
    else if(step === 3)
        $("#wizard-title").text("Step 3: Revisión Aval");
    else if(step === 4)
        $("#wizard-title").text("Step 4: Monto Solicitado");

    $('.wizard-step').addClass('d-none');
    $('#step-' + step).removeClass('d-none');
    $('#progressBar').css('width', (step) * 25 + '%').attr('aria-valuenow', (step) * 25);
}        

function obtenerListaCreditos(id) {
    if (id == -1)
        $("#plazo").val("");

    $.ajax({
        url: rootUrl + '/Procesos/Wizard/ListaTipoCreditos',
        type: 'POST',
        data: {
            serieId: id
        }
    }).done(function (response) {
        var listaTipoCreditos = $("#tipo_creditos_list");
        listaTipoCreditos.empty();

        $("<option />", {
            val: -1,
            text: "Favor de seleccionar un tipo de crédito"
        }).appendTo(listaTipoCreditos);

        response.data.forEach(function (element) {
            $("<option />", {
                val: element.tipo_Credito_Id,
                text: element.descripcion
            }).attr('data-plazo', element.plazo)
                .attr('data-periodicidad', element.periodicidad_Id)
                .attr('data-interes', element.interes)
                .attr('data-monto-inicial', element.monto_Inicial)
                .attr('data-monto-tope', element.monto_Tope)
                .appendTo(listaTipoCreditos);
        });
    });
}

function revisionCliente(claveCliente, tipoCreditoId) {

    $.ajax({
        method: "POST",
        url: rootUrl + '/Procesos/Wizard/RevisionCliente',
        data: {
            "claveCliente": claveCliente,
            "tipoCreditoId": tipoCreditoId
        },
        beforeSend: function (xhr) {
            $('.theme-loader2').show();
        },
        success: function (response) {
            $('#revisionCliente').html('');
            $('#revisionCliente').html(response);

            $('.autonumber').autoNumeric('init');

            $("#montoSolicitado").blur(calcularAmortizacion);


            $('.theme-loader2').hide();

            var mensaje = $("#mensajeCliente").val();                    
            var bloquear = ($("#bloquearCliente").val() == 'True')
                    
            if (!bloquear)
                $('#btnNextCliente').show();
            else
                $('#btnNextCliente').hide();

            if (mensaje != "") {
                mensaje = mensaje.replace(/\<br\/>/g, ' ');
                swal('Mensaje', mensaje, 'warning');
            }

        },
        error: function (xhr, textStatus, errorThrown) {
            alert(xhr);
            alert(textStatus);
            alert(errorThrown);
            $('.theme-loader2').hide();
            swal('Oops...', 'Ha occurido un error al buscar la revisión del cliente.', 'error');
        },
    });
}

function limpiarCliente() {
    $("#cliente_Id").val("0");
    $("#clave_Cliente").val("");
    $("#txtCliente").val("");
    $("#txtCliente").prop("readonly", false);

    $.ajax({
        method: "POST",
        url: rootUrl + '/Procesos/Wizard/LimpiarCliente',
        data: null,
        beforeSend: function (xhr) {
            $('.theme-loader2').show();
        },
        success: function (response) {
            $('#revisionCliente').html('');
            $('#revisionCliente').html(response);

            //setTimeout(function () {
            $('.theme-loader2').hide();
            //}, 2000);

            $('#btnNextCliente').show();

            $("#txtCliente").focus();
        },
        error: function (xhr, textStatus, errorThrown) {
            $('.theme-loader2').hide();
            swal('Oops...', 'Ha occurido un error al limpiar la información del cliente.', 'error');
        },
    });
}

function calcularAmortizacion() {
    if ($("#montoSolicitado").val() == "") {
        $("#hiddenMontoSolicitado").val("");
        limpiarAmortizacion();
        return;
    }

    var nuevo = false;
    var montoSolicitado = $("#montoSolicitado").val().replace(/[^0-9.-]+/g, "");
    var hiddenMonto = $("#hiddenMontoSolicitado").val();

    if (parseFloat(montoSolicitado) == parseFloat(hiddenMonto))
        return;

    var montoPreAutorizado = $("#montoPreAutorizado").val();

    var montoInicial = $("#tipo_creditos_list").find(':selected').attr('data-monto-inicial');
    var montoTope = $("#tipo_creditos_list").find(':selected').attr('data-monto-tope');
    var periodicidad = $("#tipo_creditos_list").find(':selected').attr('data-periodicidad');
    var plazo = $("#tipo_creditos_list").find(':selected').attr('data-plazo');
    var interes = $("#tipo_creditos_list").find(':selected').attr('data-interes');

    var fecha = $("#fechaInicioCredito").val();

    var montoInteres = parseFloat(montoSolicitado) * (parseFloat(interes) / 100);
    var abono = ((parseFloat(montoSolicitado) + parseFloat(montoInteres)) / parseFloat(plazo));

    if (montoSolicitado <= 0) {
        swal('Mensaje', '*El monto solicitado no puede ser cero, favor de verficar.', 'warning');
        return;
    }

    if ((montoSolicitado > parseFloat(montoPreAutorizado) && !nuevo)) {
        swal('Mensaje', '*El monto solicitado excede el monto pre-autorizado,\n favor de verficar.', 'warning');
        limpiarAmortizacion();
        return;
    }

    if ((montoSolicitado < parseFloat(montoInicial) || montoSolicitado > parseFloat(montoTope)) && !nuevo) {
        swal('Mensaje', '*El monto pre-autorizado está fuera de rango,\n favor de verficar.', 'warning');
        limpiarAmortizacion();

        return;
    }

    $.ajax({
        method: "POST",
        url: rootUrl + '/Procesos/Wizard/Amortizacion',
        data: {
            "interes": interes,
            "periodicidad": periodicidad,
            "plazo": plazo,
            "monto": montoSolicitado,
            "fechaCredito": fecha
        },
        beforeSend: function (xhr) {
            $('.theme-loader2').show();
        },
        success: function (response) {
            $('#tablaAmortizacion').html('');
            $('#tablaAmortizacion').html(response);

            $('#hiddenMontoSolicitado').val(montoSolicitado);
            $('#abono').val(abono.toFixed(2));

            //setTimeout(function () {
            $('.theme-loader2').hide();
            //}, 2000);
        },
        error: function (xhr, textStatus, errorThrown) {
            $('.theme-loader2').hide();
            swal('Oops...', 'Ha occurido un error al generar la tabla de amortización.', 'error');
        },
    });
}

function limpiarAmortizacion() {
    $("#montoSolicitado").val()
    $("#hiddenMontoSolicitado").val("");
    $('#abono').val("");

    $.ajax({
        method: "POST",
        url: rootUrl + '/Procesos/Wizard/LimpiarAmortizacion',
        data: null,
        success: function (response) {
            $('#tablaAmortizacion').html('');
            $('#tablaAmortizacion').html(response);
        },
        error: function (xhr, textStatus, errorThrown) {
            $('.theme-loader2').hide();
            swal('Oops...', 'Ha occurido un error al limpiar la tabla de amortización.', 'error');
        },
    });
}

function revisionAval(claveAval, clienteId) {
    $.ajax({
        method: "POST",
        url: rootUrl + '/Procesos/Wizard/RevisionAval',
        data: {
            "claveAval": claveAval,
            "clienteId": clienteId
        },
        beforeSend: function (xhr) {
            $('.theme-loader2').show();
        },
        success: function (response) {
            $('#revisionAval').html('');
            $('#revisionAval').html(response);

            $('.theme-loader2').hide();

            var mensaje = $("#mensajeAval").val();
            if (mensaje != "") {
                mensaje = mensaje.replace(/\<br\/>/g, ' ');
                swal('Mensaje', mensaje, 'warning');
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $('.theme-loader2').hide();
            swal('Oops...', 'Ha occurido un error al buscar la revisión del aval.', 'error');
        },
    });
}

function limpiarAval() {
    $("#aval_Id").val("0");
    $("#clave_Aval").val("");
    $("#txtAval").val("");
    $("#txtAval").prop("readonly", false);

    $.ajax({
        method: "POST",
        url: rootUrl + '/Procesos/Wizard/LimpiarAval',
        data: null,
        beforeSend: function (xhr) {
            $('.theme-loader2').show();
        },
        success: function (response) {
            $('#revisionAval').html('');
            $('#revisionAval').html(response);

            //setTimeout(function () {
            $('.theme-loader2').hide();
            //}, 2000);

            $("#txtAval").focus();
        },
        error: function (xhr, textStatus, errorThrown) {
            $('.theme-loader2').hide();
            swal('Oops...', 'Ha occurido un error al limpiar la información del aval.', 'error');
        },
    });
}

function agregarAval(id, clave, aval, ine, cantidad, limite) {
    var model = {
        Persona_Id: id,
        Clave_Aval: clave,
        Aval: aval,
        INE: ine
    };

    $.ajax({
        method: "POST",
        url: rootUrl + '/Procesos/Wizard/AgregarAval',
        data: {
            "model": model
        },
        //beforeSend: function (xhr) {
        //    $('.theme-loader2').show();
        //},
        success: function (response) {
            $('#listadoAvales').html('');
            $('#listadoAvales').html(response);

            limpiarAval();
            //setTimeout(function () {
            //    $('.theme-loader2').hide();
            //}, 2000);
        },
        error: function (xhr, textStatus, errorThrown) {
            $('.theme-loader2').hide();
            swal('Oops...', 'Ha occurido un error al agregar el aval.', 'error');
        },
    });
}

function eliminarAval(id) {
    $.ajax({
        method: "POST",
        url: rootUrl + '/Procesos/Wizard/EliminarAval',
        data: {
            "avalId": id
        },
        success: function (response) {
            $('#listadoAvales').html('');
            $('#listadoAvales').html(response);
        },
        error: function (xhr, textStatus, errorThrown) {
            swal('Oops...', 'Ha occurido un error al eliminar el aval.', 'error');
        },
    });
}

function guardarContrato(tipoCreditoId, serie, folio, grupoId, personaId, monto) {


    $.ajax({
        method: "POST",
        url: rootUrl + '/Procesos/Wizard/GuardarContrato',
        data: {
            "serie": serie,
            "folio": folio,
            "tipoCreditoId": tipoCreditoId,
            "grupoId": grupoId,
            "personaId": personaId,
            "monto": monto
        },
        beforeSend: function (xhr) {
            $('.theme-loader2').show();
            $("#btnGuardar").prop("disabled", true);
        },
        success: function (response) {
            $('.theme-loader2').hide();

            if (response.success) {
                swal({
                    title: "Mensaje",
                    text: response.message,
                    type: "success"
                },
                    function () {
                        location.href = rootUrl + '/Procesos/Wizard/Contrato';
                    });
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $('.theme-loader2').hide();
            swal('Oops...', 'Ha occurido un error al guardar el contrato.', 'error');
        },
    });
}

var validarContrato = function () {
    var flag = true;
    var mensaje = "";
            
    var serie = $("#serie_list option:selected").text();            
    var folio = $("#folio").val();
    var tipoCreditoId = $("#tipo_creditos_list").val();
    var grupoId = $("#grupo_Id").val();
    var personaId = $("#cliente_Id").val();
    var montoSolicitado = $("#montoSolicitado").val();
    var monto = 0;

    var qtyAvales = 0;

    if ($("#listadoAvales").length)
        qtyAvales = $("#cantidadAvales").val();

    if (tipoCreditoId == "-1") {
        mensaje += "*Favor de seleccionar un tipo de crédito\n";
        flag = false;
    }
    if (grupoId == "0") {
        flag = false;
        mensaje += '*Favor de seleccionar un grupo\n';
    }
    if (personaId == "0") {
        mensaje += "*Favor de seleccionar un cliente\n";
        flag = false;
    }
    if (montoSolicitado == "") {
        mensaje += "*Favor de escribir un monto\n";
        flag = false;
    }
    else
        monto = parseFloat(montoSolicitado.replace(/[^0-9.-]+/g, ""));

    if (parseInt(qtyAvales) == 0) {
        mensaje += "*Favor de agregar un aval\n";
        flag = false;
    }

    if (flag == true) {
        swal({
            title: 'Guardar',
            text: 'Estás seguro(a) de guardar el contrato?',
            type: 'info',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#5c90d2',
            confirmButtonText: 'Aceptar',
            closeOnConfirm: false,
            html: false
        }, function () {
            guardarContrato(tipoCreditoId, serie, folio, grupoId, personaId, monto);
        });
    }
    else
        swal("Mensaje", mensaje, "warning");
}

//<<< Modulo Nueva Persona >>>
function editarPersona(id) {
    var options = {
        "backdrop": "static",
        keyboard: true
    };

    $.ajax({
        type: "POST",
        url: rootUrl + '/Procesos/Contrato/EditarPersona',
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        data: {
            "personaId": id
        },
        datatype: "html",
        beforeSend: function (xhr) {
            $('.theme-loader2').show();
        },
        success: function (data) {
            $('.theme-loader2').hide();

            $('#body-content').html(data);
            $('#modal-normal').modal(options);
            $('#modal-normal').modal('show');
        },
        error: function (xhr, textStatus, errorThrown) {
            $('.theme-loader2').hide();

            $('#body-content').html(xhr.responseText);
            $('#modal-normal').modal(options);
            $('#modal-normal').modal('show');
        }
    });
}

function validarFormularioPersona() {
    var formPerson = document.querySelector("div#persona_edit");
    var selectErrors = false;
    var errors = validate(formPerson, constraintsPerson);
    // then we update the form to reflect the results
    showErrors(formPerson, errors || {});

    // Validate select
    $("#group_messages").empty();

    var value = $("#persona_groups_list").val();
    if (value === "0") {
        $("#group_messages")
            .append('<p class="text-danger error">Favor de seleccionar un grupo</p>');
        selectErrors = true;
    }

    $("#state_messages").empty();
    var value = $("#persona_states_list").val();
    if (value === "0") {
        $("#state_messages")
            .append('<p class="text-danger error">Favor de seleccionar un estado</p>');
        selectErrors = true;
    }

    $("#status_cliente_messages").empty();
    var value = $("#persona_status_clients_list").val();
    if (value === "0") {
        $("#status_cliente_messages")
            .append('<p class="text-danger error">Favor de seleccionar un estatus</p>');
        selectErrors = true;
    }

    $("#ocupation_messages").empty();
    var value = $("#persona_ocupations_list").val();
    if (value === "0") {
        $("#ocupation_messages")
            .append('<p class="text-danger error">Favor de seleccionar una ocupación</p>');
        selectErrors = true;
    }

    if (!errors && !selectErrors) {
        swal({
            id: "confirmModal",
            title: "Guardar",
            text: "¿Estás seguro de guardar la información?",
            type: "info",
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true
        }, function () {
            SavePersona();
        });
    } else {
        swal("Mensaje", "*Favor de corregir los errores", "warning");
        setTimeout(function () {
            $(".confirm").prop("disabled", false);
        }, 100);
    }
}

//Commands
function SavePersona() {
    var nuevo = false;
    var persona = {
        Persona_Id: $("#persona_persona_id").val(),
        Sucursal_Id: $("#branch_id").val(),
        Grupo_Id: $("#persona_groups_list").val(),
        Estado_Id: $("#persona_states_list").val(),
        Status_Cliente_Id: $("#persona_status_clients_list").val(),
        Ocupacion_Id: $("#persona_ocupations_list").val(),
        Nombre: $("#persona_nombre").val(),
        Apellido_Paterno: $("#persona_apellido_paterno").val(),
        Apellido_Materno: $("#persona_apellido_materno").val(),
        Fecha_Nacimiento: $("#persona_dropper-fecha-nacimiento").val(),
        INE: $("#persona_ine").val(),
        CURP: $("#persona_curp").val(),
        RFC: $("#persona_rfc").val(),
        Sexo: ($('#persona_rbMujer').is(":checked") ? "M" : "H"),
        Telefono1: $("#persona_telefono1").val(),
        Telefono2: $("#persona_telefono2").val(),
        Telefono3: $("#persona_telefono3").val(),
        Monto_PreAutorizado: $("#persona_monto_preautorizado").val(),
        Nuevo_Monto: $("#persona_nuevo_monto").val(),
        Email: $("#persona_email").val(),
        Promotor: $("#persona_edit_promotor").is(":checked")
    };

    persona.Monto_PreAutorizado = (persona.Nuevo_Monto) ? persona.Nuevo_Monto : persona.Monto_PreAutorizado;

    if (persona.Persona_Id === "0" || persona.Persona_Id === "") {
        persona.Persona_Id = "-1";
        nuevo = true;
    }

    var addresses = new Array();
    var table = $('#address-table').DataTable();
    table.data().each(function (d) {
        var address = {
            Domicilio_Id: d.domicilio_Id,
            Persona_Id: d.persona_Id,
            Colonia_Id: d.colonia_Id,
            Calle: d.calle,
            Numero_Exterior: d.numero_Exterior,
            Numero_Interior: d.numero_Interior,
            Estado: d.estado,
            Municipio: d.municipio,
            Colonia: d.colonia,
            Codigo_Postal: d.codigo_Postal,
            Activo: d.activo
        };
        addresses.push(address);
    });

    $.ajax({
        method: "POST",
        url: rootUrl + '/Procesos/Contrato/GuardarPersona',
        data: {
            "persona": persona,
            "domicilios": addresses
        },
        beforeSend: function (xhr) {
            $('.theme-loader2').show();
        },
        success: function (response) {
            $('.theme-loader2').hide();

            if (response.success) {
                swal('Mensaje', response.message, 'success');
                $('#modal-normal').modal('hide');

                if (nuevo == false) {
                    $("#btnRevisionCliente").click();
                }
            }
            else {
                swal('Oops...', 'Ha occurido un error al guardar la información de la persona. Error: ' +response.message, 'error');
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            $('.theme-loader2').hide();
            swal('Oops...', 'Ha occurido un error al guardar la información de la persona. Error: ', 'error');
        },
    });
}

function validarStep1() {
    var flag = true;
    var mensaje = "";

    var tipoCreditoId = $("#tipo_creditos_list").val();
    var grupoId = $("#grupo_Id").val();

    if (tipoCreditoId == "-1") {
        mensaje += "*Favor de seleccionar un tipo de crédito\n";
        flag = false;
    }
    if (grupoId == "0") {
        flag = false;
        mensaje += '*Favor de seleccionar un grupo\n';
    }

    if (!flag) {
        swal("Mensaje", mensaje, "warning");
        return false;
    }
    else
        return true;
}

function validarStep2(){
        var flag = true;
    var mensaje = "";
    var clienteId = $("#cliente_Id").val();            
    var tipoCreditoId = $("#tipo_creditos_list").val();

    if (tipoCreditoId == "0") {
        mensaje += "*Favor de seleccionar un tipo de crédito\n";
        flag = false;
    }

    if (clienteId == "0") {
        mensaje += "*Favor de seleccionar un cliente\n";
        flag = false;
    }

    if (!flag) {
        swal("Mensaje", mensaje, "warning");
        return false;
    }
    else
        return true;
}

function validarStep3(){

    var qtyAvales = 0;

    if ($("#listadoAvales").length)
        qtyAvales = $("#cantidadAvales").val();

    if (parseInt(qtyAvales) == 0) {
            swal("Mensaje", "*Favor de agregar un aval", "warning");
        return false;
    }
    else
        return true;
}

function validarStep4(){
    var montoSolicitado = $("#montoSolicitado").val();
    if (montoSolicitado == "") {                
        swal("Mensaje", "*Favor de escribir un monto", "warning");
        return false;
    }
    else
        return true;
}

function revisionINE() {           
    var fdata = new FormData();
    fdata.append("imageFile", FILE_INE);
           
    $.ajax({
        method: "POST",
        url: rootUrl + '/Procesos/Wizard/RevisionINE',
        data: fdata,
        contentType: false,
        processData: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                $('input:hidden[name="__RequestVerificationToken"]').val());

            $('.theme-loader2').show();
        },
        success: function (response) {                    
            if (response.success) {
                swal('Mensaje', response.message, 'success');                        

                $("#txtINE-Nombre").val(response.ineData.nombreCompleto);
                $("#txtINE-Curp").val(response.ineData.curp);
                $("#txtINE-ClaveElector").val(response.ineData.claveElector);
                $("#txtINE-Domicilio").val(response.ineData.domicilio);

                var imgURL = URL.createObjectURL(FILE_INE);
                $("#imgPreview").attr("src", imgURL);

                if(response.userData == null){

                    var model = {
                        nombre: response.ineData.nombre,
                        apellidoPaterno: response.ineData.apellidoPaterno,
                        apellidoMaterno: response.ineData.apellidoMaterno,
                        ine: response.ineData.claveElector,
                        curp: response.ineData.curp,
                        grupoId: $("#grupo_Id").val()
                    };

                    swal({
                        id: "confirmNewUserModal",
                        title: "Cliente Nuevo",
                        text: "No se encontró información del cliente.\n ¿Desea agregarlo como nuevo?",
                        type: "info",
                        confirmButtonText: "Aceptar",
                        cancelButtonText: "Cancelar",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        showLoaderOnConfirm: true
                    }, function () {
                        swal.close();
                        nuevaPersona(model);
                    });
                }
                else{

                    $("#cliente_Id").val(response.userData.persona_Id);
                    $("#clave_Cliente").val(response.userData.clave_Cliente);
                    $("#txtCliente").val(response.userData.nombre_Completo);
                    $("#txtCliente").prop("readonly", true);

                    $("#btnRevisionCliente").click();
                }
            }
            else {
                swal('Error', 'Ha occurido un error al revisar la información de la INE.\n' + response.message, 'error');                        
            }

            $('.theme-loader2').hide();
        },
        error: function (xhr, textStatus, errorThrown) {
            $('.theme-loader2').hide();
            swal('Error', 'Ha occurido un error al enviar la imagen de la INE .\n' + xhr.responseText, 'error');
        },
    });

}

function limpiarRevisionINE(){
    var imgURL = $("#hddImagenURI").val();
    $("#imgPreview").attr("src", imgURL);
    $("#fileImagenURI").val(null);
    FILE_INE = null;

    $("#txtINE-Nombre").val("");
    $("#txtINE-Curp").val("");
    $("#txtINE-ClaveElector").val("");
    $("#txtINE-Domicilio").val("");
}

function revisionINEAval() {
    var fdata = new FormData();
    fdata.append("imageFile", FILE_INE_AVAL);

    $.ajax({
        method: "POST",
        url: rootUrl + '/Procesos/Wizard/RevisionINE',
        data: fdata,
        contentType: false,
        processData: false,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("XSRF-TOKEN",
                $('input:hidden[name="__RequestVerificationToken"]').val());

            $('.theme-loader2').show();
        },
        success: function (response) {
            if (response.success) {
                swal('Mensaje', response.message, 'success');

                $("#txtINE-NombreAval").val(response.ineData.nombreCompleto);
                $("#txtINE-CurpAval").val(response.ineData.curp);
                $("#txtINE-ClaveElectorAval").val(response.ineData.claveElector);
                $("#txtINE-DomicilioAval").val(response.ineData.domicilio);

                var imgURL = URL.createObjectURL(FILE_INE_AVAL);
                $("#imgPreviewAval").attr("src", imgURL);

                if(response.userData == null){

                    var model = {
                        nombre: response.ineData.nombre,
                        apellidoPaterno: response.ineData.apellidoPaterno,
                        apellidoMaterno: response.ineData.apellidoMaterno,
                        ine: response.ineData.claveElector,
                        curp: response.ineData.curp,
                        grupoId: $("#grupo_Id").val()
                    };

                    swal({
                        id: "confirmNewAvalModal",
                        title: "Aval Nuevo",
                        text: "No se encontró información del aval.\n ¿Desea agregarlo como nuevo?",
                        type: "info",
                        confirmButtonText: "Aceptar",
                        cancelButtonText: "Cancelar",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        showLoaderOnConfirm: true
                    }, function () {
                        swal.close();
                        nuevaPersona(model);
                    });
                }
                else{

                    $("#aval_Id").val(response.userData.persona_Id);
                    $("#clave_Aval").val(response.userData.clave_Cliente);
                    $("#txtAval").val(response.userData.nombre_Completo);
                    $("#txtAval").prop("readonly", true);

                    $("#btnRevisionAval").click();
                }
            }
            else {
                swal('Error', 'Ha occurido un error al revisar la información de la INE.\n' + response.message, 'error');
            }

            $('.theme-loader2').hide();
        },
        error: function (xhr, textStatus, errorThrown) {
            $('.theme-loader2').hide();
            swal('Error', 'Ha occurido un error al enviar la imagen de la INE .\n' + xhr.responseText, 'error');
        },
    });

}

function limpiarRevisionINEAval(){
    var imgURL = $("#hddImagenURIAval").val();
    $("#imgPreviewAval").attr("src", imgURL);
    $("#fileImagenURIAval").val(null);
    FILE_INE = null;

    $("#txtINE-NombreAval").val("");
    $("#txtINE-CurpAval").val("");
    $("#txtINE-ClaveElectorAval").val("");
    $("#txtINE-DomicilioAval").val("");
}

function nuevaPersona(model){
    var options = {
            "backdrop": "static",
            keyboard: true
        };

        $.ajax({
            type: "POST",
            url: rootUrl + '/Procesos/Contrato/NuevaPersona',
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            datatype: "html",
            beforeSend: function (xhr) {
                $('.theme-loader2').show();
            },
            success: function (data) {
                $('.theme-loader2').hide();

                $('#body-content').html(data);
                $('#modal-normal').modal(options);
                $('#modal-normal').modal('show');
                        
                if(model!= null){
                    $("#persona_status_clients_list").val("1").change();
                    $("#persona_status_clients_list").prop("disabled", true);
                    $("#persona_groups_list").val(model.grupoId).change();

                    $("#persona_nombre").val(model.nombre);
                    $("#persona_apellido_paterno").val(model.apellidoPaterno);
                    $("#persona_apellido_materno").val(model.apellidoMaterno);

                    $("#persona_ine").val(model.ine);
                    $("#persona_curp").val(model.curp);
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                $('.theme-loader2').hide();

                $('#body-content').html(xhr.responseText);
                $('#modal-normal').modal(options);
                $('#modal-normal').modal('show');
            }
        });
}    
 
'use strict';

$(document).ready(function () {
    var form = document.querySelector("form#cambiar_password_edit");
    form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        handleFormSubmit(form);
    });
});

// Validation
// These are the constraints used to validate the form
var constraints = {
    contraseña: {
        presence: true,
        length: {
            minimum: 0,
            maximum: 100
        }
    },
    repetir_contraseña: {
        presence: true,
        length: {
            minimum: 0,
            maximum: 100
        }
    }
};

// Hook up the inputs to validate on the fly
var inputs = document.querySelectorAll("input, textarea, select")
var form = document.querySelector("form#cambiar_password_edit");
for (var i = 0; i < inputs.length; ++i) {
    inputs.item(i).addEventListener("change", function (ev) {
        var errors = validate(form, constraints) || {};
        showErrorsForInput(this, errors[this.name]);
    });
}

function HandleFormSubmit(form) {
    var selectErrors = false;

    $("#password_message").empty();

    var errors = validate(form, constraints);
    // then we update the form to reflect the results
    showErrors(form, errors || {});

    if ($("#password").val() != $("#repetir_password").val()) {
        $("#password_message")
            .append('<p class="text-danger error">Contraseñas no coínciden</p>');
        selectErrors = true;
    }

    if (!errors && !selectErrors) {
        SavePassword();
    } else {
        swal("Favor de corregir los errores");
        setTimeout(function () {
            $(".confirm").prop("disabled", false);
        }, 100);
    }
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
        var form = document.querySelector("form#cambiar_password_edit");
        HandleFormSubmit(form);
    });
};

function SavePassword() {
    $.ajax({
        method: "POST",
        url: rootUrl + "/Home/CambiarPassword",
        data: {
            "password": $("#password").val()
        },
        beforeSend: function (xhr) {
            $('.theme-loader').show();
            $("#btnGuardar").prop("disabled", true);
        },
        success: function (msg) {
            $('.theme-loader').hide();

            if (msg === "") {
                swal({
                    title: "Mensaje",
                    text: "Se cambió correctamente la contraseña!!!",
                    type: "success"
                },
                    function () {
                        location.href = rootUrl + '/Home/CambiarPassword';
                    });
            } else {
                swal("Error", msg, "error");
            }

        },
        error: function (xhr, textStatus, errorThrown) {
            $('.theme-loader').hide();
            swal('Oops...', 'Ha occurido un error al enviar la información de la nueva contraseña.', 'error');
        },
    });
}
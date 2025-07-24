'use strict';

$(document).ready(function () {

    // Hook up the form so we can prevent it from being posted
    var form = document.querySelector("div#colonia_edit");
    form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        handleFormColoniaSubmit(form);
    });    

    $("#estados_list").change(function () {   
        var _default_Id = "0";
        var estadoId = $("#estados_list").val();                

        $.ajax({
            url: rootUrl + '/Catalogos/Municipio/Obtener',
            type: 'POST',
            data: {
                estadoId: estadoId                
            }
        }).done(function (data) {
            $("#estado_messages").text('');

            var municipiosList = $("#municipios_list");
            municipiosList.empty();

            $("<option />", {
                val: _default_Id,
                text: "Favor de seleccionar un municipio"
            }).appendTo(municipiosList);

            data.data.forEach(function (element) {
                $("<option />", {
                    val: element.municipio_Id,
                    text: element.descripcion
                }).appendTo(municipiosList);             
            });            
        });
    });
    $("#municipios_list").change(function () {       
        $("#municipio_messages").text('');
    });

    $("#lnkNuevaColonia").click(function () {        
        var options = {
            "backdrop": "static",
            keyboard: true
        };
        $('#modal-colonia').modal(options);
        $('#modal-colonia').modal('show');         
        $("#modal-address").modal('hide');
    });
});

// Validation
// These are the constraints used to validate the form
var constraints = {
    colonia_codigo_postal: {
        presence: true,
        length: {
            minimum: 1,
            maximum: 5
        }
    },
    colonia: {
        presence: true,
        length: {
            minimum: 1,
            maximum: 50
        }
    }
};

function handleFormColoniaSubmit(form) {
    var selectErrors = false;

    var errors = validate(form, constraints);
    // then we update the form to reflect the results
    showErrors(form, errors || {});   

    $("#estado_messages").empty();
    var value = $("#estados_list").val();
    if (value === "0") {
        $("#estado_messages")
            .append('<p class="text-danger error">Favor de seleccionar un estado</p>');
        selectErrors = true;
    }

    $("#municipio_messages").empty();
    var value = $("#municipios_list").val();
    if (value === "0") {
        $("#municipio_messages")
            .append('<p class="text-danger error">Favor de seleccionar un municipio</p>');
        selectErrors = true;
    }

    if (!errors && !selectErrors) {
        GuardarColonia();
    } else {
        swal("Favor de corregir los errores");
        setTimeout(function () {
            $(".confirm").prop("disabled", false);
        }, 100);
    }
}

var confirmChangesColoniaModal = function () {    
    var formColonia = document.querySelector("div#colonia_edit");
    handleFormColoniaSubmit(formColonia, true);    
};

//Commands
function GuardarColonia() {
    var model = {
        Colonia_Id: -1,        
        Municipio_Id: $("#municipios_list").val(),
        Colonia: $("#colonia").val(),
        Codigo_Postal: $("#colonia_codigo_postal").val(),
        Oficina_Postal: $("#colonia_codigo_postal").val(),       
        Activo: true
    };

        $.ajax({
            method: "POST",
            url: rootUrl + "/Catalogos/Colonia/Guardar",
            data: {
                "coloniaP": model               
            },
            success: function (response) {
                if (response.success) {
                    $("#estados_list").val(0).change();
                    $("#colonia_codigo_postal").val("");
                    $("#colonia").val("");

                    swal("Mensaje", response.message, "success");
                    CloseColoniaFormModal();
                }
                else {
                    swal("Mensaje", response.message, "error");
                }
            },
            error: function (response) {
                swal("Error", response.message, "error");
                setTimeout(function () {
                    $(".confirm").prop("disabled", false);
                }, 100);
            }
        });   
}

function CloseColoniaFormModal() {
    $("#modal-colonia").modal('hide');     
    $("#modal-address").modal('show');
}
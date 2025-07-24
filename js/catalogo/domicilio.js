'use strict';

$(document).ready(function() {
    // Hook up the form so we can prevent it from being posted
    var formAddress = document.querySelector("div#address_edit");
    formAddress.addEventListener("submit", function(ev) {
        ev.preventDefault();
        HandleAddressFormSubmit(formAddress);
    });    

    $("#codigo_postal").blur(function () {               
        var codigoPostal = $("#codigo_postal").val();                

        $.ajax({
            url: rootUrl + '/Catalogos/Colonia/Obtener',
            type: 'POST',
            data: {
                estadoId: -1,
                municipioId: -1,
                filtro: "",
                codigoPostal: codigoPostal
            }
        }).done(function (data) {
            var neighborList = $("#neighbor_list");
            neighborList.empty();

            $("<option />", {
                    val: 0,
                    text: "Favor de seleccionar una colonia"
            }).appendTo(neighborList);

            data.data.forEach(function (element) {
                $("<option />", {
                    val: element.colonia_Id,
                    text: element.colonia
                }).attr('data-estado', element.estado).attr('data-municipio', element.municipio).appendTo(neighborList);
            });
        });
    });

    $("#neighbor_list").change(function () {
        var value = $(this).val();

        if (value == 0) {
            $("#estado").val("");
            $("#municipio").val("");
        }
        else {
            var estado = $(this).find(':selected').attr('data-estado');
            var municipio = $(this).find(':selected').attr('data-municipio');

            $("#estado").val(estado);
            $("#municipio").val(municipio);
        }

    });
});

// Validation
// These are the constraints used to validate the form
var constraintsAddress = {
    calle: {
        presence: true,
        length: {
            minimum: 1,
            maximum: 100
        }
    },
    codigo_postal: {
        presence: true,
        length: {
            minimum: 1,
            maximum: 100
        }
    },
    numero_exterior: {
        presence: false,
        length: {
            minimum: 0,
            maximum: 10
        }
    },
    numero_interior: {
        presence: false,
        length: {
            minimum: 0,
            maximum: 10
        }
    }
};

// Hook up the inputs to validate on the fly
var inputs = document.querySelectorAll("input, textarea, select")
var formAddress = document.querySelector("div#address_edit");

//HandleAddressFormSubmit(formAddress, false);
//for (var i = 0; i < inputs.length; ++i) {
//    inputs.item(i).addEventListener("change", function(ev) {
//        var errors = validate(formAddress, constraintsAddress) || {};
//        showErrorsForInput(this, errors[this.name]);
//    });
//}

var confirmChangesAddressModal = function () {
    //var form = document.querySelector("div#address_edit");
    var validationPassed = HandleAddressFormSubmit(formAddress, true);
    if (validationPassed) {
        //swal({
        //    id: "confirmModal",
        //    title: "Confirmar cambios",
        //    text: "¿Estás seguro de realizar los cambios?",
        //    type: "info",
        //    confirmButtonText: "Confirmar",
        //    cancelButtonText: "Cancelar",
        //    showCancelButton: true,
        //    closeOnConfirm: false,
        //    showLoaderOnConfirm: true
        //}, function () {
        SaveAddress();
        //});
    }
};

var confirmAddressModal = function (table) {
    swal({
        title: "Dirección Principal",
        text: "Estás seguro(a) de actualizar el domicilio principal",
        type: "info",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        showCancelButton: true,
        closeOnConfirm: false,
        showLoaderOnConfirm: true
    }, function () {
        principalAddress(table);
    });
};

function UpdateAddresses(table) {
    var rows = table.rows({ selected: true });
    var dataRows = rows.data();
    
    if (rows.length > 0) {
        var _default_Id = 0;
        var data = dataRows[0];
        var index = rows[0];
        $("#address_id").val(data.domicilio_Id);
        $("#address_persona_id").val(data.persona_Id);        
        $("#address_index").val(index);
        $("#codigo_postal").val(data.codigo_Postal);
        
        $.ajax({
            url: rootUrl + '/Catalogos/Colonia/Obtener',
            type: 'POST',
            data: {
                estadoId: -1,
                municipioId: -1,
                filtro: "",
                codigoPostal: data.codigo_Postal
            }
        }).done(function (d) {
            var neighborList = $("#neighbor_list");
            neighborList.empty();

            $("<option />", {
                val: _default_Id,
                text: "Favor de seleccionar una colonia"
            }).appendTo(neighborList);

            d.data.forEach(function (element) {
                $("<option />", {
                    val: element.colonia_Id,
                    text: element.colonia
                }).attr('data-estado', element.estado).attr('data-municipio', element.municipio).appendTo(neighborList);
            });
            //setTimeout(function () {
                $("#neighbor_list").val(data.colonia_Id).change();
            //}, 400);

        });        
        
        $("#calle").val(data.calle);
        $("#numero_exterior").val(data.numero_Exterior);
        $("#numero_interior").val(data.numero_Interior);

        var switchActivo = $('#address_edit_activo');
        if (data.activo !== switchActivo.is(":checked")) {
            switchActivo.click();
        }
        
        var options = {
            "backdrop": "static",
            keyboard: true
        };
        $('#modal-address').modal(options);
        $('#modal-address').modal('show');
    }
}

function principalAddress(table) {
    var dataRows = table.rows({ selected: true }).data();

    if (dataRows.length > 0) {
        var address = dataRows[0];        

        $.ajax({
            method: "POST",
            url: rootUrl + "/Catalogos/Direccion/Principal",
            data: {
                "domicilioId": address.domicilio_Id                
            }
        })
            .done(function (msg) {
                CloseAddressFormModal();
                table.ajax.reload();
                swal(msg);
            });

        var buttons = table.buttons([1]);
        buttons.disable();
    }    
}

function HandleAddressFormSubmit(formAddress, showDialog) {
    var selectErrors = false;

    var errors = validate(formAddress, constraintsAddress);
    // then we update the form to reflect the results
    showErrors(formAddress, errors || {});

    // Validate select    
    $("#neighbors_messages").empty();
    var value = $("#neighbor_list").val();
    if (value === "0") {
        $("#neighbors_messages")
            .append('<p class="text-danger error">Favor de seleccionar una colonia</p>');
        selectErrors = true;
    }

    if (!errors && !selectErrors) {
        return true;
    } else {
        if (showDialog) {
            swal("Favor de corregir los errores");
            setTimeout(function () {
                $(".confirm").prop("disabled", false);
            }, 100);
        }
    }
}

function SaveAddress() {
    var index = $("#address_index").val();
    var address = {
        Domicilio_Id: $("#address_id").val(),
        Persona_Id: $("#address_persona_id").val(),        
        Colonia_Id: $("#neighbor_list").val(),
        Calle: $("#calle").val(),
        Numero_Exterior: $("#numero_exterior").val(),
        Numero_Interior: $("#numero_interior").val(),        
        Codigo_Postal: $("#codigo_postal").val(),
        Colonia: $("#neighbor_list option:selected").text(),        
        Estado: $("#estado").val(),
        Municipio: $("#municipio").val(),
        Activo: $("#address_edit_activo").is(":checked")       
    };

    if (address.Domicilio_Id === "0" || address.Domicilio_Id === "") {
        address.Domicilio_Id = -1;
        address.Persona_Id = -1;
    }

    var table = $('#address-table').DataTable();

    if (address.Activo) {
        table.column(3).nodes().each(function (node, index, dt) {
            table.cell(node).data(false);
        });
    }

    table.rows( function ( idx, data, node ) {
        return idx === parseInt(index);
    })
        .remove()
        .draw();

    var rowNode = table.row.add({
        "domicilio_Id": address.Domicilio_Id,
        "persona_Id": address.Persona_Id,        
        "colonia_Id": address.Colonia_Id,
        "calle": address.Calle,
        "numero_Exterior": address.Numero_Exterior,
        "numero_Interior": address.Numero_Interior,        
        "codigo_Postal": address.Codigo_Postal,
        "colonia": address.Colonia,                
        "municipio": address.Municipio,
        "estado": address.Estado,
        "activo": address.Activo        
    })
        .draw()
        .node();

    $(rowNode)
        .css( 'color', 'red' )
        .animate({ color: 'black' });     

    var buttons = table.buttons([1]);
    buttons.disable();       

    setTimeout(function () {
        $(".confirm").prop("disabled", false);
        CloseAddressFormModal();
    }, 100);
}

function CloseAddressFormModal() {
    $("#address_id").val("0");
    $("#modal-address").modal('hide');
}
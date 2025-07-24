'use strict';

$(document).ready(function () {
    
    $("#gestor_list_filter").change(function () {
        var gestor = $("#gestor_list_filter option:selected").text();
        var value = $(this).val();

        if (value == 0) {
            $("#Grupo_Grupo_Id").val("0");
            $("#Grupo_Clave").val("");
            $("#Grupo_Descripcion").val("");            
        }
        else {
            $("#Grupo_Grupo_Id").val("-1");
            $("#Grupo_Clave").val(value);
            $("#Grupo_Descripcion").val(gestor);          
        }
    });

    $("#serie_list").change(function () {
        var serie = $("#serie_list option:selected").text();
        var value = $(this).val();

        if (value == 0) {
            $("#Serie").val("");            
        }
        else {
            $("#Serie").val(serie);            
        }
    });

    $("#btnGenerar").click(function () {
        var mensaje = '';
        var flag = true;
        var grupoId = $("#Grupo_Grupo_Id").val();
        var serieId = $("#serie_list").val();                    
        
        if (grupoId == '0' || grupoId == '') {
            flag = false;
            mensaje += '*Favor de seleccionar un gestor\n';
        }
        if (serieId == '0') {
            flag = false;
            mensaje += '*Favor de seleccionar un tipo\n';
        }  

        if (flag) {
            $.ajax({
                type: "POST",
                url: rootUrl + '/Juridico/Hoja/Generar',
                data: $('#formHojaFallo').serialize(),
                dataType: 'json',
                success: function (data) {
                    if (data) {
                        if (data.bloquear)
                            swal('Mensaje', data.mensaje, 'warning');
                        else {
                            $("#btnGenerar").hide();
                            location.href = rootUrl + "/Juridico/Hoja/Nuevo";
                        }
                    }
                    else
                        swal('Mensaje', "No se encontro niguna información del registro de jurídico", 'warning');
                },
                error: function (data) {
                    swal('Oops...', 'Ha occurido un error al generar el registro del jurídico. Error: ' + data.message, 'error');
                }
            })
            return false;
        }
        else
            swal("Mensaje", mensaje, "warning");

        return false;
    });

    SetSelectedMenu('#menu_NuevaHojaJuridico');
});
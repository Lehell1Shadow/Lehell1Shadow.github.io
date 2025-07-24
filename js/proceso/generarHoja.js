'use strict';

$(document).ready(function () {

    //$("#serie_list").change(function () {
        var serie = $("#serie_list option:selected").text();
        var value = $("#serie_list").val();

        if (value == 0) {
            $("#Serie").val("");
            $("#Folio").val("Automático");
            $("#Folio").prop("readonly", true);
        }
        else {
            $("#Serie").val(serie);
            var automatico = ($(this).find(':selected').attr('data-automatico') === 'True');

            if (!automatico) {
                $("#Folio").val("");
                $("#Folio").prop("readonly", false);
            }
            else {
                $("#Folio").val("Automático");
                $("#Folio").prop("readonly", true);
            }
        }
    //});

    $("#btnLimpiarGrupo").click(function () {
        $("#txtRecaudar").val("$0.00");
        $("#Debe_Entregar").val("0");

        $("#Grupo_Grupo_Id").val("0");
        $("#Grupo_Clave").val("");
        $("#Grupo_Descripcion").val("");
        $("#txtGrupo").val("");
        $("#txtGrupo").prop("readonly", false);
        $("#txtGrupo").focus();
    });

    $("#txtGrupo").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: rootUrl + '/Procesos/Hoja/BuscarGrupo',
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
                            grupo: item.descripcion
                        };
                    }));
                }
            });
        },
        minLength: 4,
        select: function (event, ui) {
            $("#Grupo_Grupo_Id").val(ui.item.id);
            $("#Grupo_Clave").val(ui.item.clave);
            $("#Grupo_Descripcion").val(ui.item.grupo);
            $("#txtGrupo").prop("readonly", true);

            ObtenerDebeEntregar(ui.item.id);
        }
    });

    $("#btnGenerar").click(function () {
        var mensaje = '';
        var flag = true;
        var grupoId = $("#Grupo_Grupo_Id").val();
        var serieId = $("#serie_list").val();
        var automatico = ($("#serie_list").find(':selected').attr('data-automatico') === 'True');
        var folio = $("#Folio").val();

        if (serieId == '0') {
            flag = false;
            mensaje += '*Favor de seleccionar una serie\n';
        }

        if (!automatico && serieId != '0') {

            if (folio == '') {
                flag = false;
                mensaje += '*Favor de escribir el folio\n';
            }
        }
        
        if (grupoId == '0' || grupoId=='') {
            flag = false;
            mensaje += '*Favor de seleccionar un grupo\n';
        }

        if (flag) {
            $.ajax({
                type: "POST",
                url: rootUrl + '/Procesos/Hoja/Generar',
                data: $('#formHojaFallo').serialize(),
                dataType: 'json',
                success: function (data) {
                    if (data) {
                        if (data.bloquear)
                            swal('Mensaje', data.mensaje, 'warning');
                        else {
                            $("#btnGenerar").hide();
                            location.href = rootUrl + "/Procesos/Hoja/Nuevo";
                        }
                    }
                    else
                        swal('Mensaje', "No se encontro niguna información del registro diario", 'warning');
                },
                error: function (data) {
                    swal('Oops...', 'Ha occurido un error al generar el registro diario. Error: ' + data.message, 'error');
                }
            })
            return false;
        }
        else
            swal("Mensaje", mensaje, "warning");

        return false;
    });

    SetSelectedMenu('#menu_NuevaHoja');
});

function ObtenerDebeEntregar(id) {
    $.ajax({
        method: "POST",
        url: rootUrl + "/Procesos/Hoja/ObtenerDebeEntregar",
        data: {
            "grupoId": id
        },
        success: function (data) {
            $("#txtRecaudar").val(currencyFormat(data));
            $("#Debe_Entregar").val(data);
        },
        error: function (data) {
            swal('Oops...', 'Error al obtener el monto a entregar.', 'error');
        }
    });
} 
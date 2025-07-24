'use strict';
$(document).ready(function () {
    $("#btnList").click(function () {
        $("#view").val(1);
        $("#listView").show();
        $("#gridView").hide();
    });

    $("#btnGrid").click(function () {
        $("#view").val(2);
        $("#gridView").show();
        $("#listView").hide();
    });

    var view = getQuerystring('vw');
    if (view) {
        if (view == 1)
            $("#btnList").click();
        else
            $("#btnGrid").click();
    }

    SetSelectedMenu('#menu_GenerarControles');
});

function generar(id, nombre) {
    swal({
        title: 'Generar control',
        text: 'Estás seguro(a) de generar el control para ' + nombre + '?',
        type: 'info',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#5c90d2',
        confirmButtonText: 'Aceptar',
        closeOnConfirm: false,
        showLoaderOnConfirm: true,
        html: false
    }, function () {
        var view = $("#view").val();
        $.ajax({
            method: "POST",
            url: rootUrl + '/Procesos/Cierre/Generar',
            data: { "ejecutivoId": id },
            success: function (data) {
                if (data.success) {
                    swal('Mensaje', 'Se genero correctamente el control del ejecutivo!!!', 'success');
                    $(".confirm").hide();
                    setTimeout(function () {
                        location.href = rootUrl + '/Procesos/Cierre/Controles?vw=' + view;
                    }, 1000);
                }
                else {
                    swal('Mensaje', response.message, 'error');
                }
            },
            error: function (data) {
                swal('Oops...', 'Error al generar el control.', 'error');
            }
        });
    });
} 
'use strict';

$(document).ready(function () {    
    $.getJSON(rootUrl + '/json/TableLanguage.json', function (data) {
        console.log("Table language success");
    })
        .always(function (data) {            
            BuildTable(data);
        });

    $("#executives_list_filter").change(function () {
        var table = $('#ajax-table').DataTable();
        table.ajax.reload();
    });
 
    SetSelectedMenu('#menu_CierreSemanal');

});

function BuildTable(tableLanguage) {    
    $('#ajax-table').DataTable({       
        responsive: true,
        processing: true,
        serverSide: false,
        paging: false,
        ajax: {
            url: rootUrl + '/Procesos/Cierre/ObtenerCierre',
            type: 'POST',
            data: function (d) {
                d.branchId = $("#branch_id").val();
                d.ejecutivoId = $("#executives_list_filter").val();
            }
        },
        language: tableLanguage,
        columns: [
            {
                "data": "status",
                render: function (data) {
                    if (data)
                        return '<label class="label label-success">Generado</label>';
                    else
                        return '<label class="label label-warning">Pendiente</label>';

                },
                className: "dt-body-center"
            },
            { "data": "grupo" },
            { "data": "hoja_Semanal" },
            { "data": "supervisor" }            
        ]
    });
}
'use strict';
$(document).ready(function () {

    $.getJSON(rootUrl + '/json/TableLanguage.json', function (data) {
        console.log("Table language success");
    })
        .always(function (data) {
            BuildTable(data);           
        });

    $("#group_list_filter").change(function () {       
        ReloadContractTable();
    });
   
    $('#ajax-docs-table').css('width', '100%');

    SetSelectedMenu('#menu_GoogleDrive');
});


function BuildTable(tableLanguage) {
    var table = $('#ajax-docs-table').DataTable({
        responsive: false,
        processing: true,
        serverSide: false,               
        ajax: {
            url: rootUrl + '/Procesos/Documentos/ObtenerTablaDocumentos',
            type: 'POST',
            data: function (d) {
                d.grupoId = $('#group_list_filter').val();               
            }
        },
        "language": tableLanguage,
        dom: 'ftlip',       
        "columnDefs": [           
            {
                "targets": [0],
                "visible": false,
                "searchable": false
            }
        ],
        select: {
            style: 'single'
        },
        "columns": [            
            { "data": "documento_Id" },           
            {
                "data": null,
                render: function (data, type, row) {                                       
                    return '<a href="'+data.fileURI+'" target="_blank"><i class="fa fa-file-pdf-o text-c-red f-40"></i> Click para abrir</a>';
                },
                className: "text-center"
            },           
            { "data": "fileName" },                                    
            {
                "data": "fecha_Registro",
                render: function (data, type, row) {
                    var date = new Date(data);
                    var month = date.getMonth() + 1;
                    return date.getDate() + "/" + (month.toString().length > 1 ? month : "0" + month) + "/" + date.getFullYear();
                },
            }                
        ]
    });    
}

function ReloadContractTable() {    
    var table = $('#ajax-docs-table').DataTable();    
    table.ajax.reload();    
}
 
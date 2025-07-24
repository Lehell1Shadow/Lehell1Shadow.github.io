'use strict';
$(document).ready(function () {

    $.getJSON(rootUrl + '/json/TableLanguage.json', function (data) {
        console.log("Table language success");
    })
        .always(function (data) {
            BuildTable(data);

            $("#ajax-contract-table tbody").on('click', '.editContract', function (e) {
                var _target = e.currentTarget;
                var value = _target.getAttribute('id-value');                
                location.href = rootUrl + '/Juridico/Abogado/Editar?id=' + value;
            } );
        });
   
    $('#ajax-contract-table').css('width', '100%');
    
    SetSelectedMenu('#menu_ControlAbogado');
});


function BuildTable(tableLanguage) {   
    var table = $('#ajax-contract-table').DataTable({
        responsive: true,
        processing: true,
        serverSide: false,
        ajax: {
            url: rootUrl + '/Juridico/Abogado/Tabla',
            type: 'POST',
            data: function (d) {                                
            }
        },
        "language": tableLanguage,
        dom: 'ftlip',       
        "columnDefs": [
            {
                targets: 0,
                data: null,
                defaultContent: '',
                orderable: false,
                "searchable": false,
                //className: 'select-checkbox'
            },
            {
                "targets": [1],
                "visible": false,
                "searchable": false
            }
        ],
        select: {
            style: 'single'
        },
        "columns": [
            { "data": "defaultContent" },
            { "data": "juridico_Id" },           
            {
                "data": null,
                render: function (data, type, row) {                                   
                    return RenderButton(data.juridico_Id, data.nombre_Cliente, "editContract", "Editar", false, '<i class="fa fa-pencil-square-o"></i>');
                },
                className: "dt-body-center"
            },
            //{ "data": "serie" },
            //{ "data": "folio" },                              
            { "data": "nombre_Cliente" },           
            { "data": "ine" },
            { "data": "grupo" },            
            {
                "data": "fecha_Entrega_Documento",
                render: function (data, type, row) {
                    var date = new Date(data);
                    var month = date.getMonth() + 1;
                    return date.getDate() + "/" + (month.toString().length > 1 ? month : "0" + month) + "/" + date.getFullYear();
                },
            },            
            {
                "data": "monto_Adeudo",
                render: $.fn.dataTable.render.number(',', '.', 2, '$').display
            },            
            {
                "data": "monto_Abogado",
                render: $.fn.dataTable.render.number(',', '.', 2, '$').display
            },            
            {
                "data": "fecha_Diligencia",
                render: function (data, type, row) {
                    var date = new Date(data);
                    var month = date.getMonth() + 1;
                    if (data)
                        return date.getDate() + "/" + (month.toString().length > 1 ? month : "0" + month) + "/" + date.getFullYear();
                    else
                        return '';
                },
            },
            { "data": "embargo_Bienes" },
            { "data": "descripcion_Bienes" },
            { "data": "convenio_Pago" },            
            {
                "data": "monto_Convenio",
                render: $.fn.dataTable.render.number(',', '.', 2, '$').display
            }, 
            { "data": "plazo_Convenio" },                                     
            {
                "data": "garantia",
                render: function (data, type, row) {
                    return PrintCheckbox(data, type, row);
                }
            },            
            { "data": "comentario" } 
        ]
    });       
}

function ReloadContractTable() {    
    var table = $('#ajax-contract-table').DataTable();    
    table.ajax.reload();
}
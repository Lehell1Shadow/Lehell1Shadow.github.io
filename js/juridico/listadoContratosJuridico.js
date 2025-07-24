'use strict';
$(document).ready(function () {

    $.getJSON(rootUrl + '/json/TableLanguage.json', function (data) {
        console.log("Table language success");
    })
        .always(function (data) {
            BuildTable(data);   
            BuildModalTable(data);
        });

    $("#btnBuscarClientes").click(function () {
        $("#cmbGrupos").val("0").change();
        $('#txtPagare').val("");
        $('#txtFiltro').val("");
         
        var table = $('#ajax-buscar-table').DataTable();
        table
            .clear()
            .draw();

        var options = {
            "backdrop": "static",
            keyboard: true
        };
        $('#modalClientes').modal(options);
        $('#modalClientes').modal('show');
        
    });
    $("#btnReload").click(function () {        
        reloadTable();
    });

    $('#ajax-buscar-table').off().on('click', "tbody tr", function () {

        var span = $(this).children('td').find('span.chk');

        if (!span.hasClass("disabled")) {
            if (!$(this).hasClass('selected')) {
                span.html('<i class="fa fa-check-square-o fa-2x"></i>');
            }
            else {
                span.html('<i class="fa fa-square-o fa-2x"></i>');
            }
        }
        else {
            span.removeClass("disabled");

            if (!$(this).hasClass('selected')) {
                $(this).removeClass('selected');
                span.html('<i class="fa fa-square-o fa-2x"></i>');
            }
            else
                span.html('<i class="fa fa-check-square-o fa-2x"></i>');
        }

    });

    $('#ajax-contract-table').css('width', '100%');
    $('#ajax-buscar-table').css('width', '100%');    

    SetSelectedMenu('#menu_ListadoClientesJuridico');
});

function BuildTable(tableLanguage) {
    var table = $('#ajax-contract-table').DataTable({
        responsive: true,
        processing: true,
        serverSide: false,               
        ajax: {
            url: rootUrl + '/Juridico/Abogado/TablaContratos',
            type: 'POST',
            data: function (d) {                               
                d.groupId = $('#group_list_filter').val();
                d.creditTypeId = $('#credit_Type_list_filter').val();                
            }
        },
        "language": tableLanguage,
        dom: 'ftlip',
        //"buttons": [
        //    { extend: "excel", className: "hidden" },
        //],
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
            style: 'multi'
        },
        "columns": [
            { "data": "defaultContent" },
            { "data": "contrato_Id" },
            { "data": "identificador" },                           
            { "data": "clave_Cliente" },
            { "data": "nombre_Cliente" },
            //{ "data": "clave_Grupo" },
            { "data": "grupo" },            
            {
                "data": "fecha_Inicio_Credito",
                render: function (data, type, row) {
                    var date = new Date(data);
                    var month = date.getMonth() + 1;
                    return date.getDate() + "/" + (month.toString().length > 1 ? month : "0" + month) + "/" + date.getFullYear();
                },
            },       
            { "data": "numero_Prestamo" },
            {
                "data": "monto_Solicitado",
                render: $.fn.dataTable.render.number(',', '.', 2, '$').display
            },
            { "data": "total_Adeudos" },            
            {
                "data": "deuda",
                render: $.fn.dataTable.render.number(',', '.', 2, '$').display
            },                                               
            {
                "data": "saldo",
                render: $.fn.dataTable.render.number(',', '.', 2, '$').display
            },
            {
                "data": "deuda_Extra",
                render: $.fn.dataTable.render.number(',', '.', 2, '$').display
            }, 
            { "data": "tipo_Credito" },
            { "data": "plazo" }               
        ]
    });       
}

function ReloadContractTable() {    
    var table = $('#ajax-contract-table').DataTable();    
    table.ajax.reload();
}

function reloadTable() {
    var table = $('#ajax-buscar-table').DataTable();
    table.ajax.reload();
}

var confirmacionMoverModal = function () {
    var table = $('#ajax-buscar-table').DataTable();
    var dataRows = table.rows({ selected: true }).data();

    if (dataRows.length > 0) {
        swal({
            title: "Deudores",
            text: "Estás seguro(a) de mover " + dataRows.length + " cliente(s)?",
            type: "info",
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true
        }, function () {
            agregarClientes();
        });
    }
    else
        swal("Mensaje", "*Favor de seleccionar al menos un cliente", "warning");
};

function agregarClientes() {
    var table = $('#ajax-buscar-table').DataTable();
    var listaContratos = new Array();
    table.rows({ selected: true }).data().each(function (d) {
        var contratoId = d.contrato_Id;           
        listaContratos.push(contratoId);
    });

    $.ajax({
        method: "POST",
        url: rootUrl + '/Juridico/Abogado/Mover',
        data: {
            "contratos": listaContratos
        },
        success: function (response) {  

            if (response) {
                if (response.success) {
                    swal({
                        title: "Mensaje",
                        text: response.message,
                        type: "success"
                    },
                        function () {
                            $('#txtPagare').focus();
                        });
                }                
            }           

            $('#txtFiltro').val("");
            $('#txtPagare').val("");
            $('#txtPagare').focus();
            ReloadContractTable();
            var table = $('#ajax-buscar-table').DataTable();
            table
                .clear()
                .draw();
        },
        error: function (xhr, textStatus, errorThrown) {
            swal('Oops...', 'Ha occurido un error al mover los clientes al área de jurídico.Error: ' + xhr.message, 'error');            
        }
    });
}

function BuildModalTable(tableLanguage) {
    
    $('#ajax-buscar-table').DataTable({
        responsive: true,
        processing: true,
        serverSide: false,
        paging: false,
        ajax: {
            url: rootUrl + '/Juridico/Abogado/BuscarDeudores',
            type: 'POST',
            data: function (d) {
                d.groupId = $('#cmbGrupos').val();
                d.pagare = $('#txtPagare').val();
                d.filtro = $('#txtFiltro').val();
            }
        },
        "language": tableLanguage,
        //dom: 'fltip',
        "columnDefs": [
            {
                "targets": [1],
                "visible": false,
                "searchable": false
            }
        ],
        select: {
            style: 'multi',            
        },
        "ordering": false,
        "columns": [
            {
                "data": null,
                render: function (data, type, row) {
                    return '<span class="chk text-info" onclick="disableSpanChk(this);"><i class="fa fa-square-o fa-2x"></i></span>';
                }
            },
            { "data": "contrato_Id" },            
            { "data": "identificador" },            
            { "data": "clave_Cliente" },
            { "data": "nombre_Cliente" },
            { "data": "grupo" },
            {
                "data": "fecha_Inicio_Credito",
                render: function (data, type, row) {
                    var date = new Date(data);
                    var month = date.getMonth() + 1;
                    return date.getDate() + "/" + (month.toString().length > 1 ? month : "0" + month) + "/" + date.getFullYear();
                },
            },
            { "data": "monto_Solicitado" },
            { "data": "total_Adeudos" }                                
        ]
    });
}
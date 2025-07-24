'use strict';
$(document).ready(function () {

    $.getJSON(rootUrl + '/json/TableLanguage.json', function (data) {
        console.log("Table language success");
    })
        .always(function (data) {
            BuildTable(data);            
        });

    $("#btnNuevo").click(function () {
        location.href = rootUrl + '/Juridico/Hoja/';
    });    

    $('#ajax-hoja-table').css('width', '100%');
    
    SetSelectedMenu('#menu_ListadoHojasJuridico');
});

function BuildTable(tableLanguage) {
    var table = $('#ajax-hoja-table').DataTable({
        responsive: true,
        processing: true,
        serverSide: false,
        ajax: {
            url: rootUrl + '/Juridico/Hoja/Get',
            type: 'POST',
            data: function (d) {
                d.sucursalId = $("#branch_id").val();                
                d.clave = $('#gestor_list_filter').val();
                d.serie = $("#serie_list_filter").val();
            }
        },
        "language": tableLanguage,
        dom: 'Bftlip',
        "buttons": [
            {                
                text: '<i class="fa fa-level-up fa-2x"></i>',
                titleAttr: 'Agregar movimientos',
                action: function () {
                    var dataRows = table.rows({ selected: true }).data();

                    if (dataRows.length > 0) {
                        var data = dataRows[0];
                        window.location.href = "Editar?id=" + data.hoja_Semana_Id;
                    }
                },
                enabled: false,
            },
            {
                text: '<i class="fa fa-retweet fa-2x"></i>',
                titleAttr: 'Corregir movimientos',
                action: function () {
                    var dataRows = table.rows({ selected: true }).data();

                    if (dataRows.length > 0) {
                        var data = dataRows[0];
                        window.location.href = "Corregir?id=" + data.hoja_Semana_Id;
                    }
                },
                enabled: false,
            },
            {
                text: '<i class="fa fa-trash fa-2x"></i>',
                titleAttr: 'Borrar registro jurídico',
                action: function () {
                    deleteSheetModal(table);
                },
                enabled: false,
            },
        ],
        "columnDefs": [
            {
                targets: 0,
                data: null,
                defaultContent: '',
                orderable: false,
                "searchable": false                
            },
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
            { "data": "hoja_Semana_Id" },            
            { "data": "identificador" },            
            { "data": "clave_Grupo" },
            { "data": "grupo" },            
            //{ "data": "fecha_Pago" },
            {
                "data": "fecha_Pago",
                render: function (data, type, row) {
                    var date = new Date(data);
                    var month = date.getMonth() + 1;
                    return date.getDate() + "/" + (month.toString().length > 1 ? month : "0" + month) + "/" + date.getFullYear();
                },
            },
            {
                "data": "debe_Entregar",
                render: $.fn.dataTable.render.number(',', '.', 2, '$').display
            },
            {
                "data": "adeudo",
                render: $.fn.dataTable.render.number(',', '.', 2, '$').display
            },
            {
                "data": "recuperado",
                render: $.fn.dataTable.render.number(',', '.', 2, '$').display
            },
            {
                "data": "total",
                render: $.fn.dataTable.render.number(',', '.', 2, '$').display
            },            
            {
                "data": "semana_Extra",
                render: $.fn.dataTable.render.number(',', '.', 2, '$').display
            },
            {
                "data": "total_Entregar",
                render: $.fn.dataTable.render.number(',', '.', 2, '$').display
            },           
            { "data": "comentario" }           
        ]
    });

    onSelectEvents(table);
}

function ReloadSheetTable() {
    var table = $('#ajax-hoja-table').DataTable();
    table.ajax.reload();
}

var deleteSheetModal = function (table) {
    var dataRows = table.rows({ selected: true }).data();

    if (dataRows.length > 0) {
        var data = dataRows[0];
        swal({
            title: "Eliminar",
            text: "Estás seguro(a) de eliminar el registro del jurídico " + data.hS_Serie + "-" + data.hS_Folio + "?",
            type: "info",
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true
        }, function () {
                DeleteHoja(data.hoja_Semana_Id, table);
        });
    }
    else
        swal("Mensaje","Error al obtener el registro seleccionado","error");
};

function DeleteHoja(id, table) {
    var userName = $("#user_name_session").val();
    var branchId = $("#branch_id").val();

    $.ajax({
        method: "DELETE",
        url: rootUrl + "/Juridico/Hoja/Delete",
        data: {
            "hojaId": id,
            "branchId": branchId,
            "userName": userName
        }
    })
        .done(function (msg) {
            table.ajax.reload();
            swal(msg);
        });
}

function onSelectEvents(table) {
    table.on('select', function (e, dt, type, indexes) {
        if (type === 'row') {            
            var buttons = table.buttons([0, 1, 2]);
            buttons.enable();
        }
    });

    table.on('deselect', function (e, dt, type, indexes) {
        if (type === 'row') {
            var rows = dt.rows({ selected: true }).count();
            if (rows === 0) {
                var buttons = table.buttons([0, 1, 2]);
                buttons.disable();
            }
        }
    });
}
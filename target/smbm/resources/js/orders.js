window.onload = function () {
    var list;
    var count;
    var now = 1;

    $.get("orders_queryOrders.action", {
        page: 1, rows: 5
    }, function (data, status) {
        list = data;
        //alert("数据: " + JSON.stringify(list) + "\n状态: " + status);
        //alert(list.rows[1].address);
        count = Math.floor((list.total + 4) / 5);
        //alert(count);
        //alert(Math.floor(9/5));
        //alert(page);
        var last = now - 1;
        //alert(now);
        if (now > 1) {

            //alert(last);
            $("#pagination").append("<li class=\"am-pagination-prev\">\n" +
                "        <a href=\"#\" class=\"\" onclick='getOrders(" + last + ")'>上一页</a>\n" +
                "      </li>");
        } else {
            $("#pagination").append("<li class=\"am-pagination-prev  am-disabled\">\n" +
                "        <a href=\"#\" class=\"\" onclick='getOrders(" + last + ")'>上一页</a>\n" +
                "      </li>");
        }

        $("#pagination").append(" <li class=\"am-pagination-select\" >\n" +
            "          <select id='select'>");

        for (var i = 1; i <= count; i++) {
            if (i == now) {
                b = "  <option value=\"#\" class=\"\" selected=\"selected\" onclick='getOrders(" + i + ")'>" + i + "\n" +
                    "\n" +
                    "</option>"
            } else {
                b = "  <option value=\"#\" class=\"\" onclick='getOrders(" + i + ")'>" + i + "\n" +
                    "\n" +
                    "</option>"
            }
            $("#select").append(b);
        }

        $("#pagination").append(" </select>\n" +
            "        </li>");

        if (count != 1 && now != count) {

            //alert(now);
            var next = now + 1;
            //alert(next+"1lalal");
            $("#pagination").append(" <li class=\"am-pagination-next \">\n" +
                "        <a href=\"#\" class=\"\" onclick='getOrders(" + next + ")'>下一页</a>\n" +
                "      </li>");
        }


        for (var i = 0; i < list.rows.length; i++) {
            //alert(list.rows);
            //alert(obj.id);
            //alert(list.rows[i].whlist.warehouse.name);
            var a = 1;

            s = "<tr><td><input type=\"checkbox\" name='check' value='" + list.rows[i].id + "' /></td><td>" + i + "</td><td>" + list.rows[i].id +
                "</td>+<td>" + list.rows[i].goods.name + "</td><td>" +
                list.rows[i].num + "</td>" +
                "<td>" +
                list.rows[i].price + "</td>"
                + "<td>" +
                list.rows[i].provider.pname + "</td>" + "<td>" + list.rows[i].sum + "</td>" +
                "<td>" + list.rows[i].whlist.warehouse.name + "</td>" + "<td>" + list.rows[i].date + "</td>"
                + "<td>" +
                "<div class=\"tpl-table-black-operation\">\n" +
                "<a href=\"javascript:;\" onclick= editOrders('" +
                list.rows[i].id + "','" + list.rows[i].whlist.warehouse.name + "','" + list.rows[i].goods.name + "','" + list.rows[i].num + "','" + list.rows[i].price + "','" + list.rows[i].date + "','" +
                list.rows[i].provider.pname + "','" + list.rows[i].whlist.id + "')>" +
                "<i class=\"am-icon-pencil\"></i> 编辑\n" +
                "</a>\n" +

                "<a href=\"javascript:;\" class=\"tpl-table-black-operation-del\" onclick=delOrders('" + list.rows[i].id + "')>\n" +
                "<i class=\"am-icon-trash\"></i> 删除\n" +
                "</a>\n" +
                "</div>\n" +
                "</td></tr>";
            // alert(s);
            $("#test").append(s);

        }


    });

    var Menu;
    $.get("getmenu.action", function (data, status) {
        Menu = data;
        //alert("数据: " +JSON.stringify(Menu) + "\n状态: " + status);
        menuTree(Menu, document.getElementById('tree'), 'tree');
    });

}

$(document).ready(function () {

    $('#doc-prompt-toggle').on('click', function () {
        //alert("123");

        $.get("warehouse_queryWarehouse.action",
            {
                'name': null
            },
            function (data, status) {
                //alert("数据: \n" + JSON.stringify(data) + "\n状态: " + status);
                $('#selectwa').empty();
                for (var i = 0; i < data.rows.length; i++) {
                    $("#selectwa").append("<option value=" + data.rows[i].id + ">" + data.rows[i].name + "</option>");
                }
            });

        $.get("provider_queryProvider.action",
            {
                'pname': null
            },
            function (data, status) {
                //alert("数据: \n" + JSON.stringify(data) + "\n状态: " + status);
                $('#selectpno').empty();
                for (var i = 0; i < data.rows.length; i++) {
                    $("#selectpno").append("<option value=" + data.rows[i].pno + ">" + data.rows[i].pname + "");
                }
            });

        $('#addnum').val("");
        $('#addprice').val("");

        $('#my-prompt').modal({
            relatedTarget: this,
            onConfirm: function (e) {
                //alert(e.data[2])
                //alert(e.data);
                //alert($("#selectgood option:selected").val());
                //alert($("#selectwa option:selected").val());
                //alert($('#my-startDate').text());
                //alert($("#selectgood option:selected").attr("wno"));
                //alert($("#selectpno option:selected"));
                if ($('#addprice').val().length != 0 && $('#addnum').val().length != 0 && !isNaN($('#addprice').val()) && !isNaN($('#addnum').val())) {
                    $.post("orders_saveOrders.action",
                        {
                            'provider.pno': $("#selectpno option:selected").val(),
                            'num': e.data[1],
                            'price': e.data[0],
                            'goods.id': $("#selectgood option:selected").val(),
                            'date': $('#my-startDate').text(),
                            'whlist.id': $("#selectgood option:selected").attr("wno")

                        },
                        function (data, status) {
                            //alert("数据: \n" + data + "\n状态: " + status);
                            alert(data.tip);
                            if (status == 'success') {
                                alert("插入成功!");
                                getOrders(1);
                            }

                        });
                } else {
                    alert("字段不正确!");
                }

                //alert('你输入的是：' + e.data[0] || '')
            },
            onCancel: function (e) {
                alert('取消添加仓库信息!');
            }
        });
    });

    $("#search").click(function () {
        var text = $("#searchtext").val();
        var list;
        //alert(text);
        //getOrders();

        $.get("orders_searchbyid.action", {
            page: 1, rows: 5, "id": text
        }, function (data, status) {

            list = data;
            var now = 1;

            //alert("数据: " + JSON.stringify(list) + "\n状态: " + status);
            //alert(list.rows[1].address);
            $("#test").empty();
            $("#pagination").empty();
            var count = Math.floor(list.total + 4) / 5;
            //alert(Math.floor(9/5));
            //alert(page);
            var last = now - 1;
            var next = now + 1;
            if (now > 1) {

                $("#pagination").append("<li class=\"am-pagination-prev \">\n" +
                    "        <a href=\"#\" class=\"\" onclick='getOrders(" + last + ")'>上一页</a>\n" +
                    "      </li>");
            } else {
                $("#pagination").append("<li class=\"am-pagination-prev am-disabled \">\n" +
                    "        <a href=\"#\" class=\"\" onclick='getOrders(" + last + ")'>上一页</a>\n" +
                    "      </li>");
            }

            $("#pagination").append(" <li class=\"am-pagination-select\" >\n" +
                "          <select id='select'>");

            for (var i = 1; i <= count; i++) {

                b = "  <option value=\"#\" class=\"\" onclick='getOrders(" + i + ")'>" + i + "\n" +
                    "\n" +
                    "</option>"

                $("#select").append(b);
            }

            $("#pagination").append(" </select>\n" +
                "        </li>");

            if (count != 1 && now != count) {
                //alert(next);
                $("#pagination").append(" <li class=\"am-pagination-next \">\n" +
                    "        <a href=\"#\" class=\"\" onclick='getOrders(" + next + ")'>下一页</a>\n" +
                    "      </li>");
            }

            for (var i = 0; i < list.rows.length; i++) {

                s = "<tr><td><input type=\"checkbox\" name='check' value='" + list.rows[i].id + "' /></td><td>" + i + "</td><td>" + list.rows[i].id +
                    "</td>+<td>" + list.rows[i].goods.name + "</td><td>" +
                    list.rows[i].num + "</td>" +
                    "<td>" +
                    list.rows[i].price + "</td>"
                    + "<td>" +
                    list.rows[i].provider.pname + "</td>" + "<td>" + list.rows[i].sum + "</td>" +
                    "<td>" + list.rows[i].whlist.warehouse.name + "</td>" + "<td>" + list.rows[i].date + "</td>"
                    + "<td>" +
                    "<div class=\"tpl-table-black-operation\">\n" +
                    "<a href=\"javascript:;\" onclick= editOrders('" +
                    list.rows[i].id + "','" + list.rows[i].whlist.warehouse.name + "','" + list.rows[i].goods.name + "','" + list.rows[i].num + "','" + list.rows[i].price + "','" + list.rows[i].date + "','" +
                    list.rows[i].provider.pname + "','" + list.rows[i].whlist.id + "')>" +
                    "<i class=\"am-icon-pencil\"></i> 编辑\n" +
                    "</a>\n" +

                    "<a href=\"javascript:;\" class=\"tpl-table-black-operation-del\" onclick=delOrders('" + list.rows[i].id + "')>\n" +
                    "<i class=\"am-icon-trash\"></i> 删除\n" +
                    "</a>\n" +
                    "</div>\n" +
                    "</td></tr>";
                // alert(s);
                $("#test").append(s);

            }

        });


    });


//全选/全不选
    $("#checkAll").bind("click", function () {
        $("input[name='check']").prop("checked", this.checked);
        //显示删除按钮
        /*if(this.checked == true){
           $("input[name='Delete'").css("display",'block');
        }else{
           $("input[name='Delete'").css("display",'none');
        }*/
    });

//批量删除
    $("#deleteall").click(function () {
        if (confirm('确定要删除所选吗?')) {
            var checks = $("input[name='check']:checked");
            if (checks.length == 0) {
                alert('未选中任何项！');
                return false;
            }
            //将获取的值存入数组
            var checkData = new Array();
            checks.each(function () {
                checkData.push($(this).val());
            });
            //alert(checkData);
            for (x in checkData) {
                $.post("orders_deleteOrders.action",
                    {
                        id: checkData[x]
                    },
                    function (data, status) {
                        //alert("数据: " + JSON.stringify(data) + "\n状态: " + status);
                        alert(data.status);
                        getOrders(1);
                    });

                alert(checkData[x]);
            }
        }
    });


});

function getOrders(noww) {
    var list;
    $.get("orders_queryOrders.action", {
        page: noww, rows: 5
    }, function (data, status) {

        //alert("数据: " + JSON.stringify(list) + "\n状态: " + status);
        //alert(list.rows[1].address);
        $("#test").empty();
        $("#pagination").empty();

        list = data;
        //alert("数据: " + JSON.stringify(list) + "\n状态: " + status);
        //alert(list.rows[1].address);
        var count = Math.floor((list.total + 4) / 5);
        //alert(Math.floor(9/5));
        //alert(page);
        var last = noww - 1;
        var next = noww + 1;
        if (noww > 1) {

            $("#pagination").append("<li class=\"am-pagination-prev\">\n" +
                "        <a href=\"#\" class=\"\" onclick='getOrders(" + last + ")'>上一页</a>\n" +
                "      </li>");
        } else {
            $("#pagination").append("<li class=\"am-pagination-prev am-disabled \">\n" +
                "        <a href=\"#\" class=\"\" onclick='getOrders(" + last + ")'>上一页</a>\n" +
                "      </li>");
        }

        $("#pagination").append(" <li class=\"am-pagination-select\" >\n" +
            "          <select id='select'>");

        for (var i = 1; i <= count; i++) {
            if (i == noww) {
                b = "  <option value=\"#\" class=\"\" selected=\"selected\" onclick='getOrders(" + i + ")'>" + i + "\n" +
                    "\n" +
                    "</option>"
            } else {
                b = "  <option value=\"#\" class=\"\" onclick='getOrders(" + i + ")'>" + i + "\n" +
                    "\n" +
                    "</option>"
            }
            $("#select").append(b);
        }

        $("#pagination").append(" </select>\n" +
            "        </li>");

        if (count != 1 && noww != count) {
            //alert(now);

            $("#pagination").append(" <li class=\"am-pagination-next \">\n" +
                "        <a href=\"#\" class=\"\" onclick='getOrders(" + next + ")'>下一页</a>\n" +
                "      </li>");
        }
        for (var i = 0; i < list.rows.length; i++) {
            //alert(list.rows);

            s = "<tr><td><input type=\"checkbox\" name='check' value='" + list.rows[i].id + "' /></td><td>" + i + "</td><td>" + list.rows[i].id +
                "</td>+<td>" + list.rows[i].goods.name + "</td><td>" +
                list.rows[i].num + "</td>" +
                "<td>" +
                list.rows[i].price + "</td>"
                + "<td>" +
                list.rows[i].provider.pname + "</td>" + "<td>" + list.rows[i].sum + "</td>" +
                "<td>" + list.rows[i].whlist.warehouse.name + "</td>" + "<td>" + list.rows[i].date + "</td>"
                + "<td>" +
                "<div class=\"tpl-table-black-operation\">\n" +
                "<a href=\"javascript:;\" onclick= editOrders('" +
                list.rows[i].id + "','" + list.rows[i].whlist.warehouse.name + "','" + list.rows[i].goods.name + "','" + list.rows[i].num + "','" + list.rows[i].price + "','" + list.rows[i].date + "','" +
                list.rows[i].provider.pname + "','" + list.rows[i].whlist.id + "')>" +
                "<i class=\"am-icon-pencil\"></i> 编辑\n" +
                "</a>\n" +

                "<a href=\"javascript:;\" class=\"tpl-table-black-operation-del\" onclick=delOrders('" + list.rows[i].id + "')>\n" +
                "<i class=\"am-icon-trash\"></i> 删除\n" +
                "</a>\n" +
                "</div>\n" +
                "</td></tr>";
            // alert(s);
            $("#test").append(s);

        }

    });
}

function delOrders(id) {
    alert($('#id_delete').val());
    $('#id_delete').val(id);
    alert($('#id_delete').val());
    $('#my-confirm').modal({
        relatedTarget: this,
        onConfirm: function (options) {
            alert($('#id_delete').val());
            $.post("orders_deleteOrders.action",
                {
                    "id": $('#id_delete').val()
                },
                function (data, status) {
                    //alert("数据: " + JSON.stringify(data) + "\n状态: " + status);
                    alert(data.status);
                    getOrders(1);
                });
        },
        // closeOnConfirm: false,
        onCancel: function () {
            alert('算逑，不弄了');
        }
    });
}

function editOrders(id, wa, goodname, num, price, date, pno, wlno) {
    // alert(id);
    // alert(pname);
    // alert(infor);
    // alert(address);
    // alert(phone);

    $('#id_edit').val(id);
    $('#wlno_edit').val(wlno);
    $('#editwa').val(wa);
    $('#editgoods').val(goodname);
    //alert(goodname);
    $('#editnum').val(num);
    $('#editprice').val(price);
    $('#editpno').val(pno);
    $('#my-startDateedit').text(date);
    alert($('#my-startDateedit').text());

    $('#my-prompt2').modal({
        relatedTarget: this,
        onConfirm: function (e) {
            //alert($('#id_edit').val());
            //alert($('#my-startDateedit').text());
            if ($('#editprice').val().length != 0 && $('#editnum').val().length != 0 && !isNaN($('#editprice').val()) && !isNaN($('#editnum').val())) {
                $.post("orders_editOrders.action",
                    {
                        "id": $('#id_edit').val(),
                        "num": $('#editnum').val(),
                        "price": $('#editprice').val(),
                        'date': $('#my-startDateedit').text(),
                        "whlist.id": $('#wlno_edit').val()
                    },
                    function (data, status) {
                        //alert("数据: " + JSON.stringify(data) + "\n状态: " + status);
                        alert(data.tip);
                        alert(data.status);
                        getOrders(1);
                    });
            } else {
                alert("字段不正确！");
            }
        },
        // closeOnConfirm: false,
        onCancel: function () {
            alert('算逑，不弄了');
        }
    });

}

$(function () {
    var startDate = new Date($('#my-startDateedit').val());
    //alert(startDate);
    var endDate = new Date();
    //alert(endDate);
    var $alert = $('#my-alertedit');
    $('#my-startedit').datepicker().on('changeDate.datepicker.amui', function (event) {
        if (event.date.valueOf() > endDate.valueOf()) {
            $alert.find('p').text('日期应小于等于今日日期！').end().show();
        } else {
            $alert.hide();
            startDate = new Date(event.date);
            $('#my-startDateedit').text($('#my-startedit').data('date'));
        }
        $(this).datepicker('close');
    });
    /*
    $('#my-end').datepicker().
    on('changeDate.datepicker.amui', function(event) {
        if (event.date.valueOf() < startDate.valueOf()) {
            $alert.find('p').text('结束日期应大于开始日期！').end().show();
        } else {
            $alert.hide();
            endDate = new Date(event.date);
            $('#my-endDate').text($('#my-end').data('date'));
        }
        $(this).datepicker('close');
    });
    */
});

$(function () {
    var startDate = new Date(2017, 12, 20);
    var endDate = new Date();
    //alert(endDate);
    var $alert = $('#my-alert');
    $('#my-start').datepicker().on('changeDate.datepicker.amui', function (event) {
        if (event.date.valueOf() > endDate.valueOf()) {
            $alert.find('p').text('日期应小于等于今日日期！').end().show();
        } else {
            $alert.hide();
            startDate = new Date(event.date);
            $('#my-startDate').text($('#my-start').data('date'));
        }
        $(this).datepicker('close');
    });
    /*
    $('#my-end').datepicker().
    on('changeDate.datepicker.amui', function(event) {
        if (event.date.valueOf() < startDate.valueOf()) {
            $alert.find('p').text('结束日期应大于开始日期！').end().show();
        } else {
            $alert.hide();
            endDate = new Date(event.date);
            $('#my-endDate').text($('#my-end').data('date'));
        }
        $(this).datepicker('close');
    });
    */
});
$('#selectwa').change(function () {
    $('#selectgood').empty();
    //alert("123");
    var good = $("#selectwa option:selected").val();
    //alert(good);
    $.get("whlist_queryWhlist.action",
        {
            'warehouse.id': good
        },
        function (data, status) {
            //alert("数据: \n" + JSON.stringify(data) + "\n状态: " + status);
            $('#selectgood').empty();
            for (var i = 0; i < data.rows.length; i++) {
                $("#selectgood").append("<option value=" + data.rows[i].goods.id + " " + "wno=" + data.rows[i].id + ">" + data.rows[i].goods.name + "");
            }
        });
});

$('#searchall').click(function () {
    getOrders(1);
})
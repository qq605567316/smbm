$(function () {
    getlist();
});

function getlist() {
    $.getJSON('/supermarket/getall?now=1',
        function(data) {
            if (data.success) {
                var now = 1;
                listsupermarket(now,data);
            }
        });
}

//点击编辑调用
function editsupermarket(sid, sname, saddress) {
    $('#editsname').val(sname);
    $('#editsaddress').val(saddress);

    $('#my-prompt2').modal({
        relatedTarget: this,
        onConfirm: function () {
            var supermarket = {};
            supermarket.sid = sid;
            supermarket.sname = $('#editsname').val();
            supermarket.saddress = $('#editsaddress').val();
            var formData = new FormData();
            formData.append('supermarketStr',JSON.stringify(supermarket));
            $.ajax({
                url: '/supermarket/edit',
                type: 'POST',
                data: formData,
                //既要传文件又要传图片，故contentType: false
                contentType: false,
                processData: false,
                cache: false,
                success: function (data) {
                    window.location.href='/supermarket/list';
                }
            });
        },
        onCancel: function (e) {
            alert('取消编辑商品信息!');
        }
    });

}


function listsupermarket(now,data) {
    var list = data.supermarketList;//后台返回的所有商品List
    var count = Math.floor((data.total + 4) / 5);//总页数
    var html = '';//要插入的动态代码

    //清空上次访问的数据
    $("#pagination").empty();
    $("#html").empty();

    var last = now - 1;
    if(now > 1){
        $("#pagination").append("<li class=\"am-pagination-prev\">\n" +
            "        <a href=\"#\" class=\"\" onclick='getsupermarket(" + last + ")'>上一页</a>\n" +
            "      </li>");
    }

    //跳转页数按钮
    $("#pagination").append(" <li class=\"am-pagination-select\" >\n" +
        "          <select id='select'>");
    for (var i = 1; i <= count; i++) {
        if (i == now) {
            html = "  <option value=\"#\" class=\"\" selected=\"selected\" >" + i + "\n" +
                "\n" +
                "</option>"
        } else {
            html = "  <option value=\"#\" class=\"\" onclick='getsupermarket(" + i + ")'>" + i + "\n" +
                "\n" +
                "</option>"
        }
        $("#select").append(html);
    }

    $("#pagination").append(" </select>\n" +
        "        </li>");

    if (count != 1 && now != count) {

        var next = now + 1;
        $("#pagination").append(" <li class=\"am-pagination-next \">\n" +
            "        <a href=\"#\" class=\"\" onclick='getsupermarket(" + next + ")'>下一页</a>\n" +
            "      </li>");
    }
    for (var i = 0; i < list.length; i++) {

        html = "<tr>" +
            "<td>" + list[i].sid + "</td>" +
            "<td>" + list[i].sname + "</td>" +
            "<td>" + list[i].saddress + "</td>" +
            "<td>" +
            "<div class=\"tpl-table-black-operation\">\n" +
            "<a href=\"javascript:;\" onclick= editsupermarket('" +
            list[i].sid + "','" + list[i].sname + "','" +
            list[i].saddress + "')>" +
            "<i class=\"am-icon-pencil\"></i> 编辑\n" +
            "</a>\n" +

            "<a href=\"javascript:;\" class=\"tpl-table-black-operation-del\" onclick=delsupermarket('" + list[i].sid + "')>\n" +
            "<i class=\"am-icon-trash\"></i> 删除\n" +
            "</a>\n" +

            "</div>\n" +
            "</td></tr>";
        $("#html").append(html);

    }

}

//跳转页数实现
function getsupermarket(now) {
    $.getJSON('/supermarket/getall?now='+now,
        function(data) {
            if (data.success) {
                var list = data.supermarketList;//后台返回的所有商品List
                var count = Math.floor((data.total + 4) / 5);//总页数
                var html = '';//要插入的动态代码
                var last = now - 1;
                var next = now + 1;
                //清空上次访问的数据
                $("#pagination").empty();
                $("#html").empty();
                if (now > 1) {

                    $("#pagination").append("<li class=\"am-pagination-prev\">\n" +
                        "        <a href=\"#\" class=\"\" onclick='getsupermarket(" + last + ")'>上一页</a>\n" +
                        "      </li>");
                }

                $("#pagination").append(" <li class=\"am-pagination-select\" >\n" +
                    "          <select id='select'>");

                for (var i = 1; i <= count; i++) {
                    if (i == now) {
                        html = "  <option value=\"#\" class=\"\" selected=\"selected\" onclick='getsupermarket(" + i + ")'>" + i + "\n" +
                            "\n" +
                            "</option>"
                    } else {
                        html = "  <option value=\"#\" class=\"\" onclick='getsupermarket(" + i + ")'>" + i + "\n" +
                            "\n" +
                            "</option>"
                    }
                    $("#select").append(html);
                }

                $("#pagination").append(" </select>\n" +
                    "        </li>");

                if (count != 1 && now != count) {

                    $("#pagination").append(" <li class=\"am-pagination-next \">\n" +
                        "        <a href=\"#\" class=\"\" onclick='getsupermarket(" + next + ")'>下一页</a>\n" +
                        "      </li>");
                }
                for (var i = 0; i < list.length; i++) {

                    html = "<tr>" +
                        "<td>" + list[i].sid + "</td>" +
                        "<td>" + list[i].sname + "</td>" +
                        "<td>" + list[i].saddress + "</td>" +
                        "<td>" +
                        "<div class=\"tpl-table-black-operation\">\n" +
                        "<a href=\"javascript:;\" onclick= editsupermarket('" +
                        list[i].sid + "','" + list[i].sname + "','" +
                        list[i].saddress + "')>" +
                        "<i class=\"am-icon-pencil\"></i> 编辑\n" +
                        "</a>\n" +

                        "<a href=\"javascript:;\" class=\"tpl-table-black-operation-del\" onclick=delsupermarket('" + list[i].sid + "')>\n" +
                        "<i class=\"am-icon-trash\"></i> 删除\n" +
                        "</a>\n" +

                        "</div>\n" +
                        "</td></tr>";
                    $("#html").append(html);
                }
            }
        });




}

//点击删除调用
function delsupermarket(id) {

    $('#sid').val(id);
    $('#my-confirm').modal({
        relatedTarget: this,
        onConfirm: function () {

            $.ajax({
                url: '/supermarket/del?sid='+id,
                type: 'GET',
                success: function (data) {
                    window.location.href='/supermarket/list';
                }
            });


        },
        onCancel: function () {
            alert('算逑,不弄了');
        }
    });
}

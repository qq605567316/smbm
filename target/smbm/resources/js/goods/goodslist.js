$(function () {
    getlist();
});

function getlist() {
    $.getJSON('/goods/getall?now=1',
        function(data) {
            if (data.success) {
                var now = 1;
                listGoods(now,data);
            }
        });
}

//点击编辑调用
function editgoods(gid, gname, gnum, gprice) {
    $('#editgname').val(gname);
    $('#editgnum').val(gnum);
    $('#editgprice').val(gprice);

    $('#my-prompt2').modal({
        relatedTarget: this,
        onConfirm: function () {
            var goods = {};
            goods.gid = gid;
            goods.gname = $('#editgname').val();
            goods.gnum = $('#editgnum').val();
            goods.gprice = $('#editgprice').val();
            var gPic = $('#editgpic')[0].files[0];
            var formData = new FormData();
            formData.append('gPic',gPic);
            formData.append('goodsStr',JSON.stringify(goods));
            $.ajax({
                url: '/goods/edit',
                type: 'POST',
                data: formData,
                //既要传文件又要传图片，故contentType: false
                contentType: false,
                processData: false,
                cache: false,
                success: function () {
                    window.location.href='/goods/list';
                }
            });
        },
        onCancel: function (e) {
            alert('取消编辑商品信息!');
        }
    });

}


function listGoods(now,data) {
    var list = data.goodsList;//后台返回的所有商品List
    var count = Math.floor((data.total + 4) / 5);//总页数
    var html = '';//要插入的动态代码

    //清空上次访问的数据
    $("#pagination").empty();
    $("#html").empty();

    var last = now - 1;
    if(now > 1){
        $("#pagination").append("<li class=\"am-pagination-prev\">\n" +
            "        <a href=\"#\" class=\"\" onclick='getgoods(" + last + ")'>上一页</a>\n" +
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
            html = "  <option value=\"#\" class=\"\" onclick='getgoods(" + i + ")'>" + i + "\n" +
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
            "        <a href=\"#\" class=\"\" onclick='getgoods(" + next + ")'>下一页</a>\n" +
            "      </li>");
    }
    for (var i = 0; i < list.length; i++) {

        html = "<tr>" +
            "<td>" + list[i].gid + "</td>" +
            "<td>" + list[i].gname + "</td>" +
            "<td>" + list[i].gnum + "</td>" +
            "<td>" + list[i].gprice + "</td>" +
            "<td><img src='"+"/image/" + list[i].gpic + "' class=\"tpl-table-line-img\"></td>" +
            "<td>" +
            "<div class=\"tpl-table-black-operation\">\n" +
            "<a href=\"javascript:;\" onclick= editgoods('" +
            list[i].gid + "','" + list[i].gname + "','" + list[i].gnum + "','" +
            list[i].gprice + "')>" +
            "<i class=\"am-icon-pencil\"></i> 编辑\n" +
            "</a>\n" +

            "<a href=\"javascript:;\" class=\"tpl-table-black-operation-del\" onclick=delgoods('" + list[i].gid + "')>\n" +
            "<i class=\"am-icon-trash\"></i> 删除\n" +
            "</a>\n" +

            "</div>\n" +
            "</td></tr>";
        $("#html").append(html);

    }

}

//跳转页数实现
function getgoods(now) {
    $.getJSON('/goods/getall?now='+now,
        function(data) {
            if (data.success) {
                var list = data.goodsList;//后台返回的所有商品List
                var count = Math.floor((data.total + 4) / 5);//总页数
                var html = '';//要插入的动态代码
                var last = now - 1;
                var next = now + 1;
                //清空上次访问的数据
                $("#pagination").empty();
                $("#html").empty();
                if (now > 1) {

                    $("#pagination").append("<li class=\"am-pagination-prev\">\n" +
                        "        <a href=\"#\" class=\"\" onclick='getgoods(" + last + ")'>上一页</a>\n" +
                        "      </li>");
                }

                $("#pagination").append(" <li class=\"am-pagination-select\" >\n" +
                    "          <select id='select'>");

                for (var i = 1; i <= count; i++) {
                    if (i == now) {
                        html = "  <option value=\"#\" class=\"\" selected=\"selected\" onclick='getgoods(" + i + ")'>" + i + "\n" +
                            "\n" +
                            "</option>"
                    } else {
                        html = "  <option value=\"#\" class=\"\" onclick='getgoods(" + i + ")'>" + i + "\n" +
                            "\n" +
                            "</option>"
                    }
                    $("#select").append(html);
                }

                $("#pagination").append(" </select>\n" +
                    "        </li>");

                if (count != 1 && now != count) {

                    $("#pagination").append(" <li class=\"am-pagination-next \">\n" +
                        "        <a href=\"#\" class=\"\" onclick='getgoods(" + next + ")'>下一页</a>\n" +
                        "      </li>");
                }
                for (var i = 0; i < list.length; i++) {

                    html = "<tr>" +
                        "<td>" + list[i].gid + "</td>" +
                        "<td>" + list[i].gname + "</td>" +
                        "<td>" + list[i].gnum + "</td>" +
                        "<td>" + list[i].gprice + "</td>" +
                        "<td><img src='" + "/image/" + list[i].gpic + "' class=\"tpl-table-line-img\"></td>" +
                        "<td>" +
                        "<div class=\"tpl-table-black-operation\">\n" +
                        "<a href=\"javascript:;\" onclick= editgoods('" +
                        list[i].gid + "','" + list[i].gname + "','" + list[i].gnum + "','" +
                        list[i].gprice + "')>" +
                        "<i class=\"am-icon-pencil\"></i> 编辑\n" +
                        "</a>\n" +

                        "<a href=\"javascript:;\" class=\"tpl-table-black-operation-del\" onclick=delgoods('" + list[i].gid + "')>\n" +
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
function delgoods(id) {

    $('#gid').val(id);
    $('#my-confirm').modal({
        relatedTarget: this,
        onConfirm: function () {

            $.ajax({
                url: '/goods/del?gid='+id,
                type: 'GET',
                success: function (data) {
                    window.location.href='/goods/list';
                }
            });


        },
        onCancel: function () {
            alert('算逑,不弄了');
        }
    });
}

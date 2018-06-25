$(function () {
    getlist();
});

function getlist() {

    $.getJSON('/user/getall?now=1',
        function(data) {
            if (data.success) {
                var now = 1;
                listmanager(now,data);
            }
        });
}

//点击编辑调用
function editmanager(mid,sid,mname,mtel,password,msalary) {

    $.getJSON('/supermarket/getall?sid=-1',
        function(data) {
            $('#editsid').empty();
            var list = data.allsupermarketList;
            for (var i = 0; i < list.length; i++) {
                if(list[i].sid==sid){
                    $("#editsid").append("<option value='" + list[i].sid + "' selected>" + list[i].sname + "</option>");
                }else {
                    $("#editsid").append("<option value=" + list[i].sid + ">" + list[i].sname + "</option>");
                }
            }
        });

    $('#editmname').val(mname);
    $('#editmtel').val(mtel);
    $('#editmsalary').val(msalary);
    $('#editpassword').val(password);

    $('#my-prompt2').modal({
        relatedTarget: this,
        onConfirm: function () {
            var manager = {};
            manager.mid = mid;
            manager.sid = $('#editsid').val();
            manager.mname = $('#editmname').val();
            manager.mtel = $('#editmtel').val();
            manager.msalary = $('#editmsalary').val();
            manager.password = $('#editpassword').val();
            var formData = new FormData();
            formData.append('managerStr',JSON.stringify(manager));
            $.ajax({
                url: '/user/edit',
                type: 'POST',
                data: formData,
                //既要传文件又要传图片，故contentType: false
                contentType: false,
                processData: false,
                cache: false,
                success: function (data) {
                    window.location.href='/user/operation';
                }
            });
        },
        onCancel: function (e) {
            alert('取消编辑管理员信息!');
        }
    });

}


function listmanager(now,data) {
    var list = data.managerList;//后台返回的所有员工List
    var supermarketList = data.supermarketList;
    var count = Math.floor((data.total + 4) / 5);//总页数
    var html = '';//要插入的动态代码

    //清空上次访问的数据
    $("#pagination").empty();
    $("#html").empty();

    var last = now - 1;
    if(now > 1){
        $("#pagination").append("<li class=\"am-pagination-prev\">\n" +
            "        <a href=\"#\" class=\"\" onclick='getmanager(" + last + ")'>上一页</a>\n" +
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
            html = "  <option value=\"#\" class=\"\" onclick='getmanager(" + i + ")'>" + i + "\n" +
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
            "        <a href=\"#\" class=\"\" onclick='getmanager(" + next + ")'>下一页</a>\n" +
            "      </li>");
    }
    for (var i = 0; i < list.length; i++) {

        html = "<tr>" +
            "<td>" + list[i].mid + "</td>" +
            "<td>" + list[i].mname + "</td>" +
            "<td>" + list[i].mtel + "</td>" +
            "<td>" + list[i].msalary + "</td>" +
            "<td>" + supermarketList[list[i].sid].sname + "</td>" +
            "<td>" +
            "<div class=\"tpl-table-black-operation\">\n" +
            "<a href=\"javascript:;\" onclick= editmanager('" + list[i].mid + "','" +
            list[i].sid + "','" + list[i].mname + "','" +
            list[i].mtel + "','" + list[i].password + "','" +
            list[i].msalary + "')>" +
            "<i class=\"am-icon-pencil\"></i> 编辑\n" +
            "</a>\n" +

            "<a href=\"javascript:;\" class=\"tpl-table-black-operation-del\" onclick=delmanager('" + list[i].mid + "')>\n" +
            "<i class=\"am-icon-trash\"></i> 删除\n" +
            "</a>\n" +

            "</div>\n" +
            "</td></tr>";
        $("#html").append(html);

    }

}

//跳转页数实现
function getmanager(now) {
    $.getJSON('/user/getall?now='+now,
        function(data) {
            if (data.success) {
                var list = data.managerList;//后台返回的所有员工List
                var supermarketList = data.supermarketList;
                var count = Math.floor((data.total + 4) / 5);//总页数
                var html = '';//要插入的动态代码
                var last = now - 1;
                var next = now + 1;
                //清空上次访问的数据
                $("#pagination").empty();
                $("#html").empty();
                if (now > 1) {

                    $("#pagination").append("<li class=\"am-pagination-prev\">\n" +
                        "        <a href=\"#\" class=\"\" onclick='getmanager(" + last + ")'>上一页</a>\n" +
                        "      </li>");
                }

                $("#pagination").append(" <li class=\"am-pagination-select\" >\n" +
                    "          <select id='select'>");

                for (var i = 1; i <= count; i++) {
                    if (i == now) {
                        html = "  <option value=\"#\" class=\"\" selected=\"selected\" onclick='getmanager(" + i + ")'>" + i + "\n" +
                            "\n" +
                            "</option>"
                    } else {
                        html = "  <option value=\"#\" class=\"\" onclick='getmanager(" + i + ")'>" + i + "\n" +
                            "\n" +
                            "</option>"
                    }
                    $("#select").append(html);
                }

                $("#pagination").append(" </select>\n" +
                    "        </li>");

                if (count != 1 && now != count) {

                    $("#pagination").append(" <li class=\"am-pagination-next \">\n" +
                        "        <a href=\"#\" class=\"\" onclick='getmanager(" + next + ")'>下一页</a>\n" +
                        "      </li>");
                }
                for (var i = 0; i < list.length; i++) {

                    html = "<tr>" +
                        "<td>" + list[i].mid + "</td>" +
                        "<td>" + list[i].mname + "</td>" +
                        "<td>" + list[i].mtel + "</td>" +
                        "<td>" + list[i].msalary + "</td>" +
                        "<td>" + supermarketList[list[i].sid].sname + "</td>" +
                        "<td>" +
                        "<div class=\"tpl-table-black-operation\">\n" +
                        "<a href=\"javascript:;\" onclick= editmanager('" + list[i].mid + "','" +
                        list[i].sid + "','" + list[i].mname + "','" +
                        list[i].mtel + "','" + list[i].password + "','" +
                        list[i].msalary + "')>" +
                        "<i class=\"am-icon-pencil\"></i> 编辑\n" +
                        "</a>\n" +

                        "<a href=\"javascript:;\" class=\"tpl-table-black-operation-del\" onclick=delmanager('" + list[i].mid + "')>\n" +
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
function delmanager(id) {

    $('#pid').val(id);
    $('#my-confirm').modal({
        relatedTarget: this,
        onConfirm: function () {

            $.ajax({
                url: '/user/del?mid='+id,
                type: 'GET',
                success: function (data) {
                    window.location.href='/user/operation';
                }
            });


        },
        onCancel: function () {
            alert('算逑,不弄了');
        }
    });
}

function editown(mid,mname,mtel,password) {
    $('#mymname').val(mname);
    $('#mymtel').val(mtel);
    $('#mypassword').val(password);

    $('#my-prompt1').modal({
        relatedTarget: this,
        onConfirm: function () {
            var manager = {};
            manager.mid = mid;
            manager.mname = $('#mymname').val();
            manager.mtel = $('#mymtel').val();
            manager.password = $('#mypassword').val();
            var formData = new FormData();
            formData.append('managerStr',JSON.stringify(manager));
            $.ajax({
                url: '/user/edit',
                type: 'POST',
                data: formData,
                //既要传文件又要传图片，故contentType: false
                contentType: false,
                processData: false,
                cache: false,
                success: function (data) {
                    window.location.href='/user/operation';
                }
            });
        },
        onCancel: function (e) {
            alert('取消编辑自己信息!');
        }
    });
}
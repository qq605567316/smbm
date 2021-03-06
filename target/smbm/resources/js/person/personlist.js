$(function () {
    getlist();
});

function getlist() {
    $.getJSON('/person/getbysid?now=1',
        function(data) {
            if (data.success) {
                var now = 1;
                listperson(now,data);
            }
        });
}

//点击编辑调用
function editperson(pid, pname, ptel,pposition,psalary) {
    $('#editpname').val(pname);
    $('#editptel').val(ptel);
    $('#editpsalary').val(psalary);
    $('#editpposition').val(pposition);

    $('#my-prompt2').modal({
        relatedTarget: this,
        onConfirm: function () {
            var person = {};
            person.pid = pid;
            person.pname = $('#editpname').val();
            person.pposition = $('#editpposition').val();
            person.ptel = $('#editptel').val();
            person.psalary = $('#editpsalary').val();
            var formData = new FormData();
            formData.append('personStr',JSON.stringify(person));
            $.ajax({
                url: '/person/edit',
                type: 'POST',
                data: formData,
                //既要传文件又要传图片，故contentType: false
                contentType: false,
                processData: false,
                cache: false,
                success: function (data) {
                    window.location.href='/person/list';
                }
            });
        },
        onCancel: function (e) {
            alert('取消编辑员工信息!');
        }
    });

}


function listperson(now,data) {
    var list = data.personList;//后台返回的所有员工List
    var count = Math.floor((data.total + 4) / 5);//总页数
    var html = '';//要插入的动态代码

    //清空上次访问的数据
    $("#pagination").empty();
    $("#html").empty();

    var last = now - 1;
    if(now > 1){
        $("#pagination").append("<li class=\"am-pagination-prev\">\n" +
            "        <a href=\"#\" class=\"\" onclick='getperson(" + last + ")'>上一页</a>\n" +
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
            html = "  <option value=\"#\" class=\"\" onclick='getperson(" + i + ")'>" + i + "\n" +
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
            "        <a href=\"#\" class=\"\" onclick='getperson(" + next + ")'>下一页</a>\n" +
            "      </li>");
    }
    for (var i = 0; i < list.length; i++) {

        html = "<tr>" +
            "<td>" + list[i].pid + "</td>" +
            "<td>" + list[i].pname + "</td>" +
            "<td>" + list[i].ptel + "</td>" +
            "<td>" + list[i].pposition + "</td>" +
            "<td>" + list[i].psalary + "</td>" +
            "<td>" +
            "<div class=\"tpl-table-black-operation\">\n" +
            "<a href=\"javascript:;\" onclick= editperson('" +
            list[i].pid + "','" + list[i].pname + "','" +
            list[i].ptel + "','" + list[i].pposition + "','" +
            list[i].psalary + "')>" +
            "<i class=\"am-icon-pencil\"></i> 编辑\n" +
            "</a>\n" +

            "<a href=\"javascript:;\" class=\"tpl-table-black-operation-del\" onclick=delperson('" + list[i].pid + "')>\n" +
            "<i class=\"am-icon-trash\"></i> 删除\n" +
            "</a>\n" +

            "</div>\n" +
            "</td></tr>";
        $("#html").append(html);

    }

}

//跳转页数实现
function getperson(now) {
    $.getJSON('/person/getbysid?now='+now,
        function(data) {
            if (data.success) {
                var list = data.personList;//后台返回的所有员工List
                var count = Math.floor((data.total + 4) / 5);//总页数
                var html = '';//要插入的动态代码
                var last = now - 1;
                var next = now + 1;
                //清空上次访问的数据
                $("#pagination").empty();
                $("#html").empty();
                if (now > 1) {

                    $("#pagination").append("<li class=\"am-pagination-prev\">\n" +
                        "        <a href=\"#\" class=\"\" onclick='getperson(" + last + ")'>上一页</a>\n" +
                        "      </li>");
                }

                $("#pagination").append(" <li class=\"am-pagination-select\" >\n" +
                    "          <select id='select'>");

                for (var i = 1; i <= count; i++) {
                    if (i == now) {
                        html = "  <option value=\"#\" class=\"\" selected=\"selected\" onclick='getperson(" + i + ")'>" + i + "\n" +
                            "\n" +
                            "</option>"
                    } else {
                        html = "  <option value=\"#\" class=\"\" onclick='getperson(" + i + ")'>" + i + "\n" +
                            "\n" +
                            "</option>"
                    }
                    $("#select").append(html);
                }

                $("#pagination").append(" </select>\n" +
                    "        </li>");

                if (count != 1 && now != count) {

                    $("#pagination").append(" <li class=\"am-pagination-next \">\n" +
                        "        <a href=\"#\" class=\"\" onclick='getperson(" + next + ")'>下一页</a>\n" +
                        "      </li>");
                }
                for (var i = 0; i < list.length; i++) {

                    html = "<tr>" +
                        "<td>" + list[i].pid + "</td>" +
                        "<td>" + list[i].pname + "</td>" +
                        "<td>" + list[i].ptel + "</td>" +
                        "<td>" + list[i].pposition + "</td>" +
                        "<td>" + list[i].psalary + "</td>" +
                        "<td>" +
                        "<div class=\"tpl-table-black-operation\">\n" +
                        "<a href=\"javascript:;\" onclick= editperson('" +
                        list[i].pid + "','" + list[i].pname + "','" +
                        list[i].ptel + "','" + list[i].pposition + "','" +
                        list[i].psalary + "')>" +
                        "<i class=\"am-icon-pencil\"></i> 编辑\n" +
                        "</a>\n" +

                        "<a href=\"javascript:;\" class=\"tpl-table-black-operation-del\" onclick=delperson('" + list[i].pid + "')>\n" +
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
function delperson(id) {

    $('#pid').val(id);
    $('#my-confirm').modal({
        relatedTarget: this,
        onConfirm: function () {

            $.ajax({
                url: '/person/del?pid='+id,
                type: 'GET',
                success: function (data) {
                    window.location.href='/person/list';
                }
            });


        },
        onCancel: function () {
            alert('算逑,不弄了');
        }
    });
}

$(function () {
    getlist();
});

function getlist() {

    $.getJSON('/user/getall?now=1',
        function (data) {
            if (data.success) {
                var now = 1;
                listmanager(now, data);
            }
        });
}


function listmanager(now, data) {
    var list = data.managerList;//后台返回的所有员工List
    var count = Math.floor((data.total + 4) / 5);//总页数
    var html = '';//要插入的动态代码

    //清空上次访问的数据
    $("#pagination").empty();
    $("#html").empty();

    var last = now - 1;
    if (now > 1) {
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
            "<td>" + list[i].sid + "</td>" +
            "</tr>";
        $("#html").append(html);

    }

}

//跳转页数实现
function getmanager(now) {
    $.getJSON('/user/getall?now=' + now,
        function (data) {
            if (data.success) {
                var list = data.managerList;//后台返回的所有员工List
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
                        "<td>" + list[i].sid + "</td>" +
                        "</tr>";
                    $("#html").append(html);
                }
            }
        });


}


function editown(mid, mname, mtel, password) {
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
            formData.append('managerStr', JSON.stringify(manager));
            $.ajax({
                url: '/user/edit',
                type: 'POST',
                data: formData,
                //既要传文件又要传图片，故contentType: false
                contentType: false,
                processData: false,
                cache: false,
                success: function (data) {
                    window.location.href = '/user/operation';
                }
            });
        },
        onCancel: function (e) {
            alert('取消编辑自己信息!');
        }
    });
}
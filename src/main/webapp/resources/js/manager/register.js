$(function () {
    //从后台获得select组件的数据
    $.getJSON('/supermarket/getall?sid=-1',
        function (data) {
            $('#sid').empty();
            var list = data.allsupermarketList;
            for (var i = 0; i < list.length; i++) {
                $("#sid").append("<option value=" + list[i].sid + ">" + list[i].sname + "</option>");
            }
        });

    $('#doc-prompt-toggle').on('click', function () {
        var manager = {};
        manager.mname = $('#mname').val();
        manager.mtel = $('#mtel').val();
        manager.msalary = $('#msalary').val();
        manager.sid = $('#sid').val();
        manager.username = $('#username').val();
        manager.password = $('#password').val();
        var formData = new FormData();
        formData.append('managerStr', JSON.stringify(manager));
        $.ajax({
            url: '/user/add',
            type: 'POST',
            data: formData,
            //既要传文件又要传图片，故contentType: false
            contentType: false,
            processData: false,
            cache: false,
            success: function (data) {
                if (data.success) {
                    alert("注册成功!");
                } else {
                    alert(data.errMsg);
                }
                window.location.href = '/user/operation';
            }
        });
    });


    //从initUrl获取要填充到select的内容的基本信息
    //function getGoodsInitInfo(data) {
    //     $.getJSON(initUrl,function (data) {
    //         if(data.success()) {
    //             var tempHtml = '';
    //             //从data中取出分类list并遍历
    //             data.__CategoryList.map(function (item,index) {
    //                 tempHtml += '<option data-id ="'+ item.__CategoryId + '">'
    //                     + item.__CategoryName + '</option>';
    //             });
    //             //将组成的动态代码加到页面  __category为组件ID
    //             $('__category').html(tempHtml);
    //         }
    //     });

    //从组件中获取select的值
    // ____.__Category = {
    //     __CategoryId:$('放入组件id').find('option').not(function () {
    //         return !this.selected;
    //     }).data('id')
    // };


});

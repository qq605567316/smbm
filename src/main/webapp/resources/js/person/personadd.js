$(function () {
    //从后台获得select组件的数据
    var supermarketUrl = '/supermarket/getall?sid=-1';

    var addPersonUrl = '/person/add';

    $('#doc-prompt-toggle').on('click', function () {


        $.getJSON(supermarketUrl,
            function (data) {
                $('#addsid').empty();
                var list = data.allsupermarketList;
                for (var i = 0; i < list.length; i++) {
                    $("#addsid").append("<option value=" + list[i].sid + ">" + list[i].sname + "</option>");
                }
            });

        $('#my-prompt').modal({
            relatedTarget: this,
            onConfirm: function () {
                var person = {};
                if ($("#addsid").length > 0) {
                    person.sid = $('#addsid').val();
                }
                person.pname = $('#addpname').val();
                person.pposition = $('#addpposition').val();
                person.ptel = $('#addptel').val();
                person.psalary = $('#addpsalary').val();
                var formData = new FormData();
                formData.append('personStr', JSON.stringify(person));
                $.ajax({
                    url: addPersonUrl,
                    type: 'POST',
                    data: formData,
                    //既要传文件又要传图片，故contentType: false
                    contentType: false,
                    processData: false,
                    cache: false,
                    success: function (data) {
                        window.location.href = '/person/list';
                    }
                });
            },
            onCancel: function () {
                alert('取消添加超市信息!');
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


})
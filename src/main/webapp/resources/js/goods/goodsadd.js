$(function () {
    //从后台获得select组件的数据
    var addGoodsUrl = '/goods/add';

    $('#doc-prompt-toggle').on('click', function () {

        $('#my-prompt').modal({
            relatedTarget: this,
            onConfirm: function () {
                var goods = {};
                goods.gname = $('#addgname').val();
                goods.gnum = $('#addgnum').val();
                goods.gprice = $('#addgprice').val();
                var gPic = $('#addgpic')[0].files[0];
                var formData = new FormData();
                formData.append('gPic', gPic);
                formData.append('goodsStr', JSON.stringify(goods));
                $.ajax({
                    url: addGoodsUrl,
                    type: 'POST',
                    data: formData,
                    //既要传文件又要传图片，故contentType: false
                    contentType: false,
                    processData: false,
                    cache: false,
                    success: function () {
                        window.location.href = '/goods/list';
                    }
                });
            },
            onCancel: function () {
                alert('取消添加商品信息!');
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
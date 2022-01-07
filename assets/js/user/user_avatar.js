$(function() {
    var layer = layui.layer
        // 获取裁剪区域的DOM元素
    var $image = $('#image');
    // 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览位置
        preview: '.img-preview'
    };
    // 创建裁剪区域
    $image.cropper(options);
    // 为上传按钮绑定点击事件
    $('#btnChooseImage').on('click', function() {
        $('#file').click();
    });
    $('#file').on('change', function(e) {
        var filelist = e.target.files;
        if (filelist.length === 0) {
            return layer.msg('请选择照片！')
        }
        var file = e.target.files[0];
        var imgURL = URL.createObjectURL(file);
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options); // 重新初始化裁剪区域

    });
    $('#btnUpload').on('click', function() {
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个Canvs画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png'); // 将画布上的内容，转为base64格式的字符串
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                console.log(res);
                layer.msg('更换头像成功！');
                if (res.status !== 0) {
                    return layer.msg('更换头像失败！');
                }

                window.parent.getUserInfo();
            }
        })
    })
})
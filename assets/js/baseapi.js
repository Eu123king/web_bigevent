// 每次调用请求前,都会先调用这个函数
$.ajaxPrefilter(function(option) {
    option.url = 'http://www.liulongbin.top:3007' + option.url;
    // 统一为有权限的接口设置请求头
    if (option.url.indexOf('/my/') !== -1) {
        option.headers = {
            Authorization: localStorage.getItem('token') || ' '
        }
    }
    // 全局挂载complete回调
    option.complete = function(res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token');
            location.href = '/login.html';
        }
    }
})
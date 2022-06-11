// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
// 请求拦截器
// 对应 响应拦截器
$.ajaxPrefilter((options) => {
  // console.log(options);
  // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
  options.url = 'http://www.liulongbin.top:3007' + options.url;
  // 注入 token
  if (options.url.includes('/my/')) {
    options.headers = {
      Authorization: localStorage.getItem('token'),
    };
  }

  // 权限校验
  options.complete = (res) => {
    // 查看res返回的信息
    // console.log(res);
    // 判断返回的res的responseJSON.status的返回值是否为错误，判断message的值是否为'身份认证失败！'
    if (
      res.responseJSON.status === 1 &&
      res.responseJSON.message === '身份认证失败！'
    ) {
      // 删除本地浏览器存储
      localStorage.removeItem('token');
      // 跳转到login页面
      location.href = '/login.html';
    }
  };
});

// 入口函数
$(function () {
  // 点击切换，登录和注册
  // 1.点击a标签隐藏自己显示隐藏的盒子
  $('#link_reg').click(() => {
    $('.login-box').hide();
    $('.reg-box').show();
  });
  // 点击a标签隐藏自己显示隐藏的盒子
  $('#link_login').click(() => {
    $('.login-box').show();
    $('.reg-box').hide();
  });

  // 先引入 form 来自layui
  const form = layui.form;
  // 自定义密码的校验规则
  form.verify({
    // 数组的方式
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    // 函数方式
    repwd: (value) => {
      // 获取密码框的值
      const pwd1 = $('.reg-box [name=password]').val();
      // console.log(value, pwd1);
      // 判断密码框的值是否一致
      if (pwd1 !== value) return '两次密码不一致';
    },
  });

  // 定义跟路径
  // const baseUrl = 'http://www.liulongbin.top:3007';

  // 监听表单的提交事件，发送注册请求
  $('#form_reg').submit((e) => {
    // 阻止表单的默认提交
    e.preventDefault();

    // 发送请求axios
    $.ajax({
      type: 'POST',
      url: '/api/reguser',
      data: {
        // 属性选择器[]
        username: $('.reg-box [name=username]').val(),
        password: $('.reg-box [name=password]').val(),
      },
      success: (res) => {
        console.log(res);
        if (res.status !== 0) return layer.msg(res.message);
        layer.msg('注册成功！');
        $('#link_login').click();
      },
    });
  });

  // 监听登录表单提交事件，发送登录请求
  $('#form_login').submit(function (e) {
    e.preventDefault();
    // 阻止表单的默认提交

    console.log($(this).serialize());
    $.ajax({
      type: 'POST',
      url: '/api/login',
      data: $(this).serialize(),
      success: (res) => {
        // console.log(res);
        if (res.status !== 0) return layer.msg('登录失败!');
        layer.msg('登录成功!');
        // 要把token存在本地
        localStorage.setItem('token', res.token);
        // 跳转到首页
        // location.href = '/index.html';
      },
    });
  });
});

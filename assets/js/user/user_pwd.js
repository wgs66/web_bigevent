$(function () {
  const form = layui.form;

  // 自定义校验规则
  form.verify({
    // 密码验证
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    samepwd: (value) => {
      if (value === $('[name=oldPwd]').val()) return '新密码不能与原密码相同！';
    },
    repwd: (value) => {
      if (value !== $('[name=newPwd]').val()) return '确认密码和新密码不相同！';
    },
  });

  // 更新密码
  $('.layui-form').submit(function (e) {
    e.preventDefault();

    $.ajax({
      type: 'POST',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg('更新密码失败！');
        layer.msg('更新密码成功！');

        // 清空本地 token
        localStorage.removeItem('token');
        // 跳转到登录页面
        setTimeout(() => {
          window.parent.location.href = '/login.html';
        }, 1500);
      },
    });
  });
});

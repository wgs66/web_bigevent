$(function () {
  // 自定义规则
  const form = layui.form;

  form.verify({
    nickname: (value) => {
      if (value.length > 6) return '昵称长度不能超过6个字符';
    },
  });

  // 获取用户基本信息
  const initUserInfo = () => {
    $.ajax({
      type: 'GET',
      url: '/my/userinfo',
      success: (res) => {
        // console.log();
        if (res.status !== 0) return layer.msg('获取用户信息失败！');
        layer.msg('获取用户信息成功！');
        // console.log(res);
        // 把数据填充到表单 使用layui内置的技术
        form.val('formUserIofo', res.data);
      },
    });
  };

  // 更新用户信息
  $('.layui-form').submit(function (e) {
    e.preventDefault();
    // 发送请求
    $.ajax({
      type: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: (res) => {
        // 判断更新是否正确
        if (res.status !== 0) return layer.msg('更新用户信息失败！');
        layer.msg('更新用户信息成功！');
        // 通知父页面 更新用户信息
        window.parent.getUserInfo();
        console.log(window);
      },
    });
  });

  // 重置表单
  $('#btnReset').click((e) => {
    // 阻止表单的默认提交
    e.preventDefault();
    // 调用用户基本信息实现刷新
    initUserInfo();
  });

  // 调用函数
  initUserInfo();
});

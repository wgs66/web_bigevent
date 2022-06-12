// 获取用户基本信息
function getUserInfo() {
  $.ajax({
    type: 'GET',
    url: '/my/userinfo',
    // headers: {
    //   Authorization: localStorage.getItem('token'),
    // },
    success: (res) => {
      // console.log(res);
      if (res.status !== 0) {
        return layer.msg(res.message);
      }
      layer.msg(res.message);

      renderAvatar(res.data);
    },
    // complete: (res) => {
    //   // 查看res返回的信息
    //   // console.log(res);
    //   // 判断返回的res的responseJSON.status的返回值是否为错误，判断message的值是否为'身份认证失败！'
    //   if (
    //     res.responseJSON.status === 1 &&
    //     res.responseJSON.message === '身份认证失败！'
    //   ) {
    //     // 删除本地浏览器存储
    //     localStorage.removeItem('token');
    //     // 跳转到login页面
    //     location.href = '/login.html';
    //   }
    // },
  });
}

// 渲染用户信息
const renderAvatar = (user) => {
  const name = user.nickname || user.username;
  // 渲染欢迎语
  $('#welcome').html(`欢迎 ${name}`);
  // 按需求渲染头像
  if (user.user_pic !== null) {
    $('.layui-nav-img').attr('src', user.user_pic).show();
    $('.text-avatar').hide();
  } else {
    $('.layui-nav-img').hide();
    let first = name[0].toUpperCase();
    $('.text-avatar').html(first).show();
  }
};

// 退出登录
$('#btnExit').click(() => {
  layer.confirm('确定退出登录？', { icon: 3, title: '' }, function (index) {
    // 清空本地存储里面的 token
    localStorage.removeItem('token');
    // 重新跳转到登录页面
    location.href = '/login.html';
  });
});

// 调用函数
getUserInfo();

// 高亮切换
function change() {
  $('#change').addClass('layui-this').next().removeClass('layui-this');
}

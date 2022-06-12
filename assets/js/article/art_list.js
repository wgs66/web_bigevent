$(function () {
  const form = layui.form;
  const laypage = layui.laypage;
  // 定义一个查询的参数对象，将来请求数据的时候，
  // 需要将请求参数对象提交到服务器
  const q = {
    pagenum: 1, // 页码值，默认请求第一页的数据
    pagesize: 5, // 每页显示几条数据，默认每页显示2条
    cate_id: '', // 文章分类的 Id
    state: '', // 文章的发布状态
  };

  // 获取文章列表数据
  const initTable = () => {
    $.ajax({
      type: 'GET',
      url: '/my/article/list',
      data: q,
      success: (res) => {
        // console.log(res);
        if (res.status !== 0) return layer.msg('获取文章列表失败！');
        layer.msg('获取文章列表成功！');

        const htmlStr = template('tpl-table', res);
        $('tbody').html(htmlStr);
        // 调用渲染分页的方法
        renderPage(res.total);
      },
    });
  };

  // 初始化文章分类

  const initCate = () => {
    $.ajax({
      type: 'GET',
      url: '/my/article/cates',
      success: (res) => {
        if (res.status !== 0) return layer.msg('获取文章分类信息失败！');
        layer.msg('获取文章分类信息成功！');
        const htmlStr = template('tpl-cate', res);
        $('[name=cate_id]').html(htmlStr);
        form.render('select');
      },
    });
  };

  // 筛选功能
  $('#form-search').submit((e) => {
    e.preventDefault();
    q.cate_id = $('[name=cate_id]').val();
    q.state = $('[name=state]').val();
    initTable();
  });

  // 分页函数
  const renderPage = (total) => {
    laypage.render({
      elem: 'pageBox', //渲染分页的盒子
      count: total, //数据的总条数
      limit: q.pagesize, //每页显示几条数据
      curr: q.pagenum, //当前页码
      layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
      limits: [2, 3, 5, 10], // 每页展示多少条
      jump: (obj, first) => {
        // console.log(obj);
        q.pagenum = obj.curr;
        q.pagesize = obj.limit;

        //切换分页是，触发事件
        // jump函数的触发时机
        // 1 执行render函数时就会执行（首次加载）
        // 2 当我们切换分页的时候会执行
        // 目的：首次加载的时候不去执行 initTable
        // console.log(first);
        // initTable();
        if (!first) {
          initTable();
        }
      },
    });
  };

  // 删除文章，通过事件委托
  $('tbody').on('click', '.btn-delete', function () {
    const btnNum = $('.btn-delete').length;
    // console.log(btnNum);
    const id = $(this).attr('data-id');
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
      $.ajax({
        type: 'GET',
        url: '/my/article/delete/' + id,
        success: (res) => {
          if (res.status !== 0) return layer.msg('删除文章失败！');
          layer.msg('删除文章成功！');
          if (btnNum === 1) {
            q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1;
          }
          initTable();
          layer.close(index);
        },
      });
    });
  });

  // 调用函数
  initTable();
  // 调用函数
  initCate();

  // 定义美化时间的过滤器
  template.defaults.imports.dataFormat = function (date) {
    const dt = new Date(date);

    var y = dt.getFullYear();
    var m = padZero(dt.getMonth() + 1);
    var d = padZero(dt.getDate());

    var hh = padZero(dt.getHours());
    var mm = padZero(dt.getMinutes());
    var ss = padZero(dt.getSeconds());

    return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss;
  };

  // 定义补零的函数
  function padZero(n) {
    return n > 9 ? n : '0' + n;
  }
});

$(function () {
  getMsg()
  //退出功能
  let layer = layui.layer
  $('#btnLogout').on('click', function () {
    layer.confirm('确定退出登录？', {
      icon: 3,
      title: '提示'
    }, function (index) {
      localStorage.removeItem('token')
      location.assign('/login.html')
      layer.close(index);
    });
  })
})

function getMsg() {
  $.ajax({
    type: "get",
    url: "/my/userinfo",
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg('获取失败')
      }
      console.log(res);
      renderAvatar(res.data)
    },
  });
}

function renderAvatar(user) {
  let name = user.nickname || user.username
  $('#welcome').html('欢迎 &nbsp' + name)
  if (user.user_pic === null) {
    let first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
    $('.layui-nav-img').hide()
  } else {
    $('.text-avatar').hide()
    $('.layui-nav-img').attr('src', user.user_pic).show()
  }
}
$(function () {
  var form = layui.form
  var layer = layui.layer

  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称长度必须在 1 ~ 6 个字符之间！'
      }
    }
  })
  init()

  function init() {
    $.ajax({
      type: "get",
      url: "/my/userinfo",
      success: function (res) {
        if (res.status !== 0) {
          return layer('获取失败')
        }
        console.log(res);
        form.val('formUserInfo', res.data)
      }
    });
  }
  $('#btnReset').on('click', function (e) {
    e.preventDefault()
    init()
  })
  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      type: "post",
      url: "/my/userinfo",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          layer.msg('提交失败')
        }
        console.log(res);
        window.parent.getMsg()
      }
    });
  })
})
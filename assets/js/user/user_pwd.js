$(function () {
  var form = layui.form
  var layer = layui.layer
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    samePwd: function (value) {
      if (value === $('[name=oldPwd]').val()) {
        return '新旧密码不能相同！'
      }
    },
    rePwd: function (value) {
      if (value !== $('[name=newPwd]').val()) {
        return '两次密码不一致！'
      }
    }
  })
  $('.layui-form').on('click', function (e) {
    e.preventDefault()
    $.ajax({
      type: "post",
      url: "/my/updatapwd",
      data: $(this).serialize(),
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layer.msg('更改失败')
        }
        layer.msg('更改成功')
        $('.layui-form')[0].reset()
      }
    });
  })
})
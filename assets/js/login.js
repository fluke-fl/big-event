$(function () {
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })
  let form = layui.form
  let layer = layui.layer
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    user: [/^[\S]{4,8}$/, '用户名必须4到8位，且不能出现空格'],
    repwd: function (value) {
      var pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致！'
      }
    }
  })
  $('#form_reg').on('submit', function (e) {
    var data = {
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val()
    }
    e.preventDefault()
    $.ajax({
      type: "post",
      url: "/api/reguser",
      data: data,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('注册成功，请登录')
        $('#link_login').click()
      }
    });
  })
  $('#form_login').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      type: "post",
      url: "/api/login",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('登陆失败')
        }
        layer.msg('登录成功')
        localStorage.setItem('token', res.token)
        location.assign('/index.html')
      }
    });
  })
})
// 验证邮箱密码格式正确改变登录按钮状态
loginBtnState();
//跳转注册界面函数
regPage();

//数据验证通过后点击提交显示注册成功弹出框
$('.loginBtn').on('click',function () {
    if(localStorage.getItem('email')===$("#userEmail").val()&&localStorage.getItem('pwd')===$("#userPwd").val()){
        popupBoxShow('登录成功！','pages/main.html');
        $('.login').css({"display":"none"});
        $('.loginName').css({"display":"inline-block"}).text(localStorage.getItem('email'));
    }else{
        popupBoxShow('你输入的账号或密码错误，请重新输入！');
    }
})

/*
* 功能：点击跳转注册界面
* */
function regPage() {
    $(".register").on('click',function () {
        $.get("pages/register.html", function (data) {
            $(`main`).html(data);
        });
    });
}

/*
* 验证邮箱密码格式正确改变登录按钮状态
* */

function loginBtnState() {
    var $userEmail = $('#userEmail'),
        $userPwd = $('#userPwd'),
        $loginBtn = $('.loginBtn');
    //设置邮箱及密码正则表达式
    var RegExpEma = /^\w+@[a-z0-9]+\.([a-z]){1,3}$/,
        RegExpPwd = /^\w{6,}$/;
    //邮箱输入框监听事件
    $userEmail.keyup(function () {
        //验证邮箱密码格式正确
        if(RegExpEma.test($(this).val())&&RegExpPwd.test($userPwd.val())){
            //改变登录按钮状态
            $loginBtn.addClass('active').prop('disabled', false);
        }else{
            $loginBtn.removeClass('active').prop('disabled', true);
        }
    })
    //密码输入框监听事件
    $userPwd.keyup(function () {
        //验证邮箱密码格式正确
        if(RegExpEma.test($userEmail.val())&&RegExpPwd.test($(this).val())){
            //改变登录按钮状态
            $loginBtn.addClass('active').prop('disabled', false);
        }else{
            $loginBtn.removeClass('active').prop('disabled',true);
        }
    })
}

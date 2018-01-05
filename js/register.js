//跳转注册界面函数
regBtnState();
//跳转登录界面函数
loginRegPage();

//数据验证通过后点击提交显示注册成功弹出框
$('.regBtn').on('click',function () {
    popupBoxShow('注册成功！','pages/login.html');
    //本地储存注册数据
    localStorage.setItem('email',$("#userEmail").val());
    localStorage.setItem('pwd',$("#userPwd").val());
})

/*
* 功能：点击跳转登录界面
* */
function loginRegPage() {
    $(".login,.subhead>a").on('click', function () {
        $.get("pages/login.html", function (data) {
            $(`main`).html(data);
        });
    });
}
/*
* 验证邮箱密码格式正确改变登录按钮状态
* */
function regBtnState() {
    var $userEmail = $('#userEmail'),
        $userPwd = $('#userPwd'),
        $rePwd = $('#rePwd'),
        $regBtn = $('.regBtn');
    //设置邮箱及密码正则表达式
    var RegExpEma = /^\w+@[a-z0-9]+\.([a-z]){1,3}$/,
        RegExpPwd = /^\w{6,}$/;
    //邮箱输入框监听事件
    $userEmail.keyup(function () {
        //验证邮箱密码格式正确及密码确认一致
        if(RegExpEma.test($(this).val())&&RegExpPwd.test($userPwd.val())&&$userPwd.val()===$rePwd.val()){
            //改变登录按钮状态
            $regBtn.addClass('active').prop('disabled', false);
        }else{
            $regBtn.removeClass('active').prop('disabled', true);
        }
    })
    //密码输入框监听事件
    $userPwd.keyup(function () {
        //验证邮箱密码格式正确及密码确认一致
        if(RegExpEma.test($userEmail.val())&&RegExpPwd.test($(this).val())&&$(this).val()===$rePwd.val()){
            //改变登录按钮状态
            $regBtn.addClass('active').prop('disabled', false);
        }else{
            $regBtn.removeClass('active').prop('disabled', true);
        }
    })
    //确认密码输入框监听事件
    $rePwd.keyup(function () {
        //验证邮箱密码格式正确及密码确认一致
        if(RegExpEma.test($userEmail.val())&&RegExpPwd.test($userPwd.val())&&$userPwd.val()===$(this).val()){
            //改变登录按钮状态
            $regBtn.addClass('active').prop('disabled', false);
        }else{
            $regBtn.removeClass('active').prop('disabled', true);
        }
    })

}



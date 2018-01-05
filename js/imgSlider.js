//轮播图函数
carousel();
/*
* 构造函数，轮播图封装
* */
var curImg = 0, timer;

//图片下标自增，实现动态切换
function carousel() {
    if (curImg === 3) {
        curImg = 0;
     } else {
        curImg += 1;
      }
     change(curImg);
}

//圆点点击跳转图片
$(".pointsList").on('click', 'i', function () {
    curImg = $(this).index();
    change(curImg);
})
//定时切换
timer = setInterval(carousel, 6000);

//公共调用函数，实现图片及圆点动态切换
function change(a) {
    $(".carousel").find("img").eq(a).addClass('show').siblings().removeClass('show');
    $(".pointsList").find("i").eq(a).addClass('cdk').siblings().removeClass('cdk');
}
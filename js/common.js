window.onload = function() {
    // 解决页面加载后跳跃问题
    window.scrollTo(0,0);

}
$(function () {
    //购物车按钮相关功能
    shoppingFun();
    //地区选择框下拉菜单
    selectFun();
    //点击不同家居类型切换main标签的内容
    changeFitment();
    //点击跳转登录注册界面
    loginRegPage();
    //加载主页main内容
    loginMainPage();
    //跳转个人信息界面
    loadUserInfo();
})

/*
* 功能：点击刷新或返回主页面
* */


/**
 *功能： 地区选择框下拉菜单
 */
//鼠标点击后显示选择框
function selectFun() {
    $('.areaSelect i').on('click', function () {
        $(this).siblings('dl').slideDown(150);
    });
// 鼠标离开选择区域后隐藏选择菜单
    $('.areaSelect').on("mouseleave", function () {
        $(this).children("dl").slideUp(150);
    });
// 选择地区并显示到选择框内
    $('.areaSelect dt').on("click", function () {
        // 获取选中项的值和文本
        var this_txt = $(this).text();
        // 设置选择框内的值、title及文本
        $(this).parent().siblings("i").prop("title", this_txt).text(this_txt);
        $(this).parent("dl").slideUp(150);
    });
}

//购物车点击事件
$('.lookCar').find('a').click(function () {
    showShoppingCar();
})
/*
* 功能：查看购物车
* */
function showShoppingCar() {
    $.get('pages/shopping_car.html',function (data) {
        $(`main`).html(data);
    })
}

/**
 * 功能：购物车header按钮相关功能
 **/
function shoppingFun() {
    // 点击购物车显隐购物车简要信息
    $('.shopping').on("click", function () {
        $('.shoppingCar').toggle(160);
    });
    // 获取购物车内宝贝的数量
    var Count = $(".shoppingContent p").length;
    // 显示于购物车旁(当超出9个时用“...”替代)
    if (Count <= 9) {
        $(".shopping .goodscount").text(Count);
    } else {
        $(".shopping .goodscount").text("···");
    }
}


/*
* 功能：点击不同家居类型切换main标签的内容
* */
function changeFitment() {
    //不同家具类型点击事件
    $(".main_nav .fitment").click(function () {
        //根据点击的idx,显示对应数据
        var idx = $(this).parent().index();
        //获取所有家具json数据信息
        $.getJSON('data/goods.json', function (data) {
            // 定义不同标签内容变量
            var fitStr = '', filterStr = '', filterLiStr = '', fitInfo = '', PriceStr = '';
            //家具分类导航栏内容
            for (var i = 0; i < data.type[idx].length; i++) {
                fitStr += ` <li><a href="">${data.type[idx][i]}</a></li>`;
            }
            //家具材质、成色等筛选导航栏内容
            for (var j = 0; j < data.filter.length; j++) {
                filterLiStr = '';
                for (var k = 0; k < data.filter_li[j].length; k++) {
                    filterLiStr += `<li>${data.filter_li[j][k]}</li>`;
                }
                filterStr += `<div><a class="filter">${data.filter[j]}</a><ul>${filterLiStr}</ul></div>`;
            }
            //家具图片及价格展示内容
            for (var i = 0; i < data.goodsImg[idx].length; i++) {
                PriceStr = '';
                if (i < 2) {
                    PriceStr = `<span class="oldPrice"><i>￥${data.goodsPrice[idx][i][0]}</i><b class="del"></b></span><span class="newPrice">
                             <i>￥${data.goodsPrice[idx][i][1]}</i></span>`;
                } else {
                    PriceStr = `<span class="oldPrice"><i>￥${data.goodsPrice[idx][i]}</i></span>`;
                }
                fitInfo += `<a><div class="goodsImg"><img src="imgs/${data.goodsImg[idx][i]}" alt=""></div>
                             <div class="goodsInfo"><span class="goodsName">商品名称</span><span class="goodsPrice">
                             ${PriceStr}</span></div></a>`;

            }
            //将所有内容加载到main标签里面
            $("main").html(` <div class="classify-container"><div class="classify-banner"><h1>${data.fitment[idx][0]}
                            &nbsp;&nbsp;&nbsp;&nbsp;${data.fitment[idx][1]}</h1><ul class="subnav">${fitStr}
                            </div><div class="classify-filter">${filterStr}</div><div class="goods-choose">${fitInfo}</div></div>
                            <script>$('.goods-choose').find('a').eq(0).on('click',function (){$.get('pages/goods_info.html'
                            ,function(data){$("main").html(data);})});</script>`);
        });

    });

}

/*
* 功能：点击查看商品详情
* */


function loginMainPage() {
    $.get("pages/main.html", function (data) {
        $(`main`).html(data);
    });
}


/*
* 功能：点击跳转登录注册界面
* */
function loginRegPage() {
    $(".login").on('click', function () {
        $.get("pages/login.html", function (data) {
            $(`main`).html(data);
        });
    });
}

/*
* 功能：登录注册提示弹出框函数
* */
function popupBoxShow(info,url) {
    //在body内添加弹出框和遮罩层
    $("body").append(`<div class="maskLayer"><div class="popupBox"><p>${info}</p>
                          <button class="sureBtn">确定</button></div></div>`);
    //点击确定取消弹出框及遮罩层
    $(".sureBtn").click(function () {
        $(".popupBox").fadeOut(600, function () {
            $(this).remove();
            $(".maskLayer").remove();
        });
        if(url){
            $.get(url,function (data) {
                $(`main`).html(data);
            });
        }
        });
}

/*
* 功能：个人信息页面跳转函数
* */
function loadUserInfo() {
    $('.loginName').click(function () {
        $.get('pages/user_info.html',function (data) {
            $(`main`).html(data);
        })
    });
}
/*
* 功能：切换页面改变css文件
* */
// function changeCssFile(file) {
//     $(`head`).html(`<link rel="stylesheet" href="css/common.css">
//                         <link rel="stylesheet" href="css/index.css">
//                         <link rel="stylesheet" href="css/${file}.css">`);
// }
/**
 * 商品详细信息
 */
// 图片淡入淡出效果
$('.smallImg ul li').on('click',function () {
    var thisIndex = $(this).index();
    // 为右侧小图增加选择边框效果
    $(this).addClass('selected').siblings().removeClass('selected');
    // 主图显示
    $('.mainImg ul li').eq(thisIndex).fadeIn(600).siblings().fadeOut(600);
});

/**
 * 功能：购买数量框
 */
// 增加按钮
$('.add').on('click',function () {
    var counts = Number($('.counts').text()),
        val = parseInt($('.countChoose input').val());
    if(counts > val && (val +1) != counts){
        $('.countChoose input').val(val + 1);
        $('.countSet a').removeClass('disabled')
    }
    else if((val+1) == counts){
        $('.countChoose input').val(val + 1);
        $('.add').addClass('disabled')
    }
});
// 减少按钮
$('.reduce').on('click',function () {
    var val = parseInt($('.countChoose input').val());
    if(val >0 && (val-1) !=0){
        $('.countChoose input').val(val - 1);
        $('.countSet a').removeClass('disabled')
    }
    else if((val-1) == 0){
        $('.countChoose input').val(val - 1);
        $('.reduce').addClass('disabled')
    }
});

// 根据输入框购买量改变及库存量给按钮添加/移除禁用效果
$('.countChoose input').on('input',function () {
    var counts = Number($('.counts').text()),
        val = parseInt($('.countChoose input').val());
    if(counts > val && val >0){
        $('.countSet a').removeClass('disabled')
    }
    else if(val >= counts){
        $('.add').addClass('disabled').siblings().removeClass('disabled')
    }
    else {
        $('.reduce').addClass('disabled').siblings().removeClass('disabled');
        $('.countChoose input').val(0)
    }
});

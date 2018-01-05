/**
 * 购物车
 */
 // 购物车左边选择框效果变换

// 全选
$('.allChecked').on('click',function () {
    $('.allChecked').removeClass('checked_part');
    if($('.allChecked').hasClass('checked_all')){
        $('.checked').removeClass('checked_all');
        $('.allChecked').removeClass('checked_all')
    }
    else {
        $('.allChecked').addClass('checked_all');
        $('.checked').addClass('checked_all')
    }
});
// 半选
$('.checked').on('click',function () {
    $(this).toggleClass('checked_all');
   var counts_1 = $('.checked').length,
       counts_2 = $('.check .checked_all').length;
   console.log(counts_2);
    if(counts_2 ==0){
        $('.allChecked').removeClass('checked_part')
    }
    else if(counts_2 < counts_1){
        $('.allChecked').removeClass('checked_all').addClass('checked_part');
    }
    else {
        $('.allChecked').removeClass('checked_part').addClass('checked_all');
    }
});

/**
 * 功能：购买数量框
 */
// 增加按钮
$('.add').on('click',function () {
    var val = parseInt($(this).siblings('input').val());
    $(this).siblings('input').val(val + 1);
    $(this).siblings('.reduce').removeClass('disabled');
    moneyChange();
});
// 减少按钮
$('.reduce').on('click',function () {
    var val = parseInt($(this).siblings('input').val());
    if(val >1 && (val-1) !=1){
        $(this).siblings('input').val(val - 1);
    }
    else if((val-1) == 1){
        $(this).siblings('input').val(val - 1);
        $(this).addClass('disabled')
    }
    moneyChange();
});
// 监听数量框改变
$('.t_count input').on('input',function () {
    var val = parseInt($(this).val());
    if( 1 >= val){
        $(this).siblings('.reduce').addClass('disabled')
    }
    else if(val > 1){
        $(this).siblings('.reduce').removeClass('disabled')
    }
    else{
        $(this).siblings('.reduce').addClass('disabled');
        $(this).val(1)
    }
    moneyChange();
});
// 金额=单价*数量,合计总价
moneyChange();
function moneyChange() {
    var len = $('.t_count input').length;
    for(i=0;i<len;i++){
        var counts = Number($('.moneys').parent().prev().children('input').eq(i).val());
        var price = Number($('.moneys').parent().prev().prev().children('.one-price').eq(i).text());
        $('.moneys').eq(i).text(counts * price);
    }
    // 总价
    var money = 0
    for(j=0;j<len;j++){
        num = Number($('.moneys').eq(j).text());
        money +=num;
        $('.total_moneys').text(money)
    }
}
















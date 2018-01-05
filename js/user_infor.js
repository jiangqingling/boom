// 请求数据
$.getJSON("data/data_user_info.json",function (data) {
// 数据请求成功后加载
// user_choose选中效果设置
    $('.user_choose a').click(function () {
        $(this).addClass('user_choose_hover').parent().siblings().find('a').removeClass('user_choose_hover');
    });

// 男女性别选择,单击事件
    $('.boy').on('click', function () {
        $(this).addClass('gander_check').removeClass('gander_no_check');
        $('.girl').removeClass('gander_check').addClass('gander_no_check');
    });
    $('.girl').on('click', function () {
        $(this).addClass('gander_check').removeClass('gander_no_check');
        $('.boy').removeClass('gander_check').addClass('gander_no_check');
    });
// 个人信息下拉框生成
    select(data.year, '.birthday .year', 'width_138_h');
    select(data.month, '.birthday .month', 'width_86_h');
    select(data.day, '.birthday .day ', 'width_86_h');

    select(data.like, '.like .select>div', 'width_186_h');
    select(data.edu, '.edu .select>div', 'width_186_h');
    select(data.work, '.work .select>div', 'width_186_h');

    select(data.first, '.adda .select .first', 'width_120_h');
    select(data.second, '.adda .select .second', 'width_120_h');
    select(data.third, '.adda .select .third', 'width_120_h');
    select(data.forth, '.adda .select .forth', 'width_120_h');

// 为user_title设置点击切换事件
    $('.user_title ul li').on('click', function () {
        console.log(1);
        if ($(this).index() === 0) {
            console.log(1);
            $('#user_info').addClass('checked');
            $('#my_order,#my_sole,#my_count,#my_sys').removeClass('checked');
        }
        else if ($(this).index() === 1) {
            load_buyData(data.data_buy, '#my_order tbody');
            $('#my_order').addClass('checked');
            $('#user_info,#my_sole,#my_count,#my_sys').removeClass('checked');
            del_func();
        }
        else if ($(this).index() === 2) {
            load_buyData_sole(data.data_sole, '#my_sole tbody');
            $('#my_sole').addClass('checked');
            $('#user_info,#my_order,#my_count,#my_sys').removeClass('checked');
            del_func();
        }
        else if ($(this).index() === 3) {
            $('#my_count').addClass('checked');
            $('#user_info,#my_order,#my_sole,#my_sys').removeClass('checked');
        }
        else if ($(this).index() === 4) {
            $('#my_sys').addClass('checked');
            $('#user_info,#my_order,#my_count,#my_sole').removeClass('checked');
        }
    });

    /**
     * function:为my_sys动态生成
     * @param arr 商品加载数据
     *        ele 目标对象
     * */
    load_sys(data.messg, '#my_sys .mes_con', 123);
    function load_sys(arr, ele, time) {
        var str_content = '';
        var arr_len = arr.length;
        for (var i = 0; i < arr_len; i++) {
            str_content += '<div>' +
                '<div class="message">' + '<div  >' +
                '<p class="mesg_content mesg_content_width">' + arr[i] + '</p>' +
                '<p class="time"><span>' + time + '</span><span>' + time + '</span></p></div>' +
                '<p class="mark"><i class="point"></i><span class="mark_w">标记</span></p></div></div>';
        }
        $(ele).append(str_content);
        // 改变标记为红色的样式
        $('.point').click(function () {
            $(this).addClass('point_red');
        });
        // 为小红点添加数据
        sys_messg_count('.message','.message_count');
    }
// 设置my-sys伸缩样式
    $('.message>div').click(function () {
        if ($(this).find('.mesg_content').hasClass('mesg_content_width')) {
            $(this).addClass('message_div_block');
            $(this).find('.mesg_content').removeClass('mesg_content_width');
            $(this).next().addClass('display_mark');
            $(this).find('.mesg_content').addClass('mesg_content_wrap');
            $(this).find('.time').addClass('message_time_width');
        }
        else {
            $(this).removeClass('message_div_block');
            $(this).find('.mesg_content').addClass('mesg_content_width');
            $(this).next().removeClass('display_mark');
            $(this).find('.mesg_content').removeClass('mesg_content_wrap');
            $(this).find('.time').removeClass('message_time_width');
        }
    });


// 编辑my_sys添加删除函数
    $('.del').on('click', function () {
        var point_red_len=$('.point_red').length;
        console.log(point_red_len);
        if (point_red_len===0) {
            $('.shade').addClass('checked');
            $('.confirm').addClass('checked');
            delete_list('您还没有标记要删除的消息，请至少标记一条消息再执行该操作。', '.confirm',' checked_no');
            $('.confirm_button').on('click', function () {
                $('.shade').removeClass('checked');
                $('.confirm').removeClass('checked');
            });
        }
        // 如果有选中
        else {
            $('.shade').addClass('checked');
            $('.confirm').addClass('checked');
            // 调用生成删除确认框的函数
            delete_list('您是否要删除选中的消息？删除后不再显示该消息。', '.confirm');
            // 点击删除按钮功能设置
            $('.confirm_cancel').on('click', function () {
                $('.shade').removeClass('checked');
                $('.confirm').removeClass('checked');
            });
            $('.confirm_button').on('click', function () {
                $('.shade').removeClass('checked');
                $('.confirm').removeClass('checked');
                // 将选中的数据删除
                $('.point_red').closest('div').remove();
                sys_messg_count('.message','.message_count');
            });
        }
    });






/**
 * 定义下拉框的函数
 * @param arr:传入下拉框选项数组
 *        ele:写入元素
 *        classB:传入的样式classB
 * */
function select(arr, ele, classB) {
    var str = '';
    var arr_len = arr.length;
    for (var i = 0; i < arr_len; i++)
        str += '<li class="items hover">' + arr[i] + '</li>';
    $(ele).html('<div ><span class="check"></span><span class="select_img"></span></div>' +
        '<ul class="checked_no ul_abs ' + classB + '">' + str + '</ul>');

    $(ele).find('.check').text(arr[0]);
    $(ele).find('li').on('click', function () {
        $(ele).find('.check').text($(this).text());
    });
    $(ele).children('div').click(function () {
        console.log('1');
        $(ele).find('.select_img').addClass('select_down');

        $(ele).find('ul').addClass('checked');
    });
    $(ele).mouseleave(function () {
        $(ele).find('.select_img').removeClass('select_down');
        $(ele).find('ul').removeClass('checked');
    })
}

/**
 * function:为my_order动态生成
 * @param arr 商品加载数据
 *        ele 目标对象
 * */
function load_buyData(arr, ele) {
    var str_content = '';
    var arr_len = arr.img.length;
    for (var i = 0; i < arr_len; i++) {
        str_content += '<tr>' +
            ' <td class="table_td"> ' +
            '<img class="img_list" src="imgs/' + arr.img[i] + '" alt="商品1"> ' +
            '<p>' + arr.order_num[i] + '</p> ' +
            '</td> <td class="table_td">' + arr.price[i] + '</td>' +
            ' <td class="table_td">' + arr.order_time[i] +
            '</td> <td class="table_td">' + arr.send_time[i] + '</td>' +
            ' <td class="table_td">' + arr.state[i] +
            '</td> <td class="operation table_td"> ' +
            '<div class="td_top"> <span class="look padding hov">查看</span> ' +
            '<span></span> <span class="cancel padding hov">取消</span> ' +
            '</div> <div class="td_bottom"> <span class="sole_after padding hov">售后</span>' +
            ' <span></span> <span class="delete padding hov">删除</span></div></td></tr>';
    }
    $(ele).html(str_content);
}

/**
 * function:为my_sole动态生成
 * @param arr 商品加载数据
 *        ele 目标对象
 *        imgArr为图片数组
 * */
function load_buyData_sole(arr, ele) {
    var str_content = '';
    var arr_len = arr.img.length;
    for (var i = 0; i < arr_len; i++) {
        str_content += '<tr>' +
            '<td class="table_td">' +
            '<img class="img_list" src="imgs/' + arr.img[i] + '" alt="商品1">' +
            '<p>' + arr.order_num[i] + '</p></td>' +
            '<td class="table_td">' + arr.price[i] + '</td>' +
            '<td class="table_td">' + arr.submit_time[i] + '</td>' +
            '<td class="table_td">' + arr.soleOn_time[i] + '</td>' +
            '<td class="table_td">' + arr.store_state[i] + '</td>' +
            '<td class="table_td">' + arr.state[i] + '</td>' +
            '<td class="table_td sole_back">' + arr.my_money[i] + '</td>' +
            '<td class="operation table_td">' +
            '<div class="td_top">' +
            '<span class="reducPriceApply look padding hov">降价申请</span>' +
            '</div>' +
            '<div class="td_bottom">' +
            '<span class="sole_after padding delete hov">删除</span>' +
            '<span></span>' +
            '<span class="cancel padding hov">取消</span>' +
            '</div>' +
            '</td>' +
            '</tr>';
    }
    $(ele).html(str_content);
    $('.sole_back').each(function (index,item) {
        if ($(item).text()==="是"){
            $(item).next().find('.reducPriceApply ,.cancel ').removeClass('hov').addClass('cursor')
        }
    })
}
// 编写系统消息内数据个数函数
function sys_messg_count(ele,ele1) {
    var count=$(ele).length;
    $(ele1).text(count);
}

/**
 * 功能:生成确认对话框函数
 * @param str 为提示信息
 * ele 为要添加的目标对象
 * */
function delete_list(str, ele,hidden_class) {
    $(ele).html('<h1>删除消息</h1><p class="confirm_p">' + str + '</p><p class="button">' +
        '<button type="button" class="confirm_b confirm_cancel ' +hidden_class+'">取消</button>' +
        '<button type="button" class="confirm_b confirm_button">确认</button></p>')
}

/*
* function:编写点击删除后改变商品数据变化的函数
* */
function shapping_data_change(arr, row_delete) {
    var arr_len = Object.keys(arr).length;
    console.log(arr_len);
    for (var i = 0; i < arr_len; i++) {
        arr[Object.keys(arr)[i]].splice(row_delete, 1);
    }
}
/**
 * 功能:为my_order 和my_sole点击删除按钮设置删除函数
 * */
function del_func() {
    $('.delete').on('click', function () {
        var thisV = $(this);
        $('.shade').addClass('checked');
        $('.confirm').addClass('checked');
        // 调用生成删除确认框的函数
        delete_list('您是否要删除该出售信息？删除后不再显示该出售信息。', '.confirm',null);
        // 点击删除按钮功能设置
        $('.confirm_cancel').on('click', function () {
            console.log(555);
            $('.shade').removeClass('checked');
            $('.confirm').removeClass('checked');
        });
        $('.confirm_button').on('click', function () {
            console.log(6666);
            $('.shade').removeClass('checked');
            $('.confirm').removeClass('checked');
            // 移除所在行的商品数据
            $(thisV).closest('tr').remove();
            // 获取删除数据所在行的下标
            var index_delete = $(thisV).closest('tr').index();
            // 在数组中删除数组数据
            // 还需要判断是哪个操作对象
            // shapping_data_change(arr,index_delete);
        });
    });
}
});
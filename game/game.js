var score = 0;
var mouses = $('img');

// 跳出一个地鼠，过一会儿隐藏
function show() {
    // 取值0~15总共16个数
    var a = Math.floor(Math.random() * 16);
    //获取一个对应的DOM元素。
    var mouse = mouses.get(a);
    // addClass:为每个匹配的元素添加指定的样式类名
    // removeClass：为每个匹配的元素移除指定的样式类名
    // 让地鼠出来
    $(mouse).addClass('mouseUp').removeClass('mouseDown');

    setTimeout(function() {
        // 让地鼠在外停留2.5s后在隐藏起来
        $(mouse).addClass('mouseDown').removeClass('mouseUp');
    }, 2500);
}

// 跳出一批地鼠
function play() {
    // 函数多次调用,跳出一批地鼠
    show();
    show();
    show();
    show();
    show();
    show();
}

// 每隔一段时间跳出一批地鼠
setInterval(play, 2000);

// 打中地鼠
$('img').click(function () {
    // attr:获取匹配的元素集合中的第一个元素的属性的值。
    // 当地鼠被打中的时候,添加一个打中的声音,并且再出现一批地鼠
    $('#dazhong').attr('src', 'audio/dazhong.wav').get(0).play();
    // this指向当前被鼠标打中的这个地鼠,让被打中的地鼠隐藏起来
    $(this).addClass('mouseDown').removeClass('mouseUp');
    // 每打中一个地鼠就加十分
    score += 10;
    //把得到的分数插入到标签中
    $('#score').text('得分：' + score);
});
// 当鼠标点下的时候，更改下鼠标图片样式
$('body').mousedown(function () {
    $('body').css('cursor', 'url(image/cursor-down.png), auto');
    // 当鼠标松开的时候，换到原来的样式
}).mouseup(function () {
    $('body').css('cursor', 'url(image/cursor.png), auto');
});
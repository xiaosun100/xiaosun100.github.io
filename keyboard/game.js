// 这是一个全局变量 可以在当前文件的任何方法中使用
var random = 0;
var okCount = 0;
var errorCount = 0;
var charDiv = document.querySelector('#char');

// 定义一个生成字母的方法，目的是能够多次调用
function show() {
    //  0 ~ 1 之间的小数
    // var 叫做定义变量  第一次定义某个变量的时候加var
    // 在一个方法中定义的变量叫做局部变量
    // 只能够在自己的方法中使用 其他方法不能用
    random = Math.random();
    //  0 ~ 1 转化为 0.多  ~  25.多
    random = random * 26;
    // 取整
    random = Math.floor(random);
    // 0 ~ 25   变成  65 ~ 90
    random = random + 65;
    // 把生成的65 ~ 90 之间的数字   变成 A  ~  Z
    var char = String.fromCharCode(random);

    charDiv.innerHTML = char;
}

show();

// 没有名字的方法 叫做  匿名方法（匿名函数）
// 当键盘上某一个键按下之后抬手的时候  这个方法会自动调用
window.onkeyup = function (event) {
    // 获取到所点的键对应的ASCII码值
    var key = event.keyCode;

    // 判断 用户点击的键 跟  生成的字母两个的ascii值是否一样
    if (key == random) {
        // 如果输入正确  就给okCount + 1
        okCount = okCount + 1;

        // 使用第三方的 css文件中定义的动画
        charDiv.className = 'animated bounceIn';

        // 延迟多少毫秒之后 再去执行某个方法
        setTimeout(clearAnimate, 500);

        // 显示新字母
        show();
    }
    else {
        errorCount++;

        charDiv.className = 'animated shake error';

        // 延迟多少毫秒之后 再去执行某个方法
        setTimeout(clearAnimate, 500);
    }

    var rate = okCount / (okCount + errorCount);
    rate = rate * 100;
    rate = rate.toFixed(2);

    var result = '正确' + okCount + '个，' + '错误' + errorCount + '个，' + '正确率' + rate + '%';
    // 把拼接好的 显示结果的字符    赋值给div
    document.querySelector('#result').innerHTML = result;

}

// 这个方法是用来清除动画的
function clearAnimate() {
    charDiv.className = 'animated';
}
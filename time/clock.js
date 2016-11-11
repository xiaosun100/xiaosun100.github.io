// ctrl + c  复制
// ctrl + v  粘贴
// ctrl + s  保存
// ctrl + x  剪切
// ctrl + z  撤销

// js    javascript 脚本语言

// var age = 26;

// if (age < 18) {
//     alert('妹妹你太小了');
// }
// else if (age <= 24) {
//     alert('我们交往吧');
// } 
// else {
//     alert('不喜欢姐弟恋');
// }

// var we = 5;

// switch (we) {
//     case 6:
//         we = '星期六';
//         break;
//     case 0:
//         we = '星期日';
//         break;
//     default:
//         we = '工作日';
//         break;
// }

// 定义一个方法（函数），里面的代码默认不会执行，需要你去调用
// 这个方法（函数） 里面的代码才会执行
function updateTime() {
    // 1，获取系统当前的时间和日期
    var date = new Date();
    // 分别把 时间 和 日期从 date变量中提取（获取）出来

    // 小时
    var hour = date.getHours();
    // 判断语句  如果小于10  就 前面补0
    if (hour < 10) {
        hour = '0' + hour;
    }

    // 分钟
    var minute = date.getMinutes();

    if (minute < 10) {
        minute = '0' + minute;
    } else {
        // else中 再次给变量赋值  这里 相当于没有任何意义
        minute = minute;
    }

    // 秒数
    var second = date.getSeconds();
    // 三目运算
    second = (second < 10) ? '0' + second : second;

    // 10:30:45
    var time = hour + ':' + minute + ':' + second;
    // 2, 把当前的时间和日期显示到html中的标签里
    // 获取到html文件中 id为time 的标签
    document.querySelector('#time').innerHTML = time;

    // 年
    var year = date.getFullYear();
    // 月
    var month = date.getMonth() + 1;
    // 日
    var day = date.getDate();
    // 周几  0~6  周日  周一 ~周六
    var week = date.getDay();

    // 分支语句
    switch (week) {
        case 0:
            week = '日';
            break;
        case 1:
            week = '一';
            break;
        case 2:
            week = '二';
            break;
        case 3:
            week = '三';
            break;
        case 4:
            week = '四';
            break;
        case 5:
            week = '五';
            break;
        case 6:
            week = '六';
            break;

        default:
            break;
    }

    // 2016年7月5日 星期二
    var today = year + '年' + month + '月' + day + '日' + ' 星期' + week;

    document.querySelector('#date').innerHTML = today;
}

// 让方法立刻执行一次
updateTime();

setInterval(updateTime, 1000);
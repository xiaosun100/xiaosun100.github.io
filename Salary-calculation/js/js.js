/*
通过以下两种方式在js文件中选择我们页面中的标签
document.querySelector //选择结果为单个标签元素
document.querySelectorAll //选择结果为一个标签元素数组
 */

// querySelector的选择方式写法和css中的选择方式类似

// 选择我的按钮标签
var btn = document.querySelector('#btn');
console.log(btn);

// 通过var关键字定义一个变量

// 定义基本工资默认为0
var jiBen = 0;
var jiangJin = 0;
var jiXiao = 0;
var yangLao = 0;
var yiLiao = 0;
var shiYe = 0;
var gongJiJin = 0;

// 最低工资
var minGongZi = 3500;

// 缴税基数＝基本工资－五险一金－最低工资
var jiaoShuiJiShu = 0;

// 为按钮标签添加一个click事件
btn.onclick = function(event) {
    console.log(event);
    // alert('按钮被点击了!');
    // 通过Number关键字把数据做一个类型转换
    jiBen = Number(document.querySelector('#jiBen').value);
    jiangJin = Number(document.querySelector('#jiangJin').value);
    jiXiao = Number(document.querySelector('#jiXiao').value);
    // toFixed(2) 保留两位小数
    yangLao = (jiBen*0.08).toFixed(2);
    yiLiao = (jiBen*0.02).toFixed(2);
    shiYe = (jiBen*0.005).toFixed(2);
    gongJiJin = (jiBen*0.12).toFixed(2);

    // 此为需要缴税的基本工资
    jiaoShuiJiShu = jiBen - yangLao - yiLiao -shiYe- gongJiJin;


    // 通过innerHTML属性设置标签的文本内容
    document.querySelector('#sJiBen').innerHTML = jiBen;
    document.querySelector('#sYangLao').innerHTML = yangLao;
    document.querySelector('#sYiLiao').innerHTML = yiLiao;
    document.querySelector('#sShiYe').innerHTML = shiYe;
    document.querySelector('#sGongJiJin').innerHTML = gongJiJin;

    // 实际缴税基数为基本工资扣去五险一金后＋绩效＋奖金-最低标准
    jiaoShuiJiShu = jiaoShuiJiShu+jiangJin+jiXiao - minGongZi;

    // 实际要缴纳的税
    var shuiJin = 0;
    // 税率
    var shuiLv = 0;
    if(jiaoShuiJiShu<=0){
      shuiLv = 0;
    }
    else if(jiaoShuiJiShu>=0 && jiaoShuiJiShu<=1500){
      // 3%
      shuiLv = 0.03;
      shuiJin = (jiaoShuiJiShu*shuiLv).toFixed(2);
    }
    else if(jiaoShuiJiShu>1500 && jiaoShuiJiShu<=4500){
      // 10%
      shuiLv = 0.1;
      shuiJin = (jiaoShuiJiShu*shuiLv).toFixed(2)-105;
    }
    else if(jiaoShuiJiShu>4500 && jiaoShuiJiShu<=9000){
      // 20%
      shuiLv = 0.2;
      shuiJin = (jiaoShuiJiShu*shuiLv).toFixed(2)-555;
    }
    else if(jiaoShuiJiShu>9000 && jiaoShuiJiShu<=35000){
      shuiLv = 0.25;
      shuiJin = (jiaoShuiJiShu*shuiLv).toFixed(2)-1005;
    }

    // 实际收入
    var shiJiShouRu = jiBen + jiXiao+jiangJin - yangLao -yiLiao -shiYe - gongJiJin -shuiJin;
    document.querySelector('#sShuiJiShu').innerHTML = jiaoShuiJiShu;
    document.querySelector('#sKouShui').innerHTML = shuiJin;
    document.querySelector('#sShouRu').innerHTML = shiJiShouRu;
}

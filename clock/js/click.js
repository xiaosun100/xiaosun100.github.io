//定义变量 获取当前时间
var now = new Date();
/*
秒针部分
  跳过15秒，秒针的开始位置为45秒的位置
  还需要跳过当前的秒数

分针部分
  跳过15分钟，分针的开始位置为45分 转秒
  还需要跳过当前分针已经走过的时间 转秒
  还需要跳过当前秒针走过的时间

时针部分
  跳过分针部分
  跳过秒针部分
  跳过3个小时，时针开始的位置为9点钟
  还需要跳过已经走的时间
 */

var miaozhen = now.getHours();
if(miaozhen>12){
  miaozhen = now.getHours()-12;
}
var stepSeconds = -(15+now.getSeconds());
var stepMinutes = -15*60+stepSeconds-(now.getMinutes()*60);
var stepHours = -3*60*60 + stepMinutes + stepSeconds - (miaozhen*60*60);

/*
document.querySelector ////写法和css中的样式选择方法类似
// 实现功能为 选择一个html文档中的标签元素节点
 */
 var domSeconds = document.querySelector('.miaozhen');
 console.log(domSeconds);
 // 设置所选元素的样式
 // 在js中设置样式的时候 注意样式的属性名使用驼峰命名的方式
 // 两个单词之间用首字母大写的方式分割
 // domSeconds.style.backgroundColor = 'black';

 domSeconds.style.animationDelay = stepSeconds+'s';

var docMinutes = document.querySelector('.fen');
docMinutes.style.animationDelay = stepMinutes+'s';

var docHours = document.querySelector('.shi');
docHours.style.animationDelay = stepHours+'s';

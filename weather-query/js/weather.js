// 获取按钮
var btn = document.querySelector('#btn');
// 获取输入框
var txt = document.querySelector('#txt');

// 需要填充内容的区域
var content = document.querySelector('#listBody');

btn.onclick = function(e){
	getCityInfo(txt.value);
}
txt.onkeyup = function(e){
	if(e.keyCode == 13){
		getCityInfo(txt.value);
	}
}

/**
 * 根据输入的城市名字获取城市信息
 * @param  {[String]} cityName [输入的城市信息]
 * @return {[type]}          [description]
 */
function getCityInfo(cityName){
	$.ajax({
		url:'http://apis.baidu.com/apistore/weatherservice/cityinfo',
		data:{cityname:cityName},
		method:'get',
		headers:{apikey:'6df030858631cb00d3a2ab0da6f013e1'},
		dataType:'json',
		success:function(res){
			if(res.errNum == 0){
				var cId = res.retData.cityCode;
				var cName = res.retData.cityName;
				getWeatherInfo(cName,cId);
			}
			else{
				console.log(res);
				content.innerHTML = res.retMsg;
			}
		},
		error:function(err){
			console.log(err);
			content.innerHTML = err;
		}
	})
}

/**
 * 获取天气信息
 * @param  {[String]} cityName [城市名字]
 * @param  {[String]} cityCode [城市遍吗]
 * @return {[type]}          [description]
 */
function getWeatherInfo(cityName,cityCode){
	$.ajax({
		url:'http://apis.baidu.com/apistore/weatherservice/recentweathers',
		data:{cityname:cityName,cityid:cityCode},
		method:'get',
		headers:{apikey:'6df030858631cb00d3a2ab0da6f013e1'},
		dataType:'json',
		success:function(res){
			if(res.errNum==0){
				// 对返回的数据做处理 生成绑定的数据
				var result = [];
				result = res.retData.history;
				result.push(res.retData.today);
				result = result.concat(res.retData.forecast);
				content.innerHTML = template('tbody',{list:result});
			}
			else{
				console.log(res);
				content.innerHTML = res.retMsg;
			}
		},
		error:function(err){
			console.log(err);
			content.innerHTML = err;
		}
	})
}

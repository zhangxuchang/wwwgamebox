// JavaScript Document

/**
 * [getServerList description] 获取服务器列表
 * @param  {[type]} uid [description] 用户uid
 * @return {[type]}     [description]
 */
GSY.gamebox.getServerListData = null;
GSY.gamebox.getServerList = function(uid){
	//获取不到uid的时候不处理
	if(uid == undefined) return;
	
	var cont = $('#gb-js-serverlist-box-c');
	
	GSY.util.ajax({
		url : GSY.config.get('getServerListUrl').replace(/\{uid\}/,uid),
		data : {},
		type : 'get',
		success : function(ret){
			//最近玩过的服务器列表初始化
			GSY.gamebox.getLastServerListCode(ret.played);	

			//最近玩过的服务器列表初始化
			GSY.gamebox.getServerListData = ret.all;
			GSY.gamebox.getAllServerListCode(ret.all);	

		},
		error : function(ret){}
	});
};

/**
 * [toPlayGame description] 去玩游戏
 * @param  {[type]} element [description] 触发按钮对象
 * @return {[type]}         [description]
 */
GSY.gamebox.toPlayGame = function(element){
	
	var obj = GSY.util.getEleData(element);
	obj['gameid'] = GSY.config.get('gamecode');
	obj['language'] = GSY.config.get('lang');
	var str = GSY.gamebox.jsonTojsonStr(obj);
	GSY.util.echo(['从选择服务器列表打开游戏参数=>' + str]);
	var urlStr = element.attr('data-url');
	if(urlStr.indexOf('?') != -1) var url = urlStr + '&leftbar_collapse=yes';
	else var url = urlStr + '?leftbar_collapse=yes';
	GSY.util.echo(['从选择服务器列表打开游戏游戏地址=>' + url]);
	
	//与c++接口交互数据 ==> 打开游戏服务器
	if(typeof window.external != undefined){
		window.external.WINIE_SetGameMsg(str);
		window.external.WINIE_LoginQufu(url,str); 
	} 
};

/**
 * [createServerList description] 创建游戏列表
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
GSY.gamebox.createServerList = function(data){
	//var time = (new Date()).getTime();
	var html = '<a data-url="{url}" onclick="GSY.gamebox.toPlayGame($(this)); return false;" title="{fullname}" data-post="{serverPost}" href="javascript:void(0);"><span>{serverName}</span></a>';
	var str = '' , len = data.length;
	
	//没有记录返回结果
	var nodata = LANG[GSY.config.get("lang")]['nodata'];
	if(len == 0) return str = '<div class="nodata">'+  nodata +'</div>';
	for(var i = 0 ; i < len ; i++){
		var post = GSY.gamebox.jsonToPostStr(data[i]);
		// if(data[i].url.slice(0, 5) == 'http:') var url = data[i].url;
		// else var url = 'http:' + data[i].url;

		var reg = /^(http:\/\/|https:\/\/|\/\/)/;
		var url = data[i].url.replace(reg, 'https://');

		var tempStr = html;
		
		//显示全名缩略文字
		tempStr = tempStr.replace(/\{serverName\}/g,GSY.gamebox.strCut(data[i].fullname,16,true));
		
		//显示服务器全名
		tempStr = tempStr.replace(/\{fullname\}/g,data[i].fullname);

		//服务器路径
		tempStr = tempStr.replace(/\{url\}/g,url);

		//绑定传输参数
		tempStr = tempStr.replace(/\{serverPost\}/g,post);
		str += tempStr;
		//if(i==(len - 1)) alert((new Date()).getTime() - time);
	}

	return str;
};

/**
 * [getLastServerListCode description] 最近玩过的服务器列表初始化
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
GSY.gamebox.getLastServerListCode = function(data){
	var last = $('#gb-js-serverlist-lastServer');
	var html = GSY.gamebox.createServerList(data);
	last.html(html);
};

/**
 * [getAllServerListCode description] 游戏服务器列表初始化
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
GSY.gamebox.getAllServerListCode = function(data){
	var cont = $('#gb-js-serverlist-box-c');
	var recommand = $('#gb-js-serverlist-recommand');
	var html = GSY.gamebox.createServerList(data);
	var interGame = LANG[GSY.config.get("lang")]['Gamebox_StartUpGame'];
	cont.html(html);
	var len = data.length;
	for(var i = 0 ; i < len ; i++){
		var temp = data[i];
		if(temp.recommand == 1){
			var post = GSY.gamebox.jsonToPostStr(temp);
			// if(temp.url.slice(0, 5) == 'http:') var url = temp.url;
			// else var url = 'http:' + temp.url;

			var reg = /^(http:\/\/|https:\/\/|\/\/)/;
			var url = temp.url.replace(reg, 'https://');


			var str = '<a onclick="GSY.gamebox.toPlayGame($(this)); return false;" data-url="'+ url +'" data-post="'+ post +'" href="javascript:void(0);"><span>'+ temp.fullname +'</span><em>'+ interGame +'</em></a>';
			recommand.html(str);
			break;	
		}
	}
};


/**
 * [fullScroll description] 设置滚动条显示
 * @return {[type]} [description]
 */
GSY.gamebox.fullScroll = function(){
	var main = $('#gb-js-serverlist-box');
	var win = GSY.util.getEleInfo($(window));
	main.css('height',win.h);
};
GSY.gamebox.fullScroll();
GSY.config.resizeCode['oasServerFullScroll'] = GSY.gamebox.fullScroll;

/**
 * [search description] 搜索服务器
 * @param  {[type]} input [description] 搜索框
 * @return {[type]}       [description]
 */
GSY.gamebox.search = function(input){
	//GSY.util.echo(GSY.gamebox.getServerListData);
	
	//当数据不存在不处理
	if(!GSY.gamebox.getServerListData) return;

	//查找出匹配关键字的服务器列表
	var tempArr = [];
	var time = (new Date()).getTime();
	var keyword = input.val().toLowerCase();
	var data = GSY.gamebox.getServerListData;
	for(var key in data){
		var str = data[key].fullname.toLowerCase();
		if(str.indexOf(keyword) != -1) tempArr.push(data[key]);
	}

	//创建服务器列表dom对象
	var cont = $('#gb-js-serverlist-box-c');
	var html = GSY.gamebox.createServerList(tempArr);
	cont.html(html);
};

/**
 * [description] 绑定搜索事件
 * @return {[type]} [description]
 */
;(function(){
	var input = $('#gb-serverlist-search-input');

	//绑定回车事件
	var inputTimer = null;
	input.keyup(function(e) {
		var _this = $(this);
		if(inputTimer) {
			clearTimeout(inputTimer);
			inputTimer = null;
		}

		inputTimer = setTimeout(function(){
			GSY.gamebox.search(_this);	
		},500);
	});
})();

//设置背景
;(function(){
	var main = $('#gb-js-serverlist-box');
	var activeGame = GSY.config.get('activeGame');
	var url = GSY.config.get('staticHost') + activeGame.listimage;
	main.css('background','url("'+ url +'") no-repeat top right');
	//GSY.log(url);
})();


/**
 * [playGame description] 初始化游戏列表
 * @return {[type]} [description]
 */
$(function(){
	GSY.util.ajax({
		url : GSY.config.get('getUidUrl'),
		data : { token : GSY.config.get('token') , game_code : GSY.config.get('gamecode')},
		type : 'get',
		success : function(ret){
			if(ret.status == 'ok') GSY.gamebox.getServerList(ret.uid);
			GSY.util.echo(ret);	
		},
		error : function(ret){}
	});
});

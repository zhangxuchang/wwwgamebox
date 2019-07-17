// JavaScript Document

/**
 * [getServerList description] 获取服务器列表
 * @param  {[type]} uid [description] 用户uid
 * @return {[type]}     [description]
 */
GSY.gamebox.getServerListData = null;
GSY.gamebox.getGameBaseData = null;
GSY.gamebox.getServerList = function(uid,data){

	//获取不到uid的时候不处理
	if(uid == undefined) return;
	var cont = $('#gb-js-serverlist-box-c');

	GSY.gamebox.getGameBaseData = data;

	var url = data.url.replace(/\{uid\}/,uid);
	url = url.replace(/&amp;/g,'&');

	GSY.util.ajax({
		url : url,
		data : {},
		type : 'get',
		success : function(ret){
			//最近玩过的服务器列表初始化
			GSY.gamebox.getLastServerListCode(ret.played);	

			//所有服务器列表初始化
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

	//存储游戏历史记录
	var saveObj = $.extend({},obj);

	saveObj['gameid'] = GSY.config.get('gamecode');
	saveObj['language'] = GSY.config.get('lang');
	saveObj['ico'] = GSY.gamebox.getGameBaseData.ico;
	saveObj['name'] = GSY.gamebox.getGameBaseData.name;
	GSY.gamebox.cAjax('WINIE_SetGameMsg',saveObj,'从选择服务器页面打开游戏存储信息');

	//打开游戏服务器
	var openGame = $.extend({},saveObj);
	openGame['gametype'] = 'login';	
	var urlStr = element.attr('data-url');
	if(urlStr.indexOf('?') != -1) var url = urlStr + '&leftbar_collapse=yes';
	else var url = urlStr + '?leftbar_collapse=yes';
	//增加可扩展参数
	url += GSY.gamebox.getOtherParam(GSY.config.get('gamecode'));
	//苍穹变游戏处理
	if(openGame.gameid == 'letr') {
		openGame['gametype'] = 'u3d';
	}

	if(typeof window.external != undefined){
		var str = GSY.gamebox.jsonTojsonStr(openGame);
		window.external.WINIE_LoginQufu(url,str); 
	}

};

/**
 * [createServerList description] 创建游戏列表
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
GSY.gamebox.createServerList = function(data){
	//GSY.util.echo(data);
	//var time = (new Date()).getTime();
	
	var html = '<a onclick="GSY.gamebox.toPlayGame($(this)); return false;" data-url="{url}" title="{fullname}" data-post="{serverPost}" href="javascript:void(0);"><span>{serverName}</span></a>';
	var str = '' , len = data.length;
	
	//没有记录返回结果
	var nodata = OASGetLangVal('nodata');
	if(len == 0) return str = '<div class="nodata">'+  nodata +'</div>';
	
	//有记录游戏信息
	for(var i = 0 ; i < len ; i++){
		var post = GSY.gamebox.jsonToPostStr(data[i]);

		// if(data[i].url.slice(0, 5) == 'http:') var url = data[i].url;
		// else var url = 'http:' + data[i].url;
		var reg = /^(http:\/\/|https:\/\/|\/\/)/;
		var url = data[i].url.replace(reg, 'https://');

		var name = data[i].fullname ? data[i].fullname : data[i].server_name;
		var tempStr = html;
		//显示全名缩略文字
		tempStr = tempStr.replace(/\{serverName\}/g,GSY.gamebox.strCut(name,16,true));
		
		//显示服务器全名
		tempStr = tempStr.replace(/\{fullname\}/g,name);

		//服务器路径
		tempStr = tempStr.replace(/\{url\}/g,url);

		//绑定传输参数
		tempStr = tempStr.replace(/\{serverPost\}/g,post);
		str += tempStr;
	}
	return str;
};

/**
 * [getLastServerListCode description] 最近玩过的服务器列表初始化
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
GSY.gamebox.getLastServerListCode = function(data){
	if(!data) data = [];
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
	var interGame = OASGetLangVal('Gamebox_StartUpGame');
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

			var name = temp.fullname ? temp.fullname : temp.server_name;
			var str = '<a onclick="GSY.gamebox.toPlayGame($(this)); return false;" data-url="'+ url +'" data-post="'+ post +'" href="javascript:void(0);"><span>'+ name +'</span><em>'+ interGame +'</em></a>';
			recommand.html(str);
			break;	
		}
	}
};




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
		var name = data[key].fullname ? data[key].fullname : data[key].server_name;
		var str = name.toLowerCase();
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

	//绑定搜索事件
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



/**
 * [setBodyBg description] 设置页面背景
 * @param {[type]} bg [description] 背景图片地址
 */
GSY.gamebox.setBodyBg = function(bg){
	var main = $('#gb-js-serverlist-box');

	//背景图片为空不处理
	if(typeof bg != 'undefined'){
		main.css('background','url("'+ bg +'") no-repeat top right');	
	}
}


/**
 * [playGame description] 初始化游戏列表
 * @return {[type]} [description]
 */
$(function(){
	//获取游戏信息
	GSY.gamebox.getLocalGameData({key:'OAS_GAME_INFRO_' + GSY.config.get('gamecode')},function(ret){
		var data = GSY.gamebox.eval(ret);
		
		//设置背景图片
		if(data.serverbgpic){
			GSY.gamebox.setBodyBg(data.serverbgpic);	
		}

		//获取用户uid
		GSY.gamebox.getUserId(GSY.util.getUrlParam('token'),GSY.config.get('gamecode'),function(uid){
			//获取服务器列表
			GSY.gamebox.getServerList(uid,data);	
		});	
	});
});

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

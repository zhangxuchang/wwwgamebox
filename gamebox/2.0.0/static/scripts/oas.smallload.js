// JavaScript Document

/**
 * [playGame description] 打开游戏窗口
 * @return {[type]} [description]
 */
GSY.gamebox.playGame = function(element){
	//设置回调方法
	var handle = function(ret){
		var data = GSY.util.getEleData(element);
		//当是主号时，打开新服
		//1.1.1已更改主号无法打开同一个游戏多个标签，此处值一直是false
		if (GSY.gamebox.activeGames.ismain === 'true') {
			GSY.gamebox.cAjaxCallback('WINIE_GetXiaoUrl', {callback: GSY.gamebox.getXiaoUrl}, '获取当前用户主号玩游戏tab签');
		} else {
			//当小号玩过当前游戏的时候，跳转到最近玩过的服务器
			if (ret.played && ret.played.length > 0) {
				var data = ret.played[0];
				data['gameid'] = GSY.config.get('gamecode');
				data['language'] = GSY.config.get('lang');
				data['name'] = GSY.gamebox.activeGames.name;
				data['ico'] = GSY.gamebox.activeGames.ico;
				//判断链接地址中有参数
				if (ret.played[0].url.indexOf('?') != -1) url = ret.played[0].url + '&leftbar_collapse=yes';
				//判断链接地址中无参数
				else url = ret.played[0].url + '?leftbar_collapse=yes';
				//增加可扩展参数
				url += GSY.gamebox.getOtherParam(GSY.config.get('gamecode'));
				//GSY.gamebox.cAjax('WINIE_SetGameMsg', data, '当用户玩过当前游戏的时候，跳转到最近玩过的服务器。');
				
				GSY.gamebox.cAjaxCallback('WINIE_SetGameMsg', data, '当用户玩过当前游戏的时候，跳转到最近玩过的服务器。');
				window.location.href = url;

				//当没有玩过当前游戏的时候，跳转到主号当前tab服务器
			} else {
				GSY.gamebox.cAjaxCallback('WINIE_GetXiaoUrl', {callback: GSY.gamebox.getXiaoUrl}, '获取当前用户主号玩游戏tab签');
			}
		}
	};
	GSY.gamebox.getServerUrl(element,handle);
};

/**
 * [getXiaoUrl description] 当小号没有历史记录的时候，获取上一个tab签的游戏信息
 * @param  {[type]} urlStr [description]
 * @return {[type]}        [description]
 */
GSY.gamebox.getXiaoUrl = function(json){
	//判断链接地址中有参数
	GSY.util.echo(['当小号没有历史记录=>' + json.data]);
	urlStr = json.data;
	if(urlStr.indexOf('?') != -1) 
		url = urlStr + '&leftbar_collapse=yes';	
	else 
		var url = urlStr + '?leftbar_collapse=yes';
	//增加可扩展参数
	url += GSY.gamebox.getOtherParam(GSY.config.get('gamecode'));
	window.location.href = url;
};

/**
 * [getServerUrl description] 获取游戏服务器列表
 * @return {[type]} [description]
 */
GSY.gamebox.getServerUrl = function(element,handle){
	var data = GSY.gamebox.activeGames;
	GSY.util.echo(data);
	GSY.util.ajax({
		url : GSY.config.get('getUidUrl'),
		data : { token : GSY.util.getUrlParam('token'),game_code:data.gamecode},
		type : 'get',
		success : function(ret){
			GSY.util.echo(ret);
			if(ret.status == 'ok') {
				var strUrl = data.url.replace(/\{uid\}/,ret.uid);
				strUrl = strUrl.replace(/&amp;/g,'&');
				GSY.util.ajax({
					url : strUrl,
					data : {},
					type : 'get',
					success : function(ret){

						handle(ret);
					},
					error : function(ret){
						GSY.gamebox.message(OASGetLangVal('Gamebox_login_fail'));
					}
				});	
			}	
			else{
				GSY.gamebox.message(OASGetLangVal('Gamebox_login_fail'));
			}		
		},
		error : function(ret){
			GSY.gamebox.message(OASGetLangVal('Gamebox_login_fail'));
		}
	});
};

/*
 * [setBodyBg description] 设置页面背景
 * @param {[type]} bg [description] 背景图片地址
 */
GSY.gamebox.setBodyBg = function(bg){

	//背景图片为空不处理
	if(typeof bg != 'undefined'){
		$('body').css('background','#333 url('+ bg +') no-repeat top center');	
	}
}

/**
 * [description] 初始化服务器信息
 * @return {[type]} [description]
 */
$(function(){
	//获取游戏信息
	GSY.gamebox.activeGames = null;
	GSY.gamebox.getLocalGameData({key:'OAS_GAME_INFRO_' + GSY.config.get('gamecode')},function(ret){
		var data = {};
		if(ret.data){
			data = GSY.gamebox.eval(ret.data);
		}	
		GSY.gamebox.activeGames = data;

		//设置背景图片
		if(data.accountbgpic){
			GSY.gamebox.setBodyBg(data.accountbgpic);	
		}

		//当用户没有登录的时候处理方式
		if(!GSY.util.getUrlParam('token')) return;
		GSY.gamebox.activeGames.ismain = GSY.util.getUrlParam('ismain');

		var str = OASGetLangVal('load_tips');
		var new_str = str.slice(0,str.length - 3);
		var loads = $('#gb-smallload-load').html(str);
		var left = loads.outerWidth()/2;
		loads.css({'margin-left':-left,visibility:'visible',width : loads.width() + 5}).html(new_str);
		var i = 0;
		var dian = '';
		setInterval(function(){
			loads.html(new_str + dian);
			if(i == 3){
				i = 0;
				dian = '';	
			}else{
				i++;
				dian += '.';	
			}
		},500);

		//登陆游戏成功之后打开游戏操作
		var post = 'name=' + data.name + '&gamecode=' + GSY.config.get('gamecode');
		var html = $('<div id="oas-mainGoPlay" data-post="'+ post +'"></div>');
		$('body').append(html);
		GSY.gamebox.playGame(html);
	});
});





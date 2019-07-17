// JavaScript Document

/**
 * [playGame description] 打开游戏窗口
 * @return {[type]} [description]
 */
GSY.gamebox.gameRetData = null;  //当前游戏信息
GSY.gamebox.playGame = function(element){
	//设置回调方法
	var handle = function(ret){
		var data = GSY.util.getEleData(element);
		
		//当用户玩过当前游戏的时候，跳转到最近玩过的服务器
		if(ret.played && ret.played.length > 0){
			var data = ret.played[0];
			data['gameid'] = GSY.config.get('gamecode');
			data['language'] = GSY.config.get('lang');
			data['name'] = GSY.gamebox.gameRetData.name;
			data['ico'] = GSY.gamebox.gameRetData.ico;

			//var param = $.extend({},)

			//判断链接地址中有参数
			if(ret.played[0].url.indexOf('?') != -1) url = ret.played[0].url + '&leftbar_collapse=yes';
			//判断链接地址中无参数
			else url = ret.played[0].url + '?leftbar_collapse=yes';
			//增加可扩展参数
			url += GSY.gamebox.getOtherParam(GSY.config.get('gamecode'));
			//JS与C++交互
			GSY.gamebox.cAjax('WINIE_SetGameMsg',data,'当用户玩过当前游戏的时候，跳转到最近玩过的服务器。');
			window.location.href = url;
			return;	
		}

		

		//当用户没有玩过当前游戏的时候，跳转到最后一个推荐服务器
		var recommandArr = [];
		var len = ret.all.length;
		for(var i = 0 ; i < len ; i++){
			if(ret.all[i].recommand == 1)  recommandArr.push(ret.all[i]);	
		};
		var item = recommandArr[recommandArr.length-1];
		item['gameid'] = GSY.config.get('gamecode');
		item['language'] = GSY.config.get('lang');
		item['name'] = GSY.gamebox.gameRetData.name;
		item['ico'] = GSY.gamebox.gameRetData.ico;

		//判断链接地址中有参数
		if(item.url.indexOf('?') != -1) url = item.url + '&leftbar_collapse=yes';
		//判断链接地址中无参数
		else url = item.url + '?leftbar_collapse=yes';
		//增加可扩展参数		
		url += GSY.gamebox.getOtherParam(GSY.config.get('gamecode'));
		//JS与C++交互
		GSY.gamebox.cAjax('WINIE_SetGameMsg',item,'当用户没有玩过当前游戏的时候，跳转到最后一个推荐服务器。');

		window.location.href = url;
		
	};
	GSY.gamebox.getServerUrl(element,handle);
};


/**
 * [getServerUrl description] 获取游戏服务器列表
 * @return {[type]} [description]
 */
GSY.gamebox.getServerUrl = function(element,handle){
	var obj = GSY.util.getEleData(element);
	//获取游戏相关信息
	GSY.gamebox.getLocalGameData({key:'OAS_GAME_INFRO_' + obj.gamecode},function(ret){	
		var retData = GSY.gamebox.eval(ret);
		GSY.gamebox.gameRetData = retData;
		var url = retData.url.replace(/&amp;/g,'&');
		GSY.util.ajax({
			url : GSY.config.get('getUidUrl'),
			data : { token : GSY.util.getUrlParam('token'),game_code:obj.gamecode},
			type : 'get',
			success : function(ret){
				if(ret.status == 'ok') {
					GSY.util.ajax({
						url : url.replace(/\{uid\}/,ret.uid),
						data : {},
						type : 'get',
						success : function(ret){
							handle(ret);
						},
						error : function(ret){
							GSY.gamebox.message(OASGetLangVal('Gamebox_login_fail'));
							GSY.gamebox.uploadLog('GetErrorTime',{'gameid':obj.gamecode,'errInfo':OASGetLangVal('Gamebox_login_fail')});	
							window.location.href = window.location.href;
						}
					});	
				}	
				else{
					GSY.gamebox.message(OASGetLangVal('Gamebox_login_fail'));
					GSY.gamebox.uploadLog('GetErrorTime',{'gameid':obj.gamecode,'errInfo':OASGetLangVal('Gamebox_login_fail')});	
					window.location.href = window.location.href;
				}		
			},
			error : function(ret){
				GSY.gamebox.message(OASGetLangVal('Gamebox_login_fail'));
				GSY.gamebox.uploadLog('GetErrorTime',{'gameid':obj.gamecode,'errInfo':OASGetLangVal('Gamebox_login_fail')});	
				window.location.href = window.location.href;
			}
		});
	});
};

/**
 * [description] 初始化服务器信息
 * @return {[type]} [description]
 */
$(function(){
	var name = GSY.util.getUrlParam('gamename');
	var gamecode = GSY.util.getUrlParam('gameid');
	var post = 'name=' + name + '&gamecode=' + gamecode;
	var html = $('<div id="oas-mainGoPlay" data-post="'+ post +'"></div>');
	$('body').append(html);
	GSY.gamebox.playGame(html);
});









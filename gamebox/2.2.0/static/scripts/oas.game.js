// JavaScript Document

/**
 * [playGame description] 打开游戏窗口
 * @return {[type]} [description]
 */
GSY.gamebox.gameRetData = null;  //当前游戏信息
GSY.gamebox.playGame = function(gameData){
	//设置回调方法
	var handle = function(ret){
		var data = gameData;
		//当用户玩过当前游戏的时候，跳转到最近玩过的服务器
		if(ret.played && ret.played.length > 0){
			var data = ret.played[0];
			data['gameid'] = GSY.config.get('gamecode');
			data['language'] = GSY.config.get('lang');
			data['name'] = GSY.gamebox.gameRetData.name;
			data['ico'] = GSY.gamebox.gameRetData.ico;

			url = ret.played[0].url.indexOf('?') != -1 ? ret.played[0].url + '&leftbar_collapse=yes' : ret.played[0].url + '?leftbar_collapse=yes';
			//增加可扩展参数
			url += GSY.gamebox.getOtherParam(GSY.config.get('gamecode'));
			
			//JS与C++交互务器。
			GSY.gamebox.cAjaxCallback('WINIE_SetGameMsg',data,'当用户玩过当前游戏的时候，跳转到最近玩过的服务器。');

			//获取值
			/*GSY.gamebox.getLocalGameData({ key : 'OAS_GAME_FLAG_3' },function(ret){

				var a = GSY.gamebox.eval(ret);
				if($.isEmptyObject(a) || !a.flag){
					GSY.gamebox.message('1');
					var flag = true;		
				}else{
					GSY.gamebox.message('2');
					var flag = false; 
					window.location.href = url;		
				}

				GSY.gamebox.setLocalGameData({
					key : 'OAS_GAME_FLAG_3',
					type : true,
					value : {flag:flag}
				});	
			});	*/	
			window.location.href = url;	
			return;	
		}

		//当用户没有玩过当前游戏的时候，跳转到最后一个推荐服务器
		var recommandArr = [];
		var retdata = ret.all ? ret.all : ret;
		var len = retdata.length;
		for(var i = 0 ; i < len ; i++){
			if(retdata[i].recommand == 1)  recommandArr.push(retdata[i]);	
		};
		//当没有推荐服务器的时候处理方法
		if(recommandArr.length == 0){
			GSY.gamebox.message('没有设置推荐服务器！');
			return;		
		};

		var item = recommandArr[recommandArr.length-1];
		item['gameid'] = GSY.config.get('gamecode');
		item['language'] = GSY.config.get('lang');
		item['name'] = GSY.gamebox.gameRetData.name;
		item['ico'] = GSY.gamebox.gameRetData.ico;


		url = item.url.indexOf('?') != -1 ? item.url + '&leftbar_collapse=yes' : item.url + '?leftbar_collapse=yes';

		//增加可扩展参数		
		url += GSY.gamebox.getOtherParam(GSY.config.get('gamecode'));
		//JS与C++交互务器。
		GSY.gamebox.cAjaxCallback('WINIE_SetGameMsg',item,'当用户没有玩过当前游戏的时候，跳转到最后一个推荐服务器。');
		window.location.href = url;	
		
		//获取值
		/*GSY.gamebox.getLocalGameData({ key : 'OAS_GAME_FLAG_3' },function(ret){

			var a = GSY.gamebox.eval(ret);
			if($.isEmptyObject(a) || !a.flag){
				GSY.gamebox.message('1');
				var flag = true;		
			}else{
				GSY.gamebox.message('2');
				var flag = false; 
				window.location.href = url;		
			}

			GSY.gamebox.setLocalGameData({
				key : 'OAS_GAME_FLAG_3',
				type : true,
				value : {flag:flag}
			});	
		});	*/
		
	};
	GSY.gamebox.getServerUrl(gameData,handle);
};


/**
 * [getServerUrl description] 获取游戏服务器列表
 * @return {[type]} [description]
 */
GSY.gamebox.getServerUrl = function(gameData,handle){
	var obj = gameData;
	//获取游戏相关信息
	GSY.gamebox.getLocalGameData({key:'OAS_GAME_INFRO_' + obj.gamecode},function(ret){	
		var retData = {};
		if(ret.data){
			retData = GSY.gamebox.eval(ret.data);
		}
		GSY.gamebox.gameRetData = retData;
		var url = retData.url.replace(/&amp;/g,'&');
		GSY.util.ajax({
			url : GSY.config.get('getUidUrl'),
			data : { token : GSY.util.getUrlParam('token'),game_code:obj.gamecode},
			type : 'get',
			success : function(ret){
				if(ret.status == 'ok') {
					

					//设置uid配置
					if(url.indexOf('{uid}') == -1) { 
						url += '&uid={uid}';
					}


					GSY.util.ajax({
						url : url.replace(/\{uid\}/,ret.uid),
						data : {},
						type : 'get',
						success : function(ret){
							handle(ret);
						},
						error : function(ret){
							//GSY.gamebox.message(OASGetLangVal('Gamebox_login_fail'));
							GSY.gamebox.uploadLog('GetErrorTime',{'gameid':obj.gamecode,'errInfo':OASGetLangVal('Gamebox_login_fail')});	
							window.location.href = window.location.href;
						}
					});	
				}	
				else{
					//GSY.gamebox.message(OASGetLangVal('Gamebox_login_fail'));
					GSY.gamebox.uploadLog('GetErrorTime',{'gameid':obj.gamecode,'errInfo':OASGetLangVal('Gamebox_login_fail')});	
					window.location.href = window.location.href;
				}		
			},
			error : function(ret){
				//GSY.gamebox.message(OASGetLangVal('Gamebox_login_fail'));
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
	GSY.gamebox.playGame({name : GSY.util.getUrlParam('gamename'),gamecode : GSY.util.getUrlParam('gameid')});
});









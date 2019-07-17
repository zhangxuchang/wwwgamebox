// JavaScript Document

/**
 * [playGame description] 打开游戏窗口
 * @return {[type]} [description]
 */

GSY.gamebox.playGame = function(element){
	//设置回调方法
	var handle = function(ret){
		var data = GSY.util.getEleData(element);


		//是"苍穹变"游戏单独处理
		if(GSY.config.get('gamecode') == 'letr') {
			GSY.cookie.set('oas_user',GSY.config.get('token'),{domain:'oasgames.com'});
		}


		//当用户玩过当前游戏的时候，跳转到最近玩过的服务器
		if(ret.played.length > 0){
			var data = ret.played[0];
			data['gameid'] = GSY.config.get('gamecode');
			data['language'] = GSY.config.get('lang');
			var str = GSY.gamebox.jsonTojsonStr(ret.played[0]);
			
			//与c++接口交互数据 ==> 打开游戏方法,不能是"苍穹变"游戏
			if(GSY.config.get('gamecode') != 'letr') if(typeof window.external != undefined) window.external.WINIE_SetGameMsg(str);

			//判断链接地址中有参数
			if(ret.played[0].url.indexOf('?') != -1) url = ret.played[0].url + '&leftbar_collapse=yes';
			//判断链接地址中无参数
			else url = ret.played[0].url + '?leftbar_collapse=yes';
			//开启游戏
			GSY.util.echo(['played=>' + str]);
			GSY.util.echo(['playedServerLink=>' + url]);


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
		var str = GSY.gamebox.jsonTojsonStr(item);
		
		//与c++接口交互数据 ==> 打开游戏方法,不能是苍穹变游戏
		if(GSY.config.get('gamecode') != 'letr' ) if(typeof window.external != undefined) window.external.WINIE_SetGameMsg(str);

		//判断链接地址中有参数
		if(item.url.indexOf('?') != -1) url = item.url + '&leftbar_collapse=yes';
		//判断链接地址中无参数
		else url = item.url + '?leftbar_collapse=yes';
		//开启游戏
		GSY.util.echo(['recommand=>' + str]);
		GSY.util.echo(['recommandServerLink=>' + url]);

		window.location.href = item.url;
		
	};
	GSY.gamebox.getServerUrl(element,handle);
};

/**
 * [getServerUrl description] 获取游戏服务器列表
 * @return {[type]} [description]
 */
GSY.gamebox.getServerUrl = function(element,handle){
	var data = GSY.util.getEleData(element);
	var url = GSY.config.get('gameList')[data.gamecode].getServerlist;
	GSY.util.ajax({
		url : GSY.config.get('getUidUrl'),
		data : { token : GSY.config.get('token')},
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
						GSY.gamebox.message(LANG[GSY.config.get('lang')]['Gamebox_login_fail']);
					}
				});	
			}	
			else{
				GSY.gamebox.message(LANG[GSY.config.get('lang')]['Gamebox_login_fail']);
			}		
		},
		error : function(ret){
			GSY.gamebox.message(LANG[GSY.config.get('lang')]['Gamebox_login_fail']);
		}
	});
};

/**
 * [description] 初始化服务器信息
 * @return {[type]} [description]
 */
$(function(){
	var data = GSY.config.get('activeGame');
	var post = 'name=' + data.name + '&gamecode=' + GSY.config.get('gamecode');
	var html = $('<div id="oas-mainGoPlay" data-post="'+ post +'"></div>');
	$('body').append(html);
	GSY.gamebox.playGame(html);
});









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


		//当小号玩过当前游戏的时候，跳转到最近玩过的服务器
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
			GSY.util.echo(['小号玩过当前游戏的时候存储信息=>' + str]);
			GSY.util.echo(['小号玩过当前游戏的时候游戏地址=>' + url]);

			window.location.href = url;
		}else{
			if(typeof window.external != undefined){
				GSY.util.echo(['WINIE_GetXiaoUrl初始化了']);
				window.external.WINIE_GetXiaoUrl('{"callback":"GSY.gamebox.getXiaoUrl"}');
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
GSY.gamebox.getXiaoUrl = function(urlStr){
	//判断链接地址中有参数
	GSY.util.echo(['当小号没有历史记录=>' + urlStr]);
	if(urlStr.indexOf('?') != -1) url = urlStr + '&leftbar_collapse=yes';	
	else var url = urlStr + '?leftbar_collapse=yes';
	window.location.href = url;
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
	
	//设置背景图
	var bg = GSY.config.get('staticHost') + data.smallload;
	$('body').css('background','#333 url('+ bg +') no-repeat top center');
	
	//当用户没有登录的时候处理方式
	if(!GSY.util.getUrlParam('token')) return;
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

	var post = 'name=' + data.name + '&gamecode=' + GSY.config.get('gamecode');
	var html = $('<div id="oas-mainGoPlay" data-post="'+ post +'"></div>');
	$('body').append(html);
	GSY.gamebox.playGame(html);
})



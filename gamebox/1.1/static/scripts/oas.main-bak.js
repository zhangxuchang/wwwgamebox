// JavaScript Document


/**
 * [mainDataAds description] 推荐游戏位置游戏数据设置
 * @type {Object}
 */
GSY.gamebox.mainDataAds = {
	cn : ['letr','fbtr'],
	tr : ['letr','fbtr'],
	enus : ['letr','fbtr'] 
};

/**
 * [playGame description] 打开游戏窗口
 * @return {[type]} [description]
 */
GSY.gamebox.playGame = function(element,index){
	var _data = GSY.util.getEleData(element);
	var ver = '&oas_ver=' + GSY.config.get('version');
	var url = GSY.config.get('path').replace(/\{pagename\}/,'game') + '?token=' + GSY.config.get('token') + '&lg=' + GSY.config.get('lang') + '&gameid=' + _data.gamecode + ver;
	
	//U3D游戏
	if(_data.gamecode == 'letr'){
		
		//JS与C++交互操作
		GSY.gamebox.cAjax('WINIE_MainUserOpenGameUrl',url + '&closeecho=1','U3D游戏外跳转');
		//上报日志文件
		GSY.gamebox.uploadLog('Advertisement',{game_code:_data.gamecode});	
		return;
	}

	var data = {
		service_area : _data.name,
		url : url,
		gameid : _data.gamecode,
		language : GSY.config.get('lang'),
		type : 'game'
	}

	//JS与C++交互操作
	GSY.gamebox.cAjax('WINIE_MainUserOpenGame',data,'开启游戏load页面');
	
	//上报日志文件
	if(index != undefined){
		if(index == 1) GSY.gamebox.uploadLog('Advertisement',{game_code:_data.gamecode});	
		else if(index == 2) GSY.gamebox.uploadLog('GameOpenTime',{game_code:_data.gamecode});
	}  		
}



/** 
 * [fristPlayGame description] 第一次打开游戏处理方法
 * @return {[type]} [description]
 */
GSY.gamebox.fristPlayGame = function(){
	GSY.gamebox.playGame($('#oas-mainGoPlay'));
};

/**
 * [getGameHistory description] 获取用户游戏历史记录
 * @param  {[type]} ret [description]
 * @return {[type]}     [description]
 */
GSY.gamebox.getGameHistory = function(ret){
	if(ret) ret = GSY.gamebox.eval(ret);
	var cont = $('#gb-gamebox-history-content');

	//没有历史记录
	if(ret.length == 0) {
		var lang = GSY.config.get('lang');
		var str = LANG[lang]['nodata'];
		cont.html('<div class="nodata">'+ str +'</div>');
		return false;
	}

	//有历史记录
	var len = ret.length, str = '';
	for(var i = 0 ; i < len ; i++){
		var data = ret[i];
		//GSY.util.echo(data);
		var ver = '?oas_ver=' + GSY.config.get('version');
		var temp = GSY.gamebox.tpl('gameHistory');
		var gamelist = LANG[data.language]['Gamebox_gamelist'][data.gameid];
		var url = GSY.config.get('staticHost') + gamelist.iconImage + ver;
		var post = GSY.gamebox.jsonToPostStr(data);
		//GSY.util.echo(['post=>' + post]);
		temp = temp.replace(/\{post\}/,post);
		temp = temp.replace(/\{gameName\}/g,gamelist.name);
		temp = temp.replace(/\{fullname\}/g,data.fullname);
		temp = temp.replace(/\{url\}/,url);
		str += temp;
	};
	cont.html(str);
};


/**
 * [getGameHistoryPlayGame description] 从游戏历史打开游戏
 * @return {[type]} [description]
 */
GSY.gamebox.getGameHistoryPlayGame = function(element){

	//打开游戏页面需要的参数
	var data = GSY.util.getEleData(element);

	//设置用户登录游戏历史记录
	var _data = $.extend({},data);
	_data['service_area'] = GSY.config.get('gameList')[data.gameid]['name'];
	if(_data['url'].indexOf('?') != -1) var url = _data['url'] + '&leftbar_collapse=yes';
	else var url = _data['url'] + '?leftbar_collapse=yes';
	_data['url'] = url;

	GSY.gamebox.cAjax('WINIE_SetGameMsg',data,'设置游戏历史打开游戏存储记录');
	GSY.gamebox.cAjax('WINIE_MainUserOpenGame',_data,'从游戏历史打开游戏');
	GSY.gamebox.uploadLog('RecentlyGame',{game_code:data.gameid});
};


/**
 * [description] 初始化大图推荐位置
 * @return {[type]} [description]
 */
;(function(){
	var cont = $('#gb-game-recommend-pic');
	var html = '<div class="gb-game-recommend-list" onclick="GSY.gamebox.playGame($(this),1);return false;" data-post="{post}">';
		html+= '	<div class="gb-game-recommend-list-img"><img src="{url}" alt="{name}"></div>';
		html+= '	<div class="gb-game-recommend-list-text">';
		html+= '		<div class="gb-game-recommend-list-desc">{gamedesc}</div>';
		html+= '		<div class="gb-game-recommend-list-btn"><a href="javascript:void(0)" class="gb-btn-green"><span><em>{playGame}</em></span></a></div>';
		html+= '	</div>';
		html+= '</div>';
	var arr =  GSY.gamebox.mainDataAds[GSY.config.get('lang')];
	var len = arr.length;
	var gameData = GSY.config.get('gameList');
	var str = '';
	for(var i = 0 ; i < len ; i++){
		var data = gameData[arr[i]];
		var tempStr = html;
		var ver = '?oas_ver=' + GSY.config.get('version');
		var post = 'name=' + data.name + '&gamecode=' + arr[i];
		var url = GSY.config.get('staticHost') + data.adsImage + ver;
		var action = data.getServerlist;
		tempStr = tempStr.replace(/\{name\}/g,data.name);
		tempStr = tempStr.replace(/\{url\}/,url);
		tempStr = tempStr.replace(/\{gamedesc\}/,data.des);
		tempStr = tempStr.replace(/\{post\}/,post);
		tempStr = tempStr.replace(/\{playGame\}/,LANG[GSY.config.get('lang')]['Gamebox_PlayGame']);
		str += tempStr;
	}
	cont.html(str);

	//窗帘式显示
	GSY.other.windowMask({
		parent : cont.children(),
		hide : '.gb-game-recommend-list-text'
	});
})();

/**
 * [description] 初始化推荐游戏列表
 * @return {[type]} [description]
 */
;(function(){
	var cont = $('#gb-gamelist-content');
	var arr =  GSY.gamebox.mainDataAds[GSY.config.get('lang')],len = arr.length;
	var gameData = GSY.config.get('gameList');

	//获取游戏列表
	var tempObj = {};
	for(var keys in gameData){
		var data = gameData[keys];
		var flag = false;
		for(var i = 0 ; i < len ; i++){
			if(arr[i] == keys) {
				flag = true;
				break;
			}
		}
		if(!flag) tempObj[keys] = data;
	}

	//创建游戏列表字符串
	var str = "";
	for(var key in tempObj){
		if(tempObj[key] != 'nodata'){
			var temp = GSY.gamebox.tpl('gameslist');
			var ver = '?oas_ver=' + GSY.config.get('version');
			var data = tempObj[key]
			var url = GSY.config.get('staticHost') + data.gameImage + ver;
			var post = 'name=' + data.name + '&gamecode=' + key;

			//图片地址
			temp = temp.replace(/\{gameNameImageUrl\}/,url);
			
			//游戏名称
			temp = temp.replace(/\{gameName\}/g,data.name);

			//游戏类型
			temp = temp.replace(/\{gameType\}/,data.type);

			//请求参数
			temp = temp.replace(/\{post\}/,post);
			
			//开始游戏
			temp = temp.replace(/\{playGame\}/,LANG[GSY.config.get('lang')]['Gamebox_PlayGame']);

			//游戏描述
			temp = temp.replace(/\{gameDesc\}/,data.des);

			//游戏描述
			temp = temp.replace(/\{gameFullDesc\}/,data.des);

			
			str += temp;
		}
	}
	cont.html(str);

	//窗帘式显示
	GSY.other.windowMask({
		parent : cont.children(),
		hide : '.gb-games-lists-cont-mask'
	});


})();



/**
 * [description] 生成活动页面
 * @return {[type]} [description]
 */
;(function(){
	var cont = $('#gb-js-gameActive-box');
	var item = LANG[GSY.config.get('lang')]['Gamebox_Active'];
	var html = '<a target="_blank" href="{url}"><img alt="{name}" src="{imageURL}"></a>';
	var str = '';
	for(var key in item){
		var temp = html;
		var ver = '?oas_ver=' + GSY.config.get('version');
		var name = GSY.config.get('gameList')[key].name;
		var imageURL = GSY.config.get('staticHost') + item[key].imgurl + ver;
		temp = temp.replace(/\{url\}/,item[key].url);
		temp = temp.replace(/\{name\}/,name);
		temp = temp.replace(/\{imageURL\}/,imageURL);
		str += temp;
	};
	cont.html(str);

	//绑定热门活动上报日志事件
	cont.children().click(function(){
		var parma = {index:($(this).index() + 1)};
		GSY.gamebox.uploadLog('PopularEvents',parma);		
	});
	
})();

/**
 * [description] 初始化热门游戏列表
 * @return {[type]} [description]
 */
;(function(){
	var content = $('#gb-left-recommengame-content');
	var uid = GSY.util.getUrlParam('uid')
	var listHtml = '<div style="display:none" data-selecter="{gamecode}" class="gb-left-recommengame-list"></div>';
	var list = GSY.config.get('gameList');
	var gamePlayStr = LANG[GSY.config.get('lang')]['Gamebox_PlayGame']
	
	/**
	 * [handle description] 回调处理
	 * @return {[type]} [description]
	 */
	var handle = function(element,data,listData,gamecode){
		var html = GSY.gamebox.tpl('hostGameServer');
		var staticHost = GSY.config.get('staticHost');
		var ver = '?oas_ver=' + GSY.config.get('version');
		var icon = staticHost + listData.iconImage + ver;
		var image = staticHost + listData.image100 + ver ;
		
		//显示全名字
		html = html.replace(/\{game_And_serverName\}/g,listData.name + ' (' + data.fullname + ')');
		
		//开始玩游戏
		html = html.replace(/\{gamePlay\}/g,gamePlayStr);
		
		//服务器名称
		html = html.replace(/\{servername\}/g,data.server_name);

		//游戏名称
		html = html.replace(/\{gameName\}/g,listData.name);

		//服务器全名称
		html = html.replace(/\{serverFullName\}/g,data.fullname);
		
		//被截取服务器名称
		html = html.replace(/\{showServername\}/g,GSY.gamebox.strCut(data.server_name,10,true));
		
		//游戏图片标40*40
		html = html.replace(/\{icon\}/g,icon);

		//游戏图片标160*60
		html = html.replace(/\{imageUrl\}/g,image);
		element.html(html).show();

		//当时第一个时候处理
		if(element.attr('listDataFristFlag') == 'true'){
			//GSY.log(element.children());
			element.children().eq(1).show();
			element.children().eq(0).hide();
		};

		//设置鼠标滑过效果
		var timeer = null;
		element.hover(function() {
			var _this = $(this);

			if(timeer){
				clearTimeout(timeer);
				timeer = null;	
			}

			timeer = setTimeout(function(){
				_this.children().eq(1).show();
				_this.children().eq(0).hide();
				_this.siblings('.gb-left-recommengame-list').each(function(index, el) {
					$(this).children().eq(1).hide();
					$(this).children().eq(0).show();		
				});
			},200)
		}, function() {
			if(timeer){
				clearTimeout(timeer);
				timeer = null;	
			}
		});

		//开始玩游戏操作
		element.click(function(){
			
			//设置用户历史记录操作
			var historyData = $.extend({},data);
			historyData['gameid'] = gamecode;
			historyData['language'] = GSY.config.get('lang');

			//开启游戏界面传输参数设置
			if(data['url'].indexOf('?') != -1) var url = data['url'] + '&leftbar_collapse=yes';
			else var url = data['url'] + '?leftbar_collapse=yes';
			var openGameData = $.extend({},data);
			openGameData['gameid'] = gamecode;
			openGameData['language'] = GSY.config.get('lang');
			openGameData['url'] = url;
			openGameData['service_area'] = listData.name;

			GSY.gamebox.cAjax('WINIE_SetGameMsg',historyData,'设置热门游戏打开游戏存储记录');
			GSY.gamebox.cAjax('WINIE_MainUserOpenGame',openGameData,'从热门游戏打开游戏');
			GSY.gamebox.uploadLog('PopularGame',{game_code:gamecode});			
		});

		//GSY.log(element,data,listData,html);
	}

	//循环获取推挤服务器信息
	var listDataFrist = 1;
	for(var key in list){
		if(key == 'letr') continue;
		(function(html,key,listData,listDataFristFlag){
			html = $(html.replace(/\{gamecode\}/,key));
			if(listDataFristFlag == 1) html.attr('listDataFristFlag',true);
			var cookiKey = key + "_" + GSY.config.get('lang') + '_Games'; 
			var url = list[key].getServerlist;
			
			// 当没有推荐服务器信息不处理
			if(GSY.cookie.get(cookiKey) == 0) return;
			
			//假如推荐服务器缓存信息未过期，读取缓存信息
			if(GSY.cookie.get(cookiKey)){
				content.append(html);
				var _data = GSY.gamebox.eval(GSY.cookie.get(cookiKey));
				handle(html,_data,listData,key);
				return;	
			}
			
			//假如缓存信息过期的时候，去服务器获取新的数据
			GSY.util.ajax({
				url : url.replace(/\{uid\}/,uid),
				data : {},
				cache : true,
				type : 'get',
				success : function(ret){
					var recommandArr = [];
					var len = ret.all.length;
					//GSY.log(ret);
					for(var i = 0 ; i < len ; i++){
						if(ret.all[i].recommand == 1)  recommandArr.push(ret.all[i]);	
					};
					var item = recommandArr[recommandArr.length-1];
					if(recommandArr.length == 0) GSY.cookie.set(cookiKey,'0',{expires : 2});	
					else {
						var str = GSY.gamebox.jsonTojsonStr(item);
						GSY.cookie.set(cookiKey,str,{expires : 2});
						handle(html,item,listData,key);
						content.append(html);
					}
					
				},
				error : function(ret){
					GSY.gamebox.message(LANG[GSY.config.get('lang')]['Gamebox_Operation_Fail']);
				}
			});
		})(listHtml,key,list[key],listDataFrist);
		listDataFrist++;
	};
})();


/**
 * [description] 生成右侧广告大图
 * @param  {[type]} ){} [description]
 * @return {[type]}       [description]
 */
;(function(){
	var url = '//mob.oasgames.com/mloctr/';
	var ads =  GSY.config.get('staticHost') + 'games/oas-right-ads.jpg';
	var element = $('<div id="oas-body-right-ads" style="display:none;"><a href="'+ url +'" target="_blank"><img src="'+ ads +'"></a></div>');
	$('body').append(element);

	//绑定右侧广告上报日志
	element.click(function(){
		var parma = {};
		GSY.gamebox.uploadLog('SidebarAdvertisement',parma);		
	});


	var maxW = 1245;

	//绑定屏幕改变事件
	GSY.config.resizeCode['oasGAME_RIGHT_ADS'] = function(){
		var winW = $(window).width();
		if(winW >= maxW) {
			$('#oas-body-right-ads').show();
		}else{
			$('#oas-body-right-ads').hide();	
		}
		$('#oas-body-right-ads').css({overflow:'hidden',height:$(window).height() - 20});
	}

	GSY.config.resizeCode['oasGAME_RIGHT_ADS']();
})();


/**
 * [description] 初始化数据
 * @return {[type]} [description]
 */
$(function(){
	//var data = GSY.config.get('activeGame');
	//var post = 'name=' + data.name + '&gamecode=' + GSY.config.get('gamecode');
	//var html = $('<div id="oas-mainGoPlay" data-post="'+ post +'"></div>');
	//$('body').append(html);

	//设置用户名
	GSY.gamebox.setUserName();

	//初始化页面游戏数据
	GSY.gamebox.getGamesData();
	
	//与c++接口交互数据 ==> 第一次打开游戏初始化
	if(typeof window.external != undefined){
		//window.external.WINIE_InitFirstPlaygames('GSY.gamebox.fristPlayGame');
		//GSY.util.echo(['WINIE_InitFirstPlaygames=>我被初始化了']);
	} 

	//与c++接口交互数据 ==> 初始化最近玩过游戏记录
	if(typeof window.external != undefined){
		//window.external.WINIE_GameListIni('GSY.gamebox.getGameHistory');
		//GSY.util.echo(['WINIE_GameListIni=>我被初始化了']);
	} 

	
});

/**
 * [setUserName description] 设置用户名信息
 */
GSY.gamebox.setUserName = function(){
	var temp = GSY.util.getUrlParam('name');
	if(temp) var username = temp;
	else username = OASGetLangVal('nodata');
	var name = GSY.gamebox.strCut(username,16,true);
	$('#gb-gamebox-userinfo-name').html(name).parent().attr('title',username);
}


/**
 * [getGamesData description] 获取游戏中心游戏推广数据
 * @return {[type]} [description]
 */
GSY.gamebox.getGamesData = function(){
	var url = GSY.config.get('getGamesDataUrl');
	GSY.util.echo(url);
	
	//当未获取游戏地址不存在的时候，不处理
	if(!url) return;

	GSY.util.echo(url);
	
	//获取页面数据
	GSY.util.ajax({
		url : url,
		data : {position : 'posleft_recommend|posright_hotactive|posright_bighotgames|posright_smallhotgames'},
		success : function(ret){
			GSY.util.echo(ret,'获取游戏中心游戏推广数据成功！');
		},
		error : function(ret){
			GSY.gamebox.message(OASGetLangVal('Gamebox_Operation_Fail'),'','获取游戏中心推广数据失败！');		
		}
	})
}







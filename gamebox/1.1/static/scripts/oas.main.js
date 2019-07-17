// JavaScript Document


/**
 * [mainDataAds description] 推荐游戏位置游戏数据设置
 * @type {Object}
 */


/**
 * [playGame description] 打开游戏窗口
 * @return {[type]} [description]
 */
GSY.gamebox.playGame = function(element,index){
	var obj = GSY.util.getEleData(element);

	//用户未登录或者是切换账号
	if(!GSY.util.getUrlParam('token') || element.attr("data-selecter") === "changer"){
		GSY.gamebox.userCommonLogin(element);
		return;
	}
	//用户已经登录
	var param = {
		token : GSY.util.getUrlParam('token'),
		lg : GSY.config.get('lang'),
		gameid : obj.gamecode,
		gamename : obj.name,
		oas_ver : GSY.config.get('version')
	};
	var url = GSY.config.get('path').replace(/\{pagename\}/,'game')+ '?' + GSY.gamebox.jsonToPostStr(param);
	var data = {
		service_area : obj.name,
		url : url,
		gameid : obj.gamecode,
		language : GSY.config.get('lang'),
		type : 'game',
		gametype : 'login'
	}

	//特殊游戏类型处理方法
	if(obj.gamecode == 'letr') data['gametype'] = 'u3d';


	//JS与C++交互操作
	GSY.gamebox.cAjax('WINIE_MainUserOpenGame',data,'开启游戏load页面');
	
	//上报日志文件
	if(index != undefined){
		if(index == 1) GSY.gamebox.uploadLog('Advertisement',{game_code:obj.gamecode});	
		else if(index == 2) GSY.gamebox.uploadLog('GameOpenTime',{game_code:obj.gamecode});
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
 * [getGameHistoryPlayGame description] 从游戏历史打开游戏
 * @return {[type]} [description]
 */
GSY.gamebox.fromGameHistoryPlayGame = function(element){

	//打开游戏页面需要的参数
	var data = GSY.util.getEleData(element);
	GSY.gamebox.cAjax('WINIE_SetGameMsg',data,'设置游戏历史打开游戏存储记录');

	//设置用户登录游戏历史记录
	var param = $.extend({},data);
	param['service_area'] = data.name;
	if(param['url'].indexOf('?') != -1) var url = param['url'] + '&leftbar_collapse=yes';
	else var url = param['url'] + '?leftbar_collapse=yes';
	//增加可扩展参数
	url += GSY.gamebox.getOtherParam(data.gameid);
	param['url'] = url;
	param['gameType'] = 'login';
	if(data.gameid == 'letr') param['gameType'] = 'u3d';
	GSY.gamebox.cAjax('WINIE_MainUserOpenGame',param,'从游戏历史打开游戏');
	
	//上报日志
	GSY.gamebox.uploadLog('RecentlyGame',{game_code:data.gameid});
};


/**
 * [setUserName description] 设置用户名信息
 */
GSY.gamebox.setUserName = function(){
	var temp = GSY.util.getUrlParam('name');
	if(temp){
		 var username = temp;
		 var name = GSY.gamebox.strCut(username,16,true);
		 var changerUserHtml = '<a href="javascript:void(0);" onclick="GSY.gamebox.playGame($(this));return false;" data-selecter="changer">' + LANG[GSY.config.get('lang')]['changer_user'] + '</a>';
		 $(".gb-gamebox-userinfo-btn").html(changerUserHtml);
	}else{
		var username = OASGetLangVal('Gamebox_nologin');
		var name = '<p style="color:#999">' + username + '</p>';
	}
	$('#gb-gamebox-userinfo-name').html(name).parent().attr('title',username);
	
}

/**
 * [createRightSideAds description] 生成右侧广告大图
 * @return {[type]} [description]
 */
GSY.gamebox.createRightSideAds = function(){	
	$('#gb-js-game-r-box .gb-game-main-body').append($('<div id="oas-body-right-ads" style="display:none;"></div>'));
	var element = $('#oas-body-right-ads'),data;

	//绑定右侧广告上报日志
	element.click(function(){
		var parma = {};
		GSY.gamebox.uploadLog('SidebarAdvertisement',parma);		
	});
	var setAD = function(){
		if(!data){
			return;
		}
		var winW = $(window).width(),
			iScroll = $('#gb-js-game-r-box').height() < $('#gb-js-game-r-box').children().height(),
			minW = iScroll ? 1350 + 22 : 1350,
			midW = iScroll ? 1590 + 22 : 1590,
			maxW = iScroll ? 1910 + 22 : 1910,
			html = winW < minW ? '' : winW < midW ? data['rightad_ad']['code'] : winW < maxW ? data['rightad_ad2']['code'] : data['rightad_ad3']['code'],
			eleW = winW < minW ? 0 : winW < midW ? 300 : winW < maxW ? 540 : 860,
			distr = winW < minW ? 'none' : 'block';
		element.css({display:distr,width:eleW,overflow:'hidden',height:$(window).height() - 20});
		element.html(html);
	};
	GSY.config.resizeCode['oasGAME_RIGHT_ADS'] = function(){
		setAD();
	};
	GSY.util.ajax({
		url : GSY.config.get('getAdsDataUrl'),
		data : {position:'rightad|rightad2|rightad3'},
		success : function(ret){
			if(ret.code == 1){
				data = ret.data.html
				GSY.config.resizeCode['oasGAME_RIGHT_ADS']();
			}
		},
		error : function(ret){}
	});
};


/**
 * [getGameHistory description] 获取用户游戏历史记录
 * @param  {[type]} ret [description]
 * @return {[type]}     [description]
 */
GSY.gamebox.createGameHistory = function(ret){
	if(ret) ret = GSY.gamebox.eval(ret);
	var cont = $('#gb-gamebox-history-content');


	//没有历史记录
	var len = ret.length;
	if(!$.isArray(ret) || len == 0) {
		var str = OASGetLangVal('nodata');
		cont.html('<div class="nodata">'+ str +'</div>');
		return false;
	}

	//GSY.util.echo(ret[0],'获取用户游戏历史记录数据');
	//有历史记录
	var str = '';
	for(var i = 0 ; i < len ; i++){
		var data = ret[i];
		if(!data.name) continue;

		if(data.language != GSY.config.get('lang')) continue;

		var ver = '?oas_ver=' + GSY.config.get('version');
		var temp = GSY.gamebox.tpl('gameHistory');
		var post = GSY.gamebox.jsonToPostStr(data);
		temp = temp.replace(/\{post\}/,post);
		temp = temp.replace(/\{gameName\}/g,data.name);
		temp = temp.replace(/\{fullname\}/g,data.fullname);
		temp = temp.replace(/\{url\}/,data.ico);
		str += temp;
	};
	cont.html(str);
};


/**
 * [createBigRecommedGamelists description] 初始化大图推荐位置
 * @param  {[type]} ret [description] 游戏数据
 * @return {[type]}     [description]
 */
GSY.gamebox.createBigRecommedGamelists = function(retArr){
	var cont = $('#gb-game-recommend-pic');
	var html = '<div class="gb-game-recommend-list" action="{severListsUrl}" data-selecter="{selecterVal}" onclick="GSY.gamebox.playGame($(this),1);return false;" data-post="{post}">';
		html+= '	<div class="gb-game-recommend-list-img"><img src="{imageUrl}" alt="{name}"></div>';
		html+= '	<div class="gb-game-recommend-list-text">';
		html+= '		<div class="gb-game-recommend-list-btn"><a href="javascript:void(0)" class="gb-btn-green"><span><em>{playGame}</em></span></a></div>';		
		html+= '		<div class="gb-game-recommend-list-desc">';
		html+= '			<h1>{name}</h1>';
		html+= '			<p>{gamedesc}</p>';
		html+= '		</div>';
		html+= '	</div>';
		html+= '</div>';
	GSY.util.echo(retArr,'推荐大图游戏列表');
	var len = retArr.length;

	var str = '';
	for(var i = 0 ; i < len ; i++){
		var data = retArr[i];
		var tempStr = html;
		var ver = '?oas_ver=' + GSY.config.get('version');
		var post = 'name=' + data.name + '&gamecode=' + data.gamecode;
		var imageUrl = data.pic + ver;

		//存储游戏唯一标识
        tempStr = tempStr.replace(/\{selecterVal\}/,'OAS_GAME_BIG_' + data.gamecode);

        //显示游戏名称
		tempStr = tempStr.replace(/\{name\}/g,data.name);
		
		//图片地址
		tempStr = tempStr.replace(/\{imageUrl\}/,imageUrl);

		//存储游戏相关信息地址
		GSY.gamebox.setLocalGameData({
			key : 'OAS_GAME_INFRO_' + data.gamecode,
			value :data
		});

		//设置游戏描述
		tempStr = tempStr.replace(/\{gamedesc\}/,data.description ? data.description : data.name);

		//设置游戏描述
		tempStr = tempStr.replace(/\{post\}/,post);

		//设置链接地址
		tempStr = tempStr.replace(/\{severListsUrl\}/,data.url);

		//设置开始游戏多语言
		tempStr = tempStr.replace(/\{playGame\}/,OASGetLangVal('Gamebox_PlayGame'));
		str += tempStr;
	}
	cont.html(str);

	//窗帘式显示
	GSY.other.windowMask({
		parent : cont.children(),
		hide : '.gb-game-recommend-list-text'
	});		
};

/**
 * [createGamelists description] 创建游戏列表信息
 * @param  {[type]} ret [description] 游戏数据
 * @return {[type]} [description]
 */
GSY.gamebox.createGamelists = function(retArr){
	var cont = $('#gb-gamelist-content');

	//数据为空的时候处理
	if(!$.isArray(retArr) || retArr.length == 0) {
		cont.css({width:'100%','font-size':'12px'});
		var str = OASGetLangVal('nodata');
		cont.html('<div class="nodata">'+ str +'</div>');
		return false;
	}

	//创建游戏列表字符串
	var str = "";
	for(var key in retArr){
		if(retArr[key] != 'nodata'){
			var temp = GSY.gamebox.tpl('gameslist');
			var ver = '?oas_ver=' + GSY.config.get('version');
			var data = retArr[key]
			var url = data.pic + ver;
            var post = 'name=' + data.name + '&gamecode=' + retArr[key].gamecode;

            //存储游戏唯一标识
            temp = temp.replace(/\{selecterVal\}/,'OAS_GAME_LIST_' + retArr[key].gamecode);

			//图片地址和存储图片地址
			temp = temp.replace(/\{gameNameImageUrl\}/,url);
			
			//存储游戏相关信息地址
			GSY.gamebox.setLocalGameData({
				key : 'OAS_GAME_INFRO_' +  retArr[key].gamecode,
				value :retArr[key]
			});
			
			//游戏名称
			temp = temp.replace(/\{gameName\}/g,data.name);

			//游戏类型
			temp = temp.replace(/\{gameType\}/,data.type);

			//请求参数
			temp = temp.replace(/\{post\}/,post);
			
			//开始游戏
			temp = temp.replace(/\{playGame\}/,OASGetLangVal('Gamebox_PlayGame'));

			//游戏描述
			temp = temp.replace(/\{gameDesc\}/,data.description);

			//游戏描述
			temp = temp.replace(/\{gameFullDesc\}/,data.description);

			str += temp;
		}
	}
	cont.html(str);

	//窗帘式显示
	GSY.other.windowMask({
		parent : cont.children(),
		hide : '.gb-games-lists-cont-mask'
	});
};


/**
 * [createHotActive description] 创建活动列表
 * @param  {[type]} retArr [description]
 * @return {[type]}        [description]
 */
GSY.gamebox.createHotActive = function(retArr){
	var cont = $('#gb-js-gameActive-box');
	var html = '<a target="_blank" title="{name}" href="{url}"><img alt="{name}" src="{imageURL}"></a>';
	var ver = '?oas_ver=' + GSY.config.get('version');
	
	//数据为空的时候处理
	if(!$.isArray(retArr) || retArr.length == 0) {
		cont.css({width:'100%','font-size':'12px'});
		var str = OASGetLangVal('nodata');
		cont.html('<div class="nodata">'+ str +'</div>');
		return false;
	}



	var str = '';
	for(var key in retArr){
		var temp = html;
		
		var name = retArr[key].name;
		var imageURL = retArr[key].ico + ver;
		temp = temp.replace(/\{url\}/,retArr[key].url);
		temp = temp.replace(/\{name\}/g,name);
		temp = temp.replace(/\{imageURL\}/,imageURL);
		str += temp;
	};
	cont.html(str);

	//绑定热门活动上报日志事件
	cont.children().click(function(){
		var parma = {index:($(this).index() + 1)};
		GSY.gamebox.uploadLog('PopularEvents',parma);		
	});
};


/**
 * [createRecommendServer description] 创建推荐游戏服务器列表
 * @param  {[type]} retArr [description]
 * @return {[type]}        [description]
 */
GSY.gamebox.createRecommendServer = function(retArr){
	var cont = $('#gb-left-recommengame-content');
	//数据为空的时候处理
	if(!$.isArray(retArr) || retArr.length == 0) {
		cont.css({width:'100%','font-size':'12px'});
		var str = OASGetLangVal('nodata');
		cont.html('<div class="nodata">'+ str +'</div>');
		return false;
	}

	//循环处理
	for(var key in retArr){
		//创建闭包处理.
		;(function(data,index){
			var box = '<div style="display:none" data-selecter="{selecterVal}" class="gb-left-recommengame-list"></div>';

			//存储游戏唯一标识
			box = $(box.replace(/\{selecterVal\}/,'OAS_GAME_Recommend_' + data.gamecode));
			cont.append(box);
			
			var cookiKey = data.gamecode + "_" + GSY.config.get('lang') + '_Games'; 	
			// 当没有推荐服务器信息不处理
			if(GSY.cookie.get(cookiKey) == 0) return;

			//假如推荐服务器缓存信息未过期，读取缓存信息
			if(GSY.cookie.get(cookiKey)){
				var recommendGameData = GSY.gamebox.eval(GSY.cookie.get(cookiKey));
				GSY.gamebox.createRecommendServerCode(data,recommendGameData,box,index);
				return;	
			}


			//假如缓存信息过期的时候，去服务器获取新的数据
			var url = data.url.replace(/\{uid\}/,0);
			url = url.replace(/&amp;/g,'&');
			GSY.util.ajax({
				url : url,
				data : {},
				cache : true,
				type : 'get',
				success : function(ret){
					var recommandArr = [];
					var len = ret.all.length;
					for(var i = 0 ; i < len ; i++){
						if(ret.all[i].recommand == 1)  recommandArr.push(ret.all[i]);	
					};
					var item = recommandArr[recommandArr.length-1];
					if(recommandArr.length == 0) GSY.cookie.set(cookiKey,'0',{expires : 2});	
					else {
						var str = GSY.gamebox.jsonTojsonStr(item);
						GSY.cookie.set(cookiKey,str,{expires : 2});
						GSY.gamebox.createRecommendServerCode(data,item,box,index);
					}
				},
				error : function(ret){
					GSY.gamebox.uploadLog('GetErrorTime',{'gameid':data.gamecode,'errInfo':OASGetLangVal('Gamebox_Operation_Fail')});	
				}
			});
		})(retArr[key],key);
	};	
};


/**
 * [createRecommendServerCode description] 创建推荐游戏列表
 * @return {[type]} [description]
 */
GSY.gamebox.createRecommendServerCode = function(data,recommendGameData,box,index){
	var html = GSY.gamebox.tpl('hostGameServer');
	var gamePlayStr = OASGetLangVal('Gamebox_PlayGame')

	//显示全名字
	html = html.replace(/\{game_And_serverName\}/g, data.name + ' (' + recommendGameData.fullname + ')');
	
	//开始玩游戏
	html = html.replace(/\{gamePlay\}/g,gamePlayStr);
	
	//服务器名称
	html = html.replace(/\{servername\}/g,recommendGameData.server_name);

	//游戏名称
	html = html.replace(/\{gameName\}/g,data.name);

	//服务器全名称
	html = html.replace(/\{serverFullName\}/g,recommendGameData.fullname);
	
	//被截取服务器名称
	html = html.replace(/\{showServername\}/g,GSY.gamebox.strCut(recommendGameData.server_name,8,true));
	
	//游戏图片标40*40和
	html = html.replace(/\{icon\}/g,data.ico);
	
	//存储游戏相关信息地址
	GSY.gamebox.setLocalGameData({
		key : 'OAS_GAME_INFRO_' + data.gamecode,
		value :data
	});

	//GSY.gamebox.saveGameIcon(data.gamecode,data.ico);
	//GSY.gamebox.saveGameServerURL(data.gamecode,data.url)

	//游戏图片标160*60
	html = html.replace(/\{imageUrl\}/g,data.pic);
	box.html(html).show();

	//当时第一个时候处理
	if(index == 0){
		box.children().eq(1).show();
		box.children().eq(0).hide();
	};

	//设置鼠标滑过效果
	var timeer = null;
	box.hover(function() {
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
	box.click(function(){
		var token = GSY.util.getUrlParam('token');
		
		//用户未登录
		if(!token){
			
			GSY.gamebox.userCommonLogin($(this));
		

		//用户已经登录
		}else{
			//设置用户历史记录操作
			var historyData = $.extend({},recommendGameData);
			historyData['gameid'] = data.gamecode;
			historyData['language'] = GSY.config.get('lang');
			historyData['ico'] = data.ico;
			historyData['name'] = data.name;

			//开启游戏界面传输参数设置
			if(data['url'].indexOf('?') != -1) var url = recommendGameData['url'] + '&leftbar_collapse=yes';
			else var url = recommendGameData['url'] + '?leftbar_collapse=yes';
			//增加可扩展参数
			url += GSY.gamebox.getOtherParam(data.gamecode);
			var openGameData = $.extend({},recommendGameData);
			openGameData['gameid'] = data.gamecode;
			openGameData['language'] = GSY.config.get('lang');
			openGameData['url'] = url;
			openGameData['service_area'] = data.name;
			openGameData['gameType'] = 'login';
			//设置特殊游戏类型
			if (data.gamecode == 'letr') {
				openGameData['gameType'] = 'u3d';
			}
    		
    		GSY.gamebox.cAjax('WINIE_SetGameMsg',historyData,'设置热门游戏打开游戏存储记录');
			GSY.gamebox.cAjax('WINIE_MainUserOpenGame',openGameData,'从热门游戏打开游戏');
			GSY.gamebox.uploadLog('PopularGame',{game_code:data.gamecode});			
		}
	});
};

/**
 * [getGamesData description] 获取游戏中心游戏推广数据
 * @return {[type]} [description]
 */
GSY.gamebox.getGamesData = function(){
	var url = GSY.config.get('getGamesDataUrl');
	GSY.util.echo(url);
	
	//当未获取游戏地址不存在的时候，不处理
	if(!url) return;
	
	//获取页面数据
	GSY.util.ajax({
		url : url,
		data : {position : 'posleft_recommend|posright_hotactive|posright_bighotgames|posright_smallhotgames|posright_smallgames'},
		success : function(ret){
			GSY.util.echo(ret.data.html,'获取游戏中心游戏推广数据成功！');
			//推荐大图游戏列表
			GSY.gamebox.createBigRecommedGamelists(ret.data.html.posright_bighotgames);

			//创建游戏列表信息
			GSY.gamebox.createGamelists(ret.data.html.posright_smallhotgames);

			//创建活动列表
			GSY.gamebox.createHotActive(ret.data.html.posright_hotactive);

			//创建小游戏列表
			GSY.gamebox.createMiniGameLists(ret.data.html.posright_smallgames);

			//生成右侧广告大图
			GSY.gamebox.createRightSideAds();	

			//创建推荐游戏列表
			GSY.gamebox.createRecommendServer(ret.data.html.posleft_recommend);			

		},
		error : function(ret){
			GSY.gamebox.message(OASGetLangVal('Gamebox_Operation_Fail'),'','获取游戏中心推广数据失败！');		
		}
	})
};

/**
 * [getMiniGamesData description] 获取小游戏最新列表
 * @return {[type]} [description]
 */
GSY.gamebox.createMiniGameLists = function(retArr){
	var cont = $('#gb-mingame-content');
	//数据为空的时候处理
	if(!$.isArray(retArr) || retArr.length == 0) {
		cont.css({width:'100%','font-size':'12px'});
		var str = OASGetLangVal('nodata');
		cont.html('<div class="nodata">'+ str +'</div>');
		return false;
	}
	var html = '';
	//循环成小游戏列表
	for(var i=0,len=retArr.length;i<len;i++){
		var temp = GSY.gamebox.tpl('miniGameList');
		var data = retArr[i];

		//游戏全名称
		temp = temp.replace(/\{fullgameName\}/g,data.name);

		//游戏链接
		temp = temp.replace(/\{url\}/g,data.url);

		//游戏ID
		temp = temp.replace(/\{gamecode\}/g,data.gamecode);

		//游戏缩略名称
		temp = temp.replace(/\{gameName\}/g,GSY.gamebox.strCut(data.name,24,true));

		//游戏图片地址
		temp = temp.replace(/\{gameNameImageUrl\}/g,data.ico);

		//游戏描述
		temp = temp.replace(/\{gameDesc\}/g,data.description ? GSY.gamebox.strCut(data.description,70,true) : data.name);

		//游戏描述
		temp = temp.replace(/\{gameType\}/g,data.type ? data.type : '');

		//开始游戏
		temp = temp.replace(/\{playGame\}/,OASGetLangVal('Gamebox_PlayGame'));

		html += temp;

	}

	cont.html(html);

	//绑定单击事件
	cont.delegate('.gb-mingame-list-box','click',function(){

		var url = $(this).attr('data-url'),
			name = $(this).attr('title'),
			gamecode = $(this).attr('data-gamecode');
		
		var index = $(this).index() +1;
		var clickTime = 'RecomendedSmallGame' + index + 'ClickTime';
		GSY.gamebox.gotomingamebox(url,name,gamecode,clickTime);	
	});

	GSY.other.windowMask({
		parent : cont.children(),
		hide : '.gb-mingame-list-cont-mask'
	});


};


/**
 * [description] 初始化页面数据
 * @return {[type]} [description]
 */
$(function(){
	//设置用户名
	GSY.gamebox.setUserName();

	//初始化页面游戏数据
	GSY.gamebox.getGamesData();


	//获取小游戏最新列表
	//GSY.gamebox.getMiniGamesData();

	//创建用户完页游历史记录
	if(GSY.util.getUrlParam('token')){
		GSY.gamebox.cAjax('WINIE_GameListIni','GSY.gamebox.createGameHistory','初始化最近玩过游戏记录');
		

		//两分钟重新获取一次数据
		setInterval(function(){
			GSY.gamebox.cAjax('WINIE_GameListIni','GSY.gamebox.createGameHistory','初始化最近玩过游戏记录');
		},120000);

		//第一次打开游戏
	}else{
		GSY.gamebox.createGameHistory('[]');	
	}

	//登录版登录完成打开游戏
	var gamecode = GSY.config.get('gamecode');
	GSY.gamebox.getLocalGameData({key:'OAS_GAME_first_open'},function(ret){
		var ret = GSY.gamebox.eval(ret);
		if($.isEmptyObject(ret)){
			if(gamecode !== "mingame"+ GSY.config.get('lang') && GSY.util.getUrlParam('token')){
				GSY.gamebox.getLocalGameData({key:'OAS_GAME_INFRO_' + gamecode},function(ret){
					var ret = GSY.gamebox.eval(ret);
					var post = 'name=' + ret.name + '&gamecode=' + gamecode;
					var html = $('<div id="oas-mainGoPlay" data-post="'+ post +'"></div>');
					$('body').append(html);
					GSY.gamebox.playGame(html);
					GSY.gamebox.setLocalGameData({key : 'OAS_GAME_first_open',value:{isopen:true}});
				});
			}
		}		
	});

	//未登录版点击游戏登录完成打开游戏
	$(window).on('load',function(){
		var token = GSY.util.getUrlParam('token');
		var data = GSY.cookie.get("OAS_unLoginInfo");
		var isclick = true,unLoginTimer = null;
		if(token && data){
			(function oneclick(){
				var slt = "[data-selecter=" + data + "]";
				if(isclick){
					clearInterval(unLoginTimer);
					unLoginTimer = setInterval(function(){
						$(slt).click(function(){
							isclick = false;
						});				
						$(slt).trigger("click");
						oneclick();
					},100)
				}else{
					clearInterval(unLoginTimer);
					GSY.cookie.remove('OAS_unLoginInfo');
				}
			})();			
		}
	});	

});













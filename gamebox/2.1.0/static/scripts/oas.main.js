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
	if(element instanceof jQuery){
		var obj = GSY.util.getEleData(element);
	}else{
		var obj = element;
	};
	//用户未登录或者是切换账号
	if(element instanceof jQuery &&(!GSY.util.getUrlParam('token') || element.attr("data-selecter") === "changer")){
		GSY.gamebox.userCommonLogin(element);
		return;
	}
	//用户已经登录
	var param = {
		token : GSY.util.getUrlParam('token'),
		lg : GSY.config.get('lang'),
		gameid : obj.gamecode,
		gamename : obj.name,
		oas_ver : GSY.config.get('version'),
		version : GSY.util.getUrlParam('version')
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
	if(GSY.str.cut(obj.gamecode,2) == 'le'){
		data['gametype'] = 'u3d';
	}
	//GSY.gamebox.message(url);
	//JS与C++交互操作
	GSY.gamebox.cAjaxCallback('WINIE_MainUserOpenGame',data,'开启游戏load页面');
	
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
	//GSY.gamebox.cAjax('WINIE_SetGameMsg',data,'设置游戏历史打开游戏存储记录');
	GSY.gamebox.cAjaxCallback('WINIE_SetGameMsg',data,'设置游戏历史打开游戏存储记录');

	//设置用户登录游戏历史记录
	var param = $.extend({},data);
	param['service_area'] = data.name;
	if(param['url'].indexOf('?')!=-1) var url = param['url'] + '&leftbar_collapse=yes';
	else var url = param['url'] + '?leftbar_collapse=yes';
	//增加可扩展参数
	url += GSY.gamebox.getOtherParam(data.gameid);
	param['url'] = url;
	param['gameType'] = 'login';
	if(GSY.str.cut(data.gameid,2) == 'le') param['gameType'] = 'u3d';
	GSY.gamebox.cAjaxCallback('WINIE_MainUserOpenGame',param,'从游戏历史打开游戏');
	
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
		$('#gb-gamebox-userinfo-name').text(name).parent().attr('title',username);
	}else{
		var username = OASGetLangVal('Gamebox_nologin');
		var name = '<p style="color:#999">' + username + '</p>';
		$('#gb-gamebox-userinfo-name').html(name).parent().attr('title',username);
	}
	
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
	//if(ret) ret = GSY.gamebox.eval(ret);
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
	$(window).trigger('resize');
	for(var i= 0;i<cont.children().length;i++){
		var box = $(cont.children()[i]);
		//设置鼠标滑过效果
		box.hover(function() {
			$(this).find('.gb-gamebox-history-btn').show();
		}, function() {
			$(this).find('.gb-gamebox-history-btn').hide();
		});
	}	
};
/**
 * [delUserList description] 删除历史记录
 * @param  {[object]} element [description] 操作按钮元素对象
 * @return {[type]}     [description]
 */
GSY.gamebox.delHistoryList = function(element,event){
	//取消冒泡事件
	var e = window.event || event;
	if (e.stopPropagation)  e.stopPropagation(); //IE以外
	else e.cancelBubble = true; //IE 
	//删除成功回调方法
	GSY.gamebox.delHistoryListOk = function(){
		element.closest('.gb-gamebox-history-list').remove();
	}
	
	var parentStr = '.gb-accountslist-list';
	var data = GSY.util.getEleData(element.siblings('a'));
	//调用C++删除历史记录方法（）
	//var parma = {index:($(this).index() + 1)};
	GSY.gamebox.uploadLog('btdeleterecentlygame',{});	
	GSY.gamebox.cAjaxCallback('WINIE_GameListDel',data,'删除本地存储数据');
}
/**
 * [delUserList description] 初始化历史记录列表
 * @return {[type]}     [description]
 */
GSY.gamebox.initHistoryList = function(){
	GSY.gamebox.cAjaxCallback('WINIE_GameListIni',{callback:GSY.gamebox.createGameHistory},'初始化最近玩过游戏记录');
};



/**
 * [createBigRecommedGamelists description] 初始化轮播图
 * @param  {[type]} ret [description] 游戏数据
 * @return {[type]}     [description]
 */
GSY.gamebox.createBigRecommedGamelists = function(retArr){
	var cont = $('#gb-game-slide-pic');
	var html = '<li action="{severListsUrl}" data-selecter="{selecterVal}" onclick="GSY.gamebox.playGame($(this),1);return false;" data-post="{post}">';
		html+= '	<a href="javascript:void(0)" title="{name}"><img src="{imageUrl}" alt="{name}"></a>';
		html+= '</li>';
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
		//tempStr = tempStr.replace(/\{gamedesc\}/,data.description ? data.description : data.name);

		//设置游戏描述
		tempStr = tempStr.replace(/\{post\}/,post);

		//设置链接地址
		tempStr = tempStr.replace(/\{severListsUrl\}/,data.url);

		//设置开始游戏多语言
		//tempStr = tempStr.replace(/\{playGame\}/,OASGetLangVal('Gamebox_PlayGame'));
		str += tempStr;
	}
	cont.html('<ul>'+str+'</ul>');

    //焦点图自动轮播
    oasSlider({
        width: cont.width() ? cont.width() : 466,
        height: cont.height(),
        parentEle: cont,
        time : 3000,
        icoType: 'number',
        align: 'right',
        icoShow: 1,
        scrollTime: 500,
        type: 'slider',
        isIcoShow:false
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
	var str = "",len = retArr.length;
	for(var i = 0; i < len; i++){
		if(retArr[i] != 'nodata'){	
			var data = retArr[i],
				temp = '';
			if(data.handtag&&data.handtag == 1){
				temp = GSY.gamebox.createGamelistsHandtag(data);
			}else{
				temp = GSY.gamebox.createGamelistsUnHandtag(data);				
			}
			str += temp;			
		}
	}
	str = '<div class="gb-game-slide-cont">' + str + '</div>';
	cont.html(str);
	var webgame = cont.find('.gb-games-lists-box[data-type="webgame"]'),
		mobilegame = cont.find('.gb-games-lists-box[data-type="mobile"]');

	webgame.on('click',function(e){
		var tar = $(e.target);
		if (!tar.parents('.gb-btn-in-website').length && tar[0].className != 'gb-btn-in-website'){
			var slt = $(this).data('selecter').split('_'),
				gameid = slt[slt.length-1];
			GSY.gamebox.uploadLoginLog({
				'uuid':GSY.gamebox.mainUserId,
	            'event': 'recommendedgameclicktime',
	            'gameid':gameid
	        });				
			GSY.gamebox.playGame($(this),2)
		}			
	});
	mobilegame.on('mouseenter',function(){
		var hover_index = mobilegame.index(this) + 1;
		GSY.gamebox.uploadLoginLog({
			'uuid':GSY.gamebox.mainUserId,
            'event': 'Cmobilegames'+hover_index
        });	
	}).on('click',function(e){
		var now_index = mobilegame.index(this) + 1;
		GSY.gamebox.uploadLoginLog({
			'uuid':GSY.gamebox.mainUserId,
            'event': 'mobilegames'+now_index
        });
	});

	var pNode = cont.find('.gb-games-lists-box');

	//窗帘式显示
	GSY.other.windowMask({
		parent : pNode,
		hide : '.gb-games-lists-cont-mask'
	});

	//滚动
	if(len > 4){
		$('.gb-game-slide-btn').show();
	}
	var prevbtn = $('.gb-game-list-prev-btn'),
		nextbtn = $('.gb-game-list-next-btn'),
		slidebox = $('.gb-game-slide-cont'),
		shownum = 4,
		prevnum = 0,
		slidenum = len-4,
		iSlide = false;

	var cekNum = function(isNext){
		prevnum = isNext ? prevnum+1 : prevnum-1;
		//按钮灰显不可点击
		if(prevnum+1 > slidenum){
			nextbtn.addClass("un-active");
			if(prevnum-1 >= 0){
				prevbtn.removeClass("un-active");
			}
		}else if(prevnum-1 < 0){
			prevbtn.addClass("un-active");
			if(prevnum+1 <= slidenum){
				nextbtn.removeClass("un-active");
			}
		}else{
			nextbtn.removeClass("un-active");
			prevbtn.removeClass("un-active");
		}
		prevnum = prevnum > slidenum ? slidenum : prevnum < 0 ? 0 : prevnum;
		slideStart(isNext);
	};
	var slideStart = function(isNext){
		var left = parseInt(slidebox.css('left')),
			step = slidebox.children().outerWidth(true);
		left = -prevnum*step;
		slidebox.animate({left:left},300,'easeInOutQuad',function(){
			iSlide = false;
		});	
	};

	prevbtn.on('click',function(){
		if(iSlide){
			return;
		}
		iSlide = true;
		cekNum(false);
	});
	nextbtn.on('click',function(){
		if(iSlide){
			return;
		}
		iSlide = true;
		cekNum(true);
	});	

};
/**
 * [createGamelists description] 创建游戏列表信息模板
 * @param  {[type]} ret [description] 游戏数据
 * @return {[type]} [description]
 */
GSY.gamebox.createGamelistsUnHandtag = function(data){
	var ver = '?oas_ver=' + GSY.config.get('version');
	var url = data.pic + ver;
    var post = 'name=' + data.name + '&gamecode=' + data.gamecode;
    var temp = GSY.gamebox.tpl('gameslist');

    //存储游戏唯一标识
    temp = temp.replace(/\{selecterVal\}/,'OAS_GAME_LIST_' + data.gamecode);

	//图片地址和存储图片地址
	temp = temp.replace(/\{gameNameImageUrl\}/,url);
			
	//存储游戏相关信息地址
	GSY.gamebox.setLocalGameData({
		key : 'OAS_GAME_INFRO_' +  data.gamecode,
		value :data
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

	//官网地址
	temp = temp.replace(/\{website\}/,OASGetLangVal('Gamebox_official_website'));

	//官网地址
	temp = temp.replace(/\{websiteUrl\}/,'//'+data.gamecode+'.oasgames.com');
	return temp;
}
/**
 * [createGamelists description] 创建手游列表模板
 * @param  {[type]} ret [description] 手游数据
 * @return {[type]} [description]
 */
GSY.gamebox.createGamelistsHandtag = function(data){
	var temp = GSY.gamebox.tpl('mobileGameslist');
	var ver = '?oas_ver=' + GSY.config.get('version');
	var isa,iso;
	//图片
	temp = temp.replace(/\{gameNameImageUrl\}/,data.ico+ver);			
	//二维码
	temp = temp.replace(/\{gameCodeImageUrl\}/,data.ico2+ver);	
	//官网地址
	temp = temp.replace(/\{url\}/g,data.url);			
    //游戏名称
	temp = temp.replace(/\{gameName\}/g,data.name);

	if(data.system.indexOf(',') > -1){
		isa = 'android';
		iso = 'apple';
	}else{
		iso = data.system == 1 ? 'apple' : 'hidden';
		isa = data.system == 2 ? 'android' : 'hidden';
	}
	//支持平台
	temp = temp.replace(/\{apple\}/,iso);	
	temp = temp.replace(/\{android\}/,isa);

	return temp;
}
/**
 * [createGamelists description] 创建手游列表
 * @param  {[type]} ret [description] 游戏数据
 * @return {[type]} [description]
 */
GSY.gamebox.createMobileGameLists  = function(retArr){
	var cont = $('#gb-handgame-content');
		

	//数据为空的时候处理
	if(!$.isArray(retArr) || retArr.length < 0) {
		cont.css({width:'100%','font-size':'12px'});
		var str = OASGetLangVal('nodata');
		cont.html('<div class="nodata">'+ str +'</div>');
		return false;
	}
	//创建游戏列表字符串
	var str = "",len = retArr.length,isa,iso;
	for(var i = 0; i < len; i++){
		if(retArr[i] != 'nodata'){
			var data = retArr[i];
			var temp = GSY.gamebox.createGamelistsHandtag(data);

			str += temp;
		}
	}
	cont.html(str);
	cont.parents('.gb-handgame-list').show();
	$(window).trigger('resize');
	var pNode = cont.find('.gb-games-lists-box');
	//窗帘式显示
	GSY.other.windowMask({
		parent : pNode,
		hide : '.gb-games-lists-cont-mask'
	});
	//上报手游二维码显示次数和点击次数
	cont.find(".gb-games-lists-box").on('click',function(){
		var now_index = $(this).index() + 1;
		GSY.gamebox.uploadLoginLog({
			'uuid':GSY.gamebox.mainUserId,
            'event': 'mobilegames'+now_index
        });
	}).on('mouseenter',function(){		
		var hover_index = $(this).index() + 1;
		GSY.gamebox.uploadLoginLog({
			'uuid':GSY.gamebox.mainUserId,
            'event': 'Cmobilegames'+hover_index
        });
	});
};

/**
 * [createHotActive description] 创建活动列表
 * @param  {[type]} retArr [description]
 * @return {[type]}        [description]
 */
GSY.gamebox.createHotActive = function(retArr){
	var cont = $('#gb-js-gameActive-box');
	var html = '<div class="gb-games-lists-box"><div class="gb-games-lists-bg"><div class="gb-games-lists-cont"><div class="gb-games-lists-img">';
	html += '<a target="_blank" title="{name}" href="{url}"><img alt="{name}" src="{imageURL}"></a>';
	html += '</div></div></div></div>';
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
	cont.parents('.gb-gameActive-box').show();
	$(window).trigger('resize');
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

	// var data = {};
	// $.each(retArr,function(i,item){
	// 	data[item.gamecode] = item;
	// });

	// var showlist = function(){

	// 	var html = '',
	// 		gamePlayStr = OASGetLangVal('Gamebox_PlayGame');

	// 	for(var i = 0; i < data.list.length; i++){

	// 		if(!data[data.list[i].gamecode]){
	// 			continue;
	// 		}

	// 		var tpl = GSY.gamebox.tpl('hostGameServer'),
	// 			list = data.list[i],
	// 			gamecode = list.gamecode,
	// 			dateObj = new Date(parseInt(list.game_service_time)*1000),
	// 			smonth = dateObj.getMonth() + 1,
	// 			sdate = dateObj.getDate();

	// 		tpl = tpl.replace(/\{selecterVal\}/,'OAS_GAME_Recommend_' + list.gamecode);

	// 		//显示全名字
	// 		tpl = tpl.replace(/\{game_And_serverName\}/g, list.game_name + ' (' + list.game_service_num + ')');
	// 		//显示日期
	// 		tpl = tpl.replace(/\{startDate\}/g, smonth + '/' + sdate);
	// 		//开始玩游戏
	// 		tpl = tpl.replace(/\{gamePlay\}/g,gamePlayStr);
			
	// 		//服务器名称
	// 		tpl = tpl.replace(/\{servername\}/g,list.game_service_num);

	// 		//游戏名称
	// 		tpl = tpl.replace(/\{gameName\}/g,list.game_name);

	// 		//服务器全名称
	// 		tpl = tpl.replace(/\{serverFullName\}/g,list.game_service_num);
			
	// 		//被截取服务器名称
	// 		tpl = tpl.replace(/\{showServername\}/g,list.game_service_num);
			
	// 		//游戏图片标40*40
	// 		tpl = tpl.replace(/\{icon\}/g,data[gamecode].ico);

	// 		tpl = tpl.replace(/\{imageUrl\}/g,data[gamecode].pic);	

	// 		html += tpl

	// 	}
	// 	cont.html(html);
	// 	var box = cont.find('.gb-left-recommengame-list');
	// 	var timeer = null;
	// 	box.hover(function() {
	// 		var _this = $(this);
	// 		if(timeer){
	// 			clearTimeout(timeer);
	// 			timeer = null;	
	// 		}
	// 		timeer = setTimeout(function(){
	// 			_this.children().eq(1).show();
	// 			_this.children().eq(0).hide();
	// 			_this.siblings('.gb-left-recommengame-list').each(function(index, el) {
	// 				$(this).children().eq(1).hide();
	// 				$(this).children().eq(0).show();		
	// 			});
	// 		},200)
	// 	}, function() {
	// 		if(timeer){
	// 			clearTimeout(timeer);
	// 			timeer = null;	
	// 		}
	// 	}).click(function(){
	// 		var token = GSY.util.getUrlParam('token');
			
	// 		//用户未登录
	// 		if(!token){				
	// 			GSY.gamebox.userCommonLogin($(this));	
	// 		//用户已经登录
	// 		}else{
	// 			var index = $(this).index(),
	// 				list = data.list[index];
	// 			console.log(index)
	// 			console.log(list.gamecode)
	// 			//设置用户历史记录操作
	// 			var historyData = $.extend({},list);
	// 			historyData['gameid'] = list.gamecode;
	// 			historyData['language'] = GSY.config.get('lang');
	// 			historyData['ico'] = data[list.gamecode].ico;
	// 			historyData['name'] = list.game_name;


	// 			console.log(data[list.gamecode])

	// 			//开启游戏界面传输参数设置
	// 			var url = list['game_link'].indexOf('?') > -1 ? list['game_link'] + '&leftbar_collapse=yes' : list['game_link'] + '?leftbar_collapse=yes';
	// 			//增加可扩展参数
	// 			url += GSY.gamebox.getOtherParam(data.gamecode);
	// 			var openGameData = $.extend({},list);

	// 			openGameData['gameid'] = list.gamecode;
	// 			openGameData['language'] = GSY.config.get('lang');
	// 			openGameData['url'] = url;
	// 			openGameData['service_area'] = list.game_name;
	// 			openGameData['gameType'] = 'login';
	// 			//设置特殊游戏类型
	// 			if(GSY.str.cut(list.gamecode,2) == 'le'){
	// 				openGameData['gameType'] = 'u3d';
	// 			}	    		
	//     		//GSY.gamebox.cAjax('WINIE_SetGameMsg',historyData,'设置热门游戏打开游戏存储记录');
	// 			//GSY.gamebox.cAjax('WINIE_MainUserOpenGame',openGameData,'从热门游戏打开游戏');
				
	//     		GSY.gamebox.cAjaxCallback('WINIE_SetGameMsg',historyData,'设置热门游戏打开游戏存储记录');
	// 			GSY.gamebox.cAjaxCallback('WINIE_MainUserOpenGame',openGameData,'从热门游戏打开游戏');
	// 			GSY.gamebox.uploadLog('PopularGame',{game_code:data.gamecode});			
	// 		}
	// 	}).eq(0).trigger('mouseover')

	// };

	// GSY.util.ajax({
	// 	url:'//tr.oasgames.com/api/api/list_service?game_type=1&num=10&language='+GSY.config.get('lang'),
	// 	success:function(ret){
	// 		if(ret.status == 'ok'){
	// 			data.list = ret.datas;
	// 			$.each(data.list,function(i,item){
	// 				item.gamecode = item.game_link.substring(7,11)
	// 			})
	// 			showlist();
	// 		}
	// 	}
	// });


	//循环处理
	for(var key in retArr){
		//创建闭包处理.
		;(function(data,index){
			var box = '<div style="display:none" data-selecter="{selecterVal}" class="gb-left-recommengame-list"></div>';

			//存储游戏唯一标识
			box = $(box.replace(/\{selecterVal\}/,'OAS_GAME_Recommend_' + data.gamecode));
			cont.append(box);
			var islast = index == retArr.length - 1 ? true : false;
			var cookiKey = data.gamecode + "_" + GSY.config.get('lang') + '_Games'; 	
			// 当没有推荐服务器信息不处理
			if(GSY.cookie.get(cookiKey) == 0) return;

			//假如推荐服务器缓存信息未过期，读取缓存信息
			if(GSY.cookie.get(cookiKey)){
				var recommendGameData = GSY.gamebox.eval(GSY.cookie.get(cookiKey));
				GSY.gamebox.createRecommendServerCode(data,recommendGameData,box,index,islast);
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
					var retdata = ret.all ? ret.all : ret; 
					var len = retdata.length;
					for(var i = 0 ; i < len ; i++){
						if(retdata[i].recommand == 1)  recommandArr.push(retdata[i]);	
					};
					var item = recommandArr[recommandArr.length-1];
					if(recommandArr.length == 0) GSY.cookie.set(cookiKey,'0',{expires : 2});	
					else {
						var str = GSY.gamebox.jsonTojsonStr(item);
						GSY.cookie.set(cookiKey,str,{expires : 2});
						GSY.gamebox.createRecommendServerCode(data,item,box,index,islast);
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
GSY.gamebox.createRecommendServerCode = function(data,recommendGameData,box,index,islast){
	var html = GSY.gamebox.tpl('hostGameServer'),
		gamePlayStr = OASGetLangVal('Gamebox_PlayGame'),
		dateObj = new Date(parseInt(recommendGameData.start_time)*1000),
		smonth = dateObj.getMonth() + 1,
		sdate = dateObj.getDate();
	smonth = smonth < 10 ? '0' + smonth : smonth;
	sdate = sdate < 10 ? '0' + sdate : sdate;
	//显示全名字
	html = html.replace(/\{game_And_serverName\}/g, data.name + ' (' + recommendGameData.fullname + ')');
	//显示日期
	html = html.replace(/\{startDate\}/g, '');
	//开始玩游戏
	html = html.replace(/\{gamePlay\}/g,gamePlayStr);
	
	//服务器名称
	html = html.replace(/\{servername\}/g,recommendGameData.server_name);

	//游戏名称
	html = html.replace(/\{gameName\}/g,data.name);

	//服务器全名称
	html = html.replace(/\{serverFullName\}/g,recommendGameData.fullname);
	
	//被截取服务器名称
	html = html.replace(/\{showServername\}/g,recommendGameData.server_prex);
	
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

	if(islast){
		$(window).trigger('resize');
	}

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
			var url = data['url'].indexOf('?') > -1 ? recommendGameData['url'] + '&leftbar_collapse=yes' : recommendGameData['url'] + '?leftbar_collapse=yes';
			//增加可扩展参数
			url += GSY.gamebox.getOtherParam(data.gamecode);
			var openGameData = $.extend({},recommendGameData);
			openGameData['gameid'] = data.gamecode;
			openGameData['language'] = GSY.config.get('lang');
			openGameData['url'] = url;
			openGameData['service_area'] = data.name;
			openGameData['gameType'] = 'login';
			//设置特殊游戏类型
			if(GSY.str.cut(data.gamecode,2) == 'le'){
				openGameData['gameType'] = 'u3d';
			}    		
    		//GSY.gamebox.cAjax('WINIE_SetGameMsg',historyData,'设置热门游戏打开游戏存储记录');
			//GSY.gamebox.cAjax('WINIE_MainUserOpenGame',openGameData,'从热门游戏打开游戏');
			
    		GSY.gamebox.cAjaxCallback('WINIE_SetGameMsg',historyData,'设置热门游戏打开游戏存储记录');
			GSY.gamebox.cAjaxCallback('WINIE_MainUserOpenGame',openGameData,'从热门游戏打开游戏');
			GSY.gamebox.uploadLog('PopularGame',{game_code:data.gamecode});			
		}
	});
};

/**
 * [getMiniGamesData description] 生成小游戏列表
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
	var html = '',
		files = GSY.config.get('file');		
	//循环成小游戏列表
	for(var i=0,len=retArr.length;i<len;i++){		
		var data = retArr[i];		

		var temp = GSY.gamebox.tpl('miniGameList');
		//游戏全名称
		temp = temp.replace(/\{fullgameName\}/g,data.name);

		//游戏链接
		temp = temp.replace(/\{url\}/g,data.url.replace('/gamebox/','/'+ files +'/gamebox/'));

		//游戏ID
		temp = temp.replace(/\{gamecode\}/g,data.gamecode);

		//游戏缩略名称
		temp = temp.replace(/\{gameName\}/g,GSY.gamebox.strCut(data.name,24,true));

		//游戏图片地址
		temp = temp.replace(/\{gameNameImageUrl\}/g,data.ico);

		//游戏描述
		temp = temp.replace(/\{gameDesc\}/g,data.description ? data.description : data.name);

		//游戏描述
		temp = temp.replace(/\{gameType\}/g,data.type ? data.type : '');

		//开始游戏
		temp = temp.replace(/\{playGame\}/,OASGetLangVal('Gamebox_PlayGame'));

		html += temp;

	}

	cont.html(html);
	cont.parents('.gb-mingame-list').show();
	$(window).trigger('resize');
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
 * [getGamesData description] 获取游戏中心游戏推广数据
 * @return {[type]} [description]
 */
GSY.gamebox.getGamesData = function(){
	var url = GSY.config.get('getGamesDataUrl');
	GSY.util.echo(url);
	
	//当未获取游戏地址不存在的时候，不处理
	if(!url) return;
	
	var data = {};
	data.position = 'posleft_recommend|posright_hotactive|posright_bighotgames|posright_smallhotgames|posright_smallgames|posright_handgames';
	data.version = GSY.config.get('file');

	//获取页面数据
	GSY.util.ajax({
		url : url,
		data : data,
		success : function(ret){
			GSY.util.echo(ret.data.html,'获取游戏中心游戏推广数据成功！');
			//获取首页新闻数据
			GSY.gamebox.getNewsListData();
			//轮播图
			GSY.gamebox.createBigRecommedGamelists(ret.data.html.posright_bighotgames);

			//创建游戏列表信息
			GSY.gamebox.createGamelists(ret.data.html.posright_smallhotgames);

			//创建手游列表
			GSY.gamebox.createMobileGameLists(ret.data.html.posright_handgames);

			//创建活动列表
			GSY.gamebox.createHotActive(ret.data.html.posright_hotactive);

			//创建小游戏列表
			if(ret.data.lang == 'tr'){
				GSY.gamebox.createMiniGameLists(ret.data.html.posright_smallgames);
			}
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


GSY.gamebox.getNewsListData = function(){
	var lg = GSY.config.get('lang');
	lg = lg == 'br' ? 'pt' : lg;
	//获取页面数据
	GSY.util.ajax({
		url : '//tr.oasgames.com/api/api/list_news?num=8&language='+lg,
		success : function(ret){
			if(ret.status == 'ok'){
				GSY.util.echo(ret.datas,'获取首页新闻数据成功！');
				GSY.gamebox.createNewsList(ret.datas);
			}
		},
		error : function(ret){
			GSY.gamebox.message(OASGetLangVal('Gamebox_Operation_Fail'),'','获取首页新闻数据失败！');		
		}
	})


};

/**
 * [getMiniGamesData description] 生成首页新闻列表
 * @return {[type]} [description]
 */
GSY.gamebox.createNewsList = function(retArr){
	var cont = $('#gb-game-newslist');
	//数据为空的时候处理
	if(!$.isArray(retArr) || retArr.length == 0) {
		cont.css({width:'100%','font-size':'12px'});
		var str = OASGetLangVal('nodata');
		cont.html('<div class="nodata">'+ str +'</div>');
		return false;
	}
	var html = '';	
	//循环成列表
	for(var i=0,len=retArr.length;i<len;i++){		
		var data = retArr[i];
		html += '<a target="_blank" href="'+ data.news_link +'" title="'+ data.news_name +'">'+ GSY.gamebox.strCut(data.news_name,34,true) +'</a>';
	}

	cont.html(html);
	$('#gb-game-newslist').on('click','a',function(){
        GSY.gamebox.uploadLoginLog({
            'uuid': GSY.gamebox.mainUserId,
            'event': 'newevents'
        });  
	});

};


//loginKey登录成功
////passport.oasgames.com/index.php?m=getLoginUser&oas_user=76854227c9bbd35e8374bc101ca0e759
//生成一个体验账号
GSY.gamebox.createTryUser = function(callback){
	GSY.util.ajax({
		url:'//passport.oasgames.com/?m=tryPlay',
		data:{ref:'oasplayer',uc_key:'5396ff4d756b2dd95e80c05caa6f64ac'},
        success : function(ret){
            if(ret.status == 'ok'){          	
            	callback(ret);
            }
        },
        timeout:60000,
        error : function(ret){}
	})
};
//验证体验账号
GSY.gamebox.getUserData = function(token,callback,status){
	var playertype = GSY.util.getUrlParam('playertype');
    GSY.util.ajax({
        url : '//passport.oasgames.com/index.php?m=getLoginUser',
        data : {oas_user : token},
        success : function(ret){
            if(ret.status == 'ok'){
            	if(playertype == 'tiyanversion' && status){
		            GSY.gamebox.uploadLoginLog({
		                'uuid': ret.val.id,
		                'event': 'webmainlogin',
		                'type': 'traveler',
            			'async': 'false'
		            });             		
            	}
            	callback(ret);             	         	
            }else{
            	if(playertype == 'tiyanversion'){
            		GSY.gamebox.createTryUser(callback);
            	}
            }  
        },
        timeout:60000,
        error : function(ret){}
    });
};


/**
 * [description] 初始化页面数据
 * @return {[type]} [description]
 */
$(function(){
	var playertype = GSY.util.getUrlParam('playertype'),
		token = GSY.util.getUrlParam('token'),
		gamecode = GSY.config.get('gamecode');


	GSY.gamebox.mainUserId = '000000000000000';
	//如果是体验版本
	if(playertype == 'tiyanversion'){
		if(token && token.length){
			GSY.gamebox.getUserData(token,function(ret){
				GSY.gamebox.mainUserId = ret.val.id;
				GSY.gamebox.cAjax('WINIE_UpdataTokenOfRemote',{token:ret.val.loginKey,uid:ret.val.id},'储存试玩token');			
			},true);

		}else{
			GSY.gamebox.createTryUser(function(ret){
				GSY.gamebox.mainUserId = ret.val.id;
				GSY.gamebox.cAjax('WINIE_UpdataTokenOfRemote',{token:ret.val.loginKey,uid:ret.val.id},'储存试玩token');			
			});
			return;
		}
	}	


	//设置用户名
	//GSY.gamebox.setUserName();
	//初始化页面游戏数据
	GSY.gamebox.getGamesData();
	//创建用户玩页游历史记录
	
	if(token && token.length){
		if(GSY.gamebox.mainUserId == '000000000000000'){
			GSY.gamebox.getUserData(token,function(ret){
				GSY.gamebox.mainUserId = ret.val.id;
			},false);					
		}
		GSY.gamebox.initHistoryList();
		//GSY.gamebox.cAjaxCallback('WINIE_GameListIni',{callback:GSY.gamebox.createGameHistory},'初始化最近玩过游戏记录');
		

		//两分钟重新获取一次数据
		/*setInterval(function(){
			GSY.gamebox.initHistoryList();
			//GSY.gamebox.cAjaxCallback('WINIE_GameListIni',{callback:GSY.gamebox.createGameHistory},'初始化最近玩过游戏记录');
		},120000);*/

		//第一次打开游戏
	}else{
		GSY.gamebox.createGameHistory('[]');	
	}
	//登录版或者体验版登录完成打开游戏
	GSY.gamebox.getLocalGameData({key:'OAS_GAME_first_open'},function(ret){
		if($.isEmptyObject(ret)){
			if((gamecode !== "mingame"+ GSY.config.get('lang') || gamecode !== '11oyun') && token && (playertype == 'logingame' || playertype == 'tiyanversion')){
				var retdata = LANG.gameConfig[gamecode];
				if(!$.isEmptyObject(retdata)){
					var post = {name:retdata.name,gamecode:gamecode}
					GSY.gamebox.playGame(post);
					if(playertype == 'tiyanversion'){
						GSY.gamebox.cAjax('WINIE_TiyanLoginOK',null,'体验版打开游戏通知客户端');
					}
					GSY.gamebox.setLocalGameData({key : 'OAS_GAME_first_open',value:{isopen:true}});
				}
			}
		}		
	});

	
	//未登录版点击游戏登录完成打开游戏
	$(window).on('load',function(){
		//页面加载后再加载右侧滚动条
		scrollRight.move(0);
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













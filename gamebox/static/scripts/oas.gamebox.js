// JavaScript Document

 //初始化
var mData = window.mData || [];

;(function(d){
    var js,id='cxg-mdatasdk',ref=d.getElementsByTagName('script')[0];
    if(d.getElementById(id)){return;};
    js=d.createElement('script');
    js.id=id;
    js.async=true;
    js.src="//cdn.gooogleyahooo.net/static/package/md.js?version=" + GSY.config.get('version');
    ref.parentNode.insertBefore(js,ref);
}(document));

//用于线下调试，设置debug模式。默认不设置debug.
//mData.push(['debug', false]); 

//默认方法 setAPP 设置app名 必须提供
mData.push(['setAPP', 2040143943]); 

//创建游戏盒子命名空间
GSY.namespace('GSY.gamebox');
GSY.config.set('gamecode',GSY.util.getUrlParam('gameid'));
GSY.config.set('token',GSY.util.getUrlParam('token'));
GSY.config.set('lang',GSY.util.getUrlParam('lg'));
GSY.config.set('getUidUrl','//odp.oasgames.com/api/?m=user.getLoginUser'); //获取用户uid交互地址
GSY.config.set('getAdsUrl','//plugins.oasgames.com/lunbo/weget/api.php?type=1'); //获取游戏焦点图
GSY.config.set('getNewsUrl','//odp.oasgames.com/api/'); //获取游戏最新新闻
GSY.config.set('activeGame',LANG[GSY.config.get('lang')]['Gamebox_gamelist'][GSY.config.get('gamecode')]);
GSY.config.set('gameList',LANG[GSY.config.get('lang')]['Gamebox_gamelist']);
GSY.config.set('getServerListUrl',GSY.config.get('activeGame').getServerlist); //服务器列表交互地址
GSY.config.set('staticHost',GSY.config.get('host') + 'gamebox/static/');
GSY.config.set('path',GSY.config.get('host') + 'gamebox/template/{pagename}.html');



/**
 * [tpl description] 模板文件
 * @param  {[type]} key [description]
 * @return {[type]}     [description]
 */
GSY.gamebox.tpl = function(key){
	var tpl = {
		/**
		 * [news description] 登陆器新闻列表模板
		 * @return {[type]} [description]
		 */
		news : function(){
			var html = '<li><a href="{url}" target="_blank" title="{title}"><em></em><span>{title}</span></a></li>';
			return html;
		},

		/**
		 * [ads description] 登陆器轮播图模板
		 * @return {[type]} [description]
		 */
		ads : function(){
			var html = '<li style="display:none"><a href="{url}" target="_blank"><img src="{image_url}" alt="{desc}"></a></li>';
			return html;
		},

		/**
		 * [userlist description] 账号多开页面用户列表模板
		 * @return {[type]} [description]
		 */
		userlist : function(){
			var html = '<div class="gb-accountslist-list" data-post="{dataPost}">';
				html+= '	<div data-selecter="delete" onclick="GSY.gamebox.delUserList($(this),event);" class="gb-accountslist-delete"><a href="javascript:void(0);" class="gb-i gb-delete"></a></div>';
				html+= '	<div class="gb-accountslist-list-t">';
				html+= '		<span data-selecter="noconfirm" class="gb-accountslist-check"><i class="gb-i gb-noconfirm"></i></span>';
				html+= '		<span class="gb-accountslist-name" title="{gameFullDesc}"><em>{gameDesc}</em><input maxlength="20" style="display:none" name="" value=""></span>';
				html+= '		<span data-selecter="edit" data-status="false" onclick="GSY.gamebox.changeDiscrition($(this),event);" class="gb-accountslist-edit"><i class="gb-i gb-edit"></i></span>';
				html+= '	</div>';
				html+= '	<ul class="gb-accountslist-list-c" onclick="GSY.gamebox.oneClickGoPlayGameCode($(this).closest(\'.gb-accountslist-list\'));">';
				html+= '		<li>{gameType}</li>';
				html+= '		<li title="{gameFullContent}">{gameContent}</li>';
				html+= '		<li>{gameLastServer}</li>';
				html+= '	</ul>';
				html+= '</div>';
			return html;
		},

		/**
		 * [gameslist description] 游戏列表模板
		 * @return {[type]} [description]
		 */
		gameslist : function(){
			var html = '<div  class="gb-games-lists-box" onclick="GSY.gamebox.playGame($(this),2);return false;" data-post="{post}">';
				html+= '	<div class="gb-games-lists-cont">';
				html+= '		<div class="gb-games-lists-cont-img"><img alt="{gameName}" src="{gameNameImageUrl}"></div>';
				html+= '		<div class="gb-games-lists-cont-mask" style="bottom:-140px;">';
				html+= '			<div class="gb-games-lists-cont-desc">{gameDesc}</div>';
				html+= '			<div class="gb-games-lists-cont-btn"><a href="javascript:void(0)" class="gb-btn-green"><span><em>{playGame}</em></span></a></div>';
				html+= '		</div>';
				html+= '	</div>';
				html+= '	<div class="gb-games-lists-other">';
				html+= '		<em class="gb-game-list-c-name">{gameName}</em>';
				html+= '		<em class="gb-game-list-c-type">{gameType}</em>';
				html+= '	</div>';
				html+= '</div>';
			return html;

		},

		/**
		 * [gameHistory description] 历史记录列表模板
		 * @return {[type]} [description]
		 */
		gameHistory : function(){
			var html = '<div class="gb-gamebox-history-list">';
				html+= '	<a href="javascript:void(0);" title="{gameName}" onclick="GSY.gamebox.getGameHistoryPlayGame($(this));return false;" data-post="{post}">';
				html+= '		<img src="{url}" alt="{gameName}" />';
				html+= '		<span>';
				html+= '			<em>{gameName}</em>';
				html+= '			<em class="gb-gamebox-history-fullname">{fullname}</em>';
				html+= '		</span>';
				html+= '	</a>';
				html+= '</div>';
			return html;
		},

		/**
		 * [hostGameServer description] 热门游戏服务器列表模板
		 * @return {[type]} [description]
		 */
		hostGameServer : function(){
			var html = '<div class="gb-left-recommengame-small" title="{game_And_serverName}">';
				html+= '	<div class="gb-left-recommengame-l"><img src="{icon}" alt="{game_And_serverName}" /></div>';
				html+= '	<div class="gb-left-recommengame-r"><h1>{gameName}</h1><p>{serverFullName}</p></div>';
				html+= '</div>';
				html+= '<div class="gb-left-recommengame-big" style="display:none;" title="{game_And_serverName}">';
				html+= '	<img src="{imageUrl}" alt="{servername}" />';
				html+= '	<span>';
				html+= '		<em class="gb-strong">{showServername}</em>';
				html+= '		<em class="gb-button">{gamePlay}</em>';
				html+= '	</span>';
				html+= '</div>';

			return html;
		}
	}
	return tpl[key]();
};


/**
 * [arrTojsonStr description] 把特定数组转成特定json格式字符串
 * @param  {[array]} arr [description] 需要转化的数组 [['key1',"val1"],['key2',"val2"]]
 * @return {[string]}     [description] 返回字符串 '{"key1":"val1","key2":"val2"}'
 */
GSY.gamebox.arrTojsonStr = function(arr){
	var str = '',len = arr.length;
	str += "{";
	for(var i = 0 ; i < len ; i++){
		var tempArr = arr[i];
		if(i == 0) str += '"' + tempArr[0] +'":"' +	tempArr[1] + '"';
		else  str += ',"' + tempArr[0] +'":"' +	tempArr[1] + '"';

	}
	str += "}";
	return str;
};

/**
 * [jsonToArray description] 把json转成特定数组
 * @param  {[object]} json [description] {"key1":"val1","key2":"val2"}
 * @return {[type]}      [description] [['key1',"val1"],['key2',"val2"]]
 */
GSY.gamebox.jsonToArray = function(json){
	var arr = [];
	for(var key in json){
		var tempArr = [];
		tempArr.push(key);
		tempArr.push(json[key]);
		arr.push(tempArr);
	}
	return arr;
};

/**
 * [jsonToPostStr description] 把json转成特定的传输数据字符串
 * @param  {[type]} json [description] {"key1":"val1","key2":"val2"}
 * @return {[type]}      [description] 'key1=val1&=key2=val2'
 */
GSY.gamebox.jsonToPostStr = function(json){
	var str = '' , i = 0;
	for(var key in json) {
		if(i == 0) str += key + '=' + json[key];
		else str += '&' + key + '=' + json[key];
		i++;
	}
	return str;
};

/**
 * [jsonToPostStr description] 把json转成特定的特定json格式字符串
 * @param  {[type]} json [description] {"key1":"val1","key2":"val2"}
 * @return {[type]}      [description]'{"key1":"val1","key2":"val2"}'
 */
GSY.gamebox.jsonTojsonStr = function(json){

	//当前浏览器为高级浏览器的时候
	if(typeof JSON != 'undefined' && typeof JSON.stringify == 'function'){
		return JSON.stringify(json);	
	}

	/*当前浏览器为低级浏览器时候处理
	var str = '{' , i = 0;
	for(var key in json) {
		if(json[key].indexOf('"') != -1){
			val = json[key].replace(/\"/g,'"');
		} else{
			var val = json[key];
		}

		if(i == 0) str += '"' + key + '":"' + val + '"';
		else str += ',"' + key + '":"' + val + '"';
		i++;
	}
	str += '}';
	return str;*/
};


/**
 * [eval description] 转化特定字符为json对象
 * @param  {[string]} str [description] 需要转化的字符串 '{"key1":"val1","key2":"val2"}'
 * @return {[object]} [description] json对象 {"key1":"val1","key2":"val2"}
 */
GSY.gamebox.eval = function(str){
	var json = eval("(" + str +")");
	return json;
};


/**
 * [strCut description] 指定截取字符串长度(区分中英文)
 * @param  {[string]} str [description] 需要截取的字符串
 * @param  {[number]} len [description] 需要截取的字符长度
 * @return {[type]}     [description] 新的字符串长度
 */
GSY.gamebox.strCut = function(str,len,type) {
	if(type != undefined) var fix = '...';
	else  var fix = '';
	var wlen = str.length,newstr = '';
	if(wlen > len){
		newstr = str.slice(0,len) + fix;
	}else{
		newstr = str;	
	}
	return newstr;
};

/**
 * [cAjax description] 与c++接口交互数据统一处理
 * @param  {[type]} Fname   [description] c++方法名字
 * @param  {[type]} desc    [description] 描述
 * @param  {[object or string]} options [description] 交互传数据
 * @return {[type]}         [description]
 */
GSY.gamebox.cAjax = function(Fname,options,desc){
	
	//打印日志
	var tempStr = 'JS开始与C++交互操作描述->' +  desc + '\n' + '方法名字：' + Fname;
	GSY.util.echo(tempStr);	

	

	//与c++接口交互数据
	if(typeof options == 'string'){ 
		//交互传数据：string
		GSY.util.echo(options,'JS与' + Fname + '参数');
		if(typeof window.external != undefined) window.external[Fname](options);	
	}else if($.isEmptyObject(options)) { 
		//交互传数据：object为空
		GSY.util.echo('JS与' + Fname + '无参数参数');
		if(typeof window.external != undefined) window.external[Fname]();
	}else{	
		//交互传数据：object 
		//alert('has')
		var str = GSY.gamebox.jsonTojsonStr(options);
		GSY.util.echo(str,'JS与' + Fname + '参数');
		if(typeof window.external != undefined) window.external[Fname](str);	
	}
}


/**
 * [message description] 调用提示信息框
 * @param  {[type]}   message  [description] 提示信息字符串
 * @param  {Function} callback [description] 确认回调方法（可选）
 * @return {[type]}            [description]
 */
GSY.gamebox.message = function(message,callback){
	if(GSY.config.get('debug')){
		var tempArr = window.location.pathname.split('/');
		var fix = 'Page=>' + tempArr[tempArr.length -1]  + '\n' + 'message=>';
	}else{
		var fix = '';
	}
	if(callback == undefined) var str = '{"message":"'+ fix + message +'"}';	
	else var str = '{"message":"'+ fix + message +'","callback":"'+ callback +'"}';
	if(typeof window.external != undefined) window.external.WINIE_ShowMsgBox(str);	
};

/**
 * [uploadLog description] 上报用户操作日志
 * @return {[type]} [description]
 */
GSY.gamebox.uploadLog = function(mainParma,subParma){
	if(subParma == undefined || $.isEmptyObject(subParma)) var data = {'event' : mainParma};
	else var data = {'event' : mainParma , params : subParma};
	GSY.gamebox.cAjax('WINIE_PingBackWeb',data,'前端上报用户操作日志');
}



/**
 * [getUserId description] 获取用户uid
 * @param  {[string]}   token     [description] token
 * @param  {[string]}   game_code [description] 游戏唯一标识
 * @param  {Function} callback  [description]  回调方法
 * @return {[type]}             [description]
 */
GSY.gamebox.getUserId = function(token,game_code,callback){
	var url = GSY.config.get('getUidUrl');
	GSY.util.ajax({
		url : url,
		type : 'get',
		data : {token:token,game_code:game_code},
		success : function(ret){
			if(ret.status == 'ok'){
				 if(typeof callback == 'function') callback(ret.uid);	
			}else{
				//上报日志
				GSY.gamebox.message(OASGetLangVal('Gamebox_Operation_Fail'),'','获取游戏中心推广数据失败！');	
				GSY.gamebox.uploadLog('GetErrorTime',{'gameid':game_code,'errInfo':OASGetLangVal('Gamebox_Operation_Fail')});		
			}
		},
		error : function(){
			//上报日志
			GSY.gamebox.message(OASGetLangVal('Gamebox_Operation_Fail'),'','获取游戏中心推广数据失败！');	
			GSY.gamebox.uploadLog('GetErrorTime',{'gameid':game_code,'errInfo':OASGetLangVal('Gamebox_Operation_Fail')});		
		}
	});
} 


/**
 * [uploadLog description] 上报用户登录日志
 * @return {[type]} [description]
 */
GSY.gamebox.uploadLoginLog = function(json){ 
	var _gameid = GSY.config.get('gamecode');
	var _version = '';
	var _locale = GSY.config.get('lang');
	var data = {
		"async":json.async,
		"channel": '',
	    "uuid":json.uuid,
	    "locale":_locale,
	    "version":_version,
	    "status":{"gameid":_gameid},
	    "params":{}
	};
	if(json.type){
		data.params.type = json.type;
	}
	mData.push(['send',json['event'],data]);
}
/**
 * [description] 统一打目标页面地址
 * @return {[type]} [description]
 */
$(function(){
	GSY.util.echo();
});










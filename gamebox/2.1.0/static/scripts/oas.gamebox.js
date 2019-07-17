// JavaScript Document


 //初始化
var mData = window.mData || [];

;(function(d){
    var js,id='cxg-mdatasdk',ref=d.getElementsByTagName('script')[0];
    if(d.getElementById(id)){return;};
    js=d.createElement('script');
    js.id=id;
    js.async=true;
    js.src="https://img.oasgames.com/upload/1545972729/md.js?version=" + GSY.config.get('version');
    ref.parentNode.insertBefore(js,ref);
}(document));

//用于线下调试，设置debug模式。默认不设置debug.
//mData.push(['debug', false]); 

//默认方法 setAPP 设置app名 必须提供
mData.push(['setAPP', 2040143943]); 
//创建游戏盒子命名空间
GSY.namespace('GSY.gamebox');

/**
 * [getVerion description]  获取版本号
 * @param  [type] $v [description]
 * @return [type]    [description]
 */
GSY.gamebox.getVerion = function(v){
    var arr = v.split("."),
    	len = arr.length,
    	str = '';
    if(len>0){
    	for(var i=0;i<len-1;i++){
	    	str+=arr[i]+'.';
	    }
	    str = str.substr(0,str.length-1);
    } 
	var _thisUIStyle = '2.1.0',
		_thisUIRange = '2.1.0,2.1.1';
	if(_thisUIRange.indexOf(str) > -1){
		str = _thisUIStyle;
	}     
    return  str;
};
var defualtNewsUrl = '//odp.oasgames.com/api/';
var newsUrl = (typeof gameInfo != 'undefined' && gameInfo.getNewsUrl ) ? gameInfo.getNewsUrl : defualtNewsUrl;


var _version = GSY.gamebox.getVerion(GSY.util.getUrlParam('version'));
GSY.config.set('file',_version);
GSY.config.set('smallgamefile',_version);
GSY.config.set('gamecode',GSY.util.getUrlParam('gameid'));
GSY.config.set('lang',GSY.util.getUrlParam('lg'));
GSY.config.set('staticHost',GSY.config.get('host') + 'gamebox/static/');
GSY.config.set('path',GSY.config.get('host') + 'gamebox/'+ _version +'/template/{pagename}.php');
GSY.config.set('getAdsUrl','//plugins.oasgames.com/lunbo/weget/api.php?type=1'); //获取游戏焦点图
GSY.config.set('getNewsUrl', newsUrl); //获取游戏最新新闻
GSY.config.set('getUidUrl','//odp.oasgames.com/api/?m=user.getLoginUser'); //获取用户uid交互地址


	

//公共url参数
GSY.config.set('comGameParam',{});
//游戏私有url参数
GSY.config.set('selGameParam',{
	lotr : {},
	lobr : {},
	locn : {},
	lopt : {},
	lopl : {},
	loes : {},
	lode : {},
	loel : {},
	losv : {},
	lonl : {}
});






//线下模式
if(GSY.config.get('debug')){

	//posleft_recommend 推荐游戏服务器
	//posright_hotactive 热门活动
	//posright_bighotgames 热门广告游戏列表  
	//posright_smallhotgames 游戏列表 
	GSY.config.set('getGamesDataUrl','//admgbox.oasgames.com/api/game.php?lang=' + GSY.config.get('lang'));//获取游戏中心游戏推广数据链接地址
	GSY.config.set('getAdsDataUrl','//admgbox.oasgames.com/api/ad.php?lang=' + GSY.config.get('lang')); //获取游戏广告地址
	//GSY.config.set('getRecommendGamesDataUrl','//api.11oyun.com/gamebox.php?lang=' + GSY.config.get('lang')); //获取小游戏推荐游戏地址
	GSY.config.set('searchMiniGame','//api.11oyun.com/'+ GSY.config.get('smallgamefile') +'/gameboxsearch.php?lang=' + GSY.config.get('lang')); //搜索小游戏列表
	


//线上模式
}else{

	//posleft_recommend 推荐游戏服务器
	//posright_hotactive 热门活动
	//posright_bighotgames 热门广告游戏列表  
	//posright_smallhotgames 游戏列表 
	GSY.config.set('getGamesDataUrl','//admgbox.oasgames.com/api/game.php?lang=' + GSY.config.get('lang'));//获取游戏中心游戏推广数据链接地址
	GSY.config.set('getAdsDataUrl','//admgbox.oasgames.com/api/ad.php?lang=' + GSY.config.get('lang')); //获取游戏广告地址
	//GSY.config.set('getRecommendGamesDataUrl','//api.11oyun.com/gamebox.php?lang=' + GSY.config.get('lang')); //获取小游戏推荐游戏地址
	GSY.config.set('searchMiniGame','//api.11oyun.com/'+ GSY.config.get('smallgamefile') +'/gameboxsearch.php?lang=' + GSY.config.get('lang')); //搜索小游戏列表
}


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
			var html = '<li><a href="{url}" target="_blank" title="{fullTitle}"><em></em><span>{title}</span></a></li>';
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
			var html = '<div class="gb-accountslist-list" data-confirm="true" data-running="false" data-main="false">';
				html+= '	<em class="datapost" style="display:none">{dataPost}</em>';
				html+= '	<div data-selecter="delete" onclick="GSY.gamebox.delUserList($(this),event);" class="gb-accountslist-delete"><a href="javascript:void(0);" class="gb-i gb-delete"></a></div>';
				html+= '	<div class="gb-accountslist-list-t">';
				html+= '		<span data-selecter="noconfirm" class="gb-accountslist-check"><i class="gb-i gb-confirm"></i></span>';
				html+= '		<span class="gb-accountslist-name"><em>{gameDesc}</em><i style="display:none">{gameFullDesc}</i><input maxlength="20" style="display:none" name="" value=""></span>';
				html+= '		<span data-selecter="edit" data-status="false" onclick="GSY.gamebox.changeDiscrition($(this),event);" class="gb-accountslist-edit"><i class="gb-i gb-edit"></i></span>';
				html+= '	</div>';
				html+= '	<ul class="gb-accountslist-list-c" onclick="GSY.gamebox.oneClickGoPlayGameCode($(this).closest(\'.gb-accountslist-list\'),true);">';
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
			var html = '<div  class="gb-games-lists-box" data-type="webgame" data-selecter="{selecterVal}"  data-post="{post}">';
				html+= '	<div class="gb-games-lists-bg"><div class="gb-games-lists-cont">';
				html+= '		<div class="gb-games-lists-cont-img">';
				html+= '			<img alt="{gameName}" src="{gameNameImageUrl}">';
				html+= '			<div class="gb-games-lists-other">';
				html+= '				<em class="gb-game-list-c-name">{gameName}</em>';
				html+= '				<em class="gb-game-list-c-type">{gameType}</em>';
				html+= '			</div>';
				html+= '		</div>';
				html+= '		<div class="gb-games-lists-cont-mask">';
				html+= '			<div class="gb-games-lists-cont-desc">{gameDesc}</div>';
				html+= '			<div class="gb-games-lists-cont-btn">'
				html+= '				<a href="javascript:void(0)" class="gb-btn-start-play"><span><em>{playGame}</em></span></a>'
				html+= '				<a href="{websiteUrl}" target="_blank" class="gb-btn-in-website"><span><em>{website}</em></span></a>'
				html+= '			</div>';
				html+= '		</div>';
				html+= '	</div></div>';
				html+= '</div>';
			return html;

		},

		/**
		 * [gameslist description] 手游模板
		 * @return {[type]} [description]
		 */
		mobileGameslist : function(){
			var html = '<div class="gb-games-lists-box" data-type="mobile">';
				html+= '	<div class="gb-games-lists-bg"><div class="gb-games-lists-cont">';
				html+= '		<div class="gb-games-lists-cont-img">';
				html+= '			<a href="{url}" target="_blank"><img alt="{gameName}" src="{gameNameImageUrl}"></a>';
				html+= '			<div class="gb-games-lists-other">';
				html+= '				<p class="gb-game-list-c-name">{gameName}</p>';
				html+= '				<em class="gb-game-list-{apple}-type"></em>';
				html+= '				<em class="gb-game-list-{android}-type"></em>';				
				html+= '			</div>';
				html+= '		</div>';
				html+= '		<div class="gb-games-lists-cont-mask">';
				html+= '			<div class="gb-games-lists-cont-code"><a target="_blank" href="{url}"><img alt="{gameName}" src="{gameCodeImageUrl}"></a></div>';
				html+= '		</div>';
				html+= '	</div></div>';
				html+= '</div>';
			return html;

		},

		/**
		 * [gameslist description] 小游戏列表模板
		 * @return {[type]} [description]
		 */
		miniGameList : function(){
			var html = '<div class="gb-mingame-list-box" data-url="{url}" data-gamecode="{gamecode}" title="{fullgameName}">';
				html+= '	<div class="gb-mingame-list-bg"><div class="gb-mingame-list-cont">';
				html+= '		<div class="gb-mingame-list-cont-img">';
				html+= '			<img alt="{fullgameName}" src="{gameNameImageUrl}">';
				html+= '	        <div class="gb-mingame-list-other">';
				html+= '		        <em class="gb-mingame-list-c-name">{gameName}</em>';
				html+= '		    	<em class="gb-mingame-list-c-type">{gameType}</em>';
				html+= '			</div>';
				html+= '        </div>';
				html+= '		<div class="gb-mingame-list-cont-mask">';
				html+= '			<div class="gb-mingame-list-cont-desc">{gameDesc}</div>';
				html+= '			<div class="gb-mingame-list-cont-btn"><a href="javascript:void(0)" class="gb-btn-start-play"><span><em>{playGame}</em></span></a></div>';
				html+= '		</div>';
				html+= '	</div></div>';
				html+= '</div>';
			return html;

		},

		/**
		 * [gameHistory description] 历史记录列表模板
		 * @return {[type]} [description]
		 */
		gameHistory : function(){
			var html = '<div class="gb-gamebox-history-list">';
				html+= '	<div class="gb-gamebox-history-box">';
				html+= '		<a href="javascript:void(0);" title="{gameName}" onclick="GSY.gamebox.fromGameHistoryPlayGame($(this));return false;" data-post="{post}">';
				html+= '			<img src="{url}" alt="{gameName}" />';
				html+= '			<span>';
				html+= '				<em>{gameName}</em>';
				html+= '				<em class="gb-gamebox-history-fullname">{fullname}</em>';
				html+= '			</span>';
				html+= '		</a>';
				html+= '		<i class="gb-gamebox-history-btn" onclick="GSY.gamebox.delHistoryList($(this),event);"></i>';
				html+= '	</div>';
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
				html+= '	<div class="gb-left-recommengame-r"><h1><span class="gb-left-recommengame-title">{gameName}</span><span class="gb-left-recommengame-date">{startDate}</span></h1><p>{serverFullName}</p></div>';
				html+= '</div>';
				html+= '<div class="gb-left-recommengame-big" style="display:none;" title="{game_And_serverName}">';
				html+= '<i class="gb-left-recommengame-big-tips"></i>'
				html+= '	<img src="{imageUrl}" alt="{servername}" />';
				html+= '	<span>';
				html+= '		<em class="gb-strong">{showServername}</em>';
				html+= '		<em class="gb-button">{gamePlay}</em>';
				html+= '	</span>';
				html+= '</div>';
			return html;
		},

		/**
		 * [loginlist description] oas账号登录列表
		 * @return {[type]} [description]
		 */
		 loginlist : function(){
		 	var html = '<li data-index="{dataIndex}" data-name="{dataName}" data-post="{dataPost}" onclick="GSY.gamebox.selectLoginUser($(this),event)">';
		 		html += '	<i onclick="GSY.gamebox.deleteLoginUser($(this),event)"></i>';
		 		html += '	<span>{useName}</span>';		 		
		 		html += '</li>'
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
};


/**
 * [eval description] 转化特定字符为json对象
 * @param  {[string]} str [description] 需要转化的字符串 '{"key1":"val1","key2":"val2"}'
 * @return {[object]} [description] json对象 {"key1":"val1","key2":"val2"}
 */
GSY.gamebox.eval = function(str){
	if(!str) return false;
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
 * [cAjax description] 与c++接口交互数据统一处理(调用C++方法)
 * @param  {[type]} Fname   [description] c++方法名字
 * @param  {[type]} desc    [description] 描述（调试用）
 * @param  {[object or string]} options [description] 交互传数据
 * @return {[type]}         [description]
 */
GSY.gamebox.cAjax = function(Fname,options,desc){
	//打印日志
	var tempStr = 'JS开始与C++交互操作描述->' +  desc + '\n' + '方法名字：' + Fname;
	//GSY.util.echo(tempStr);	
	//与c++接口交互数据
	try{
		if(typeof options == 'string'){ 
			//交互传数据：string
			GSY.util.echo(options,'JS与' + Fname + '参数111');
			if(typeof window.external != undefined) window.external[Fname](options);	
		}else if($.isEmptyObject(options)) { 
			//交互传数据：object为空
			GSY.util.echo('JS与' + Fname + '无参数222');
			if(typeof window.external != undefined) window.external[Fname]();  
	
		}else{
			var json = options; 
			for(var key in options){
				if(key == 'callback'){
					json[key] = options[key];	
					continue;
				}
				if(typeof options[key] == 'object'){
					json[key]=Base64.encode(GSY.gamebox.jsonTojsonStr(options[key]));	
				}else if(typeof options[key] == 'boolean' || typeof options[key] == 'number'){
					json[key] = Base64.encode(options[key].toString());
				}else{
					json[key]= Base64.encode(options[key]);	
				}
			}
			GSY.util.echo(options,'JS与' + Fname + '参数333=>'+typeof options);
			var str = GSY.gamebox.jsonTojsonStr(json);
			if(typeof window.external != undefined) window.external[Fname](str);			
		}
	}catch(error){
		GSY.util.echo(error);	
	}
};

/**
 * [cAjax description] 与c++接口交互数据统一处理(调用C++方法非加密)
 * @param  {[type]} Fname   [description] c++方法名字
 * @param  {[type]} desc    [description] 描述（调试用）
 * @param  {[object or string]} options [description] 交互传数据
 * @return {[type]}         [description]
 */
GSY.gamebox.cAjaxNo = function(Fname,options,desc){
	
	//打印日志
	var tempStr = 'JS开始与C++交互操作描述->' +  desc + '\n' + '方法名字：' + Fname;
	//GSY.util.echo(tempStr);	

	//与c++接口交互数据
	try{
		if(typeof options == 'string'){ 
			//交互传数据：string
			GSY.util.echo(options,'JS与' + Fname + '参数111');
			if(typeof window.external != undefined) window.external[Fname](options);	
		}else if($.isEmptyObject(options)) { 
			//交互传数据：object为空
			GSY.util.echo('JS与' + Fname + '无参数222');
			if(typeof window.external != undefined) window.external[Fname]();  
		}else{
			var json = options; 
			GSY.util.echo(options,'JS与' + Fname + '参数333=>'+typeof options);
			var str = GSY.gamebox.jsonTojsonStr(json);
			if(typeof window.external != undefined) window.external[Fname](str);		
		}
	}catch(error){
		GSY.util.echo(error);	
	}
};
/**
 * [cAjaxCallback description] 带有回调函数的与C++接口交互数据
 * @param  {[type]} Fname   [description]
 * @param  {[type]} options [description]
 * @param  {[type]} desc    [description]
 * @return {[type]}         [description]
 */
GSY.gamebox.cAjaxCallback = function(Fname,options,desc){
	//有回调方法
	var param = {};
	if(typeof options.callback == 'function'){
		param = {};
		for(var key in options){
			if(key == 'callback') {
				continue;
			}else {
				param[key] = options[key];
			}
		}
		//随机种子
		var random =  GSY.util.random(100000,999999) + '_' + GSY.util.random(1000000,9999999) + '_' + (new Date()).getTime();
		window['OASCAjax_' + random] = function(ret){
			if(typeof ret == 'string'){
				ret = GSY.gamebox.eval(ret);
			}
			var json = ret;
			if(typeof ret == 'object'){
				if(ret.length){
					for(var i=0;i<ret.length;i++){
						GSY.util.echo(ret[i],'回调函数=>解码前=>'+desc+'=>'+typeof ret+'      i=>'+i);
						for(var key in ret[i]){
							if(key=='callback'){
								json[i][key]=ret[i][key];	
							}
							if(typeof ret[key] == 'object'){
								json[key]=ret[key];	
							}else{							
								json[i][key]=Base64.decode(ret[i][key]);	
							}						
						}
						GSY.util.echo(json[i],'回调函数=>解码后=>'+desc+'=>'+typeof json[i]);  
					}
				}else{
					GSY.util.echo(ret,'回调函数=>解码前=>'+desc+'=>'+$.isEmptyObject(ret[key])+'      length=>'+ret.length);
					
					for(var key in ret){
						if(key=='callback'){
							json[key]=ret[key];	
						}
						if(typeof ret[key] == 'object'){
							json[key]=ret[key];	
						}else{
							json[key]=Base64.decode(ret[key]);	
						}					
					}
					GSY.util.echo(json,'回调函数=>解码后=>'+desc+'=>'+typeof json);  
				} 
			}	
			
			options.callback(json);
			window['OASCAjax_' + random] = null;
		};
		param['callback'] = 'OASCAjax_' + random;
	//无回调方法
	}else{
		param = $.extend({},options);
	}
	GSY.gamebox.cAjax(Fname,param,desc);
};

GSY.gamebox.innerDecode = function(item){

}


/**
 * [message description] 调用提示信息框
 * @param  {[string]}   message  [description] 提示信息字符串
 * @param  {[string]} 	callback [description] 确认回调方法（可选）
 * @param  {]string]}	desc [description] 位置描述（调试用）
 * @return {[type]}            [description]
 */
GSY.gamebox.message = function(message,callback,desc){
	
	//当callback传入的是字符串
	
	
	/*if(typeof callback == 'string'){
		if(typeof eval(callback) == 'function') {
			var param = {message : message , callback : callback}
		}else{
			var param = {message : message}
		}	
	
	//当callback传入的是回调函数
	}else if(typeof callback == 'function'){
		
		//随机种子
		var random = GSY.util.random(100000,999999) + '_' + GSY.util.random(1000000,9999999) + '_' + (new Date()).getTime();

		//创建回调方法
		window['OASMessage_' + random] = function(status){
			if(typeof callback == 'function') {
				callback(status);
				window['OASMessage_' + random] = null;
			}
		}

		//参数
		var param = {message : message , callback:'OASMessage_' + random}
	
	//只是提示框信息
	}else {
		var param = {message : message}
	}
	//GSY.gamebox.cAjaxCallback('WINIE_ShowMsgBox',param,desc?desc:'ShowMsgBox');
	*/
	var param = {message : message , callback : callback}
	//GSY.util.echo(param,'调函数111WINIE_ShowMsgBox=>'+typeof callback);
	GSY.gamebox.cAjaxCallback('WINIE_ShowMsgBox',param,desc?desc:'ShowMsgBox');
};

//GSY.gamebox.message('测试方法',function(status){alert(status)},'丫丫配的');

/**
 * [confirm description] 调用确认信息框
 * @param  {[type]} options.message [description] 提示信息字符串
 * @param  {[type]} options.confirm [description] 显示确认按钮
 * @param  {[type]} options.cancel [description] 显示取消按钮
 * @param  {[type]} options.callback [description] 回调方法
 * @param  {[type]} desc    [description] 位置描述（调试用）
 * @return {[type]}         [description]
 */
GSY.gamebox.confirm = function(options,desc){

	//默认不显示确认框信息
	/*var obj = { 
		confirm : false,
		cancel : false,
		callback : null,
		message : 'confirmMsgBox'
	}

	var data = $.extend({},obj,options);

	//当需要确认按钮处理事件的时候
	if((data.confirm || data.cancel) && typeof data.callback == 'function'){
		
		//随机种子
		var random = GSY.util.random(100000,999999) + '_' + GSY.util.random(1000000,9999999) + '_' + (new Date()).getTime();
		
		//创建回调方法
		window['OASConfirm_' + random] = function(status){
			data.callback(status);
			window['OASConfirm_' + random] = null;
		}

		var param = $.extend({},data,{callback : 'OASConfirm_' + random});
		GSY.util.echo(data);
		GSY.util.echo(param);
	}else{
		var param = {confirm: false,cancel:false,message:data.message} 	
	}
	
	GSY.gamebox.cAjaxCallback('WINIE_ShowMsgBox' , param , desc ? desc : 'confirmMsgBox');
	*/
	var obj = { 
		confirm : false,
		cancel : false,
		callback : null,
		message : 'confirmMsgBox'
	}

	var data = $.extend({},obj,options);
	if((data.confirm || data.cancel)){
		var param = $.extend({},data,{callback : data.callback});
	}else{
		var param = {confirm: false,cancel:false,message:data.message} 
	}
	GSY.gamebox.cAjaxCallback('WINIE_ShowMsgBox' , param , desc ? desc : 'confirmMsgBox');
};

/**
 * [getOtherParam description] 获取url扩展参数
 * @param  {[type]} gamecode [description] 
 * @return {[type]}          [description]
 */
GSY.gamebox.getOtherParam = function(gamecode){
	var par = gamecode ? $.extend({},GSY.config.get('comGameParam'),GSY.config.get('selGameParam')[gamecode]) : $.extend({},GSY.config.get('comGameParam'));
	return GSY.gamebox.jsonToPostStr(par) ? "&" + GSY.gamebox.jsonToPostStr(par) : "";
};

/**
 * [uploadLog description] 上报用户操作日志
 * @return {[type]} [description]
 */
GSY.gamebox.uploadLog = function(mainParma,subParma){
	if(subParma == undefined || $.isEmptyObject(subParma)) var data = {'event' : mainParma};
	else var data = {'event' : mainParma , params : subParma};
	GSY.gamebox.cAjaxNo('WINIE_PingBackWeb',data,'前端上报用户操作日志');
};

/**
 * [gotomingamebox description] 打开小游戏页面
 * @param  {[string]} url  [description] 游戏链接地址
 * @param  {[string]} name [description] 游戏名称
 * @param  {[string]} id   [description] 游戏id
 * @return {[type]}      [description]
 */
GSY.gamebox.gotomingamebox = function(url,name,id,clickTime){
	var lg = GSY.config.get('lang');
	var gamecode =  GSY.config.get('gamecode') ?  GSY.config.get('gamecode') : 'mingame' + lg;
	url = url + '?lg=' + GSY.config.get('lang') + '&gameid=' + gamecode + '&player=true'+'&version='+ GSY.util.getUrlParam('version');
	var keycode;
	if(clickTime){	
		keycode=clickTime;
	}else{
		keycode='smallgameopentime';
	}
	GSY.gamebox.uploadLog(keycode,{'gameid':gamecode});
	GSY.gamebox.cAjaxCallback('WINIE_OpenNewSmallGame',{url:url,name:name,gameid:id,gametype:'small'},'打开小游戏页面操作');
};


/**
 * [openMiniGamesCenter description] 打开小游戏列表页面
 * @return {[type]} [description]
 */
GSY.gamebox.openMiniGamesCenter = function(clickTime){
	var lg = GSY.config.get('lang');
	var center = '//www.11oyun.com/'+GSY.config.get('smallgamefile')+'/gamebox.html?lg='+ lg+'&gameid=mingame' + lg+'&version='+GSY.util.getUrlParam('version');
	var name = GSY.util.getUrlParam('mingamename') ? GSY.util.getUrlParam('mingamename') : '11oyun';
	if(clickTime){	GSY.gamebox.uploadLog(clickTime,{'gameid':name});}	
	GSY.gamebox.cAjaxCallback('WINIE_OpenSmallBox',{url:center,name:name,gametype:"box"},'打开小游戏列表页面');
};

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
 * [getUserId description] 获取mynet登陆用户uid(登陆系统繁忙不弹弹窗)
 * @param  {[string]}   token     [description] token
 * @param  {[string]}   game_code [description] 游戏唯一标识
 * @param  {Function} callback  [description]  回调方法
 * @return {[type]}             [description]
 */
GSY.gamebox.getLoginUserId = function(token,game_code,callback){
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
				//GSY.gamebox.message(OASGetLangVal('Gamebox_Operation_Fail'),'','获取游戏中心推广数据失败！');	
				$('.login-status-res').html(OASGetLangVal('Gamebox_connecting'));  //登陆系统繁忙的提示显示在页面
				GSY.gamebox.uploadLog('GetErrorTime',{'gameid':game_code,'errInfo':OASGetLangVal('Gamebox_Operation_Fail')});		
			}
		},
		error : function(){
			//上报日志
			$('.login-status-res').html(OASGetLangVal('Gamebox_connecting'));  //登陆系统繁忙的提示显示在页面
			//GSY.gamebox.message(OASGetLangVal('Gamebox_Operation_Fail'),'','获取游戏中心推广数据失败！');	
			GSY.gamebox.uploadLog('GetErrorTime',{'gameid':game_code,'errInfo':OASGetLangVal('Gamebox_Operation_Fail')});		
		}
	});
} 



/**
 * [setLocalGameData description] 设置本地存储数据
 * @param  {[string]} 	options.key  		[description] 存储键值名称（必选）
 * @param  {[string]} 	options.value 		[description] 存储数据值（必选）
 * @param  {[string]} 	options.type 		[description] 存储方式 	默认值(false) 临时存储方法  (true)永久存储
 * @param  {[function]} callback 	[description] 回调函数（可选）
 * @return 
 */
GSY.gamebox.setLocalGameData = function(options,callback){
	if(!callback)
		callback=null;
	var obj = {
		action : 'set',
		type : true,
		key : null,
		value : null,
		callback:callback
	}

	//合并项
	var data = $.extend({},obj,options);

	//key与value不能为空
	if(!data.key || !data.value){
		return;
	}	
	GSY.gamebox.cAjaxCallback('WINIE_Localstorage',data,'设置本地存储数据');

	//启用回调方法
	/*if(typeof callback == 'function'){
		//随机种子
		var random =  GSY.util.random(100000,999999) + '_' + GSY.util.random(1000000,9999999) + '_' + (new Date()).getTime();

		//创建回调方法
		window['OASGetLocalGameData_' + random] = function(ret){
			if(typeof callback == 'function') {
				callback(ret);
				window['OASGetLocalGameData_' + random] = null;
			}
		}
		data['callback'] = 'OASGetLocalGameData_' + random;	
	}

	GSY.gamebox.cAjax('WINIE_Localstorage',data,'设置本地存储数据');
	*/
};


/**
 * [getLocalGameData description] 获取本地存储数据
 * @param  {[string]} 	key 		[description] 获取存储数据键值（必选）
 * @param  {[function]} callback 	[description] 回调函数（必选）
 * @return 
 */
GSY.gamebox.getLocalGameData = function(options,callback){
	if(!callback)
		callback=null;
	var obj = {
		action : 'get',
		key : null,
		type : true,
		callback:callback
	};
	var data = $.extend({},obj,options);
	//不能为空
	if(!data.key) return;
	GSY.gamebox.cAjaxCallback('WINIE_Localstorage',data,'获取本地存储数据');

	//随机种子
	/*var random =  GSY.util.random(100000,999999) + '_' + GSY.util.random(1000000,9999999) + '_' + (new Date()).getTime();

	//创建回调方法
	window['OASGetLocalGameData_' + random] = function(ret){
		if(typeof callback == 'function') {
			callback(ret);
			window['OASGetLocalGameData_' + random] = null;
		}
	}
	data['callback'] = 'OASGetLocalGameData_' + random;
	GSY.gamebox.cAjax('WINIE_Localstorage',data,'获取本地存储数据');
	*/
};

//   GSY.gamebox.getLocalGameData({key:'get'},function(ret){alert(ret)});


/**
 * [removeLocalGameData description] 删除本地存储数据
 * @param  {[string]} 		key 		[description] 获取存储数据某个键值数据
 * @param  {[function]} 	callback  	[description] 回调函数（可选）
 * @return 
 */
GSY.gamebox.removeLocalGameData = function(options,callback){
	return;
	if(!callback)
		callback=null;
	var obj = {
		action : 'remove',
		key : null,
		type : true,
		callback:callback
	};
	
	var data = $.extend({},obj,options);
	
	//不能为空
	if(!data.key) return;
	GSY.gamebox.cAjaxCallback('WINIE_GameListDel',data,'删除本地存储数据');

	//需要回调方法
	/*if(typeof callback == 'function'){
		//随机种子
		var random =  GSY.util.random(100000,999999) + '_' + GSY.util.random(1000000,9999999) + '_' + (new Date()).getTime();

		//创建回调方法
		window['OASGetLocalGameData_' + random] = function(ret){
			if(typeof callback == 'function') {
				callback(ret);
				window['OASGetLocalGameData_' + random] = null;
			}
		}
		data['callback'] =  'OASGetLocalGameData_' + random;
	}

	GSY.gamebox.cAjax('WINIE_Localstorage',data,'删除本地存储数据');
	*/
	
};


/**
 * [userCommonLogin description] 用户通用登录框
 * @return {[type]} [description]
 */

GSY.gamebox.userCommonLogin = function(el){	
	var data = el.attr("data-selecter");
		
	if (data && data !== "changer") { //点击游戏登录设置cookie
		GSY.cookie.set("OAS_unLoginInfo", data);
	}
	if (data === "changer") { //切换账号
		data = "{" + data + ":true}";
	}
	GSY.gamebox.cAjaxCallback('WINIE_LoginDialog',data,'打开游戏登录窗');
}

/**
 * [uploadLog description] 上报用户登录日志
 * @return {[type]} [description]
 */

GSY.gamebox.uploadLoginLog = function(json){ 
	
	var _gameid = GSY.config.get('gamecode');
	var _version = GSY.util.getUrlParam('version');
	var _locale = GSY.config.get('lang');
	var data = {
		"async":json.async,
		"channel": GSY.util.getUrlParam('channel'),
	    "uuid":json.uuid,
	    "locale":_locale,
	    "version":_version,
	    "status":{"gameid":_gameid},
	    "params":{}
	};
	if(json.gameid){
		data.params.game_code = json.gameid;
	}
	if(json.type){
		data.params.type = json.type;
	}

	mData.push(['send',json['event'],data]);
}

GSY.gamebox.serverTime = function(){
	GSY.gamebox.cAjaxNo('WINIE_ServerTime',{time:parseInt((new Date()).getTime()/1000)},'前端返回当前系统时间');
}

/**
 * [description] 统一打目标页面地址
 * @return {[type]} [description]
 */
$(function(){
	GSY.util.echo();
});

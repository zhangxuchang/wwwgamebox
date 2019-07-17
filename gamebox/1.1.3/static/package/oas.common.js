/*
 * GSY执行脚本
 * author:gaoshiyong<gaoshiyong1272@vip.163.com>
 * jQuery版本必须在1.42以上
 */

//加载JOSN组件
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('3(5 p!==\'w\'){p={}}(6(){\'1y 1z\';6 f(n){7 n<10?\'0\'+n:n}3(5 11.m.q!==\'6\'){11.m.q=6(){7 1e(o.W())?o.1L()+\'-\'+f(o.1I()+1)+\'-\'+f(o.1H())+\'T\'+f(o.1q())+\':\'+f(o.1D())+\':\'+f(o.1C())+\'Z\':x};J.m.q=1B.m.q=1A.m.q=6(){7 o.W()}}y e,A,8,C,N,l;6 L(b){A.1h=0;7 A.M(b)?\'"\'+b.G(A,6(a){y c=N[a];7 5 c===\'H\'?c:\'\\\\u\'+(\'17\'+a.18(0).O(16)).1c(-4)})+\'"\':\'"\'+b+\'"\'}6 z(a,b){y i,k,v,h,B=8,9,2=b[a];3(2&&5 2===\'w\'&&5 2.q===\'6\'){2=2.q(a)}3(5 l===\'6\'){2=l.I(b,a,2)}1x(5 2){E\'H\':7 L(2);E\'P\':7 1e(2)?J(2):\'x\';E\'1w\':E\'x\':7 J(2);E\'w\':3(!2){7\'x\'}8+=C;9=[];3(Q.m.O.1v(2)===\'[w 1u]\'){h=2.h;D(i=0;i<h;i+=1){9[i]=z(i,2)||\'x\'}v=9.h===0?\'[]\':8?\'[\\n\'+8+9.K(\',\\n\'+8)+\'\\n\'+B+\']\':\'[\'+9.K(\',\')+\']\';8=B;7 v}3(l&&5 l===\'w\'){h=l.h;D(i=0;i<h;i+=1){3(5 l[i]===\'H\'){k=l[i];v=z(k,2);3(v){9.1d(L(k)+(8?\': \':\':\')+v)}}}}U{D(k 1f 2){3(Q.m.1g.I(2,k)){v=z(k,2);3(v){9.1d(L(k)+(8?\': \':\':\')+v)}}}}v=9.h===0?\'{}\':8?\'{\\n\'+8+9.K(\',\\n\'+8)+\'\\n\'+B+\'}\':\'{\'+9.K(\',\')+\'}\';8=B;7 v}}3(5 p.V!==\'6\'){A=/[\\\\\\"\\1t-\\1s\\1F-\\1r\\1m\\1n-\\1o\\1p\\1l\\1k\\1j-\\1i\\1b-\\1a\\19-\\15\\Y\\X-\\12]/g;N={\'\\b\':\'\\\\b\',\'\\t\':\'\\\\t\',\'\\n\':\'\\\\n\',\'\\f\':\'\\\\f\',\'\\r\':\'\\\\r\',\'"\':\'\\\\"\',\'\\\\\':\'\\\\\\\\\'};p.V=6(a,b,c){y i;8=\'\';C=\'\';3(5 c===\'P\'){D(i=0;i<c;i+=1){C+=\' \'}}U 3(5 c===\'H\'){C=c}l=b;3(b&&5 b!==\'6\'&&(5 b!==\'w\'||5 b.h!==\'P\')){14 13 1E(\'p.V\');}7 z(\'\',{\'\':a})}}3(5 p.R!==\'6\'){e=/[\\1G\\1m\\1n-\\1o\\1p\\1l\\1k\\1j-\\1i\\1b-\\1a\\19-\\15\\Y\\X-\\12]/g;p.R=6(c,d){y j;6 S(a,b){y k,v,2=a[b];3(2&&5 2===\'w\'){D(k 1f 2){3(Q.m.1g.I(2,k)){v=S(2,k);3(v!==1J){2[k]=v}U{1K 2[k]}}}}7 d.I(a,b,2)}c=J(c);e.1h=0;3(e.M(c)){c=c.G(e,6(a){7\'\\\\u\'+(\'17\'+a.18(0).O(16)).1c(-4)})}3(/^[\\],:{}\\s]*$/.M(c.G(/\\\\(?:["\\\\\\/1M]|u[0-1N-1O-F]{4})/g,\'@\').G(/"[^"\\\\\\n\\r]*"|1P|1Q|x|-?\\d+(?:\\.\\d*)?(?:[1R][+\\-]?\\d+)?/g,\']\').G(/(?:^|:|,)(?:\\s*\\[)+/g,\'\'))){j=1S(\'(\'+c+\')\');7 5 d===\'6\'?S({\'\':j},\'\'):j}14 13 1T(\'p.R\');}}}());',62,118,'||value|if||typeof|function|return|gap|partial||||||||length||||rep|prototype||this|JSON|toJSON||||||object|null|var|str|escapable|mind|indent|for|case||replace|string|call|String|join|quote|test|meta|toString|number|Object|parse|walk||else|stringify|valueOf|ufff0|ufeff|||Date|uffff|new|throw|u206f||0000|charCodeAt|u2060|u202f|u2028|slice|push|isFinite|in|hasOwnProperty|lastIndex|u200f|u200c|u17b5|u17b4|u00ad|u0600|u0604|u070f|getUTCHours|x9f|x1f|x00|Array|apply|boolean|switch|use|strict|Boolean|Number|getUTCSeconds|getUTCMinutes|Error|x7f|u0000|getUTCDate|getUTCMonth|undefined|delete|getUTCFullYear|bfnrt|9a|fA|true|false|eE|eval|SyntaxError'.split('|'),0,{}));


//创建组件
var GSY = window.GSY || {};



/**
 * [log 输出日志,支持原生console和alert输出日志]
 * @return 
 */
GSY.LOG = GSY.log = function() {
	if (typeof(console) == "object" && typeof(console.log) == "function") console.log.apply(console, arguments);
};


/**
 * [GSY.namespace 创建局部命名空间]
 * @param  {[sting]} ns [传入命名空间字符串]
 * @return {[object]}   [返回命名空间对象]
 */
GSY.namespace = function(ns) {
    if (!ns || !ns.length) return null;
	var levels = ns.split(".");
    var nsobj = GSY;
	for (var i=(levels[0] == "GSY") ? 1 : 0; i<levels.length; ++i) {
        nsobj[levels[i]] = nsobj[levels[i]] || {};
        nsobj = nsobj[levels[i]];
    }
	return nsobj;
};


/**
 * 创建配置类对象
 */
GSY.namespace('GSY.config');
GSY.config._setting = {};


/**
 * [GSY.config.get description]  获取配置信息，如果没有找到该配置返回null
 * @param  {[string]} key [description] 配置名字
 * @return {[type]}     [description] 	返回配置信息(String)
 */
GSY.config.get = function(key) {
	return GSY.config._setting[key] ? GSY.config._setting[key] : null;
};


/**
 * [GSY.config.set description] 写入配置信息
 * @param {[string]} key   [description] 配置名字
 * @param {[string]} value [description] 配置信息
 */
GSY.config.set = function(key, value) {
	if ($.isPlainObject(key)) {
		$.extend(GSY.config._setting, key);
	} else {
		GSY.config._setting[key] = value;
	}
};
GSY.config.set('host','https://' + location.hostname + '/');
GSY.config.set('debug',false);
GSY.config.set('version','2015111902');
GSY.config.set('lang', typeof siteConfig == 'undefined' || typeof siteConfig.lang == 'undefined' ? 'cn' : siteConfig.lang);
GSY.config.set('domain', function(){
	var domain = '';
	var arr = window.location.hostname.split('.');
	if(arr.slice(-1) == 'com'){
		domain = arr.slice(-2).join('.');
	}
	
	return domain;
}());


/**
 * 创建工具类对象
 */
GSY.namespace('GSY.util');

/**
 * [getUrlParam description] 获取url地址或者指定字符串中参数,只获取链接地址中的第一次出现的key的值作为返回值
 * @param  {[string]} key  [description] 键值名称
 * @param  {[string]} stri [description]
 * @return {[type]}      [description]
 */
GSY.util.getUrlParam = function(key,str){
	var val = null;
	var tempStr = str == undefined ? window.location.search.substring(1) : str.split('?')[1];
	if(tempStr.length != 0){
		var arr = tempStr.split('&');
		var len = arr.length;
		for(i=0 ; i < len ; i++){
			if(arr[i].split('=')[0] == key){
				val = arr[i].split('=')[1];
				break;
			}
		}
	}
	return val;
};

//从浏览器中启用调试模式
if(GSY.util.getUrlParam('debug') == 1){
	GSY.config.set('debug',true);	
};


//关闭debug模式
if(GSY.util.getUrlParam('closeecho') == 1){
	GSY.config.set('debug',false);		
}



/**
 * [arr description] 返回最小值和最大值并返回该位置(只针对数字类型数组)
 * @param  {[array]} arr  [description] 需要操作的数组
 * @param  {[boolean]} type [description] 返回值状态   true（默认） - 最大值  false - 最小值 
 * @return {[object]}      [description]  返回json格式数据
 */
GSY.util.arr = function(arr , type){
	type = type == undefined ? true : type;
	var index , len = arr.length;
	if(type) var data = Math.max.apply({},arr);
	else var data = Math.min.apply({},arr);
	for(var i = 0 ; i < len; i++){
		if(arr[i] == data){ index = i; break; }
	}
	return {data : data , index : index}
};


/**
 * [GSY.util.ajax description] 异步请求地址,假如是不同地址会强制跨域
 * @param options.url(String)  请求连接地址必选是完整的链接地址 （必选）
 * @param options.type (String) 请求类型 默认 - post
 * @param options.data(String)  请求参数 （可选）
 * @param options.textType (String)  返回数据类型 默认是json 支持格式为jQuery模式
 * @param options.success (function)  请求成功处理方法 （可选）
 * @param options.error (function)  请求失败处理方法（可选）
 * @return {[type]} [description]
 */
GSY.util.ajax = function(options){
	var langType = GSY.config.get('lang');
	if(!options.url) {
		alert(LANG[langType]['inter_url']);
		return;
	}

	//设置默认参数
	var definOpt = {
		url : null,
		type : 'post',
		dataType : 'json',
		data : {},
		success : null,
		error : null,
		timeout : 120000,
		cache : false
	} 

	//合并参数
	var opt = $.extend({},definOpt,options); 
	
	//设置请求方式
	opt.type = opt.type == 'get' ? 'GET' : 'POST';
	
	//判断是否为同域
	var host = location.protocol + '//' + location.hostname;
	var crossdomain = opt.url.substr(0, host.length) == host ? false : true;
	if(crossdomain) {
		if(opt.data.jsonpCallback) opt.jsonpCallback = opt.data.jsonpCallback;
		opt.type = 'GET';
		opt.dataType = "jsonp";
		opt.jsonp = "callback";
	}
	$.ajax(opt);
};


/**
 * [GSY.util.tab description] tab切换类操作
 * @param  {[string]} opt.eType   [description] 事件类型 hover 和 click  默认 click
 * @param  {[object]} opt.tabEleParent  [description] 	切换元素对象 
 * @param  {[object]} opt.contEleParent [description]   被切换元素对象
 * @param  {[string]} opt.css [description]   			切换当前元素样式
 * @param  {[type]} opt.callback [description]   		切换后回调方法
 */
GSY.util.tab = function(options){
	var defin = {
		eType : 'click',
		tabEleParent : null,
		contEleParent : null,
		css : 'active',
		callback : null
	}
	var opt = $.extend({} , defin , options ? options : {});
	if(opt.eType != 'click' && opt.eType != 'hover' ) return;
	opt.tabEleParent.children()[opt.eType](function(e){
		if($(this).hasClass(opt.css)) return false;
		var index = $(this).index();
		$(this).addClass(opt.css).siblings().removeClass(opt.css);
		opt.contEleParent.children().eq(index).show().siblings().hide();
		if(typeof opt.callback == 'function' ) opt.callback(opt,$(this),opt.contEleParent.children().eq(index));
		e.stopPropagation();
		return false;
	});	
};


/**
 * [getEleData description] 解析元素属性特定字符串，并转换为特定对象格式返回
 * @param  {[object]} element [description]  元素对象
 * @param  {[string]} attr    [description]	 元素属性名称
 * @return {[object]}         [description]  返回json格式
 */
GSY.util.getEleData = function(element,attr){
	var json = {} , temp = [] , len , klen;
	var str = $(element).attr( attr ? attr : 'data-post');
	if(!str) return {};
	temp = str.split('&');
	len = temp.length;
	for(var i = 0; i < len ; i++){
		var a = temp[i].split('=');
		if(a.length > 2){
			var key = a[0];
			var arr = a.slice(1);
			var val = arr.join('=');
		}else{
			var key = a[0];
			var val = a[1];
		}
		json[key] = val;
	}
	return json;
};


/**
 * [getEleInfo description] 获取元素对象高，宽，坐标值,没有找对元素节点对象返回null
 * @param  {[object]} element 	[description] 	元素节点
 * @param  {[boolean]} outType 	[description] 	高度是否包含元素padding、margin、border
 * @return {[type]}         [description] 		返回json格式对象，包括（高，宽，坐标值信息）假如是window,返回滚动条高度
 */
GSY.util.getEleInfo = function(element,outType){
	outType = outType == undefined ? false :  outType;
	var json = {};
	if(element === undefined) element = $(window); 
	if($(element).length == 0) return {};
	if(element.get(0) == window){
		json.h = $(element).height();
		json.w = $(element).width();
		json.st = $(element).scrollTop();
		json.sl = $(element).scrollLeft();
	}else{
		if(outType) {
			json.h = $(element).outerHeight();
			json.w = $(element).outerWidth();
		}else{
			json.h = $(element).height();
			json.w = $(element).width();	
		}
	}
	if(element.get(0) == window) return json;
	json.t = Math.floor($(element).offset().top);
	json.l = Math.floor($(element).offset().left);
	return json;
};

/**
 * [countdown description] 倒计时(时间戳为精确到秒级时间)
 * @param  {[string]} curTime      [description] 服务器当前时间戳
 * @param  {[string]} startTime    [description] 服务器开始时间戳
 * @param  {[string]} endTime      [description] 服务器结束时间戳
 * @param  {[function]} callback   [description] 回调处理方法
 * @return {[object]}              [description] 返回时间对象 {d:0,h:0,m:0,s:0}或者 开始事件对象 或者 结束事件对象
 */
GSY.util.countdown = function(startTime,curTime,endTime,callback){
	var timeer = null;
	var day = 24*60*60;
	var hour = 60*60;
	var minute = 60;

	//转换时间戳
	var cur = new Date((typeof curTime == 'number' ? curTime : parseInt(curTime))*1000);
	var start = new Date((typeof startTime == 'number' ? startTime : parseInt(startTime))*1000);
	var end = new Date((typeof endTime == 'number' ? endTime : parseInt(endTime))*1000);
	
	var temp = curTime;
	var timeObj = {}; 
	timeer = setInterval(function(){

		//当倒计时结束时候处理
		if(temp > endTime){
			timeObj.code = 'end';
			timeObj.date = end;
			clearInterval(timeer);
		} 

		//当倒计时未开始是处理
		else if(temp < startTime){
			timeObj.code = 'unstart';
			timeObj.date = start;
			clearInterval(timeer);
		}

		//倒计时正常运行处理
		else{
			var surplus = endTime - temp;
			timeObj.code = 'start';
			timeObj.d = Math.floor(surplus/day);
			timeObj.h = Math.floor(surplus%day/hour);
			timeObj.m = Math.floor(surplus%day%hour/minute);
			timeObj.s = Math.floor(surplus%day%hour%minute);
		}

		if(typeof callback == 'function') callback(timeObj);
		temp++;
	},1000);
};


/**
 * [random description] 生成随机数
 * @param  {[number]} min [description] 生成最小数字
 * @param  {[number]} max [description] 生成最大数字
 * @return {[number]}     [description] 返回随机数
 */
GSY.util.random = function(min, max){
    return Math.ceil(Math.random() * (max - min) + min);
};


/**
 * [echo description] 兼容ie6-8一维json对象的打印
 * @param  {[object]} json [description]
 * @return {[type]}      [description]
 */
GSY.util.echo = function(json,desc){
	if(!GSY.config.get('debug')) return;

	//是否设置描述字段
	if(desc == undefined) desc = '';
	else desc = desc;

	//只显示目标地址
	if(json == undefined) {
		alert('当前页面目标地址=>' + window.location.pathname + window.location.search);
		return;
	}

	//当传入的参数字符串时候处理方
	if(typeof json == 'string')  {
		if(desc != '') var str = 'Path：' + window.location.pathname + '\n' + 'String：' + json + '\n' + 'desc：' +  desc;
		else var str = 'Path：' + window.location.pathname + '\n' + 'String：' + json;
		alert(str);
		return;
	}

	//设置目标地址
	var temp = null;
	if($.isArray(json)){
		temp = $.extend([],json);
		temp.push(window.location.pathname);
		if(desc != '') temp.push(desc);
	}else{
		temp = $.extend({},json);
		temp['Path：'] = window.location.pathname;
		if(desc != '') temp['desc'] = desc;
	}
	var str = '';   
	for(key in temp) str += key + '==>' + temp[key] + '\n';
	alert(str);
};




/**
 * [showBrowser description] 查看浏览器相关信息
 * @return {[type]} [description]
 */
GSY.util.browser = function(){
	if(GSY.util.getUrlParam('liulanqi')) {
		var maxNum = GSY.util.getUrlParam('num') ? parseInt(GSY.util.getUrlParam('num')) : 30;
		var i = 0,str = '';
		for(key in window.navigator){
			str += key +"==>" + window.navigator[key] + "\n";
			if(i > maxNum) break;
			i++;
		}
		alert(str);
	};
};
GSY.util.browser();



/**
 * [pasteEvents description]扩展jQuery粘贴事件
 * @param  {[Number]} delay [description] 延时时间
 * @return {[type]}       [description]
 */
$.fn.pasteEvents = function( delay ) {
	if (delay === undefined) delay = 300;
	return $(this).each(function() {
		var $el = $(this);
		$el.bind("paste", function() {
			$el.trigger("prepaste");
			setTimeout(function() { $el.trigger("postpaste"); }, delay);
		});

	});
};

/**
 * [paste description] 绑定复制粘贴事件
 * @param  {[Objcet - jQuery]} element [description] 文字输入框DOM对象
 * @return {[type]}         [description]
 */
GSY.util.paste = function(element){
	if(!element.attr('data-paste')){
		element.attr('data-paste',true);
		$(element).bind("postpaste", function(){
			$(element).keyup();
		}).pasteEvents();	
	} 
	
};


/**
 * [fous description] 文本和文本域焦点事件
 * @param  {[Objcet]} element [description] 发生焦点事件源对象
 * @param  {[String]} string  [description] 初始字符串
 * @return {[type]}         [description]
 */
GSY.util.fous = function(element,string,color){
	color = color == undefined ? '#999' : color;
	GSY.util.paste(element);
	var val = $(element).val();
	if(val == string) $(element).val('').css('color','#444');
	else $(element).css('color','#444');
	$(element).blur(function(){
		var val = $(this).val();
		if(val == '') $(element).val(string).css('color',color);
	});
};



/**
 * [maxCharTips description] 错误闪烁效果
 * @param  {[Objcet]} element   [description] input和textarea 对象
 * @param  {[String]} tipsColor [description] 闪烁提示颜色值 （可选项）
 * @param  {[String]} Color     [description] 闪烁之后颜色值 （可选项）
 * @return {[type]}           [description]
 */
GSY.util.maxCharTips = function(element,tipsColor,Color){
	var c = typeof color != "undefined" ? color : '';
	var tc = typeof tipsColor != "undefined" ? tipsColor : '#f9cbcb';
	var flag = 6;
	var time = setInterval(function(){
		if(flag < 1) {clearInterval(time);return}
		if(flag%2 == 0) $(element).css('background', tc);
		else $(element).css('background',c);
		flag--
	},100);
	element.focus();
};



/**
 * [maxChar description] 设置文本域最大输入字符数（keyup事件）
 * @param  json.e(Object - jQuery)  文本对象
 * @param  json.p(String)  共用父节点选择器字串
 * @param  json.t(String)  提示数字元素节点选择器字串
 * @param  json.s(String)  可以发送按钮样式名字
 * @param  json.d(String)  验证不通过按钮样式名字
 * @param  json.b(String)  发送按钮选择器选择器字串
 * @param  json.a(Number)  不启用文本框高度自动增加模式 0 - 不启用
 * @param  json.c(function)  当字数没有超出设定值时调用该方法
 * @param  json.f(function)  当字数超出设定值时调用该方法
 * @return
 */
GSY.util.maxChar = function(options){
	var lanType = GSY.config.get('lang');
	var defin = {
		e : null,					//文本对象
		p : '.js_all_smail',		//共用父节点
		t : '.textTips',			//提示数字元素节点
		s : 'sr-btn-green' ,		//可以发送按钮样式
		d : 'sr-btn-disabled',		//验证不通过按钮样式
		b : '.gPostBtn',			//发送按钮选择器
		a : 0,						//0不启用文本框高度自动增加模式,
		c : null,					//当字数没有超出设定值时调用该方法
		f : null					//当字数超出设定值时调用该方法
	}
	var opt = $.extend({},defin,options);
	var parent = $(opt.e).closest(opt.p),btn = parent.find(opt.b),tips = parent.find(opt.t);
	var maxStr = $(opt.e).attr('maxlenth');
	var val = $.trim($(opt.e).val());
	if(val == '') {
		tips.html('<span>'+ LANG[lanType]['you_can_inter_char'] +'</span><font>'+ maxStr +'</font><span>'+ LANG[lanType]['char'] +'</span>');
		btn.removeClass(opt.s).addClass(opt.d);
		$(opt.e).attr('sendpost',false);
		if(opt.a) GSY.util.txtAutoHeight($(opt.e),20);
		return;
	}
	var strlen = GSY.str.len(val);
	if(opt.a) GSY.util.txtAutoHeight($(opt.e),20);
	var surplusChar = maxStr - strlen;
	if(surplusChar >= 0){
		if(typeof opt.c === 'function'){
			opt.c(opt,tips);
		}else{
			tips.html('<span>'+ LANG[lanType]['you_can_inter_char'] +'</span><font>'+ surplusChar +'</font><span>'+ LANG[lanType]['char'] +'</span>');	
		}
		btn.removeClass(opt.d).addClass(opt.s);
		$(opt.e).attr('sendpost',true); 
	}else{
		if(typeof opt.c === 'function'){
			opt.c(opt,tips);
		}else{
			tips.html('<span>'+ LANG[lanType]['your_input_has_exceeded'] +'</span><font style="color:#f00">'+ Math.abs(surplusChar) +'</font><span>'+ LANG[lanType]['char'] +'</span>');
		}
		btn.removeClass(opt.s).addClass(opt.d);
		$(opt.e).attr('sendpost',false);
	}
};


/**
 * [txtAutoHeight description] 文本域自适应高度(keyup事件)
 * @param  {[type]} element   [description] 文本域对象
 * @param  {[type]} minHeight [description] 最小高度
 * @return {[type]}           [description]
 */
GSY.util.textearaAutoHeight = function(element,minHeight){
	var id = "#oas-textareaDiv";
	if($(id).length > 0) $(id).remove();
	var w = $(element).width();
	var line = $(element).css('line-height');
	if($(id).length == 0) {
		var html = $('<textarea class="oas-textarea" id="oas-textareaDiv" style="margin:0; padding:0; border:0; position:absolute;top:-9999px;left:-9999px;"></textarea>').css({width:w,height:minHeight});
		$('body').append(html);
	}else var html = $(id);
	html.val(element.val());
	var h = html.get(0).scrollHeight > minHeight ? html.get(0).scrollHeight : minHeight;
	$(element).css('height',h);
	element.unbind('blur').blur(function(){
		html.remove();
	});
};


/**
 * [loadCss description] 动态加载样式表
 * @param  {[string]} url [description]  样式表路径
 * @param  {[string]} id  [description]  样式表id （可选）
 * @return {[type]}     [description]
 */
GSY.util.loadCssCount = 0;
GSY.util.loadCss = function(url,id){
	if(id == undefined) id = 'link_' + GSY.util.loadCssCount;
	else id = id;

	//判断样式表是否存在
	if($(id).length > 0) return; 

	var style = document.createElement('link');
	style.type = "text/css";
	style.rel = "stylesheet";
	style.charset = "utf-8";
	style.href = url
	document.getElementsByTagName('head').item(0).appendChild(style);
	GSY.util.loadCssCount++;
};

/**
 * [muSelect description] 多级联动
 * @param options.url(String||Object)  请求连接地址或者json对象 （必选）
 * @param options.box(String)  父节点 （必选）例:".box"
 * @param options.cls(Array)   联动表单样式名数组 (必选) 例:[".slt1",".slt2"]
 */

GSY.util.muSelect = function(options){

	var _default = {
		box: null, //父元素
		cls: [], //联动select表单class数组
		url: null //列表数据文件路径
	};

	var _muSelect = function(options) {
		this.opts = $.extend({}, _default, options);
		this.init();
	};

	_muSelect.prototype = {
		init: function() {
			var that = this;
			//未定义父元素、表单数组、文件路径
			if (!this.opts.box || !this.opts.cls.length || !that.opts.url) {
				return;
			};

			that.box = $(this.opts.box);
			that.selectArr = [];
			that.selectNum = that.opts.cls.length;

			for (var i = 0; i < that.selectNum; i++) {
				if (!that.box.find("select" + that.opts.cls[i])) {
					break;
				};
				that.selectArr.push(that.box.find("select" + that.opts.cls[i]));
			}
			that.selectNum = that.selectArr.length;

			if (typeof that.opts.url === "string") {
				$.getJSON(that.opts.url, function(json) {
					that.dataJson = json;
					that.bindEvent();
				});
			}
			if (typeof that.opts.url === "object") {
				that.dataJson = that.opts.url;
				that.bindEvent();
			}
		},
		//绑定事件
		bindEvent: function() {
			var that = this;
			that.box.on("change", "select", function() {
				that.sltChange(this);
			});
			var _html = that.getNewVaule(that.dataJson);
			that.selectArr[0].html(_html).trigger("change"); //初始化第一个表单内容并触发事件
		},

		//获取下拉框内容
		getNewVaule: function(data) {
			var html = '';
			$.each(data, function(i, n) {
				html += '<option value="' + n.v + '">' + n.n + '</option>';
			});
			return html;
		},
		//选择改变时
		sltChange: function(slt) {
			var curIndex = this.box.find("select").index(slt); //当前表单索引	
			var sltIndex = []; //选择的元素索引									
			for (var i = 0; i < this.selectNum; i++) {
				sltIndex.push(this.selectArr[i].get(0).selectedIndex)
				if (i > curIndex) {
					this.selectArr[i].empty().hide();
				}
			}
			var nextIndex = curIndex + 1; //下一个表单索引	
			var sltData = this.dataJson;
			for (var i = 0; i < nextIndex; i++) {
				sltData = sltData[sltIndex[i]].s;
			};
			if (!sltData) {
				return;
			};
			if (this.selectArr[nextIndex]) {
				var _html = this.getNewVaule(sltData)
				this.selectArr[nextIndex].html(_html).show().trigger("change");
			};
		}
	};
	return new _muSelect(options);
}

/**
 * [unique description] 数组去重
 * @param  {[type]} arr [description] 参数类型为数组
 * @return {[type]}     [description]
 */
GSY.util.unique = function(arr) {
	//判断是不是数组
	if (toString.call(arr).toLowerCase() !== "[object array]") {	
		return;
	} 
	var h = {},
		n = [],
		len = arr.length;
	for (var i = 0; i < len; i++) {
		if (!h[arr[i]]) {
			h[arr[i]] = true;
			n.push(arr[i]);
		}
	}
	return n;
}



/**
 * 创建字符类对象
 */
GSY.namespace('GSY.str');
/**
 * [encode description] 转义html中的标签<>符号]
 * @param  {[string]} html [description] 需要转义的html字符串
 * @return {[string]}      [description] 返回转义完成的html字符串
 */
GSY.str.encode = function(html){
	var newStr = '';
	newStr = html.replace(/\</g, '&lt;');
	newStr = newStr.replace(/\>/g, '&gt;');
	return newStr;	
};


/**
 * [encode description] 转义html中的标签<>符号]
 * @param  {[string]} html [description] 需要转义的html字符串
 * @return {[string]}      [description] 返回转义完成的html字符串
 */
GSY.str.formatStr = function(str) {
    str = str.replace(/&/ig, "&amp;");
    str = str.replace(/</ig, "&lt;");
    str = str.replace(/>/ig, "&gt;");
    return str;
}


/**
 * [filter description] 去掉HTML所有标签
 * @param  {[string]} html     [description] 需要过滤的HTML字符串
 * @param  {[string]} allowed  [description] 被允许通过的一个或多个标签字符串'<b><div><i>'
 * @return {[type]}         [description]
 */
GSY.str.filter = function (html, allowed) {
	var allowed =  allowed == undefined  ? '' : allowed;
    allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');
    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
        commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    return html.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
        return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
    });
};


/**
 * [len description] 获取字符长度 , 英文长度为1，汉字长度为2
 * @param  {[boolean]} type [description] false - 返回英文模式长度(默认)  true - 返回汉字模式长度
 * @return {[type]}      [description]
 */
GSY.str.len = function(str,type){
	var flag = type == undefined ? false : type;
	var count= 0;
	for(var i = 0; i < str.length; i++) {
		if(str.charCodeAt(i) > 255) {
			count += 2
		} else {
			count++
		}
	}
	if(!flag) return count;
	if(Math.round(count/2) == 1) var strlenth = 1;
	else var strlenth = Math.round(count/2);
	return strlenth;
};


/**
 * [cut description] 指定截取字符串长度(区分中英文)
 * @param  {[string]} str [description] 需要截取的字符串
 * @param  {[number]} len [description] 需要截取的字符长度
 * @param  {[number]} type [description] 需要截取的字符长度
 * @return {[type]}     [description] 新的字符串长度
 */
GSY.str.cut = function(str,len,type) {
	var wlen = GSY.str.len(str,false), newstr = '';
	if(type != undefined) var fix = '...';
	else  var fix = '';
	if(wlen > len){
		var c = str.replace(/&/g, " ").replace(/[^\x00-\xff]/g, "&&");
		newstr = str.slice(0, c.slice(0, len).replace(/&&/g, " ").replace(/&/g, "").length) + fix;
	}else {
		newstr = str;
	}
	return newstr;
};



/**
 * [deEncode description] 给指定的字符串长进行编码或者解码
 * @param  {[string]} str  [description] 需要编码或者解码的字符串
 * @param  {[boolean]} type [description] 编码或者解码  false（默认）: 解码   true : 编码
 * @return {[string]}      [description] 返回编码或解码后的新字符串
 */
GSY.str.deEncode = function(str,type){
	var flag = type == undefined ? false : type;
	var newStr = '';
	if(flag){
		newStr = encodeURIComponent(str);
		newStr = newStr.replace(/\*/g, '%2A');
		newStr = newStr.replace(/\!/g, '%21');
		newStr = newStr.replace(/\(/g, '%28');
		newStr = newStr.replace(/\)/g, '%29');
		newStr = newStr.replace(/\'/g, '%27');
	}else{
		newStr = decodeURIComponent(str);
	};
	return newStr;
};

/**
 * 创建cookie对象
 */
GSY.namespace('GSY.cookie');

/**
 * [get description] 读取cookie值
 * @param  {[string]} key     [description] cookie键值名称
 * @param  {[object]} options [description] cookie可选对象
 * @return {[string]}         [description] 返回cookie键值所对应的的值，没有值返回null
 */
GSY.cookie.get = function (key, options) {
	options = options || {};
	var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
	return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};

/**
 * [remove description] 删除指定键值所对应的cookie值
 * @param  {[type]} key     [description]
 * @param  {[type]} options [description]
 * @return {[type]}         [description]
 */
GSY.cookie.remove = function (key,options) {
	GSY.cookie.set(key, null , options ? options : {});
};


/**
 * [set description] 添加指定名称cookie值 , 过期时间小时制
 * @param {[type]} key   [description]
 * @param {[type]} value [description]
 * @param {[type]} opt   [description] cookie相关属性，
 */
GSY.cookie.set = function (key, value, options) {
	options = $.extend({},{
    	domain : '',
    	path : '/'
    }, options);

	//删除cookie操作处理
    if (value === null) {
        options.expires = -1;
    }

    //设置过期时间
    if (typeof options.expires === 'number') {
		var seconds = options.expires, t = options.expires = new Date();
        t.setTime(t.getTime() + seconds*1000*60*60);
    }

    //强制转换为字符串格式
    value = '' + value;

    //设置cookie信息
    return (document.cookie = [
        encodeURIComponent(key), '=',
        options.raw ? value : encodeURIComponent(value),
        options.expires ? '; expires=' + options.expires.toUTCString() : '',
        options.path ? '; path=' + options.path : '',
        options.domain ? '; domain=' + options.domain : '',
        options.secure ? '; secure' : ''
    ].join(''));
};


/**
 * [ description] 下拉菜单组件
 * @return {[type]} [description]
 */
;(function(){

	//初始化值
	var defined = {
		actCss : 'actClassname',   	//操作之前触发按钮的样式
		hoverCss : 'hoverClass',	//操作之后触发按钮的样式
		btnEl : null,  	//触发按钮
		menuEl : null,	//被操作显示隐藏操作对象
		width : null,	//设置被操作对象的宽度
		isPosition : true, //是否处理位置
		dir : 'left',	//设置被操作对象对齐方式 left，center ，right
		time : 100,
		callback : null
	},_lastObjcet = null;
	var count = 0;
	var temp = 'positionHaddle_';
	var reSizeObj = {};

	GSY.namespace('GSY.menu');

	//构造器
	var menu = function(options){
		this.opt = $.extend({}, defined, options);
		this.opt.over = true;
		this.opt.timer = null;
		count++;
	}

	//扩展方法
	menu.prototype = {
		
		//点击事件
		click : function(){
			var that = this;
			if(this.opt.btnEl.length == 0) return;

			//当下拉原始不存在的时候或者下拉菜单是否有子节点
			if( this.opt.menuEl.children().length == 0 || this.opt.menuEl.length == 0){
				this.opt.btnEl.addClass('lz-disabled');
				this.opt.menuEl.addClass('lz-content-disabled');
				this.opt.btnEl.click(function(event) {
					event.stopPropagation();
				});	
			}

			
			//处理下拉菜单位置
			setTimeout(function(){
				that.position();
			},50);

			//绑定事件
			this.opt.btnEl.unbind('click').bind('click', function(e) {
				var _this = $(this);
				if(that.opt.menuEl.is(':hidden')) {
					_this.removeClass(that.opt.hoverCss).addClass(that.opt.actCss);
					that.opt.menuEl.show();
					$('body').bind('click',function(e){
						that.opt.menuEl.hide();
						_this.removeClass(that.opt.actCss).addClass(that.opt.hoverCss);
						$(this).unbind('click');
						e.stopPropagation();
					});
					that.opt.menuEl.bind('click',function(e){
						e.stopPropagation();	
					});
				}else {
					that.opt.menuEl.hide();
					_this.removeClass(that.opt.actCss).addClass(that.opt.hoverCss);	
				}
				e.preventDefault();	
				e.stopPropagation();
			});

			//压入事件
			GSY.config.resizeCode[temp + count] = function(){
				that.position();	
			}


			//回调事件
			if(typeof this.opt.callback == 'function') this.opt.callback(this.opt);
		},

		//计算位置
		position : function(){
			var info = GSY.util.getEleInfo(this.opt.btnEl);
			
			//是否处理位置
			if(this.opt.isPosition){
				if(!this.opt.width) this.opt.width = 'auto';
				var top = info.h + info.t;	
				if(this.opt.dir == 'left') {
					var left = info.l;
				}else if(this.opt.dir == 'right'){
					var left = info.l + $(this.opt.btnEl).outerWidth(true) -  this.opt.width;	
				}else if(this.opt.dir == 'center') {
					var left = info.l + $(this.opt.btnEl).outerWidth(true)/2 - this.opt.width/2;
				}	
			}else{
				var left = 0 ;
				var top = info.h;
			}
			
			this.opt.menuEl.css({left:left,top:top,width:this.opt.width});	
		},

		//鼠标滑过下拉菜单
		hover : function(){
			var that = this;
			var _time = null;

			//按钮元素不存在的时候不处理
			if(this.opt.btnEl.length == 0) return;


			//当下拉原始不存在的时候或者下拉菜单是否有子节点
			if(this.opt.menuEl.children().length == 0 || this.opt.menuEl.length == 0){
				this.opt.btnEl.addClass('lz-disabled');
				this.opt.menuEl.addClass('lz-content-disabled');
				this.opt.btnEl.click(function(event) {
					event.stopPropagation();
				});	
			}


			
			//处理下拉菜单位置
			setTimeout(function(){
				that.position();
			},50)

			//绑定触发按钮事件
			this.opt.btnEl.mouseover(function(e) {
				if(that.opt.over) {
					_time = setTimeout(function(){
						that.opt.menuEl.show();
						that.opt.btnEl.addClass(that.opt.hoverCss).removeClass(that.opt.actCss);
						that.opt.over = false;	
					},200);
				}
			}).mouseout(function(e) {
				that.opt.over = true;
				setTimeout(function(){
					that.hideTimer()
				},200);
				clearTimeout(_time);
			}).click(function(){
				return false;
			});

			//绑定下来菜单事件
			this.opt.menuEl.mouseover(function(e) {
				that.opt.over = false;
			}).mouseout(function(e) {
				that.opt.over = true;
				setTimeout(function(){
					that.hideTimer();
				},200);
				clearTimeout(_time);
			});

			//压入事件
			GSY.config.resizeCode[temp + count] = function(){
				that.position();	
			}


			//回调事件
			if(typeof this.opt.callback == 'function') this.opt.callback(this.opt);
		},

		//隐藏处理
		hideTimer : function(){ 
			if(this.opt.over){
				this.opt.menuEl.hide();
				this.opt.btnEl.removeClass(this.opt.hoverCss).addClass(this.opt.actCss);
			} 
		}
	}

	var createObj = function(options){
		if(_lastObjcet) _lastObjcet = null;
		_lastObjcet = new menu(options);
		return _lastObjcet;
	}

	//对外方法鼠标滑过事件
	GSY.menu.hover = function(options){
		options = options == undefined ? {} : options;
		createObj(options).hover(); 
	}

	//对外方法鼠标滑过事件
	GSY.menu.click = function(options){
		options = options == undefined ? {} : options;
		createObj(options).click(); 
	}
})();




/**
 * [description] 绑定input 和 textarea 焦点和失去焦点事件
 * @return {[type]} [description]
 */
;(function(){
	var foucsCss = 'blur';
	$('input[data-type=blur],textarea[data-type=blur],select[data-type=blur]').focus(function(e) {
		$(this).addClass(foucsCss);
	}).blur(function(e) {
		$(this).removeClass(foucsCss);
	});;
})();


/**
 * [description] 计算table奇偶样式
 * @return {[type]} [description]
 */
;(function(){
	var table = $('.oas-table');
	if(table.length == 0) return;

	//设置table元素奇偶样式
	var setCss = function(element){
		element.find('tr').each(function(index, el) {
			if(index%2 !== 0) $(this).addClass('bg');		
		});
	}

	//循环所有table元素
	table.each(function(index, el) {
		setCss($(this));		
	});
})();


/**
 * 创建其他类型对象
 */
GSY.namespace('GSY.other');


/**
 * [windowMask description] 窗帘式滑动效果
 * @param  {[object]} options [description] 相关选项
 * @return {[type]}         [description]
 */
GSY.other.windowMask = function(options){
	(function(){

		//初始化值
		var defined = {
			parent : null,	//鼠标需要滑动元素父节点
			hide : null,  	//隐藏元素对象选择器名称
			speed : 200 , 	//窗帘式滑动动画速度
			delay : 200   	//鼠标滑过延时时间
		} , timeer = null , animateflag = false;

		//合并选项卡
		var opt = $.extend({} , defined , options ? options : {});
		if ($(opt.parent).length == 0) return;

		//判断hide选择器是否出现"."
		opt.hide = /^\.[a-zA-Z$]{1}\S*$/.test(opt.hide) ? opt.hide : '.' + opt.hide;

		//动画处理方法
		var animate = function(el,type){
			el.animate({bottom: type}, opt.speed);
			timeer = null;
			animateflag = true
		}

		//鼠标滑过事件处理
		$(opt.parent).hover(function(){
			var hide = $(this).find(opt.hide);
			timeer = setTimeout(function(){
				animate(hide,-1);
			},opt.delay);
		},function(){
			var hide = $(this).find(opt.hide);
			
			//当动画还未执行，就离开当前元素了，需要停止定时器
			if(timeer) {
				clearTimeout(timeer);
				timeer = null;
			}

			//假如动画已经执行，鼠标离开需要会原点
			if(animateflag) {
				animate(hide,-(hide.outerHeight(true) + 3));
				animateflag = false;
			}
		});
	})(options);
};



/**
 * 弹窗组件效果操作方法
 * @param
 * @return
 */
;(function($){
	var lanType = GSY.config.get('lang');
	var _zindex = 5000; //5000;
	var timeHider = null;
	var _count = 0;
	var _over = true;
	var _load = '<div class="gsy-load"><p></p><div style="padding:10px 0 0">'+ LANG[lanType]['load_tips'] +'</div></div>';
	var _lastDialog = null;
	var _defaults = {
	    id : false,				
	    title : '窗口模式',
	    showClose : true,
	    time : 0,
	    mask : true,
	    width : 350,
	    element : null,
	    btn : null,
	    btnAlign : 'right',
	    align : 'center',
	    drag : true,
	    fixTop : 0,
	    checkLogin : false,
	    remove : true,
	    dir : 'down',
	    css : 'dialogCss',
	    icoAlign : 'center',
	    eType : 'show',
	    active : 0,
	    actCss : 'active',
	    hideTitle : false,
		tpl : 'card_html',
	    shortcut : true,
	    type : 'post',
		arrow : null,
		loadType : null,
		maskbg : '#000',
		boxBg : null
	};

		
	var fDialog = function(content,options){
		this.options = $.extend({},_defaults,options);
		this.content = content;
		this.count = _count;
		_count++;
	    _zindex ++ ;
	}

	fDialog.prototype = {
		
		//自动关闭按钮处理方法
		autoClose : function(element){
			if(this.options.time !== 0) {
				timeHider = setTimeout(function(){
					element.find('.gsy-close a').click();
				},this.options.time);
			}	
		},
		
		//当窗口弹出事件为隐藏的时候处理方法
		tower : function(element){
			var index = $(element).attr('dialog_count');
			$(element).attr('dialog_flag',true);
			var selector = 	'#' + (this.options.id ? this.options.id : 'dialog_' + index);
			if(this.content){ $(selector).find('.dialog_content').html(this.content);}
			this.setContent($(selector),this.options.width);
			this.autoClose($(selector));
			this.maskDiv(index);
		},
		
		//弹出窗口初始化事件处理
		one : function(element){
			var that = this; html

			
			//给窗口设置关联数字
			$(element).attr('dialog_count',that.count);
			$(element).attr('dialog_flag',true);
			
			//给窗口设置样式和选择器
			var html = $(that[that.options.tpl]()).css('width',that.options.width).attr('dialog_count',that.count).addClass('dialog_tips');
			html.attr('id',that.options.id ? that.options.id : 'dialog_' + (that.count));
			if(that.content && this.options.loadType){
				html.find('.dialog_content')[this.options.loadType](that.content);
			} else {
				html.find('.dialog_content').html(that.content);
			}
			
			//给弹出层设置背景
			if(this.options.boxBg) html.find('.dialog_content').css({'background-color' : this.options.boxBg});

			//是否显示窗口标题
			if(that.options.hideTitle) html.find('.gsy-title').hide();
			else html.find('.gsy-title .gsy-title-c').html(that.options.title);
			
			//给关闭窗口设置关联数字 和 是否显示关闭按钮
			html.find('.gsy-title .close a').attr('dialog_count',that.count);
			if(!that.options.showClose) html.find('.gsy-title .close a').hide();
			if(!that.options.arrow) html.find('.arrow').remove(); 
			
			//对显示按钮相关操作
			if(that.options.btn) {
				that.btn(html,that.options.btn,that.count);
				html.find('.gsy-btn').addClass('btn_' + that.options.btnAlign);
			}else html.find('.gsy-btn').remove();
			html.find('.gsy-btn').css('width',that.options.width - 44);
			$('body').append(html);
			return html;
		},
		
		//回去选择器对象
		getElement : function(){
			if(!this.options.element || this.options.element.get(0) == window){
				$('body').append('<div id="definElemenetDiv_'+ (this.count) +'" style="display:none"></div>');
				var el = $('#definElemenetDiv_' + (this.count));
				return el;
			}else return this.options.element;
		}, 
		
		//绑定手动关闭事件
		close : function(element,dialog,fn){
			$(element).removeAttr('dialog_flag');
			var index = element.attr('dialog_count');
			//if(this.options.drag) $('body').removeAttr('onselectstart','return false').removeAttr('style');
			if(typeof timeHider != 'undefined') {
				clearTimeout(timeHider);
				timeHider = null;
			}
			
			//绑定窗口关闭回调事件
			if(typeof fn == 'function'){
				fn();
			}else{
				if(typeof this.options.closeCallback == 'function') this.options.closeCallback(dialog,this.options);
			}
			
			//是否销毁窗口和遮罩层
			if(this.options.remove) {
				element.removeAttr('dialog_count');
				dialog.remove();
				if($('#mask_opacity_' + index).length > 0) $('#mask_opacity_' + index ).remove();
			}else {
				dialog.fadeOut(500);
				if($('#mask_opacity_' + index).length > 0) $('#mask_opacity_' + index ).fadeOut(500);
			}
			if($('#definElemenetDiv_' + (this.count)).length > 0) $('#definElemenetDiv_' + (this.count)).remove();
		},
		
		//生成遮罩层
		maskDiv : function(index){
			if(!this.options.mask) return;
			var html = $('<div id="mask_opacity_'+ index +'"></div>');
			var h = Math.max($(window).height(),$('body').outerHeight(true));
			if($('#mask_opacity_' + index).length > 0 ){
				$('#mask_opacity_' + index).show();
			}else{
				$('body').append(html);
				html.css({position : 'absolute' , top : 0 , left : 0 , width : '100%' , height : h, opacity : 0.5,'background-color': this.options.maskbg,'z-index':_zindex -1});
			}
		},
		
		//提示类弹出
		tips : function(){
			var element = this.getElement(),that = this;
			
			//只能执行一次
			if($(element).attr('dialog_flag') == 'true') return;
			
			//第二次进入处理方法
			if($(element).attr('dialog_count')) {
				this.tower(element);
				return;
			}
			
			//初始化窗口页面
			var ohtml =  this.one(element);
			
			//居中显示处理方法
			if(that.options.align == 'center'){
				ohtml.hide();
				that.setContent(ohtml,that.options.width);
				that.autoClose(ohtml);
				that.maskDiv(that.count);
			}
			
			//手动关闭处理方法
			ohtml.find('.gsy-close a').unbind('click').click(function(){
				that.close(element,ohtml);
				return false
			});
			
			//弹出之后，如果传入回调方法时，绑定回调事件
			if(typeof that.options.callback == 'function'){
				that.options.callback(ohtml,that.options);
			}
		},
		
		//后台弹出框操作处理方法
		box : function(){
			var element = this.getElement(),that = this;
			if(this.options.checkLogin && !SMK.util.getLoginStatus()){
				SMK.util.checkLogin()
				return; //是否开启登录检测
			}
			//检测是否传入入请求地址
			if(!that.options.url){
				alert(LANG[lanType]['inter_url']);
				return;
			}  
			
			//第二次进入处理方法
			if($(element).attr('dialog_count')) {
				this.tower(element);
				return;
			}
			
			//初始化窗口页面
			var ohtml =  this.one(element);
			
			//设置预加载处理方法
			ohtml.find('.dialog_content').html(_load);
			this.maskDiv(that.count);
			$('body').append(ohtml);
			this.setContent(ohtml,this.options.width,true);
			
			//手动关闭处理方法
			var callret = null;
			ohtml.find('.gsy-close a').unbind('click').click(function(){
				that.close(element,ohtml,function(){
					if(typeof that.options.closeCallback == 'function'){
						that.options.closeCallback(ohtml,that.options,callret);
					}	
				});
				return false
			});
			
			//与后台交互处理方法
			GSY.util.ajax({
				type : this.options.type,
				url : this.options.url,
				data : this.options.data,
				success : function(ret){
					setTimeout(function(){
						callret = ret;
						if(ret && (ret.code == 1)){ 
							ohtml.find('.dialog_content').html(ret.data.html);
							that.setContent(ohtml,that.options.width,true);
							if(typeof(that.options.callback) == 'function') that.options.callback(ohtml,that.options,ret);
						}	
					},10);	
				},
				error : function(ret){
					alert(ret.responseText);	
				}
			});
		},
		
		//自定义设置按钮
		btn : function(dom,btn,dialog_count){
			var me = this;
			for(val in btn){
				(function(_btn){
					if(typeof _btn.text != 'undefined' && typeof _btn.style != 'undefined'){
						var oBtn = $('<a href="javascript:void(0);"><span></span></a>');
						if(_btn.style) oBtn.addClass( _btn.style);
						if(_btn.target) oBtn.attr('target',_btn.target);
						if(_btn.text)  oBtn.children().html(_btn.text);
						if(_btn.url) oBtn.attr('href',_btn.url);
						if(_btn.handle && typeof(_btn.handle) == 'function' ){
							oBtn.click(function(){
								_btn.handle(dom,$(this),me.options);
								over = true;
								if($('#definElemenetDiv').length > 0) $('#definElemenetDiv').remove();
								if(!_btn.url) return false;
							});
						}else if(val == 'ok' || val == 'cancel'){
							oBtn.click(function(){
								dom.find('.gsy-close a').click();
								if($('#definElemenetDiv').length > 0) $('#definElemenetDiv').remove();
								return false;
							});
						}
						$(dom).find('.gsy-btn').append(oBtn);
					}
				})(btn[val]);
			}
			$(dom).find('.gsy-btn').css('width',$(dom).width() - 40);	
		},
		
		
		//设置元素块居中样式
		setContent : function(ele,width,animateType){
			var that = this;
			if(this.options.shortcut){
				$(document).unbind('keydown').keydown(function(e){
					if(e.which == ' 27'){
						ele.find('.gsy-close a').click();
					};			
				});
			}

			//计算相关值
			$(ele).css({'height':'auto'});
			var winObj = that.getElementInfo($(window));
			var eleObj = that.getElementInfo($(ele),true);
			var left = Math.floor((winObj.w - eleObj.w)/2);
			var top = Math.floor((winObj.h - eleObj.h)/2) + winObj.st;

			//是否使用动画
			if(animateType){
				var border = !parseInt($(ele).css('border-left-width')) ? 0 : parseInt($(ele).css('border-left-width'));
				var padding = !parseInt($(ele).css('padding-left')) ? 0 : parseInt($(ele).css('padding-left'));
				top = eleObj.h > winObj.h ? that.options.fixTop + winObj.st : top;
				ele.css({top:Math.floor(winObj.h/2 - eleObj.h/2) + winObj.st,left:Math.floor(winObj.w/2 - eleObj.w/2),'z-index':_zindex,height:eleObj.h - border*2 - padding*2 ,width:eleObj.w}).show();
			}else{
				top = eleObj.h > winObj.h ? that.options.fixTop + winObj.st : top;
				ele.css({top:top,left:left,'z-index':_zindex}).fadeIn(500);
			}


			//绑定拖拽事件
			if(this.options.drag){
				var defineX = 0,defineY = 0;
				$(ele).find('.gsy-title .gsy-title-c').css('cursor','move');
				$(ele).find('.gsy-title .gsy-title-c').mousedown(function(e){
					if($(window).height() <= $(ele).outerHeight(true)) return;
					var _that = $(this);
					$('body').css({'cursor':'move'});
					var eleObj =  that.getElementInfo($(ele));
					var pObj = that.getElementInfo(_that,true);
					defineX = e.pageX - eleObj.l + 8;
					defineY = e.pageY - eleObj.t + 8;
					
					//不满足条件跳出
					if(defineX >= pObj.w || defineY >= pObj.h) return;
					
					//绑定移动事件
					$(document).mousemove(function(e){
						var win = that.getElementInfo($(window));
						var dialog = that.getElementInfo(ele);
						var x = e.pageX - defineX
						var y = e.pageY - defineY;

						//计算位置
						if(x <= 0) x = 0;
						if(x >= win.w - dialog.w) x = win.w - dialog.w;
						if(y <= win.st + that.options.fixTop) y = win.st;
						if(y >= (win.st + win.h) -  dialog.h) y = (win.st + win.h) - dialog.h;

						//绑定页面释放事件
						$(document).mouseup(function(){
							$(document).unbind('mousemove');
							$('body').css({'cursor':'auto'});
						});

						$(ele).css({"left" : x,"top" : y});
					});
					return false;
				}).mouseup(function(){
					$(document).unbind('mousemove');
					$('body').css({'cursor':'auto'});
				})
			}
		},
		
		//仿jQuery弹窗框结构
		card_html : function(){
			var html = '<div class="gsy-dialog-box">';
				html +='	<div class="gsy-dialog-bg"></div>';
				html +='	<div class="gsy-layerBox">';
				html +='		<div class="gsy-title"><div class="gsy-title-c"></div><div class="gsy-close"><a dialog_count="0" href="javascript:void(0)"></a></div></div>';
				html +='		<div class="arrow arrow1"></div>';
				html +='		<div class="dialog_content"></div>';
				html +='		<div class="gsy-btn"></div>';
				html +='	</div>';
				html +='</div>';
			return $(html); 
		},
		
		//获取对象高宽和屏幕坐标
		getElementInfo : function(element,type){
			var type = type ? type : false;
			var json = {};
			if(element === undefined) element = $(window); 
			if($(element).length == 0) return null;
			if(element.get(0) == window){
				json.h = $(element).height();
				json.w = $(element).width();
				json.st = $(element).scrollTop();
				json.sl = $(element).scrollLeft();
			}else{
				if(type) {
					json.h = $(element).outerHeight();
					json.w = $(element).outerWidth();
				}else{
					json.h = $(element).innerHeight();
					json.w = $(element).innerWidth();
				}
				
			}
			if(element.get(0) == window) return json;
			json.t = Math.floor($(element).offset().top);
			json.l = Math.floor($(element).offset().left);
			return json;
		}
	};


	//对象实例化
	GSY.namespace('GSY.dialog');
	GSY.dialog.show = function(content, options) {
		if(_lastDialog) {
	        _lastDialog = null;
	    }
		_lastDialog = new fDialog(content, options);
		return _lastDialog;
	};

	//提示类弹出处理方法
	GSY.dialog.tips = function(content,options){
		var options = options || {};
		GSY.dialog.show(content,options);
		_lastDialog.tips();
	};

	//后台弹出框操作处理方法
	GSY.dialog.box = function(options){
		var options = options || {};
		GSY.dialog.show('',options);
		_lastDialog.box();
	};
})(jQuery);



/**
 * [description] 减少滚动事件和窗口大小改变频率处理方法
 * @return {[type]} [description]
 */
;(function(){
	var time = 200;   
	
	//存储窗口滚动事件处理方法
	GSY.config.scrollCode = {};
	var scrollTimeer = null;
	$(window).scroll(function(e){
		if(scrollTimeer) clearTimeout(scrollTimeer);
		scrollTimeer = setTimeout(function(){
			for( var key in GSY.config.scrollCode){
				if(typeof GSY.config.scrollCode[key] == 'function') {
					GSY.config.scrollCode[key]();
				}
			}
		},time);
	});

	//存储窗口大小改变事件处理方法
	GSY.config.resizeCode = {};
	var resizeTimeer = null;
	$(window).resize(function(e){
		if(resizeTimeer) clearTimeout(resizeTimeer);
		resizeTimeer = setTimeout(function(){
			for( var key in GSY.config.resizeCode){
				if(typeof GSY.config.resizeCode[key] == 'function') {
					GSY.config.resizeCode[key]();
				}
			}
		},time);
	});
})();

/**
 * [description] base64解码
 * @return {[type]} [description] (Base64.encode(str),Base64.decode(str))
 */
if(typeof Base64 == 'undefined'){
;(function(global){"use strict";if(global.Base64)return;var version="2.1.2";var buffer;if(typeof module!=="undefined"&&module.exports){buffer=require("buffer").Buffer}var b64chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var b64tab=function(bin){var t={};for(var i=0,l=bin.length;i<l;i++)t[bin.charAt(i)]=i;return t}(b64chars);var fromCharCode=String.fromCharCode;var cb_utob=function(c){if(c.length<2){var cc=c.charCodeAt(0);return cc<128?c:cc<2048?fromCharCode(192|cc>>>6)+fromCharCode(128|cc&63):fromCharCode(224|cc>>>12&15)+fromCharCode(128|cc>>>6&63)+fromCharCode(128|cc&63)}else{var cc=65536+(c.charCodeAt(0)-55296)*1024+(c.charCodeAt(1)-56320);return fromCharCode(240|cc>>>18&7)+fromCharCode(128|cc>>>12&63)+fromCharCode(128|cc>>>6&63)+fromCharCode(128|cc&63)}};var re_utob=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;var utob=function(u){return u.replace(re_utob,cb_utob)};var cb_encode=function(ccc){var padlen=[0,2,1][ccc.length%3],ord=ccc.charCodeAt(0)<<16|(ccc.length>1?ccc.charCodeAt(1):0)<<8|(ccc.length>2?ccc.charCodeAt(2):0),chars=[b64chars.charAt(ord>>>18),b64chars.charAt(ord>>>12&63),padlen>=2?"=":b64chars.charAt(ord>>>6&63),padlen>=1?"=":b64chars.charAt(ord&63)];return chars.join("")};var btoa=global.btoa||function(b){return b.replace(/[\s\S]{1,3}/g,cb_encode)};var _encode=buffer?function(u){return new buffer(u).toString("base64")}:function(u){return btoa(utob(u))};var encode=function(u,urisafe){return!urisafe?_encode(u):_encode(u).replace(/[+\/]/g,function(m0){return m0=="+"?"-":"_"}).replace(/=/g,"")};var encodeURI=function(u){return encode(u,true)};var re_btou=new RegExp(["[À-ß][-¿]","[à-ï][-¿]{2}","[ð-÷][-¿]{3}"].join("|"),"g");var cb_btou=function(cccc){switch(cccc.length){case 4:var cp=(7&cccc.charCodeAt(0))<<18|(63&cccc.charCodeAt(1))<<12|(63&cccc.charCodeAt(2))<<6|63&cccc.charCodeAt(3),offset=cp-65536;return fromCharCode((offset>>>10)+55296)+fromCharCode((offset&1023)+56320);case 3:return fromCharCode((15&cccc.charCodeAt(0))<<12|(63&cccc.charCodeAt(1))<<6|63&cccc.charCodeAt(2));default:return fromCharCode((31&cccc.charCodeAt(0))<<6|63&cccc.charCodeAt(1))}};var btou=function(b){return b.replace(re_btou,cb_btou)};var cb_decode=function(cccc){var len=cccc.length,padlen=len%4,n=(len>0?b64tab[cccc.charAt(0)]<<18:0)|(len>1?b64tab[cccc.charAt(1)]<<12:0)|(len>2?b64tab[cccc.charAt(2)]<<6:0)|(len>3?b64tab[cccc.charAt(3)]:0),chars=[fromCharCode(n>>>16),fromCharCode(n>>>8&255),fromCharCode(n&255)];chars.length-=[0,0,2,1][padlen];return chars.join("")};var atob=global.atob||function(a){return a.replace(/[\s\S]{1,4}/g,cb_decode)};var _decode=buffer?function(a){return new buffer(a,"base64").toString()}:function(a){return btou(atob(a))};var decode=function(a){return _decode(a.replace(/[-_]/g,function(m0){return m0=="-"?"+":"/"}).replace(/[^A-Za-z0-9\+\/]/g,""))};global.Base64={VERSION:version,atob:atob,btoa:btoa,fromBase64:decode,toBase64:encode,utob:utob,encode:encode,encodeURI:encodeURI,btou:btou,decode:decode};if(typeof Object.defineProperty==="function"){var noEnum=function(v){return{value:v,enumerable:false,writable:true,configurable:true}};global.Base64.extendString=function(){Object.defineProperty(String.prototype,"fromBase64",noEnum(function(){return decode(this)}));Object.defineProperty(String.prototype,"toBase64",noEnum(function(urisafe){return encode(this,urisafe)}));Object.defineProperty(String.prototype,"toBase64URI",noEnum(function(){return encode(this,true)}))}}})(this);
}







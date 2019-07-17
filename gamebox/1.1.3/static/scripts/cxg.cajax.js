//创建组件
GSY = window.GSY || {};
GSY.debug = true;

/**
 * [GSY.namespace 创建局部命名空间]
 * @param  {[sting]} ns [传入命名空间字符串]
 * @return {[object]}   [返回命名空间对象]
 */
if(typeof GSY.namespace == undefined){
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
}


/**
 * [description] 加载JOSN组件(JSON.stringify(JSON),JSON.parse(str))
 * @return {[type]} [description]
 */
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('3(5 p!==\'w\'){p={}}(6(){\'1y 1z\';6 f(n){7 n<10?\'0\'+n:n}3(5 11.m.q!==\'6\'){11.m.q=6(){7 1e(o.W())?o.1L()+\'-\'+f(o.1I()+1)+\'-\'+f(o.1H())+\'T\'+f(o.1q())+\':\'+f(o.1D())+\':\'+f(o.1C())+\'Z\':x};J.m.q=1B.m.q=1A.m.q=6(){7 o.W()}}y e,A,8,C,N,l;6 L(b){A.1h=0;7 A.M(b)?\'"\'+b.G(A,6(a){y c=N[a];7 5 c===\'H\'?c:\'\\\\u\'+(\'17\'+a.18(0).O(16)).1c(-4)})+\'"\':\'"\'+b+\'"\'}6 z(a,b){y i,k,v,h,B=8,9,2=b[a];3(2&&5 2===\'w\'&&5 2.q===\'6\'){2=2.q(a)}3(5 l===\'6\'){2=l.I(b,a,2)}1x(5 2){E\'H\':7 L(2);E\'P\':7 1e(2)?J(2):\'x\';E\'1w\':E\'x\':7 J(2);E\'w\':3(!2){7\'x\'}8+=C;9=[];3(Q.m.O.1v(2)===\'[w 1u]\'){h=2.h;D(i=0;i<h;i+=1){9[i]=z(i,2)||\'x\'}v=9.h===0?\'[]\':8?\'[\\n\'+8+9.K(\',\\n\'+8)+\'\\n\'+B+\']\':\'[\'+9.K(\',\')+\']\';8=B;7 v}3(l&&5 l===\'w\'){h=l.h;D(i=0;i<h;i+=1){3(5 l[i]===\'H\'){k=l[i];v=z(k,2);3(v){9.1d(L(k)+(8?\': \':\':\')+v)}}}}U{D(k 1f 2){3(Q.m.1g.I(2,k)){v=z(k,2);3(v){9.1d(L(k)+(8?\': \':\':\')+v)}}}}v=9.h===0?\'{}\':8?\'{\\n\'+8+9.K(\',\\n\'+8)+\'\\n\'+B+\'}\':\'{\'+9.K(\',\')+\'}\';8=B;7 v}}3(5 p.V!==\'6\'){A=/[\\\\\\"\\1t-\\1s\\1F-\\1r\\1m\\1n-\\1o\\1p\\1l\\1k\\1j-\\1i\\1b-\\1a\\19-\\15\\Y\\X-\\12]/g;N={\'\\b\':\'\\\\b\',\'\\t\':\'\\\\t\',\'\\n\':\'\\\\n\',\'\\f\':\'\\\\f\',\'\\r\':\'\\\\r\',\'"\':\'\\\\"\',\'\\\\\':\'\\\\\\\\\'};p.V=6(a,b,c){y i;8=\'\';C=\'\';3(5 c===\'P\'){D(i=0;i<c;i+=1){C+=\' \'}}U 3(5 c===\'H\'){C=c}l=b;3(b&&5 b!==\'6\'&&(5 b!==\'w\'||5 b.h!==\'P\')){14 13 1E(\'p.V\');}7 z(\'\',{\'\':a})}}3(5 p.R!==\'6\'){e=/[\\1G\\1m\\1n-\\1o\\1p\\1l\\1k\\1j-\\1i\\1b-\\1a\\19-\\15\\Y\\X-\\12]/g;p.R=6(c,d){y j;6 S(a,b){y k,v,2=a[b];3(2&&5 2===\'w\'){D(k 1f 2){3(Q.m.1g.I(2,k)){v=S(2,k);3(v!==1J){2[k]=v}U{1K 2[k]}}}}7 d.I(a,b,2)}c=J(c);e.1h=0;3(e.M(c)){c=c.G(e,6(a){7\'\\\\u\'+(\'17\'+a.18(0).O(16)).1c(-4)})}3(/^[\\],:{}\\s]*$/.M(c.G(/\\\\(?:["\\\\\\/1M]|u[0-1N-1O-F]{4})/g,\'@\').G(/"[^"\\\\\\n\\r]*"|1P|1Q|x|-?\\d+(?:\\.\\d*)?(?:[1R][+\\-]?\\d+)?/g,\']\').G(/(?:^|:|,)(?:\\s*\\[)+/g,\'\'))){j=1S(\'(\'+c+\')\');7 5 d===\'6\'?S({\'\':j},\'\'):j}14 13 1T(\'p.R\');}}}());',62,118,'||value|if||typeof|function|return|gap|partial||||||||length||||rep|prototype||this|JSON|toJSON||||||object|null|var|str|escapable|mind|indent|for|case||replace|string|call|String|join|quote|test|meta|toString|number|Object|parse|walk||else|stringify|valueOf|ufff0|ufeff|||Date|uffff|new|throw|u206f||0000|charCodeAt|u2060|u202f|u2028|slice|push|isFinite|in|hasOwnProperty|lastIndex|u200f|u200c|u17b5|u17b4|u00ad|u0600|u0604|u070f|getUTCHours|x9f|x1f|x00|Array|apply|boolean|switch|use|strict|Boolean|Number|getUTCSeconds|getUTCMinutes|Error|x7f|u0000|getUTCDate|getUTCMonth|undefined|delete|getUTCFullYear|bfnrt|9a|fA|true|false|eE|eval|SyntaxError'.split('|'),0,{}));

/**
 * [description] base64解码
 * @return {[type]} [description] (Base64.encode(str),Base64.decode(str))
 */
if(typeof Base64 == 'undefined'){
	;(function(global){"use strict";if(global.Base64)return;var version="2.1.2";var buffer;if(typeof module!=="undefined"&&module.exports){buffer=require("buffer").Buffer}var b64chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var b64tab=function(bin){var t={};for(var i=0,l=bin.length;i<l;i++)t[bin.charAt(i)]=i;return t}(b64chars);var fromCharCode=String.fromCharCode;var cb_utob=function(c){if(c.length<2){var cc=c.charCodeAt(0);return cc<128?c:cc<2048?fromCharCode(192|cc>>>6)+fromCharCode(128|cc&63):fromCharCode(224|cc>>>12&15)+fromCharCode(128|cc>>>6&63)+fromCharCode(128|cc&63)}else{var cc=65536+(c.charCodeAt(0)-55296)*1024+(c.charCodeAt(1)-56320);return fromCharCode(240|cc>>>18&7)+fromCharCode(128|cc>>>12&63)+fromCharCode(128|cc>>>6&63)+fromCharCode(128|cc&63)}};var re_utob=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;var utob=function(u){return u.replace(re_utob,cb_utob)};var cb_encode=function(ccc){var padlen=[0,2,1][ccc.length%3],ord=ccc.charCodeAt(0)<<16|(ccc.length>1?ccc.charCodeAt(1):0)<<8|(ccc.length>2?ccc.charCodeAt(2):0),chars=[b64chars.charAt(ord>>>18),b64chars.charAt(ord>>>12&63),padlen>=2?"=":b64chars.charAt(ord>>>6&63),padlen>=1?"=":b64chars.charAt(ord&63)];return chars.join("")};var btoa=global.btoa||function(b){return b.replace(/[\s\S]{1,3}/g,cb_encode)};var _encode=buffer?function(u){return new buffer(u).toString("base64")}:function(u){return btoa(utob(u))};var encode=function(u,urisafe){return!urisafe?_encode(u):_encode(u).replace(/[+\/]/g,function(m0){return m0=="+"?"-":"_"}).replace(/=/g,"")};var encodeURI=function(u){return encode(u,true)};var re_btou=new RegExp(["[À-ß][-¿]","[à-ï][-¿]{2}","[ð-÷][-¿]{3}"].join("|"),"g");var cb_btou=function(cccc){switch(cccc.length){case 4:var cp=(7&cccc.charCodeAt(0))<<18|(63&cccc.charCodeAt(1))<<12|(63&cccc.charCodeAt(2))<<6|63&cccc.charCodeAt(3),offset=cp-65536;return fromCharCode((offset>>>10)+55296)+fromCharCode((offset&1023)+56320);case 3:return fromCharCode((15&cccc.charCodeAt(0))<<12|(63&cccc.charCodeAt(1))<<6|63&cccc.charCodeAt(2));default:return fromCharCode((31&cccc.charCodeAt(0))<<6|63&cccc.charCodeAt(1))}};var btou=function(b){return b.replace(re_btou,cb_btou)};var cb_decode=function(cccc){var len=cccc.length,padlen=len%4,n=(len>0?b64tab[cccc.charAt(0)]<<18:0)|(len>1?b64tab[cccc.charAt(1)]<<12:0)|(len>2?b64tab[cccc.charAt(2)]<<6:0)|(len>3?b64tab[cccc.charAt(3)]:0),chars=[fromCharCode(n>>>16),fromCharCode(n>>>8&255),fromCharCode(n&255)];chars.length-=[0,0,2,1][padlen];return chars.join("")};var atob=global.atob||function(a){return a.replace(/[\s\S]{1,4}/g,cb_decode)};var _decode=buffer?function(a){return new buffer(a,"base64").toString()}:function(a){return btou(atob(a))};var decode=function(a){return _decode(a.replace(/[-_]/g,function(m0){return m0=="-"?"+":"/"}).replace(/[^A-Za-z0-9\+\/]/g,""))};global.Base64={VERSION:version,atob:atob,btoa:btoa,fromBase64:decode,toBase64:encode,utob:utob,encode:encode,encodeURI:encodeURI,btou:btou,decode:decode};if(typeof Object.defineProperty==="function"){var noEnum=function(v){return{value:v,enumerable:false,writable:true,configurable:true}};global.Base64.extendString=function(){Object.defineProperty(String.prototype,"fromBase64",noEnum(function(){return decode(this)}));Object.defineProperty(String.prototype,"toBase64",noEnum(function(urisafe){return encode(this,urisafe)}));Object.defineProperty(String.prototype,"toBase64URI",noEnum(function(){return encode(this,true)}))}}})(this);
}

/**
 * [GSY.md5 对字符串进行MD5加密]
 * @param  {[string]} s [需要加密的字符串]
 * @return {[string]}   [返回加密之后的字符串]
 */
GSY.namespace('GSY.md5');
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}(';(u(c){t b=0;t a="";t d=8;q.r.1F=u(e){v q.r.B(q.r.G(q.r.D(e),e.x*d))};q.r.G=u(p,k){p[k>>5]|=1D<<((k)%A);p[(((k+1G)>>>9)<<4)+14]=k;t o=1J;t n=-1K;t m=-1H;t l=1I;z(t g=0;g<p.x;g+=16){t j=o;t h=n;t f=m;t e=l;o=q.r.f(o,n,m,l,p[g+0],7,-1v);l=q.r.f(l,o,n,m,p[g+1],12,-1w);m=q.r.f(m,l,o,n,p[g+2],17,1x);n=q.r.f(n,m,l,o,p[g+3],22,-1A);o=q.r.f(o,n,m,l,p[g+4],7,-1B);l=q.r.f(l,o,n,m,p[g+5],12,1y);m=q.r.f(m,l,o,n,p[g+6],17,-1z);n=q.r.f(n,m,l,o,p[g+7],22,-1L);o=q.r.f(o,n,m,l,p[g+8],7,1V);l=q.r.f(l,o,n,m,p[g+9],12,-1X);m=q.r.f(m,l,o,n,p[g+10],17,-1Y);n=q.r.f(n,m,l,o,p[g+11],22,-24);o=q.r.f(o,n,m,l,p[g+12],7,25);l=q.r.f(l,o,n,m,p[g+13],12,-1Z);m=q.r.f(m,l,o,n,p[g+14],17,-1P);n=q.r.f(n,m,l,o,p[g+15],22,1N);o=q.r.g(o,n,m,l,p[g+1],5,-1T);l=q.r.g(l,o,n,m,p[g+6],9,-S);m=q.r.g(m,l,o,n,p[g+11],14,R);n=q.r.g(n,m,l,o,p[g+0],20,-Z);o=q.r.g(o,n,m,l,p[g+5],5,-V);l=q.r.g(l,o,n,m,p[g+10],9,J);m=q.r.g(m,l,o,n,p[g+15],14,-1c);n=q.r.g(n,m,l,o,p[g+4],20,-1e);o=q.r.g(o,n,m,l,p[g+9],5,1d);l=q.r.g(l,o,n,m,p[g+14],9,-1f);m=q.r.g(m,l,o,n,p[g+3],14,-1h);n=q.r.g(n,m,l,o,p[g+8],20,1g);o=q.r.g(o,n,m,l,p[g+13],5,-19);l=q.r.g(l,o,n,m,p[g+2],9,-18);m=q.r.g(m,l,o,n,p[g+7],14,1a);n=q.r.g(n,m,l,o,p[g+12],20,-1b);o=q.r.h(o,n,m,l,p[g+5],4,-1o);l=q.r.h(l,o,n,m,p[g+8],11,-1n);m=q.r.h(m,l,o,n,p[g+11],16,1p);n=q.r.h(n,m,l,o,p[g+14],23,-1r);o=q.r.h(o,n,m,l,p[g+1],4,-1q);l=q.r.h(l,o,n,m,p[g+4],11,1j);m=q.r.h(m,l,o,n,p[g+7],16,-1i);n=q.r.h(n,m,l,o,p[g+10],23,-1k);o=q.r.h(o,n,m,l,p[g+13],4,1m);l=q.r.h(l,o,n,m,p[g+0],11,-1l);m=q.r.h(m,l,o,n,p[g+3],16,-M);n=q.r.h(n,m,l,o,p[g+6],23,K);o=q.r.h(o,n,m,l,p[g+9],4,-L);l=q.r.h(l,o,n,m,p[g+12],11,-O);m=q.r.h(m,l,o,n,p[g+15],16,N);n=q.r.h(n,m,l,o,p[g+2],23,-H);o=q.r.i(o,n,m,l,p[g+0],6,-W);l=q.r.i(l,o,n,m,p[g+7],10,X);m=q.r.i(m,l,o,n,p[g+14],15,-U);n=q.r.i(n,m,l,o,p[g+5],21,-P);o=q.r.i(o,n,m,l,p[g+12],6,T);l=q.r.i(l,o,n,m,p[g+3],10,-Q);m=q.r.i(m,l,o,n,p[g+10],15,-Y);n=q.r.i(n,m,l,o,p[g+1],21,-I);o=q.r.i(o,n,m,l,p[g+8],6,1s);l=q.r.i(l,o,n,m,p[g+15],10,-1R);m=q.r.i(m,l,o,n,p[g+6],15,-1Q);n=q.r.i(n,m,l,o,p[g+13],21,1S);o=q.r.i(o,n,m,l,p[g+4],6,-1M);l=q.r.i(l,o,n,m,p[g+11],10,-1O);m=q.r.i(m,l,o,n,p[g+2],15,1U);n=q.r.i(n,m,l,o,p[g+9],21,-1W);o=q.r.s(o,j);n=q.r.s(n,h);m=q.r.s(m,f);l=q.r.s(l,e)}v E(o,n,m,l)};q.r.s=u(e,h){t g=(e&y)+(h&y);t f=(e>>16)+(h>>16)+(g>>16);v(f<<16)|(g&y)};q.r.w=u(j,g,f,e,i,h){v q.r.s(q.r.F(q.r.s(q.r.s(g,j),q.r.s(e,h)),i),f)};q.r.f=u(g,f,k,j,e,i,h){v q.r.w((f&k)|((~f)&j),g,f,e,i,h)};q.r.g=u(g,f,k,j,e,i,h){v q.r.w((f&j)|(k&(~j)),g,f,e,i,h)};q.r.h=u(g,f,k,j,e,i,h){v q.r.w(f^k^j,g,f,e,i,h)};q.r.i=u(g,f,k,j,e,i,h){v q.r.w(k^(f|(~j)),g,f,e,i,h)};q.r.B=u(g){t f=b?"1u":"1t";t h="";z(t e=0;e<g.x*4;e++){h+=f.C((g[e>>2]>>((e%4)*8+4))&15)+f.C((g[e>>2]>>((e%4)*8))&15)}v h};q.r.D=u(h){t g=E();t e=(1<<d)-1;z(t f=0;f<h.x*d;f+=d){g[f>>5]|=(h.1C(f/d)&e)<<(f%A)}v g};q.r.F=u(e,f){v(e<<f)|(e>>>(A-f))}})(1E);',62,130,'||||||||||||||||||||||||||GSY|md5||var|function|return|cmn|length|65535|for|32|binl2hex|charAt|str2binl|Array|bit_rol|core|995338651|2054922799|38016083|76029189|640364487|722521979|530742520|421815835|57434055|1894986606|643717713|1069501632|1700485571|1416354905|701558691|198630844|1126891415|1051523|373897302|||||||||51403784|1444681467|1735328473|1926607734|660478335|568446438|405537848|1019803690|1163531501|187363961|155497632|1272893353|1094730640|358537222|681279174|2022574463|378558|1839030562|1530992060|35309556|1873313359|0123456789abcdef|0123456789ABCDEF|680876936|389564586|606105819|1200080426|1473231341|1044525330|176418897|charCodeAt|128|jQuery|val|64|1732584194|271733878|1732584193|271733879|45705983|145523070|1236535329|1120210379|1502002290|1560198380|30611744|1309151649|165796510|718787259|1770035416|343485551|1958414417|42063|40341101|||||1990404162|1804603682'.split('|'),0,{}))


GSY.namespace('GSY.cajax');

/**
 * [echo description] 兼容ie6-8一维json对象的打印
 * @param  {[object]} json [description]
 * @return {[type]}      [description]
 */
GSY.cajax.echo = function(json,desc){
	if(!GSY.debug) return;
	var data = JSON.stringify(json);

	//页面路径地址
	var path = window.location.pathname;

	//是否设置描述字段
	if(desc == undefined) desc = '';
	else desc = desc;

	//当传入的参数字符串时候处理方
	if(typeof json == 'string')  {
		if(desc != '') var str = 'Path：' + path + '\n' + 'String：' + json + '\n' + 'Desc：' +  desc;
		else var str = 'Path：' + path + '\n' + 'String：' + json;
		alert(str);
		return;
	}

	var temp = {};
	temp['Path'] = path;
	temp['String'] = data;
	temp['Desc'] = desc;
	var str = '';   
	for(key in temp) str += key + '==>' + temp[key] + '\n';
	alert(str);
};

/**
 * [random description] 生成随机数
 * @param  {[number]} min [description] 生成最小数字
 * @param  {[number]} max [description] 生成最大数字
 * @return {[number]}     [description] 返回随机数
 */
GSY.cajax.random = function(min, max){
	var Range = max - min;
    var Rand = Math.random();
    return(min + Math.round(Rand * Range));
};

/**
 * [jsonToPostStr description] 把json转成特定的传输数据字符串
 * @param  {[type]} json [description] {"key1":"val1","key2":"val2"}
 * @return {[type]}      [description] 'key1=val1&=key2=val2'
 */
GSY.cajax.jsonToPostStr = function(json){
	var str = '' , i = 0;
	for(var key in json) {
		if(i == 0) str += key + '=' + Base64.encode(json[key]);
		else str += '&' + key + '=' + Base64.encode(json[key]);
		i++;
	}
	return str;
};

/**
 * [jsonToStr description] 
 * @param  {[type]} json [description] {"key1":"val1","key2":"val2"}
 * @return {[type]}      [description]'{"key1":"val1","key2":"val2"}'
 */
/**
 * [jsonToStr description] 把json串转化为base64的json字符串
 * @param  {[object]} json [description] json 对象
 * @return {[sting]}      [description] 返回json字符串
 */
GSY.cajax.jsonToStr = function(json){
	var temp = {};
	for(var key in json){
		temp[key] = Base64.encode(json[key]);
	}

	//当前浏览器为高级浏览器的时候
	if(typeof JSON != 'undefined' && typeof JSON.stringify == 'function'){
		return JSON.stringify(temp);	
	}
};

/**
 * [strToJson description] 把base64的json字符串转化json
 * @param  {[type]} json [description] {"key1":"val1","key2":"val2"}
 * @return {[type]}      [description]'{"key1":"val1","key2":"val2"}'
 */
GSY.cajax.strToJson = function(jsonStr){
	var temp = {}
	
	//当前浏览器为高级浏览器的时候
	if(typeof JSON != 'undefined' && typeof JSON.parse == 'function'){
		var json = JSON.parse(jsonStr);	
	}

	for(var key in json){
		temp[key] = Base64.decode(json[key]);
	}

	return temp;
};


/**
 * [cAjax description] js调用c++接口交互数据统一处理 
 * @param  {[string]} 		Fname   [description]  	c++方法名字 
 * @param  {[json object]} 	options [description] 	交互传数据  如需回调方法 请传入固定字段callback ：c++方法名字 
 * @param  {[string]} 		desc    [description]  	方法描述
 * @return {[type]}         		[description]
 */
GSY.cajax.cAjax = function(Fname,options,desc){

	//创建临时变量
	var param = {};

	//交换数据
	for(var key in options){
		if(key == 'callback') continue;
		else param[key] = Base64.encode(options[key]);
	}
	

	//有回调方法
	if(typeof options.callback == 'function'){
		
		//动态创建回调方法名字
		var random =  GSY.cajax.random(100000,999999) + '_' + GSY.cajax.random(1000000,9999999) + '_' + (new Date()).getTime();
		param['callback'] = 'OASCAjax_' + random;

		//创建回调方法
		window['OASCAjax_' + random] = function(ret){
			var retObj = JSON.parse(ret),temp = {};

			//交换数据
			for(var k in retObj){
				temp[k] = Base64.decode(retObj[k]);
			}

			options.callback(retObj); //回调JS方法
			window['OASCAjax_' + random] = null; //注销方法
		}
	
	//无回调方法
	}else{
		var param = $.extend({},options);
	}

	//把json对象转化为字符串
	var paramstr = JSON.stringify(param);

	JS_PostMessage(Fname,paramstr,desc);
} 



/**
 * [jAjax description] C++统一调用js方法 例如：GSY.cajax.jAjax('Fname','{}','desc');
 * @param  {[string]} Fname   [description] js方法名字
 * @param  {[string]} options [description] 所传入的参数json string '{}'。 如需回调方法 请传入固定字段callback ：c++方法名字 
 * @param  {[string]} desc    [description] 方法描述
 * @return {[type]}         [description]
 */
GSY.cajax.jAjax = function(Fname,options,desc){
	
	//创建临时变量
	var obj = JSON.parse(options),ret = {},param = {};

	//交换数据
	for(var key in obj){
		if(key == 'callback') continue;
		else param[key] = Base64.decode(obj[key]);
	}
	


	//调用方法存在的时候处理
	if(typeof window[Fname] == 'function') {
		var retData = window[Fname](param);
		if(retData){
			for(var key in retData){tinue;
				ret[key] = Base64.encode(retData[key]);
			}
		} 
		ret['code'] = true;
	
	//调用方法不存在的时候处理
	}else{
		ret['code'] = false;
	}

	//假如有回调方法
	if(obj.callback) {
		var retStr = JSON.stringify(ret);
		obj.callback(retStr);
	}
};







/**
 * [setLocalGameData description] 设置本地存储数据
 * @param  {[string]} 	options.key  		[description] 存储键值名称（必选）
 * @param  {[string]} 	options.value 		[description] 存储数据值（必选）
 * @param  {[string]} 	options.type 		[description] 存储方式 	默认值(false) 临时存储方法  (true)永久存储
 * @param  {[function]} callback 	[description] 回调函数（可选）
 * @return 
 */
GSY.cajax.setLocalData = function(options,callback){
	return;
	var obj = {
		action : 'set',
		type : true,
		key : null,
		value : null
	}

	//合并项
	var data = $.extend({},obj,options);

	//key与value不能为空
	if(!data.key || !data.value){
		return;
	}	

	//启用回调方法
	if(typeof callback == 'function'){
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
};


/**
 * [getLocalGameData description] 获取本地存储数据
 * @param  {[string]} 	key 		[description] 获取存储数据键值（必选）
 * @param  {[function]} callback 	[description] 回调函数（必选）
 * @return 
 */
GSY.cajax.getLocalData = function(options,callback){
	return;
	var obj = {
		action : 'get',
		key : null,
		type : true
	};
	var data = $.extend({},obj,options);
	
	//不能为空
	if(!data.key) return;

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
	GSY.gamebox.cAjax('WINIE_Localstorage',data,'获取本地存储数据');
};



/**
 * [removeLocalGameData description] 删除本地存储数据
 * @param  {[string]} 		key 		[description] 获取存储数据某个键值数据
 * @param  {[function]} 	callback  	[description] 回调函数（可选）
 * @return 
 */
GSY.cajax.removeLocalData = function(options,callback){
	return;
	var obj = {
		action : 'remove',
		key : null,
		type : true
	};
	
	var data = $.extend({},obj,options);
	
	//不能为空
	if(!data.key) return;

	//需要回调方法
	if(typeof callback == 'function'){
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
};












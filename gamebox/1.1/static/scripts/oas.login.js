// JavaScript Document

/**
 * [initAdsDate description] 初始化登陆页面焦点图数据
 * @return {[type]} [description]
 */
GSY.gamebox.initAdsDate = function(parentElement){

	//没有找到父元素不处理
	if(parentElement.length == 0) return;

	var url = GSY.config.get('getAdsUrl');
	var cookieKey = 'OAS_ADS_' + GSY.config.get('gamecode');
	var data = {
		gamecode : GSY.config.get('gamecode')
	};

	//成功回调方法
	var callback = function(value){
		var html = "";
		var i = 0;
		for(var key in value){
			var str = GSY.gamebox.tpl('ads');
			str = str.replace(/\{url\}/g,value[key]['link']);
			str = str.replace(/\{desc\}/g,(value[key]['desc'] ? value[key]['desc'] : ''));
			str = str.replace(/\{image_url\}/g,value[key]['imgurl']);
			html += str;	
		}

		parentElement.children().html(html);

		//焦点图自动轮播
		oasSlider({
			width : 325,							
			height : 160,							
			parentEle : parentElement,	
			icoType : 'number',						
			align : 'right',						
			icoShow : 1 ,  							
			scrollTime : 500,
			type : 'slider',						
			time : 5000,
			isNext : false
		});
	};

	//已经缓存了，读取缓存信息
	if(GSY.cookie.get(cookieKey)){
		var val = GSY.gamebox.eval(GSY.cookie.get(cookieKey));
		callback(val);
		return false;
	}

	GSY.util.ajax({
		url : url,
		data : data,
		type : 'get',
		success : function(ret){
			var html = "";
			if(ret && ret.status == 'ok'){
				callback(ret.val);

				//缓存处理
				var str = "[";
				var i = 0;
				for(key in ret.val){
					if(i == 0) str += GSY.gamebox.jsonTojsonStr(ret.val[key]);
					else  str += ',' +  GSY.gamebox.jsonTojsonStr(ret.val[key]);
					i++;
				}
				str += "]";
				GSY.cookie.set(cookieKey,str,{expires : 24});
			}	
		}	
	});
};


/**
 * [initAdsDate description] 初始化登陆页面最新新闻数据
 * @return {[type]} [description]
 */
GSY.gamebox.initNewDate = function(parentElement){

	//没有找到父元素不处理
	if(parentElement.length == 0) return;

	var url = GSY.config.get('getNewsUrl');
	var cookieKey = 'OAS_NEW_' + GSY.config.get('gamecode');
	var data = {
		gamecode : GSY.config.get('gamecode'),
		//newnumber : 6, //可选参数
		m : 'gbox.getnews'
		
	};

	//回调处理
	var callback = function(value){
		var html = '';
		var i = 0;
		var obj = value;
		for(var key in obj){
			var str = GSY.gamebox.tpl('news');
			str = str.replace(/\{url\}/g,obj[key]['url']);
			str = str.replace(/\{title\}/g,obj[key]['title']);
			html += str;	
		}
		parentElement.html(html);
	};

	//已经缓存了，读取缓存信息
	//GSY.util.echo(['GSY.gamebox.login=>'+ GSY.cookie.get(cookieKey)]);
	if(GSY.cookie.get(cookieKey)){
		var val = GSY.gamebox.eval(GSY.cookie.get(cookieKey));
		callback(val);
		return false;
	}


	GSY.util.ajax({
		url : url,
		data : data,
		type : 'get',
		success : function(ret){
			var html = '';
			if(ret && ret.code == 1){
				callback(ret.data.news);

				//缓存处理
				var str = "[";
				var i = 0;
				for(key in ret.data.news){
					if(i == 0) str += GSY.gamebox.jsonTojsonStr(ret.data.news[key]);
					else  str += ',' +  GSY.gamebox.jsonTojsonStr(ret.data.news[key]);
					i++;
				}
				str += "]";
				GSY.cookie.set(cookieKey,str,{expires : 24});

			}	
		}
	});
};


/**
 * [getUserToken description] 获取用户登陆token
 * @param  {Function} callback [description]
 * @param  {[type]}   options  [description]
 * @return {[type]}            [description]
 */
GSY.gamebox.getUserUid = null;
GSY.gamebox.getUserToken = function(callback,data,element){

	//获取元素并存储
	if(element != undefined){
		var parent = element.closest('div[data-selecter=parent]');
		var username = parent.find('input[data-name=username]');
		var pwd = parent.find('input[data-name=password]');
	}

	//登陆用户中心
	GSY.util.ajax({
		url : '//passport.oasgames.com/index.php?m=login',
		data : data,
		type : 'get',
		success : function(ret){
			//GSY.util.echo(ret.val);
			//登陆成功处理
			if(ret.status == 'ok'){
				GSY.gamebox.getUserUid = ret.val.id;
				GSY.gamebox.getUserId(ret.val.loginKey,GSY.config.get('gamecode'),function(uid){
					callback(ret.val.loginKey,uid);
				})
			}
			//登陆失败处理
			else if(ret.status == 'fail' && ret.err_code == 3){
				//alert(LANG[GSY.config.get('lang')]['Gamebox_login_error']);
			 	GSY.gamebox.message(LANG[GSY.config.get('lang')]['Gamebox_login_error']);
			 	username.select();	
			
			//登陆失败处理
			}else GSY.gamebox.message(LANG[GSY.config.get('lang')]['Gamebox_login_error']);
			GSY.gamebox.loginFlag = false;
		},
		error : function(ret){
			GSY.gamebox.message(LANG[GSY.config.get('lang')]['Gamebox_login_fail']);
			GSY.gamebox.loginFlag = false;
		}
	});	
}


/**
 * [oneClickGoPlayGame description] 一键多开
 * @param  {[type]} element [description]
 * @return {[type]}         [description]
 */
GSY.gamebox.oneClickGoPlayGame = function(element){
	var list = element.parent().siblings('.gb-accountslist-list-box').find('.gb-accountslist-list');
	
	//循环被选中的账号
	var count = 0 ;
	list.find('span[data-selecter=noconfirm] .gb-i').each(function(index, el) {
		//GSY.util.echo([$(this).hasClass('gb-confirm')]);
		if($(this).hasClass('gb-confirm')){
			count++;
	        var $el = $(this);
	        (function($el){
	            GSY.gamebox.oneClickGoPlayGameCode($el.closest('.gb-accountslist-list'));
	        })($el);				
		}	
	});	

	//未选登陆账号
	if(count == 0){
		GSY.util.echo(['未选登陆账号']);	
	}

}

/**
 * [oneClickGoPlayGameCode description] 一键对多开方法处理
 * @param  {[type]} item [description]
 * @return {[type]}      [description]
 */
GSY.gamebox.oneClickGoPlayGameCode = function(item){
	var _data = GSY.util.getEleData(item);

	//主账号是google和facebook账号的时候不处理
	if(_data.type == 'GOOGLE' || _data.type == 'fb'){
		return;	
	}
	//判断用户是否登陆
	var flag = GSY.gamebox.userRunCodeStatus(_data.username);
	if(flag) return;

	//获取用户信息并设置用户信息
	GSY.gamebox.getUserToken(function(token,uid){
		var data = {
			username:_data.username,
			pwd:_data.pwd,
			type:_data.type,
			token:token,
			discription_ : _data.discription_
		};
		//上报登录日志
		GSY.gamebox.uploadLoginLog({'uuid':uid,'event':'smalllogin','type':'oas','async':'false'})
		//js调用c++方法
		GSY.gamebox.cAjax('WINIE_LoginOK',data,'GOOGLE登陆成功操作');
		//var str = GSY.gamebox.jsonTojsonStr(data);
		//GSY.util.echo(['GSY.gamebox.login=>'+str]);
		//if(typeof window.external != undefined) window.external.WINIE_LoginOK(str);
	},{email : _data.username , pwd : _data.pwd});
};

/**
 * [userRunCode description] 判断当前登录账号是否正在运行中
 * @param  {[type]} element [description]
 * @return {[type]}         [description]
 */
GSY.gamebox.userRunCodeStatus = function(username){
	//设置当前登陆用户信息
	var actStr = username + '=' + GSY.gamebox.userRuningData['act'];
	//判断当前账号是否已登录游戏
	var flag = false;
	var runingUserData = GSY.gamebox.userRuningData['runing']; //获取已登录用户信息

	for(var key in runingUserData){
		//GSY.util.echo([runingUserData[key],actStr]);
		//找到当前已经登陆游戏中
		if(runingUserData[key] == actStr){

			flag = true;
			break;
		}
	}
	
	//GSY.util.echo([flag]);
	if(flag){
		var str = LANG[GSY.config.get('lang')]['Gamebox_logined'].replace(/\{uname\}/,username);
		if($('#gb-dialog-login-box').length > 0){
			//GSY.gamebox.userRuningCallback = function(ret){
				//$('#gb-dialog-login-box').find('input[data-name=username]').focus().select();
				//GSY.gamebox.userRuningCallback = null;
			//}
			GSY.gamebox.message(str);	
		}else{
			GSY.gamebox.message(str);	
		}
		
	}

	return flag;
}


/**
 * [login description] 登陆操作
 * @param  {[type]} element [description]
 * @return {[type]}         [description]
 */
GSY.gamebox.loginFlag = false;
GSY.gamebox.login = function(element,loginType){
	
	//获取元素并存储
	var parent = element.closest('div[data-selecter=parent]');
	var username = parent.find('input[data-name=username]');
	var pwd = parent.find('input[data-name=password]');
	var rememberElement = parent.find('input[data-name=remember]');
	//var automaticElement = parent.find('input[data-name=automatic]');
	var type = parent.attr('data-type');

	//用户名不能为空
	if(username.val() == ''){
		GSY.gamebox.message(LANG[GSY.config.get('lang')]['Gamebox_uname_empty']);
		username.focus();
		GSY.gamebox.loginFlag = false;
		return false;
	}

	//密码不能为空
	if(pwd.val() == ''){
		GSY.gamebox.message(LANG[GSY.config.get('lang')]['Gamebox_upwd_empty']);
		pwd.focus();
		GSY.gamebox.loginFlag = false;
		return false;
	}

	//开小号的时候判断当前登陆账号是否登陆游戏
	if(loginType != undefined && GSY.gamebox.userRuningData) {
		
		//返回当前账号是否已登录游戏状态
		var flag = GSY.gamebox.userRunCodeStatus(username.val());
		if(flag){
			GSY.gamebox.loginFlag = false;
			return false;		
		}
	}

	//正在交互处理中
	if(GSY.gamebox.loginFlag){
		//GSY.util.echo(['Gamebox_logining=>'+ LANG[GSY.config.get('lang')]['Gamebox_logining']]);
		GSY.gamebox.message(LANG[GSY.config.get('lang')]['Gamebox_logining']);
		return false;	
	}
	GSY.gamebox.loginFlag = true;


	//获取用户token并客户端C++交互
	GSY.gamebox.getUserToken(function(token,uid){
		if(loginType == undefined){
			var rememberStatus = rememberElement.is(':checked') ? 'true' : 'false';
			//var automaticStatus = automaticElement.is(':checked') ? 'true' : 'false';
			var data = {
				username : username.val(),
				pwd : pwd.val(),
				type : type,
				remember : rememberStatus,
				automatic : 'false',
				token : token,
				callback : 'GSY.gamebox.loginCallback'
			}
		}else{
			var data = {
				username : username.val(),
				pwd : pwd.val(),
				type : type,
				token : token,
				callback : 'GSY.gamebox.loginCallback'
			}	
		}
		//登录上报日志
		if(loginType==undefined){
			GSY.gamebox.uploadLoginLog({'uuid':uid,'event':'webmainlogin','type':'oas','async':'false'});
		}else{
			GSY.gamebox.uploadLoginLog({'uuid':uid,'event':'smalllogin','type':'oas','async':'false'});
		}
		//js调用c++方法
		GSY.gamebox.cAjax('WINIE_LoginOK',data,'OAS用户登陆成功');
	},{email : username.val() , pwd : pwd.val()},element);
};

/**
 * [description] 绑定登陆器账户和密码回车键事件
 * @return {[type]} [description]
 */
;(function(){
	if(pageType == 'login'){
		var login = $('#gb-login-down-inti').find('div[data-selecter=parent]');
		var element = login.find('.gb-loginBox-btn a');
		//绑定账户回车事件
		login.keypress(function(e) {
			var dataname = $(e.target).attr('data-name');
			if( (dataname == 'username' || dataname == 'password') && e.keyCode == 13){
					GSY.gamebox.login(element);			
			}	
		});
	}
})();

/**
 * [description] 绑定内部弹出层登陆框账户和密码回车键事件
 * @return {[type]} [description]
 */
;(function(){
	if(pageType == 'login_dialog_pop'){
		var login = $('#gb-dialog-login-box').find('div[data-selecter=parent]');
		var element = login.find('.gb-btn-green');
		//绑定账户回车事件
		login.keypress(function(e) {
			var dataname = $(e.target).attr('data-name');
			if( (dataname == 'username' || dataname == 'password') && e.keyCode == 13){
					GSY.gamebox.login(element,'login_dialog');		
			}	
		});		
	}
})();





/**
 * [FBlogin description] FACEBOOK登陆回调方法
 * @param {[type]} element   [description]
 * @param {[type]} loginType [description]
 */
GSY.gamebox.FBloginCallback = function(ret){

	//登陆成功处理
	if(ret.status == 'ok') {
		var data = {
			token : ret.val.loginKey,
			type : 'fb',
			username : ret.val.uname,
			pwd : 'false',
			remember : 'false',
			automatic : 'false',
			uid: ret.val.id,
			callback : 'GSY.gamebox.loginCallback'
		};
		//登录上报日志
		GSY.gamebox.uploadLoginLog({'uuid': ret.val.id,'event':'webmainlogin','type':'fb','async':'false'})
		//js调用c++方法
		GSY.gamebox.cAjax('WINIE_LoginOK',data,'FACEBOOK登陆成功操作');

		//var str = GSY.gamebox.jsonTojsonStr(data);
		//GSY.util.echo(['fb=>' + str]);
		
		//if(typeof window.external != undefined) window.external.WINIE_LoginOK(str);
	//登陆失败处理
	}else if(ret.status == 'fail' && ret.err_code == 3) GSY.gamebox.message(ret.err_msg);	
	//登陆失败处理
	else GSY.gamebox.message(LANG[GSY.config.get('lang')]['Gamebox_login_fail']);
	GSY.gamebox.loginFlag = false;
};




/**
 * [FBlogin description] GOOGLE登陆回调方法
 * @param {[type]} element   [description]
 * @param {[type]} loginType [description]
 */
GSY.gamebox.GOOGLEloginCallback = function(ret){
	//登陆成功处理
	if(ret.status == 'ok') {
		var data = {
			token : ret.val.loginKey,
			type : 'GOOGLE',
			username : ret.val.uname,
			pwd : 'false',
			remember : 'false',
			automatic : 'false',
			uid:ret.val.id,
			callback : 'GSY.gamebox.loginCallback'
		};
		//登录上报日志
		GSY.gamebox.uploadLoginLog({'uuid':ret.val.id,'event':'webmainlogin','type':'google','async':'false'})
		//js调用c++方法
		GSY.gamebox.cAjax('WINIE_LoginOK',data,'GOOGLE登陆成功操作');
		//var str = GSY.gamebox.jsonTojsonStr(data);
		//GSY.util.echo(['GOOGLE=>' + str]);


		//if(typeof window.external != undefined) window.external.WINIE_LoginOK(str);
	//登陆失败处理
	}else if(ret.status == 'fail' && ret.err_code == 3) GSY.gamebox.message(ret.err_msg);	
	//登陆失败处理
	else GSY.gamebox.message(LANG[GSY.config.get('lang')]['Gamebox_login_fail']);
};

/**
 * [loginCallback description] OAS登陆回调方法
 * @param  {[type]} ret [description]
 * @return {[type]}     [description]
 */
GSY.gamebox.loginMainType = null; //用户登录是否打开main页面
GSY.gamebox.loginCallback = function(ret){
	GSY.gamebox.loginCallbackError = function(){
		GSY.gamebox.loginFlag = false;	
		GSY.gamebox.loginCallbackError = null;		
	};

	if(typeof ret == 'string') ret = GSY.gamebox.eval(ret);
	
	//传输参数
	var param = {
		token : ret.token,
		lg : GSY.config.get('lang'),
		gameid : GSY.config.get('gamecode'),
		name : ret.name
	};
	if (ret.code == 1) {
		if (GSY.gamebox.loginMainType === 'play' || 1) {  //登录完成跳转到游戏页面
			GSY.gamebox.getLocalGameData({key:'OAS_GAME_INFRO_' + GSY.config.get('gamecode')},function(ret){
				param.gamename = GSY.gamebox.eval(ret).name;
				var url = GSY.config.get('path').replace(/\{pagename\}/,'game')+ '?' + GSY.gamebox.jsonToPostStr(param);	
				window.location.href = url;
			});
		} else if (GSY.gamebox.loginMainType === 'main') {	//登录完成跳转到main页面
			var url = GSY.config.get('path').replace(/\{pagename\}/, 'main') + '?' + GSY.gamebox.jsonToPostStr(param);
			window.location.href = url;
		}
	} else if (ret.code == 0) {
		GSY.gamebox.message(LANG[GSY.config.get('lang')]['Gamebox_AccPassError', 'GSY.gamebox.loginCallbackError']);
	}

};



/**
 * [loginCallback description] 登陆器用户信息初始化
 * @return {[type]} [description]
 */
GSY.gamebox.initUserData = function(ret){
	GSY.util.echo(['initUserData=>' + ret]);
	if(typeof ret == 'string') ret = GSY.gamebox.eval(ret);	
	
	//对象没有值的时候处理
	if($.isEmptyObject(ret)) return;

	//1.1.1取消自动登陆 
	// if(ret.automatic == 'true' && ret.remember == 'true'){
	// 	GSY.gamebox.loginFlag = true;
	// 	GSY.gamebox.setUserData(ret);
		
	// 	//获取用户token并客户端C++交互
	// 	GSY.gamebox.getUserToken(function(token,uid){
	// 		ret.token = token;
	// 		ret.callback = 'GSY.gamebox.loginCallback';
	//登录上报日志
	//		GSY.gamebox.uploadLoginLog({'uuid':uid,'type':'webmainlogin'});
	// 		//js调用c++方法
	// 		GSY.gamebox.cAjax('WINIE_LoginOK',ret,'OAS自动登陆成功操作');
	// 	},{email : ret.username , pwd : ret.pwd});
	// //手动登陆
	// }else{
		if(ret.remember == 'true'){
			GSY.gamebox.setUserData(ret);	
		}else{
			//GSY.util.echo([$('#gb-login-down-inti').find('input[data-name=username]').length]);
			$('#gb-login-down-inti').find('input[data-name=username]').focus();
		}
	//}	
};

/**
 * [setUserData description] 设置用户信息
 * @param {[type]} ret [description]
 */
GSY.gamebox.setUserData = function(ret){
	var parent = $('#gb-login-down-inti');
	var item = parent.find('div[data-type='+ ret.type +']');
	var index = item.index();
	item.show().siblings().hide();
	var tab = parent.find('.gb-login-down-t-in a');
	tab.eq(index).addClass('cur').siblings().removeClass('cur');
	var username = item.find('input[data-name=username]');
	var pwd = item.find('input[data-name=password]');
	var rememberElement = item.find('input[data-name=remember]');
	
	//初始化用户密码
	username.val(ret.username);

	//在密码框上定位关闭，然后可以使用回车键事件
	pwd.focus();
	pwd.val(ret.pwd);
	
	//初始化是否记住密码
	if(ret.remember == 'false'){
		rememberElement.removeAttr('checked');
	}else{
		rememberElement.attr('checked','checked');
	}
};

/**
 * [initUserListData description] 用户多开页面数据初始化
 * @return {[type]} [description]
 */

GSY.gamebox.initUserListDataURL = null;
GSY.gamebox.initUserListData = function(ret,fullname,url){
	var btn = $('#gb-accountslist-listno-add').hide();
	var yes = 'gb-confirm',no = 'gb-noconfirm';
	GSY.util.echo(['GSY.gamebox.initUserListData' + ret]);
	if(typeof ret == 'string') ret = GSY.gamebox.eval(ret);	
	

	//对象没有值的时候处理
	if($.isEmptyObject(ret)) return;


	var len = ret.length;
	GSY.gamebox.initUserListDataURL = url;
	var mainAccount = LANG[GSY.config.get('lang')]['Gamebox_mainAccount'];
	for(var i = 0 ; i < len ; i++){
		var tempStr = GSY.gamebox.tpl('userlist');
		var descStr = ret[i].discription_  && ret[i].discription_ != 'null' ? ret[i].discription_ : mainAccount;
		var desc = GSY.str.cut(descStr,16,true);
		ret[i]['discription_'] = descStr;
		var post = GSY.gamebox.jsonToPostStr(ret[i]);

		//账号类型
		tempStr = tempStr.replace('\{gameType\}',ret[i].type);

		//账号全名称
		tempStr = tempStr.replace('\{gameContent\}',GSY.str.cut(ret[i].username,24,true));

		//账号缩略名称
		tempStr = tempStr.replace('\{gameFullContent\}',ret[i].username);

		//该账号最后玩过的区服信息
		tempStr = tempStr.replace('\{gameLastServer\}',fullname);

		//用户缩略昵称
		tempStr = tempStr.replace(/\{gameDesc\}/g,desc);

		//用户全昵称
		tempStr = tempStr.replace(/\{gameFullDesc\}/g,descStr);

		//存储用户信息
		tempStr = $(tempStr.replace('\{dataPost\}',post));

		btn.before(tempStr);
		if( i==0 ) {
			btn.siblings().find('div[data-selecter=delete]').remove();
			btn.siblings().find('span[data-selecter=edit]').remove();
			btn.siblings().find('.gb-accountslist-check i').removeClass(no).addClass('gb-disabled')
			if(ret[i].type != 'oas') btn.siblings().addClass('gb-accountslist-mainUser')
		}
	};

	//当账户个数小于等于6个时候处理方法
	GSY.util.echo(['当账户个数小于等于6=>' + len]);
	if(len < 6) {
		btn.show();	
	}

	//模拟选项卡功能
	var parent = $('.gb-accountslist-list');
	var parentStr = '.gb-accountslist-list';
	parent.find('.gb-accountslist-check i').click(function(){
		if($(this).hasClass('gb-disabled')) return;
		else {
			if($(this).hasClass(yes)){
				$(this).removeClass(yes).addClass(no);
			}else{
				$(this).removeClass(no).addClass(yes);
				$(this).closest(parentStr).siblings(parentStr).find('.gb-accountslist-check i').each(function(index, el) {
					$(this).removeClass(yes).addClass(no);
				});
			}	
		}
	});
};


/**
 * [userRuning description] 正在运行中的账号列表
 * @param  {[type]} ret [description]
 * @return {[type]}     [description]
 */
GSY.gamebox.userRuningData = null;
GSY.gamebox.userRuning = function(ret){
	GSY.util.echo(['正在运行的账号=>' + ret]);
	if(typeof ret == 'string') ret = GSY.gamebox.eval(ret);	
	
	//当前主号开服信息
	var actStr = ret[0]['gameid'] + '=' + ret[0]['fullname'];

	//已经运行账号信息
	var runing = [];
	for(var key in ret){
		if (key > 0) {
			var tempstr = ret[key]['username'] + '=' + ret[key]['gameid'] + '=' + ret[key]['fullname'];	
			runing.push(tempstr);
		};	
	}
	//GSY.util.echo(runing);
	GSY.gamebox.userRuningData = {}
	GSY.gamebox.userRuningData['act'] = actStr;
	GSY.gamebox.userRuningData['runing'] = runing;

};


/**
 * [delUserList description] 删除小号账号
 * @param  {[object]} element [description] 操作按钮元素对象
 * @return {[type]}     [description]
 */
GSY.gamebox.delUserList = function(element,event){

	//取消冒泡事件
	var e = window.event || event;
	if (e.stopPropagation)  e.stopPropagation(); //IE以外
	else e.cancelBubble = true; //IE 

	//确认按钮回调方法
	GSY.gamebox.delUserListOk = function(status){
		GSY.util.echo(['status=>' + status]);
		if(status == 'true'){
			data['callback'] = 'GSY.gamebox.delUserListCallback';
			//js调用c++方法
			GSY.gamebox.cAjax('WINIE_XiaoDel',data,'删除小号账号操作');
		}
		GSY.gamebox.delUserListOk = null;
	}

	//删除操作成功回调方法
	GSY.gamebox.delUserListCallback = function(ret){
		GSY.util.echo(['删除账号成功之后回调方法=>' + ret]);
		if(typeof ret == 'string') ret = GSY.gamebox.eval(ret);
		if(ret.code == 1){
			element.closest(parentStr).remove();
			$('#gb-accountslist-listno-add').show();
		}
		GSY.gamebox.delUserListCallback = null;
	};

	var parentStr = '.gb-accountslist-list';
	var data = GSY.util.getEleData(element.closest(parentStr));
	var name = data.discription_ != 'null' ? data.discription_ : LANG[GSY.config.get('lang')]['Gamebox_mainAccount'];
	var msg = LANG[GSY.config.get('lang')]['Gamebox_delUserInfo'];
	msg = msg.replace(/\{nickname\}/,name);
	GSY.gamebox.message(msg,'GSY.gamebox.delUserListOk');
};


/**
 * [changeDiscrition description] 修改用户昵称
 * @param  {[type]} element [description] 操作按钮元素对象
 * @return {[type]}     [description]
 */
GSY.gamebox.changeDiscrition = function(element,event){

	//取消冒泡事件
	var e = window.event || event;
	if (e.stopPropagation)  e.stopPropagation(); //IE以外
	else e.cancelBubble = true; //IE 

	var input = element.siblings('.gb-accountslist-name').find('input');
	var em = element.siblings('.gb-accountslist-name').find('em');
	var definedVal = em.parent().attr('title');
	var parentStr = '.gb-accountslist-list';
	var data = GSY.util.getEleData(element.closest(parentStr));

	//汉字、数字、字母、下划线、空格、点和减号通过验证
	var reg = /^[\u4E00-\u9FA50-9a-zA-Z_ .-]+$/;

	//修改用户昵称成功回调方法
	GSY.gamebox.changeDiscritionCallback = function(ret){
		GSY.util.echo(['修改用户昵称成功回调方法->' + ret]);
		if(typeof ret == 'string') ret = GSY.gamebox.eval(ret);
		if(ret.code == 1 ){
			var strVal = $.trim(input.val());
			var str = GSY.str.cut(strVal,16,true);
			em.html(str).show();
			
			data['discription_'] = strVal;
			element.closest(parentStr).attr('data-post',GSY.gamebox.jsonToPostStr(data));
			input.parent().attr('title',input.val());
			input.hide();
		}
		setTimeout(function(){
			element.attr('data-status',false);		
		},300);
	};

	//绑定回车事件和是否超出长度限制
	input.unbind('keyup').bind('keyup',function(e) {
		if(e.keyCode == 13){
			var str = $.trim(input.val());


			//当前值为空的时候处理
			if(str == ''){
				GSY.util.maxCharTips(input);
				return;
			}

				//验证字符的有效性
			if(!reg.test(str)){
				var tips = OASGetLangVal('Gamebox_string_format_error');
				GSY.gamebox.message(tips,'GSY.gamebox.changeDiscritionReg');
				return;
			}

			//当前值与默认值相同不处理
			if(str== definedVal){
				em.show();
				input.hide().val('');
				element.attr('data-status',false);
				return;
			}
		}
	});

	//验证提示信息回调方法
	GSY.gamebox.changeDiscritionReg = function(status){
		var str = input.val();
		input.focus().val('').val(str);	
	}

	//失去焦点绑定存储事件
	input.unbind('blur').bind('blur',function(e) {
		var str = $.trim(input.val());

		//当前值为空的时候处理
		if(str == ''){
			GSY.util.maxCharTips(input);
			return;
		}

		//验证字符的有效性
		if(!reg.test(str)){
			var tips = OASGetLangVal('Gamebox_string_format_error');
			GSY.gamebox.message(tips,'GSY.gamebox.changeDiscritionReg');
			return;
		}

		//当前值与默认值相同不处理
		if(str == definedVal){
			em.show();
			input.hide().val('');
			setTimeout(function(){
				element.attr('data-status',false);		
			},300);
			return;
		}
		
		//通过验证处理方法
		GSY.gamebox.changeDiscritionCode(input,data);
	});

	//获取状态
	if(element.attr('data-status') == 'false') var status = true
	else var status = false;
	if(status) {
		input.show().focus().val(definedVal);
		em.hide();
		element.attr('data-status',true);
	}
};

/**
 * [changeDiscritionCode description] 修改用户昵称通过验证的时候处理方法
 * @param  {[type]} input [description] 文本框对象
 * @param  {[type]} data  [description] 当前用户信息
 * @return {[type]}       [description]
 */
GSY.gamebox.changeDiscritionCode = function(input,data){
	data['callback'] = 'GSY.gamebox.changeDiscritionCallback ';
	data['discription_'] = input.val();
	var str = GSY.gamebox.jsonTojsonStr(data);
	//js调用c++方法
	GSY.gamebox.cAjax('WINIE_XiaoChgDiscrition',data,'修改用户昵称通过验证的时候交互操作'); 	
};


/**
 * [addUserList description] 打开用户添加账号弹层应用
 * @return {[type]} [description]
 */
GSY.gamebox.addUserList = function(){
	//js调用c++方法
	GSY.gamebox.cAjax('WINIE_XiaoAdd',{},'启用内部弹层登陆应用');
}; 


/**
 * [description] 页面加载完毕之后处理方法
 * @return {[type]} [description]
 */
$(function(){
	//从url获取maintype值
	GSY.gamebox.loginMainType = GSY.util.getUrlParam('maintype');
	if (!GSY.gamebox.loginMainType || GSY.gamebox.loginMainType.length <= 0) {
		GSY.gamebox.loginMainType = 'main';
	};

	$(window).on('load',function() {
		///登陆器页面获取游戏最新消息
		GSY.gamebox.initNewDate($('#gb-newsList-box ul'));

		//登陆器页面获取游戏焦点图
		GSY.gamebox.initAdsDate($('#gb-adsList-box'));


		//与c++接口交互数据 ==> 游戏登陆器用户信息
		if(pageType == 'login' && typeof window.external != undefined){
			//js调用c++方法
			GSY.gamebox.cAjax('WINIE_InitUserData','GSY.gamebox.initUserData','游戏登陆器用户信息');
		} 

		//与c++接口交互数据 ==> 初始化账号多开用户列表
		if(pageType == 'login_dialog' && typeof window.external != undefined){
			//js调用c++方法
			GSY.gamebox.cAjax('WINIE_XiaoInitData','GSY.gamebox.initUserListData','初始化账号多开用户列表');
		} 

		//与c++接口交互数据 ==> 初始化账号多开页面数据
		if((pageType == 'login_dialog_pop' || pageType == 'login_dialog') && typeof window.external != undefined){
			//js调用c++方法
			GSY.gamebox.cAjax('WINIE_GetRuningList','GSY.gamebox.userRuning','获取正在运行的用户列表');		
		} 		
	});

})

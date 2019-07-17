/**
 * [getUserToken description] 获取用户登陆token
 * @param  {Function} callback [description] 回调函数
 * @param  {[type]}   data     [description] 
 * @param  {[type]}   element  [description] 登录按钮
 */
GSY.gamebox.getUserToken = function(callback,data,element){

	// //获取元素并存储
	// if(element != undefined){
	// 	var parent = element.closest('div[data-selecter=parent]'),
	// 		username = parent.find('input[data-name=username]'),
	// 		pwd = parent.find('input[data-name=password]');
	// }

	//登陆用户中心
	GSY.util.ajax({
		url : '//passport.oasgames.com/index.php?m=login',
		data : data,
		type : 'get',
		success : function(ret){
			//GSY.util.echo(ret.val);
			//登陆成功处理
			if(ret.status == 'ok'){
				GSY.gamebox.getUserId(ret.val.loginKey,GSY.config.get('gamecode'),function(uid){
					callback(ret.val.loginKey,uid);
				})
			}
			//登陆失败处理
			else if(ret.status == 'fail' && ret.err_code == 3){
				//alert(LANG[GSY.config.get('lang')]['Gamebox_login_error']);
			 	GSY.gamebox.message(LANG[GSY.config.get('lang')]['Gamebox_login_error']);

			 	if(element != undefined){
			 		parent.find('input[data-name=username]').select();
			 	};	
			
			//登陆失败处理
			}else GSY.gamebox.message(LANG[GSY.config.get('lang')]['Gamebox_login_error']);
			GSY.gamebox.loginFlag = false;
		},
		error : function(ret){
			GSY.gamebox.message(LANG[GSY.config.get('lang')]['Gamebox_login_fail']);
			GSY.gamebox.loginFlag = false;
		}
	});	
};


/**
 * [login description] 登陆操作
 * @param  {[type]} element [description]
 * @return {[type]}         [description]
 */
GSY.gamebox.loginFlag = false;
GSY.gamebox.login = function(element){
	
	//获取元素并存储
	var parent = element.closest('div[data-selecter=parent]'),
		username = parent.find('input[data-name=username]'),
	 	pwd = parent.find('input[data-name=password]'),
		rememberElement = parent.find('input[data-name=remember]'),
		automaticElement = parent.find('input[data-name=automatic]'),
		type = parent.attr('data-type');
	//用户名不能为空
	if(username.val() == ''){
		GSY.gamebox.message(LANG[GSY.config.get('lang')]['Gamebox_uname_empty']);
		username.focus();
		GSY.gamebox.loginFlag = false;
		return false;
	};
	//密码不能为空
	if(pwd.val() == ''){
		GSY.gamebox.message(LANG[GSY.config.get('lang')]['Gamebox_upwd_empty']);
		pwd.focus();
		GSY.gamebox.loginFlag = false;

		return false;
	};

	if(GSY.gamebox.userRuningData) {
	
		//返回当前账号是否已登录游戏状态
		var flag = GSY.gamebox.userRunCodeStatus(username.val());
		if(flag){
			GSY.gamebox.loginFlag = false;
			return false;		
		}
	}
	//正在交互处理中
	// if(GSY.gamebox.loginFlag){
	// 	//GSY.util.echo(['Gamebox_logining=>'+ LANG[GSY.config.get('lang')]['Gamebox_logining']]);
	// 	GSY.gamebox.message(LANG[GSY.config.get('lang')]['Gamebox_logining']);
	// 	return false;	
	// };
	GSY.gamebox.loginFlag = true;
	
	//GSY.gamebox.cAjax('WINIE_GetRuningList','GSY.gamebox.userRuning','获取正在运行的用户列表');	

	//获取用户token并客户端C++交互
	GSY.gamebox.getUserToken(function(token,uid){
		var rememberStatus = rememberElement.is(':checked') ? 'true' : 'false';
		var automaticStatus = automaticElement.is(':checked') ? 'true' : 'false';
		var data = {
			username : username.val(),
			pwd : pwd.val(),
			type : type,
			//remember : rememberStatus,
			//automatic : automaticStatus,
			token : token
			//callback : 'GSY.gamebox.loginCallback'
		}
		//登录上报日志
		GSY.gamebox.uploadLoginLog({'uuid':uid,'event':'webmainlogin','type':'oas','async':'false'});
		//js调用c++方法
		GSY.gamebox.cAjax('WINIE_LoginOK',data,'OAS用户登陆成功');
	},{email : username.val() , pwd : pwd.val()},element);
};

GSY.gamebox.userRuningData = null;
GSY.gamebox.userRuning = function(ret){
	GSY.util.echo(['正在运行的账号=>' + ret]);
	if(typeof ret == 'string') ret = GSY.gamebox.eval(ret);	

	//已经运行账号信息
	var runing = [];
	runing.push(ret[0]['username']);			
	//GSY.util.echo(runing);
	GSY.gamebox.userRuningData = {}
	GSY.gamebox.userRuningData['runing'] = runing;

};
GSY.gamebox.userRunCodeStatus = function(username){

	//判断当前账号是否已登录游戏
	var flag = false;
	var runingUserData = GSY.gamebox.userRuningData['runing']; //获取已登录用户信息

	for(var key in runingUserData){
		//GSY.util.echo([runingUserData[key],actStr]);
		//找到当前已经登陆游戏中
		if(runingUserData[key] == username){

			flag = true;
			break;
		}
	}
	//GSY.util.echo([flag]);
	if(flag){
		var str = LANG[GSY.config.get('lang')]['Gamebox_logined'].replace(/\{uname\}/,username);
		GSY.gamebox.message(str);		
	}

	return flag;
}
/**
 * [description] 绑定登陆器账户和密码回车键事件
 * @return {[type]} [description]
 */
;(function(){

	var login = $('#gb-dialog-login-box').find('div[data-selecter=parent]');
	var element = login.find('.gb-btn-green');

	//绑定账户回车事件
	login.keypress(function(e) {
		var dataname = $(e.target).attr('data-name');
		if( (dataname == 'username' || dataname == 'password') && e.keyCode == 13){
				GSY.gamebox.login(element);			
		}	
	});

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

GSY.gamebox.loginCallback = function(ret){
	//GSY.util.echo(ret)
	// GSY.gamebox.loginCallbackError = function(){
	// 	GSY.gamebox.loginFlag = false;	
	// 	GSY.gamebox.loginCallbackError = null;		
	// };

	// if(typeof ret == 'string') ret = GSY.gamebox.eval(ret);
	
	// //传输参数
	// var param = GSY.gamebox.jsonToPostStr({
	// 	token : ret.token,
	// 	lg : GSY.config.get('lang'),
	// 	gameid : GSY.config.get('gamecode'),
	// 	name : ret.name,
	// 	gameName : GSY.cookie.get('OAS_GAME_TITLE_' + GSY.config.get('gamecode'))
	// });

	// if(ret.code == 1){
	// 	var url = GSY.config.get('path').replace(/\{pagename\}/,'main') + '?' + param;
	// 	window.location.href = url;
	// }else if(ret.code == 0){
	// 	GSY.gamebox.message(LANG[GSY.config.get('lang')]['Gamebox_AccPassError','GSY.gamebox.loginCallbackError']);	
	// }
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

	//自动登陆
	if(ret.automatic == 'true' && ret.remember == 'true'){
		GSY.gamebox.loginFlag = true;
		GSY.gamebox.setUserData(ret);
		
		//获取用户token并客户端C++交互
		GSY.gamebox.getUserToken(function(token,uid){
			ret.token = token;
			ret.callback = 'GSY.gamebox.loginCallback';
			//登录上报日志
			GSY.gamebox.uploadLoginLog({'uuid':uid,'event':'webmainlogin','type':'oas','async':'false'})
			//js调用c++方法
			GSY.gamebox.cAjax('WINIE_LoginOK',ret,'OAS自动登陆成功操作');
		},{email : ret.username , pwd : ret.pwd});
	//手动登陆
	}else{
		if(ret.remember == 'true'){
			GSY.gamebox.setUserData(ret);	
		}else{
			//GSY.util.echo([$('#gb-login-down-inti').find('input[data-name=username]').length]);
			$('#gb-dialog-login-box').find('input[data-name=username]').focus();
		}
	}	
};

/**
 * [setUserData description] 设置用户信息
 * @param {[type]} ret [description]
 */
GSY.gamebox.setUserData = function(ret){
	var parent = $('#gb-dialog-login-box');
	var item = parent.find('div[data-type='+ ret.type +']');
	var username = item.find('input[data-name=username]');
	var pwd = item.find('input[data-name=password]');
	var rememberElement = item.find('input[data-name=remember]');
	var automaticElement = item.find('input[data-name=automatic]');
	
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

	//初始化是否自动登陆
	if(ret.automatic == 'false'){
		automaticElement.removeAttr('checked');
	}else{
		automaticElement.attr('checked','checked');
	}
};

/**
 * [description] 页面加载完毕之后处理方法
 * @return {[type]} [description]
 */
$(function(){
	GSY.gamebox.cAjax('WINIE_GetRuningList','GSY.gamebox.userRuning','获取正在运行的用户列表');
	// $(window).on("load",function() {
	// 	//与c++接口交互数据 ==> 游戏登陆器用户信息
	// 	if(typeof window.external != undefined){
	// 		//js调用c++方法
	// 		GSY.gamebox.cAjax('WINIE_InitUserData','GSY.gamebox.initUserData','游戏登陆器用户信息');
	// 	} 		
	// });
})


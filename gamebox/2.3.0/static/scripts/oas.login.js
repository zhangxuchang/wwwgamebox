// JavaScript Document
/**
 * [initAdsDate description] 初始化登陆页面焦点图数据
 * @return {[type]} [description]
 */
GSY.gamebox.initAdsDate = function(parentElement) {

    //没有找到父元素不处理
    if (parentElement.length == 0) return;

    var url = GSY.config.get('getAdsUrl');
    var cookieKey = 'OAS_ADS_' + GSY.config.get('gamecode');
    var data = {
        gamecode: GSY.config.get('gamecode')
    };

    //成功回调方法
    var callback = function(value) {
        var html = "";
        var i = 0;
        for (var key in value) {
            var str = GSY.gamebox.tpl('ads');
            str = str.replace(/\{url\}/g, value[key]['link']);
            str = str.replace(/\{desc\}/g, (value[key]['desc'] ? value[key]['desc'] : ''));
            str = str.replace(/\{image_url\}/g, value[key]['imgurl']);
            html += str;
        }
        parentElement.children().html(html);

        //焦点图自动轮播
        oasSlider({
            width: parentElement.width() ? parentElement.width() : 325,
            height: 160,
            parentEle: parentElement,
            icoType: 'number',
            align: 'right',
            icoShow: 1,
            scrollTime: 500,
            type: 'slider',
            time: 5000,
            isNext: false
        });
    };

    //已经缓存了，读取缓存信息
    if (GSY.cookie.get(cookieKey)) {
        var val = GSY.gamebox.eval(GSY.cookie.get(cookieKey));
        callback(val);
        return false;
    }

    GSY.util.ajax({
        url: url,
        data: data,
        type: 'get',
        success: function(ret) {
            var html = "";
            if (ret && ret.status == 'ok') {
                callback(ret.val);

                //缓存处理
                var str = "[";
                var i = 0;
                for (key in ret.val) {
                    if (i == 0) str += GSY.gamebox.jsonTojsonStr(ret.val[key]);
                    else str += ',' + GSY.gamebox.jsonTojsonStr(ret.val[key]);
                    i++;
                }
                str += "]";
                GSY.cookie.set(cookieKey, str, {
                    expires: 24
                });
            }
        }
    });
};


/**
 * [initAdsDate description] 初始化登陆页面最新新闻数据
 * @return {[type]} [description]
 */
GSY.gamebox.initNewDate = function(parentElement) {
    //没有找到父元素不处理
    if (parentElement.length == 0) return;

    var url = GSY.config.get('getNewsUrl');
    var cookieKey = 'OAS_NEW_' + GSY.config.get('gamecode');
    var data = {
        gamecode: GSY.config.get('gamecode'),
        //newnumber : 6, //可选参数
        m: 'gbox.getnews'

    };

    //回调处理
    var callback = function(value) {
        var html = '',
            i = 0,
            obj = value,
            lang = GSY.config.get('lang'),
            cutLen = lang == 'ar' ? 60 : 34;
        for (var key in obj) {
            var str = GSY.gamebox.tpl('news');
            str = str.replace(/\{url\}/g, obj[key]['url']);
            str = str.replace(/\{fullTitle\}/g,  obj[key]['title']);
            str = str.replace(/\{title\}/g,  GSY.str.cut(obj[key]['title'],cutLen,true));
            html += str;
        }
        parentElement.html(html);
    };

    //已经缓存了，读取缓存信息
    //GSY.util.echo(['GSY.gamebox.login=>'+ GSY.cookie.get(cookieKey)]);
    if (GSY.cookie.get(cookieKey)) {
        var val = GSY.gamebox.eval(GSY.cookie.get(cookieKey));
        callback(val);
        return false;
    }


    GSY.util.ajax({
        url: url,
        data: data,
        type: 'get',
        success: function(ret) {
            var html = '';
            if (ret && ret.code == 1) {
                callback(ret.data.news);

                //缓存处理
                var str = "[";
                var i = 0;
                for (key in ret.data.news) {
                    if (i == 0) str += GSY.gamebox.jsonTojsonStr(ret.data.news[key]);
                    else str += ',' + GSY.gamebox.jsonTojsonStr(ret.data.news[key]);
                    i++;
                }
                str += "]";
                GSY.cookie.set(cookieKey, str, {
                    expires: 24
                });

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
GSY.gamebox.getUserToken = function(callback, data, element) {

    //获取元素并存储
    if (element != undefined) {
        var parent = element.closest('div[data-selecter=parent]');
        var username = parent.find('input[data-name=username]');
        var pwd = parent.find('input[data-name=password]');
        var usernameTip = parent.find('label[data-name=usernameTip]');
        var passwordTip = parent.find('label[data-name=passwordTip]');
        var accountError = parent.find('p[data-name=accountError]');
        var accpassError = parent.find('p[data-name=accpassError]');
        var loginstatus = parent.find('p.login-status-res');

    }
    //登陆用户中心
    GSY.util.ajax({
        url: '//passport.oasgames.com/index.php?m=login',
        data: data,
        type: 'get',
        success: function(ret) {
            //GSY.util.echo(ret.val);
            //登陆成功处理
            if (ret.status == 'ok') {
                GSY.gamebox.getUserUid = ret.val.id;
                GSY.gamebox.getUserId(ret.val.loginKey, GSY.config.get('gamecode'), function(uid) {
                    callback(ret.val.loginKey, uid);
                })
            } else if (ret.status == 'fail' && ret.err_code == 3) { //登陆失败处理
                accountError.html('');
                loginstatus.html('');
                accpassError.html(OASGetLangVal('Gamebox_AccPassError'))

                GSY.gamebox.loginFlag = false;
            } else { //登陆失败处理               
                accountError.html('');
                loginstatus.html('');
                accpassError.html(OASGetLangVal('Gamebox_AccPassError'))
                GSY.gamebox.loginFlag = false;

            }
        },
        error: function(ret) {
            $('.login-status-res').html(OASGetLangVal('Gamebox_login_failite'));
            GSY.gamebox.loginFlag = false;
        }
    });
}


/**
 * [userRuning description] 正在运行中的账号列表
 * @param  {[type]} ret [description]
 * @return {[type]}     [description]
 */
GSY.gamebox.userRuningData = null;
GSY.gamebox.userRuning = function(ret) {
    if (typeof ret == 'string') ret = GSY.gamebox.eval(ret);
    GSY.util.echo(JSON.stringify(ret), '正在运行中的账号列表');
    //当前主号开服信息
    var actStr = ret[0]['gameid'] + '=' + ret[0]['fullname'];
    var _tokenStr = ret[0]['token']; //主号的token
    //已经运行账号信息
    var runing = [];
    var tokenlist = [];
    for (var key in ret) {
        if (key > 0) {
            var tempstr = ret[key]['username'] + '=' + ret[key]['gameid'] + '=' + ret[key]['fullname'];
            runing.push(tempstr);
            var tokenstr = ret[key]['username'] + '=' + ret[key]['token']; //已登录小号的token
            tokenlist.push(tokenstr);
        };
    }
    GSY.gamebox.userRuningData = {}
    GSY.gamebox.userRuningData['act'] = actStr;
    GSY.gamebox.userRuningData['runing'] = runing;
    GSY.gamebox.userRuningData['token'] = _tokenStr;
    GSY.gamebox.userRuningData['tokenlist'] = tokenlist;
};

/**
 * [userRunCode description] 判断当前登录账号是否正在运行中
 * @param  {[type]} element [description]
 * @return {[type]}         [description]
 */
GSY.gamebox.userRunCodeStatus = function(username) {
    //设置当前登陆用户信息
    var actStr = username + '=' + GSY.gamebox.userRuningData['act'];
    //判断当前账号是否已登录游戏
    var flag = false;
    var runingUserData = GSY.gamebox.userRuningData['runing']; //获取已登录用户信息
    for (var key in runingUserData) {
        //找到当前已经登陆游戏中
        if (runingUserData[key] == actStr) {

            flag = true;
            break;
        }
    }
    return flag;
};


/**
 * [userRunCode description] 判断当前登录账号是否正在运行中并弹出相应的提示
 * @param  {[type]} element [description]
 * @return {[type]}         [description]
 */
GSY.gamebox.userRunCodeMessage = function(username) {
    //判断当前账号是否已登录游戏
    var flag = GSY.gamebox.userRunCodeStatus(username);

    //正在运行账号提示。
    if (flag) {
        var str = LANG[GSY.config.get('lang')]['Gamebox_logined'].replace(/\{uname\}/, username);
        if ($('#gb-dialog-login-box').length > 0) {
            GSY.gamebox.message(str);
        } else {
            GSY.gamebox.message(str);
        }
    }
    return flag;
};



/**
 * [userRunCode description]  获取当前登录账号的token
 * @param  {[type]} element [description]
 * @return {[type]}         [description]
 */
GSY.gamebox.userRunToken = function(username, isMain) {
    var actStr = GSY.gamebox.userRuningData['token'];
    var _token = '';
    if (isMain == 'true') {
        _token = actStr;
    } else {
        //判断当前账号是否已登录游戏
        var _username = '';
        var runingUserData = GSY.gamebox.userRuningData['tokenlist']; //获取已登录用户信息
        for (var key in runingUserData) {
            //找到当前已经登陆游戏中
            var str = runingUserData[key].split('=');
            _username = str[0];
            if (_username == username) {
                _token = str[str.length - 1];
                break;
            }
        }
    }
    return _token;
}

/**
 * [loginType description] 值分别是 login home account
 * @type {[type]}
 */
GSY.gamebox.loginType = GSY.util.getUrlParam('page');
GSY.gamebox.loginFlag = false;
/**
 * [login description] 登陆操作
 * @param  {[type]} element [description]
 * @return {[type]}         [description]
 */
GSY.gamebox.login = function(element) {
    //获取元素并存储
    var parent = element.closest('div[data-selecter=parent]');
    var username = parent.find('input[data-name=username]');
    var pwd = parent.find('input[data-name=password]');
    var rememberElement = parent.find('input[data-name=remember]');
    //var automaticElement = parent.find('input[data-name=automatic]');
    var type = parent.attr('data-type');

    //波语
    //新增tip
    var usernameTip = parent.find('label[data-name=usernameTip]');
    var passwordTip = parent.find('label[data-name=passwordTip]');
    var accountError = parent.find('p[data-name=accountError]');
    var accpassError = parent.find('p[data-name=accpassError]');
    var usernameArrow = parent.find('i.gb-login-arrow-down');


    var usernameval = $.trim(username.val()),
        passwordval = pwd.val(),
        rememberStatus = rememberElement.is(':checked') ? 'true' : 'false';


    if (accountError.length > 0) {
        if (accountError.html() != '' || accountError.html().length > 0) {
            GSY.gamebox.loginFlag = false;
            return false;
        }
    }

    if (accpassError.length > 0) {
        if (accpassError.html() != '' || accpassError.html().length > 0) {
            GSY.gamebox.loginFlag = false;
            return false;
        }
    }

    //用户名不能为空
    if (usernameval == '') {
        if (accountError.length > 0) {
            accountError.html(OASGetLangVal('Gamebox_uname_empty'));
        }

        if (usernameTip.length > 0) {
            usernameTip.show();
            username.hide();
            //usernameArrow.hide();
            //username.show().focus();
        }
        GSY.gamebox.loginFlag = false;
        return false;
    }

    //密码不能为空
    if (passwordval == '') {
        if (accpassError.length > 0) {
            accpassError.html(OASGetLangVal('Gamebox_upwd_empty'));
        }

        //GSY.gamebox.message(accpassError.html())

        if (passwordTip.length > 0) {
            passwordTip.show();
            pwd.hide();
            //pwd.show().focus();
        }
        GSY.gamebox.loginFlag = false;
        return false;
    }

    //开小号的时候判断当前登陆账号是否登陆游戏
    if (GSY.gamebox.loginType == 'account' && GSY.gamebox.userRuningData) {

        //返回当前账号是否已登录游戏状态
        var flag = GSY.gamebox.userRunCodeMessage(username.val());
        if (flag) {
            GSY.gamebox.loginFlag = false;
            return false;
        }
    }
    //正在交互处理中
    if (GSY.gamebox.loginFlag) {
        $('.login-status-res').html(OASGetLangVal('Gamebox_connecting'));
        return false;
    }
    GSY.gamebox.loginFlag = true;
    //获取用户token并客户端C++交互
    GSY.gamebox.getUserToken(function(token, uid) {
        var data = {
            username: usernameval,
            pwd: passwordval,
            type: type,
            remember: rememberStatus,
            automatic: 'false',
            token: token,
            callback: function(ret) {
                GSY.gamebox.loginCallback(ret);
            }
        }


        //登录上报日志
        if (GSY.gamebox.loginType == 'account') {
            GSY.gamebox.uploadLoginLog({
                'uuid': uid,
                'event': 'smalllogin',
                'type': 'oas'
            });
        } else {
            GSY.gamebox.uploadLoginLog({
                'uuid': uid,
                'event': 'webmainlogin',
                'type': 'oas'
            });
        }      
        //js调用c++方法;
        setTimeout(function(){
            GSY.gamebox.cAjaxCallback('WINIE_LoginOK', data, 'OAS用户登陆成功')
        },2000); 

    }, {
        email: usernameval,
        pwd: passwordval
    }, element);
};
/**
 * [delayTimeOut description] 延迟处理
 * @param  {[type]} handle [description]
 * @param  {[type]} time   [description]
 * @return {[type]}        [description]
 */
GSY.gamebox.delayTimeOut = function(handle, time) {
    var t = time == undefined ? 100 : time;
    setTimeout(function() {
        handle();
    }, t)
}



/**
 * [FBlogin description] FACEBOOK登陆回调方法
 * @param {[type]} element   [description]
 * @param {[type]} loginType [description]
 */
GSY.gamebox.FBloginCallback = function(ret) {
    //登陆成功处理
    if (ret.status == 'ok') {
        var data = {
            token: ret.val.loginKey,
            type: 'fb',
            username: ret.val.uname,
            pwd: 'false',
            remember: 'false',
            automatic: 'false',
            uid: ret.val.id,
            callback: function(ret) {
                GSY.gamebox.loginCallback(ret);
            }
        };


        //登录上报日志
        GSY.gamebox.uploadLoginLog({
            'uuid': ret.val.id,
            'event': GSY.gamebox.loginType == 'account' ? 'smalllogin' : 'webmainlogin',
            'type': 'fb'
        })         
            //js调用c++方法
        setTimeout(function(){
            GSY.gamebox.cAjaxCallback('WINIE_LoginOK', data, 'FACEBOOK登陆成功操作');
        },2000); 

        //var str = GSY.gamebox.jsonTojsonStr(data);
        //GSY.util.echo(['fb=>' + str]);

        //if(typeof window.external != undefined) window.external.WINIE_LoginOK(str);
        //登陆失败处理
    } else if (ret.status == 'fail' && ret.err_code == 3) GSY.gamebox.message(ret.err_msg);
    //登陆失败处理
    else GSY.gamebox.message(LANG[GSY.config.get('lang')]['Gamebox_login_fail']);
    GSY.gamebox.loginFlag = false;
};
/**
 * [FBlogin description] GOOGLE登陆回调方法
 * @param {[type]} element   [description]
 * @param {[type]} loginType [description]
 */
GSY.gamebox.GOOGLEloginCallback = function(ret) {
    //登陆成功处理
    if (ret.status == 'ok') {
        var data = {
            token: ret.val.loginKey,
            type: 'google',
            username: ret.val.uname,
            pwd: 'false',
            remember: 'false',
            automatic: 'false',
            uid: ret.val.id,
            callback: function(ret) {
                GSY.gamebox.loginCallback(ret);
            }
        };


        //登录上报日志
        GSY.gamebox.uploadLoginLog({
            'uuid': ret.val.id,
            'event': GSY.gamebox.loginType == 'account' ? 'smalllogin' : 'webmainlogin',
            'type': 'google'
        });         
        //js调用c++方法
        setTimeout(function(){
            GSY.gamebox.cAjaxCallback('WINIE_LoginOK', data, 'GOOGLE登陆成功操作');
        },2000); 
        //登陆失败处理
    } else if (ret.status == 'fail' && ret.err_code == 3)
        GSY.gamebox.message(ret.err_msg);
    //登陆失败处理
    else
        GSY.gamebox.message(LANG[GSY.config.get('lang')]['Gamebox_login_fail']);
};

/**
 * [loginCallback description] OAS登陆回调方法
 * @param  {[type]} ret [description]
 * @return {[type]}     [description]
 */
GSY.gamebox.loginMainType = null; //用户登录是否打开main页面
GSY.gamebox.loginCallback = function(ret) {
    GSY.gamebox.loginCallbackError = function() {
        GSY.gamebox.loginFlag = false;
        GSY.gamebox.loginCallbackError = null;
    };
    GSY.gamebox.loginFlag = true;
    if (typeof ret == 'string') ret = GSY.gamebox.eval(ret);
    //传输参数
    var param = {
        token: ret.token,
        lg: GSY.config.get('lang'),
        gameid: GSY.config.get('gamecode'),
        name: ret.name,
        version: GSY.util.getUrlParam('version')
    };
    if (ret.code == 1) {
        if (GSY.gamebox.loginMainType === 'play' || 1) { //登录完成跳转到游戏页面
            GSY.gamebox.getLocalGameData({
                key: 'OAS_GAME_INFRO_' + GSY.config.get('gamecode')
            }, function(ret) {
                var retData = {};
                if (ret.data) {
                    retData = GSY.gamebox.eval(ret.data);
                }
                param.gamename = retData.name;
                var url = GSY.config.get('path').replace(/\{pagename\}/, 'game') + '?channel=' + GSY.util.getUrlParam('channel') + '&' + GSY.gamebox.jsonToPostStr(param);
                window.location.href = url;
            });
        } else if (GSY.gamebox.loginMainType === 'main') { //登录完成跳转到main页面
            var url = GSY.config.get('path').replace(/\{pagename\}/, 'main') + '?playertype=logingame&channel=' + GSY.util.getUrlParam('channel') + '&' + GSY.gamebox.jsonToPostStr(param);
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
GSY.gamebox.initUserData = function(ret) {
    GSY.util.echo(ret, 'GSY.gamebox.initUserData=>' + typeof ret);
    //if(typeof ret == 'string') ret = GSY.gamebox.eval(ret);   
    //对象没有值的时候处理
    if ($.isEmptyObject(ret)) return;
    GSY.gamebox.setUserData(ret[0]);

    //配置list
    var parent = $('.lopl-login-wrap-list ul'),
        dataWidth = parseInt(parent.data('width')),
        html = '';

    dataWidth = ret.length > 4 ? dataWidth : dataWidth + 4;
    for (var i = 0; i < ret.length; i++) {
        var tempStr = GSY.gamebox.tpl('loginlist');
        var post = GSY.gamebox.jsonToPostStr(ret[i]);
        //账号索引
        tempStr = tempStr.replace('\{dataIndex\}', i);
        //账号全名称
        tempStr = tempStr.replace('\{dataName\}', ret[i].username);

        tempStr = tempStr.replace('\{useName\}', GSY.str.cut(ret[i].username, dataWidth, true));

        //存储用户信息
        tempStr = tempStr.replace('\{dataPost\}', post);

        html += tempStr;

    }
    parent.html(html);
    var list = parent.children('li');
    list.hover(function() {
        var item = $(this);
        item.find('i').show();
    }, function() {
        var item = $(this);
        item.find('i').hide();
    })
};
/**
 * [setUserData description] 设置用户信息
 * @param {[type]} ret [description]
 */
GSY.gamebox.setUserData = function(ret) {
    //初始化页面 
    var parent = $('.oas-gamebox-login-js');
    var item = parent.find('div[data-type=' + ret.type + ']');
    var index = item.index();
    item.show().siblings().hide();
    var tab = parent.find('.gb-login-down-t-in a');
    if (tab.length) {
        tab.eq(index).addClass('cur').siblings().removeClass('cur');
    }
    var loginwrap = item.find('#common-login-box-wrap');
    var username = loginwrap.find('input[data-name=username]');
    var pwd = loginwrap.find('input[data-name=password]');
    var rememberElement = loginwrap.find('input[data-name=remember]');

    var usernameTip = loginwrap.find('label[data-name=usernameTip]');
    var passwordTip = loginwrap.find('label[data-name=passwordTip]');
    var accountError = loginwrap.find('p[data-name=accountError]');
    var accpassError = loginwrap.find('p[data-name=accpassError]');

    if (usernameTip.length > 0) {
        usernameTip.hide();
    }
    if (passwordTip.length > 0) {
        passwordTip.hide();
    }
    if (accpassError.length > 0) {
        accpassError.html('');
    }
    if (accountError.length > 0) {
        accountError.html('');
    }

    username.show();
    pwd.show();
    //初始化用户名称
    if (ret.username.length > 0) {
        username.val(ret.username);
    } else {
        usernameTip.show();
        username.val('').hide();
    }

    //在密码框上定位关闭，然后可以使用回车键事件
    //pwd.focus();
    //初始化是否记住密码
    if (ret.remember == 'true') {
        rememberElement.attr('checked', 'checked');
        if (ret.username.length > 0) {
            pwd.val(ret.pwd);
        } else {
            pwd.val('').hide();
            passwordTip.show();
        }
    } else {
        rememberElement.removeAttr('checked');
        pwd.val('').hide();
        passwordTip.show();
    }
};

/**
 * [showLoginUserList description] 显示登录用户列表
 * @param  {[object]} element [description] 操作按钮元素对象
 * @return {[type]}     [description]
 */
GSY.gamebox.showLoginUserList = function(element) {
    if ($('.lopl-login-wrap-list').is(':hidden')) {
        $('.lopl-login-wrap-list').show();
        element.addClass('gb-login-arrow-up');
        var list = $('.lopl-login-wrap-list ul');
        var height = $('.lopl-login-wrap-list li').length ? 'auto' : list.data('height');
        list.css('height', height);

    } else {
        $('.lopl-login-wrap-list').hide();
        element.removeClass('gb-login-arrow-up');
    }
};
/**
 * [deleteLoginUser description] 删除登录用户
 * @param  {[object]} element [description] 操作按钮元素对象
 * @return {[type]}     [description]
 */
GSY.gamebox.deleteLoginUser = function(element, event) {
    //取消冒泡事件
    var e = window.event || event;
    if (e.stopPropagation) e.stopPropagation(); //IE以外
    else e.cancelBubble = true; //IE 
    //删除成功回调方法
    var _data = GSY.util.urlToJson(element.parent().attr('data-post'));
    GSY.gamebox.deleteLoginUserOk = function(ret) {
        if (ret == 1) {
            var index = element.parent().attr('data-index');
            element.parent().remove();
            var parent = $('.lopl-login-wrap-list ul');
            var dataWidth = parseInt(parent.attr('data-width'));

            var length = parent.children('li').length;
            dataWidth = length > 4 ? dataWidth : dataWidth + 4;

            if (length > 0) {
                if (index == length) {
                    index = length;
                } else {
                    index++;
                }
                if (index === 0) {
                    index = 0;
                } else {
                    index--;
                }
                var item = GSY.util.urlToJson($(parent.children('li')[index]).attr('data-post'));
                GSY.gamebox.setUserData(item);
                for (var i = 0; i < length; i++) {
                    $(parent.children('li')[index]).attr("data-index", i);
                }
                parent.children('li').each(function() {
                    $(this).children('span').html(GSY.str.cut($(this).attr('data-name'), dataWidth, true));
                })

            } else {
                parent.css('height', parent.data('height'));
                var item = {
                    type: _data.type,
                    username: '',
                    pwd: '',
                    remember: 'true',
                    automatic: 'false'
                };
                GSY.gamebox.setUserData(item);
            }
        }

    }

    
    _data['callback'] = function(ret) {
        GSY.gamebox.deleteLoginUserOk(ret);
    }

    //调用C++删除历史记录方法（）
    GSY.gamebox.cAjaxCallback('WINIE_DelMainUser', _data, '删除登录账号列表');
};

/**
 * [selectLoginUser description] 选择登录用户
 * @param  {[object]} element [description] 操作按钮元素对象
 * @return {[type]} [description]
 */
GSY.gamebox.selectLoginUser = function(element, event) {
    //取消冒泡事件
    var e = window.event || event;
    if (e.stopPropagation) e.stopPropagation(); //IE以外
    else e.cancelBubble = true; //IE 
    $('.lopl-login-wrap-list').hide();
    $('.gb-login-arrow-down').removeClass('gb-login-arrow-up');
    var _data = GSY.util.urlToJson(element.attr('data-post'));
    var parent = $('.oas-gamebox-login-js');
    var item = parent.find('div[data-type=' + _data.type + ']');
    var username = item.find('input[data-name=username]');
    var accountError = item.find('p[data-name=accountError]');
    var accpassError = item.find('p[data-name=accpassError]');
    accountError.html('');
    accpassError.html('');
    if (username.val() == _data.username)
        return;
    GSY.gamebox.setUserData(_data);

};


GSY.gamebox.closeLoginDialog = function() {
    if (GSY.gamebox.loginType != 'login') {
        GSY.gamebox.cAjax('WINIE_LoginDialogClose', '关闭通用登录层');
    }
};


/**
 * [description] 页面加载完毕之后处理方法
 * @return {[type]} [description]
 */
$(function() {
   

    //启用直接打开游戏模式
    GSY.gamebox.loginMainType = GSY.util.getUrlParam('maintype');


    //值为空时，直接进入游戏大厅
    if (!GSY.gamebox.loginMainType || GSY.gamebox.loginMainType.length <= 0) {
        GSY.gamebox.loginMainType = 'main';
    };

    //是否从后台配置直接进入游戏页面
    if(typeof gameInfo !== 'undefined' && gameInfo.openGamesFlag == 1){
        GSY.gamebox.loginMainType = 'play';
        GSY.gamebox.cAjaxCallback('WINIE_InitBoxType', {type : 'play'}, '');  
    }
    if(typeof gameInfo !== 'undefined' && gameInfo.openGamesFlag == 0){
        GSY.gamebox.loginMainType = 'main';
        GSY.gamebox.cAjaxCallback('WINIE_InitBoxType', {type : 'main'}, '');  
    }    

    $(window).on('load', function() {
        switch (GSY.config.get('lang')) {
            case 'nl':
                $('.lopl-login-wrap-down').addClass('lopl-login-wrap-downot');
                break;
            case 'sv':
                $('.lopl-login-wrap-down').addClass('lopl-login-wrap-downot');
                break;
            case 'de':
                $('.lopl-login-wrap-down').addClass('lopl-login-wrap-downot');
                break;                
        }
        $('.lopl-login-wrap-down').show();
        if (typeof window.external != undefined) {
            //js调用c++方法
            GSY.gamebox.cAjaxCallback('WINIE_InitUserData', {
                callback: GSY.gamebox.initUserData
            }, '游戏登陆器用户信息');
        }
        if (GSY.util.getUrlParam('page') == 'login') {
            ///登陆器页面获取游戏最新消息
            GSY.gamebox.initNewDate($('#gb-newsList-box ul'));

            //登陆器页面获取游戏焦点图
            GSY.gamebox.initAdsDate($('#gb-adsList-box'));
            //与c++接口交互数据 ==> 游戏登陆器用户信息              
        } else {
            //与c++接口交互数据 ==> 初始化账号多开页面数据
            if (typeof window.external != undefined) {
                //js调用c++方法
                GSY.gamebox.cAjaxCallback('WINIE_GetRuningList', {
                    callback: GSY.gamebox.userRuning
                }, '获取正在运行的用户列表');
            }
        }

    });




});
/**
 * [description] 绑定登陆器账户和密码回车键事件
 * @return {[type]} [description]
 */
;
(function() {
    if (GSY.util.getUrlParam('page') == 'login' || GSY.util.getUrlParam('page') == 'account' || GSY.util.getUrlParam('page') == 'home') {
        var login = $('#common-login-box-wrap');
        var element = login.find('a[data-name=gb-login-btn]');

        var usernameTip = login.find('label[data-name=usernameTip]');
        var username = login.find('input[data-name=username]');
        var passwordTip = login.find('label[data-name=passwordTip]');
        var password = login.find('input[data-name=password]');
        var accountError = login.find('p[data-name=accountError]');
        var accpassError = login.find('p[data-name=accpassError]');
        var usernameArrow = login.find('i.gb-login-arrow-down');
        var rememberElement = login.find('input[data-name=remember]');
        var loginstatus = login.find('.login-status-res');
        //绑定账户回车事件
        login.keypress(function(e) {
            var dataname = $(e.target).attr('data-name');
            if ((dataname == 'username' || dataname == 'password') && e.keyCode == 13) {
                GSY.gamebox.login(element);
            }
        });
        username.keydown(function(e) {
            if (e.keyCode == 9) {
                password.show().focus();
                passwordTip.hide();
                GSY.gamebox.delayTimeOut(function() {
                    //username.blur();
                    passwordTip.hide();
                    password.show().focus().select();
                });
            }

        }).focus(function() {
            if (accpassError.html() == OASGetLangVal('Gamebox_AccPassError')) {
                accpassError.html('');
            }
            //为空提示
            accountError.html('');
            loginstatus.html('');
        }).blur(function() {
            if (usernameTip.length == 0) return;
            if ($(this).val() == '') {
                usernameTip.show();
                $(this).val('').hide();
                //usernameArrow.hide();
            }
        }).keyup(function() {
            var name = $(this).val();
            //
            //var parent = $('.lopl-login-wrap-list ul');
            if ($('.lopl-login-wrap-list li[data-name="' + name + '"]').length > 0) {
                var item = GSY.util.urlToJson($('.lopl-login-wrap-list li[data-name="' + name + '"]').attr('data-post'));
                if (item.remember == 'true') {
                    rememberElement.attr('checked', 'checked');
                    password.val(item.pwd).show();
                    passwordTip.hide();
                } else {
                    rememberElement.removeAttr('checked');
                    password.val('').hide();
                    passwordTip.show();
                }
            } else {
                password.hide().val('');
                passwordTip.show();
            }
        })
        usernameTip.click(function() {
            $(this).hide();
            username.show().focus();
            //usernameArrow.show();
        });
        passwordTip.click(function() {
            $(this).hide();
            password.show().focus();
        });
        password.focus(function() {
            accpassError.html('');
            loginstatus.html('');
        }).blur(function() {
            if (passwordTip.length == 0) return;
            if ($(this).val() == '') {
                passwordTip.show();
                $(this).val('').hide();
            }
        })
        $('*').click(function(event) {
            if ($(event.target).attr("class")) { /* && $(event.target).attr("class") != "delete"*/
                if ($(event.target).attr("class").indexOf('gb-login-arrow-down') == -1) {
                    $(".lopl-login-wrap-list").hide();
                    $('.gb-login-arrow-down').removeClass('gb-login-arrow-up');
                }
            } else {
                $(".lopl-login-wrap-list").hide();
                $('.gb-login-arrow-down').removeClass('gb-login-arrow-up');
            }
        })
    }
})();

/**
 * [description] 绑定内部弹出层登陆框账户和密码回车键事件
 * @return {[type]} [description]
 */
// ;
// (function() {
//     if (GSY.util.getUrlParam('page') != 'login') {
//         var login = $('#gb-dialog-login-box').find('div[data-selecter=parent]');
//         var element = login.find('.gb-btn-green');
//         //绑定账户回车事件
//         login.keypress(function(e) {
//             var dataname = $(e.target).attr('data-name');
//             if ((dataname == 'username' || dataname == 'password') && e.keyCode == 13) {
//                 GSY.gamebox.login(element);
//             }
//         });
//     }
// })();
/**
 * [description] 添加小号登陆框样式变化
 * @return {[type]} [description]
 */
;
(function() {
    if (GSY.util.getUrlParam('page') == 'account') {
        $("#common-login-box-wrap").addClass("gb-xh-login-wrap");
        $("li.gb-xh-login-tips").show();
    }
})();

/**
 * [changeDiscritionCode description] 用户注册
 * @return {[type]}       [description]
 */

;
(function() {
    var labelTips = $(".gb-login-default-val");
    var username = $("#gb-register-user-input");
    var password = $("#gb-register-password-input");
    var repassword = $("#gb-register-repassword-input");
    var ajaxFlag = false;
    //是否是绑定注册
    var isBindReg = false,
        viewModel = GSY.util.getUrlParam('view'),
        bindToken = GSY.util.getUrlParam('token'),
        bindUid = GSY.util.getUrlParam('uid');

    if (GSY.util.getUrlParam('playertype') == 'tiyanversion' && viewModel == 'register' && bindToken && bindToken.length && bindUid && bindUid.length) {
        isBindReg = true;
    };
    //var usernameLabel = $(".gb-register-div label[data-name=gb-register-div]");
    //验证用户名
    var userName = function(input) {
        var tips = $("#gb-reg-username-error");
        var val = $.trim(input.val());
        var filter = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        
        //判断用户为空
        if (val == '') {
            tips.html(OASGetLangVal('Gamebox_uname_empty'));
            //tips.show();
            return false;
        }

        //邮箱格式错误
        if (!filter.test(val)) {

            tips.html(OASGetLangVal('msg_uname_bad_format'));
            //tips.show();
            return false;
        }
        tips.html("");
        return true;
    }

    //验证密码
    var uPassword = function(input) {
        var tips = $("#gb-reg-password-error");
        var val = $.trim(input.val());
        var pasFliter = /^[a-zA-Z0-9]{6,15}$/;
        if (val == '') {
            tips.html(OASGetLangVal('Gamebox_upwd_empty'));
            return false;
        }
        if (!pasFliter.test(val)) {
            tips.html(OASGetLangVal('msg_pwd_length'));
            return false;
        }
        tips.html("");
        return true;
    }

    //确认密码
    var reuPassword = function(input, repasInput) {

        var tips = $("#gb-reg-repassword-error");
        var val = $.trim(input.val());
        var pwd = $.trim(repasInput.val());
        if (val != pwd || val == '') {
            tips.html(OASGetLangVal('msg_pwd_not_same'));
            tips.show();
            return false;
        }

        tips.html("");
        // alert(tips);
        return true;
    }

    labelTips.click(function() {
        $(this).hide().next("input").show().focus();
    });
    username.blur(function() {
        if ($(this).val() == '') {
            $(this).hide().siblings("label").show();
            userName($(this));
        } else {
            var tips = $("#gb-reg-username-error");
            if (userName($(this))) {
                //验证是否已注册
                GSY.util.ajax({
                    url: '//passport.oasgames.com/index.php?m=checkname',
                    data: {
                        email: $.trim(($(this).val()))
                    },
                    success: function(ret) {
                        if (ret.status == 'ok' && ret.val) {
                            tips.html(OASGetLangVal('msg_uname_exsit'));
                        } else {
                            tips.html("");
                        }
                    },
                    error: function(ret) {
                        $('.reg-status-res').html(OASGetLangVal('Gamebox_login_failite'));
                    }

                });
            }
        }
    }).keydown(function(e) {
        if (e.keyCode == 9) {
            GSY.gamebox.delayTimeOut(function() {
                password.show().focus().select().siblings("label").hide();
            });
        }
    }).focus(function() {
        $('.reg-status-res').html('');
    });
    password.blur(function() {
        if ($(this).val() == '') { //没输入显示提示信息
            $(this).hide().siblings("label").show();
        }
        uPassword($(this));
    }).keydown(function(e) {
        if (e.keyCode == 9) {
            GSY.gamebox.delayTimeOut(function() {
                repassword.show().focus().select().siblings("label").hide();
            });
        }
    }).focus(function() {
        $('.reg-status-res').html('');
    });
    repassword.blur(function() {
        if ($(this).val() == '') { //没输入显示提示信息
            $(this).hide().siblings("label").show();
        }
        reuPassword($(this), password);
    }).focus(function() {
        $('.reg-status-res').html('');
    });
    $("#common-register-box-wrap").keypress(function(e) {
        var dataname = $(e.target).attr('data-name');
        var element = $("#gb-oas-register");
        if ((dataname == 'username' || dataname == 'password') && e.keyCode == 13) {
            $("#gb-oas-register").click();
        }
    });
    var regCallback = function(ret, unv, pwv) {
       var data = {
            username: unv,
            pwd: pwv,
            type: isBindReg ? 'oas_bangding' : 'oas',
            remember: 'true',
            automatic: 'false',
            token: isBindReg ? bindToken : ret.val.loginKey,
            callback: function(ret) {
                GSY.gamebox.loginCallback(ret);
            }
        };
            //js调用c++方法;
        GSY.gamebox.cAjaxCallback('WINIE_LoginOK', data, 'OAS用户登陆成功');
    };
    //注册按钮事件
    $("#gb-oas-register").unbind('click').bind('click', function() {
      //验证用户名字
        if (!userName(username)) {
            username.focus();
            return false;
        }
        //验证密码
        if (!uPassword(password)) {
            password.focus();
            return false;
        }
        //验证确认密码
        if (!reuPassword(repassword, password)) {
            repassword.focus();
            return false;
        }
        if (ajaxFlag) {
            $('.reg-status-res').html(OASGetLangVal('Gamebox_connecting'));
            return false;
        }
        ajaxFlag = true;

        var usernameval = username.val(),
            passwordval = password.val();

        var ajaxData = {
            email: usernameval,
            pwd: passwordval,
            sp_promote: 'gamebox.com'
        };
        var ajaxUrl = '//passport.oasgames.com/index.php?m=register';
        //如果是试玩账号绑定注册
        if (isBindReg) {
            ajaxData.uid = bindUid;
            ajaxData.oas_user = bindToken;
            ajaxUrl = '//passport.oasgames.com/index.php?m=updateAccount';
        }

        GSY.util.ajax({
            url: ajaxUrl,
            data: ajaxData,
            success: function(ret) {
                GSY.util.echo(ret);
                if (ret.status == 'ok') {

                    //注册成功上报日志
                    var regevent = isBindReg ? 'bindingregisterok' : 'registersuccess',
                        reguid = isBindReg ? bindUid : ret.val.id;
                    GSY.gamebox.uploadLoginLog({
                        'uuid': reguid,
                        'event': regevent
                    });
                    //注册成功回调
                    setTimeout(function(){
                        regCallback(ret, usernameval, passwordval);
                    },2000);
                }
                ajaxFlag = false;
            },
            error: function(ret) {
                $('.reg-status-res').html(OASGetLangVal('Gamebox_login_failite'));
                ajaxFlag = false;
            }
        });
        return false;
    });
    //去注册
    $("#gb-btn-to-register").click(function() {
        if (GSY.gamebox.loginType != 'login') {
            var title = isBindReg ? LANG[GSY.config.get('lang')]['Gamebox_bindReg_word'] : LANG[GSY.config.get('lang')]['Gamebox_Register_word']
            GSY.gamebox.cAjax('WINIE_SetLoginTitle', title, '显示注册title');
        }
        $("#common-login-box-wrap").hide();
        $("#common-register-box-wrap").show();
        //点注册按钮上报日志
        GSY.gamebox.uploadLoginLog({
            'uuid': isBindReg ? bindUid : null,
            'event': 'buttonregister' 
        });
    });
    //去登陆
    $("#gb-btn-to-login").click(function() {
        if (GSY.gamebox.loginType != 'login') {
            var title = LANG[GSY.config.get('lang')]['Gamebox_Login'];
            GSY.gamebox.cAjax('WINIE_SetLoginTitle', title, '显示登录title');
        }
        $("#common-login-box-wrap").show();
        $("#common-register-box-wrap").hide();
    });
    //是否显示注册界面
    if (viewModel == 'register') {
        $("#gb-btn-to-register").trigger('click');
    } else {
        $("#gb-btn-to-login").trigger('click');
    }


})();

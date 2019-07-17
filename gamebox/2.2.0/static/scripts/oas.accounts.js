// JavaScript Document
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
                if (usernameTip.length == 0 || passwordTip.length == 0 || accpassError.length == 0 || accountError.length == 0) {
                    GSY.gamebox.message(LANG[GSY.config.get('lang')]['Gamebox_login_error']);
                    username.select();
                } else {
                    accountError.html('');
                    accpassError.html(OASGetLangVal('Gamebox_AccPassError'))
                }
                GSY.gamebox.loginFlag = false;
            } else { //登陆失败处理               
                if (usernameTip.length == 0 || passwordTip.length == 0 || accpassError.length == 0 || accountError.length == 0) {
                    GSY.gamebox.message(LANG[GSY.config.get('lang')]['Gamebox_login_error']);
                } else {
                    accountError.html('');
                    accpassError.html(OASGetLangVal('Gamebox_AccPassError'))
                }
                GSY.gamebox.loginFlag = false;

            }
        },
        error: function(ret) {
            GSY.gamebox.message(LANG[GSY.config.get('lang')]['Gamebox_login_fail']);
            GSY.gamebox.loginFlag = false;
        }
    });
}
/**
 * [oneClickGoPlayGame description] 账号选择
 * @param  {[type]} element [description]
 * @return {[type]}         [description]
 */
GSY.gamebox.accountSelect = function(element) {
    if ($(element).find('.gb-accountslist-check i').hasClass('gb-unselected'))
        return;
    var yes = 'gb-confirm',
        no = 'gb-noconfirm';
    var list = element.parent().siblings('.gb-accountslist-list-box').find('div[class="gb-accountslist-list"][data-running="false"]'); //未登录小号的列表
    if ($(element).find('.gb-accountslist-check i').hasClass(yes)) {
        $(element).find('.gb-accountslist-check i').removeClass(yes).addClass(no);
        list.attr('data-confirm', 'false');
        list.find('span[data-selecter=noconfirm] i').removeClass(yes).addClass(no);
        $('.gb-btn-green').addClass('gb-btn-gray');
        GSY.gamebox.selectUserCount = 0;
    } else {
        $(element).find('.gb-accountslist-check i').removeClass(no).addClass(yes);
        list.attr('data-confirm', 'true');
        list.find('span[data-selecter=noconfirm] i').removeClass(no).addClass(yes);
        $('.gb-btn-green').removeClass('gb-btn-gray');
        GSY.gamebox.selectUserCount = element.parent().siblings('.gb-accountslist-list-box').find('div[class="gb-accountslist-list"][data-running="false"]').length;
    }
}

/**
 * [oneClickGoPlayGame description] 一键多开
 * @param  {[type]} element [description]
 * @return {[type]}         [description]
 */
GSY.gamebox.oneClickGoPlayGame = function(element) {
    if (element.hasClass('gb-btn-gray'))
        return;
    //js调用c++方法;
    GSY.gamebox.cAjaxCallback('WINIE_LoginCliekMultyButton', {}, '账号多开按钮');
    var list = element.parent().siblings('.gb-accountslist-list-box').find('div[class="gb-accountslist-list"][data-confirm="true"][data-running="false"]'); //未登录小号的列表

    GSY.gamebox.cAjaxCallback('WINIE_LoginCliekMultyButton', {count:list.length}, '账号多开数量');
    //循环被选中的账号
    var count = 0;
    var isClose = false;
    list.find('span[data-selecter=noconfirm] .gb-confirm').each(function(index, el) {
        count++;
        var $el = $(this);
        if (count == list.length) {
            isClose = true;
        }
        (function($el){
            GSY.gamebox.oneClickGoPlayGameCode($el.closest('.gb-accountslist-list'), isClose);
        })($el);
        
    });
    //未选登陆账号
    if (count == 0) {
        GSY.util.echo(['未选登陆账号']);
    }
}

/**
 * [oneClickGoPlayGameCode description] 一键对多开方法处理
 * @param  {[type]} item [description]
 * @return {[type]}      [description]
 */
GSY.gamebox.oneClickGoPlayGameCode = function(item, isClose) {
    var _data = JSON.parse(item.find('em.datapost').text());
    GSY.util.echo(JSON.stringify(_data), '多开方法处理1');

    //主账号是google和facebook账号的时候不处理
    /*if(_data.type == 'GOOGLE' || _data.type == 'fb'){
        return; 
    }*/

    //判断用户是否登陆
    var flag = GSY.gamebox.userRunCodeMessage(_data.username);
    if (flag) return;

    var _token = '';

    _token = GSY.gamebox.userRunToken(_data.username, item.attr('data-main'));
    if (_token == '' || _token.length == 0) {
        //获取用户信息并设置用户信息
        GSY.gamebox.getUserToken(function(token, uid) {
            var data = {
                username: _data.username,
                pwd: _data.pwd,
                type: _data.type,
                token: token,
                discription_: _data.discription_,
                isClose: isClose
            };
            GSY.util.echo(JSON.stringify(data), '多开方法处理2');

            //登录上报日志
            if (item.attr('data-main') == 'true') {
                GSY.gamebox.uploadLoginLog({
                    'uuid': uid,
                    'event': 'webmainlogin',
                    'type': 'oas'
                })
            } else {
                GSY.gamebox.uploadLoginLog({
                    'uuid': uid,
                    'event': 'smalllogin',
                    'type': 'oas'
                })
            }
            //js调用c++方法;
            setTimeout(function(){
                GSY.gamebox.cAjaxCallback('WINIE_LoginOK', data, '用户开小号登陆成功');
            },2000);
        }, {email: _data.username,pwd: _data.pwd});
    } else {
        var data = {
            username: _data.username,
            pwd: _data.pwd,
            type: _data.type,
            token: _token,
            discription_: _data.discription_,
            isClose: isClose
        };
        /*GSY.gamebox.getUserId(_token,GSY.config.get('gamecode'),function(uid){
            //登录上报日志
            GSY.gamebox.uploadLoginLog({'uuid':uid,'type':'smalllogin'})
        })*/
        GSY.gamebox.cAjaxCallback('WINIE_LoginOK', data, '用户开小号登陆成功');
    }
};

/**
 * [userRunCode description] 判断当前登录账号是否正在运行中并弹出相应的提示
 * @param  {[type]} element [description]
 * @return {[type]}         [description]
 */
GSY.gamebox.userRunCodeMessage = function(username) {
    //判断当前账号是否已登录游戏
    var flag = false;
    flag = GSY.gamebox.userRunCodeStatus(username);

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
}


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
}

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
 * [setUserData description] 设置用户信息
 * @param {[type]} ret [description]
 */
GSY.gamebox.setUserData = function(ret) {
    //初始化页面 
    var parent = $('#gb-login-down-inti');
    var item = parent.find('div[data-type=' + ret.type + ']');
    var index = item.index();
    item.show().siblings().hide();
    var tab = parent.find('.gb-login-down-t-in a');
    tab.eq(index).addClass('cur').siblings().removeClass('cur');
    var username = item.find('input[data-name=username]');
    var pwd = item.find('input[data-name=password]');
    var rememberElement = item.find('input[data-name=remember]');

    var usernameTip = item.find('label[data-name=usernameTip]');
    var passwordTip = item.find('label[data-name=passwordTip]');
    var accountError = item.find('p[data-name=accountError]');
    var accpassError = item.find('p[data-name=accpassError]');
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
 * [initUserListData description] 用户多开页面数据初始化
 * @return {[type]} [description]
 */
GSY.gamebox.initUserListDataURL = null;
GSY.gamebox.selectUserCount = 0;
GSY.gamebox.confirmUsercount = 0;
GSY.gamebox.initUserListData = function(ret) {
    var btn = $('#gb-accountslist-listno-add').hide();
    var yes = 'gb-confirm',
        no = 'gb-noconfirm';
    if (typeof ret == 'string') ret = GSY.gamebox.eval(ret);
    GSY.util.echo(JSON.stringify(ret), '创建账号多->开已开小号列表信息');
    //对象没有值的时候处理
    if ($.isEmptyObject(ret)) return;


    var len = ret.length;
    GSY.gamebox.initUserListDataURL = ret[0].url;

    //设置默认昵称
    var mainAccount = LANG[GSY.config.get('lang')]['Gamebox_mainAccount'];
    var newLength = 0;
    for (var i = 0; i < len; i++) {
        //只显示oas账号的小号
        if(ret[i].type.toLowerCase() != 'oas' && i > 0){
            continue;
        }
        newLength += 1;
        var tempStr = GSY.gamebox.tpl('userlist');
        var descStr = ret[i].discription_ && ret[i].discription_ != 'null' ? ret[i].discription_ : mainAccount
        ret[i]['discription_'] = descStr;
        //GSY.gamebox.message(post)
        var post = JSON.stringify(ret[i]);
        GSY.util.echo(post, '创建账号多->传递参数');

        //账号类型
        tempStr = tempStr.replace('\{gameType\}', ret[i].type);

        //账号全名称
        tempStr = tempStr.replace('\{gameContent\}', GSY.str.cut(ret[i].username, 24, true));

        //账号缩略名称
        tempStr = tempStr.replace('\{gameFullContent\}', ret[i].username);

        //该账号最后玩过的区服信息
        tempStr = tempStr.replace('\{gameLastServer\}', ret[i].service_area);

        //用户缩略昵称
        var desc = GSY.str.cut(descStr, 10, true);
        tempStr = tempStr.replace(/\{gameDesc\}/g, (desc));

        //用户全昵称
        tempStr = tempStr.replace(/\{gameFullDesc\}/g, descStr);

        //存储用户信息
        tempStr = $(tempStr.replace('\{dataPost\}', post));

        btn.before(tempStr);

        if (i == 0) {
            btn.siblings().find('div[data-selecter=delete]').remove();
            btn.siblings().find('span[data-selecter=edit]').remove();
            //btn.siblings().find('.gb-accountslist-check i').removeClass(no).addClass('gb-disabled')
            //if(ret[i].type != 'oas') btn.siblings().addClass('gb-accountslist-mainUser')
        }
    };

    //当账户个数小于等于6个时候处理方法
    GSY.util.echo(['当账户个数小于等于6=>' + newLength]);
    if (newLength < 6) {
        btn.show();
    }

    //判断是否是正在运行的账号并给予相应的状态
    var list = $('#gb-js-accountslist-list-box').children('.gb-accountslist-list');
    list.each(function(index, el) {
        var item = $(this);
        if (index == 0) { //主号
            item.attr('data-main', 'true');
        }
        var _data = JSON.parse(item.find('em.datapost').text());
        //判断是否是正在运行的账号
        if (GSY.gamebox.userRunCodeStatus(_data.username)) {
            $(this).attr('data-running', 'true');
            $(this).find('i.gb-i').addClass('gb-selected');
        } else {
            $(this).attr('data-running', 'false');
            $(this).find('i.gb-i').removeClass('gb-selected');
        }
    });

    //模拟选项卡功能
    var parent = $('.gb-accountslist-list');
    var parentStr = '.gb-accountslist-list';
    GSY.gamebox.confirmUsercount = $('.gb-accountslist-list[data-running="false"]').length;
    GSY.gamebox.selectUserCount = $('.gb-accountslist-list[data-confirm="true"][data-running="false"]').length;
    parent.find('.gb-accountslist-check i').click(function() {
        if ($(this).hasClass('gb-disabled') || $(this).closest(parentStr).attr('data-running') == 'true') return; //主号与已登录的小号不执行选中事件
        else {
            if ($(this).hasClass(yes)) {
                GSY.gamebox.selectUserCount--;
                $(this).removeClass(yes).addClass(no);
                $(this).closest(parentStr).attr('data-confirm', 'false');
            } else {
                GSY.gamebox.selectUserCount++;
                $(this).removeClass(no).addClass(yes);
                $(this).closest(parentStr).attr('data-confirm', 'true');
            }
        }
        //对按钮的操作
        if (GSY.gamebox.selectUserCount == 0) { //没有选中项
            $('.gb-btn-green').addClass('gb-btn-gray');
        } else {
            $('.gb-btn-green').removeClass('gb-btn-gray');
        }
        //对全选的操作
        if (GSY.gamebox.selectUserCount == GSY.gamebox.confirmUsercount) {
            $('.gb-accountslist-list-confirm').find('i.gb-i').removeClass(no).addClass(yes);
        } else {
            $('.gb-accountslist-list-confirm').find('i.gb-i').removeClass(yes).addClass(no);
        }
    });
    //对全选框与多开按钮的状态处理
    GSY.gamebox.changeBtnStatus();
};

GSY.gamebox.changeBtnStatus = function() {
    var len = $('.gb-accountslist-list').length;
    var yes = 'gb-confirm',
        no = 'gb-noconfirm';
    GSY.gamebox.confirmUsercount = $('.gb-accountslist-list[data-running="false"]').length;
    GSY.gamebox.selectUserCount = $('.gb-accountslist-list[data-confirm="true"][data-running="false"]').length;
    //对全选框与多开按钮的状态处理
    if (GSY.gamebox.selectUserCount == 0) {
        $('.gb-btn-green').addClass('gb-btn-gray');
    } else {
        $('.gb-btn-green').removeClass('gb-btn-gray');
    }
    if (GSY.gamebox.selectUserCount == GSY.gamebox.confirmUsercount) {
        if (GSY.gamebox.confirmUsercount == 0) {
            $('.gb-accountslist-list-confirm').find('i.gb-i').removeClass(yes).addClass(no).addClass('gb-unselected');
            $('.gb-accountslist-list-confirm').find('em').addClass('gb-glay');
        } else {
            $('.gb-accountslist-list-confirm').find('i.gb-i').removeClass(no).addClass(yes).removeClass('gb-unselected');
            $('.gb-accountslist-list-confirm').find('em').removeClass('gb-glay');
        }
    } else {

        $('.gb-accountslist-list-confirm').find('i.gb-i').removeClass(yes).addClass(no).removeClass('gb-unselected');
        $('.gb-accountslist-list-confirm').find('em').removeClass('gb-glay');
    }
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
 * [delUserList description] 删除小号账号
 * @param  {[object]} element [description] 操作按钮元素对象
 * @return {[type]}     [description]
 */
GSY.gamebox.delUserList = function(element, event) {

    //取消冒泡事件
    var e = window.event || event;
    if (e.stopPropagation) e.stopPropagation(); //IE以外
    else e.cancelBubble = true; //IE    

    var parentStr = '.gb-accountslist-list';
    var data = JSON.parse(element.closest(parentStr).find('em.datapost').text());
    var name = data.discription_ != 'null' ? data.discription_ : LANG[GSY.config.get('lang')]['Gamebox_mainAccount'];
    var msg = LANG[GSY.config.get('lang')]['Gamebox_delUserInfo'];
    msg = msg.replace(/\{nickname\}/, name);

    //删除操作成功回调方法
    GSY.gamebox.delUserListCallback = function(ret) {
        GSY.util.echo(['删除账号成功之后回调方法=>' + ret]);
        //if(typeof ret == 'string') ret = GSY.gamebox.eval(ret);
        if (ret.code == 'true') {
            element.closest(parentStr).remove();
            $('#gb-accountslist-listno-add').show();
            //对全选框与多开按钮的状态处理
            GSY.gamebox.changeBtnStatus();
        }
        GSY.gamebox.delUserListCallback = null;
    };

    //确认按钮回调方法
    GSY.gamebox.delUserListOk = function(ret) {
        //alert(ret.data)
        GSY.util.echo(['status=>' + ret.data]);
        if (ret.data == 'true') {
            //js调用c++方法
            var objs = {
                type: data.type,
                username: data.username,
                callback: function(ret) {
                    GSY.gamebox.delUserListCallback(ret);
                }
            }
            GSY.gamebox.cAjaxCallback('WINIE_XiaoDel', objs, '删除小号账号操作');
        }
        GSY.gamebox.delUserListOk = null;
    }
    GSY.gamebox.message(msg, GSY.gamebox.delUserListOk);
};


/**
 * [changeDiscrition description] 修改用户昵称
 * @param  {[type]} element [description] 操作按钮元素对象
 * @return {[type]}     [description]
 */
GSY.gamebox.changeDiscrition = function(element, event) {

    //取消冒泡事件
    var e = window.event || event;
    if (e.stopPropagation) e.stopPropagation(); //IE以外
    else e.cancelBubble = true; //IE 

    var input = element.siblings('.gb-accountslist-name').find('input');
    var em = element.siblings('.gb-accountslist-name').find('em');
    var definedI = element.siblings('.gb-accountslist-name').find('i');
    var definedVal = definedI.text();
    var parentStr = '.gb-accountslist-list';
    var data = JSON.parse(element.closest(parentStr).find('em.datapost').text());
    //汉字、数字、字母、下划线、空格、点和减号通过验证
    //var reg = /^[\u4E00-\u9FA50-9a-zA-Z_ .-]+$/;
    //波语
    //var reg = /^[^\'\"]*$/;

    //修改用户昵称成功回调方法
    GSY.gamebox.changeDiscritionCallback = function(ret) {
        GSY.util.echo(['修改用户昵称成功回调方法->' + ret]);
        if (ret.code == 1) {
            var strVal = $.trim(input.val());
            var str = GSY.str.cut(strVal, 10, true);
            em.text(str).show();
            definedI.text(strVal);

            data['discription_'] = strVal;
            element.closest(parentStr).find('em.datapost').text(JSON.stringify(data));
            //input.parent().attr('title',input.val());
            input.hide();
        }
        setTimeout(function() {
            element.attr('data-status', false);
        }, 300);
    };

    //绑定回车事件和是否超出长度限制
    input.unbind('keyup').bind('keyup', function(e) {
        if (e.keyCode == 13) {
            var str = $.trim(input.val());


            //当前值为空的时候处理
            if (str == '') {
                GSY.util.maxCharTips(input);
                return;
            }

            //验证字符的有效性
            /*if(!reg.test(str)){
                var tips = OASGetLangVal('Gamebox_string_format_error');
                GSY.gamebox.message(tips,GSY.gamebox.changeDiscritionReg);
                return;
            }*/

            //当前值与默认值相同不处理
            if (str == definedVal) {
                em.show();
                input.hide().val('');
                element.attr('data-status', false);
                return;
            }
        }
    });

    //验证提示信息回调方法
    GSY.gamebox.changeDiscritionReg = function(status) {
        var str = input.val();
        input.focus().val('').val(str);
    }

    //失去焦点绑定存储事件
    input.unbind('blur').bind('blur', function(e) {
        var str = $.trim(input.val());
        //当前值为空的时候处理
        if (str == '') {
            GSY.util.maxCharTips(input);
            return;
        }

        //验证字符的有效性
        /*if(!reg.test(str)){
            var tips = OASGetLangVal('Gamebox_string_format_error');
            GSY.gamebox.message(tips,GSY.gamebox.changeDiscritionReg);
            return;
        }*/

        //当前值与默认值相同不处理
        if (str == definedVal) {
            em.show();
            input.hide().val('');
            setTimeout(function() {
                element.attr('data-status', false);
            }, 300);
            return;
        }
        //通过验证处理方法
        GSY.gamebox.changeDiscritionCode(input, data);
    });

    //获取状态
    if (element.attr('data-status') == 'false') var status = true
    else var status = false;
    if (status) {
        input.show().focus().val(definedVal);
        em.hide();
        element.attr('data-status', true);
    }
};

/**
 * [changeDiscritionCode description] 修改用户昵称通过验证的时候处理方法
 * @param  {[type]} input [description] 文本框对象
 * @param  {[type]} data  [description] 当前用户信息
 * @return {[type]}       [description]
 */
GSY.gamebox.changeDiscritionCode = function(input, data) {
    data['callback'] = function(ret) {
        GSY.gamebox.changeDiscritionCallback(ret);
    };
    data['discription_'] = input.val();
    var str = GSY.gamebox.jsonTojsonStr(data);
    //js调用c++方法
    GSY.gamebox.cAjaxCallback('WINIE_XiaoChgDiscrition', data, '修改用户昵称通过验证的时候交互操作');
};


/**
 * [addUserList description] 打开用户添加账号弹层应用
 * @return {[type]} [description]
 */
GSY.gamebox.addUserList = function() {
    //js调用c++方法
    GSY.gamebox.cAjaxCallback('WINIE_XiaoAdd', {}, '启用内部弹层登陆应用');
};


/**
 * [description] 页面加载完毕之后处理方法
 * @return {[type]} [description]
 */
$(function() {
    $(window).on('load', function() {
        //与c++接口交互数据 ==> 初始化账号多开页面数据
        if (typeof window.external != undefined) {
            //js调用c++方法
            GSY.gamebox.cAjaxCallback('WINIE_GetRuningList', {
                callback: GSY.gamebox.userRuning
            }, '获取正在运行的用户列表');
        }

        var hasUserDataCode = function() {
            if (GSY.gamebox.userRuningData) {
                //与c++接口交互数据 ==> 初始化账号多开用户列表
                if (typeof window.external != undefined) {
                    //js调用c++方法
                    GSY.gamebox.cAjaxCallback('WINIE_XiaoInitData', {
                        callback: GSY.gamebox.initUserListData
                    }, '初始化账号多开用户列表');
                }
            } else {
                setTimeout(function() {
                    hasUserDataCode();
                }, 100)
            }
        }
        hasUserDataCode();
    });

});

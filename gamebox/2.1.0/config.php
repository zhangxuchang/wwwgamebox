<?php
$version = $_GET['version'];
$lg = $_GET['lg'];
$accountType = isset($_GET['account']) ? $_GET['account'] : false;
$gamecode = $_GET['gameid'];
$page = isset($_GET['page']) ? $_GET['page'] : false;

/**
 * [getVerion description]  获取版本号
 * @param  [type] $v [description]
 * @return [type]    [description]
 */
function getVerion($v){
    return $str = '2.1.0';
    $arr = explode('.',$v);
    $len = count($arr);
    $ver = array_slice($arr,0,$len-1);
    $str = join('.',$ver);
    $str = $str <= '2.1.1' ? '2.1.0' : $str;
    return  $str;
}
$file = getVerion($version);

$CONFIG = array();
$CONFIG['file'] = $file;  
$CONFIG['path'] = 'gamebox/'.$CONFIG['file'].'/';
$CONFIG['host'] = '//www.oasgames.com/';
$CONFIG['dir'] =  $CONFIG['host'].$CONFIG['path'];
$CONFIG['version'] = '2018062901';
$CONFIG['cdn'] = $CONFIG['host'].$CONFIG['path'];


$arr = array(
	'host'=> $CONFIG['host'],
	'static_host'=>$CONFIG['dir'],
	'version' => $CONFIG['version'],
	'lang' => $lg,
	'file_ver'=> $CONFIG['file'],
);

$CONFIG['js_config'] = json_encode($arr);

//echo $CONFIG['js_config'];
//游戏数据
$CONFIG['GamesData'] = array();

//土语神曲
$CONFIG['GamesData']['lotr'] = array(
	'name' =>'Legend Online',
    'ico'  => $CONFIG['cdn'].'static/games/lotr/icon.jpg',
    'serverbgpic'=>$CONFIG['cdn'].'static/games/lotr/list.jpg', //服务器列表背景图片
    'accountbgpic'=>$CONFIG['cdn'].'static/games/lotr/lotr.jpg',    //账号多开背景图片    
    'url'  => '//odp3.oasgames.com/api/game/serverlist?source=client&gamecode=lotr&uid={uid}', 
    'login_css'  => $CONFIG['cdn'].'static/css/oas.login.css',
    'login_skin' => '2'
);

//葡语神曲
$CONFIG['GamesData']['lobr'] = array(
	'name'=> 'Legend Online',	//游戏名称
    'ico'=> $CONFIG['cdn'].'static/games/lotr/icon.jpg',	//游戏小图标
    'serverbgpic'=>$CONFIG['cdn'].'static/games/lotr/list.jpg',	//服务器列表背景图片
    'accountbgpic'=>$CONFIG['cdn'].'static/games/lotr/lobr.jpg',	//账号多开背景图片
    'url'=>'//odp3.oasgames.com/api/game/serverlist?source=client&gamecode=lobr&uid={uid}',
    'login_css'  => $CONFIG['cdn'].'static/css/oas.login.css',
    'login_skin' => '2'
);
$CONFIG['GamesData']['lopt'] = array(
    'name'=> 'Legend Online',   //游戏名称
    'ico'=> $CONFIG['cdn'].'static/games/lotr/icon.jpg',    //游戏小图标
    'serverbgpic'=>$CONFIG['cdn'].'static/games/lotr/list.jpg', //服务器列表背景图片
    'accountbgpic'=>$CONFIG['cdn'].'static/games/lotr/lopt.jpg',    //账号多开背景图片
    'url'=>'//odp3.oasgames.com/api/game/serverlist?source=client&gamecode=lobr&uid={uid}',
    'login_css'  => $CONFIG['cdn'].'static/css/oas.login.css',
    'login_skin' => '2'
);

//波语神曲
$CONFIG['GamesData']['lopl'] = array(
	'name'=> 'Legend Online',	//游戏名称
    'ico'=>$CONFIG['cdn'].'static/games/lotr/icon.jpg',	//游戏小图标
    'serverbgpic'=>$CONFIG['cdn'].'static/games/lotr/list.jpg',	//服务器列表背景图片
    'accountbgpic'=>$CONFIG['cdn'].'static/games/lotr/lopl.jpg',	//账号多开背景图片
    'url'=>'//odp3.oasgames.com/api/game/serverlist?source=client&gamecode=lopl&uid={uid}',
    'login_css'  => $CONFIG['cdn'].'static/css/oas.login.css',
    'login_skin' => '2'
);

//西语神曲
$CONFIG['GamesData']['loes'] = array(
	'name'=> 'Legend Online',	//游戏名称
    'ico'=>$CONFIG['cdn'].'static/games/lotr/icon.jpg',	//游戏小图标
    'serverbgpic'=>$CONFIG['cdn'].'static/games/lotr/list.jpg',	//服务器列表背景图片
    'accountbgpic'=>$CONFIG['cdn'].'static/games/lotr/loes.jpg',	//账号多开背景图片
    'url'=>'//loes.oasgames.com/oasplay/api/serverlist4guanwang_v2.php?uid={uid}',
    'login_css'  => $CONFIG['cdn'].'static/css/oas.login.css',
    'login_skin' => '2'
);

//德语神曲
$CONFIG['GamesData']['lode'] = array(
	'name'=> 'Legend Online',	//游戏名称
    'ico'=>$CONFIG['cdn'].'static/games/lotr/icon.jpg',	//游戏小图标
    'serverbgpic'=>$CONFIG['cdn'].'static/games/lotr/list.jpg',	//服务器列表背景图片
    'accountbgpic'=>$CONFIG['cdn'].'static/games/lotr/lode.jpg',	//账号多开背景图片
    'url'=>'//odp3.oasgames.com/api/game/serverlist?source=client&gamecode=lode&uid={uid}',
    'login_css'  => $CONFIG['cdn'].'static/css/oas.login.css',
    'login_skin' => '2'
);

//希腊语神曲
$CONFIG['GamesData']['loel'] = array(
    'name'=> 'Legend Online',   //游戏名称
    'ico'=>$CONFIG['cdn'].'static/games/lotr/icon.jpg', //游戏小图标
    'serverbgpic'=>$CONFIG['cdn'].'static/games/lotr/list.jpg', //服务器列表背景图片
    'accountbgpic'=>$CONFIG['cdn'].'static/games/lotr/loel.jpg',    //账号多开背景图片
    'url'=> '//odp3.oasgames.com/api/game/serverlist?source=client&gamecode=loel&uid={uid}',
    'login_css'  => $CONFIG['cdn'].'static/css/oas.login.css',
    'login_skin' => '2',
    'getNewsUrl' => '//odp3.oasgames.com/api/game/gbox-news?source=client&gamecode=loel'
);

//瑞典语神曲
$CONFIG['GamesData']['losv'] = array(
    'name'=> 'Legend Online',   //游戏名称
    'ico'=>$CONFIG['cdn'].'static/games/lotr/icon.jpg', //游戏小图标
    'serverbgpic'=>$CONFIG['cdn'].'static/games/lotr/list.jpg', //服务器列表背景图片
    'accountbgpic'=>$CONFIG['cdn'].'static/games/lotr/losv.jpg',    //账号多开背景图片
    'url'=>'//losv.oasgames.com/fbapp/interface/serverlist4guanwang.php?uid={uid}',
    'login_css'  => $CONFIG['cdn'].'static/css/oas.login.css',
    'login_skin' => '2'
);

//荷兰语神曲
$CONFIG['GamesData']['lonl'] = array(
    'name'=> 'Legend Online',   //游戏名称
    'ico'=>$CONFIG['cdn'].'static/games/lotr/icon.jpg', //游戏小图标
    'serverbgpic'=>$CONFIG['cdn'].'static/games/lotr/list.jpg', //服务器列表背景图片
    'accountbgpic'=>$CONFIG['cdn'].'static/games/lotr/lonl.jpg',    //账号多开背景图片
    'url'=>'//odp3.oasgames.com/api/game/serverlist?source=client&gamecode=lonl&uid={uid}',
    'login_css'  => $CONFIG['cdn'].'static/css/oas.login.css',
    'login_skin' => '2'
);

//葡语Q游记
$CONFIG['GamesData']['irpt'] = array(
    'name' =>'Island of Rainbow',
    'ico'  => $CONFIG['cdn'].'static/games/irpt/icon.jpg',
    'serverbgpic'=>$CONFIG['cdn'].'static/games/irpt/list.jpg', //服务器列表背景图片
    'accountbgpic'=>$CONFIG['cdn'].'static/games/irpt/smallload.jpg',    //账号多开背景图片
    'url'  => '//odp.oasgames.com/api/?m=serverlist&game_code=irpt&type=oas_get_server&uid={uid}',
    'login_css'  => $CONFIG['cdn'].'static/css/oas.qlogin.css',
    'login_skin' => '3'
);

//土语生死狙击
$CONFIG['GamesData']['fbtr'] = array(
    'name' =>'First Blood',
    'ico'  => $CONFIG['cdn'].'static/games/fbtr/icon.jpg',
    'serverbgpic'=>$CONFIG['cdn'].'static/games/fbtr/list.jpg', //服务器列表背景图片
    'accountbgpic'=>$CONFIG['cdn'].'static/games/fbtr/smallload.jpg',    //账号多开背景图片
    'url'  => '//fbtr.oasgames.com/oasplay/api/serverlist4guanwang_v2.php?uid={uid}',
    'login_css'  => $CONFIG['cdn'].'static/css/oas.flogin.css',
    'login_skin' => '2'
);

//阿拉伯语神曲
$CONFIG['GamesData']['loar'] = array(
    'name' => 'Legend Online',   //游戏名称
    'ico' => $CONFIG['cdn'].'static/games/lotr/icon.jpg', //游戏小图标
    'serverbgpic' => $CONFIG['cdn'].'static/games/lotr/list-ar.jpg', //服务器列表背景图片
    'accountbgpic' => $CONFIG['cdn'].'static/games/lotr/loar.jpg',    //账号多开背景图片
    'url' => '//odp3.oasgames.com/api/game/serverlist?source=client&gamecode=loar&uid={uid}',
    'login_css'  => $CONFIG['cdn'].'static/css/oas.login.ar.css',
    'login_skin' => '2',
    'getNewsUrl' => '//odp3.oasgames.com/api/game/gbox-news?source=client&gamecode=loar'
);

//弹弹堂西语
$CONFIG['GamesData']['ddtes'] = array(
    'name' => 'DDtank',   //游戏名称
    'ico' => $CONFIG['cdn'].'static/games/ddt/icon.gif', //游戏小图标
    'serverbgpic' => $CONFIG['cdn'].'static/games/ddt/list.jpg', //服务器列表背景图片
    'accountbgpic' => $CONFIG['cdn'].'static/games/ddt/account.jpg',    //账号多开背景图片
    'url' => '//odp.oasgames.com/api/?m=serverlist&game_code=ddtes&type=oas_get_server&uid={UID}',
    'login_css'  => $CONFIG['cdn'].'static/css/oas.login.ddt.css',
    'login_skin' => '2'
);


//葡语弹弹堂
$CONFIG['GamesData']['botpt'] = array(
    'name' => 'Battle of Tanks',   //游戏名称
    'ico' => $CONFIG['cdn'].'static/games/ddt/icon.jpg', //游戏小图标
    'serverbgpic' => $CONFIG['cdn'].'static/games/ddt/list.jpg', //服务器列表背景图片
    'accountbgpic' => $CONFIG['cdn'].'static/games/ddt/account.jpg',    //账号多开背景图片
    'url' => '//odp.oasgames.com/api/?m=serverlist&game_code=botpt&type=oas_get_server&uid={UID}',
    'login_css'  => $CONFIG['cdn'].'static/css/oas.login.bot.css',
    'login_skin' => '2'
);



//当前登录器页面的游戏信息 
if($page == 'login'){
    $CONFIG['info'] = $CONFIG['GamesData'][$gamecode];
    $CONFIG['jsInfo'] = json_encode($CONFIG['info']);    
}

//设置前端资源变量
$jsConfigArr = array();
$jsConfigArr['file'] = $file;
$jsConfigArr['path'] = $CONFIG['path'];
$jsConfigArr['host'] = $CONFIG['host'];
$jsConfigArr['dir'] = $CONFIG['dir'];
$jsConfigArr['version'] = $CONFIG['version'];
$jsConfigArr['cdn'] = $CONFIG['cdn'];
$jsConfig = json_encode($jsConfigArr);
?>


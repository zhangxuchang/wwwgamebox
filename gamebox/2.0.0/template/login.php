<?php
include_once('../config.php');
$fbAppList = [
    'loar'     => '852288555719972',
    'lobr'     => '852288555719972',
    'lode'     => '852288555719972',
    'loel'     => '852288555719972',
    'loes'     => '852288555719972',
    'lofr'     => '852288555719972',
    'loit'     => '852288555719972',
    'lonl'     => '852288555719972',
    'lopl'     => '852288555719972',
    'lorpt'    => '852288555719972',
    'lortr'    => '852288555719972',
    'loru'     => '852288555719972',
    'losv'     => '852288555719972',
    'lotr'     => '852288555719972',
    'narutode' => '231602602186835',
    'narutoen' => '231602602186835',
    'narutoes' => '231602602186835',
    'narutofr' => '231602602186835',
    'narutoit' => '231602602186835',
    'narutopl' => '231602602186835',
    'narutopt' => '231602602186835',
    'narutotr' => '231602602186835',
];
$gameCode = $_REQUEST['gameid'];
$gameFbAppId = (isset($fbAppList[$gameCode]))? $fbAppList[$gameCode] : '231602602186835';
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<link href="<?php echo $CONFIG['info']['login_css']?>?ver=<?php echo $CONFIG['version']?>" rel="stylesheet" type="text/css" />
<script src="<?php echo $CONFIG['dir']?>static/package/jquery.min.js?ver=<?php echo $CONFIG['version']?>" type="text/javascript"></script>
<script src="<?php echo $CONFIG['dir']?>static/package/oas.lang.js?ver=<?php echo $CONFIG['version']?>" type="text/javascript"></script>
<script type="text/javascript">
var pageType = "login";
var FB_APP_ID = "<?php echo $gameFbAppId?>";
</script>
</head>
<?php if($CONFIG['info']['login_skin'] == '1'){?>
<body class="gb-login-bg" scroll="no">
<!--模板一-->
<div class="gb-login-box" >
	<div class="gb-login-up">
		<!--轮播图-->
		<div class="gb-login-up-l">
			<div class="oas-slider-box" id="gb-adsList-box"><ul></ul></div>	
		</div>
		<!--轮播图 结束-->
		<!--新闻信息-->
		<div class="gb-login-up-r" id="gb-newsList-box">
			<div class="gb-login-up-r-t"><script type="text/javascript">OASWriteContent('Gamebox_actionAndNews')</script></div>
			<ul class="gb-login-up-r-c"></ul>
		</div>
		<!--新闻信息 结束-->
	</div>
	<div class="gb-login-down" id="gb-login-down-inti">
		<div class="gb-login-down-t">
			<div class="gb-login-down-t-in">
				<a href="Javascript: void(0)" class="gb-login-down-t-one cur"><i class="gb-i gb-oas"></i><span><script type="text/javascript">OASWriteContent('Gamebox_AccountOasgames');</script></span></a>
				<a data-facebook="true" href="Javascript: void(0)" onclick="OAS_GAMES_JS.facebook.login({'fail':'Fail to connect with facebook'},GSY.gamebox.FBloginCallback);" class="gb-login-down-t-two"><i class="gb-i gb-facebook"></i><span><script type="text/javascript">OASWriteContent('Gamebox_AccountFacebook');</script></span></a>
				<a data-google="true" href="Javascript: void(0)" onclick="OAS_GAMES_JS.google.login({'fail':'Fail to connect with google'},GSY.gamebox.GOOGLEloginCallback);" class="gb-login-down-t-three"><i class="gb-i gb-google"></i><span><script type="text/javascript">OASWriteContent('Gamebox_AccountGoogle');</script></span></a>
			</div>
		</div>
		<div class="gb-login-down-c">
			<!--list-->
			<div class="gb-login-down-c-in" data-selecter="parent" data-type="oas" >
				<div class="gb-login-down-c-l">
					<table border="0" cellspacing="0" cellpadding="0">
						<tr>
							<td class="gb-login-down-td-t"><script type="text/javascript">OASWriteContent('Gamebox_Account')</script></td>
							<td class="gb-login-downdown-cbx">
								<p><input type="text" data-name="username" class="gb-login-down-txt"/></p>
							</td>
						</tr>
						<tr>
							<td class="gb-login-down-td-t"><script type="text/javascript">OASWriteContent('Gamebox_Password')</script></td>
							<td class="gb-login-downdown-cbx"><p><input data-name="password" type="password" class="gb-login-down-psd"/></p></td>
						</tr>
						<tr>
							<td></td>
							<td class="gb-login-down-cbx"><input data-name="remember" type="checkbox" id="yes1"/><label for="yes1"><span><script type="text/javascript">OASWriteContent('Gamebox_remember_password');</script></span></label></td>
						</tr>
						<!-- <tr>
							<td></td>
							<td class="gb-login-down-cbx"><input data-name="automatic" type="checkbox" id="no1"/><label for="no1"><span><script type="text/javascript">OASWriteContent('Gamebox_Automatic_login');</script></span></label></td>
						</tr> -->
					</table>
				</div>
				<div class="gb-login-down-c-r">
					<div class="gb-loginBox-btn"><a href="javascript:void(0);" onclick="GSY.gamebox.login($(this)); return false;" class="gb-login-down-c-btn"><script type="text/javascript">OASWriteContent('Gamebox_Login');</script></a></div>
					<div class="gb-loginBox-other">
						<script type="text/javascript">OASWriteContent('Gamebox_Register');</script>
						<em>|</em>
						<script type="text/javascript">OASWriteContent('Gamebox_Forgot_password');</script>
					</div>
				</div>				
			</div>
			<!--list end-->
		</div>
	</div>
</div>
<!--模板一 结束-->
<?php }else if($CONFIG['info']['login_skin'] == '2') { ?>
<body class="lopl-login-bg" scroll="no">
<!--模板二-->
<div class="lopl-login-box" >
	<div class="lopl-login-up">
		<!--轮播图-->
		<div class="gb-login-up-l lopl-login-up-l">
			<div class="oas-slider-box" id="gb-adsList-box"><ul><script type="text/javascript">OASWriteContent('loading')</script>...</ul></div>	
		</div>
		<!--轮播图 结束-->
		<!--新闻信息-->
		<div class="gb-login-up-r lopl-login-up-r" id="gb-newsList-box">
			<div class="gb-login-up-r-t lopl-login-up-r-t"><script type="text/javascript">OASWriteContent('Gamebox_actionAndNews')</script></div>
			<ul class="gb-login-up-r-c lopl-login-up-r-c">
				<!--<li>
					<a href="">
						<em></em>
						<span>32131321</span>
					</a>
				</li>-->
			</ul>
		</div>
		<!--新闻信息 结束-->
	</div>
	<div class="lopl-login-down" id="gb-login-down-inti">
		<div data-selecter="parent" data-type="oas">
			<div class="lopl-login-left">
				<h4><script type="text/javascript">OASWriteContent('GameBox_OtherUser')</script></h4>
				<div class="lopl-btn">
					<a data-facebook="true" href="javascript:void(0)" onclick="OAS_GAMES_JS.facebook.login({'fail':'Fail to connect with facebook'},GSY.gamebox.FBloginCallback);" class="lopl-btn-facebook"><span><script type="text/javascript">OASWriteContent('Gamebox_AccountFacebook')</script></span></a>
					<a data-google="true" href="javascript:void(0)" onclick="OAS_GAMES_JS.google.login({'fail':'Fail to connect with google'},GSY.gamebox.GOOGLEloginCallback);" class="lopl-btn-google"><span><script type="text/javascript">OASWriteContent('Gamebox_AccountGoogle')</script></span></a>
				</div>
			</div>
			<div class="lopl-login-center">
				<h4><em></em><span><script type="text/javascript">OASWriteContent('Gamebox_AccountOasgames')</script></span></h4>
				<ul class="lopl-login-wrap-up">
					<li>
						<div class="gb-login-div">
							<label data-name="usernameTip"><script type="text/javascript">OASWriteContent('GameBox_AccountTip')</script></label>
							<input class="gb-login-down-txt" type="text" style="display:none;" data-name="username" value="" />
							<i class="gb-login-arrow-down" onclick="GSY.gamebox.showLoginUserList($(this))"></i>
						</div>
						<p data-name="accountError"></p><!--<script type="text/javascript">OASWriteContent('GameBox_AccountError')</script>-->
					</li>
					<li>
						<div class="gb-login-div">
							<label data-name="passwordTip"><script type="text/javascript">OASWriteContent('GameBox_PasswordTip')</script></label>
							<input class="gb-login-down-psd" type="password" style="display:none;" data-name="password" value="" />
						</div>
						<p data-name="accpassError"></p><!--<script type="text/javascript">OASWriteContent('Gamebox_AccPassError')</script>-->
					</li>
					<div class="lopl-login-wrap-list">
						<ul>
							<!--<li data-post=""><span>yonghu1yonghu1yonghu1yonghu1yonghu1yonghu1yonghu1yonghu1</span><i onclick="GSY.gamebox.deleteLoginUser($(this),event)"></i></li>
							<li data-post=""><span>yonghu2</span><i onclick="GSY.gamebox.deleteLoginUser($(this),event)"></i></li>
							<li data-post=""><span>yonghu3</span><i onclick="GSY.gamebox.deleteLoginUser($(this),event)"></i></li>
							<li data-post=""><span>yonghu4</span><i onclick="GSY.gamebox.deleteLoginUser($(this),event)"></i></li>
							<li data-post=""><span>yonghu5</span><i onclick="GSY.gamebox.deleteLoginUser($(this),event)"></i></li>
							<li data-post=""><span>yonghu6</span><i onclick="GSY.gamebox.deleteLoginUser($(this),event)"></i></li>-->
						</ul>
					</div>
				</ul>
				<div class="lopl-login-wrap-down">
					<ul>
						<li>
							<input type="checkbox" data-name="remember" id="yes1" checked="checked" />
							<label for="yes1"><span><script type="text/javascript">OASWriteContent('Gamebox_remember_password')</script></span></label>
						</li>
						<!--<li>
							<input type="checkbox" id="lopl-login-checkbox2" />
							<label for="lopl-login-checkbox2"><span><script type="text/javascript">OASWriteContent('Gamebox_Automatic_login')</script></span></label>
						</li>-->
					</ul>
					<span class="lopl-login-forget"><script type="text/javascript">OASWriteContent('Gamebox_Forgot_password')</script></span>			
				</div>
			</div>
			<div class="lopl-login-right">
				<div class="gb-loginBox-btn"><a href="javascript:void(0)" onclick="GSY.gamebox.login($(this)); return false;" class="lopl-btn-login"><span><script type="text/javascript">OASWriteContent('Gamebox_Login')</script></span></a></div>
				<div><script type="text/javascript">OASWriteContent('Gamebox_Register')</script></div>
			</div>
		</div>
	</div>
</div>
<!--模板二 结束-->

<?php }else if($CONFIG['info']['login_skin'] == '3') { ?>
<body class="lopl-login-bg" scroll="no">
<!--模板三-->
<div class="lopl-login-box" >
	<div class="lopl-login-up">
		<!--轮播图-->
		<div class="gb-login-up-l lopl-login-up-l">
			<div class="oas-slider-box" id="gb-adsList-box"><ul><script type="text/javascript">OASWriteContent('loading')</script>...</ul></div>	
		</div>
		<!--轮播图 结束-->
		<!--新闻信息-->
		<div class="gb-login-up-r lopl-login-up-r" id="gb-newsList-box">
			<div class="gb-login-up-r-t lopl-login-up-r-t"><script type="text/javascript">OASWriteContent('Gamebox_actionAndNews')</script></div>
			<ul class="gb-login-up-r-c lopl-login-up-r-c">
				<!--<li>
					<a href="">
						<em></em>
						<span>32131321</span>
					</a>
				</li>-->
			</ul>
		</div>
		<!--新闻信息 结束-->
	</div>
	<div class="lopl-login-down" id="gb-login-down-inti">
		<div data-selecter="parent" data-type="oas">
			<div class="lopl-login-left">
				<h4><script type="text/javascript">OASWriteContent('GameBox_OtherUser')</script></h4>
				<div class="lopl-btn">
					<a data-facebook="true" href="javascript:void(0)" onclick="OAS_GAMES_JS.facebook.login({'fail':'Fail to connect with facebook'},GSY.gamebox.FBloginCallback);" class="lopl-btn-facebook"><span><script type="text/javascript">OASWriteContent('Gamebox_AccountFacebook')</script></span></a>
					<a data-google="true" href="javascript:void(0)" onclick="OAS_GAMES_JS.google.login({'fail':'Fail to connect with google'},GSY.gamebox.GOOGLEloginCallback);" class="lopl-btn-google"><span><script type="text/javascript">OASWriteContent('Gamebox_AccountGoogle')</script></span></a>
				</div>
			</div>
			<div class="lopl-login-center">
				<h4><em></em><span><script type="text/javascript">OASWriteContent('Gamebox_AccountOasgames')</script></span></h4>
				<ul class="lopl-login-wrap-up">
					<li>
						<div class="gb-login-div">
							<label data-name="usernameTip"><script type="text/javascript">OASWriteContent('GameBox_AccountTip')</script></label>
							<input class="gb-login-down-txt" type="text" style="display:none;" data-name="username" value="" />
							<i class="gb-login-arrow-down" onclick="GSY.gamebox.showLoginUserList($(this))"></i>
						</div>
						<p data-name="accountError"></p><!--<script type="text/javascript">OASWriteContent('GameBox_AccountError')</script>-->
					</li>
					<li>
						<div class="gb-login-div">
							<label data-name="passwordTip"><script type="text/javascript">OASWriteContent('GameBox_PasswordTip')</script></label>
							<input class="gb-login-down-psd" type="password" style="display:none;" data-name="password" value="" />
						</div>
						<p data-name="accpassError"></p><!--<script type="text/javascript">OASWriteContent('Gamebox_AccPassError')</script>-->
					</li>
					<div class="lopl-login-wrap-list">
						<ul>
							<!--<li data-post=""><span>yonghu1yonghu1yonghu1yonghu1yonghu1yonghu1yonghu1yonghu1</span><i onclick="GSY.gamebox.deleteLoginUser($(this),event)"></i></li>
							<li data-post=""><span>yonghu2</span><i onclick="GSY.gamebox.deleteLoginUser($(this),event)"></i></li>
							<li data-post=""><span>yonghu3</span><i onclick="GSY.gamebox.deleteLoginUser($(this),event)"></i></li>
							<li data-post=""><span>yonghu4</span><i onclick="GSY.gamebox.deleteLoginUser($(this),event)"></i></li>
							<li data-post=""><span>yonghu5</span><i onclick="GSY.gamebox.deleteLoginUser($(this),event)"></i></li>
							<li data-post=""><span>yonghu6</span><i onclick="GSY.gamebox.deleteLoginUser($(this),event)"></i></li>-->
						</ul>
					</div>
				</ul>
				<div class="lopl-login-wrap-down">
					<ul>
						<li>
							<input type="checkbox" data-name="remember" id="yes1" checked="checked" />
							<label for="yes1"><span><script type="text/javascript">OASWriteContent('Gamebox_remember_password')</script></span></label>
						</li>
						<!--<li>
							<input type="checkbox" id="lopl-login-checkbox2" />
							<label for="lopl-login-checkbox2"><span><script type="text/javascript">OASWriteContent('Gamebox_Automatic_login')</script></span></label>
						</li>-->
					</ul>
					<span class="lopl-login-forget"><script type="text/javascript">OASWriteContent('Gamebox_Forgot_password')</script></span>			
				</div>
			</div>
			<div class="lopl-login-right">
				<div class="gb-loginBox-btn"><a href="javascript:void(0)" onclick="GSY.gamebox.login($(this)); return false;" class="lopl-btn-login"><span><script type="text/javascript">OASWriteContent('Gamebox_Login')</script></span></a></div>
				<div><script type="text/javascript">OASWriteContent('Gamebox_Register')</script></div>
			</div>
		</div>
	</div>
</div>
<!--模板三 结束-->
<?php }?>
<script type="text/javascript" src="<?php echo $CONFIG['dir']?>static/package/oas.common.js?ver=<?php echo $CONFIG['version']?>"></script>
<script type="text/javascript" src="<?php echo $CONFIG['dir']?>static/scripts/oas.gamebox.js?ver=<?php echo $CONFIG['version']?>"></script>
<script type="text/javascript" src="<?php echo $CONFIG['dir']?>static/package/oas.library.js?ver=<?php echo $CONFIG['version']?>"></script>
<script type="text/javascript" src="<?php echo $CONFIG['dir']?>static/package/oas.slider.js?ver=<?php echo $CONFIG['version']?>"></script>
<script type="text/javascript" src="<?php echo $CONFIG['dir']?>static/scripts/oas.login.js?ver=<?php echo $CONFIG['version']?>"></script>
<script type="text/javascript" src="//www.oasgames.com/gamebox/tempfacebook.js?ver=<?php echo $CONFIG['version']?>"></script>


<script type="text/javascript">
//配置当前游戏名称和游戏图标
var GAME_CODE = GSY.util.getUrlParam('gameid');
GSY.gamebox.setLocalGameData({
	key : 'OAS_GAME_INFRO_' + GAME_CODE,
	type : true,
	value : <?php echo $CONFIG['jsInfo']?>
});


/**
 * [description] 自动登陆设置
 * @return {[type]} [description]
 */
;(function(){

	var parent = $('#gb-login-down-inti');
	var auto = parent.find('input[data-name=automatic]');
	var remember = parent.find('input[data-name=remember]');

	//设置自动登录
	auto.click(function() {
		//选中
		if($(this).is(':checked')){
			remember.attr('checked','checked');
		}
	});

	//记住密码操作
	remember.click(function(){
		//未选中记住密码
		if(!$(this).is(':checked')){
			auto.removeAttr('checked');
		}	
	});

	if(GAME_CODE=="loel"){
		$('.lopl-login-forget').css('right','-80px');
	}else if(GAME_CODE=="lode"){
		$('.lopl-login-forget').css('right','-40px');
	}
})();

var strTarget = 101;


</script>
</body>
</html>

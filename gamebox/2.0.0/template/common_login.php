<?php include_once('../config.php');?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<link href="<?php echo $CONFIG['dir']?>static/css/oas.global.css?ver=<?php echo $CONFIG['version']?>" rel="stylesheet" type="text/css" />
<script src="<?php echo $CONFIG['dir']?>static/package/jquery.min.js?ver=<?php echo $CONFIG['version']?>" type="text/javascript"></script>
<script src="<?php echo $CONFIG['dir']?>static/package/oas.lang.js?ver=<?php echo $CONFIG['version']?>" type="text/javascript"></script>
</head>
<body scroll="no" style=" background: #e4e4e4;">


<div class="gb-outside-box">
	<!--弹出登陆窗口-->
	<div class="gb-dialog-login-box" id="gb-dialog-login-box">
		<div class="gb-dialog-login-t">
			<div class="gb-dialog-login-t-in">
				<a class="cur" href="Javascript: void(0)"><i class="gb-i gb-dialog-oas"></i><span><script type="text/javascript">OASWriteContent('Gamebox_AccountOasgames');</script></span></a>
				<a data-facebook="true" href="Javascript: void(0)" onclick="OAS_GAMES_JS.facebook.login({'fail':'Fail to connect with facebook'},GSY.gamebox.FBloginCallback);"><i class="gb-i gb-dialog-facebook"></i><span><script type="text/javascript">OASWriteContent('Gamebox_AccountFacebook');</script></span></a>
				<a data-google="true" href="Javascript: void(0)" onclick="OAS_GAMES_JS.google.login({'fail':'Fail to connect with google'},GSY.gamebox.GOOGLEloginCallback);"><i class="gb-i gb-dialog-google"></i><span><script type="text/javascript">OASWriteContent('Gamebox_AccountGoogle');</script></span></a>		
			</div>
		</div>
		<div class="gb-dialog-login-t-c">
			<div class="gb-dialog-login-t-box" data-selecter="parent" data-type="oas">
				<table></table>

				<ul>
					<li><em class="oas-login-box-em"><script type="text/javascript">OASWriteContent('Gamebox_Account')</script> : </em><input type="text" data-name="username" /></li>
					<li><em class="oas-login-box-em"><script type="text/javascript">OASWriteContent('Gamebox_Password')</script> : </em><input type="password" data-name="password" /></li>
					<li style="padding-left:85px;"><a href="javascript:void(0);" onclick="GSY.gamebox.login($(this));return false;" class="gb-btn-green"><span><em><script type="text/javascript">OASWriteContent('Gamebox_Login');</script></em></span></a></li>
					<li style="padding-left:85px;" class="gb-dialog-login-t-a">
						<script type="text/javascript">OASWriteContent('Gamebox_Register');</script>
						<em>|</em>
						<script type="text/javascript">OASWriteContent('Gamebox_Forgot_password');</script>
					</li>
				</ul>
			</div>
		</div>
	</div>
	<!--弹出登陆窗口结束-->
</div>
<script type="text/javascript" src="<?php echo $CONFIG['dir']?>static/package/oas.common.js?ver=<?php echo $CONFIG['version']?>"></script>
<script type="text/javascript" src="<?php echo $CONFIG['dir']?>static/scripts/oas.gamebox.js?ver=<?php echo $CONFIG['version']?>"></script>
<script type="text/javascript" src="<?php echo $CONFIG['dir']?>static/package/oas.library.js?ver=<?php echo $CONFIG['version']?>"></script>
<script type="text/javascript" src="<?php echo $CONFIG['dir']?>static/scripts/oas.commonlogin.js?ver=<?php echo $CONFIG['version']?>"></script>
<script type="text/javascript" src="//www.oasgames.com/gamebox/tempfacebook.js?ver=<?php echo $CONFIG['version']?>"></script>


<script type="text/javascript">
/**
 * [description] 设置用户密码对语言操作
 * @return {[type]} [description]
 */
;(function(){
	return;
	var parent = $('#gb-dialog-login-box');
	var uname = parent.find('input[data-name=username]');
	var pwd = parent.find('input[data-name=password]');
	var unameVal = OASGetLangVal('Gamebox_Account');
	var pwdVal = OASGetLangVal('Gamebox_Password');
	uname.val(unameVal);
	pwd.val(pwdVal);

	//绑定初始化信息
	uname.focus(function(){
		GSY.util.fous($(this),unameVal,'#999');
	});

	//绑定初始化信息
	pwd.focus(function(){
		GSY.util.fous($(this),pwdVal,'#999');
	});
})();

</script>	
</body>
</html>

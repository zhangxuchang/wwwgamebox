<?php include_once('../../config.php');?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>游戏盒子</title>
<link href="<?php echo $CONFIG['dir']?>static/css/oas.global.css?ver=<?php echo $CONFIG['version']?>" rel="stylesheet" type="text/css" />
<script src="<?php echo $CONFIG['dir']?>static/package/jquery.min.js?ver=<?php echo $CONFIG['version']?>" type="text/javascript"></script>
<script src="<?php echo $CONFIG['dir']?>static/package/oas.lang.js?ver=<?php echo $CONFIG['version']?>" type="text/javascript"></script>
<script type="text/javascript">
var jsConfig = <?php echo $jsConfig?>;
</script>
<script type="text/javascript">
var pageType = "login_dialog";
</script>
</head>
<body scroll="no" style=" background: #e4e4e4;">
<div class="gb-outside-box">
	<!--多账号窗口-->
	<div class="gb-accountslist-box">
		<div class="gb-accountslist-box-in">
			<!--list-->
			<div class="gb-accountslist-list-box" id="gb-js-accountslist-list-box">
				
				<!--<div class="gb-accountslist-list" data-post="{dataPost}"><div data-selecter="delete" onclick="GSY.gamebox.delUserList($(this));" class="gb-accountslist-delete"><a href="javascript:void(0);" class="gb-i gb-delete"></a></div>	<div class="gb-accountslist-list-t">		<span data-selecter="noconfirm" class="gb-accountslist-check"><i class="gb-i gb-disabled"></i></span>		<span class="gb-accountslist-name"><em>{gameDesc}</em><input style="display:none" name="" value=""></span>		<span data-selecter="edit" data-status="false" onclick="GSY.gamebox.changeDiscrition($(this));" class="gb-accountslist-edit"><i class="gb-i gb-edit"></i></span>	</div>	<ul class="gb-accountslist-list-c">		<li>{gameType}</li>		<li>{gameContent}</li>		<li>{gameLastServer}</li>	</ul></div>
				<div class="gb-accountslist-list" data-post="{dataPost}"><div data-selecter="delete" onclick="GSY.gamebox.delUserList($(this));" class="gb-accountslist-delete"><a href="javascript:void(0);" class="gb-i gb-delete"></a></div>	<div class="gb-accountslist-list-t">		<span data-selecter="noconfirm" class="gb-accountslist-check"><i class="gb-i gb-noconfirm"></i></span>		<span class="gb-accountslist-name"><em></em><input style="display:none" name="" value=""></span>		<span data-selecter="edit" data-status="false" onclick="GSY.gamebox.changeDiscrition($(this));" class="gb-accountslist-edit"><i class="gb-i gb-edit"></i></span>	</div>	<ul class="gb-accountslist-list-c">		<li>{gameType}</li>		<li>{gameContent}</li>		<li>{gameLastServer}</li>	</ul></div>
				<div class="gb-accountslist-list" data-post="{dataPost}"><div data-selecter="delete" onclick="GSY.gamebox.delUserList($(this));" class="gb-accountslist-delete"><a href="javascript:void(0);" class="gb-i gb-delete"></a></div>	<div class="gb-accountslist-list-t">		<span data-selecter="noconfirm" class="gb-accountslist-check"><i class="gb-i gb-noconfirm"></i></span>		<span class="gb-accountslist-name"><em>{gameDesc}</em><input style="display:none" name="" value=""></span>		<span data-selecter="edit" data-status="false" onclick="GSY.gamebox.changeDiscrition($(this));" class="gb-accountslist-edit"><i class="gb-i gb-edit"></i></span>	</div>	<ul class="gb-accountslist-list-c">		<li>{gameType}</li>		<li>{gameContent}</li>		<li>{gameLastServer}</li>	</ul></div>
				<div class="gb-accountslist-list" data-post="{dataPost}"><div data-selecter="delete" onclick="GSY.gamebox.delUserList($(this));" class="gb-accountslist-delete"><a href="javascript:void(0);" class="gb-i gb-delete"></a></div>	<div class="gb-accountslist-list-t"><span data-selecter="noconfirm" class="gb-accountslist-check"><i class="gb-i gb-noconfirm"></i></span><span class="gb-accountslist-name"><em style="display:none" >主账号</em><input name="" value=""></span><span data-selecter="edit" data-status="false" onclick="GSY.gamebox.changeDiscrition($(this));" class="gb-accountslist-edit"><i class="gb-i gb-edit"></i></span>	</div><ul class="gb-accountslist-list-c"><li>oas</li><li>gaoshiyong@oasgames</li><li>istunt 2 game</li></ul></div>
				-->
				
				<!--添加小号-->
				<div class="gb-accountslist-listno" id="gb-accountslist-listno-add">
					<a href="javascript:void(0);" onclick="GSY.gamebox.addUserList()"></a>
				</div>	
				<!--添加小号 结束-->				
			</div>
			<!--list end-->
			<div class="gb-accountslist-list-btn">
				<a href="javascript:void(0);" class="gb-accountslist-list-confirm" onclick="GSY.gamebox.accountSelect($(this)); return false;">
					<span class="gb-accountslist-check"><i class="gb-i gb-confirm" style="margin-top:0px;"></i><em><script type="text/javascript">OASWriteContent('Gamebox_SelectAccount')</script></em></span>
				</a>
				<a href="javascript:void(0);" onclick="GSY.gamebox.oneClickGoPlayGame($(this)); return false;" class="gb-btn-green"><span><em><script type="text/javascript">OASWriteContent('Gamebox_morePlayGame')</script></em></span></a>
			</div>
		</div>
	</div>
	<!--多账号窗口结束-->
</div>      
<script type="text/javascript" src="<?php echo $CONFIG['dir']?>static/package/oas.common.js?ver=<?php echo $CONFIG['version']?>"></script>
<script type="text/javascript" src="<?php echo $CONFIG['dir']?>static/scripts/oas.gamebox.js?ver=<?php echo $CONFIG['version']?>"></script>
<script type="text/javascript" src="<?php echo $CONFIG['dir']?>static/scripts/oas.login.js?ver=<?php echo $CONFIG['version']?>"></script>
</body>
</html>

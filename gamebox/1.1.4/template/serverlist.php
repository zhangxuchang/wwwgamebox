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
</head>

<body scroll="no">
<div class="gb-serverlist-box" id="gb-js-serverlist-box">
	<div class="gb-serverlist-wrap">
		<!--推荐服务器-->
		<div class="gb-serverlist-recommend">
			<div class="gb-serverlist-t"><script type="text/javascript">OASWriteContent('Gamebox_Recommend_Server')</script></div>
			<div class="gb-serverlist-recommend-btn" id="gb-js-serverlist-recommand"></div>
		</div>
		<!--推荐服务器 结束-->
		<!--最近玩过的服务器-->
		<div class="gb-serverlist-lastServer">
			<div class="gb-serverlist-t"><script type="text/javascript">OASWriteContent('Gamebox_PlayedArea')</script></div>
			<div class="gb-serverlist-lastServer-c" id="gb-js-serverlist-lastServer"></div>
		</div>
		<!--最近玩过的服务器 结束-->
		<!--搜索-->
		<div class="gb-serverlist-search" onclick="$(this).find('input').focus();">
			<span><script type="text/javascript">OASWriteContent('Gamebox_SearchArea')</script></span>
			<input id="gb-serverlist-search-input" type="text" value="">
			<a href="javascript:void(0);" onclick="GSY.gamebox.search($(this).siblings('input')); return false;"></a>
		</div>
		<!--搜索 结束-->
		<!--服务器列表-->
		<div class="gb-serverlist-box-c" id="gb-js-serverlist-box-c"></div>
		<!--服务器列表 结束-->	
	</div>
</div>  
<script type="text/javascript" src="<?php echo $CONFIG['dir']?>static/package/oas.common.js?ver=<?php echo $CONFIG['version']?>"></script>
<script type="text/javascript" src="<?php echo $CONFIG['dir']?>static/scripts/oas.gamebox.js?ver=<?php echo $CONFIG['version']?>"></script>
<script type="text/javascript" src="<?php echo $CONFIG['dir']?>static/scripts/oas.serverlist.js?ver=<?php echo $CONFIG['version']?>"></script>
</body>
</html>

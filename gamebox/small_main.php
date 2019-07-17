<?php include_once('config.php');?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>player</title>
<script src="<?php echo $CONFIG['dir']?>static/package/jquery.min.js?ver=<?php echo $CONFIG['version']?>" type="text/javascript"></script>
<script src="<?php echo $CONFIG['dir']?>static/package/oas.lang.js?ver=<?php echo $CONFIG['version']?>" type="text/javascript"></script>
</head>
<body scroll="no">
<script type="text/javascript" src="<?php echo $CONFIG['dir']?>static/package/oas.common.js?ver=<?php echo $CONFIG['version']?>"></script>
<script type="text/javascript" src="<?php echo $CONFIG['dir']?>static/scripts/oas.gamebox.js?ver=<?php echo $CONFIG['version']?>"></script>
<script type="text/javascript">
;(function(){
	var host = 'http://www.11oyun.com';
	var file = "/<?php echo $CONFIG['file']?>/gamebox.html?";
	var param = "lg=<?php echo $_GET['lg']?>&gameid=mingametr&version=<?php echo $_GET['version']?>";
	var time = GSY.util.getUrlParam('time') ? parseInt(GSY.util.getUrlParam('time')) : 10;
	setTimeout(function(){
		window.location.href = host + file + param;
	},time);

})();
</script>
</body>
</html>

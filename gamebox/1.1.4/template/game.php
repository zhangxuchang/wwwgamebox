<?php include_once('../../config.php');?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link href="<?php echo $CONFIG['dir']?>static/css/oas.global.css?ver=<?php echo $CONFIG['version']?>" rel="stylesheet" type="text/css" />
<script src="<?php echo $CONFIG['dir']?>static/package/jquery.min.js?ver=<?php echo $CONFIG['version']?>" type="text/javascript"></script>
<script src="<?php echo $CONFIG['dir']?>static/package/oas.lang.js?ver=<?php echo $CONFIG['version']?>" type="text/javascript"></script>
<script type="text/javascript">
var jsConfig = <?php echo $jsConfig?>;
</script>
</head>
<body scroll="no" style="background:#000;color:#fff;">
<div class="gb-loading"><script type="text/javascript">OASWriteContent('loading');</script><span>...</span></div>
<script type="text/javascript" src="<?php echo $CONFIG['dir']?>/static/package/oas.common.js?ver=<?php echo $CONFIG['version']?>"></script>
<script type="text/javascript" src="<?php echo $CONFIG['dir']?>/static/scripts/oas.gamebox.js?ver=<?php echo $CONFIG['version']?>"></script>
<script type="text/javascript" src="<?php echo $CONFIG['dir']?>/static/scripts/oas.game.js?ver=<?php echo $CONFIG['version']?>"></script>
<script type="text/javascript">
	$(function(){
		var str = '.';
		$(".gb-loading span").html(str)
		var timer = setInterval(function(){			
			$(".gb-loading span").html(str);
			str += '.';
			if(str === '....'){
				str = '';
			}

		},500)
	})
</script>
</body>
</html>

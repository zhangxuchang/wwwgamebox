<?php include_once('config.php');?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>latest</title>
<link type="text/css" rel="stylesheet" href="<?php echo $CONFIG['host']?>gamebox/update/css/reset.css?ver=<?php echo $CONFIG['version']?>" />
<link type="text/css" rel="stylesheet" href="<?php echo $CONFIG['host']?>gamebox/update/css/<?php echo $CONFIG['css']?>.css?ver=<?php echo $CONFIG['version']?>" />
<script src="<?php echo $CONFIG['host']?>gamebox/update/js/jquery.js?ver=<?php echo $CONFIG['version']?>"></script>
<script src="<?php echo $CONFIG['host']?>gamebox/update/js/common.js?ver=<?php echo $CONFIG['version']?>"></script>
</head>

<body onselectstart="return false" oncontextmenu="doNothing()" unselectable="on" ondragstart="return false">
	<div id="wrap">
    	<div class="upgrade">
            <div class="latest">
            	<p mulity-key="mulityKey" mulity-value="Gamebox_Latest"></p>
            </div>
            <div class="btn_button">
            	<a class="close_dialog btn_other latest-btn" mulity-key="mulityKey" mulity-value="Gamebox_Sure"></a>
            </div>
        </div>
    </div>
</body>
</html>

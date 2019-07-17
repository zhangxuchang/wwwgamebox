<?php include_once( '../config.php');?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link href="<?php echo $CONFIG['dir']?>static/css/oas.global.css?ver=<?php echo $CONFIG['version']?>" rel="stylesheet" type="text/css" />
    <script src="<?php echo $CONFIG['dir']?>static/package/jquery.min.js?ver=<?php echo $CONFIG['version']?>" type="text/javascript"></script>
    <script src="<?php echo $CONFIG['dir']?>static/package/oas.lang.js?ver=<?php echo $CONFIG['version']?>" type="text/javascript"></script>
</head>

<body>
	<div id="oas-landing" class="oas-landing"></div>
<script type="text/javascript" src="<?php echo $CONFIG['dir']?>static/package/oas.common.js?ver=<?php echo $CONFIG['version']?>"></script>
<script type="text/javascript" src="<?php echo $CONFIG['dir']?>static/scripts/oas.gamebox.js?ver=<?php echo $CONFIG['version']?>"></script>
<script type="text/javascript" src="<?php echo $CONFIG['dir']?>static/scripts/oas.landing.js?ver=<?php echo $CONFIG['version']?>"></script>    
</body>

</html>

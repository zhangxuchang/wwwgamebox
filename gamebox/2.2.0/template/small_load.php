<?php include_once('../config.php');

$gameCode    = $_REQUEST['gameid'];
$specialGameCode = $CONFIG['specicalGameCodes'];

if(in_array($gameCode, $specialGameCode, true)) {
    $host = rtrim($CONFIG['host'],"/");
    $redirectUrl = $host . $_SERVER['REQUEST_URI'];
    if($_SERVER['HTTP_HOST'] !== 'gamebox3.creaction-network.com') {
        header('Location:' . $redirectUrl);
    }
}

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<?php if($lg == 'ar') { ;?>
<link href="<?php echo $CONFIG['dir']?>static/css/oas.global.ar.css?ver=<?php echo $CONFIG['version']?>" rel="stylesheet" type="text/css" />
<?php }else{ ;?>
<link href="<?php echo $CONFIG['dir']?>static/css/oas.global.css?ver=<?php echo $CONFIG['version']?>" rel="stylesheet" type="text/css" />
<?php }; ?>
<script src="<?php echo $CONFIG['dir']?>static/package/jquery.min.js?ver=<?php echo $CONFIG['version']?>" type="text/javascript"></script>
<script src="<?php echo $CONFIG['dir']?>static/package/oas.lang.js?ver=<?php echo $CONFIG['version']?>" type="text/javascript"></script>
</head>
<body scroll="no">
<div class="gb-smallload"></div>
<div id="gb-smallload-load" style=" visibility: hidden;"></div>
<script type="text/javascript" src="<?php echo $CONFIG['dir']?>static/package/oas.common.js?ver=<?php echo $CONFIG['version']?>"></script>
<script type="text/javascript" src="<?php echo $CONFIG['dir']?>static/scripts/oas.gamebox.js?ver=<?php echo $CONFIG['version']?>"></script>
<script type="text/javascript" src="<?php echo $CONFIG['dir']?>static/scripts/oas.smallload.js?ver=<?php echo $CONFIG['version']?>"></script>
</body>
</html>

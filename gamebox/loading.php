<?php include_once('configReg.php');?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>player - loading</title>
<?php if($lg == 'ar') { ;?>
<link href="<?php echo $CONFIG['dir']?>static/css/oas.global.ar.css?ver=<?php echo $CONFIG['version']?>" rel="stylesheet" type="text/css" />
<?php }else{ ;?>
<link href="<?php echo $CONFIG['dir']?>static/css/oas.global.css?ver=<?php echo $CONFIG['version']?>" rel="stylesheet" type="text/css" />
<?php }; ?>
<script src="<?php echo $CONFIG['dir']?>static/package/jquery.min.js?ver=<?php echo $CONFIG['version']?>" type="text/javascript"></script>
<script src="<?php echo $CONFIG['dir']?>static/package/oas.lang.js?ver=<?php echo $CONFIG['version']?>" type="text/javascript"></script>
</head>
<body scroll="no">
<div class="gb-loading"><script type="text/javascript">OASWriteContent('loading');</script><span>...</span></div>
<script type="text/javascript" src="<?php echo $CONFIG['dir']?>static/package/oas.common.js?ver=<?php echo $CONFIG['version']?>"></script>
<script type="text/javascript" src="<?php echo $CONFIG['dir']?>static/scripts/oas.gamebox.js?ver=<?php echo $CONFIG['version']?>"></script>
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
	},500);
	var createTryUser = function(callback){
		GSY.util.ajax({
			url:'https://passport.oasgames.com/?m=tryPlay',
			data:{ref:'oasplayer',uc_key:'5396ff4d756b2dd95e80c05caa6f64ac'},
	        success : function(ret){
	            if(ret.status == 'ok'){          	
	            	callback(ret);
	            }
	        },
	        timeout:60000,
	        error : function(ret){}
		})
	};	
	var games = <?php echo $CONFIG['jsInfo']?>;
	createTryUser(function(ret){
		if(games.rec_url){
			window.location.href = games.rec_url;
		}
	});	
});

</script>
</body>
</html>

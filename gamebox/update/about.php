<?php include_once('config.php');?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>about</title>
<link type="text/css" rel="stylesheet" href="<?php echo $CONFIG['host']?>gamebox/update/css/reset.css?ver=<?php echo $CONFIG['version']?>" />
<link type="text/css" rel="stylesheet" href="<?php echo $CONFIG['host']?>gamebox/update/css/<?php echo $CONFIG['css']?>.css?ver=<?php echo $CONFIG['version']?>" />
<script src="<?php echo $CONFIG['host']?>gamebox/update/js/jquery.js?ver=<?php echo $CONFIG['version']?>"></script>
<script src="<?php echo $CONFIG['host']?>gamebox/update/js/common.js?ver=<?php echo $CONFIG['version']?>"></script>
</head>

<body onselectstart="return false" oncontextmenu="doNothing()" unselectable="on" ondragstart="return false">
	<div id="wrap">
    	<div class="about">
			<div class="about_ico"></div>
			<div class="about_txt"></div>
			<a class="close_dialog about_btn" mulity-key="mulityKey" mulity-value="Gamebox_Sure"></a>
        </div>
    </div>
    <script type="text/javascript">
    $(function(){
    	$(window).on('load',function(){
            this.external.WINIE_AboutMsgIni('getVersionsInfo');
            //getVersionsInfo('{"gameversion":"1.1.3.1141","copyright":"Copyright 2014-2015 Oasgames,Inc","weburl":"http://lode.oasgames.com","image":"oasGames"}')
        });
    });
    var getVersionsInfo = function(data){
    	var str = '',
    		img = '',
            host = "<?php echo $CONFIG['host']?>gamebox/update/images/",
            ver = "<?php echo $CONFIG['version']?>",
    		data = $.parseJSON(data);
    	for(var key in data){
    		if(key == 'image'){
    			img = '<img src="'+ host + data[key].toLowerCase()+'.png?ver='+ ver + '" alt="'+data[key]+'" />';
    		}else if(key == 'weburl'){
    			str += '<a href="'+data[key]+'" target="_blank" onclick="openNewWnd()">'+data[key]+'</a>'
    		}else{
    			str += data[key] + '<br>';
    		}    		
    	}
    	$('.about_txt').html(str);
    	$('.about_ico').html(img);
    };
    function openNewWnd(){
        window.external.WINIE_DialogClose();
    }
    </script>
</body>
</html>

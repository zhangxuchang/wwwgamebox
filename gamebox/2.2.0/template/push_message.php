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
<body>
	<!--<div class="push_wrap">
		<a class="gb-btn-close" href="javascript:void(0)" onclick="GSY.gamebox.closeWin()"></a>
		<img src="../static/images/push-bg.png" onclick="GSY.gamebox.openWin()">
		<p onclick="GSY.gamebox.openWin()">土语神曲连续三日登陆可领取神秘大礼包！土语神曲连续三日登陆可领取神秘大礼包！</p>
	</div>
	<div class="push_wrap push-gift" id="gift">
		<a class="push-gift-icon"></a>
		<p class="push-gift-tip">土语神曲连续三日登陆可领取神秘大礼包！</p>
		<a href="javascrip:void(0)" class="gb-btn-green">
			<span>
				<em>去看看</em>
			</span>
		</a>
	</div>
	<div id="system" class="push-wrap push-system">
		<a href="javascript:void(0)"></a>
		<p>土语神曲服务器维护中...</p>
	</div>-->
</body>
<script type="text/javascript" src="<?php echo $CONFIG['dir']?>static/package/oas.common.js?ver=<?php echo $CONFIG['version']?>"></script>
<script type="text/javascript" src="<?php echo $CONFIG['dir']?>static/scripts/oas.gamebox.js?ver=<?php echo $CONFIG['version']?>"></script>

<script type="text/javascript">
	$(function(){
		GSY.gamebox.cAjaxCallback('WINIE_GetPushMessageSet',{callback:GSY.gamebox.pushMessage},'初始化推送消息窗口');
		//GSY.gamebox.pushMessage({'type':'txt','picture':'','txt':'土语神曲连续三日登陆可领取神秘大礼包！土语神曲连续三日登陆可领取神秘大礼包！'})
	})
	GSY.gamebox.pushMessage = function(ret){
		var html = '';
		html += '<div class="push_wrap">';
		if(ret.type=='pic'){
			html += '	<a class="gb-btn-close" href="javascript:void(0)" onclick="GSY.gamebox.closeWin()"></a>';
		}
		if(ret.picture&&ret.picture.length>0){
			var timestamp = new Date().getTime();
			html += '	<img src="'+ret.picture+'?time='+timestamp+'" onclick="GSY.gamebox.openWin()">';
		}
		if(ret.txt&&ret.txt.length>0){
			html += '	<p onclick="GSY.gamebox.openWin()">'+ret.txt+'</p>';
		}
		html += '</div>';		
		$('body').html(html);

		//自动设置文字上下居中显示
		$('.push_wrap p').css('margin-top','-'+$('.push_wrap p').height()/2+'px');
		//判断有无链接地址，控制鼠标形状
		if(ret.mouse=='arrow'){
			$('.push_wrap').css('cursor','default');
		}else{//hand
			$('.push_wrap').css('cursor','pointer');
		}
		//console.log($('.push_wrap p').height())
	}
	GSY.gamebox.closeWin = function(){
		//GSY.gamebox.message('close')
		GSY.gamebox.cAjaxCallback('WINIE_CLOSEDLG',{},'关闭推送消息窗口');
	}
	GSY.gamebox.openWin = function(){
		//GSY.gamebox.message('open')
		GSY.gamebox.cAjaxCallback('WINIE_PushMsg_Click',{},'打开窗口');
	}
</script>
</body>
</html>

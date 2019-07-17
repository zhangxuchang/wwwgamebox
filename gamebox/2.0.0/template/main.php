<?php include_once('../config.php');?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>player</title>
<link href="<?php echo $CONFIG['dir']?>static/css/oas.global.css?ver=<?php echo $CONFIG['version']?>" rel="stylesheet" type="text/css" />
<script src="<?php echo $CONFIG['dir']?>static/package/jquery.min.js?ver=<?php echo $CONFIG['version']?>" type="text/javascript"></script>
<script src="<?php echo $CONFIG['dir']?>static/package/oas.lang.js?ver=<?php echo $CONFIG['version']?>" type="text/javascript"></script>
</head>
<body scroll="no">
<div class="gb-outside-box" style=" background-color: #fff; height:100%; overflow:hidden">
	<!--游戏主界面-->
	<div class="gb-game-box" style=" height:100%; overflow:hidden">
		<!--left-->
		<div class="gb-game-box-l" id="gb-js-game-l-box">
			<!--用户信息-->
			<div class="gb-gamebox-userinfo">
				<em></em>
				<span class="gb-gamebox-userinfo-name" id="gb-gamebox-userinfo-name"></span>
				<div class="gb-gamebox-userinfo-btn">
					<span><a href="javascript:void(0);" data-selecter="changer" onclick="GSY.gamebox.playGame($(this));return false;"><script type="text/javascript">OASWriteContent('Gamebox_Login');</script></a></span>
					<span><script type="text/javascript">OASWriteContent('Gamebox_Register');</script></span>
				</div>
					
			</div>
			<!--用户信息 结束-->
			<!--游戏搜索-->
			<div class="gb-game-box-search" style="display:none;"><input type="text" /><a href=""></a></div>
			<!--游戏搜索 结束-->
			<!--主号玩过的游戏-->
			<div class="gb-game-box-recentgame">
				<!--title-->
				<div class="gb-gamebox-history-t">
					<div class="gb-gamebox-history-t-wrap">
						<i class="gb-i gb-recentuser"></i>
						<span><script type="text/javascript">OASWriteContent('Gamebox_userPlayGameHistory')</script></span>
					</div>
				</div>
				<!--title-->
				<!--content-->
				<div class="gb-gamebox-history-c" id="gb-gamebox-history-content"></div>
				<!--content end-->
			</div>
			<!--主号玩过的游戏-->
			<!--右侧推荐游戏-->
			<div class="gb-left-recommengame">
				<!--title-->
				<div class="gb-left-recommengame-t">
					<div onload="GSYLoadImg(this,120,120)" class="gb-left-recommengame-t-wrap">
						<i class="gb-i gb-recommengame"></i>
						<span><script type="text/javascript">OASWriteContent('Gamebox_Recommend_GameServer')</script></span>
					</div>
				</div>
				<!--title-->
				<!--content-->
				<div class="gb-left-recommengame-c" id="gb-left-recommengame-content">
					<!--list
					<div class="gb-left-recommengame-list">
						<div class="gb-left-recommengame-small" style="display:none;">
							<div class="gb-left-recommengame-l"><img src="../static/images/gb-game-box-gamenamesmall.png" alt="" /></div>
							<div class="gb-left-recommengame-r">
								<h1>Knight Saga</h1>
								<p>S14: Usta Ejderha</p>
							</div>
						</div>
						<div class="gb-left-recommengame-big">
							<img src="../static/images/gb-game-box-gamepic.png" alt="" />
							<span>
								<em class="gb-strong">烈火屠龙</em>
								<em class="gb-button">开始游戏</em>								
							</span>
						</div>	
					</div>
					list end-->
				</div>
				<!--content-->
			</div>
		</div>
		<!--left end-->
		<!--right-->
		<div class="gb-game-box-r" id="gb-js-game-r-box">
			<div class="gb-game-main-body">
				<!--推荐图-->
				<div class="gb-game-box-r-pic">
					<div class="gb-game-box-r-pic-box" id="gb-game-recommend-pic">
						<!--list
						<div class="gb-game-recommend-list">
							<div class="gb-game-recommend-list-img"><img src="//www.oasgames.com/gamebox/static/games/letr/ads.jpg?oas_ver=2014101701" align=""></div>
							<div class="gb-game-recommend-list-text" style="bottom:0px;">
								<div class="gb-game-recommend-list-desc">Uzak Doğu Efsanesi Hikayesiyle Ve İle Sizlere Müthiş Keyif Yaşatacaktır.</div>
								<div class="gb-game-recommend-list-btn"><a href="javascript:void(0)" class="gb-btn-green"><span><em>{playGame}</em></span></a></div>
							</div>
						</div>	
						list end-->
					</div>
				</div>
				<!--推荐图 结束-->	
				<!--games list-->
				<div class="gb-game-list-box">
					<!--title-->
					<div class="gb-game-list-t">
						<div class="gb-game-list-name">
							<i class="gb-i gb-cup"></i>
							<span><script type="text/javascript">OASWriteContent('Gamebox_Recommend_Games')</script></span>
						</div>
						<!--
						<div class="gb-game-list-tab" style="display:none;">
							<a href="Javascript: void(0)">全部类型</a>
							<a href="Javascript: void(0)">角色扮演</a>
							<a href="Javascript: void(0)">战争策略</a>
							<a href="Javascript: void(0)">社区养成</a>
							<a href="Javascript: void(0)">休闲竞技</a>
							<a href="Javascript: void(0)">模拟经营</a>
						</div>-->				
					</div>	
					<!--title end-->
					<div class="gb-game-list-c">
						<div class="gb-game-list-c-wrap" id="gb-gamelist-content">
							<!--list
							<div class="gb-games-lists-box" onclick="GSY.gamebox.playGame($(this));return false;" title="Legend Online" data-post="name=Legend Online&gamecode=lotr" >
								<div class="gb-games-lists-cont">
									<div class="gb-games-lists-cont-img"><img alt="Legend Online" src="http://static.oasgames.com/gamebox/static/games/lotr/game.jpg"></div>
									<div class="gb-games-lists-cont-mask" style="top:0; left:0;">
										<div class="gb-games-lists-cont-desc">图层里面有一个隐藏的图层，是橘黄色的。那个是文字的框大小。文字只支持那么多</div>
										<div class="gb-games-lists-cont-btn"><a href="" class="gb-btn-green"><span><em>开始游戏</em></span></a></div>
									</div>
								</div>
								<div class="gb-games-lists-other">
									<em class="gb-game-list-c-name">Legend Online</em>
									<em class="gb-game-list-c-type">Aksiyon Rol Yapma</em>
								</div>
							</div>
							list end-->
						</div>
					</div>
				</div>
				<!--games list end-->
				<!--小游戏列表-->
				<div class="gb-mingame-list">
					<!--title-->
					<div class="gb-mingame-list-t">
						<div class="gb-mingame-list-name">
							<i class="gb-i gb-mingame"></i>
							<span><script type="text/javascript">OASWriteContent('Gamebox_mingame')</script></span>
						</div>
						<div class="gb-block-more" onclick="GSY.gamebox.openMiniGamesCenter('ButtonMoreClickTime')"><span><script type="text/javascript">OASWriteContent('Gamebox_more')</script></span><i class="gb-i gb-add"></i></div>
					</div>	
					<!--title end-->
					<!--content-->
					<div class="gb-mingame-list-c">
						<div class="gb-mingame-list-c-wrap" id="gb-mingame-content">
							<!--list
							<div class="gb-games-lists-box" onclick="GSY.gamebox.playGame($(this));return false;" title="Legend Online" data-post="name=Legend Online&gamecode=lotr" >
								<div class="gb-games-lists-cont">
									<div class="gb-games-lists-cont-img"><img alt="Legend Online" src="http://static.oasgames.com/gamebox/static/games/lotr/game.jpg"></div>
									<div class="gb-games-lists-cont-mask" style="top:0; left:0;">
										<div class="gb-games-lists-cont-desc">图层里面有一个隐藏的图层，是橘黄色的。那个是文字的框大小。文字只支持那么多</div>
										<div class="gb-games-lists-cont-btn"><a href="" class="gb-btn-green"><span><em>开始游戏</em></span></a></div>
									</div>
								</div>
								<div class="gb-games-lists-other">
									<em class="gb-game-list-c-name">Legend Online</em>
									<em class="gb-game-list-c-type">Aksiyon Rol Yapma</em>
								</div>
							</div>
							list end-->
						</div>
					</div>
					<!--content end-->
				</div>
				<!--小游戏列表 结束-->
				<!--活动介绍-->
				<div class="gb-gameActive-box">
					<!--title-->
					<div class="gb-gameActive-t">
						<div class="gb-gameActive-name">
							<i></i>
							<span><script type="text/javascript">OASWriteContent('Gamebox_hot_active')</script></span>
						</div>			
					</div>	
					<!--title end-->
					<div class="gb-gameActive-c">
						<div class="gb-gameActive-c-wrap" id="gb-js-gameActive-box"></div>
					</div>
				</div>
				<!--活动介绍 结束-->
			</div>
		</div>
		<!--right end-->
		<div class="clear"></div>
	</div>
	<!--游戏主界面结束-->
</div>       
<script type="text/javascript" src="<?php echo $CONFIG['dir']?>static/package/oas.common.js?ver=<?php echo $CONFIG['version']?>"></script>
<script type="text/javascript" src="<?php echo $CONFIG['dir']?>static/scripts/oas.gamebox.js?ver=<?php echo $CONFIG['version']?>"></script>
<script type="text/javascript" src="<?php echo $CONFIG['dir']?>static/scripts/oas.main.js?ver=<?php echo $CONFIG['version']?>"></script>
<script type="text/javascript">

//设置滚动左右滚动条
GSY.gamebox.fullScroll = function(){
	var left = $('#gb-js-game-l-box');
	var right = $('#gb-js-game-r-box');
	var win = GSY.util.getEleInfo($(window));
	left.css('height',win.h);
	right.css('height',win.h);
};
GSY.gamebox.fullScroll();
GSY.config.resizeCode['oasMainFullScroll'] = GSY.gamebox.fullScroll;

</script>
</body>
</html>

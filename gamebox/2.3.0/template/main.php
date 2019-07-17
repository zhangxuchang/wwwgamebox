<?php include_once('../config.php');?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>player</title>
<link href="<?php echo $CONFIG['dir']?>static/css/oas.global.css?ver=<?php echo $CONFIG['version']?>" rel="stylesheet" type="text/css" />
<script src="<?php echo $CONFIG['dir']?>static/package/jquery.min.js?ver=<?php echo $CONFIG['version']?>" type="text/javascript"></script>
<script src="<?php echo $CONFIG['dir']?>static/package/oas.lang.js?ver=<?php echo $CONFIG['version']?>" type="text/javascript"></script>
<script type="text/javascript">
	<?php if($CONFIG['tiyanversionInfo']){ ;?>
		var tiyanversionInfo = <?php echo $CONFIG['tiyanversionInfo']?>;
	<?php } else { ;?>
		var tiyanversionInfo = null;
	<?php };?>	
</script>
</head>
<body scroll="no">
<div class="gb-outside-box" style="background-color: #1a1a1a; height:100%; overflow:hidden;">

	<!--游戏主界面-->
	<div class="gb-game-box" style="display: none;">
		<!--left-->
		<div class="gb-game-box-l cxg-scroll-box" id="gb-js-game-l-box">
			<!--游戏搜索-->
			<div class="gb-game-box-search" style="display:none;"><input type="text" /><a href=""></a></div>
			<!--游戏搜索 结束-->
			<!--主号玩过的游戏-->
			<div class="gb-game-box-recentgame">
				<!--title-->
				<div class="gb-gamebox-history-t">
					<div class="gb-gamebox-history-t-wrap">
						<i class="gb-i-v2 gb-recentuser"></i>
						<span><script type="text/javascript">OASWriteContent('Gamebox_userPlayGameHistory')</script></span>
					</div>
				</div>
				<!--title-->
				<!--content-->
				<div class="gb-gamebox-history-c" id="gb-gamebox-history-content">
					<!-- <div class="gb-gamebox-history-list">
						<div class="gb-gamebox-history-box">
							<a href="javascript:void(0);" title="aaa" onclick="GSY.gamebox.fromGameHistoryPlayGame($(this));return false;" data-post="{post}">
								<img src="{url}" alt="{gameName}" />
								<span>
									<em>对方的风格</em>
									<em class="gb-gamebox-history-fullname">大富大贵</em>
								</span>
							</a>
							<i class="gb-gamebox-history-btn" onclick="GSY.gamebox.delHistoryList($(this),event);"></i>
						</div>
					</div>
					<div class="gb-gamebox-history-list">
						<div class="gb-gamebox-history-box">
							<a href="javascript:void(0);" title="aaa" onclick="GSY.gamebox.fromGameHistoryPlayGame($(this));return false;" data-post="{post}">
								<img src="{url}" alt="{gameName}" />
								<span>
									<em>对方的风格</em>
									<em class="gb-gamebox-history-fullname">大富大贵</em>
								</span>
							</a>
							<i class="gb-gamebox-history-btn" onclick="GSY.gamebox.delHistoryList($(this),event);"></i>
						</div>
					</div>
					<div class="gb-gamebox-history-list">
						<div class="gb-gamebox-history-box">
							<a href="javascript:void(0);" title="aaa" onclick="GSY.gamebox.fromGameHistoryPlayGame($(this));return false;" data-post="{post}">
								<img src="{url}" alt="{gameName}" />
								<span>
									<em>对方的风格</em>
									<em class="gb-gamebox-history-fullname">大富大贵</em>
								</span>
							</a>
							<i class="gb-gamebox-history-btn" onclick="GSY.gamebox.delHistoryList($(this),event);"></i>
						</div>
					</div> -->
				</div>
				<!--content end-->
			</div>
			<!--主号玩过的游戏-->
			<!--右侧推荐游戏-->
			<div class="gb-left-recommengame">
				<!--title-->
				<div class="gb-left-recommengame-t">
					<div onload="GSYLoadImg(this,120,120)" class="gb-left-recommengame-t-wrap">
						<i class="gb-i-v2 gb-recommengame"></i>
						<span><script type="text/javascript">OASWriteContent('Gamebox_Recommend_GameServer')</script></span>
					</div>
				</div>
				<!--title-->
				<!--content-->
				<div class="gb-left-recommengame-c" id="gb-left-recommengame-content">
					<!-- list -->
					<!-- <div class="gb-left-recommengame-list">
						<div class="gb-left-recommengame-small">
							<div class="gb-left-recommengame-l"><img src="http://admgbox.oasgames.com/cmn/static/images/recommend/small/1417496307.jpg" alt="Legend Online (OAS189:Uçan Ejder)"></div>
							<div class="gb-left-recommengame-r">
								<h1><span class="gb-left-recommengame-title">Knight Saga</span><span class="gb-left-recommengame-date">11/19</span></h1>
								<p>S14: Usta Ejderha</p>
							</div>
						</div>
						<div class="gb-left-recommengame-big">
							<i class="gb-left-recommengame-big-tips"></i>
							<img src="../static/images/gb-game-box-gamepic_v2.png" alt="" />
							<span>
								<em class="gb-strong">烈火屠龙</em>
								<em class="gb-button">开始游戏</em>								
							</span>
						</div>	
					</div> -->
					<!-- list end -->
				</div>
				<!--content-->
			</div>
		</div>
		<!--left end-->
		<!--right-->
		<div class="gb-game-box-r cxg-scroll-box" id="gb-js-game-r-box">
			<div class="gb-game-main-body">
				<div class="gb-main-advert-top">
					<!--轮播图-->
					<div class="gb-right-slide-wrap">
						<div class="gb-right-slide-pic" id="gb-game-slide-pic"></div>
					</div>
					<!--轮播图 结束-->
					<!--最新活动-->
					<div class="gb-new-active-wrap">
						<div class="gb-new-active-div">
							<div class="gb-new-active-title-wrap">
								<span class="gb-new-active-title"><script type="text/javascript">OASWriteContent('Gamebox_latest_news')</script></span>
								<!-- <a href="#" class="gb-new-active-more-btn"><script type="text/javascript">OASWriteContent('Gamebox_more')</script>&ensp;>></a> -->
							</div>
							<div class="gb-new-active-content-wrap" id="gb-game-newslist">
								<!-- <a href="#">《三国战纪》儿时街机首服震撼开启！</a> -->
							</div>
						</div>
					</div>
					<!--最新活动结束-->	
					</div>
				<!--games list-->
				<div class="gb-game-list-box">
					<!--title-->
					<div class="gb-game-list-t">
						<div class="gb-game-list-name">
							<i class="gb-i-v2 gb-cup"></i>
							<span><script type="text/javascript">OASWriteContent('Gamebox_Recommend_Games')</script></span>
						</div>
						<div class="gb-game-slide-btn">
							<a href="Javascript: void(0)" class="gb-game-list-prev-btn on un-active"><span class="prev"></span></a>
							<a href="Javascript: void(0)" class="gb-game-list-next-btn"><span class="next"></span></a>
						</div>		
					</div>	
					<!--title end-->
					<div class="gb-game-list-c">
						<div class="gb-game-list-c-wrap gb-game-slide-list" id="gb-gamelist-content">
							<!-- list -->
							<!-- <div class="gb-games-lists-box" data-selecter="OAS_GAME_LIST_lotr" onclick="GSY.gamebox.playGame($(this),2);return false;" data-post="name=Legend Online&amp;gamecode=lotr">	
								<div class="gb-games-lists-cont">		
									<div class="gb-games-lists-cont-img">
										<img alt="Legend Online" src="//www.oasgames.com/gamebox/2.1.0/static/images/gb-recom-list-pic.png?oas_ver=1432546122234">
										<div class="gb-games-lists-other">		
											<em class="gb-game-list-c-name">Legend Online</em>		
											<em class="gb-game-list-c-type">undefined</em>	
										</div>
									</div>		
									<div class="gb-games-lists-cont-mask" >			
										<div class="gb-games-lists-cont-desc">Legend Online RPG formatında Türkiye’nin en popüler online oyunudur.</div>			
										<div class="gb-games-lists-cont-btn">
											<a href="javascript:void(0)" class="gb-btn-start-play"><span><em>Oyuna Başla</em></span></a>
											<a href="javascript:void(0)" class="gb-btn-in-website"><span><em>Oyuna Başla</em></span></a>
										</div>		
									</div>	
								</div>	
							</div> -->
							<!-- list end -->
						</div>
					</div>
				</div>
				<!--games list end-->
				<!--推荐手游列表-->
				<div class="gb-handgame-list">
					<!--title-->
					<div class="gb-handgame-list-t">
						<div class="gb-handgame-list-name">
							<i class="gb-i-v2 gb-handgame"></i>
							<span><script type="text/javascript">OASWriteContent('Gamebox_mingame')</script></span>
						</div>					
					</div>	
					<!--title end-->
					<!--content-->
					<div class="gb-handgame-list-c">
						<div class="gb-handgame-list-c-wrap" id="gb-handgame-content">
							<!-- list -->
							<!-- <div class="gb-games-lists-box" onclick="GSY.gamebox.playGame($(this));return false;" title="Legend Online" data-post="name=Legend Online&gamecode=lotr" >
								<div class="gb-games-lists-bg"><div class="gb-games-lists-cont">
									<div class="gb-games-lists-cont-img"><img alt="Legend Online" src="//www.oasgames.com/gamebox/2.1.0/static/images/gb-recom-list-pic.png?oas_ver=1432546122234">
										<div class="gb-games-lists-other">
											<em class="gb-game-list-c-name">Legend Online</em>
											<em class="gb-game-list-c-type">Aksiyon Rol Yapma</em>
										</div>
									</div>
									<div class="gb-games-lists-cont-mask" style="bottom:-1px;">
										<div class="gb-games-lists-cont-code"><img src="//www.oasgames.com/gamebox/2.1.0/static/images/gb-two-code.jpg"> </div>
									</div>
								</div></div>
							</div>
							<div class="gb-games-lists-box" onclick="GSY.gamebox.playGame($(this));return false;" title="Legend Online" data-post="name=Legend Online&gamecode=lotr" >
								<div class="gb-games-lists-bg"><div class="gb-games-lists-cont">
									<div class="gb-games-lists-cont-img"><img alt="Legend Online" src="//www.oasgames.com/gamebox/2.1.0/static/images/gb-recom-list-pic.png?oas_ver=1432546122234">
										<div class="gb-games-lists-other">
											<em class="gb-game-list-c-name">Legend Online</em>
											<em class="gb-game-list-apple-type"></em>
											<em class="gb-game-list-android-type"></em>

										</div>
									</div>
									<div class="gb-games-lists-cont-mask" style="display:none;" >
										<div class="gb-games-lists-cont-code"><img src="//www.oasgames.com/gamebox/2.1.0/static/images/gb-two-code.jpg"> </div>
									</div>
								</div></div>
							</div> -->
							<!-- list end -->
						</div>
					</div>
					<!--content end-->
				</div>
				<!--推荐手游列表 结束-->
				<!--小游戏列表-->
				<div class="gb-mingame-list">
					<!--title-->
					<div class="gb-mingame-list-t">
						<div class="gb-mingame-list-name">
							<i class="gb-i-v2 gb-mingame"></i>
							<span><script type="text/javascript">OASWriteContent('Gamebox_mingame')</script></span>
						</div>
						<div class="gb-block-more" onclick="GSY.gamebox.openMiniGamesCenter('ButtonMoreClickTime')"><span><script type="text/javascript">OASWriteContent('Gamebox_more')</script>&ensp;>></span></div>
					</div>	
					<!--title end-->
					<!--content-->
					<div class="gb-mingame-list-c">
						<div class="gb-mingame-list-c-wrap" id="gb-mingame-content">
							<!-- list -->
							<!-- <div class="gb-games-lists-box" onclick="GSY.gamebox.playGame($(this));return false;" title="Legend Online" data-post="name=Legend Online&gamecode=lotr" >
								<div class="gb-games-lists-cont">
									<div class="gb-games-lists-cont-img"><img alt="Legend Online" src="//www.oasgames.com/gamebox/2.1.0/static/images/gb-recom-list-pic.png?oas_ver=1432546122234">
										<div class="gb-games-lists-other">
											<em class="gb-game-list-c-name">Legend Online</em>
											<em class="gb-game-list-c-type">Aksiyon Rol Yapma</em>
										</div>
									</div>
									<div class="gb-games-lists-cont-mask" >
										<div class="gb-games-lists-cont-desc">图层里面有一个隐藏的图层，是橘黄色的。那个是文字的框大小。文字只支持那么多</div>
										<div class="gb-games-lists-cont-btn">
											<a href="javascript:void(0)" class="gb-btn-start-play"><span><em>Oyuna Başla</em></span></a>
											<a href="javascript:void(0)" class="gb-btn-in-website"><span><em>Oyuna Başla</em></span></a>
										</div>
									</div>
								</div>
							</div> -->
							<!-- list end -->
						</div>
					</div>
					<!--content end-->
				</div>
				<!--小游戏列表 结束-->
				<!--热门活动-->
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
				<!--热门活动-->				
			</div>
		</div>
		<!--right end-->
		<div class="clear"></div>
	</div>
	<!--游戏主界面结束-->
</div>       
<script type="text/javascript" src="<?php echo $CONFIG['dir']?>static/package/oas.common.js?ver=<?php echo $CONFIG['version']?>"></script>
<script type="text/javascript" src="<?php echo $CONFIG['dir']?>static/package/cxg.scroll.js?ver=<?php echo $CONFIG['version']?>"></script>
<script type="text/javascript" src="<?php echo $CONFIG['dir']?>static/scripts/oas.gamebox.js?ver=<?php echo $CONFIG['version']?>"></script>
<script type="text/javascript" src="<?php echo $CONFIG['dir']?>static/package/oas.slider.js?ver=<?php echo $CONFIG['version']?>"></script>
<script type="text/javascript" src="<?php echo $CONFIG['dir']?>static/scripts/oas.main.js?ver=<?php echo $CONFIG['version']?>"></script>
<script type="text/javascript">
CXGResetScroll({
	element : $('#gb-js-game-l-box'),
	scrollWrapWidth : 12,
	scrollWidth : 10
});
var scrollRight = CXGResetScroll({
	element : $('#gb-js-game-r-box'),
	scrollWrapWidth : 16,
	scrollWidth : 14
});
scrollRight.move(0);

</script>
</body>
</html>

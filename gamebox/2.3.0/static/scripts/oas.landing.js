(function($, GSY) {
    var showHtml = function(){
        var gamecode = GSY.config.get('gamecode'),
            lang = GSY.config.get('lang'),
            parent = $('#oas-landing'),
            flash = '',
            cont = '';

        flash += '<div class="oas-landing-flash"><object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="1024" height="768">';
        flash += '<param name="movie" value="../static/flash/' + gamecode + '.swf" />';
        flash += '<param name="quality" value="high" /><param name="wmode" value="transparent">';
        flash += '<embed src="../static/flash/' + gamecode + '.swf" quality="high" pluginspage="//www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" wmode="transparent" width="1024" height="768"></embed>';
        flash += '</object></div>';

        cont += '<div class="oas-landing-cont"><a href="javascript:;" class="oas-landing-btn' + gamecode + '"></a><a href="javascript:;" class="oas-landing-close' + gamecode + '"></a></div>';        
	    parent.html(flash + cont);
	    var play = parent.find('a:first'),
	        close = parent.find('a:last');
	    play.on('click', function() {
            GSY.gamebox.uploadLoginLog({
                'event': 'lpplayclicktime'
            }); 
            GSY.gamebox.cAjax('WINIE_OpenLogin', null, '打开体验版游戏登录器');    
	    });
	    close.on('click', function() {              
            GSY.gamebox.uploadLoginLog({
                'event': 'lpclosetime'
            });
            GSY.gamebox.cAjax('WINIE_ClosePage', null, '关闭体验版游戏登录器');                              
	    });    	
    };
    try {
        var flash = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
        showHtml();
    } catch (e) {
    	GSY.gamebox.cAjax('WINIE_OpenLogin', null, '打开体验版游戏登录器');
    }

})(jQuery, window.GSY);

// JavaScript Document

oasgamesConfig = {
	'lotr' : 'https://apps.facebook.com/legend_tr/',
	'lobr' : 'https://apps.facebook.com/legend_pt/',
	'lopl' : 'https://apps.facebook.com/legend_pt/',
	'loes' : 'https://apps.facebook.com/legend_es/',
	'lonl' : 'https://apps.facebook.com/legend_nl/',
	'losv' : 'https://apps.facebook.com/legend_sv/',
	'lode' : 'https://apps.facebook.com/legend_de/',
	'loel' : 'https://apps.facebook.com/legend_el/',
	'loar' : 'https://apps.facebook.com/legend_ar/',
	'loru' : 'https://apps.facebook.com/demon_slayer_ru',
	'loit' : '',
	'lofr' : '',
	'fbtr' : 'https://apps.facebook.com/firstblood_tr/',
	'irpt' : 'https://apps.facebook.com/island_of_rainbow_pt/',
	'ddtes' : 'https://app.facebook.com/ddtank_oas_es',
}


/**
 * [description]
 * @return {[type]} [description]
 */
;(function(){

	return;
	
	if(window.OAS_GAMES_JS && window.OAS_GAMES_JS.facebook && window.OAS_GAMES_JS.facebook.login){
		window.OAS_GAMES_JS.facebook.login = function(){
			console.log('11');
			return false;
		}	
	}

	//重置链接属性
	$('a[data-facebook=true]').each(function(){
		$(this).attr('target','_blank');
		var url = oasgamesConfig[GSY.config.get('gamecode')];
		$(this).attr('href',url);
	});
})();

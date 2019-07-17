/**
 * 
 * @authors gaoshiyong (gaoshiyong@oasgames.com)
 * @date    2014-08-09 15:01:00
 * @version 1.0
 */

/**
 * [description] 滚动到底部获取分页数据库文件
 * @param  {[type]} $ [description]
 * @return {[type]}   [description]
 */

;(function(){	

	$('body').css('overflow','auto');

	var scrollflag = false,time = null;	 
	var scrollPrevData = 0;

	//合并项
	$.fn.scrollPagination = function(options) {
		var opts = $.extend($.fn.scrollPagination.defaults, options);
		return this.each(function() {
			$.fn.scrollPagination.init($(this), opts);
		});

	};

	//设置不请求状态
	$.fn.stopScrollPagination = function(){
		return this.each(function() {
			$(this).attr('scrollPagination', 'disabled');
		});
	};

	//与后台请求处理函数
	var requestLoad = function(element, opts){
		if($(opts.moreElement).length == 0 || element.length == 0) {
			return;
		}
		
		var retOptions = $.extend({},opts.data,{element:element});
		var pageNum = $(opts.moreElement).attr('data-page');
		
		//当页面数为0 表示没有下一页，请求跳出
		if(pageNum <= 0){
			scrollflag = false;
			return;
		};
		
		
		//当上次请求没有完成请求跳出
		if(scrollflag || (scrollPrevData == pageNum) && !opts.data.againSearch) {
			return;
		}
		scrollflag = true;
		opts.moreElement.css('visibility','visible');
		if (typeof opts.beforeLoad == 'function') opts.beforeLoad(opts);
		
		//请求数据
		var _data = GSY.util.getEleData(opts.moreElement, 'data-post') ? GSY.util.getEleData(opts.moreElement, 'data-post') : {};
		var data = $.extend({},{page_num : pageNum},opts.data, _data);
		scrollPrevData = pageNum;
		
		//发起请求
		var ajaxOptions =  {
			url : opts.url,
			data : data,
			type : opts.type,
			success : function(ret){
				setTimeout(function(){
					if(typeof opts.afterLoad == 'function'){
						 opts.afterLoad(ret,opts);	
					}else{
						if(ret && ret.data && ret.code == 1){
							$(element).append(ret.data.html);
						}	
					}
					$(opts.moreElement).attr('data-page',ret.data.page_num);
					opts.moreElement.css('visibility','hidden');
					setTimeout(function(){
						scrollflag = false;		
					},200);
				},opts.time);
			},
			error : function(ret){
				if(typeof opts.error == 'function'){
					opts.error(opts);
				}
				setTimeout(function(){
					scrollflag = false;		
				},200);
				opts.moreElement.css('visibility','hidden');	
			} 
		}
		GSY.util.ajax(ajaxOptions);
	}
	 
	 

	//判断是否可以发起请求
	$.fn.scrollPagination.loadContent = function(element, opts){
		var target = opts.scrollTarget;
		var mayLoadContent = $(target).scrollTop() + $(target).height() > $(document).height() - opts.heightOffset;
		if (mayLoadContent) requestLoad(element, opts);
	};
	  
	//初始化方法
	$.fn.scrollPagination.init = function(element, opts){
		var target = opts.scrollTarget;
		$(element).attr('scrollPagination', 'enabled');
		$(target).bind('scroll', function(event){
			if ($(element).attr('scrollPagination') == 'enabled'){
				$.fn.scrollPagination.loadContent(element, opts);	
			} else {
				event.stopPropagation();
			}
		});
	};

	$.fn.scrollPagination.init.first = false;;
		
	//默认值
	$.fn.scrollPagination.defaults = {
		'url' : null,
		'data' : {},
		'beforeLoad': null,
		'afterLoad': null	,
		'scrollTarget': null,
		'heightOffset': 0,
		'time' : 0,
		'error' : null,
		'moreElement' : null,
		'time' : 500	  
	};	

	/**
	 * [pagination description] 滚动到底部获取分页数据
	 * @param  {[object]} 		options.element 		[description] 被加载数据的父元素块
	 * @param  {[string]} 		options.url 			[description] 后台交互连接地址
	 * @param  {[object]} 		options.data 			[description] 交互所传参数
	 * @param  {[object]} 		options.moreElement 	[description] load标显示元素框
	 * @param  {[number]} 		options.heightOffset 	[description] 距离底部偏移量高度
	 * @param  {[function]} 	options.start 			[description] 当向后台发起请求的时回调函数
	 * @param  {[function]} 	options.callback 		[description] 成功回调函数
	 * @param  {[function]}	 	options.error 			[description] 失败请求回调函数
	 */
	GSY.util.pagination = function(options){
		if(options == undefined || $(options.element).length == 0 || !options.url ) return;
		$(options.element).scrollPagination({
			'url' : options.url,
			'type' : options.type ? options.type : 'post',
			'data' : options.data ? options.data : {} , 
			'scrollTarget' : $(window),
			'moreElement' : options.moreElement,
			'heightOffset' : options.heightOffset ? options.heightOffset : 60,
			'beforeLoad' : typeof options.start == 'function' ? options.start : null,
			'afterLoad' : typeof options.callback == 'function' ? options.callback : null,
			'error' : typeof options.error == 'function' ? options.error : null
		});	
	}
})();


/**
 * [description] 页面盒子排版
 * @return {[type]} [description]
 */
;(function(){
	var lastObj = null , minWidthSave = [] , minHeightSave = [] , countHeight = [];
	var defined = {
		element : null,
		gameData : {},
		minWidth : 144,
		minHeight : 144,
		url : null,
		type : 'post',
		data : {}
	};


	//构造器
	var resize = function(options){
		this.options = $.extend({},defined,options);
	};
	
	
	//方法扩展
	resize.prototype = {
		/**
		 * [inti description] 初始化相关方法
		 * @return {[type]} [description]
		 */
		inti : function(){

			
			//生成列表内容
			this.createList();

			//设置每个游戏位置
			this.setPosition();

			//设置页面大小改变处里方法
			this.resize();

			//滚屏加载游戏列表
			this.getData();

			//_GA日志处理
			this.options.element.find('.lz-gamelist-list-other a').on('click',function(){
				var title = $(this).siblings().find('span').html();
				if(typeof click_game == 'function') click_game('index','gamelist',title);
			})

			//click_game('history','gamelist','{title}')
		},

		/**
		 * [tpl description] 列表模板
		 * @return {[type]} [description]
		 */
		tpl : function(){
			var html = '<div class="lz-gamelist-list">';
				html+= '	<div class="lz-gamelist-list-wrap {className}">';
				html+= '		<div class="lz-gamelist-list-img"><img src="{imageUrl}" alt="{title}"></div>';
				html+= '		<div class="lz-gamelist-list-ico">{icon}</div>';
				html+= '		<div class="lz-gamelist-list-other">';
				html+= '			<div class="lz-gamelist-list-text"><span>{title}</span></div>';
				html+= '			<a data-post="{post}" href="javascript:void(0);">{desc}</a>';
				html+= '		</div>';
				html+= '	</div>';
				html+= '</div>';
			return html;
		},
		
		/**
		 * [createList description] 创建游戏列表
		 * @return {[type]} [description]
		 */
		createList : function(){
			var len = this.options.gameData.length;
			for(var i = 0 ; i < len ; i++){
				var data = this.options.gameData[i];

				//当小游戏被禁用了不处理
				if(data.weight == 0) continue;

				//转化为游戏盒子路径
				var url = data.game_url.indexOf('/html/') != -1 ? data.game_url.replace(/\/html\//,'/gamebox/') : data.game_url;

				var tpl = this.tpl();
				tpl = tpl.replace('{imageUrl}',data.ico);
				tpl = tpl.replace(/\{title\}/g,data.name);
				tpl = tpl.replace('{post}',GSY.gamebox.jsonToPostStr({name:data.name,url:url,id:data.id}));
				
				//设置游戏描述
				if(!data.description) tpl = tpl.replace('{desc}',data.name);
				else tpl = tpl.replace('{desc}',data.description);

				//设置icon
				if(data.good == 1)  tpl = tpl.replace('{icon}','<span class="lz-hot"></span>');
				else if(data.good == 2) tpl = tpl.replace('{icon}','<span class="lz-like"></span>');
				else if(data.good == 3) tpl = tpl.replace('{icon}','<span class="lz-new"></span>');
				else tpl = tpl.replace('{icon}','');


				//设置大图样式
				if(data.weight && data.weight > 20) tpl = tpl.replace('{className}','lz-gamelist-big');
				else tpl = tpl.replace('{className}','');
				
				tpl = $(tpl);
				this.options.element.append(tpl);
				tpl.find('a').click(function() {
					var obj = GSY.util.getEleData($(this));
					GSY.gamebox.gotomingamebox(obj.url,obj.name,obj.id);	
				});

				if(i + 1 == len) this.options.gameData = {}; 
			}

			//设置窗帘显示
			GSY.other.windowMask({
				parent : this.options.element.children(),
				hide : '.lz-gamelist-list-text',
				speed : 250,
				delay : 500
			});
		},

		
		/**
		 * [setPosition description] 设置每个游戏列表位置
		 */
		setPosition : function(){
			var that = this;
			var listLen = that.options.element.children().length;

			if($(window).width() <=0) return;
			//窗口每行不能小于6列
			if(($(window).width()-21) <= that.options.minWidth*6) var winMinWidth = that.options.minWidth*6;
			else var winMinWidth = $(window).width()-21;

			//获取屏幕每行显示个数
			var scrollLen = parseInt(winMinWidth/that.options.minWidth);
			//设置父元素相关样式
			var overPx = winMinWidth%that.options.minWidth/2;
			that.options.element.css({width : scrollLen * that.options.minWidth , margin : '0 auto'});

			//设置初始化值
			for(var i = 0 ; i < scrollLen; i++){
				countHeight[i] = 0;
			}

			var column = 0,last = [];

			//循环计算坐标值
			that.options.element.children().each(function(index,element){
				var minTop = GSY.util.arr(countHeight,false).data;
				var maxTop = GSY.util.arr(countHeight,true).data;
				
				//获取当前设置元素高
				var width = $(this).outerWidth(true) , height = $(this).outerHeight(true);

				
				//当每列最后一个是大图时候跳过两个在处理大图
				if(last.length > 0 && index == last[1] + 2){
					last[0].css({top : minTop , left : 0}).attr('index',index);
					countHeight[0] += last[0].outerHeight(true);
					countHeight[1] = countHeight[0];
					last[0].show();
					column = 2;
					last = [];
				}


				//当每列最后一个是大图时候存储并延时处理
				if(width > that.options.minWidth && column + 1 == scrollLen) {
					$(this).hide();
					last.push($(this));
					last.push(index);
					return true;
				}

				

				//计算X坐标值
				if(minTop + that.options.minHeight == countHeight[column]) {
					var left = (column + 2) * that.options.minWidth;
					column += 2;
				}
				else var left = column * that.options.minWidth;

				//设置元素坐标值
				$(this).css({top : minTop , left : left}).attr('index',index);




				//存储每列最小高度
				if(width > that.options.minWidth && column + 1 < scrollLen) {
					countHeight[column] += height;
					countHeight[column + 1] = countHeight[column];
					//console.log(0,$(this),column,countHeight,minTop,maxTop,scrollLen,height);
					column += 2;	
				}
				else {
					countHeight[column] += height;
					//console.log(1,$(this),column,countHeight,minTop,maxTop,scrollLen,height);
					if(index > scrollLen && (column + 3) == scrollLen && countHeight[column + 1] == maxTop ) {
						column = 0;
					}else{
						column ++	
					}
				}


				//当前列为最后一列是重置列数为第一列
				if(column * that.options.minWidth + that.options.minWidth > that.options.element.width()){
					column = 0;	
				}

				//最后一次处理
				if(index + 1 == listLen){
					var maxHeight = GSY.util.arr(countHeight,true).data;
					that.options.element.css({visibility : 'visible',height : maxHeight});

				}
			});	
		},


		/**
		 * [resize description] 页面窗体发生变化时处里方法
		 * @return {[type]} [description]
		 */
		resize : function(){
			var that = this;
			GSY.config.resizeCode['gamelistbox'] = function(){
				minWidthSave = [];
				minHeightSave = [];
				countHeight = [];
				that.setPosition();	
			}
		},

		/**
		 * [getData description] 滚屏加载数据
		 * @return {[type]} [description]
		 */
		getData : function(){
			var that = this;

			if(!that.options.url) return; 

			//滚屏加载数据功能
			GSY.util.pagination({
				element : that.options.element,
				moreElement : $('.lz-gamelist-more span'),
				url : that.options.url,
				data : that.options.data,
				type : 'post',
				heightOffset : 100,
				callback : function(ret,options){
					if(ret && ret.code == 1 && ret.data && ret.data.html){
						that.options.gameData = ret.data.html;	

						//生成列表内容
						that.createList();

						//设置每个游戏位置
						that.setPosition();
					}
					if(ret.data.page_num == 0) options.moreElement.parent().hide();
				}
			});
		}
	};

	/**
	 * [createObj description] 历史记录对象实例化
	 * @param  {[type]} options [description]
	 * @return {[type]}         [description]
	 */
	var createObj = function(options){
		if (lastObj) {
			lastObj = null;
		};
		lastObj = new resize(options);
		return lastObj; 
	}

	//创建对象
	GSY.namespace('GSY.gamelist');

	/**
	 * [inti description] 对象初始化
	 * @param  {[type]} options [description]
	 * @return {[type]}         [description]
	 */
	GSY.gamelist.inti = function(options){
		if (options == undefined) options = {};
		return createObj(options).inti();
	};
})();

/**
 * [description] 历史记录页面
 * @return {[type]} [description]
 */
;(function(){
	
	var lastObj = null,lan = GSY.config.get('lang');
	var defined = {
		cookieKey : 'OAS_GAMEBOX_HISTORY_' + lan,
		arr : [],	//存储游戏列表
		splitFile : '@file@',
		splitList : '@in@',
		time : 720,
		ids : []  //存储游戏列表id
	};	

	//创建对象
	var history = function(){
		this.options = $.extend({},defined);
	}

	//历史记录扩展方法
	history.prototype = {

		/**
		 * [inti description] 方法初始化
		 * @return {[type]} [description]
		 */
		inti : function(){
			//初始化下拉菜单
			this.arr = this.getGameList();
			var menu = this.createBox(this.arr);
			$('body').append(menu);

			//设置Y坐标值
			GSY.config.scrollCode['oas_menu_box_history_top'] = function(){
				var win = GSY.util.getEleInfo($(window));
				var top = win.st;
				menu.css({top:top});
			};
			GSY.config.scrollCode['oas_menu_box_history_top']();

			return this;
		},

		/**
		 * [getGameList description] 获取历史记录处理
		 * @return {[type]} [description]
		 */
		getGameList : function(){
			var arr = [];
			var games = GSY.cookie.get(this.options.cookieKey);
			if(!games) arr = [];
			else arr = games.split(this.options.splitFile);
			return arr;
		},

		/**
		 * [box description] 创建
		 * @return {[type]} [description]
		 */
		box : function(){
			var box = '	<div class="lz-menu-box" id="lz-js-history-menu">';
				box+= '		<div class="lz-menu-wrap">';
				box+= '			<div class="lz-menu-cont lz-history-menu-box"></div>';
				box+= '			<div class="lz-menu-icon"></div>';
				box+= '		</div>';
				box+= '	</div>';
			return $(box).hide();	
		},

		/**
		 * [item description] 项目模板
		 * @return {[type]} [description]
		 */
		item : function(){
			var list = '<div class="lz-history-list" data-post="{post}">';
				list+= '	<a href="{link}" title="{fulltitle}">';
				list+= '		<div class="lz-history-list-img"><img title="{fulltitle}" alt="{fulltitle}" src="{imgUrl}"></div>';
				list+= '		<div title="{fulltitle}" class="lz-history-list-text">{title}</div>';
				list+= '		<div class="clear"></div>';
				list+= '	</a>';
				list+= '</div>';
			return list;	
		},

		/**
		 * [createList description] 创建历史记录列表
		 * @return {[type]} [description]str = str.replace(/\{title\}/g,);
		 */
		createList : function(str){
			var tpl = this.item();
			var temp = str.split('@in@'),len = temp.length;
			this.options.ids.push(temp[3]);
			for ( var i = 0 ; i < len ; i++){
				if(i == 0) {
					tpl = tpl.replace(/\{fulltitle\}/g , temp[i]);
					tpl = tpl.replace(/\{title\}/g , GSY.gamebox.strCut(temp[i],23,true));
				}else if(i == 1) tpl = tpl.replace('{imgUrl}',temp[i] + '?oas_ver=' + GSY.config.get('version'));
				else tpl = tpl.replace('{link}',temp[i]);
			}
			var url = temp[2].replace(/\/html\//g,"/gamebox/");
			tpl = tpl.replace('{post}',GSY.gamebox.jsonToPostStr({url:url,name:temp[0],id:temp[3]}));
			return tpl;	
		},

		/**
		 * [show description] 显示游戏历史开关
		 * @param  {[type]} x [description]
		 * @return {[type]}   [description]
		 */
		show : function(x){
			this.inti();
			var box = $('#lz-js-history-menu');
			//alert('h_x :' + x);
			
			//初始化数据方法方法
			if(!box.is(':hidden')) return;
			
			//绑定关闭窗口事件
			box.unbind('click').bind('click',function(e){				
				return false;
			});

     
			$('body').one('click',function(){
				if(!box.is(':hidden')){
					box.hide();
					$('body').unbind('click');
				}
			});

			//设置X坐标值
			GSY.config.scrollCode['oas_menu_box_history_left'] = function(){
				var bodyHeight = $('body').height();
				var winHeight = $(window).height();
				//当页面没有出现滚动条时候
				if(winHeight >= bodyHeight){
					box.find('.lz-menu-icon').css({right:(250 + 102) - x});	
				}else{
					box.find('.lz-menu-icon').css({right:(250 + 82) - x});	
				}
			};
			GSY.config.scrollCode['oas_menu_box_history_left']();
			box.show();


		},

		/**
		 * [hide description] 隐藏历史记录方法
		 * @return {[type]} [description]
		 */
		hide : function(){
			var box = $('#lz-js-history-menu');
			if(!box.is(':hidden')){
				box.hide();
				$('body').unbind('click');
			}
		},

		/**
		 * [createBox description] 创建历史下拉菜单
		 * @return {[type]} [description]
		 */
		createBox : function(arr){
			var len = arr.length;

			if($('#lz-js-history-menu').length == 0 ) var box = this.box();
			else var box = $('#lz-js-history-menu');
			
			//没有历史记录处理
			if(len  == 0) {
				var html = '<div class="lz-nodata">'+ OASGetLangVal('nodata') +'</div>';
				box.find('.lz-history-menu-box').html(html);
				return box;	
			}

			//清空历史列表
			box.find('.lz-history-menu-box').html('');

			//处理历史记录
			this.options.ids = [];
			for( var i = len - 1 ; i >= 0 ; i--){
				var item = $(this.createList(arr[i]));
				box.find('.lz-history-menu-box').append(item);
				
				item.click(function(event) {
					var obj = GSY.util.getEleData($(this));
					GSY.gamebox.gotomingamebox(obj.url,obj.name,obj.id);
					return false;
				});

			}
			return box;		
		},

		/**
		 * [setData description] 设置列表
		 */
		setData : function(str){
			var id = str.split(this.options.splitList)[3];
			var index = $.inArray(id,this.options.ids);
			if(index != -1){
				var tempArrData = [];
				for(var key in this.arr){
					var ids = this.arr[key].split(this.options.splitList)[3];
					if(id == ids) continue;
					else tempArrData.push(this.arr[key]);
				}
				tempArrData.push(str);
				GSY.cookie.set(this.options.cookieKey,tempArrData.join(this.options.splitFile),{expires:this.options.time});
			}else{
				if(this.arr.length == 10) this.arr = this.arr.slice(1);
				else this.arr = this.arr;
				this.arr.push(str);	
				GSY.cookie.set(this.options.cookieKey,this.arr.join(this.options.splitFile),{expires:this.options.time});
			}
			
			this.inti();
		}
	}

	//创建对象
	GSY.namespace('GSY.history');


	/**
	 * [createObj description] 历史记录对象实例化
	 * @param  {[type]} options [description]
	 * @return {[type]}         [description]
	 */
	var createObj = function(){
		if (lastObj) {
			lastObj = null;
		};
		lastObj = new history();
		return lastObj; 
	}

	/**
	 * [inti description] 对象初始化
	 * @param  {[type]} options [description]
	 * @return {[type]}         [description]
	 */
	GSY.history.inti = function(){
		return createObj().inti();
	};


	/**
	 * [set description] 设置历史记录记录
	 * @param {[type]} str [description]
	 */
	GSY.history.set = function(str){
		if(!lastObj) setTimeout(function(){GSY.history.set(str)},500);
		else{
			lastObj.setData(str);
		}
	}

	//初始化方法
	GSY.history.obj = GSY.history.inti();
})();



/**
 * [description] 搜索功能
 * @return {[type]}  [description]
 */
;(function(){
	var lastObj = null;
	var defined = {
		timeer : null,	
		ajaxFlag : false,
		key : null	
	};	

	//创建对象
	var search = function(){
		this.options = $.extend({},defined);
	}

	search.prototype = {
		/**
		 * [init description] 初始化方法
		 * @return {[type]} [description]
		 */
		init : function(key,x){
			var that = this;
			var historyBox = $('#lz-js-history-menu');
			if(historyBox && !historyBox.is(':hidden')) {historyBox.hide();}
			this.PageX = x ? x : 80;
			if(this.options.ajaxFlag) return;
			this.options.ajaxFlag = true;
			this.getData(key,function(ret){
				that.createBox(ret.data.html);
				$('body').append(that.menuBox);
				that.menuBox.show();

				//绑定开启游戏事件
				that.menuBox.find('.lz-search-list').click(function(event) {
					var obj = GSY.util.getEleData($(this));
					GSY.gamebox.gotomingamebox(obj.url,obj.name,obj.id);
					return false;
				});

				//绑定关闭窗口事件
				that.menuBox.unbind('click').bind('click',function(e){
					return false;
				});
				$('body').one('click',function(){
					if(!that.menuBox.is(':hidden')){
						that.menuBox.hide();
						$('body').unbind('click');
					}
				});

				that.options.ajaxFlag = false;
			})
		},

		/**
		 * [createBox description] 创建下拉列表
		 * @param  {[type]} data [description]
		 * @return {[type]}      [description]
		 */
		createBox : function(data){
			var that = this;
			if($('#lz-js-search-menu').length == 0)  this.menuBox = $(this.box());
			else this.menuBox = $('#lz-js-search-menu');
			this.menuBox.find('.lz-menu-cont').html('');

			//设置Y坐标值
			GSY.config.scrollCode['oas_menu_box_search_top'] = function(){
				var win = GSY.util.getEleInfo($(window));
				var top = win.st;
				that.menuBox.css({top:top});
			};
			GSY.config.scrollCode['oas_menu_box_search_top']();

			//设置X坐标值
			GSY.config.scrollCode['oas_menu_box_search_left'] = function(){
				var bodyHeight = $('body').height();
				var winHeight = $(window).height();
				if(winHeight > bodyHeight){
					that.menuBox.find('.lz-menu-icon').css({left:254-that.PageX+65});
				}else{
					that.menuBox.find('.lz-menu-icon').css({left:254-that.PageX+90});	
				}
			};
			GSY.config.scrollCode['oas_menu_box_search_left']();



			//当数据为空时处理
			if(data.length == 0 ){
				var html = '<div class="lz-nodata">'+ OASGetLangVal('nodata') +'</div>';
				this.menuBox.find('.lz-menu-cont').html(html);
				return;
			}

			//有数据的时候处理
			for(key in data){
				var temp = data[key];
				var str = this.item();
				
				//设置游戏名称
				str = str.replace(/\{fulltitle\}/g,temp.name);

				//设置缩略游戏名称
				str = str.replace(/\{title\}/g,GSY.gamebox.strCut(temp.name,23,true));

				//游戏图片
				str = str.replace(/\{imgUrl\}/g,temp.ico);

				//设置连接地址
				str = str.replace(/\{link\}/,'javascript:void(0);');

				//游戏参数
				var url = temp.game_url.replace(/\/html\//g,"/gamebox/");
				str = str.replace(/\{post\}/,GSY.gamebox.jsonToPostStr({url:url,name:temp.name,id:temp.id}));
				this.menuBox.find('.lz-menu-cont').append(str);
			}
		},

		/**
		 * [getData description] 后台获取游戏信息
		 * @param  {[type]} key [description]
		 * @return {[type]}     [description]
		 */
		getData : function(key,callback){
			var that = this;
			var url = GSY.config.get('searchMiniGame');
			
			//当为空的时候，隐藏下拉菜单
			if(key == ''){
				this.hide();
				this.options.ajaxFlag = false;
				return;	
			} 

			//获取游戏信息
			GSY.util.ajax({
				url : url,
				data : {keyword : key},
				success : function(ret){
					if(ret.code == 1 && typeof callback == 'function'){
						callback(ret);
					};
				},
				error : function(ret){
					that.options.ajaxFlag = false;
				}
			});
		},

		/**
		 * [show description] 显示搜索框
		 * @param  {[type]} key [description]
		 * @return {[type]}     [description]
		 */
		show : function(key,x){
			var that = this;
			if(this.options.timeer){
				clearTimeout(this.options.timeer);
				this.options.timeer = null;
			}
			this.options.timeer = setTimeout(function(){
				that.init(key,x);
			},400);
		},

		/**
		 * [hide description] 关闭搜索框
		 * @return {[type]} [description]
		 */
		hide : function(){
			var box = $('#lz-js-search-menu');
			if(!box.is(':hidden')){
				box.hide();
				$('body').unbind('click');
			}	
		},

		/**
		 * [box description] 创建搜索外框
		 * @return {[type]} [description]
		 */
		box : function(){
			var box = '	<div class="lz-menu-box" id="lz-js-search-menu">';
				box+= '		<div class="lz-menu-wrap">';
				box+= '			<div class="lz-menu-cont lz-search-menu-box"></div>';
				box+= '			<div class="lz-menu-icon"></div>';
				box+= '		</div>';
				box+= '	</div>';
			return $(box).hide();	
		},

		/**
		 * [item description] 项目模板
		 * @return {[type]} [description]
		 */
		item : function(){
			var list = '<div class="lz-search-list" data-post="{post}">';
				list+= '	<a href="{link}" title="{fulltitle}">';
				list+= '		<div class="lz-search-list-img"><img alt="{fulltitle}" src="{imgUrl}"></div>';
				list+= '		<div class="lz-search-list-text" title="{fulltitle}">{title}</div>';
				list+= '		<div class="clear"></div>';
				list+= '	</a>';
				list+= '</div>';
			return list;	
		}


	};

	//创建对象
	GSY.namespace('GSY.search');

	/**
	 * [createObj description] 搜索对象实例化
	 * @param  {[type]} options [description]
	 * @return {[type]}         [description]
	 */
	var createObj = function(){
		if (lastObj) lastObj = null;
		lastObj = new search();
		return lastObj; 
	}

	/**
	 * [inti description] 对象初始化
	 * @param  {[type]} options [description]
	 * @return {[type]}         [description]
	 */
	GSY.search = createObj();
})();

/**
 * [miniGamesFull description] 小游戏全屏操作
 * @return {[type]} [description]
 */
GSY.gamebox.miniGamesFullFlag = false; 
GSY.gamebox.miniGamesFull = function(element){
	GSY.gamebox.miniGamesFullFlag = true;
	
	//绑定退出全屏
	$(document).keyup(function(e) {
		if(GSY.gamebox.miniGamesFullFlag && e.keyCode == '27'){
			element.removeAttr('style');
			element.children().removeAttr('style');
			element.siblings().show();
			$(document).unbind('keyup');
			GSY.gamebox.miniGamesFullFlag = false;
		}
	});

	//绑定改变事件
	GSY.config.resizeCode['OAS_MINIGAME_FULL'] = function(){
		if(!GSY.gamebox.miniGamesFullFlag) return;
		var tempObj = GSY.util.getEleInfo(element.closest('.lz-con1-center'));
		element.siblings().hide();
		var win = GSY.util.getEleInfo($(window));
		var left = -tempObj.l;
		element.css({width:win.w,height:win.h,top:0,padding:0,left:left,background:'#333'});
		element.children().css({width:win.w,height:win.h,top:0,left:0});
	}

	GSY.config.resizeCode['OAS_MINIGAME_FULL']();
}





/**
 * [description] 赞功能
 * @return {[type]} [description]
 */
GSY.util.like = function(options){
	var defined = {
		element : null,
		url : null,
		cookieKey : GSY.config.get('lang') + '_lz_GameLike_',
		data : {},
		id : null,
		time : 24,
		msg : null,
		callback : null
	};
	var opt = $.extend({},defined,options) , ajaxFlag = false , i = 0;

	//不处理
	if(opt.element.length == 0 || !opt.url || !opt.id) {
		opt.element.on('click', function(){
			if(opt.msg) {GSY.gamebox.message(opt.msg);}
			return false;
		})
		return;
	}

	//设置请求参数
	var data = $.extend({},opt.data,GSY.util.getEleData(opt.element,'data-post')); 

	//成功回调处理
	var callback = function(ret){
		if(typeof opt.callback == 'function'){
			opt.callback(ret,opt);	
		}else{
			if(ret && ret.code == 1) {
				opt.element.find('span').html(ret.data.number);
				if(i > 0) GSY.cookie.set(opt.cookieKey + opt.id , 1,{expires : opt.time});
				i++;
			}
		}
		ajaxFlag = false;
	};

	GSY.util.ajax({
		url : opt.url,
		data : $.extend({},data,{action : 'init'}),
		success : callback,
		error : function(ret){
			ajaxFlag = true;	
		}
	});

	//不处理
	if(GSY.cookie.get(opt.cookieKey + opt.id)) {
		opt.element.on('click', function(){
			if(opt.msg) {GSY.gamebox.message(opt.msg);}
			return false;
		})
		return;
	}


	//绑定点击事件
	opt.element.on('click',function(){
		if(GSY.cookie.get(opt.cookieKey + opt.id)){
			if(opt.msg) {GSY.gamebox.message(opt.msg);}
			return false	
		};
		var _this = $(this);
		if(ajaxFlag) return false;
		ajaxFlag = true;
		GSY.util.ajax({
			url : opt.url,
			data : $.extend({},data,{action : 'click'}),
			success : callback,
			error : function(ret){
				ajaxFlag = false;	
			}
		});
		return false;
	});
}















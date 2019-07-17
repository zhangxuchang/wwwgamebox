/*
 * 微阅读全局脚本，依赖于jQuery
 * author:gaoshiyong<gaoshiyong1272@vip.163.com>
 */

/**
 * [slider description] banner和广告切换图片效果（动画类型为：淡入淡出和左右滑动效果）
 * @param  {[number]} 	options.width [description] 		外框宽度
 * @param  {[number]} 	options.height [description] 		外框高度
 * @param  {[object]} 	options.parentEle [description] 	公共父节点
 * @param  {[number]} 	options.time [description] 			启用自动播放模式  0 表示不启用  大于0其他值为播放周期时间
 * @param  {[boolean]} 	options.isNext [description] 		启用显示左右滚动按钮  false：不显示  true：显示
 * @param  {[string]}	options.icoType [description]		icon显示方式  number：数字显示方式  dot：原点显示方法 
 * @param  {[string]} 	options.align [description] 		icon 显示对齐方向  center left right
 * @param  {[number]} 	options.icoShow [description] 		icon 显示当前第几个   默认显示第一个
 * @param  {[string]} 	options.type [description]			动画处理效果  fade：淡入淡出效果  animate：动画滑动效果
 * @param  {[number]} 	options.scrollTime [description] 	动画延时动画处理事件
 * @param  {[string]} 	options.iconEventTpye [description] icon事件类型 支持【click,mouseover】
 * @return {[object]}   [description] 返回当前对象
 */
;(function($){
	var _lastObj = null;
	var define = {
		width : null ,			//外框宽度
		height : null,			//外框高度
		parentEle : null,		//公共父节点
		time : 0,				//启用自动滚动模式  0 表示不启用
		isNext : true,			//启用显示左右滚动按钮  false 不显示  true 显示
		icoType :  'number',  	// icon显示方式  number 数字显示方式  dot 原点显示方法 
		prefix : 'oas-slider',	//前缀名字,
		align : 'left',			//icon 显示对齐方向
		icoShow : 1 ,			//icon 默认当前显示第几个
		type : 'fade',			//动画效果  fade：淡入淡出效果  animate：动画滑动效果 
		scrollTime : 700, 		//动画延时动画处理
		isIcoShow : true,		//是否隐藏icon显示
		iconEventTpye : 'click' //icon 事件类型
		
	}

	/**
	 * [slider description] 构造图片切换效果构筑起
	 * @return {[type]} [description]
	 */
	var slider = function(options){
		this.options = $.extend({}, define , options);
		this.active = 0;
		this.resizeObject = {}
		this.saveWidth = this.options.width;
	}

	/**
	 * [prototype description]  扩展图片切换效果方法
	 * @type {Object}
	 */
	slider.prototype = {

		/**
		 * [inti description] 初始化相关事件
		 * @return {[type]} [description]
		 */
		inti : function(){
			var that = this;

			//判断没有找到元素或者没有传入高度和宽度的时候处理
			if(this.options.parentEle.length == 0 || !this.options.width || !this.options.height ) return this;
			if(this.options.parentEle.find('li').length <= 1 ) return this;

			//假如ico显示方式为原点，icon强制为中心显示
			if(this.options.icoType == 'dot') this.options.align = 'center';
			this.list = this.options.parentEle.find('li');

			//初始化icon显示样式
			this.createIcoStyle();

			//初始化左右滚屏按钮样式
			this.createBtnStyle();



			//动画效果
			this.options.width = this.saveWidth == '100%' ? $(window).width() : this.options.width;
			if(this.options.type == 'slider'){
				this.sliderCode();
			}else{
				this.fade();	
			}

			//全屏事件处理
			if(this.saveWidth == '100%'){
				//当页面发生变化时候处理事件
				this.resizeObject['oasResizeWindow'] = function(){
					that.options.width = that.saveWidth == '100%' ? $(window).width() : that.options.width;
					that.options.parentEle.find('ul').css({'width':that.options.width * that.parentChildLen,height:that.options.height,'margin-left':-1*that.active*that.options.width});
					that.list.each(function(index, el) {
						$(this).show().css({float:'left', width:that.options.width,height:that.options.height});
					});
				}

				//窗口发生变化初始化
				this.reSize();	
			}
		},

		/**
		 * [description] 初始化icon显示样式
		 * @return {[type]} [description]
		 */
		createIcoStyle : function(){
			this.icon = $('<div class="oas-slider-ico" style="display:none"></div>');
			this.parentChildLen = this.options.parentEle.find('li').length;
			this.active = (this.options.icoShow <= 0 || this.options.icoShow > this.parentChildLen) ?  0 : (this.options.icoShow - 1);
			this.options.parentEle.css({width : this.options.width,height : this.options.height,overflow:'hidden'});
			this.options.parentEle.find('li').eq(this.active).show();

			//生成icon显示元素
			var iconStr = '';
			var iconStyle = this.options.prefix + '-' + this.options.icoType;
			for(var i = 1; i <= this.parentChildLen ; i++){
				if(this.options.icoType == 'number') iconStr += '<span class="'+ iconStyle +'">'+ i +'</span>';
				else iconStr += '<span class="'+ iconStyle +'"></span>';
			}
			this.icon.html(iconStr);
			this.icon.children().eq(this.active).addClass('active');

			//插入页面中并显示
			this.options.parentEle.append(this.icon);
			if(!this.options.isIcoShow){
				this.icon.hide();
			}else{
				this.icon.show();
			}

			//icon 显示对齐方向
			if(this.options.align == 'right'){
				this.icon.css({right : 10}).children().css({'margin-left' : 10});
			}else if(this.options.align == 'center'){
				this.icon.children().css({'margin' :'0 5px'});
				var width = (this.icon.find('span').outerWidth(true))*this.parentChildLen;
				this.icon.css({left : -(width/2), 'margin-left' : '50%', width: width});
			}else{
				this.icon.css({left : 10}).children().css({'margin-right' : 10});
			}
		},

		/**
		 * [createBtnStyle description] 初始化左右滚屏按钮样式
		 * @return {[type]} [description]
		 */
		createBtnStyle : function(){
			if(!this.options.isNext) return;
			this.nextBtn = $('<a class="oas-slider-btn next" href="javascript:;"></a>');
			this.prevBtn = $('<a class="oas-slider-btn prev" href="javascript:;"></a>');
			this.options.parentEle.append(this.nextBtn,this.prevBtn);
		},

		/**
		 * [animate description] 功能动画处理
		 * @param  {[type]} index [description] 当前索引值
		 * @return {[type]}       [description]
		 */
		animate : function(index){
			var that = this;

			//设置当前状态
			that.icon.find('span').eq(index).addClass('active').siblings().removeClass('active');
			
			//动画处理
			if(this.options.type == 'slider'){
				var marLeft = -that.options.width * index;
				var ulBox = this.options.parentEle.find('ul');
				ulBox.animate({'margin-left' : marLeft}, that.options.scrollTime , function() {
					that.status = false;	
					that.active = index;	
				});
			}else{
				that.list.eq(that.active).hide().css({opacity:0});
				that.list.eq(index).show().animate({opacity:1},that.options.scrollTime,function(){
					that.status = false;
					that.active = index;
				});	
			}
		},

		/**
		 * [scrollNext description] 左右滚动按钮事件处理
		 * @return {[type]} [description]
		 */
		scrollNext : function(){
			var that = this;
			if(!this.options.isNext) return;
			
			//显示下一个事件处理
			this.nextBtn.click(function(){
				var index = that.active + 1 >= that.parentChildLen ? 0 : that.active + 1;
				that.animate(index);	
			});	

			//显示上一个事件处理
			this.prevBtn.click(function(){
				var index = that.active - 1 < 0 ? that.parentChildLen - 1 : that.active - 1;
				that.animate(index);	
			});	
		},

		/**
		 * [autoCode description] 动画自动播放处理方法
		 * @return {[type]} [description]
		 */
		autoCode : function(){
			var that = this;
			if(!this.options.time) return; //关闭自动播放事件

			//播放定时器处理
			var auto = function(){
				that.timer = setInterval(function(){
					var index = that.active + 1 >= that.parentChildLen ? 0 : that.active + 1;
					that.animate(index);	
				},that.options.time);	
			}

			//当移动到元素上面是取消动画效果
			this.options.parentEle.mouseover(function(e) {
				if(that.timer){
					clearInterval(that.timer);
					that.timer = null;
				}
				e.stopPropagation();
			}).mouseout(function(e) {
				auto();
				e.stopPropagation();
			});
			
			//启动自动播放功能
			auto();
		},


		/**
		 * [animate description] 动画滑过效果初始化话
		 * @return {[type]} [description]
		 */
		sliderCode : function(){
			var that = this , ulBox = this.options.parentEle.find('ul');
			this.status = false
			this.timer = null;
			
			//初始化切换元素样式
			ulBox.css({'width':this.options.width * this.parentChildLen,height:this.options.height,'margin-left':-1*this.active*this.options.width});
			that.list.each(function(index, el) {
				$(this).show().css({float:'left', width:that.options.width,height:that.options.height});
			});

			//添加icon事件处理
			this.icon.find('span').unbind('').bind(this.options.iconEventTpye,function() {
				var index = $(this).index();
				if(that.status || that.active  == index) return false;
				that.status = true;
				that.animate(index);	
			});

			//左右滚动按钮处理方法初始化
			this.scrollNext();


			//自动播放动画处理方法初始化
			this.autoCode();
		},

		/**
		 * [reSize description] 初始化屏幕大小发生变化事件 
		 * @return {[type]} [description]
		 */
		reSize : function(){
			var that = this;
			var timeer = null;
			$(window).unbind('resize').bind('resize',function(e){
				if(timeer) clearTimeout(timeer);
				timeer = setTimeout(function(){
					for( var key in that.resizeObject){
						if(typeof that.resizeObject[key] == 'function') {
							that.resizeObject[key]();
						}
					}
				},200);
			});
		},

		/**
		 * [silderUp description] 淡入淡出效果
		 * @return {[type]} [description]
		 */
		fade : function(){
			var that = this,status = false,timer = null;

			//初始化元素透明度
			that.list.each(function(index, el) {
				if(index !== that.active){
					$(this).css({opacity : 0});
				}
			});

			//添加icon事件处理
			this.icon.find('span')[this.options.iconEventTpye](function() {
				var index = $(this).index();
				if(that.active == index) return false;
				if(that.status) return false;
				that.status = true;
				that.animate(index);
			});

			//左右滚动按钮处理方法初始化
			this.scrollNext();


			//自动播放动画处理方法初始化
			this.autoCode();
		}
	}

	/**
	 * [createObjcet description] 对象初始化
	 * @param  {[type]} options [description]
	 * @return {[type]}         [description]
	 */
	var createObjcet = function(options){
		if(_lastObj) _lastObj = null;
		_lastObj = new slider(options);
		return _lastObj;
	}

	/**
	 * [description] 对外通过接口
	 * @param  {[type]} options [description]
	 * @return {[type]}         [description]
	 */
	window['oasSlider'] =  function(options){
		options = options == undefined ? {} : options;
		return createObjcet(options).inti();
	}
	
})(jQuery);
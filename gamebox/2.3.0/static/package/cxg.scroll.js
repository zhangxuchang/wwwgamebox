/*
 * 重置滚动条，依赖于jQuery
 * author:gaoshiyong<gaoshiyong1272@vip.163.com>
 */

/**
 * [description] 扩展鼠标滚动事件
 * @return {[type]} [description]
 */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(b(I){4(O 17===\'b\'&&17.2b){17([\'2d\'],I)}r 4(O 1p===\'2a\'){29.1p=I}r{I(28)}}(b($){d W=[\'1r\',\'c\',\'2e\',\'1o\'],z=(\'2f\'l 1b||1b.2l>=9)?[\'1r\']:[\'c\',\'2k\',\'1o\'],Y=2g.2h.Y,G,h;4($.7.1i){11(d i=W.E;i;){$.7.1i[W[--i]]=$.7.2n}}d s=$.7.s.c={1U:\'3.1.12\',1T:b(){4(8.1x){11(d i=z.E;i;){8.1x(z[--i],F,T)}}r{8.1A=F}$.R(8,\'c-C-m\',s.1y(8));$.R(8,\'c-Z-m\',s.1H(8))},24:b(){4(8.1I){11(d i=z.E;i;){8.1I(z[--i],F,T)}}r{8.1A=q}$.1z(8,\'c-C-m\');$.1z(8,\'c-Z-m\')},1y:b(o){d $o=$(o),$w=$o[\'1w\'l $.p?\'1w\':\'w\']();4(!$w.E){$w=$(\'1Y\')}k 1B($w.j(\'1C\'),10)||1B($o.j(\'1C\'),10)||16},1H:b(o){k $(o).m()},U:{1S:1a,1t:1a}};$.p.1G({c:b(p){k p?8.2G(\'c\',p):8.2E(\'c\')},2F:b(p){k 8.2K(\'c\',p)}});b F(7){d 6=7||K.7,18=Y.2O(2M,1),g=0,a=0,5=0,n=0,M=0,H=0;7=$.7.2N(6);7.S=\'c\';4(\'1E\'l 6){5=6.1E*-1}4(\'1v\'l 6){5=6.1v}4(\'1u\'l 6){5=6.1u}4(\'1l\'l 6){a=6.1l*-1}4(\'1k\'l 6&&6.1k===6.2s){a=5*-1;5=0}g=5===0?a:5;4(\'5\'l 6){5=6.5*-1;g=5}4(\'a\'l 6){a=6.a;4(5===0){g=a*-1}}4(5===0&&a===0){k}4(6.X===1){d Q=$.R(8,\'c-C-m\');g*=Q;5*=Q;a*=Q}r 4(6.X===2){d P=$.R(8,\'c-Z-m\');g*=P;5*=P;a*=P}n=t.2w(t.1h(5),t.1h(a));4(!h||n<h){h=n;4(V(6,n)){h/=N}}4(V(6,n)){g/=N;a/=N;5/=N}g=t[g>=1?\'13\':\'15\'](g/h);a=t[a>=1?\'13\':\'15\'](a/h);5=t[5>=1?\'13\':\'15\'](5/h);4(s.U.1t&&8.1s){d 14=8.1s();M=7.2q-14.1O;H=7.2p-14.A}7.a=a;7.5=5;7.2u=h;7.M=M;7.H=H;7.X=0;18.2I(7,g,a,5);4(G){1m(G)}G=1e(1R,2r);k($.7.2x||$.7.2A).2B(8,18)}b 1R(){h=q}b V(6,n){k s.U.1S&&6.S===\'c\'&&n%2L===0}}));(b(){x=K.x||{},D=0,u=q,1f=T,f=q;d 1q={1D:2o,L:q,1j:2,1L:2i,J:$(\'<1K 1Z="y-B" 20="y-21-B"></1K>\').23(),1g:q};d j=\'<1d S="1P/j">\';j+=\'.y-B {19:1W 1Q 0; 1P-1n:1V;}\';j+=\'.y-B * { 25: 2j-2m; 26-1n: A; }\';j+=\'.y-B 22 { 1M-1d: 2H; 1M-2D: 2C; 19-1O: 1Q; m: 1N; C-m: 1N; 19-A: 2R;}\';j+=\'</1d>\';$(\'2t\').2P(j);x.2J=b(1c){4(O $==\'2Q\')k;f=$.1G({},1q,(1c?1c:{}));4(f.L)f.J.L(f.L);$(\'#2y\').2z(f.J);$(1b).c(b(e,v){d 1J=e;4(u){1m(u);u=q;D++}u=1e(b(){d A=$(K).2v();4(D>=f.1j&&A<=10&&v>=1){x.1F(1J,v)}D=0},f.1D)})};x.1F=b(e,v){4(1f)k;1f=1a;f.J.1X();1e(b(){4(O f.1g==\'b\')f.1g(e,v,f);r K.27.2c()},f.1L)}})();',62,178,'||||if|deltaY|orgEvent|event|this||deltaX|function|mousewheel|var||opt|delta|lowestDelta||css|return|in|height|absDelta|elem|fn|null|else|special|Math|mousewheel_timer|status|parent|LZ|lz|toBind|top|load|line|mousewheel_i|length|handler|nullLowestDeltaTimeout|offsetY|factory|box|window|html|offsetX|40|typeof|pageHeight|lineHeight|data|type|false|settings|shouldAdjustOldDeltas|toFix|deltaMode|slice|page||for||floor|boundingRect|ceil||define|args|padding|true|document|options|style|setTimeout|mousewheel_flag|callback|abs|fixHooks|len|axis|wheelDeltaX|clearTimeout|align|MozMousePixelScroll|exports|defines|wheel|getBoundingClientRect|normalizeOffset|wheelDeltaY|wheelDelta|offsetParent|addEventListener|getLineHeight|removeData|onmousewheel|parseInt|fontSize|time|detail|scrollCode|extend|getPageHeight|removeEventListener|evt|div|delay|font|26px|left|text|10px|nullLowestDelta|adjustOldDeltas|setup|version|center|25px|show|body|class|id|js|em|hide|teardown|display|vertical|location|jQuery|module|object|amd|reload|jquery|DOMMouseScroll|onwheel|Array|prototype|1000|inline|DomMouseScroll|documentMode|block|mouseHooks|500|clientY|clientX|200|HORIZONTAL_AXIS|head|deltaFactor|scrollTop|max|dispatch|cont|prepend|handle|apply|20px|size|trigger|unmousewheel|bind|normal|unshift|scrollLoad|unbind|120|arguments|fix|call|append|undefined|15px'.split('|'),0,{}));



/**
 * [description] 重置滚动条
 * @return {[type]} [description]
 */
;(function(){
	var lastObj = null;
	var index = 1000;
	var static_host = "//cdn.gooogleyahooo.net/static/";
	var static_version = '2015041401';
	var css = '.cxg-scroll-box { position: relative; overflow: hidden;}';
		css +='.cxg-scroll-r { position: absolute; right: 0; top: 0;}';
		css +='.cxg-scroll-top,.cxg-scroll-bottom {background: {iconBg};}'
		css +='.cxg-scroll-top span,.cxg-scroll-bottom span { display: inline-block; vertical-align: top; width: 100%; height: 100%; cursor: pointer;}';
		css +='.cxg-scroll-top span { background: url("{iconUp}") no-repeat center;}';
		css +='.cxg-scroll-bottom span { background: url("{iconDown}") no-repeat center;}';
		css +='.cxg-scroll-top span:active,.cxg-scroll-bottom span:active { background-color: {iconActive};}';
		css +='.cxg-scroll-middle-c { margin: 0 auto; position: absolute; top:0; cursor: pointer; background: {scrollBg}; }';
		css +='.cxg-scroll-middle-c:hover { background:{scrollBgHover}; }';
		css +='.cxg-scroll-middle-c:active{ background:{scrollBgActive}; }';
		css +='.cxg-scroll-wrap-cont { }';
		css +='.cxg-scroll-noSelect { -ms-user-select:none; -webkit-user-select:none; -moz-user-select:none;}';


	var defined = {
		element : null,
		cont : '<div class="cxg-scroll-wrap"><div class="cxg-scroll-wrap-cont"></div></div>',
		scrollElex : null,
		callback : null,
		type : false,
		mouseStep : 150,
		iconUp : static_host + '/package/images/cxg-up-ico.png?version=' + static_version,
		iconDown : static_host + '/package/images/cxg-down-ico.png?version=' + static_version,
		iconActive : '#e2e2e2',
		iconBg : '#414141',
		scrollBg : '#d3d6db',
		scrollBgHover : '#c3c5c9',
		scrollBgActive : '#aaabad',
		scrollWidth:10,
		scrollWrapWidth : 20,
		scrollWrapBg : '#585858',
		contHeight : '100%',
		contWidth : '100%',
		scrollCallback : null,
		scrollToBottomNum : 0,
		scrollToBottomCallback : null,
		scrollToBottomFlag : false,
		disabled : false
	};

	/**
	 * [scrollFn description] 重置滚动条构造器
	 * @return {[type]} [description]
	 */
	var scrollFn = function(options){
		this.options = $.extend({},defined,options);
		this.childrenObj = null;
		this.cont = $(this.options.cont);
		index++;
		this.index = 0;
		this.scrollFlag = false;
		this.saveHeight = 0;
		this.init();
	};

	/**
	 * [prototype description] 重置滚动条扩展方法
	 * @type {Object}
	 */
	scrollFn.prototype = {
		
		/**
		 * [init description] 方法初始化
		 * @return {[type]} [description]
		 */
		init : function(){

			var that = this;

			//不支持ie6版本自定义滚动条
			if($.browser.msie && parseInt($.browser.version) < 7){
				this.options.element.css({width:'auto',height:'auto'});
				$('body').removeAttr('scroll');
				return;	
			}else{
				$('body').attr('scroll','no');
			}

			//被操作对象不存在不处理
			if(this.options.element.length == 0) return;

			//加载样式表
			//this.createCss();
			

			//存储子集元素对象并重组元素结构
			this.childrenObj = this.options.element.children();

			
			this.cont.children().append(this.childrenObj);
			this.options.element.html(this.cont);

			//创建滚动条元素框
			this.options.scrollElex = this.createScrollEle();	
			this.scrollObj = this.options.scrollElex.find('.cxg-scroll-middle-c');

			//设置滚动条元素样式
			this.setScrollEleCss();			

			//页面窗口发生改变事件
			this.resize();

			//绑定页面
			this.scrollMoveClick();

			//当页面发生变化时候设置滚动条元素样式
			//this.autoResetCss();
			$('body').on('selectstart',function(){
				return false;
			}).css({'-webkit-user-select':'none','user-select':'none'});	
		},



		/**
		 * [createCss description]加载样式表
		 * @return {[type]} [description]
		 */
		createCss : function(){
			var str = css.replace(/\{iconUp\}/,this.options.iconUp);
			str = str.replace(/\{iconDown\}/,this.options.iconDown);
			str = str.replace(/\{iconBg\}/,this.options.iconBg);
			str = str.replace(/\{iconActive\}/,this.options.iconActive);
			str = str.replace(/\{scrollBg\}/,this.options.scrollBg);
			str = str.replace(/\{scrollBgHover\}/,this.options.scrollBgHover);
			str = str.replace(/\{scrollBgActive\}/,this.options.scrollBgActive);
			this.loadCss(str,'CXGResetScrollreSizeCSS');
		},
		/**
		 * [loadCss description] 动态加载样式表
		 * @return {[type]}     [description]
		 */
		loadCss : function(str,id){
	
			var style = document.createElement('style');
			style.type = "text/css";
			style.id = id;
			
			//IE  
			if(style.styleSheet){
	        	style.styleSheet.cssText = str;  
	    	
	    	// w3c
	    	} else {  
	        	var cssText = document.createTextNode(str);  
	        	style.appendChild(cssText);  
	   		} 

			document.getElementsByTagName('head').item(0).appendChild(style);
		},

		/**
		 * [scrollMoveClick description] 鼠标点击滚动条区域定位
		 * @return {[type]} [description]
		 */
		scrollMoveClick : function(){
			var that = this;

			//取消滚动条点击冒泡事件
			that.scrollObj.click(function(e) {
				return false;
			});

			//点击滚动条外框事件处理
			this.options.scrollElex.find('.cxg-scroll-middle').click(function(e){
				var scrollWarpTop = that.options.scrollElex.offset().top + that.options.scrollWrapWidth;
				var scrollWrapH = $(this).height();
				var scrollH = that.scrollObj.height();
				var scrollWarpY = e.pageY;
				var top = (scrollWarpY - scrollH/2) - scrollWarpTop;
				
				//边界处理方法
				if(top < 0) top = 0;
				if(top >= scrollWrapH - scrollH){
					top = scrollWrapH - scrollH;
				}
				that.move(top);
			});	
		},

		/**
		 * [autoResetCss description] 当页面发生变化时候设置滚动条元素样式
		 * @return {[type]} [description]
		 */
		autoResetCss : function(){
			var that = this;
			this.saveHeight = this.cont.children().height();
			setInterval(function(){
				var h = that.cont.children().height();
				if(that.saveHeight != h) {
					that.saveHeight = h;
					that.setScrollEleCss();
					that.options.scrollToBottomFlag = false;
				}
			},100);	
		},

		/**
		 * [setScrollEleCss description] 设置滚动条元素样式
		 */
		setScrollEleCss : function(){

			this.options.scrollElex.hide();
			
			//获取相关的值
			this.outerWidth = this.options.element.width();
			this.outerHeight = this.options.element.height();
			this.scrollHeight = this.outerHeight - this.options.scrollWrapWidth*2;
			this.bodyHeight = this.cont.children().height();
			var marginTop = parseInt(this.cont.children().css('margin-top'));
			this.minScrollHeight = parseInt(this.options.scrollWrapWidth*2.5);


			//当小于等于滚动条的时候处理
			if(this.bodyHeight > this.outerHeight){
				//设置滚动内容样式
				this.cont.css({width : this.outerWidth - this.options.scrollWrapWidth,height : this.outerHeight});;
				
				//创建滚动条并设置外框样式
				this.options.scrollElex.css({width:this.options.scrollWrapWidth,height:this.outerHeight,background:this.options.scrollWrapBg});

				//设置向上向下按钮样式
				this.options.scrollElex.find('.cxg-scroll-top,.cxg-scroll-bottom').css({width:this.options.scrollWrapWidth-2,height:this.options.scrollWrapWidth-2});

				//设置中间部分样式
				this.options.scrollElex.find('.cxg-scroll-middle').css({width:this.options.scrollWrapWidth,height:this.outerHeight-this.options.scrollWrapWidth*2,position:'relative'});

				//计算滚动条高度
				var height = this.scrollHeight * (1 - (this.bodyHeight-this.outerHeight)/this.bodyHeight);
				height = height <= this.minScrollHeight ? this.minScrollHeight : height;

				//设置滚动操作部分样式
				var top = parseInt(Math.abs(marginTop)*(this.scrollHeight - height)/(this.bodyHeight - this.outerHeight));

				
				//当top值总高度大于等于滚动高度的时候重置滚动条属性
				if(top >= this.scrollHeight - height){
					top = this.scrollHeight - height;
					marginTop = -(this.bodyHeight - this.outerHeight);
				}


				//设置内容margin-top样式
				this.options.scrollElex.find('.cxg-scroll-middle-c').css({width:this.options.scrollWidth,height:height,top:top,left:(this.options.scrollWrapWidth/2-this.options.scrollWidth/2)});
				this.cont.children().css({'margin-top':marginTop});
				//显示滚动条
				this.options.scrollElex.show();
				//绑定点击上下滚动小icon按钮事件
				this.upAnddwonCode();
				//滚动条拖动事件
				this.scrollMoveEvent();
				//绑定鼠标滚轮滚动事件
				this.contMousewheel();	

			}else{
				this.cont.removeAttr('style');
				this.cont.children().removeAttr('style');
				this.options.element.off('mousewheel')
			}
		},

		/**
		 * [contMousewheel description] 鼠标滚轮滚动事件初始化
		 * @return {[type]} [description]
		 */
		contMousewheel : function(){
			var that = this;
			var timeer = null;
			this.options.element.on('mousewheel',function(e, delta) {
				that.contMousewheelCode(delta);
				return false;	
			});
		},

		/**
		 * [contMousewheelCode description] 鼠标滚轮滚动事件处理
		 * @param  {[type]} delta [description]
		 * @return {[type]}       [description]
		 */
		contMousewheelCode : function(delta){
			var bodyH = this.cont.children().height();
			var winH = this.outerHeight;
			var scrollWrapH = this.options.scrollElex.find('.cxg-scroll-middle').height();
			var scrollH = this.scrollObj.height();
			var scrollTop =parseInt(this.options.mouseStep*(scrollWrapH-scrollH)/(bodyH - winH));
			var top = parseInt(this.scrollObj.css('top'));
			var num = top + (delta > 0 ? -scrollTop : scrollTop);

			if(num < 0) num = 0;
			if(num >= scrollWrapH - scrollH){
				num = scrollWrapH - scrollH;	
			}
			this.move(num);
		},


		/**
		 * [scrollMoveEvent description] 拖动滚动条事件
		 * @return {[type]} [description]
		 */
		scrollMoveEvent : function(){
			var that = this;
			var scroll = this.options.scrollElex.find('.cxg-scroll-middle');
			
			//绑定鼠标按下事件
			scroll.mousedown(function(e) {
				var _that = $(this);
				var scrollPageY = e.pageY
				var scrollY = _that.offset().top;
				var scrollTop = parseInt(scroll.children().css('top')) + scrollY;
				var scrollOffset = scrollPageY - scrollTop;

				//绑定鼠标移动事件
				$(document).mousemove(function(event) {		
		            //设置滚动条
					var h = that.scrollObj.height();
					var top = event.pageY - scrollY - scrollOffset;
					that.scrollObj[0].setCapture ? that.scrollObj[0].setCapture() : null;
					if(top <= 0 ) {
						top = 0;
					}else if(top + h >=  _that.height()){
						top = _that.height() - h;	
					}
					//移动事件处理
					that.move(top);

				}).mouseup(function(event) {					
					that.scrollObj[0].releaseCapture ? that.scrollObj[0].releaseCapture() : null;
					$(document).unbind('mousemove');
				});
			});

		},

		/**
		 * [move description]
		 * @param  {[number]} top [description]
		 * @return {[type]}     [description]
		 */
		move : function(top){
			var that = this;
			var bodyH = this.cont.children().height();
			var winH = this.outerHeight;
			var scrollWrapH = this.options.scrollElex.find('.cxg-scroll-middle').height();
			var scrollH = this.scrollObj.height();
			var bodyTop = parseInt(top*(bodyH - winH)/(scrollWrapH-scrollH));
			this.cont.children().css({'margin-top':-bodyTop});
			this.scrollObj.css({top:top});

			//触发滚动到达某个位置回调事件
			if(this.options.scrollToBottomNum && typeof this.options.scrollToBottomCallback == 'function'){
				if((bodyH - winH) - bodyTop < this.options.scrollToBottomNum && !this.options.scrollToBottomFlag && !that.options.disabled){
					this.options.scrollToBottomCallback(this.options);	
				}
				
			}
			//滚动条滚动事件回调处理
			if(typeof this.options.scrollCallback == 'function'){
				this.options.scrollCallback(this.options);	
			}
		},

		/**
		 * [createScrollEle description] 创建滚动条元素对象
		 * @return {[object]} html [description] 返回滚动条元素对象
		 */
		createScrollEle : function(){
			var html = $('<div class="cxg-scroll-r"></div>').hide();
			var children = '<div class="cxg-scroll-top"><span data-action="up"></span></div><div class="cxg-scroll-middle"><div class="cxg-scroll-middle-c"><div class="cxg-scroll-middle-cont"></div></div></div><div class="cxg-scroll-bottom"><span data-action="down"></span></div>';
			
			//创建滚动条并设置外框样式
			html.append(children).css({width:this.options.scrollWrapWidth,height:this.outerHeight,background:this.options.scrollWrapBg});
			this.options.element.append(html);
			return html;
		},

		
		/**
		 * [upAnddwonCode description] 绑定点击上下滚动小icon按钮事件
		 * @return {[type]} [description]
		 */
		upAnddwonCode : function(){
			var icon = this.options.scrollElex.find('span');
			var that = this;
			var timeer = null;
			
			//点击事件
			icon.click(function(event) {
				var _that = $(this);
				var action = _that.attr('data-action');
				if(action == 'up') var num = 1;
				else if(action == 'down') var num = -1;
				var top = that.cont.children().height() - that.outerHeight;
				var marginTop = parseInt(that.cont.children().css('margin-top'));
				var step = parseInt(that.outerHeight - 30);

				//向上滚动到顶部处理
				if(num == 1 && Math.abs(marginTop) <= step) {
					marginTop = 0;	
				
				//向上滚动到底部处理
				}else if( num == -1 && Math.abs(marginTop) >= top-step){
					marginTop = -top;
				}else{
					marginTop = marginTop + num*step;	
				}
				that.upAnddwonMove(marginTop);
			});
		},

		/**
		 * [move description] 滚动移动操作
		 * @param  {[number]} num [description]
		 * @return {[type]}     [description]
		 */
		upAnddwonMove : function(num){
			var that = this;
			this.cont.children().css({'margin-top': num});
			var scrollObj = this.options.scrollElex.find('.cxg-scroll-middle-c');
			var scrollTop = this.options.scrollElex.find('.cxg-scroll-middle').height() - scrollObj.height();
			var box = this.cont.children();
			var boxTop = box.height() - this.outerHeight; 
			var top = Math.abs(parseInt(scrollTop*num/boxTop));
			var winH = $(window).height();
			scrollObj.css({'top': top});


			//触发滚动到达某个位置回调事件
			if(this.options.scrollToBottomNum && typeof this.options.scrollToBottomCallback == 'function'){
				if((box.height() - winH) - Math.abs(num) < this.options.scrollToBottomNum && !this.options.scrollToBottomFlag && !that.options.disabled){
					this.options.scrollToBottomCallback(this.options);	
				}
				
			}

			//滚动条滚动事件回调处理
			if(typeof this.options.scrollCallback == 'function'){
				this.options.scrollCallback(this.options);	
			}
		},


		/**
		 * [resize description] 页面发生变化绑定事件
		 * @return {[type]} [description]
		 */
		resize : function(){
			var that = this;
			var resizeTimeer = null;
			$(window).resize(function(e){
				if(resizeTimeer){
					 clearTimeout(resizeTimeer);
					 resizeTimeer = null;	
				}
				resizeTimeer = setTimeout(function(){
					that.setScrollEleCss();	
				},100);
			});
		}
	};


	
	/**
	 * [CXGResetScroll description] 对外接口
	 * @param {[type]} options [description] 选项卡
	 */
	CXGResetScroll = function(options){
		if(lastObj) lastObj = null;
		lastObj = new scrollFn(options);
		return lastObj
	}
})();







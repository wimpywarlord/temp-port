/*
 * Copyright (c) 2021 Marketify
 * Author: Marketify
 * This file is made for CURRENT THEME
*/


/*

	@Author: Marketify
	@URL: http://themeforest.net/user/marketify


	This file contains the jquery functions for the actual theme, this
	is the file you need to edit to change the structure of the
	theme.

	This files contents are outlined below.

*/


// All other theme functions
(function ($){

	"use strict";
	
    var TokyoInit 		= {
		
		
		
		pageNumber: 1,
		
        init: function () {
			this.cursor();
			this.blog_info();
			this.menuScroll();
			this.minHeightForPages();
			this.url_fixer();
			this.textSkin();
			this.projectCategoryFitler();
			this.portfolioFilter();
			this.hamburgerOpener__Mobile();
			this.submenu__Mobile();
			this.imgToSVG();
			this.isotopeMasonry();
			this.dataFnBgImg();
			this.estimateWidgetHeight();
			this.runPlayer();
			this.newPlayer();
			this.right_bar_opener();	
			this.categoryHook();	
			this.right_bar_height();
			this.toTopJumper();
			this.like();
			this.rating();
			this.recipe_video();
			this.search_opener();
			this.fixedTotopScroll();
			this.prev_next_posts();
			this.widget__pages();
			this.widget__archives();
			this.dataFnStyle();
			this.portfolioContentHeight();
			this.inputCheckBoxInComment();
			this.inlineStyle();
			this.tokyo_fn_fixedsub();
			this.tokyo_fn_fixedsubReCalc();
			this.projectHover();
        },
		
		blog_info: function(){
			if($('.blog_info').height() === 0){
				$('.tokyo_fn_comment').addClass('margin-no-top');
			}
			if($('.wp-calendar-nav').length){
				$('.wp-calendar-nav').each(function(){
					var e = $(this);
					if(!e.find('a').length){
						e.remove();
					}
				});
			}
		},
		
		projectPopup: function(){
			$('.tokyo_popup_gallery').each(function() { // the containers for all your galleries
				$(this).magnificPopup({
					delegate: 'a.zoom', // the selector for gallery item
					type: 'image',
					gallery: {
					  enabled:true
					},
					removalDelay: 300,
					mainClass: 'mfp-fade'
				});

			});
			$('.tokyo_popup_youtube, .tokyo_popup_vimeo').each(function() { // the containers for all your galleries
				$(this).magnificPopup({
					type: 'iframe',
					mainClass: 'mfp-fade',
					removalDelay: 160,
					preloader: false,
					fixedContentPos: false
				});
			});

			$('.tokyo_popup_soundcloude').each(function(){
				$(this).magnificPopup({
					type : 'image',
					gallery: {
						enabled: true, 
					},
				});	
			});
		},
		
		projectHover: function(){
			$('.tokyo_fn_ajax_portfolio .posts_list .item').on('mouseenter', function() {
				if ($(this).data('title')) {
					$('.tokyo_fn_portfolio_titles').html($(this).data('title') + '<span class="work__cat">' + $(this).data('category') + '</span>');
					$('.tokyo_fn_portfolio_titles').addClass('visible');
				}

				$(document).on('mousemove', function(e) {
					$('.tokyo_fn_portfolio_titles').css({
						left: e.clientX - 10,
						top: e.clientY + 25
					});
				});
			}).on('mouseleave', function() {
				$('.tokyo_fn_portfolio_titles').removeClass('visible');
			});
			this.projectPopup();
		},
		
		tokyo_fn_fixedsub: function(){
			var self				= this;
			var fixedsub 			= $('#tokyo_fn_fixedsub');
			var li					= $('ul.tokyo_fn_main_nav li');
			var leftpartW			= $('.tokyo_fn_header').outerWidth();
			var rightpart			= $('.tokyo_fn_pages, .tokyo_fn_header .fn_logo');
			var adminBar 			= 0;
			if($('body').hasClass('admin-bar')){
				adminBar  = 32;
			}
			
			fixedsub.css({left:leftpartW});


			li.on('mouseenter', function(){
				var parentLi 		= $(this);
				var subMenu			= parentLi.children('ul.sub-menu');
				var subMenuHtml 	= subMenu.html();
				//parentLi;
				if(subMenu.length){
					li.removeClass('hovered');
					parentLi.addClass('hovered').parent().addClass('hovered');
					fixedsub.removeClass('opened').children('ul').html('').html(subMenuHtml);
					fixedsub.addClass('opened');
				}else{
					fixedsub.removeClass('opened');
					parentLi.removeClass('hovered').parent().removeClass('hovered');
				}
				var topOffSet 		= parentLi.offset().top;
				var menuBar			= $('.tokyo_fn_header');
				var menuBarOffSet	= menuBar.offset().top;
				var asd				= topOffSet-menuBarOffSet+adminBar;
				leftpartW = $('.tokyo_fn_header').outerWidth();

				fixedsub.css({top:asd,left:leftpartW});
				abc();
			});
			function abc(){
				rightpart.on('mouseenter', function(){
					fixedsub.removeClass('opened');
					li.removeClass('hovered').parent().removeClass('hovered');
				});
			}
			abc();
		},
		tokyo_fn_fixedsubReCalc: function(){
			var fixedsub 	= $('#tokyo_fn_fixedsub');
			var leftpartW	= $('.tokyo_fn_header').outerWidth();
			fixedsub.css({left:leftpartW});
		},
		
		runPreloader: function(){
			var  speed = 500,self = this;
			setTimeout(function(){self.preloader();},speed);
		},
		
		preloader: function(){
			var isMobile 	= /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
			var preloader 	= $('.tokyo_fn_pageloader');
			if (!isMobile) {
				setTimeout(function() {
					preloader.addClass('fn_ready');
				}, 800);
				setTimeout(function() {
					preloader.remove();
				}, 2000);
			}else{
				preloader.remove();
			}
		},
		
		inlineStyle: function(){
			var s = '';
			$('.tokyo_fn_style').each(function(){
				var e = $(this), v = e.val(); e.val(''); s+= v;
			});
			$('body').append(s);
		},
		
		inputCheckBoxInComment: function(){
			if($('p.comment-form-cookies-consent input[type=checkbox]').length){
				$('p.comment-form-cookies-consent input[type=checkbox]').wrap('<label class="fn_checkbox"></label>').after('<span></span>');
			}
		},
		
		portfolioContentHeight: function(){
			var portfolio = $('.tokyo_fn_portfolio_page .portfolio_content');
			if(portfolio.height() === 0){
				portfolio.css({display: 'none'});
			}
		},
		
		dataFnStyle: function(){
			$('[data-fn-style]').each(function(){
				var el		= $(this);
				var s 		= el.attr('data-fn-style');
				$.each(s.split(';'),function(i,e){
					el.css(e.split(':')[0],e.split(':')[1]);
				});
			});
		},
		
		menuScroll: function(){
			var H 				= $(window).height(),
				header			= $('.tokyo_fn_header'),
				nav				= header.find('.header_nav'),
				logoH			= header.find('.fn_logo').outerHeight(true,true),
				searchH			= header.find('.search_wrap').outerHeight(true,true),
				copyH			= header.find('.header_copyright').outerHeight(true,true),
				adminBarH		= 0;
			if($('body').hasClass('admin-bar')){
				adminBarH	= 32;
			}
			nav.css({maxHeight: (H-logoH-searchH-copyH-adminBarH-100) + 'px'});
			if($().niceScroll){
				nav.getNiceScroll().remove();
				nav.niceScroll({
					touchbehavior: false,
					cursorwidth: 0,
					autohidemode: true,
					cursorborder: "0px solid #e5e5e5"
				});
			}
		},
		
		minHeightForPages: function(){
			var H 				= $(window).height(),
				W 				= $(window).width(),
				headerH 		= 0,
				mobileH 		= 0,
				adminBarH 		= 0,
				footerH 		= $('.tokyo_fn_footer').height(),
				mobile			= $('.tokyo_fn_mobilemenu_wrap'),
				header			= $('.tokyo_fn_header');
			if($('.tokyo-fn-wrapper').data('pos') === 'relative'){
				headerH 		= header.height();
			}
			if(mobile.css('display') !== 'none'){
				mobileH			= mobile.height();
				headerH			= 0;
			}
			if($('body').hasClass('admin-bar')){
				if(W<782){
					adminBarH	= 46;
				}else{
					adminBarH	= 32;
				}
			}
			$('.tokyo_fn_pages,.tokyo_fn_404').css({minHeight: (H-mobileH-headerH-footerH-adminBarH) + 'px'});	
		},
		
		url_fixer: function(){
			$('a[href*="fn_ex_link"]').each(function(){
				var oldUrl 	= $(this).attr('href'),
					array   = oldUrl.split('fn_ex_link/index.html'),
					newUrl  = TokyoAjaxObject.siteurl + "/" + array[1];
				$(this).attr('href', newUrl);
			});
		},
		
		textSkin: function(){
			$('body').addClass('fn__text_skin_'+$('.tokyo-fn-wrapper').data('text-skin'));
		},
		
		
		
		portfolioFilter: function(){
			var self					= this;
			$('.tokyo_fn_portfolio_page .fn_ajax_more a').off().on('click',function(){
				var thisButton 			= $(this);
				var more				= thisButton.closest('.fn_ajax_more');
				var input				= more.find('input');
				var abb					= thisButton.closest('.tokyo_fn_portfolio_page');
				var filter_page			= parseInt(input.val());
				if(thisButton.hasClass('active')){
					return false;
				}
				if(!abb.hasClass('go') && !more.hasClass('disabled')){
					abb.addClass('go');
					
					var requestData = {
						action: 'tokyo_fn_ajax_portfolio',
						filter_page: filter_page,
						security: TokyoAjaxObject.nonce
					};

					
					$.ajax({
						type: 'POST',
						url: TokyoAjaxObject.ajax_url,
						cache: false,
						data: requestData,
						success: function(data) {
							var fnQueriedObj 	= $.parseJSON(data);
							var html			= fnQueriedObj.data;
							var $grid			= abb.find('.posts_list');
							var $items;
							$items = $(html);
							input.val(filter_page+1);
							input.change();
							
							if(fnQueriedObj.disabled === 'disabled'){
								more.addClass('disabled');
							}
						 	$grid.append( $items ).isotope( 'appended', $items );
							setTimeout(function(){
								$grid.isotope({
									itemSelector: 'li',
									masonry: {},
									stagger: 30
								});
							},500);
							self.dataFnStyle();
							self.dataFnBgImg();
							self.projectHover();
							abb.removeClass('go');
						},
						error: function(xhr, textStatus, errorThrown){
							abb.removeClass('go');
						}
					});
				}
					
				
				return false;
			});	
		},
		
		projectCategoryFitler: function(){
			if($().isotope){
				var items = $('.tokyo_fn_ajax_portfolio');
				items.each(function() {
					var thisItem 	= $(this);
					var list 		= thisItem.find('.posts_list');
					var filter 		= thisItem.find('.posts_filter');
					
					list.isotope({
					  	itemSelector: 'li',
						masonry: {},
						stagger: 30
					});

					// Isotope Filter 
					filter.find('a').off().on('click', function() {
						var selector = $(this).attr('data-filter');
						list = thisItem.find('.posts_list');
						filter.find('a').removeClass('current');
						$(this).addClass('current');
						list.isotope({
							filter: selector,
							animationOptions: {
								duration: 750,
								easing: 'linear',
								queue: false
							}
						});
						return false;
					});

				});
			}
			
		},
		
		cursor: function () {
			var myCursor = $('.marketify-cursor');
			if (myCursor.length) {
				if ($("body").length) {
					const e = document.querySelector(".cursor-inner"),
						t = document.querySelector(".cursor-outer");
					var n, i = 0,W = 0,intro = 0,
						o = !1;
					if($('.tokyo_fn_intro').length){intro=1;}
					
					var buttons = "fn_cs_intro_testimonials .prev, .fn_cs_intro_testimonials .next, .fn_cs_swiper_nav_next, .fn_cs_swiper_nav_prev, .fn_dots, .swiper-button-prev, .swiper-button-next, .fn_cs_accordion .acc_head, .tokyo_fn_popupshare .share_closer, .tokyo_fn_header .fn_finder, .tokyo_fn_header .fn_trigger, a, input[type='submit'], .cursor-link, button";
					var sliders = ".owl-carousel, .swiper-container, .cursor-link";
					// link mouse enter + move
					window.onmousemove = function(s) {
						o || (t.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)"), e.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)", n = s.clientY, i = s.clientX
					}, $("body").on("mouseenter", buttons, function() {
						e.classList.add("cursor-hover"), t.classList.add("cursor-hover")
					}), $("body").on("mouseleave", buttons, function() {
						$(this).is("a") && $(this).closest(".cursor-link").length || (e.classList.remove("cursor-hover"), t.classList.remove("cursor-hover"))
					}), e.style.visibility = "visible", t.style.visibility = "visible";
					
					
					// Intro functions
					var intro_left 	= '.tokyo_fn_intro .left';
					var intro_right = '.tokyo_fn_intro .right';
					var intro_price = '.tokyo_fn_intro_fixed_price .anim';
					$('body').on('mouseenter', intro_left, function(){
						e.classList.add('left-demo');
						t.classList.add('left-demo');
					}).on('mouseleave', intro_left,function(){
						e.classList.remove('left-demo');
						t.classList.remove('left-demo');
					});
					$('body').on('mouseenter', intro_right, function(){
						e.classList.add('right-demo');
						t.classList.add('right-demo');
					}).on('mouseleave', intro_right,function(){
						e.classList.remove('right-demo');
						t.classList.remove('right-demo');
					});
					$('body').on('mouseenter', intro_price, function(){
						e.classList.add('intro-price');
						t.classList.add('intro-price');
					}).on('mouseleave', intro_price,function(){
						e.classList.remove('intro-price');
						t.classList.remove('intro-price');
					});
					
					// slider mouse enter
					$('body').on('mouseenter', sliders, function(){
						e.classList.add('cursor-slider');
						t.classList.add('cursor-slider');
					}).on('mouseleave', sliders,function(){
						e.classList.remove('cursor-slider');
						t.classList.remove('cursor-slider');
					});
					
					// slider mouse hold
					$('body').on('mousedown', sliders, function(){
						e.classList.add('mouse-down');
						t.classList.add('mouse-down');
					}).on('mouseup', sliders, function(){
						e.classList.remove('mouse-down');
						t.classList.remove('mouse-down');
					});
				}
			}
		},
		
		widget__archives: function(){
			$('.widget_archive li').each(function(){
				var e = $(this);
				var a = e.find('a').clone();
				$('body').append('<div class="marketify_hidden_item"></div>');
				$('.marketify_hidden_item').html(e.html());
				$('.marketify_hidden_item').find('a').remove();
				var suffix = $('.marketify_hidden_item').html().match(/\d+/); // 123456
				$('.marketify_hidden_item').remove();
				suffix = parseInt(suffix);
				if(isNaN(suffix)){
					return false;
				}
				suffix = '<span class="count">'+suffix+'</span>';
				e.html(a);
				e.append(suffix);
			});
		},
		
		prev_next_posts: function(){
			if($('.tokyo_fn_siblings')){
				$(document).keyup(function(e) {
					if(e.key.toLowerCase() === 'p') {
						var a = $('.tokyo_fn_siblings').find('a.previous_project_link');
						if(a.length){
							window.location.href = a.attr('href');
							return false;
						}
					}
					if(e.key.toLowerCase() === 'n') {
						var b = $('.tokyo_fn_siblings').find('a.next_project_link');
						if(b.length){
							window.location.href = b.attr('href');
							return false;
						}
					}
				});
			}
		},
		
		fixedTotopScroll: function(){
			var totop			= $('.tokyo_fn_totop');
			var height 			= parseInt(totop.find('input').val());
			if(totop.length){
				if($(window).scrollTop() > height){
					totop.addClass('scrolled');
				}else{
					totop.removeClass('scrolled');
				}
			}
		},
		
		search_placeholder: function(searchinput,text,i,speed){
			setTimeout(function(){
				searchinput.attr('placeholder',text);
			},i*speed);
		},
		
		search_opener: function(){
			var self		= this;
			var speed		= 10;
			var searchbox 	= $('.tokyo_fn_searchpopup');
			var opener 		= $('.tokyo_fn_header .fn_finder');
			var searchinput = $('.tokyo_fn_searchpopup input[type=text]');
			if(opener.length){
				opener.off().on('click',function(){
					if($('body').hasClass('open_search_popup')){
						searchbox.removeClass('focused');
						$('body').removeClass('open_search_popup');
					}else{
						var placeholder = searchinput.attr('placeholder');
						searchinput.attr('placeholder','');
						var array 		= placeholder.split('');
						$('body').addClass('open_search_popup');
						setTimeout(function(){
							var text = '';
							for(var i=0;i<array.length;i++){
								text+= array[i];
								self.search_placeholder(searchinput,text,i,speed);
							}
							setTimeout(function(){
								searchinput.focus();
								searchinput.trigger('click');
							},speed*array.length);
						},500);
					}
					return false;
				});
			}
			if(searchbox.length){
				var closer  	= searchbox.find('.search_closer,.extra_closer');
				var inputText  	= searchbox.find('input[type=text]');
				var inputSubmit	= searchbox.find('input[type=submit]');
				searchbox.find('.search_inner').off().on('click',function(){
					searchbox.removeClass('focused');
				});
				inputText.off().on('click',function(event){
					searchbox.addClass('focused');
					event.stopPropagation();
				});
				inputSubmit.off().on('click',function(event){
					event.stopPropagation();
				});
				closer.off().on('click',function(event){
					event.stopPropagation();
					searchbox.removeClass('focused');
					$('body').removeClass('open_search_popup');
					closer.addClass('closed');
					setTimeout(function(){
						closer.removeClass('closed');
					},500);
				});
			}	
		},
		
		right_bar_opener: function(){
			var hamburger 	= $('.tokyo_fn_header .fn_trigger');hamburger.addClass('ready');
			var trigger 	= $('.tokyo_fn_right_panel .extra_closer, .tokyo_fn_right_panel .fn_closer');
			trigger.off().on('click',function(){
				$('body').toggleClass('fn_opened');
				return false;
			});
			hamburger.on('click',function(){
				$('body').addClass('fn_opened');
				return false;
			});
			var i = null;
			hamburger.on('mouseenter',function(){
				i = setTimeout(function(){
					$('body').addClass('fn_opened');
				},700);
			}).on('mouseleave',function(){
				clearTimeout(i);
			});
		},
		
		categoryHook: function(){
			var self = this;
			var list = $('.wp-block-archives li, .widget_tokyo_custom_categories li, .widget_categories li, .widget_archive li');
			list.each(function(){
				var item = $(this);
				if(item.find('ul').length){
					item.addClass('has-child');
				}
			});
			
			
			var html = $('.tokyo_fn_hidden.more_cats').html();
			var cats = $('.widget_categories,.widget_archive,.widget_tokyo_custom_categories');
			if(cats.length){
				cats.each(function(){
					var element = $(this);
					var limit	= 3;
					element.append(html);
					var li = element.find('ul:not(.children) > li');
					if(li.length > limit){
						var h = 0;
						li.each(function(i,e){
							if(i < limit){
								h += $(e).outerHeight(true,true);
							}else{
								return false;
							}
						});
						element.find('ul:not(.children)').css({height: h + 'px'});
						element.find('.tokyo_fn_more_categories .fn_count').html('('+(li.length-limit)+')');
					}else{
						element.addClass('all_active');
					}
				});
				self.categoryHookAction();
			}
		},
		
		categoryHookAction: function(){
			var self			= this;
			$('.tokyo_fn_more_categories').find('a').off().on('click',function(){
				var e 			= $(this);
				var limit		= 3;
				var myLimit		= limit;
				var parent 		= e.closest('.widget_block');
				var li 			= parent.find('ul:not(.children) > li');
				var liHeight	= li.outerHeight(true,true);
				var h			= liHeight*limit;
				var liLength	= li.length;
				var speed		= (liLength-limit)*50;
				e.toggleClass('show');
				if(e.hasClass('show')){
					myLimit		= liLength;
					h			= liHeight*liLength;
					e.find('.text').html(e.data('less'));
					e.find('.fn_count').html('');
				}else{
					e.find('.text').html(e.data('more'));
					e.find('.fn_count').html('('+(liLength-limit)+')');
				}
				
				
				var H = 0;
				li.each(function(i,e){
					if(i < myLimit){
						H += $(e).outerHeight(true,true);
					}else{
						return false;
					}
				});
				
				speed = (speed > 300) ? speed : 300;
				speed = (speed < 1500) ? speed : 1500;
				parent.find('ul:not(.children)').animate({height:H},speed);
				
				setTimeout(function(){
					self.right_bar_height();
				},(speed+1));
				
				
				return false;
			});
		},
		
		recipe_video: function(){
			$('.tokyo_fn_single_recipe .popup-youtube').each(function() { // the containers for all your galleries
				$(this).magnificPopup({
					disableOn: 700,
					type: 'iframe',
					mainClass: 'mfp-fade',
					removalDelay: 160,
					preloader: false,
					fixedContentPos: false
				});
			});
		},
		
		rating: function(){
			var radio 	= $('.comments-rating input[type="radio"]');
			radio.on('click',function(){
				var el 	= $(this);
				var id	= el.attr('id');
				$('.comments-rating .fn_radio').removeClass('clicked');
				$('.comments-rating .'+id).addClass('clicked');
		 	}).on('mouseenter',function(){
				var el 	= $(this);
				var id	= el.attr('id');
				$('.comments-rating .fn_radio').removeClass('hovered');
				$('.comments-rating .'+id).addClass('hovered');
		 	}).on('mouseleave',function(){
				$('.comments-rating .fn_radio').removeClass('hovered');
		 	});
		},
		
		
		
		
		
		
		
		right_bar_height: function(){
			var H		= $(window).height(),
				bar		= $('.tokyo_fn_popup_sidebar'),
				inner	= bar.find('.sidebar_wrapper');
			bar.height(H + 'px');
			if($().niceScroll){
				inner.getNiceScroll().remove();
				inner.height('100%').niceScroll({
					touchbehavior: false,
					cursorwidth: 0,
					autohidemode: true,
					cursorborder: "0px solid #e5e5e5"
				});
			}
		},
		
		
		toTopJumper: function(){
			var totop		= $('.tokyo_fn_footer .footer_totop a,a.tokyo_fn_totop,.tokyo_fn_footer .footer_right_totop a');
			if(totop.length){
				totop.on('click', function(e) {
					e.preventDefault();		
					$("html, body").animate(
						{ scrollTop: 0 }, 'slow');
					return false;
				});
			}
		},
		
		
		
		runPlayer: function(){
			var parent		= $('.tokyo_fn_main_audio');
			var audioVideo 	= parent.find('audio,video');
			audioVideo.each(function(){
				var element = $(this);
				element.mediaelementplayer({
					// Do not forget to put a final slash (/)
					pluginPath: 'https://cdnjs.com/libraries/mediaelement/',
					// this will allow the CDN to use Flash without restrictions
					// (by default, this is set as `sameDomain`)
					shimScriptAccess: 'always',
					success: function(mediaElement, domObject) {
						mediaElement.addEventListener('play', function() {
							parent.removeClass('fn_pause').addClass('fn_play');
						}, false);
						mediaElement.addEventListener('pause', function() {
							parent.removeClass('fn_play').addClass('fn_pause');
						}, false);
					},
				});
			});
		},
		
		newPlayer: function(){
			var parent		= $('.tokyo_fn_main_audio');
			var closer 	  	= parent.find('.fn_closer');
			var audioVideo 	= parent.find('audio,video');
			var icon 		= parent.find('.podcast_icon');
			var audios		= $('.tokyo_fn_audio_button');
			var playButton	= $('.tokyo_fn_audio_button a');
			var self		= this;
			audioVideo.each(function(){
				var element = $(this);
				element.mediaelementplayer({
					// Do not forget to put a final slash (/)
					pluginPath: 'https://cdnjs.com/libraries/mediaelement/',
					// this will allow the CDN to use Flash without restrictions
					// (by default, this is set as `sameDomain`)
					shimScriptAccess: 'always',
					success: function(mediaElement, domObject) {
						mediaElement.addEventListener('pause', function() {
							parent.removeClass('fn_play').addClass('fn_pause');
						}, false);
						mediaElement.addEventListener('play', function() {
							parent.removeClass('fn_pause').addClass('fn_play');
						}, false);
					},
				});
			});
			closer.off().on('click', function(){
				if(parent.hasClass('closed')){
					parent.removeClass('closed');
					closer.find('span').html(closer.attr('data-close-text'));
				}else{
					parent.addClass('closed');
					closer.find('span').html(closer.attr('data-open-text'));
				}
			});
			icon.off().on('click', function(){
				if(parent.find('audio,video').length){
					if(parent.hasClass('fn_pause')){
						parent.removeClass('fn_pause').addClass('fn_play').find('audio,video')[0].play();
					}else{
						parent.removeClass('fn_play').addClass('fn_pause').find('audio,video')[0].pause();
					}
				}
			});
			playButton.off().on('click',function(){
				var button		= $(this);
				var wrapper		= button.parent();
				if(!wrapper.hasClass('active')){
					audios.removeClass('active fn_play fn_pause');
					wrapper.addClass('active');
				}
				if(wrapper.hasClass('fn_pause')){
					wrapper.removeClass('fn_pause').addClass('fn_play');
					parent.find('audio,video')[0].play();
				}else if(wrapper.hasClass('fn_play')){
					wrapper.removeClass('fn_play').addClass('fn_pause');
					parent.find('audio,video')[0].pause();
				}else{
					wrapper.addClass('fn_play');
					var src			= wrapper.attr('data-mp3');
					var audio	 	= '<audio controls><source src="'+src+'" type="audio/mpeg"></audio>';
					$('.tokyo_fn_main_audio .audio_player').html(audio);
					self.runPlayer();
					setTimeout(function(){
						parent.find('audio,video')[0].play();
						parent.removeClass('fn_pause').addClass('fn_play');
						parent.removeClass('closed');
						closer.find('span').html(closer.attr('data-close-text'));
						self.playerSpace();
					},50);
				}
				
				return false;
			});
		},
		
		
		widget__pages: function(){
			var nav 						= $('.widget_pages ul');
			nav.each(function(){
				$(this).find('a').off().on('click', function(e){
					var element 			= $(this);
					var parentItem			= element.parent('li');
					var parentItems			= element.parents('li');
					var parentUls			= parentItem.parents('ul.children');
					var subMenu				= element.next();
					var allSubMenusParents 	= nav.find('li');

					allSubMenusParents.removeClass('opened');

					if(subMenu.length){
						e.preventDefault();

						if(!(subMenu.parent('li').hasClass('active'))){
							if(!(parentItems.hasClass('opened'))){parentItems.addClass('opened');}

							allSubMenusParents.each(function(){
								var el = $(this);
								if(!el.hasClass('opened')){el.find('ul.children').slideUp();}
							});

							allSubMenusParents.removeClass('active');
							parentUls.parent('li').addClass('active');
							subMenu.parent('li').addClass('active');
							subMenu.slideDown();


						}else{
							subMenu.parent('li').removeClass('active');
							subMenu.slideUp();
						}
						return false;
					}
				});
			});
		},
		
		submenu__Mobile: function(){
			var nav 						= $('ul.vert_menu_list, .widget_nav_menu ul.menu');
			var mobileAutoCollapse			= $('.tokyo-fn-wrapper').data('mobile-autocollapse');
			nav.each(function(){
				$(this).find('a').off().on('click', function(e){
					var element 			= $(this);
					var parentItem			= element.parent('li');
					var parentItems			= element.parents('li');
					var parentUls			= parentItem.parents('ul.sub-menu');
					var subMenu				= element.next();
					var allSubMenusParents 	= nav.find('li');

					allSubMenusParents.removeClass('opened');

					if(subMenu.length){
						e.preventDefault();

						if(!(subMenu.parent('li').hasClass('active'))){
							if(!(parentItems.hasClass('opened'))){parentItems.addClass('opened');}

							allSubMenusParents.each(function(){
								var el = $(this);
								if(!el.hasClass('opened')){el.find('ul.sub-menu').slideUp();}
							});

							allSubMenusParents.removeClass('active');
							parentUls.parent('li').addClass('active');
							subMenu.parent('li').addClass('active');
							subMenu.slideDown();


						}else{
							subMenu.parent('li').removeClass('active');
							subMenu.slideUp();
						}
						return false;
					}
					if(mobileAutoCollapse === 'enable'){
						if(nav.parent().parent().hasClass('opened')){
							nav.parent().parent().removeClass('opened').slideUp();
							$('.tokyo_fn_mobilemenu_wrap .hamburger').removeClass('is-active');
						}
					}
				});
			});
		},
		
		hamburgerOpener__Mobile: function(){
			var hamburger		= $('.tokyo_fn_mobilemenu_wrap .hamburger');
			hamburger.off().on('click',function(){
				var element 	= $(this);
				var menupart	= $('.tokyo_fn_mobilemenu_wrap .mobilemenu');
				if(element.hasClass('is-active')){
					element.removeClass('is-active');
					menupart.removeClass('opened');
					menupart.slideUp(500);
				}else{
					element.addClass('is-active');
					menupart.addClass('opened');
					menupart.slideDown(500);
				}return false;
			});
		},
		
		like: function(){
			var svg;
			var self	= this;
			if($('.tokyo-fn-wrapper').length){
				svg = $('.tokyo-fn-wrapper').data('like-url');
			}
			var ajaxRunningForLike = false;
			$('.tokyo_fn_like').off().on('click', function(e) {
				e.preventDefault();

				var likeLink 		= $(this),
					ID 				= $(this).data('id'),
					likeAction,addAction;
				
				likeLink 			= $('.tokyo_fn_like[data-id="'+ID+'"]');

				if(ajaxRunningForLike === true) {return false;}
				
				if(likeLink.hasClass('liked')){
					likeAction 		= 'liked';
					addAction		= 'not-rated';
				}else{
					likeAction 		= 'not-rated';
					addAction		= 'liked';
				}
				ajaxRunningForLike 	= true;
				
				var requestData 	= {
					action: 'tokyo_fn_like', 
					ID: ID,
					likeAction: likeAction,
					security: TokyoAjaxObject.nonce
				};
				
				$.ajax({
					type: 'POST',
					url: TokyoAjaxObject.ajax_url,
					cache: false,
					data: requestData,
					success: function(data) {
						var fnQueriedObj 	= $.parseJSON(data); //get the data object
						likeLink.removeClass('animate ' + likeAction).addClass(addAction);
						likeLink.find('.tokyo_w_fn_svg').remove();
						likeLink.find('.tokyo_fn_like_count').before('<img src="'+fnQueriedObj.svg+'" class="tokyo_w_fn_svg" alt="" />');
						self.imgToSVG();
						likeLink.find('.count').html(fnQueriedObj.count);
						likeLink.find('.text').html(fnQueriedObj.like_text);
						likeLink.attr('title',fnQueriedObj.title);
						likeLink.addClass('animate');
						ajaxRunningForLike = false;
					},
					error: function(MLHttpRequest, textStatus, errorThrown) {
						console.log(MLHttpRequest);
						console.log(textStatus);
						console.log(errorThrown);
					}
				});	

				return false;
			});
		},
		
		
		imgToSVG: function(){
			$('img.tokyo_fn_svg,img.tokyo_w_fn_svg').each(function(){
				var img 		= $(this);
				var imgClass	= img.attr('class');
				var imgURL		= img.attr('src');

				$.get(imgURL, function(data) {
					var svg 	= $(data).find('svg');
					if(typeof imgClass !== 'undefined') {
						svg 	= svg.attr('class', imgClass+' replaced-svg');
					}
					img.replaceWith(svg);

				}, 'xml');

			});	
		},
		
		
		dataFnBgImg: function(){
			var bgImage 	= $('*[data-fn-bg-img]');
			bgImage.each(function(){
				var element = $(this);
				var attrBg	= element.attr('data-fn-bg-img');
				var bgImg	= element.data('fn-bg-img');
				if(typeof(attrBg) !== 'undefined'){
					element.addClass('marketify-ready').css({backgroundImage:'url('+bgImg+')'});
				}
			});
		},
		
		isotopeMasonry: function(){
			var masonry = $('.tokyo_fn_masonry');
			if($().isotope){
				masonry.each(function(){
					$(this).isotope({
						itemSelector: '.tokyo_fn_masonry_in',
						masonry: {}
					});
				});
			}
		},
		
		estimateWidgetHeight: function(){
			var est 	= $('.tokyo_fn_widget_estimate');
			est.each(function(){
				var el 	= $(this);
				var h1 	= el.find('.helper1');
				var h2 	= el.find('.helper2');
				var h3 	= el.find('.helper3');
				var h4 	= el.find('.helper4');
				var h5 	= el.find('.helper5');
				var h6 	= el.find('.helper6');
				var eW 	= el.outerWidth();
				var w1 	= Math.floor((eW * 80) / 300);
				var w2 	= eW-w1;
				var e1 	= Math.floor((w1 * 55) / 80);
				h1.css({borderLeftWidth:	w1+'px', borderTopWidth: e1+'px'});
				h2.css({borderRightWidth:	w2+'px', borderTopWidth: e1+'px'});
				h3.css({borderLeftWidth:	w1+'px', borderTopWidth: w1+'px'});
				h4.css({borderRightWidth:	w2+'px', borderTopWidth: w1+'px'});
				h5.css({borderLeftWidth:	w1+'px', borderTopWidth: w1+'px'});
				h6.css({borderRightWidth:	w2+'px', borderTopWidth: w1+'px'});
			});
		},
    };
	
	
	
	// ready functions
	$(document).ready(function(){
		TokyoInit.init();
	});
	
	// resize functions
	$(window).on('resize',function(e){
		e.preventDefault();
		TokyoInit.tokyo_fn_fixedsubReCalc();
		TokyoInit.menuScroll();
		TokyoInit.isotopeMasonry();
		TokyoInit.projectCategoryFitler();
		TokyoInit.right_bar_height();
		TokyoInit.estimateWidgetHeight();
	});
	
	// scroll functions
	$(window).on('scroll', function(e) {
		e.preventDefault();
		TokyoInit.fixedTotopScroll();
    });
	
	// load functions
	$(window).on('load', function(e) {
		e.preventDefault();
		TokyoInit.isotopeMasonry();
		TokyoInit.projectCategoryFitler();
		setTimeout(function(){
			TokyoInit.isotopeMasonry();
			TokyoInit.projectCategoryFitler();
		},100);
	});
	$(window).load('body', function(){
		TokyoInit.runPreloader();
	});
	
})(jQuery);
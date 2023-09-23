(function($, fnFrontend){
	"use strict";
	
	
	
	var MarketifyTokyo = {
		
		isAdmin: false,
		adminBarH: 0,
		
		init: function() {
			
			if($('body').hasClass('admin-bar')){
				MarketifyTokyo.isAdmin 		= true;
				MarketifyTokyo.adminBarH 	= $('#wpadminbar').height();
			}

			var widgets = {
				'frel-gallery.default' : MarketifyTokyo.allGalleryFunctions,
				'frel-numbered-list.default' : MarketifyTokyo.fn_service_functions,
				'frel-accordion.default' : MarketifyTokyo.accordionFunction,
				'frel-partners.default' : MarketifyTokyo.partners,
				'frel-testimonials.default' : MarketifyTokyo.testimonials,
				'frel-progress-bar.default' : MarketifyTokyo.progress,
				'frel-after-before.default' : MarketifyTokyo.imageAfterBefore,
				'frel-countdown.default' : MarketifyTokyo.countdown,
				'frel-circular-progress.default' : MarketifyTokyo.circularProgress,
				'frel-boxed-counter.default' : MarketifyTokyo.fn_cs_counter,
				'frel-social-list.default' : MarketifyTokyo.ImgToSVG,
			};

			$.each( widgets, function( widget, callback ) {
				fnFrontend.hooks.addAction( 'frontend/element_ready/' + widget, callback );
			});
		},
		
		fn_service_functions: function(){
			MarketifyTokyo.fn_modalbox();
			MarketifyTokyo.fn_modalbox_service();
			MarketifyTokyo.ImgToSVG();
		},
		
		fn_modalbox:function(){
			if(!$('.fn_modalbox').length){
				$('.tokyo-fn-wrapper').prepend('<div class="fn_modalbox"><div class="box_inner"><div class="close"><a href="#"></a></div><div class="description_wrap"></div></div></div>');
				$('.fn_modalbox .close a').html($('.fn_cs_numbered_list .hidden_icon').html());
			}
				
		},
		
		fn_modalbox_service:function(){
			var modalBox		= $('.fn_modalbox');
			var button			= $('.fn_cs_numbered_list .fn_full_link');
			var closePopup		= modalBox.find('.close');

			button.on('click',function(){
				var element = $(this);
				var parent	= element.closest('.list_inner');
				var content = parent.find('.service_hidden_details').html();
				modalBox.addClass('opened');
				modalBox.find('.description_wrap').html(content);
				MarketifyTokyo.BgImg();
				return false;
			});
			closePopup.on('click',function(){
				modalBox.removeClass('opened');
				modalBox.find('.description_wrap').html('');
				return false;
			});	
		},
		
		fn_cs_counter: function(){
			var element = $('.fn_cs_counter');
			element.each(function() {
				var el = $(this);
				el.waypoint({
					handler: function(){
						if(!el.hasClass('stop')){
							el.addClass('stop').countTo({
								refreshInterval: 50,
								formatter: function (value, options) {
									return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
								},	
							});
						}
					},
					offset:'90%'	
				});
			});	
		},
		
		inlineStyle: function(){
			var style = '';
			$('.tokyo_fn_style').each(function(){
				var element = $(this),
					value	= element.val();
				element.val('');
				style += value;
			});
			$('body').append(style);
		},
		
		circularProgress: function(){
			$('.fn_cs_circular_progress').each(function () {
				var element		= $(this);
				var elementPos 	= element.offset().top;
				var topOfWindow = $(window).scrollTop();
				var circle	 	= element.find('.fn_circle');
				
				var percent 	= element.attr('data-percent');
				var overlay 	= element.attr('data-overlay');
				var gradient1 	= element.attr('data-gradient1');
				var gradient2 	= element.attr('data-gradient2');
				var color 		= element.attr('data-color');
				var width 		= element.attr('data-width');
				var thickness	= element.attr('data-thickness');
				var animate 	= element.data('animate');
				
				if (elementPos < topOfWindow + $(window).height() - 30 && !animate) {
					element.data('animate', true);
					var objectOptions = {};
					objectOptions.startAngle = -Math.PI / 2;
					objectOptions.value = percent / 100;
					objectOptions.size = width;
					objectOptions.thickness = thickness;
					objectOptions.emptyFill = "rgba(0,0,0,0)";
					if(overlay === 'gradient'){
						objectOptions.fill = {gradient: [gradient2,gradient1]};
					}else if(overlay === 'color'){
						objectOptions.fill = {color: color};
					}
					circle.circleProgress(objectOptions).on('circle-animation-progress', function (event, progress, stepValue) {
						circle.find('.fn_number').text((stepValue*100).toFixed(0));
					}).stop();
				}
			});
		},
		
		countdown: function(){
			$('.fn_cs_countdown').each(function(){
				var e 	= $(this),
					t 	= e.data('type'),
					dd 	= e.data('due-date');
				if(!e.hasClass('ready')){e.addClass('ready');
					if(t === 'date'){
						var countDownDate 	= new Date( dd );
						var x 				= setInterval(function() {
						  	var now 		= new Date().getTime();
						 	var distance 	= countDownDate - now;
						  	var days 		= Math.floor(distance / 86400000);
							var hours 		= Math.floor((distance % 86400000) / 3600000);
							var minutes 	= Math.floor((distance % 3600000) / 60000);
						  	var seconds 	= Math.floor((distance % 60000) / 1000);
							if(parseInt(days) === 0){
								e.find('.day_item').addClass('expired');
							}
							days			= (days < 10 && days > 0) ? '0' + days : days;
							hours			= (hours < 10 && hours > 0) ? '0' + hours : hours;
							minutes 		= (minutes < 10 && minutes > 0) ? '0' + minutes : minutes;
							seconds 		= (seconds < 10 && seconds > 0) ? '0' + seconds : seconds;
							e.find('.day_item h3').text(days);
							e.find('.hour_item h3').text(hours);
							e.find('.minute_item h3').text(minutes);
							e.find('.second_item h3').text(seconds);

						  	// If the count down is finished, write some text
							if (distance < 0) {
//								clearInterval(x);
							}
						}, 1000);
					}else if(t === 'ever'){
						var ever 			= e.data('ever');
						var y 				= setInterval(function(){
							var days 		= Math.floor(ever / 86400);
							var hours 		= Math.floor((ever % 86400) / 3600);
							var minutes 	= Math.floor((ever % 3600) / 60);
							var seconds 	= Math.floor((ever % 60));
							if(days == 0){
								e.find('.day_item').addClass('expired');
							}
							days			= (days < 10) ? '0' + days : days;
							hours			= (hours < 10) ? '0' + hours : hours;
							minutes 		= (minutes < 10) ? '0' + minutes : minutes;
							seconds 		= (seconds < 10) ? '0' + seconds : seconds;
							e.find('.day_item h3').text(days);
							e.find('.hour_item h3').text(hours);
							e.find('.minute_item h3').text(minutes);
							e.find('.second_item h3').text(seconds);
							ever			= ever - 1;
							if(ever < 0){
//								clearInterval(y);
							}
						}, 1000);
					}
				}
					
			});
		},
		
		
		imageAfterBefore: function(){
			$('.fn_cs_after_before').each(function(){
				var count 		= 0;
				var wrapper		= $(this);
				var container	= wrapper.find('.compare_container');
				var firstImage	= container.find('img:nth-child(1)');
				var firstURL	= firstImage.attr('src');
				var secondImage	= container.find('img:nth-child(2)');
				var secondURL	= secondImage.attr('src');
				firstImage.attr('src', firstURL).load(function() {
					count++;
					MarketifyTokyo.checkItForImageAfterBefore(count,wrapper);
				});
				secondImage.attr('src', secondURL).load(function() {
					count++;
					MarketifyTokyo.checkItForImageAfterBefore(count,wrapper);
				});
			});
		},
		
		checkItForImageAfterBefore: function(count,wrapper){
			if(count === 2){
				var ID 			= MarketifyTokyo.ID(),
					container 	= wrapper.find('.compare_container'),
					href1 		= container.find('img:nth-child(1)').attr('src'),
					href2 		= container.find('img:nth-child(2)').attr('src'),
					label1 		= container.data('label1'),
					label2 		= container.data('label2');
				container.parent().html('').attr('id',ID);
				var slider  	= new juxtapose.JXSlider('#'+ID,
					[
						{
							src: href1,
							label: label1,
							credit: 'Image Credit'
						},
						{
							src: href2,
							label: label2,
							credit: "Image Credit"
						}
					],
					{
						animate: true,
						showLabels: true,
						showCredits: true,
						startingPosition: "50%",
						makeResponsive: true
					});
			}
		},
		
		ID: function () {
		  // Math.random should be unique because of its seeding algorithm.
		  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
		  // after the decimal.
		  return 'marketify_' + Math.random().toString(36).substr(2, 9);
		},
		
		swiper: function(){
		  	MarketifyTokyo.BgImg();
			$('.fn_cs_testimonials .r_list, .fn_cs_triple_portfolio .r_list').each(function(){
				if($(this).hasClass('gogogo')){return false;}$(this).addClass('gogogo');
				var element 	= $(this);
				var container 	= element.find('.swiper-container');
				var mySwiper 	= new Swiper (container, {
					loop: true,
					slidesPerView: 3,
					spaceBetween: 45,
					speed: 1000,
					loopAdditionalSlides: 10,
					autoplay: {
						delay: 7000
					},
					on: {
						autoplayStop: function(){
							mySwiper.autoplay.start();
						},
						slideChange: function () {
							MarketifyTokyo.ImgToSVG();
							MarketifyTokyo.teamMemberPopup();
						},
					},
					pagination: {
						el: '.fn_cs_swiper__progress',
						type: 'custom', // progressbar
						renderCustom: function (swiper,current,total) {

							// opacity 
							var index 		= current - 1;
							var activeSlide = container.find('.swiper-slide[data-swiper-slide-index="'+index+'"]');
							container.find('.r_item').removeClass('fn_vision');
							activeSlide.find('.r_item').addClass('fn_vision');
							activeSlide.next().find('.r_item').addClass('fn_vision');
							activeSlide.next().next().find('.r_item').addClass('fn_vision');



							// progress animation
							var scale,translateX;
							var progressDOM	= container.find('.fn_cs_swiper__progress');
							if(progressDOM.hasClass('fill')){
								translateX 	= '0px';
								scale		= parseInt((current/total)*100)/100;
							}else{
								scale 		= parseInt((1/total)*100)/100;
								translateX 	= (current-1) * parseInt((100/total)*100)/100 + 'px';
							}


							progressDOM.find('.all span').css({transform:'translate3d('+translateX+',0px,0px) scaleX('+scale+') scaleY(1)'});
							if(current<10){current = '0' + current;}
							if(total<10){total = '0' + total;}
							progressDOM.find('.current').html(current);
							progressDOM.find('.total').html(total);
						}
					},
					breakpoints: {
						0: {
							slidesPerView: 1,
							spaceBetween: 0,
						},
						700: {
							slidesPerView: 2,
							spaceBetween: 20,
						},
						1200: {
							slidesPerView: 3,
							spaceBetween: 45
						}
					}
				});
			});
			MarketifyTokyo.ImgToSVG();
		},
		
		
		
		pricingFunctions: function(){
			MarketifyTokyo.ImgToSVG();
			$('.fn_cs_pricing_switcher input').on('click',function(){
				$(this).closest('.fn_cs_pricing').find('.fn_column').toggleClass('active');
			});
		},
		
		progress: function(){
			$('.fn_cs_progress_wrap').each(function() {
				var pWrap 	= $(this);
				pWrap.waypoint({handler: function(){MarketifyTokyo.progressF(pWrap);},offset:'90%'});
			});	
		},
		
		progressF: function(container){
			container.find('.fn_cs_progress').each(function(i) {
				var progress 	= $(this);
				var pValue 		= parseInt(progress.data('value'));
				var pBarWrap 	= progress.find('.fn_cs_bar_wrap');
				var pBar 		= progress.find('.fn_cs_bar');
				pBar.css({width:pValue+'%'});
				setTimeout(function(){pBarWrap.addClass('open');},(i*500));
			});	
		},
		
		partners: function(){
			var carousel 	= $('.fn_cs_partners .owl-carousel');
			var rtlMode		= false;
			if($('body').hasClass('rtl')){
				rtlMode		= true;
			}
			carousel.each(function(){
				$(this).owlCarousel({
					loop: true,
					rtl: rtlMode,
					items: 4,
					lazyLoad: true,
					margin: 40,
					autoplay: true,
					autoplayTimeout: 4000,
					smartSpeed: 2000,
					dots: false,
					nav: false,
					navSpeed: true,
					responsive:{
						0:{items:1},
						480:{items:2},
						768:{items:3},
						1040:{items:4},
						1400:{items:4},
					}
				});	
			});
			
		},
		
		testimonials: function(){
			var carousel = $('.fn_cs_testi_carousel .owl-carousel');
			
			var rtlMode	= false;

			if($('body').hasClass('rtl')){
				rtlMode = 'true';
			}
			carousel.each(function(){
				$(this).owlCarousel({
					loop: true,
					items: 3,
					lazyLoad: false,
					margin: 40,
					autoplay: true,
					autoplayTimeout: 7000,
					dots: false,
					nav: false,
					navSpeed: false,
					rtl: rtlMode,
					responsive : {
						0 : {
							items: 1
						},
						768 : {
							items: 2
						}
					}
				});
			});
			MarketifyTokyo.BgImg();
		},
		
		
		
		accordionFunction: function(){
			var head 	= $('.fn_cs_accordion .acc_head'),
				s		= 300,
				a		= 'swing';
			head.off().on('click',function(){
				var e 	= $(this),
					p 	= e.closest('.fn_cs_accordion'),
					c 	= e.closest('.accordion_in'),
					t	= p.data('type');
				if(!c.hasClass('acc_active')){
					if(t === 'accordion'){
						p.find('.acc_active').removeClass('acc_active').find('.acc_content').slideUp({duration:s,easing:a});
					}
					c.addClass('acc_active').find('.acc_content').slideDown({duration:s,easing:a});
				}else{
					c.removeClass('acc_active').find('.acc_content').slideUp({duration:s,easing:a});
				}
			});
		},
		
		
		
		allGalleryFunctions: function(){
			MarketifyTokyo.lightGallery();
			MarketifyTokyo.justifiedGallery();
			MarketifyTokyo.galleryMasonry();
			MarketifyTokyo.BgImg();
			MarketifyTokyo.gallerySlider();
			MarketifyTokyo.collageCarousel();
			MarketifyTokyo.isotopeFunction();
			MarketifyTokyo.inlineStyle();
			setTimeout(function(){
				MarketifyTokyo.isotopeFunction();
			},2000);
		},
		
		collageCarousel: function(){
			var carousel 	= $('.fn_cs_gallery_collage_a .owl-carousel');
			var rtlMode		= false;
			if($('body').hasClass('rtl')){
				rtlMode		= true;
			}
			
			carousel.each(function(){
				var e		= $(this);
				var myNav	= false;
				var gutter	= parseInt(e.closest('.fn_cs_gallery_collage_a').data('gutter'));
				
				e.owlCarousel({
					items: 4,
					lazyLoad: true,
					loop:true,
					rtl: rtlMode,
					animateOut: 'fadeOut',
					animateIn: 'fadeIn',
					autoWidth:true,
					autoplay: true,
					autoplayTimeout: 70000,
					smartSpeed: 2000,
					margin: gutter,
					dots: true,
					nav: myNav,
					navSpeed: true
				});	
			});
		},
		
		gallerySlider: function(){
			$('.fn_cs_gallery_slider .inner').each(function(){
				var element 	= $(this);
				if(element.hasClass('gogogo')){
					return false;
				}element.addClass('gogogo');
				var container 	= element.find('.swiper-container');
				
				
				var pagination		= element.closest('.fn_cs_gallery_slider').data('pag');
				var paginationClass = 'fn_cs_swiper__progress';
				var type 			= 'custom';
				var clickable		= false;
				if(pagination === 'dots'){
					paginationClass = 'fn_cs_swiper__dots';
					type 			= 'bullets';
					clickable 		= true;
				}
				
				
				var mySwiper 	= new Swiper (container, {
					loop: true,
					slidesPerView: 1,
					spaceBetween: 70,
					loopAdditionalSlides: 50,
					speed: 800,
					autoplay: {
						delay: 8000,
					},
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
				  	},
					on: {
						init: function(){
							element.closest('.fn_cs_gallery_slider').addClass('ready');
						},
						autoplayStop: function(){
							mySwiper.autoplay.start();
						},
				  	},
					pagination: {
						el: '.'+paginationClass,
						type: type, // progressbar
						clickable: clickable,
						renderCustom: function (swiper,current,total) {
							if(pagination === 'fill' || pagination === 'scrollbar'){
								// progress animation
								var scale,translateX;
								var progressDOM	= container.find('.fn_cs_swiper__progress');
								if(progressDOM.hasClass('fill')){
									translateX 	= '0px';
									scale		= parseInt((current/total)*100)/100;
								}else{
									scale 		= parseInt((1/total)*100)/100;
									translateX 	= (current-1) * parseInt((100/total)*100)/100 + 'px';
								}


								progressDOM.find('.all span').css({transform:'translate3d('+translateX+',0px,0px) scaleX('+scale+') scaleY(1)'});
								if(current<10){current = '0' + current;}
								if(total<10){total = '0' + total;}
								progressDOM.find('.current').html(current);
								progressDOM.find('.total').html(total);
							}
						},
						renderBullet: function (index, className) {
							return '<span class="' + className + ' fn_dots"></span>';
					  	}
				  	},
			  	});
			});
			MarketifyTokyo.BgImg();
		},
		
		galleryMasonry: function(){
			MarketifyTokyo.lightGallery();
			MarketifyTokyo.isotopeFunction();
		},
		
		justifiedGallery: function(){
			MarketifyTokyo.lightGallery();
			var justified = $(".fn_cs_gallery_justified");
			justified.each(function(){
				var element 	= $(this);
				var height		= parseInt(element.attr('data-height'));
				var gutter		= parseInt(element.attr('data-gutter'));
				if(!height || height === 0){height = 400;}
				if(!gutter || gutter === 0){gutter = 10;}
				if($().justifiedGallery){
					element.justifiedGallery({
						rowHeight : height,
						lastRow : 'nojustify',
						margins : gutter,
						refreshTime: 500,
						refreshSensitivity: 0,
						maxRowHeight: null,
						border: 0,
						captions: false,
						randomize: false
					});
				}
			});
		},
		
		
		/* COMMMON FUNCTIONS */
		BgImg: function(){
			var div = $('*[data-fn-bg-img]');
			div.each(function(){
				var element = $(this);
				var attrBg	= element.attr('data-fn-bg-img');
				var dataBg	= element.data('fn-bg-img');
				if(typeof(attrBg) !== 'undefined'){
					element.addClass('marketify-ready');
					element.css({backgroundImage:'url('+dataBg+')'});
				}
			});
		},
		
		ImgToSVG: function(){
			
			$('img.tokyo_fn_svg,img.tokyo_w_fn_svg').each(function(){
				var $img 		= $(this);
				var imgClass	= $img.attr('class');
				var imgURL		= $img.attr('src');

				$.get(imgURL, function(data) {
					var $svg = $(data).find('svg');
					if(typeof imgClass !== 'undefined') {
						$svg = $svg.attr('class', imgClass+' replaced-svg');
					}
					$img.replaceWith($svg);

				}, 'xml');

			});
		},
		
		jarallaxEffect: function(){
			$('.jarallax').each(function(){
				var element			= $(this);
				var	customSpeed		= element.data('speed');

				if(customSpeed !== "undefined" && customSpeed !== ""){
					customSpeed = customSpeed;
				}else{
					customSpeed 	= 0.5;
				}
				element.jarallax({
					speed: customSpeed,
					automaticResize: true
				});
			});
		},
		isotopeFunction: function(){
			var masonry = $('.fn_cs_masonry');
			if($().isotope){
				masonry.each(function(){
					$(this).isotope({
					  itemSelector: '.fn_cs_masonry_in',
					  masonry: {}
					});
					$(this).isotope( 'reloadItems' ).isotope();
				});
			}
			var items = $('.fn_cs_project_category .posts_list');
			if($().isotope){
				items.each(function() {
					$(this).isotope({
					  itemSelector: 'li',
					  masonry: {}
					});
				});
			}
		},
		
		lightGallery: function(){
			if($().lightGallery){
				// FIRST WE SHOULD DESTROY LIGHTBOX FOR NEW SET OF IMAGES
				var gallery = $('.fn_cs_lightgallery');

				gallery.each(function(){
					var element = $(this);
					element.lightGallery(); // binding
					if(element.length){element.data('lightGallery').destroy(true); }// destroying
					$(this).lightGallery({
						selector: ".lightbox",
						thumbnail: 1,
						loadYoutubeThumbnail: !1,
						loadVimeoThumbnail: !1,
						showThumbByDefault: !1,
						mode: "lg-fade",
						download:!1,
						getCaptionFromTitleOrAlt:!1,
					});
				});
			}	
		},
	};
	
	$( window ).on( 'elementor/frontend/init', MarketifyTokyo.init );
	
	
	$( window ).on('resize',function(){
		MarketifyTokyo.isotopeFunction();
		setTimeout(function(){
			MarketifyTokyo.isotopeFunction();
		},700);
	});
	$( window ).on('load',function(){
		MarketifyTokyo.isotopeFunction();
	});
	
	$(window).on('scroll',function(){
		MarketifyTokyo.circularProgress();
	});
	
})(jQuery, window.elementorFrontend);
$(document).ready(function(){
	// 상단 select
	$('.select-box a').on('click',function(e){
		var $this = $(this);

		if($this.parent().hasClass('on')){
			$this.parent().removeClass('on');
			$this.siblings('.select-list').slideUp();
		}else{
			$('.select-box').removeClass('on');
			$('.select-list').slideUp();

			$this.parent().addClass('on');
			$this.siblings('.select-list').slideDown();
		}
	});
	$(document).on('mouseup', function(e){
		if($('.select-box').has(e.target).length === 0){
			$('.select-box').removeClass('on')
			$('.select-list').slideUp();
		}
	});
	$('.select-list li:last-child a').on('focusout', function(){
		$('.select-box').removeClass('on')
		$('.select-list').slideUp();
	});


    // footer site
    var siteBox = $('.site-box');
    var siteBtn = $('.site-btn');
    var siteList = $('.site-list');

    siteBtn.on('click', function(e){
        e.preventDefault();

        if(siteList.is(':hidden')) {
            siteBox.addClass('on');
            siteList.slideDown();
        } else {
            siteBox.removeClass('on');
            siteList.slideUp();
        }
    });
    $(document).on('mouseup', function(e){
		if(siteBtn.has(e.target).length === 0){
			siteBox.removeClass('on');
            siteList.slideUp();
		}
	});
    $('.site-list li:last-child a').on('focusout', function(){
		siteBox.removeClass('on');
        siteList.slideUp();
	});
});

//gnb
$(window).on('load resize', function(){	
	var view_w = window.innerWidth;
	var layerGnb = $('.layer-gnb');
	var gnb = $('#gnb li a');
	var depthCont = $('.depth-cont');

	//초기화
	$('body').removeClass('open-menu');
	layerGnb.removeClass('on');
	$('#gnb').off();
	$('#gnb ul li a').off().removeClass('on');
	depthCont.off().removeAttr('style');
	$('.menu-btn').off();
    $('.depth2-type02 > li').removeClass('active');

	// for Tab, Mobile
	if(view_w < 1201){
		//Tab, Mobile 초기화
		depthCont.css('display','none');
		$('#gnb .depth2 [class*="depth"]').css('display','none');
		$('.depth2-type02 > li').removeClass('active');

		if(gnb.siblings('ul').length || depthCont){
			gnb.siblings('ul').prev('a').addClass('has-sub');
			depthCont.prev('a').addClass('has-sub');
		}

		$('.menu-btn').on('click',function(e){
			e.preventDefault();

			$('body').addClass('open-menu');
			layerGnb.addClass('on');
		});

		$('.menu-close').on('click',function(e){
			e.preventDefault();

			$('body').removeClass('open-menu');
			layerGnb.removeClass('on');
			menuClose();
		});

		function menuClose(){
			$('body').removeClass('open-menu');
			layerGnb.removeClass('on');
			$('#gnb .depth1 a').removeClass('on');
			depthCont.css('display','none');
			$('#gnb .depth2 [class*="depth"]').slideUp();
		}

		layerGnb.on('click',function(e){
			var target = $(e.target);
			if(! target.closest('.layer-gnb .gnb-wrap').length){
				menuClose();
			}
		});

		gnb.on('click',function(e){
			var $this = $(this);

			if($this.hasClass('has-sub')){
				e.preventDefault();
			}
			
			if($this.hasClass('on')){
				if($this.siblings('.depth-cont').length){
					$this.removeClass('on').siblings('.depth-cont').slideUp().children('[class*="depth"]').find('[class*="depth"]').slideUp();
				}
				else{
					$this.removeClass('on').parent().parent('[class*="depth"]').find('[class*="depth"]').slideUp();
				}
			}else{
				$this.parent().parent().find('a').removeClass('on');
				if($this.siblings('.depth-cont').length){
					$this.removeClass('on').parent().parent('[class*="depth"]').find('.depth-cont').slideUp().children('[class*="depth"]').find('[class*="depth"]').slideUp();
					$this.addClass('on').siblings('.depth-cont').slideDown();
				}
				else{
					$this.removeClass('on').parent().parent('[class*="depth"]').find('[class*="depth"]').slideUp();
					$this.addClass('on').siblings('[class*="depth"]').slideDown();
				}
			}
		});
	}

	// for PC
	else{
		//PC 초기화
		$('#gnb ul ul').removeAttr('style');
		$('.depth2-type02 > li:eq(0)').addClass('active');

        if($('#gnb ul ul').length){
            $('#gnb ul ul').prev('a').addClass('has-sub');
        }

        $('#gnb ul li a').on({
            'mouseover focus' : function(){
                if($(this).parent().parent().hasClass('depth1')){
                    $('.depth-cont').stop().slideUp(100);
                    $('#gnb ul li a').removeClass('on');
                }
                if($(this).parent().parent().hasClass('depth3')){
                    $(this).parent().parent().parent().siblings().children('a').removeClass('on');
                    $(this).parent().parent().prev('a').addClass('on');
                }
                $(this).parent().siblings().children('a').removeClass('on');
				$(this).addClass('on');
                $(this).siblings('.depth-cont').stop().slideDown();
				$('#header').addClass('on');
            },
            'keydown' : function(e){
                if (e.shiftKey && e.keyCode == 9) {
                    $(this).removeClass('on');
                    $(this).siblings('.depth-cont').stop().slideUp(100);
					$('#header').removeClass('on');
                }
            }
        });

        $('#gnb').on({
            'mouseleave' : function(){
                $('.depth-cont').stop().slideUp(100);
                $('#gnb ul li a').removeClass('on');
				$('#header').removeClass('on');
            }
        });

        $('.depth1 li').last().children('a').on({
            'focusout' : function(){
                $('.depth-cont').stop().slideUp(100);
                $('.depth1 li a').removeClass('on');
				$('#header').removeClass('on');
            }
        });

        //분야별정보
        $('.depth2-type02 > li > a').on({
			'mouseover focus' : function(){
				$('.depth2-type02 > li').removeClass('active');
				$(this).parent().addClass('active');
			}
		});
	}
});
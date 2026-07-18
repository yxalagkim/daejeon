$(document).ready(function(){
    //주요 서비스
    $('.service-btn').on('click',function(e){
        e.preventDefault();
        if($('.service-list').hasClass('active')){
            $(this).find('span').text('전체보기');
            $('.service-list').removeClass('active');
        }else{
            $(this).find('span').text('닫기');
            $('.service-list').addClass('active');
        }
    });

    $('.service-list li:first-child a').on('focusin',function() {
        $('.service-list').addClass('active');
    });
    $('.service-list li:first-child a').on('keydown',function(e){
        if (e.shiftKey && e.keyCode == 9) {
            $('.service-list').removeClass('active');
        } 
    });
    
    $('.service-btn').on('keydown',function(e){
        if (!e.shiftKey && e.keyCode == 9) {
            $('.service-list').removeClass('active');
        } 
        if (e.shiftKey && e.keyCode == 9) {
            $('.service-list').addClass('active');
        } 
    });

    //사이드바 sns
    let timer;

    $(window).on('load scroll',function(){
		var sectionTop = $('.section-04').offset().top;
		var barH = $('.side-bar').height();
		var barTop = $('.side-bar').offset().top + barH - $('.btn-top').height();

		if (timer) {   
			clearTimeout(timer); 
		}
		timer = setTimeout(function(){
			if(barTop >= sectionTop){
				$('.side-bar').addClass('active');
				$('.side-sns').hide(150);
			}else{
				$('.side-bar').removeClass('active');
				$('.side-sns').show(150);
			}
		}, 100);
    });


    //top
	$('.side-bar [class*=btn-]').on('click',function(e){
		if($(this.hash).offset()){
			$('body,html').animate({scrollTop:$(this.hash).offset().top},800);
			
			if($(this).hasClass('btn-tsearch')){
                e.preventDefault();
				$('.search-box input').focus();
			}
		}
	});


    // 레이어 팝업
    var btnModalOpen = $('.modal-open');	
    var btnModalClose = $('.modal-close');	

    btnModalOpen.click(function(e){		
        e.preventDefault();
        var href = $(this).attr('href');		
        var objBox = $('.modal-wrap'+href);
        var content = objBox.find('.modal-body');		
        
        $('body').addClass('open-modal');
        objBox.show();
        btnModalClose.focus();
        content.find('a:last').focusout(function(){btnModalClose.focus();});  
    });	        

    btnModalClose.click(function(e){
        e.preventDefault();
        var box = $(this).parent().parent('.modal');
        var boxId = box.closest('.modal-wrap').attr('id');	

        $('body').removeClass('open-modal');
        box.closest('.modal-wrap').hide();
        $('a[href="#'+boxId+'"]').focus();
    });	


    //분야별 서비스
    var tabBtn = $('.panel-tab .tab-list li');

    $('.panel-head .btn-prev, .panel-head .btn-next').on('click',function(e){
        e.preventDefault();
        var tabOn = tabBtn.filter('.on');
        var onIdx;
        var tabOnData;

        if($(this).hasClass('btn-next')){
            onIdx = tabOn.index() + 1;
            tabOnData = tabBtn.eq(onIdx).find('a').attr('data-id');
            if (onIdx == tabBtn.length) {
                return false;
            }
        }else{
            onIdx = tabOn.index() - 1;
            tabOnData = tabBtn.eq(onIdx).find('a').attr('data-id');
            if (onIdx == -1) {
                return false;
            }
        }

        tabBtn.removeClass('on');
        tabBtn.eq(onIdx).addClass('on');

        $('.panel-cont').removeClass('on');
        $('#'+tabOnData).addClass('on');

        tabScroll(200);
    });

	$('.panel-tab .tab-list a').on('click',function(e){
		e.preventDefault();
		
		tabData = $(this).attr('data-id');

		$('.panel-tab .tab-list li').removeClass('on');
		$(this).parent().addClass('on');

		$('.panel-cont').removeClass('on');
		$('#'+tabData).addClass('on');

		tabScroll(300);
	});

    $('.panel-tab .tab-list a').on('focus',function(e){
        e.preventDefault();

		$('.panel-tab .tab-list li').removeClass('on');
		$(this).parent().addClass('on');

		tabScroll(300);
	});
        
    function tabScroll(time){
        var tabOnW = $('.panel-tab .tab-list li.on')[0].offsetLeft;
        $('.panel-tab').animate({'scrollLeft':tabOnW - 50}, time);
    }


    // 자동재생 컨트롤
    function autoPlayToggle(slide, chck){
        if (chck == true) {
            slide.autoplay.stop();
        } else {
            slide.autoplay.start();
        }
    }
    // 슬라이드 포커스
    function slideFocusMove(el, slide, $pause){
        var $this = el;
        var $slide = slide;
        if($slide.autoplay.running == true) {
            $slide.autoplay.stop();
            $pause.addClass('on');
        }
    }
    // 슬라이드 포커스
    function slideFocusOutMove(el, slide, $pause){
        var $this = el;
        var $slide = slide;
        if($slide.autoplay.running == false) {
            $slide.autoplay.start();
            $pause.removeClass('on');
        }
    }


    // 메인 슬라이드
    var visualSlide = new Swiper('.visual-slide', {
        effect: 'fade',
        slidesPerView: 1,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        speed: 1000,
        observer: true,
        observeParents: true,
        loop: true,
        navigation: {
            nextEl: '.visual-controls .btn-next',
            prevEl: '.visual-controls .btn-prev'
        },  
        pagination: {
            el: '.visual-controls .swiper-pagination',
            type: 'fraction'
        },
        on: {	
            slideChangeTransitionStart: function(){ // 접근성 추가 - tab 포커스이동
                $('.visual-slide .swiper-slide').find('a').attr('tabindex', '-1');
                $('.visual-slide .swiper-slide-active').find('a').attr('tabindex', '0');
            }
        },
    });

    var btnVisualAutoPlay = $('.visual-controls .btn-stop');
    btnVisualAutoPlay.on('click', function() {
        var isClicked = $(this).hasClass('on');

        if (isClicked) {
            $(this).removeClass('on');
            $(this).find('span').text('정지');
        } else {
            $(this).addClass('on');
            $(this).find('span').text('재생');
        }
        autoPlayToggle(visualSlide, !isClicked);
    });

    $('.visual-slide a').on('focusin', function() {
        var $this = $(this);
        slideFocusMove($this, visualSlide, btnVisualAutoPlay);
    });
    $('.visual-slide a').on('focusout', function() {
        var $this = $(this);
        slideFocusOutMove($this, visualSlide, btnVisualAutoPlay);
    });


    // 뉴스 탭
    $('.tab-menu .tab-tit').on('click focus', function(e) {
        e.preventDefault();

        $('.tab-menu .tab-tit').parent().removeClass('active');
        $('.tab-menu .tab-cont').removeClass('active');

        $(this).parent().addClass('active');
        $(this).siblings('.tab-cont').addClass('active');
    });

    $('.news-item .cont-tit strong').each(function(){
        var length = 20; //표시할 글자 수 정하기
    
        $(this).each(function(){
            if($(this).text().length >= length){
                $(this).text($(this).text().substr(0, length) + '...');	//지정한 글자수 이후 표시할 텍스트 '...'
            }
        });
    });


    // 뉴스 슬라이드
    $('.news-slide').each(function(index){
        $(this).addClass('news-slide'+index);
        var newsSlide = new Swiper('.news-slide'+index, {
            slidesPerView: 'auto',
            spaceBetween: 25,
            speed: 500,
            observer: true,
            observeParents: true,
            loop: true,
            navigation: {
                nextEl: $('.news-slide'+index).parent().siblings().find('.news-controls .btn-next'),
                prevEl: $('.news-slide'+index).parent().siblings().find('.news-controls .btn-prev')
            },  
            on: {	
                transitionEnd: function(){ // 접근성 추가 - tab 포커스이동
                    $('.news-slide .swiper-slide').find('a').attr('tabindex', '-1');
                    $('.news-slide .swiper-slide-active, .news-slide .swiper-slide-active + li, .news-slide .swiper-slide-active + li + li').find('a').attr('tabindex', '0');
                }
            },
            breakpoints: {
                767: {
                    spaceBetween: 20,
                }
            }
        });
    });


    // 알림창 슬라이드
    var noticeSlide = new Swiper('.notice-slide', {
        effect: 'fade',
        slidesPerView: 1,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        speed: 1000,
        observer: true,
        observeParents: true,
        loop: true,
        navigation: {
            nextEl: '.notice-controls .btn-next',
            prevEl: '.notice-controls .btn-prev'
        },  
        pagination: {
            el: '.sec-notice .swiper-pagination',
            type: 'fraction'
        },
        on: {	
            slideChangeTransitionStart: function(){ // 접근성 추가 - tab 포커스이동
                $('.notice-slide .swiper-slide').find('a').attr('tabindex', '-1');
                $('.notice-slide .swiper-slide-active').find('a').attr('tabindex', '0');
            }
        },
    });

    var btnNoticeAutoPlay = $('.notice-controls .btn-stop');
    btnNoticeAutoPlay.on('click', function() {
        var isClicked = $(this).hasClass('on');

        if (isClicked) {
            $(this).removeClass('on');
            $(this).find('span').text('정지');
        } else {
            $(this).addClass('on');
            $(this).find('span').text('재생');
        }
        autoPlayToggle(noticeSlide, !isClicked);
    });

    $('.notice-slide a').on('focusin', function() {
        var $this = $(this);
        slideFocusMove($this, noticeSlide, btnNoticeAutoPlay);
    });
    $('.notice-slide a').on('focusout', function() {
        var $this = $(this);
        slideFocusOutMove($this, noticeSlide, btnNoticeAutoPlay);
    });


    // 대전시 소통 슬라이드
    var commuSlide = new Swiper('.commu-slide', {
        slidesPerView: 'auto',
        spaceBetween: 30,
        speed: 500,
        observer: true,
        observeParents: true,
        loop: true,
        navigation: {
            nextEl: '.commu-controls .btn-next',
            prevEl: '.commu-controls .btn-prev'
        },  
        on: {	
            slideChangeTransitionStart: function(){ // 접근성 추가 - tab 포커스이동
                $('.commu-slide .swiper-slide').find('a').attr('tabindex', '-1');
                $('.commu-slide .swiper-slide-active, .commu-slide .swiper-slide-active + li, .commu-slide .swiper-slide-active + li + li').find('a').attr('tabindex', '0');
            }
        },
        breakpoints: {
            480: {
                spaceBetween: 15,
            }
        }
    });


    // 배너모음 슬라이드
    var bannerSlide = new Swiper('.banner-slide', {
        slidesPerView: 'auto',
        spaceBetween: 20,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        speed: 500,
        observer: true,
        observeParents: true,
        loop: true,
        navigation: {
            nextEl: '.banner-controls .btn-next',
            prevEl: '.banner-controls .btn-prev'
        },  
        on: {	
            slideChangeTransitionStart: function(){ // 접근성 추가 - tab 포커스이동
                $('.banner-slide .swiper-slide').find('a').attr('tabindex', '-1');
                $('.banner-slide .swiper-slide-active, .banner-slide .swiper-slide-active + li, .banner-slide .swiper-slide-active + li + li, .banner-slide .swiper-slide-active + li + li + li, .banner-slide .swiper-slide-active + li + li + li + li, .banner-slide .swiper-slide-active + li + li + li + li + li').find('a').attr('tabindex', '0');
            }
        },
        breakpoints: {
            767: {
                spaceBetween: 10,
            }
        }
    });

    var btnBannerAutoPlay = $('.banner-controls .btn-stop');
    btnBannerAutoPlay.on('click', function() {
        var isClicked = $(this).hasClass('on');

        if (isClicked) {
            $(this).removeClass('on');
            $(this).find('span').text('정지');
        } else {
            $(this).addClass('on');
            $(this).find('span').text('재생');
        }
        autoPlayToggle(bannerSlide, !isClicked);
    });

    $('.banner-slide a').on('focusin', function() {
        var $this = $(this);
        slideFocusMove($this, bannerSlide, btnBannerAutoPlay);
    });
    $('.banner-slide a').on('focusout', function() {
        var $this = $(this);
        slideFocusOutMove($this, bannerSlide, btnBannerAutoPlay);
    });
});
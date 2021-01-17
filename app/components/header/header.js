$('.js-burger').on('click', function() {
    if($(this).hasClass('is-active')) {
        $(this).removeClass('is-active');
        $('.js-menu').removeClass('is-active');
        $('html, .js-header').css('margin-right', '');
        $('html').removeClass('no-scroll')
    } else {
        $(this).addClass('is-active');
        $('.js-menu').addClass('is-active');
        $('html, .js-header').css('margin-right', window.innerWidth - $(window).width() + 'px');
        $('html').addClass('no-scroll')
    }
});
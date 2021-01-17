$('.js-card-img').magnificPopup({
    type:'image',
    callbacks: {
        beforeOpen: function() {
            $('.js-header').css('margin-right', window.innerWidth - $(window).width() + 'px');
        },
        close: function() {
            $('.js-header').css('margin-right', '');
        }
    }
});
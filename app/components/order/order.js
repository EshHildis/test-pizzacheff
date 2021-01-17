$.validator.addMethod('js-input-phone', function(value, element) {
    return this.optional(element) || $(element).inputmask('unmaskedvalue').length === 10;
}, 'Введите корректный номер');

$('.js-form').validate({
    submitHandler: function(form) {
        var data = new FormData(form);

        $.ajax({
            url: form.action,
            method: form.method,
            data: data,
            processData: false,
            contentType: false,
            success: function(response) {
                if(response.success) {
                    $.magnificPopup.open({
                        items: {
                            src: $(form).find('.js-form-popup'),
                            type: 'inline'
                        },
                        closeBtnInside:true,
                        callbacks: {
                            beforeOpen: function() {
                                $('.js-header').css('margin-right', window.innerWidth - $(window).width() + 'px');
                            },
                            close: function() {
                                $('.js-header').css('margin-right', '');
                            }
                        }
                    });
                }
            }
        })
        
    },
    errorPlacement: function(error, element) {
        element.parent().append(error);
    }
});

$('.js-input-phone').inputmask('+7 (999) 999-99-99');

$('.js-input-name').on('input', function() {
    var newValue = $(this).val().replace(/[\.]/gi, "");
    $(this).val(newValue);
})
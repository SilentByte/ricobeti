//
// Portfolio JavaScript
//

'use strict';

(function($) {
    $(function(){
        $('.button-collapse').sideNav();

        $('a.anchor-scroll').bind('click', function(event) {
            $('.button-collapse').sideNav('hide');

            var anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top - 64
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });

        $('#contact-form').bind('submit', function(event) {
            event.preventDefault();
            $.ajax({
                url: $('#contact-form').attr('data-mailer-url'),
                type: 'POST',
                data: {
                    name: $('#contact-name').val(),
                    email: $('#contact-email').val(),
                    message: $('#contact-message').val()
                },
                cache: false,
                success: function() {
                    Materialize.toast($('#contact-form').attr('data-text-success'), 7000,
                        'green lighten-2 white-text bold-text');

                    $('#contact-form').trigger('reset');
                },
                error: function() {
                    Materialize.toast($('#contact-form').attr('data-text-failure'), 7000,
                        'red lighten-2 white-text bold-text');
                }
            });
        });

        var typed = new Typed('#about h1 span', {
            stringsElement: '#typed-strings',
            loop: false,
            startDelay: 0,
            typeSpeed: 60,
            backSpeed: 40,
            showCursor: true,
            cursorChar: '│',
            autoInsertCss: true
        });
    });
})(jQuery);


//
// Portfolio JavaScript
//

'use strict';

(function($) {
    $(function(){
        $('.button-collapse').sideNav();

        $('a.anchor-scroll').bind('click', function(event) {
            var anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
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


//
// Portfolio JavaScript
//

'use strict';

(function($) {
    $(function(){
        $('.button-collapse').sideNav();

        var typed = new Typed('#about h1 span', {
            stringsElement: '#typed-strings',
            loop:false,
            startDelay: 0,
            typeSpeed: 60,
            backSpeed: 40,
            showCursor: true,
            cursorChar: '|',
            autoInsertCss: true
        });
    });
})(jQuery);


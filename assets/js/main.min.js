/*! [PROJECT_NAME] | Suitmedia */

;(function ( window, document, undefined ) {

    var animationComplete = false;

    var path = {
        css: myPrefix + 'assets/css/',
        js : myPrefix + 'assets/js/vendor/'
    };

    var assets = {
        _jquery_cdn     : 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js',
        _jquery_local   : path.js + 'jquery.min.js',
        _fastclick      : path.js + 'fastclick.min.js',
        _slick          : path.js + 'slick.min.js'
    };

    var Site = {

        init: function () {
            Site.fastClick();
            Site.enableActiveStateMobile();
            Site.WPViewportFix();
            Site.imageSwitcher();
            Site.slickSlider();

            window.Site = Site;
        },

        fastClick: function () {
            Modernizr.load({
                load    : assets._fastclick,
                complete: function () {
                    FastClick.attach(document.body);
                }
            });
        },

        enableActiveStateMobile: function () {
            if ( document.addEventListener ) {
                document.addEventListener('touchstart', function () {}, true);
            }
        },

        WPViewportFix: function () {
            if ( navigator.userAgent.match(/IEMobile\/10\.0/) ) {
                var style   = document.createElement("style"),
                    fix     = document.createTextNode("@-ms-viewport{width:auto!important}");

                style.appendChild(fix);
                document.getElementsByTagName('head')[0].appendChild(style);
            }
        },

        imageSwitcher: function () {
            var $gallery    = $('.gallery');
            var $mainImg    = $('.gallery__main img');
            var $main       = $('.gallery__main');
            var $thumbsImg  = $('.gallery__thumbs a');

            $gallery.on('click', '.gallery__thumbs a', function(event) {
                event.preventDefault();

                var $href = $(this).attr('href'); 

                $main.addClass('gallery__main--load');
                $gallery.addClass('no-click');
                
                $mainImg.load(function() {
                    $main.removeClass('gallery__main--load');
                    $gallery.removeClass('no-click');
                });

                $mainImg.attr('src', $href);
            });
        },

        slickSlider: function () {
            Modernizr.load({
                load    : assets._slick,
                complete: function () {
                    $('.carousel').slick(
                        {
                            infinite: true,
                            adaptiveHeight: false,
                            prevArrow: $('.nav__left'),
                            nextArrow: $('.nav__right')
                        }
                    );
                }
            });
        }

    };

    var checkJquery = function () {
        Modernizr.load([
            {
                test    : window.jQuery,
                nope    : assets._jquery_local,
                complete: Site.init
            }
        ]);
    };

    Modernizr.load({
        load    : assets._jquery_cdn,
        complete: checkJquery
    });

})( window, document );

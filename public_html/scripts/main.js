$(function () {
    $('#content').prepend($overlay);
//Resize du slider au chargement de la page et lors du resize de la fenêtre
    if ($('.main-gallery')) {
        resizeSlider();
        $(window).resize(function () {
            resizeSlider();
        });
    }
    if ($('.mobile-sidebar-menu')) {
        menuMobile.init();
    }
    if($('.language-selection.mobile')){
        languageSelection.init();
    }
    
    resizeAllImages();
    DesktopMenuDrop.init();

//Init du slider
    if ($('.main-gallery')) {
        $('.main-gallery').flickity({
            // options
            cellAlign: 'left',
            pageDots: false,
            freeScroll: true,
            wrapAround: true,
            arrowShape: "M32.272,53.375l20.117,18.96c1.975,1.859,5.178,1.859,7.149,0c1.975-1.863,1.975-4.881,0-6.74l-16.538-15.59l16.538-15.59c1.975-1.863,1.975-4.882,0-6.743c-1.975-1.863-5.178-1.863-7.149,0l-20.117,18.96C30.298,48.497,30.298,51.512,32.272,53.375z"
        });
    }

//Met les boites à bord gris et orange, sur la même ligne, à la même hauteur
    /*if ($('.grey-border-box, .orange-border-box')) {
     matchHeightBox();
     $('window').on('resize', matchHeightBox());
     }*/
});


var $overlay = $('<div id="overlay"></div>');

var resizeSlider = function () {
    $('.gallery-cell .img-annonce').css('height', ($('.gallery-cell').innerWidth() / 4) * 3);
    $('.main-gallery').css('height', $('.annonces_une_entry').innerHeight());
};
var resizeAllImages = function () {

    $('.img-annonce').each(function () {

        var element = $(this);
        var container = element.parent();
        var width = element.width();
        var height = element.height();
        var containerWidth = container.width();
        var containerHeight = container.height();
        if (height >= width) {
            element.addClass('fill-height');
        } else {
            element.addClass('fill-width');
        }

        var newWidth = element.width();
        var newHeight = element.height();
        if (newHeight > containerHeight) {

            element.removeClass('fill-width');
            element.addClass('fill-height');
        } else if (newWidth > containerWidth) {

            element.removeClass('fill-height');
            element.addClass('fill-width');
        }

    });
};
var matchHeightBox = function () {
    var highest;
    var row = $('.row, .clearfix');
    var boxes;
    row.each(function () {
        highest = 0;
        boxes = $(this).find('.grey-border-box, .orange-border-box');
        boxes.each(function () {
            var currColumnHeight = $(this).outerHeight();
            if (currColumnHeight > highest) {
                highest = currColumnHeight;
            }
        });
        boxes.css('height', highest);
    });
};
var DesktopMenuDrop = (function () {
    var $document = $('html');
    var $desktopMenu = $('.desktop-menu');
    var $dropButton = $desktopMenu.find('li>button');
    var $menuDrop = $desktopMenu.find('.dropdown');
    var flag = 1;
    var init = function () {
        _bindEvents();
    };
    var _bindEvents = function () {
        $dropButton.on('click', _toggleMenu);
        $document.on('click', function () {
            if (flag != "0") {
                _closeMenu();
            }
            else {
                flag = "1";
            }
        });
    };
    var _toggleMenu = function () {
        flag = "0";
        $(this).next('.dropdown').toggleClass('hidden');
    };
    var _closeMenu = function () {
        $menuDrop.addClass('hidden');
    };
    return{
        init: init
    };
})();
// Menu mobile pour le choix de la langue
var languageSelection = (function () {
    var $el = $('.language-selection.mobile');
    var $button = $el.find('button');
    var $menu = $el.find('.dropdown');
    var $document = $('html');

    var flag = 1;

    var init = function () {
        _bindEvents();
    };
    var _bindEvents = function () {
        $button.on('click', function(){
             _toggleMenu();
        });
        $document.on('click', function () {
            if (flag != "0") {
                _closeMenu();
            }
            else {
                flag = "1";
            }
        });
    };
    var _toggleMenu = function () {
        flag = "0";
        $button.toggleClass('active');
        $menu.toggleClass('open');
    };
    var _closeMenu = function () {
        if ($menu.hasClass('open')) {
            $button.removeClass('active');
            $menu.removeClass('open');
        }
    };
    return{
        init: init
    };
})();


var menuMobile = (function () {

    var $document = $('html');
    var $sideMenu = $('.mobile-sidebar-menu, .search-box');
    var $leftButtonMenu = $('#categoryButton');
    var $rightButtonMenu = $('#profilButton');
    var $searchButton = $('#searchButton');
    var flag = 1;

    var init = function () {
        _bindEvents();
    };

    var _bindEvents = function () {
        $leftButtonMenu.on('click', function () {
            _toggleMenu($(this));
        });
        $rightButtonMenu.on('click', function () {
            _toggleMenu($(this));
        });
        $searchButton.on('click', function () {
            _toggleMenu($(this));
        });
        $document.on('click', function () {
            if (flag != "0") {
                _closeMenu();
            }
            else {
                flag = "1";
            }
        });
        $sideMenu.on('click', function () {
            flag = 0;
        });
    };

    var _toggleMenu = function (element) {
        flag = "0";
        var buttonId = $(element).attr('id');
        var sideMenuTemp;
        if (buttonId === "searchButton") {
            sideMenuTemp = $('.search-box[data-button="' + buttonId + '"]');
        } else {
            sideMenuTemp = $('.mobile-sidebar-menu[data-button="' + buttonId + '"]');
        }
        if (sideMenuTemp.hasClass('open')) {
            $(sideMenuTemp).removeClass('open');
            $overlay.removeClass('is-visible');
        } else {
            _closeMenu();
            $(sideMenuTemp).addClass('open');
            $overlay.addClass('is-visible');
        }
    };

    var _closeMenu = function () {
        $sideMenu.removeClass('open');
        $overlay.removeClass('is-visible');
    };

    return {
        init: init
    };

})();
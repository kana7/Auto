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
    resizeAllImages();
    DesktopMenuDrop.init();
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

    var init = function () {
        _bindEvents();
    };
    var _bindEvents = function () {
        $button.on('click', _toggleMenu.bind(this));
        $overlay.on('click', _closeMenuOnAway.bind(this));
    };
    var _toggleMenu = function (event) {
        event.stopPropagation();
        $button.toggleClass('active');
        $menu.toggleClass('open');
        $overlay.show();
    };
    var _closeMenuOnAway = function (event) {
        if (!$(event.target).closest($menu, $button).length) {
            _closeMenu();
        }
    };
    var _closeMenu = function () {
        if ($menu.hasClass('open')) {
            $button.removeClass('active');
            $menu.removeClass('open');
            $overlay.hide();
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
        $sideMenu.on('click', function(){
            flag = 0;
        });
    };

    var _toggleMenu = function (element) {
        flag = "0";
        var buttonId = $(element).attr('id');
        var sideMenuTemp;
        if(buttonId === "searchButton"){
            sideMenuTemp = $('.search-box[data-button="' + buttonId + '"]');
        }else{
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
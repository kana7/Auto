$(function () {
    //Resize du slider au chargement de la page et lors du resize de la fenêtre
    if ($('.main-gallery')) {
        resizeSlider();
        $(window).resize(function () {
            resizeSlider();
        });
    }
    resizeAllImages();
});


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

// Menu mobile pour le choix de la langue
var languageSelection = (function () {
    var $el = $('.language-selection.mobile');
    var $button = $el.find('button');
    var $menu = $el.find('.dropdown');
    var $document = $('html');

    var $overlay = $('<div id="bazar_language_overlay"></div>');
    $overlay.css('height', $(document).height());
    $document.append($overlay);

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
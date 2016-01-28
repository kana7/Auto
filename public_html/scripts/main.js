var temp;

var $overlay = $('<div id="overlay"></div>');

$(function () {
    $('#content').prepend($overlay);

    resizeAllImages(callbackInitSlider);
//Resize du slider au chargement de la page et lors du resize de la fenêtre
    if ($('.mobile-sidebar-menu').length > 0) {
        menuMobile.init();
    }
    if ($('.language-selection.mobile').length > 0) {
        languageSelection.init();
    }

    DesktopMenuDrop.init();

    if ($('.annonce-entry').length > 0) {
        resizeImageDetail();
        $(window).on('load', function () {
            resizeAnnonceDetail();
        });
        $(window).resize(resizeAnnonceDetail);
    }

//Met les boites à bord gris et orange, sur la même ligne, à la même hauteur
    /*if ($('.grey-border-box, .orange-border-box')) {
     matchHeightBox();
     $('window').on('resize', matchHeightBox());
     }*/

    if ($('#catMenu').length > 0) {
        catSelection.init();
    }

    //Message alerte sur les fonctions non disponibles
    $('.disabled').on('click', function () {
        alert('cette fonction sera bientôt disponible.');
    });

    //vide l'input text au focus dessus sur la recherche rapide
    if ($('input:not([type=radio])').length > 0) {
        $('input:not([type=radio])').on('focus', function () {
            $(this).val('');
        });
    }


    /* init modules pour uploader image */
    if ($('.add-annonce-image-container').length > 0 || $('.add-client-input-container-image').length > 0) {
        $('.add-annonce-image-pic').each(function () {
            temp = new uploadFile($(this));
            temp.init();
        });
    }
});

var getTallestImageHeight = function (imgCollection) {
    var max_height = 0;

    $(imgCollection).each(function () {
        var cur_height = $(this).height();
        if (cur_height > max_height) {
            max_height = cur_height;
            image = this;
        }
    });
    /* just an example
     $(image).addClass('tallest');*/
    return max_height;

};

//le resize du slider se fait une fois que toutes les images de la page ont été traité par la fonction resizeAllimage 
var callbackInitSlider = function () {
    //Init du slider
    if ($('.main-gallery').length > 0 && jQuery().flickity) {
        $('.main-gallery:not(.annonce-entry-slider):not(.annonce-similar-slider)').flickity({
            // options
            cellAlign: 'left',
            pageDots: false,
            freeScroll: true,
            wrapAround: true,
            arrowShape: "M32.272,53.375l20.117,18.96c1.975,1.859,5.178,1.859,7.149,0c1.975-1.863,1.975-4.881,0-6.74l-16.538-15.59l16.538-15.59c1.975-1.863,1.975-4.882,0-6.743c-1.975-1.863-5.178-1.863-7.149,0l-20.117,18.96C30.298,48.497,30.298,51.512,32.272,53.375z"
        });
        $('.main-gallery.annonce-entry-slider').flickity({
            // options
            cellAlign: 'left',
            pageDots: false,
            freeScroll: false,
            wrapAround: false,
            contain: true,
            arrowShape: "M32.272,53.375l20.117,18.96c1.975,1.859,5.178,1.859,7.149,0c1.975-1.863,1.975-4.881,0-6.74l-16.538-15.59l16.538-15.59c1.975-1.863,1.975-4.882,0-6.743c-1.975-1.863-5.178-1.863-7.149,0l-20.117,18.96C30.298,48.497,30.298,51.512,32.272,53.375z"
        });
        $('.main-gallery.annonce-similar-slider').flickity({
            // options
            cellAlign: 'left',
            pageDots: false,
            freeScroll: true,
            contain: true,
            wrapAround: false,
            arrowShape: "M32.272,53.375l20.117,18.96c1.975,1.859,5.178,1.859,7.149,0c1.975-1.863,1.975-4.881,0-6.74l-16.538-15.59l16.538-15.59c1.975-1.863,1.975-4.882,0-6.743c-1.975-1.863-5.178-1.863-7.149,0l-20.117,18.96C30.298,48.497,30.298,51.512,32.272,53.375z"
        });
        resizeSlider();
        $(window).resize(function () {
            resizeSlider();
        });
    }
};

var resizeImageDetail = function () {
    var $image = $('.annonce-entry-img>figure img');
    var $imageSrc = $image.attr('src');
    var image = new Image();
    image.src = $imageSrc;
    $image.addClass((image.width / image.height > 1) ? 'fill-width' : 'fill-height');
};

//ajoute une hauteur au container dans le detail d'une annonce pour subdiviser la liste verticale en parties égales
var resizeAnnonceDetail = function () {
    var maxHeight = $('.annonce-entry .annonce-entry-img>figure img').css('max-height').replace('px', '');
    var height = $('.annonce-entry .annonce-entry-img>figure img').innerHeight();

    if (viewport().width > 1055) {
        if (height >= parseInt(maxHeight)) {
            $('.annonce-entry-content .annonce-entry-img>figure').height(maxHeight);
        } else {
            $('.annonce-entry-content .annonce-entry-img>figure').height(height);
        }
        $('.annonce-entry-content').height($('.annonce-entry-content .annonce-entry-img>figure').innerHeight() + $('.annonce-entry-content .flickity-viewport').innerHeight());
    } else {
        $('.annonce-entry-content .annonce-entry-img figure').height('auto');
        $('.annonce-entry-content').height('auto');

    }
};

var resizeSlider = function () {
    $('.main-gallery').each(function () {
        $(this).find('.img-annonce').parent().css('height', ($(this).find('.gallery-cell').innerWidth() / 4) * 3);
        $(this).find('.flickity-viewport').css('height', $('.annonce-slider-item').innerHeight());
        $(this).show().flickity('resize');
    });
};

var resizeAllImages = function (callback) {
    $('.img-annonce').each(function () {
        var element = $(this);
        /*var container = element.parent();
         var width = element.width();
         var height = element.height();
         var containerWidth = container.width();
         var containerHeight = container.height();*/
        //if (height >= width) {
        element.addClass('fill-height');
        //} else {
        //element.addClass('fill-width');
        //}

        /*var newWidth = element.width();
         var newHeight = element.height();
         if (newHeight > containerHeight) {
         
         element.removeClass('fill-width');
         element.addClass('fill-height');
         } else if (newWidth > containerWidth) {
         
         element.removeClass('fill-height');
         element.addClass('fill-width');
         }*/
    });
    callback();
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

// Permet de modifier l'input pour le choix de la catégorie dans la recherche rapide
var catSelection = (function () {
    var $inputCatValue = $('#catMenuValue');
    var $catMenuList = $('#catMenu>li');

    var init = function () {
        _bindEvents();
    };

    var _bindEvents = function () {
        $catMenuList.on('click', function () {
            _selectCat($(this));
        });
    };

    var _selectCat = function ($element) {
        if (!$element.hasClass('active')) {
            _resetSelect();
            $element.addClass('active');
            $inputCatValue.val($element.attr('data-value'));
        } else {
            _resetSelect();
        }
    };

    var _resetSelect = function () {
        $inputCatValue.val(0);
        $catMenuList.removeClass('active');
    };

    return{
        init: init
    };
})();

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
        $menuDrop.on('click', function () {
            flag = "0";
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
        $button.on('click', function () {
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
        $leftButtonMenu.not('.disabled').on('click', function () {
            _toggleMenu($(this));
        });
        $rightButtonMenu.not('.disabled').on('click', function () {
            _toggleMenu($(this));
        });
        $searchButton.not('.disabled').on('click', function () {
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

/* Module pour ajouter une image via input file */
var uploadFile = function (element) {
    var $image = element;

    //cache dom 
    var $imageContainer = $image.parents('.add-annonce-image-container');
    var $container = $imageContainer.parent();
    var $deleteButton = $container.find('button');
    var $browserInfo = $('#alert-browser');
    var $status = $container.find('.upload-status');
    var $filePath = $status.find('.image-path');
    var $hiddenInput = $imageContainer.find('input[type="hidden"]');
    var $inputFile = $container.find('input[type="file"]');
    var $modifyButtons = $container.find('.image-buttons');

    this.init = function () {
        _bindEvents();
    };

    var _bindEvents = function () {
        $image.on('click', _addImage.bind(this));
        $inputFile.on('change', function () {
            _renderImage(this);
        });
        $deleteButton.on('click', _deleteImage.bind(this));
    };

    var _addImage = function () {
        $inputFile.click();
    };

    var _deleteImage = function () {
        $image.find('img').removeClass("rotate0");
        $image.find('img').removeClass("rotate90");
        $image.find('img').removeClass("rotate180");
        $image.find('img').removeClass("rotate270");
        $image.removeClass('hidden');
        $status.addClass('hidden');
        $image.val('');
        $filePath.text('');
        $image.attr('src', "images/add.png");
        $inputFile.val('');
        $hiddenInput.val(-1);
        $deleteButton.addClass('hidden');
        $modifyButtons.addClass('hidden');
    };

    var _renderImage = function (input) {
        if (window.FileReader) {
            console.log("The fileReader API is supported on this browser");
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $image.attr('src', e.target.result);
                    $hiddenInput.val("notEmpty");
                };

                reader.readAsDataURL(input.files[0]);
                $deleteButton.removeClass('hidden');
                $modifyButtons.removeClass('hidden');
            }
        } else {
            console.log("FileReader API not supported on this browser, use ajax instead");
            var file_name = $inputFile.val().replace(/C:\\fakepath\\/i, '');
            $filePath.text(file_name);
            $hiddenInput.val($inputFile.val());
            $image.addClass('hidden');
            $status.removeClass('hidden');
            $deleteButton.removeClass('hidden');
            $browserInfo.removeClass('hidden');
        }
    };
};

//size of viewport
function viewport() {
    var e = window, a = 'inner';
    if (!('innerWidth' in window)) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return {width: e[ a + 'Width' ], height: e[ a + 'Height' ]};
}
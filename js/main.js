$(function () {
    'use strict';

    const $burger = $('.menu__item--burger');
    const $closer = $('.menu__item--closer');
    const $servicesIcons = $('.content__icon');
    const $grid = $('.grid');

    $burger.on('click', function () {
        const $this = $(this);
        $this.parent().addClass('menu--open');
        $this.parent().removeClass('menu--close');
    });

    $closer.on('click', function () {
        const $this = $(this);
        $this.parent().addClass('menu--close');
        $this.parent().removeClass('menu--open');
    });

    $servicesIcons.on('mouseover', function () {
        TweenMax.to(this, 0.5, { y: -10 });
        TweenMax.to(this, 0.5, { y: 0, delay: 0.5 });
    });

    $grid.isotope({
        itemSelector: '.grid__item',
        percentPosition: true,
        layoutMode: 'masonry',
        masonry: {
            columnWidth: '.grid__sizer'
        }
    });

    $('[data-grid-filter]').on('click', function () {
        const filter = $(this).data('grid-filter');

        if (filter) {
            $grid.isotope({ filter: '[data-filter=' + filter + ']' });
        } else {
            $grid.isotope({ filter: "*" });
        }
    });

    // Select all links with hashes
    $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function (event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function () {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        };
                    });
                }
            }
        });
});
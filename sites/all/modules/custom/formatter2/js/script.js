jQuery(function ($) {
    $(document).ready(function () {
        function Slider(gallery_div) {
            var container = gallery_div.css('overflow', 'hidden');
            container.find('.slider').after('<div class="slider-nav">' +
                '<button class="backbtn" data-dir="prev"><</button>' +
                '<button class="nextbtn" data-dir="next">></button>' +
                '</div>');
            container.append('<div class="paginator-nav">' +
                '<button class="prev" data-dir="prev"><</button>' +
                '<button class="next" data-dir="next">></button>' +
                '</div>');
            var thumb_container = $('.pagi-container').children('ul');
            var nav = $('.slider-nav');
            var paginav = $('.paginator-nav');
            var imgs = container.find('.slides');
            var length = imgs.length;
            var thumbs = thumb_container.find('li');
            var cnt = 0;
            //var mc = new Hammer(document.getElementById('switch_slider'));
            var ii = 0;
            thumbs.each(function () {
                var anchor = $(this).find('a');
                anchor.data('pgno', cnt);
                cnt++;
            });
            var current = 0;
            var change = 0;
            var center = 0;
            var offcenter = 0;
            var step = current + 1;
            container.width(imgs[0].width);
            var shift = 0;
            nav.css('top', -(container.width() / 2));
            var pagiLength = 0;
            var sliderLength = 0;
            imgs.each(function () {
                sliderLength += $(this).width();
            });
            thumbs.each(function () {
                pagiLength += $(this).width() + 5;
            });
            container.find('ul').width(sliderLength);
            imgs.each(function () {
                $(this).parent('li').css('margin-top', (container.find('ul').height() - $(this).height()) / 2);
            });
            thumb_container.width(pagiLength);
            thumb_container.find('li a img').toggleClass('img-normal');
            thumb_container.find('li:nth-child(1) a').toggleClass("pagi-selected");
            thumb_container.find('li:nth-child(1) a img').toggleClass("img-selected");

            // если картинки с одинаковой высотой
            /*function fix_size() {
             imgs.each(setsize);
             function setsize() {
             var img = $(this);
             img_dom = img.get(0);
             if (img_dom.complete) {
             resize();
             } else img.one('load', resize);

             function resize() {
             if ((container.width() / container.height()) < (img_dom.width / img_dom.height)) {
             console.log(img.width() / (img_dom.width / img_dom.height));
             img.css('max-width', img.width() / (img_dom.width / img_dom.height)).css('margin-top', '3em');
             img.parent('li').css('min-width', img.width() / (img_dom.width / img_dom.height));
             }
             }
             }
             }

             $(window).on('resize', fix_size);
             fix_size(); */

            function transition(time = 500) {
                step = current + 1;
                container.find('.slider').stop().animate({
                    scrollLeft: '+=' + (container.find('li:nth-child(' + (current + 1) + ') img').offset().left - container.find('.slider').offset().left)
                }, time, 'swing');
                thumb_transition(time, false);
                thumb_container.find('li a').removeClass("pagi-selected");
                thumb_container.find('li a img').removeClass("img-selected");
                thumb_container.find("li:nth-child(" + (current + 1) + ") a").toggleClass("pagi-selected");
                thumb_container.find("li:nth-child(" + (current + 1) + ") a img").toggleClass("img-selected");
                container.find("ul li").css('text-align', '');
                container.find("ul li:nth-child(" + (current + 1) + ")").css('text-align', 'center');
            }

            transition(0);
            function chooseImage(imgNum) {
                var pos = current;
                if (isNaN(imgNum)) {
                    pos += (imgNum == 'next') || -1;
                    current = (pos < 0) ? length - 1 : pos % (length);
                }
                else {
                    current = Number(imgNum);
                }
            }

            nav.find('button').on('click', function () {
                chooseImage($(this).data('dir'));
                transition();
            });

            thumb_container.find('li a').on('click', function () {
                chooseImage($(this).data('pgno'));
                transition();
            });

            paginav.find('button').on('click', function () {
                thumb_transition(500, $(this).data('dir'),);
            });

            function thumb_transition(time, dir = false) {
                if (dir) {
                    change = (dir == 'prev') ? -1 : 1;

                    if (((step + change) <= length) && ((step + change) >= 1)) {
                        // if ((($(window).width() - (thumb_container.offset().left + thumb_container.outerWidth())) < ($(window).width() - ($('.pagi-container').offset().left + $('.pagi-container').outerWidth())))
                        //     || ((change = -1))) {

                        step += change;
                        step = (step == 0) ? 1 : step;

                        $('.pagi-container').animate({
                            scrollLeft: '+=' + (thumb_container.find('li:nth-child(' + (step) + ')').width() * change)
                        }, time, 'swing');

                        // }
                    }

                } else {
                    change = 0;
                    step += change;
                    step = (step == 0) ? 1 : step;

                    center = (step == 1) ? 0 : ((container.width() / 2) - (thumb_container.find('li:nth-child(' + (step) + ') a img').width() / 2));

                    offcenter = 0;
                    ii = 0;
                    shift = (container.width() == 480) ? step - 1 : step;
                    thumbs.each(function () {
                        if (ii < shift) {
                            offcenter += $(this).width() + 5;
                            ii++;
                        }
                    });

                    if ((offcenter >= (container.width() / 2))/* || (step == 1 && time == 0)*/) {
                        $('.pagi-container').stop().animate({
                            scrollLeft: '+=' + (thumb_container.find('li:nth-child(' + (step) + ') a img').offset().left - 5 - container.find('.slider').offset().left - center)
                        }, time, 'swing');
                    } else {
                        $('.pagi-container').stop().animate({
                            scrollLeft: 0
                        }, time, 'swing');
                    }
                }
            }

            // mc.on("swipeleft swiperight", function (ev) {
            //     console.log(ev.distance);
            //     if (ev.type == 'swipeleft') {
            //         chooseImage('next');
            //     } else {
            //         chooseImage('prev');
            //     }
            //     transition(500);
            // });

            $(document).keydown(function (e) {
                switch (e.keyCode) {
                    case 37:
                        chooseImage('prev');
                        transition();
                        break;
                    case 39:
                        chooseImage('next');
                        transition();
                        break;
                    default:
                        break;
                }
            });


            var fingerCount = 0;
            var startX = 0;
            var startY = 0;
            var curX = 0;
            var curY = 0;
            var deltaX = 0;
            var deltaY = 0;
            var horzDiff = 0;
            var vertDiff = 0;
            var minLength = 100;
            var swipeLength = 0;
            var swipeAngle = null;
            var swipeDirection = null;

            function touchStart(e) {
                e.preventDefault();
                //console.log(e);
                if (e.type == 'mousedown') {
                    startX = e.originalEvent.pageX;
                    startY = e.originalEvent.pageY;
                    //console.log(startX, startY);
                } else {
                    touchCancel(e);
                }
            }

            function touchMove(e) {
                e.preventDefault();
                if (e.type == 'mouseup') {
                    curX = e.originalEvent.pageX;
                    curY = e.originalEvent.pageY;
                    //console.log(curX, curY);
                    touchEnd(e);
                } else {
                    touchCancel(e);
                }
            }

            function touchEnd(e) {
                e.preventDefault();
                //console.log(1);
                swipeLength = Math.round(Math.sqrt(Math.pow(curX - startX, 2) + Math.pow(curY - startY, 2)));
                if (swipeLength >= minLength) {
                    caluculateAngle();
                    determineSwipeDirection();
                    processingRoutine();
                    touchCancel(e);
                } else {
                    touchCancel(e);
                }
            }

            function touchCancel(e) {
                fingerCount = 0;
                startX = 0;
                startY = 0;
                curX = 0;
                curY = 0;
                deltaX = 0;
                deltaY = 0;
                horzDiff = 0;
                vertDiff = 0;
                swipeLength = 0;
                swipeAngle = null;
                swipeDirection = null;
            }

            function caluculateAngle() {
                var X = startX - curX;
                var Y = curY - startY;
                var Z = Math.round(Math.sqrt(Math.pow(X, 2) + Math.pow(Y, 2)));
                var r = Math.atan2(Y, X);
                swipeAngle = Math.round(r * 180 / Math.PI);
                if (swipeAngle < 0) {
                    swipeAngle = 360 - Math.abs(swipeAngle);
                }
                //console.log(swipeAngle);
            }
 
            function determineSwipeDirection() {

                if (((swipeAngle <= 45) && (swipeAngle >= 0)) || ( (swipeAngle <= 360) && (swipeAngle >= 315) )) {
                    swipeDirection = 'left';
                } else if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
                    swipeDirection = 'right';
                }
                //console.log(swipeDirection);
            }

            function processingRoutine() {
                if (swipeDirection == 'left') {
                    chooseImage('next');
                } else if (swipeDirection == 'right') {
                    chooseImage('prev');
                }
                transition(500);
            }

            container.on('mousedown', touchStart);
            container.on('mouseup', touchMove);

        }

        var sliderObj = new Slider($('.gallery'));

    });
});
function customHeader() {
    $('.banner').css('height',$(window).innerHeight()-$('header').height());
    $(window).resize(function () {
        $('.banner').css('height',$(window).innerHeight()-$('header').height());
    });
}

function showContent(e){

    $('.imgs').unbind('click')

    if (!(navigator.userAgent.match(/mobile/i))){
        $('.imgs').click(function(){

            $('.full-screen').empty();
            $('.full-screen').append($('.imgs img:first').clone());
            var e = document.documentElement;
            if (e.requestFullscreen) {
                e.requestFullscreen();
            } else if (e.msRequestFullscreen) {
                e.msRequestFullscreen();
            } else if (e.mozRequestFullScreen) {
                e.mozRequestFullScreen();
            } else if (e.webkitRequestFullscreen) {
                e.webkitRequestFullscreen();
            }

            $('.full-screen').addClass('full-screen-show')
        });
    }


    $url = $(e).children('.grid-item-a:first').attr('data-to');
    $('.article-content').css('padding',0);
    $('.article-content').empty();
    $('.article-container .imgs').empty();
    $('.photos-info .photos-cates .cates-content').empty();

    $('.imgs').removeClass('imgs-maxheight');
    $.ajax({url: $url,success: function(res){
        var imgs = $(res).find('.article-content img');
        var contents = $(res).find('.article-content p').not(':has(img)');
        var cates = $(res).find('.article-cate:first a');

        $('.article-container .article-author img').attr('src',$(res).find('.article-meta img:first').attr('src'));
        $('.article-container .article-author .author-name').text($(res).find('.article-meta-author div:first').text());
        $('.article-container .article-time').text($(res).find('.article-meta .article-meta-date:first').text());
        $('.article-container .article-title').text($(res).find('.article-header .article-heading h1').text());

        $('.article-container .photos-cammera a').text($(res).find('.photos-cammera:first').text());
        $('.article-container .photos-address a').text($(res).find('.photos-address:first').text());

        cates.each(function () {
            $('.photos-info .photos-cates .cates-content').append('<a href="'+$(this).attr('href')+'"><div>'+$(this).text()+'</div></a>');
        });

        imgs.each(function () {
            $('.article-container .imgs').append($(this));
        });

        if (contents.length>0){
            $('.article-content').css('padding','0 15px 15px 15px');
            contents.each(function () {
                $('.article-content').append($(this));
            });
        }



        $('.article-wrapper').css('opacity','1');
        $('.article-wrapper').css('pointer-events','auto');

        $('body').css('overflow-y','hidden')

    }});
}

function closeContent(){
    $('.article-wrapper').css('opacity','0');
    $('.article-wrapper').css('pointer-events','none');

    $('.imgs').empty()
    $('.article-container .photos-cammera').css('display','flex');
    $('.article-container .photos-address').css('display','flex');

    $('body').css('overflow-y','auto');
}

function hideSearch(){
    $('.search-car').css('margin-bottom','-100px');
    $('.search-container').css('-webkit-backdrop-filter','blur(0)');
    $('.search-container').css('backdrop-filter','blur(0)');
    $('.search-container').css('opacity','0');
    setTimeout(function () {
        $('.search-container').remove()

        $('.search-container').css('pointer-events','none');
    },500)

    $('body').css('overflow','auto');
}


$(document).ready(function () {

    document.onfullscreenchange = function () {
        if (!document.fullscreen){
            $('.full-screen').removeClass('full-screen-show');
            $('.full-screen').empty();
        }
    }

    $('.article-container').click(function (e) {
        e.stopPropagation();
    })

    $('.article-wrapper').click(function (e) {
        closeContent();
    });

    searchobj = $('.search-container').clone();
    $('.search-container').remove();

    $('.nav .search').click(function () {

        $('body').append(searchobj.clone());
        $('body').css('overflow','hidden');
        setTimeout(function () {
            $('.search-container').css('opacity','1');
            $('.search-container').css('pointer-events','auto');
            $('.search-car').css('margin-bottom','0');
        },100)

        $('.search-container .search-car').click(function (e) {
            e.stopPropagation()
        })

    });

    $('.father-cate').mouseover(function () {
        // console.log($('.categories').scrollLeft())
        $(this).find('.child-cates').css('left',$(this).position().left)
        $(this).find('.child-cates').css('top',65-$(document).scrollTop())
        console.log(65-$(document).scrollTop())
    });


    $('.banner-bg').css('opacity',1);
    $('.banner-info').css('opacity',1);



    $('.full-screen').click(function () {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozExitFullScreen) {
            document.mozExitFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    })
});


$(document).ready(function(){


    // Audio Player
    var playing = false;

    $('a#music').click(function() {
        $(this).toggleClass("down");
        if (playing == false) {
            document.getElementById('player').play();
            playing = true;
        } else {
            document.getElementById('player').pause();
            playing = false;
        }
    });


    // Progress bar
    $('.bar span').click(function(){
        if ($(this).hasClass('first')){
            $('#progress-bar').val('10');
            $(this).nextAll().removeClass('border-change');
            $('.percent').html("20% Complete");
        }else if ($(this).hasClass('second')){
            $(this).nextAll().removeClass('border-change');
            $('#progress-bar').val('32');
            $(this).prevAll().addClass('border-change');
            $(this).addClass('border-change');
            $('.percent').html("40% Complete");
        }else if ($(this).hasClass('third')){
            $(this).nextAll().removeClass('border-change');
            $('#progress-bar').val('50');
            $(this).prevAll().addClass('border-change');
            $(this).addClass('border-change');
            $('.percent').html("60% Complete");
        }else if ($(this).hasClass('fourth')){
            $(this).nextAll().removeClass('border-change');
            $('#progress-bar').val('70');
            $(this).prevAll().addClass('border-change');
            $(this).addClass('border-change');
            $('.percent').html("80% Complete");
        }else if ($(this).hasClass('fifth')){
            $(this).nextAll().removeClass('border-change');
            $('#progress-bar').val('100');
            $(this).prevAll().addClass('border-change');
            $(this).addClass('border-change');
            $('.percent').html("100% Complete");
        }
    });
});// complete click
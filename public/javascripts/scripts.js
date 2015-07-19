$(document).ready(function(){

    // responsive navbar
        $(".main-menu").click(function(){
            $(".main-menu").slideToggle();
        });
        $(window).resize(function(){
            $(".main-menu").removeAttr("style");
        });

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
    $('#skip-question').click(function() {
        var clicked = $(this);
        $.ajax({
            url  : "/game/decrementHint",
            data : {"hintType" : "skip"},
            success : function(){
                clicked.next().find(".notification").text = clicked.next().find(".notification").text - 1;
            }
        })
   });



    $('.bar span').click(function(){
        var progressStep = 20;
        if ($(this).hasClass('first')){
            $('#progress-bar').val(progressStep);
            $(this).nextAll().removeClass('border-change');
            $('.percent').html("20% Complete");
        }else if ($(this).hasClass('second')){
            $(this).nextAll().removeClass('border-change');
            $('#progress-bar').val(progressStep * 2);
            $(this).prevAll().addClass('border-change');
            $(this).addClass('border-change');
            $('.percent').html("40% Complete");
        }else if ($(this).hasClass('third')){
            $(this).nextAll().removeClass('border-change');
            $('#progress-bar').val(progressStep * 3);
            $(this).prevAll().addClass('border-change');
            $(this).addClass('border-change');
            $('.percent').html("60% Complete");
        }else if ($(this).hasClass('fourth')){
            $(this).nextAll().removeClass('border-change');
            $('#progress-bar').val(progressStep * 4);
            $(this).prevAll().addClass('border-change');
            $(this).addClass('border-change');
            $('.percent').html("80% Complete");
        }else if ($(this).hasClass('fifth')){
            $(this).nextAll().removeClass('border-change');
            $('#progress-bar').val(progressStep * 5);
            $(this).prevAll().addClass('border-change');
            $(this).addClass('border-change');
            $('.percent').html("100% Complete");
        }
    });
});// complete click
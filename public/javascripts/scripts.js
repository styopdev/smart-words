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
    $('#skip-question').click(function(){
        var currentProgress = $('#progress-bar').val();  // get current progress value
        var progressStep = 20;
        console.log($('#progress-bar').val());
        $('#progress-bar').val(currentProgress + progressStep); // shift one step forward
        /*
        if($('.bar span').hasClass('border-change')){
            $('#progress-bar').val(progressStep);
        } */
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
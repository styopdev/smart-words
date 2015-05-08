$(document).ready(function(){

    // Countdown Time
    // Function to update counters on all elements with class counter
    var doUpdate = function() {
        $('.countdown').each(function() {

            var count = parseFloat($(this).html());
            var intervalSize = 5000;
            if (count !== 0.00) {
                if(count <= 0.10){
                    $(this).html((count - 0.01).toFixed(2));
                }else{
                    $(this).html((count - 0.05).toFixed(2));
                    if((count - 0.05).toFixed(2) == 0.1){
                        //   alert('++');
                        intervalSize = 1000;
                        $(this).css('color', 'red');
                        clearInterval(interval);
                        interval = setInterval(doUpdate, 1000);
                    }
                }
            }else{
                var loginBox = document.getElementById('time-box');
                //Fade in the Popup
                $(loginBox).fadeIn(300);
                //Set the center alignment padding + border see css style
                var popMargTop = ($(loginBox).height() + 24) / 2;
                var popMargLeft = ($(loginBox).width() + 24) / 2;
                $(loginBox).css({
                    'margin-top' : -popMargTop,
                    'margin-left' : -popMargLeft
                });
                // Add the mask to body
                $('body').append('<div id="mask"></div>');
                $("#timeOver").css("display", "block")
                $('#mask').fadeIn(300);

                clearInterval(interval);
            }
        });
    };

    // Schedule the update to happen once every second
    var interval = setInterval(doUpdate, 5000);
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
    // remove wrong answer
    $('#remove-wrong-answer').click(function(){


        var wrongAnswers = [];
        $(".choose-answers .wrong").each(function() {
            var answers = $(this).attr("id");
            wrongAnswers.push(answers);  // push wrong answers into array
        }); // elements in this class are being pushed into the array 'cCameras'

        // generate random number within the length of array's range
        var randomAnswer = Math.floor(Math.random() * wrongAnswers.length);
        console.log(wrongAnswers[randomAnswer]);

        $('#' + wrongAnswers[randomAnswer]).css({
            'background':'#A8A8A8',
            'color':'#FFFFFF',
            'border-color':'#9ACD32',
            'pointer-events': 'none'
        });
        $('#' + wrongAnswers[randomAnswer]).click (function () {
            return false;
        });
        var clicked = $(this);

        $.ajax({
            url  : "/game/decrementHint",
            data : {"hintType" : "remove"},
            success : function(){
                clicked.next().find(".notification").text = clicked.next().find(".notification").text - 1;
            }
        });
    });
    var progressStep = 0;
    $(".answer").click(function(){
        if ($(this).hasClass("right")) {
            var currentProgress = $('#progress-bar').val();  // get current progress value
            progressStep += 20;
            console.log($('#progress-bar').val());
            $('#progress-bar').val(currentProgress + 20); // shift one step forward
            $('.percent').html(progressStep + "% Complete");
        } else {
            var loginBox = document.getElementById('time-box');
            //Fade in the Popup
            $(loginBox).fadeIn(300);
            //Set the center alignment padding + border see css style
            var popMargTop = ($(loginBox).height() + 24) / 2;
            var popMargLeft = ($(loginBox).width() + 24) / 2;
            $(loginBox).css({
                'margin-top' : -popMargTop,
                'margin-left' : -popMargLeft
            });
            // Add the mask to body
            $('body').append('<div id="mask"></div>');
            $("#wrongAnswer").css("display", "block")
            $('#mask').fadeIn(300);
        }
    })

});// complete click
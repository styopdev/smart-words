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
                $('#mask').fadeIn(300);

                clearInterval(interval);
            }
        });
    };

    // Schedule the update to happen once every second
    var interval = setInterval(doUpdate, 5000);

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
       // wrongAnswers[randomAnswer].css({'background':'#3DCC01', 'border-color':'#FEFB64'});

        $('#' + wrongAnswers[randomAnswer]).css({'background':'#A8A8A8', 'color':'#FFFFFF', 'border-color':'#000000', 'pointer-events': 'none'});
        $('#' + wrongAnswers[randomAnswer]).click (function () {
            return false;
        });

     /*   $('#' + wrongAnswers[randomAnswer]).click(function(){

            console.log(this);
        });

        $('#answer3').click(function(){

            console.log(this);
        }); */
       // $('.my-link').bind('click', false);
        // for (var i = 0; i < wrongAnswers.length; i++)
        //     console.log(wrongAnswers[i]);
    });

});// complete click
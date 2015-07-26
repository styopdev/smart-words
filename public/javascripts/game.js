var questionIndex      = 0;
var wrongAnsweredCount = 0;
var rightAnsweredCount = 0;

$(document).ready(function(){
    var wrongAnswers = $(".choose-answers .wrong");

    // Countdown Time
    // Function to update counters on all elements with class counter
    var doUpdate = function() {
        $('.countdown').each(function() {
            var count = parseFloat($(this).html());
            var intervalSize = 5000;
            if (count !== 0.00) {
                if(count <= 0.10){
                    $(this).html((count - 0.01).toFixed(2));
                } else {
                    if ($(this).html() == 5.00) {
                        $(this).html(4.55);
                    } else if ($(this).html() == 4.00) {
                        $(this).html(3.55);
                    }  else if ($(this).html() == 3.00) {
                        $(this).html(2.55);
                    } else if ($(this).html() == 2.00) {
                        $(this).html(1.55);
                    } else if ($(this).html() == 1.00) {
                        $(this).html(3.55);
                    } else {
                        $(this).html((count - 0.05).toFixed(2));
                    }

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
        if ($("#skip-hint").text() == 0) {
            alert("You Have No Skip Hints");
            return;
        }
        var clicked = $(this);
        $.ajax({
            url  : "/game/decrementHint",
            data : {"hintType" : "skipNum", "game_id" : game_id},
            success : function(){
                changeQuestion();
                $("#skip-hint").text($("#skip-hint").text() - 1);
            }
        });
    });
    // remove wrong answer

    $('#remove-wrong-answer').click(function(){
        if ($("#remove-hint").text() == 0) {
            alert("You Have No Hints");
            return;
        }
        if (!wrongAnswers.length) {
            alert("No More Wrong Answer");
            return;
        }
        // generate random number within the length of array's range
        var randomAnswer = Math.floor(Math.random() * wrongAnswers.length);
        $(wrongAnswers).eq(randomAnswer).removeClass("wrong");
        $(wrongAnswers).eq(randomAnswer).addClass("disabled");

        $(wrongAnswers).eq(randomAnswer).click (function () {
            return false;
        });

        var clicked = $(this);

        wrongAnswers = $(".choose-answers .wrong");
        $.ajax({
            url  : "/game/decrementHint",
            data : {"hintType" : "hintNum", "game_id" : game_id},
            success : function(){
                $("#remove-hint").text($("#remove-hint").text() - 1);
            }
        });
    });

    var progressStep = 0;
    $(document).on("click", ".answer", function(){
        if ($(this).hasClass("right")) {
            var currentProgress = $('#progress-bar').val();  // get current progress value
            progressStep += 20;
            $('#progress-bar').val(currentProgress + 20); // shift one step forward
            $('.percent').html(progressStep + "% Complete");
            rightAnsweredCount++;
            if (rightAnsweredCount + wrongAnsweredCount == 5 ) {
                if (wrongAnsweredCount >= 3) {
                    showFailedPopup();
                } else {
                    showWinPopup();
                }
            } else {
                changeQuestion();
            }
        } else {
            wrongAnsweredCount++;
            if (rightAnsweredCount + wrongAnsweredCount == 5 ) {
                if (wrongAnsweredCount >= 3) {
                    showFailedPopup();
                } else {
                    showWinPopup();
                }
            } else {
                changeQuestion();
            }
        }
    });

    function changeQuestion()
    {
        questionIndex++;
        $(".questions.row").html(questions[questionIndex].text);
        $(".choose-answers").html("");
        var answers = questions[questionIndex].answers;

        var addClass;
        for (key in answers) {

            if (answers[key] == questions[questionIndex].rightAnswer) {
                addClass = "right";
            } else {
                addClass = "wrong";
            }
            $(".choose-answers").append(
                '<a class="' + addClass + ' answer">' + answers[key] + '</a>'
            );
        }
        wrongAnswers = $(".choose-answers .wrong");
    }
    
    $("#back-link").click(function () {
        window.location = "/game/levels";
    });

    function showWinPopup()
    {
        var loginBox = document.getElementById('win-popup');
        //Fade in the Popup
        $(loginBox).fadeIn(300);
        //Set the center alignment padding + border see css style
        var popMargTop = ($(loginBox).height() + 24) / 2;
        var popMargLeft = ($(loginBox).width() + 24) / 2;
        $(loginBox).css({
            'margin-top' : -popMargTop,
            'margin-left' : -popMargLeft
        });
        var score = "&score=" + rightAnsweredCount;
        $("#go-next-level").attr("href", $("#go-next-level").attr("href") + score);
        // Add the mask to body
        $('body').append('<div id="mask"></div>');
        $("#timeOver").css("display", "block")
        $('#mask').fadeIn(300);
    }

    function showFailedPopup()
    {
        var loginBox = document.getElementById('defeat-popup');
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
    }
});


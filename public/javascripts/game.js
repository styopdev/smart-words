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

});// complete click
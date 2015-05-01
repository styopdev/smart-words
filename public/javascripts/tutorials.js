/**
 * Created by johannes on 5/1/2015.
 */
$(document).ready(function(){

    // Animate tooltips for tutorials
    var timeDifference = 2;
    window.setTimeout(function(){  //
        $("#goback").addClass("tooltip-A");
    }, timeDifference * 1000);  // 2000
    window.setTimeout(function(){
        $("#music").addClass("tooltip-B");
    }, timeDifference * 2000);  // 4000
    window.setTimeout(function(){
        $("#timer").addClass("tooltip-C");
    }, timeDifference * 3000);  // 6000
    window.setTimeout(function(){
        $("#remove-hint").addClass("tooltip-D");
    }, timeDifference * 4000); //8000
    window.setTimeout(function(){
        $("#skip-question").addClass("tooltip-E");
    }, timeDifference * 5000); // 10000
    window.setTimeout(function(){
        $("#main-question").addClass("tooltip-F");
    }, timeDifference * 6000); // 12000
    window.setTimeout(function(){
        $("#answers").addClass("tooltip-G");
    }, timeDifference * 7000); // 14000
    window.setTimeout(function(){
        $("#progress-row").addClass("tooltip-H");
    }, timeDifference * 8000); // 16000
    window.setTimeout(function(){
        $("#completion-level").addClass("tooltip-I");
    }, timeDifference * 9000); // 18000

});// complete click
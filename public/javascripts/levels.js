/**
 * Created by johannes on 5/1/2015.
 */
var nextLevel = 5;

// Curve
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx .strokeStyle = "#F4EB49";
ctx.beginPath();
ctx.moveTo(55, 580);
ctx.bezierCurveTo(20, -40, 590, 750, 520, 10);
ctx.lineWidth = 5;
ctx.stroke();


// Circles
var canvas = document.getElementById('myCircles');
var context = canvas.getContext('2d');
var radius = 30;


function circleDetails(isPassed){
    if(isPassed){
        context.fillStyle = '#3DCC01';
        context.fill();
        context.fillStyle = '#FFFFFF';

    } else {
        context.fillStyle = '#FFFFFF';
        context.fill();
        context.fillStyle = '#000000';
    }

    context.lineWidth = 2;
    context.font = '30px  Georgia, Helvetica';

}

//circle coordinates
var circleCoords = [[45, 530], [50, 450], [65, 370], [135, 310], [240, 320], [340, 340], [460, 320], [512, 215], [518, 120], [518, 40]];
//number coordinates
var numberCoords = [[38, 538], [43, 455], [58, 375], [125, 315], [233, 325], [334, 348], [455, 325], [503, 223], [510, 125], [503, 45]];


for(var i=0; i<circleCoords.length; i++){
    context.beginPath();
    context.arc(circleCoords[i][0], circleCoords[i][1], radius, 0, 2 * Math.PI, false);
    circleDetails(nextLevel > i);
    context.fillText(i+1, numberCoords[i][0], numberCoords[i][1]);
    context.stroke();
}

// stars
function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for(var src in sources) {
        numImages++;
        console.log("numImages: ");
        console.log(numImages);
    }
    for(var src in sources) {
        images[src] = new Image();
        images[src].onload = function() {
            if(++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = sources[src];
    }
}
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var width = 16;
var height = 16;

var sources = {
    yellowStar: 'img/yellow-star.png',
    whiteStar: 'img/white-star.png'
};

loadImages(sources, function(images) {
    //star's coordinates
    //level 1
    context.drawImage(images.yellowStar, 90, 525, width, height);
    context.drawImage(images.yellowStar, 110, 525, width, height);
    context.drawImage(images.yellowStar, 130, 525, width, height);
    context.drawImage(images.yellowStar, 150, 525, width, height);
    context.drawImage(images.whiteStar, 170, 525, width, height);

    //level 2
    context.drawImage(images.yellowStar, 95, 447, width, height);
    context.drawImage(images.yellowStar, 115, 447, width, height);
    context.drawImage(images.yellowStar, 135, 447, width, height);
    context.drawImage(images.whiteStar, 155, 447, width, height);
    context.drawImage(images.whiteStar, 175, 447, width, height);

    //level 3
    context.drawImage(images.yellowStar, 110, 367, width, height);
    context.drawImage(images.yellowStar, 130, 367, width, height);
    context.drawImage(images.yellowStar, 150, 367, width, height);
    context.drawImage(images.yellowStar, 170, 367, width, height);
    context.drawImage(images.yellowStar, 190, 367, width, height);

    //level 4
    context.drawImage(images.yellowStar, 80, 255, width, height);
    context.drawImage(images.yellowStar, 100, 255, width, height);
    context.drawImage(images.yellowStar, 120, 255, width, height);
    context.drawImage(images.yellowStar, 140, 255, width, height);
    context.drawImage(images.whiteStar, 160, 255, width, height);

    //level 5
    context.drawImage(images.yellowStar, 200, 270, width, height);
    context.drawImage(images.yellowStar, 220, 270, width, height);
    context.drawImage(images.yellowStar, 240, 270, width, height);
    context.drawImage(images.yellowStar, 260, 270, width, height);
    context.drawImage(images.yellowStar, 280, 270, width, height);

    //level 6
    context.drawImage(images.whiteStar, 300, 385, width, height);
    context.drawImage(images.whiteStar, 320, 385, width, height);
    context.drawImage(images.whiteStar, 340, 385, width, height);
    context.drawImage(images.whiteStar, 360, 385, width, height);
    context.drawImage(images.whiteStar, 380, 385, width, height);

    //level 7
    context.drawImage(images.whiteStar, 420, 370, width, height);
    context.drawImage(images.whiteStar, 440, 370, width, height);
    context.drawImage(images.whiteStar, 460, 370, width, height);
    context.drawImage(images.whiteStar, 480, 370, width, height);
    context.drawImage(images.whiteStar, 500, 370, width, height);


    //level 8
    context.drawImage(images.whiteStar, 373, 210, width, height);
    context.drawImage(images.whiteStar, 393, 210, width, height);
    context.drawImage(images.whiteStar, 413, 210, width, height);
    context.drawImage(images.whiteStar, 433, 210, width, height);
    context.drawImage(images.whiteStar, 453, 210, width, height);

    //level 9
    context.drawImage(images.whiteStar, 373, 33, width, height);
    context.drawImage(images.whiteStar, 393, 33, width, height);
    context.drawImage(images.whiteStar, 413, 33, width, height);
    context.drawImage(images.whiteStar, 433, 33, width, height);
    context.drawImage(images.whiteStar, 453, 33, width, height);

    //level 10
    context.drawImage(images.whiteStar, 370, 113, width, height);
    context.drawImage(images.whiteStar, 390, 113, width, height);
    context.drawImage(images.whiteStar, 410, 113, width, height);
    context.drawImage(images.whiteStar, 430, 113, width, height);
    context.drawImage(images.whiteStar, 450, 113, width, height);
});



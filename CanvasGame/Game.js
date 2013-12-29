"use strict";
window.onload = function () {
    var game = new Game();
    game.startGame();
};

function Game() {
    var animFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        null;

    if (!canvas) {
        canvas = document.querySelector("canvas");
    } else if (!canvas || !canvas.getContext) {
        throw Error("canvas verkar inte stödjas, eller så är inte objektet av typen canvas");
    }

    var context = canvas.getContext('2d'); 
    var x = 150; 
    var y = 150; 
    var dx = 2; 
    var dy = 4;

    this.startGame = function () {
        if (animFrame !== null) {
            var recursiveAnim = function () {
                mainloop();
                animFrame(recursiveAnim);
            };
            // start the mainloop
            animFrame(recursiveAnim);
        } else { //Browser support
            var ONE_FRAME_TIME = 1000.0 / 60.0;
            setInterval(mainloop, ONE_FRAME_TIME);
        }
    };

    function mainloop() {
        updateGame();
        drawGame();
   };

   function updateGame() {
       //Updatera spelet här
       x += dx;

       if (y + dy > canvas.height) {
           y = canvas.height
       } else {
           y += dy;
       }
   };

   function drawGame() {
       //Rita spelet här
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.arc(x, y, 10, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
    };
};




//this.draw = function () {
//    context.clearRect(0, 0, 300, 300);
//    context.beginPath();
//    context.arc(x, y, 10, 0, Math.PI * 2, true);
//    context.closePath();
//    context.fill();
//    x += dx;
//    y += dy;

//    //Game.context.beginPath();
//    //Game.context.arc(75, 75, 10, 0, Math.PI * 2);
//    //Game.context.closePath();
//    //Game.context.fill();

//    //Game.context.fillStyle = "#00A308";
//    //Game.context.beginPath();
//    //Game.context.arc(220, 220, 50, 0, Math.PI * 2, true);
//    //Game.context.closePath();
//    //Game.context.fill();

//    //Game.context.fillStyle = "#FF1C0A";
//    //Game.context.beginPath();
//    //Game.context.arc(100, 100, 100, 0, Math.PI * 2, true);
//    //Game.context.closePath();
//    //Game.context.fill();

//    ////the rectangle is half transparent
//    //Game.context.fillStyle = "rgba(255, 255, 0, .5)"
//    //Game.context.beginPath();
//    //Game.context.rect(15, 150, 120, 120);
//    //Game.context.closePath();
//    //Game.context.fill();
//}


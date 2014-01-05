"use strict";
window.onload = function () {
    var game = new Game();
    game.startGame();
};

function Game(canvas) {
    var animFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        null;

    if (!animFrame) {
        throw Error("Observerar att animationFrame stöds inte"); 
    }
    if (!canvas) {
        canvas = document.querySelector("canvas");
    } else if (!canvas || !canvas.getContext) {
        throw Error("canvas verkar inte stödjas, eller så är inte objektet av typen canvas");
    }

    var context = canvas.getContext('2d'); 

    context.scale(1.5, 1.5);

    var startTime = new Date().getTime();
    var fps = 0;

    var gsm = new GameState(canvas, null); 

    this.startGame = function () {
        if (animFrame !== null) {
            var recursiveAnim = function () {
                mainloop();
                animFrame(recursiveAnim);
            };
            // start the mainloop
            animFrame(recursiveAnim);
        }
        else { //Browser support
            var ONE_FRAME_TIME = 1000.0 / 60.0;
            setInterval(mainloop, ONE_FRAME_TIME);
        }
    };

    function mainloop() {
        updateGame();
        drawGame();
        fpsCounter();
   };

   function updateGame() {
       //Updatera spelet här
       gsm.update();
   };

   function drawGame() {
       //Rita spelet här
       context.clearRect(0, 0, canvas.width, canvas.height);

       //function canvasUpdate() {
       //    context.drawImage(tempCanvas, 0, 0);
       //    tempContext.clearRect(0, 0, canvas.width, canvas.height);
       //};

       gsm.draw(context);
   };

    //Räknar endast FPS och skriver ut dessa
   function fpsCounter() {
       var currentTime = new Date().getTime(); 
       if ((currentTime - startTime) > 1000) {
           document.querySelector(".info").innerHTML = "fps: "+  fps; 
           fps = 0;
           startTime = currentTime;
       } else {
           fps++;
       }
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


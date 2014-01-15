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
60
    context.scale(1.5, 1.5);

    var startTime = new Date().getTime();
    var fps = 0;

    var gsm = new Game.GameState(canvas, null); 

    this.startGame = function () {
        if (animFrame !== null) {
            var recursiveAnim = function () {
                mainloop();
                animFrame(recursiveAnim);
            };
            // start the mainloop
            animFrame(recursiveAnim);
        }
        else { //Browser suppotr
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
       gsm.update();
   };

   function drawGame() {
       //Rita spelet här
       context.clearRect(0, 0, canvas.width, canvas.height);
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

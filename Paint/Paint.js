"use strict";
window.onload = function () {
    var paint = new Paint();
    paint.init();
};

function Paint(canvas) {
    if (!canvas) { canvas = document.querySelector("canvas"); }
    if (!canvas && canvas.getContext) {
        throw Error("canvas verkar inte stödjas, eller så är inte objektet av typen canvas");
    }
    var tempCanvas = document.createElement("canvas"); //Kommer hålla den temporära canvasen för att ordna live feedback och undvicka att rita ut massor av rektanglar
    var tempContext;

    var context = canvas.getContext('2d');
    var started = false;
    var startX, startY;
    var selectTool = document.getElementById("tools");
    var selectSize = document.getElementById("size");

    if (!selectTool) {
        throw Error("Verkar inte hitta select objektet WTF!?!"); 
    }

    var tool = selectTool.value;//new Tool(select.value, canvas, context); //Detta gör det krångligare känns det som

    this.init = function () {
        tempCanvas.id = "tempCanvas"; 
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        tempContext = tempCanvas.getContext('2d');

        canvas.parentNode.appendChild(tempCanvas);

        tempCanvas.addEventListener('mousedown', mouseDown, false);
        tempCanvas.addEventListener('mouseup', mouseUp, false);
    };

    function mouseMove(e) {
        var size = +selectSize.value;
        if (isNaN(size)) {
            size = 1;
        }
        if (selectTool.value === 'pencil') {
            var x, y;
            //context.fillStyle = '#00f'; // blue
            //context.strokeStyle = '#f00'; // red
            tempContext.strokeStyle = '#f00'; // red
            tempContext.lineWidth = size;
            if (e.layerX || e.layerX == 0) { // Firefox
                x = e.layerX;
                y = e.layerY;
            } else if (e.offsetX || e.offsetX == 0) { // Opera
                x = e.offsetX;
                y = e.offsetY;
            }
            tempCanvas.addEventListener('mouseout', mouseUp, false);
            //The event handler works like a drawing pencil which tracks the mouse 
            //movements. We start drawing a path made up of lines.
            if (!started) {
                tempContext.beginPath();
                tempContext.moveTo(x, y);
                started = true;
            } else {
                tempContext.lineTo(x, y);
                tempContext.stroke();
            }
        } else if (selectTool.value === 'rect') {
            tempContext.strokeStyle = '#000000';
            tempContext.lineWidth = size;

            var x = Math.min(e.offsetX, startX),
                y = Math.min(e.offsetY, startY),
                w = Math.abs(e.offsetX - startX),
                h = Math.abs(e.offsetY - startY);

            tempContext.clearRect(0, 0, canvas.width, canvas.height);

            if (!w || !h) {//Kontrollera ifall något ar NaN inna det används
                return;
           }
           tempContext.strokeRect(x, y, w, h);
        }
    };

    function mouseDown(e) {
        if (!e.target === canvas) { return }

        startX = e.offsetX;
        startY = e.offsetY; 
        tempCanvas.addEventListener('mousemove', mouseMove, false);
    };

    function canvasUpdate() {
        context.drawImage(tempCanvas, 0, 0);
        tempContext.clearRect(0, 0, canvas.width, canvas.height);
    };

    function mouseUp(e) {
        tempCanvas.removeEventListener('mousemove', mouseMove, false);
        tempCanvas.removeEventListener('mouseout', mouseUp, false);
        canvasUpdate(); //Färdig med ritandet, kopiera det vi ritat i Tempcanvas till canvas, behöver endast göras när det ritas rekt
        started = false;
    };
}
"use strict";
window.onload = function () {
    var paint = new Paint();
    paint.init();
};
function Paint(canvas) {
    var tool;
    var tempCanvas;
    
    this.init = function (canvas) {
        if (!canvas) {
            canvas = document.querySelector("canvas");
        }
        if (!canvas || !canvas.getContext) {
            throw Error("canvas verkar inte stödjas, eller så är inte objektet av typen canvas");
        }
        var context = canvas.getContext('2d');
        
        console.log(context);
        
        tool = new Tool(canvas, context);

        tempCanvas = tool.init();
        tempCanvas.addEventListener('mousedown', mouseDown, false);
        tempCanvas.addEventListener('mouseup', mouseUp, false);
        canvas.parentNode.appendChild(tempCanvas);
    };

    function mouseMove(e) {
        tempCanvas.addEventListener('mouseout', mouseUp, false);
        //Bör lösa detta bättre, beräkna vart x och y musen är och sen binda detta när x = offsetX + 10
        //var clientRect = tempCanvas.getBoundingClientRect()
        //console.log(tempCanvas.getBoundingClientRect());
        //console.log(rect.top, rect.right, rect.bottom, rect.left);
        //console.log(e.pageX);
        tool.startDraw(e);
    };

    function mouseDown(e) {
        if (e.target !== tempCanvas) {
            return
        }
        var x, y;
        tempCanvas.addEventListener('mousemove', mouseMove, false);

        //Vet inte ifall dessa behövs
        if (e.layerX || e.layerX == 0) { // Firefox
            x = e.layerX;
            y = e.layerY;
        } else if (e.offsetX || e.offsetX == 0) { // Opera
            x = e.offsetX;
            y = e.offsetY;
        } 
        tool.start(x, y);
    };

    function mouseUp(e) {
        tempCanvas.removeEventListener('mousemove', mouseMove, false);
        tempCanvas.removeEventListener('mouseout', mouseUp, false);
        tool.stopDraw();
    };
}
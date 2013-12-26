"use strict";
function Tool(type, canvas, context) {
    

    this.setTool = function (toolType) {
        type = toolType; 
    };

    this.getTool = function () {
        return type; 
    };

    this.use = function () {
        if (tool.getTool() === 'pencil') {
            var x, y;
            if (e.layerX || e.layerX == 0) { // Firefox
                x = e.layerX;
                y = e.layerY;
            } else if (e.offsetX || e.offsetX == 0) { // Opera
                x = e.offsetX;
                y = e.offsetY;
            }
            canvas.addEventListener('mouseout', mouseUp, false);
            //The event handler works like a drawing pencil which tracks the mouse 
            //movements. We start drawing a path made up of lines.
            if (!started) {
                context.beginPath();
                context.moveTo(x, y);
                started = true;
            } else {
                context.lineTo(x, y);
                context.stroke();
            }
        } else if (tool.getTool() === 'rect') {
            var x = Math.min(e.offsetX, startX),
                y = Math.min(e.offsetY, startY),
                w = Math.abs(e.offsetX - startX),
                h = Math.abs(e.offsetY - startY);

            context.clearRect(0, 0, canvas.width, canvas.height);

            if (!w || !h) {
                return;
            }

            context.strokeRect(x, y, w, h);
        }
    }
}
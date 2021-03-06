"use strict";
function TileMap() {
    var tilesetImage = new Image();
    tilesetImage.src = 'tiles/levelTiles.png';

    var loaded = false;
    tilesetImage.onload = function () {
        loaded = true; 
    };
    
    var tileTypes = [
    [160, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 60, 60, 60, 60],
    [20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 60, 120, 120, 60],
    [20, 0, 140, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 60, 60, 0, 0, 40],
    [20, 20, 20, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 0, 40, 40],
    [20, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 0, 40, 0, 40, 40],
    [20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 0, 40, 0, 40, 40],
    [20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 40, 40],
    [20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 120, 120, 120, 60, 60],
    [20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40],
    [20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40],
    [20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40],
    [20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 80, 140, 0, 0, 0, 0, 0, 40],
    [20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 20, 0, 0, 0, 0, 0, 40],
    [20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 180, 160, 0, 0, 0, 0, 0, 40],
    [20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40],
    [20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 80, 100, 140, 0, 40],
    [20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 0, 20, 0, 40],
    [20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 0, 20, 0, 40],
    [20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 40, 0, 0, 0, 40],
    [60, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 60, 100, 100, 100, 60]
    ];

    this.draw = function (context) {
        //context.beginPath();
        if (loaded) {
            for (var i = 0; i < tileTypes.length; i++) {
                for (var j = 0; j < tileTypes[i].length; j++) {
                    if (tileTypes[i][j] !== 0) {
                        context.drawImage(tilesetImage, tileTypes[i][j], 0, 20, 20, (j * 20), (i * 20), 20, 20);
                    }
                }
            }
        }
        //context.closePath();
        //context.fill();
    };
    //drawImage(image,sx,sy,sw,sh,dx,dy,dw,dh) copies all or part of a source image to the canvas. 
        //You can place and size the destination image by using the destination parameters.

    this.getTiles = function () {
        return tileTypes; 
    };

    this.getTileSize = function () {
        return 20; 
    };
};

function Tile(type) {
    var width = 20;
    var height = 20;
    var destroyed;
    this.tileType = type; 
}; 
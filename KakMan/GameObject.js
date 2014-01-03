"use strict";
function GameObject() {
};

GameObject.prototype.draw = function (context) {};
GameObject.prototype.update = function (object) {};

function Player(canvas, TM) {
    GameObject.call(this);
    var x = 30;
    var y = 30;

    var tempX = 0; //Dessa m�ste �nv�ndas f�r "en pixel" buggen
    var tempY = 0;
    var dx = 0;
    var dy = 0;
    var radius = 10;

    var tiles = TM.getTiles();
    var tileSize = TM.getTileSize();
    
    var moving = false;

    var topLeft = false;
    var topRight = false;
    var bottomLeft = false;
    var bottomRight = false;

    var playerImage = new Image();
    playerImage.src = 'tiles/player.png';

    this.update = function () {
        checkTileMapCollision();
    };

    this.draw = function (context) {
        //context.beginPath();
        //context.arc(x, y, radius, 0, Math.PI * 2, true);
        //context.rect(x - radius, y - radius, radius*2, radius*2, false); 
        //context.closePath();
        //context.fill();
        context.drawImage(playerImage, x - radius, y - radius, 20, 20);
    }; 

    this.setDirectionX = function (dir) {
        dx = dir; 
    };

    this.setDirectionY = function (dir) {
        dy = dir; 
    };

    //function checkCollisions() {
    //    var leftX = Math.ceil((x- radius - 1) / 20) -1;//Den x tile som �r direkt till f�nster om playern
    //    var rightX = Math.ceil((x+ radius + 1)/20) -1; //Den x tile som �r direkt till h�ger om playa
    //    var rowCeil = Math.ceil((y + radius) / 20) - 1; //Den tile y som playa befinner sig p�
    //    var rowFloor = Math.floor((y + radius) / 20) - 1; //Den tile y som playa befinner sig p� avrundat ned�t

    //    canMoveRight = (tiles[rowCeil][rightX] === 0) && (tiles[rowFloor][rightX] === 0);
    //    canMoveLeft = (tiles[rowCeil][leftX] === 0) && (tiles[rowFloor][leftX] === 0);

    //    var colCeil = Math.ceil((x+ radius) / 20) - 1; //Den x tile spelaren befinner sig p� 
    //    var colFloor = Math.ceil((x- radius +1) / 20) -1;
    //    var topY = Math.floor((y - radius - 1) / 20);
    //    var bottomY = Math.ceil((y + radius + 1) / 20) - 1;

    //    if (topY >= 0) {
    //        canMoveUp = (tiles[topY][colCeil] === 0) && (tiles[topY][colFloor] === 0);
    //    }
    //    if (bottomY <= 19) {
    //        canMoveDown = (tiles[bottomY][colCeil] === 0) && (tiles[bottomY][colFloor] === 0);
    //    }
    //};

    function checkTileMapCollision() {
        var xdest = x + dx;
        var ydest = y + dy;

        var currCol = Math.floor(x / tileSize);
        var currRow = Math.floor(y / tileSize);
		
        tempX = x;
        tempY = y;

        calculateCorners(xdest, y); //Ber�knar f�r x
        if (dx < 0)//g�r �t v�nster
        {
            if (topLeft || bottomLeft) {
                dx = 0;
                tempX = currCol * tileSize + radius; //Ifall det �r n�got i v�gen s�tt x v�rdet till det som �r i v�gen + h�lften av objektets egen bredd
            }
            else {
                tempX += dx;
            }
        } else if (dx > 0) { //G�r �t h�ger
            if (topRight || bottomRight) {
                dx = 0;
                tempX = (currCol + 1) * tileSize - radius;
            }
            else {
                tempX += dx;
            }
        }
        calculateCorners(x, ydest); //Ber�knar f�r y
        if (dy < 0)//g�r upp�t
        {
            if (topLeft || topRight) {
                dy = 0;
                tempY = currRow * tileSize + radius;
            }
            else {
                tempY += dy;
            }
        } else if (dy > 0) { //G�r �t h�ger
            if (bottomLeft|| bottomRight) {
                dy = 0;
                tempY = (currRow + 1) * tileSize - radius;
            }
            else {
                tempY += dy;
            }
        }

        y = tempY;
        x = tempX; 
    };

    function calculateCorners(x, y) {
        var leftTile = Math.floor((x - radius) / tileSize);
        var rightTile = Math.floor((x + radius -1)/ tileSize);
        var topTile = Math.floor((y - radius) / tileSize);
        var bottomTile = Math.floor((y + radius- 1) / tileSize);

        //S�tter de booleanska v�rderna
        topLeft = tiles[topTile][leftTile] !== 0;
        topRight = tiles[topTile][rightTile] !== 0;
        bottomLeft = tiles[bottomTile][leftTile ] !== 0;
        bottomRight = tiles[bottomTile][rightTile] !== 0;
    };
};

function Animation(image, time) {
    this.getImage = function () {
        return image; 
    };
};

//var animation = new Animation('tiles/player.png', 200);
//function checkTileCollision() {
//    var leftX = Math.ceil((tempX - radius - 1) / 20) - 1;//Den X tile som �r direkt till f�nster om playern
//    var rightX = Math.ceil((tempX + radius + 1) / 20) - 1; //Den X tile som �r direkt till h�ger om playa
//    var rowCeil = Math.ceil((tempY + radius) / 20) - 1; //Den tile Y som playa befinner sig p�
//    var rowFloor = Math.floor((tempY + radius) / 20) - 1; //Den tile Y som playa befinner sig p� avrundat ned�t

//    if (dx > 0 && tiles[rowCeil][rightX] === 0 && (tiles[rowFloor][rightX] === 0)) {
//        x = tempX;
//    }
//    if (dx < 0 && (tiles[rowCeil][leftX] === 0) && (tiles[rowFloor][leftX] === 0)) {
//        x = tempX;
//    }
//    //canMoveRight = (tiles[rowCeil][rightX] === 0) && (tiles[rowFloor][rightX] === 0);
//    //canMoveLeft = (tiles[rowCeil][leftX] === 0) && (tiles[rowFloor][leftX] === 0);

//    var colCeil = Math.ceil((tempX + radius) / 20) - 1; //Den tempX tile spelaren befinner sig p� 
//    var colFloor = Math.ceil((tempX - radius + 1) / 20) - 1;
//    var topY = Math.floor((tempY - radius - 1) / 20);
//    var bottomY = Math.ceil((tempY + radius + 1) / 20) - 1;

//    if (topY >= 0) {
//        canMoveUp = (tiles[topY][colCeil] === 0) && (tiles[topY][colFloor] === 0);
//    }
//    if (bottomY <= 19) {
//        canMoveDown = (tiles[bottomY][colCeil] === 0) && (tiles[bottomY][colFloor] === 0);
//    }

//    if (canMoveUp && dy < 0) {
//        y = tempY;
//    }
//    if (canMoveDown && dy > 0) {
//        y = tempY;
//    }
//};

////checkTileCollision(); 
//checkCollisions();

//if (canMoveRight && dx > 0) {
//    if ((x+ dx + radius) > canvas.width) {
//        x= canvas.width - radius;
//    } else {
//        x+= dx;
//    }
//} else if (dx < 0 && canMoveLeft) {
//    if (x+ dx < radius) {
//        x= radius;
//    } else {
//        x+= dx;
//    }
//}
//if (canMoveUp && dy < 0) {
//    if (y + dy < radius) {
//        y = radius;
//    } else {
//        y += dy;
//    }
//} else if (dy > 0 && canMoveDown){
//    if((y + dy + radius) > canvas.height) {
//        y = canvas.height - radius;
//    } else {
//        y += dy;
//    }
//}
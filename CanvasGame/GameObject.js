"use strict";
function GameObject() {
};

GameObject.prototype.draw = function (context) {};
GameObject.prototype.update = function (object) {};

function Player(canvas, TM) {
    GameObject.call(this);
    var x = 30;
    var y = 30;
    var tempX = 0; //Dessa måste änvändas för "en pixel" buggen
    var tempY = 0;
    var dx = 0;
    var dy = 0;
    var radius = 10;
    var tiles = TM.getTiles();

    var canMoveUp = false; 
    var canMoveRight = false;
    var canMoveLeft = false;
    var canMoveDown = false;

    var playerImage = new Image();
    playerImage.src = 'tiles/player.png';

    //var animation = new Animation('tiles/player.png', 200);

    this.update = function () {
        checkCollisions();

        if (canMoveRight && dx > 0) {
            if ((x+ dx + radius) > canvas.width) {
                x= canvas.width - radius;
            } else {
                x+= dx;
            }
        } else if (dx < 0 && canMoveLeft) {
            if (x+ dx < radius) {
                x= radius;
            } else {
                x+= dx;
            }
        }
        if (canMoveUp && dy < 0) {
            if (y + dy < radius) {
                y = radius;
            } else {
                y += dy;
            }
        } else if (dy > 0 && canMoveDown){
            if((y + dy + radius) > canvas.height) {
                y = canvas.height - radius;
            } else {
                y += dy;
            }
        }
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

    function checkCollisions () {
        var leftX = Math.ceil((x- radius - 1) / 20) -1;//Den x tile som är direkt till fönster om playern
        var rightX = Math.ceil((x+ radius + 1)/20) -1; //Den x tile som är direkt till höger om playa
        var rowCeil = Math.ceil((y + radius) / 20) - 1; //Den tile y som playa befinner sig på
        var rowFloor = Math.floor((y + radius) / 20) - 1; //Den tile y som playa befinner sig på avrundat nedåt

        canMoveRight = (tiles[rowCeil][rightX] === 0) && (tiles[rowFloor][rightX] === 0);
        canMoveLeft = (tiles[rowCeil][leftX] === 0) && (tiles[rowFloor][leftX] === 0);

        var colCeil = Math.ceil((x+ radius) / 20) - 1; //Den x tile spelaren befinner sig på 
        var colFloor = Math.ceil((x- radius +1) / 20) -1;
        var topY = Math.floor((y - radius - 1) / 20);
        var bottomY = Math.ceil((y + radius + 1) / 20) - 1;

        if (topY >= 0) {
            canMoveUp = (tiles[topY][colCeil] === 0) && (tiles[topY][colFloor] === 0);
        }
        if (bottomY <= 19) {
            canMoveDown = (tiles[bottomY][colCeil] === 0) && (tiles[bottomY][colFloor] === 0);
        }
    };
};

function Animation(image, time) {
    this.getImage = function () {
        return image; 
    };


};

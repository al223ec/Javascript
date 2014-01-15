"use strict";
Game.GameObject = function (canvas, TM) {
    var x = 30;
    var y = 30;

    var tempX = 0; //Dessa måste användas för "en pixel" buggen
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

    this.animation = null; 

    //Getters
    this.getX = function () { return x; }
    this.getY = function () { return y; }
    this.getRadius = function () { return radius; }

    //setters
    this.setRadius = function (value) { radius = value; };

    this.update = function () {
        throw Error("Alla gameObjects behöver en updatera funktion");
    };

    this.draw = function (context) {
        throw Error("Alla gameObjects behöver en draw function ritas"); 
    };

    this.setDirectionX = function (dir) {
        dx = dir;
    };

    this.setDirectionY = function (dir) {
        dy = dir;
    };

    this.checkTileMapCollision = function() {
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
            if (bottomLeft || bottomRight) {
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
        var rightTile = Math.floor((x + radius - 1) / tileSize);
        var topTile = Math.floor((y - radius) / tileSize);
        var bottomTile = Math.floor((y + radius - 1) / tileSize);

        //S�tter de booleanska v�rderna
        topLeft = tiles[topTile][leftTile] !== 0;
        topRight = tiles[topTile][rightTile] !== 0;
        bottomLeft = tiles[bottomTile][leftTile] !== 0;
        bottomRight = tiles[bottomTile][rightTile] !== 0;
    };
    this.checkCollision = function (obj) {
        if (!(obj && obj.getX)) {
            throw Error("kontrollera argument till checkcollision"); 
        }

        if ((obj.getX() < x + radius && obj.getX() > x - radius) && (obj.getY() < y + radius && obj.getY() > y - radius)) {
            obj.hit();
            return true; 
        }
    }; 
};
Game.GameObject.Item = function () {
}; 

Game.GameObject.Player = function(canvas, TM) {
    Game.GameObject.call(this, canvas, TM);

    var health = 5;
    this.isInvulnerable  = false;

    var playerImage = new Image();
    playerImage.src = 'tiles/player.png';
    this.animation = new Game.GameObject.Animation(playerImage);

    this.setRadius(10);
    var that = this; 
    this.update = function () {
        this.checkTileMapCollision(); 
    }; 
    this.draw = function (context) {
         context.drawImage(playerImage, this.getX() - this.getRadius(), this.getY() - this.getRadius(), 20, 20);
    };
    this.hit = function (damage) {
        if (!this.isInvulnerable) {
            health -= 1;
            this.isInvulnerable = true;
            setTimeout(function () {
                that.isInvulnerable = false;
            }, 2000); 
        }
        document.getElementById("gameStats").innerHTML = health; 
    }; 
};
Game.GameObject.Player.prototype = Game.GameObject.prototype;

Game.GameObject.Enemy = function (canvas, TM, player) {
    Game.GameObject.call(this, canvas, TM);

    var img = new Image();
    img.src = 'tiles/player.png';

    //Bör implementera olika status för fienden jaganda/ idle
    var isHunting = true; 

    this.draw = function (context) {
        context.drawImage(img, this.getX() - this.getRadius(), this.getY() - this.getRadius(), 20, 20);
    };

    this.update = function () {
        this.checkTileMapCollision();

        if (isHunting) {
            if (player.getX() < this.getX()) {
                this.setDirectionX(-2);
            } else if (player.getX() > this.getX()) {
                this.setDirectionX(2);
            } else {
                this.setDirectionX(0);
            }

            if (player.getY() < this.getY()) {
                this.setDirectionY(-2);
            } else if (player.getY() > this.getY()) {
                this.setDirectionY(2);
            } else {
                this.setDirectionY(0);
            }
        }
        this.checkCollision(player);
    };
};

Game.GameObject.Enemy.prototype = Game.GameObject.prototype;

Game.GameObject.Animation = function(image, time) {
    this.getImage = function () {
        return image;
    };
};

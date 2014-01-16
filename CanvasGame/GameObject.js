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

    this.topLeft = false;
    this.topRight = false;
    this.bottomLeft = false;
    this.bottomRight = false;

    this.animation = null;
    var that = this;

    //Getters
    this.getX = function () { return x; }
    this.getY = function () { return y; }
    this.getRadius = function () { return radius; }

    this.getTileSize = function () { return tileSize; }
    this.getTiles = function () { return tiles; }
    this.getDx = function () { return dx; }
    this.getDy = function () { return dy; }

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

        calculateCorners(xdest, y); //Beräknar för x
        if (dx < 0)//går åt vänster
        {
            if (that.topLeft || that.bottomLeft) {
                dx = 0;
                tempX = currCol * tileSize + radius; //Ifall det �r n�got i v�gen s�tt x v�rdet till det som �r i v�gen + h�lften av objektets egen bredd
            }
            else {
                tempX += dx;
            }
        } else if (dx > 0) { //Går �t höger
            if (that.topRight || that.bottomRight) {
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
            if (that.topLeft || that.topRight) {
                dy = 0;
                tempY = currRow * tileSize + radius;
            }
            else {
                tempY += dy;
            }
        } else if (dy > 0) { //Går nedåt
            if (that.bottomLeft || that.bottomRight) {
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
        that.topLeft = tiles[topTile][leftTile] !== 0;
        that.topRight = tiles[topTile][rightTile] !== 0;
        that.bottomLeft = tiles[bottomTile][leftTile] !== 0;
        that.bottomRight = tiles[bottomTile][rightTile] !== 0;
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
    var isIdle = false;
    var states = {
        hunting: function (that) {
            if (player.getX() < that.getX()) {
                that.setDirectionX(-2);
            } else if (player.getX() > that.getX()) {
                that.setDirectionX(2);
            } else {
                that.setDirectionX(0);
            }
            if (player.getY() < that.getY()) {
                that.setDirectionY(-2);
            } else if (player.getY() > that.getY()) {
                that.setDirectionY(2);
            } else {
                that.setDirectionY(0);
            }
        },
        idle: function(that){
        },
    }; 
    var canSeePlayer = true;
    var moveRight = false, moveLeft = false, moveUp = false, moveDown = false; 

    this.draw = function (context) {
        context.drawImage(img, this.getX() - this.getRadius(), this.getY() - this.getRadius(), 20, 20);
    };

    this.update = function () {
        this.checkTileMapCollision();

        if (isHunting) {
            states.hunting(this);

        } else if (isIdle) {
            this.setDirectionX(0);
            this.setDirectionY(0);

            //if (!moveRight && !(this.topLeft && this.bottomLeft)) {
            //    console.log("åt vänster");
            //    moveLeft = true;
            //} else if (!moveRight && this.topLeft || this.bottomLeft) {
            //    console.log("kan inte röra sig åt vänster");
            //    moveLeft = false; 
            //}

            //if (!moveLeft && !this.topRight && this.bottomRight) {
            //    moveRight = true;
            //} else if (this.topRight || this.bottomRight) {
            //    console.log("kan inte röra sig åt höger");
            //    moveRight = false;
            //}
            
            //if (!moveDown && !this.topLeft && this.topRight) {
            //    moveUp = true;
            //} else if (this.topLeft || this.topRight) {
            //    moveUp = false;
            //}

            //if (!moveUp && !this.bottomLeft && this.bottomRight) {
            //    moveDown = true;
            //} else if (this.bottomLeft || this.bottomRight) {
            //    moveDown = false;
            //}

            //if (moveRight) {
            //    this.setDirectionX(2);
            //}
            //if (moveLeft) {
            //    this.setDirectionX(-2);
            //}
            //if (moveUp) {
            //    this.setDirectionY(-2);
            //}
            //if (moveDown) {
            //    this.setDirectionY(2);
            //}

        }

        this.checkWherePlayerIs(); 
        this.checkCollision(player);
        changeState(); 
    };
    function changeState() {
        setTimeout(function () {
            if (canSeePlayer) {
                isHunting = true;
                isIdle = false;
            } else {
                isIdle = true;
                isHunting = false;
            }
        }, 1000);
    }; 

    this.checkWherePlayerIs = function () {

        var pCurrCol = Math.floor(player.getX() / this.getTileSize());
        var pCurrRow = Math.floor(player.getY() / this.getTileSize());

        var eCurrCol = Math.floor(this.getX() / this.getTileSize());
        var eCurrRow = Math.floor(this.getY() / this.getTileSize());

        var distansCol = pCurrCol - eCurrCol;
        var distansRow = pCurrRow - eCurrRow; //kan kolla varje row som skiljer samtidigt
        var canSeeRight = true, canSeeLeft = true, canSeeUp = true, canSeeDown = true; 

        if (pCurrCol > eCurrCol) {
            for (var i = 0; i < distansCol; i++) {
                canSeeRight = this.getTiles()[eCurrRow][eCurrCol + i] === 0;
                if (!canSeeRight) {
                    break; 
                }
            }
        } 
        distansCol = eCurrCol - pCurrCol;
        if (pCurrCol < eCurrCol) {
            for (var i = 0; i < distansCol; i++) {
                canSeeLeft = this.getTiles()[eCurrRow][eCurrCol - i] === 0;
                if (!canSeeLeft) {
                    break;
                }
            }
        } 
        distansCol = pCurrRow - eCurrRow
        if (pCurrRow > eCurrRow) {
            for (var i = 0; i < distansCol; i++) {
                canSeeUp = this.getTiles()[eCurrRow + i][eCurrCol] === 0;
                if (!canSeeUp) {
                    break;
                }
            }
        }
        distansCol = eCurrRow - pCurrRow;
        if (pCurrRow < eCurrRow) {
            for (var i = 0; i < distansCol; i++) {
                canSeeDown = this.getTiles()[eCurrRow - i][eCurrCol] === 0;
                if (!canSeeDown) {
                    break;
                }
            }
        }
        canSeePlayer = canSeeRight && canSeeLeft && canSeeUp && canSeeDown;

        console.log(canSeePlayer);//
       //Måste kolla en tile ovanför s
    };
};

Game.GameObject.Enemy.prototype = Game.GameObject.prototype;
Game.GameObject.Animation = function(image, time) {
    this.getImage = function () {
        return image;
    };
};

"use strict";
Game.GameState = function(canvas, tileMap) {
    var currentState = 0;
    var states = []; //Kommer hålla de olika levlarna
    var tileMap = new TileMap();
    var playa = new Game.GameObject.Player(canvas, tileMap);
    var enemy = new Game.GameObject.Enemy(canvas, tileMap, playa);

    window.addEventListener("keydown", keyDown, false);
    window.addEventListener("keyup", keyUp, false);
    //keydown keypress keyup

    function keyDown(e) {
        if (e.keyCode === 68) {
            playa.setDirectionX(4);
        }

        if (e.keyCode === 65) {
            playa.setDirectionX(-4);
        }

        if (e.keyCode === 83) {
            playa.setDirectionY(4);
        }

        if (e.keyCode === 87) {
            playa.setDirectionY(-4);
        }
    };

    function keyUp(e) {
        if (e.keyCode === 65) {
            playa.setDirectionX(0);
        }

        if (e.keyCode === 68) {
            playa.setDirectionX(0);
        }

        if (e.keyCode === 87) {
            playa.setDirectionY(0);
        }

        if (e.keyCode === 83) {
            playa.setDirectionY(0);
        }
    };

    this.draw = function (context) {
        playa.draw(context);
        enemy.draw(context);
        tileMap.draw(context);
    };

    this.update = function () {
        enemy.update();
        playa.update();
    };
}; 
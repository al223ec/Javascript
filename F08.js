"use strict";
//V�ntar och sen utf�r n�got
//setTimeout(myAppp.myFunktion, 3000); 
var BartBoard = function (text, boardId) {
    var div = document.getElementById(boardId);
    var i = 0;
    var intervallId

    var write = function () {
        //Skriv ut ett tecken
        div.innerHTML += text[i];
        i++;
        if (i >= text.length) {
            i = 0;
        }
    }
    div.onmousedown = function () {
        //intervallId = setInterval(function () {
        //    //Skriv ut ett tecken
        //    div.innerHTML += text[i];
        //    i++;
        //    if (i >= text.length) {
        //        i = 0;
        //    }
        //}, 100);
    intervallId = setInterval(write, 100);
    };
    div.onmouseup = function () {
        clearInterval(intervallId);
        console.log("mouse up");
    };

};

window.onload = function () {
    new BartBoard("I will not pollute the global window", "board1");
    new BartBoard("Crowford I will not pollute the global window", "board2");
};
"use strict";
var digit_name = (function () {
    var names = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

    return function (n) {
        return names[n]; 
    };
}());

var digit_name2 = (function () {
    var names; //Undefiened endast första gången denna kallas, detta hanteras mao som ett object

    return function (n) {
        if (!names) {
            names = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
        }
        return names[n];
    };
}());

//Fade function
//The toString() method parses its first argument, and attempts to return a string representation in the 
//specified radix (base). For radixes above 10, the letters of the alphabet indicate numerals greater than 
//9. For example, for hexadecimal numbers (base 16), a through f are used
function fade(id) {
    var dom = document.getElementById(id), level = 1;
    function step() {
        var h = level.toString(16); //for hexadecimal numbers (base 16), a through f are used.

        dom.style.backgroundColor = '#FFFF' + h + h;
        if (level < 15) {
            level += 1;
            setTimeout(step, 100); 
        }
    }
    setTimeout(step, 100);
};
//bör ju skicka objreferensen ifall detta ska vara praktiskt
function minimizeHeight(id) {
    var dom = document.getElementById(id), height = dom.offsetHeight;

    function step() {
        dom.style.height = height + 'px';
        console.log(height);
        if (height > 0) {
            height -= 1;
            setTimeout(step, 2);
        }
    }
   setTimeout(step, 2);
};
function minimizeWidth(id) {
    var dom = document.getElementById(id), width = dom.offsetWidth;

    function step() {
        //var h = level.toString(16); //for hexadecimal numbers (base 16), a through f are used.
        //console.log(level.toString());
        dom.style.width = width + 'px';
        if (width > 0) {
            width -= 10; 
            setTimeout(step, 20);
        }
    }
    setTimeout(step, 20);
};

//Funktioner som kallar sig själv finns alltid kvar och hanteras som objekt, dvs variblarna behåller sina tilldelade värden. 
//Funktioner hanteras som objekt där variablarna behåller sina värden. 
console.log(digit_name2(3));
console.log(digit_name2(3));
console.log(digit_name2(3));
console.log(digit_name2(3));

fade("content");
minimizeHeight("content");
minimizeWidth("content");





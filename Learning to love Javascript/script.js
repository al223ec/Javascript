"use strict";
//closures
function getCtr() {//Detta blir alltså ett objekt
    var i = 0;
    return function () { //Scope
        console.log(i += 1);
    };
};

var ctr = getCtr();
ctr(); //1
ctr(); //2
//Function är det enda som kan skapa scope

var obj = {
    item: "value",
};
obj.item === obj["item"] //True

var list = ["howdy", "pardner"];
list["otherGreeting"] = "hola";

list[0] === "howdy"; //True
list["otherGreeting"] === "hola" //True 

list["otherGreeting"]; //hola

//Allt mutable
obj.item = "replaced";
obj.item2 = "en tillagd property";

//ta bort 
delete obj.item2;
//Scopes ser de items som var tillgängliga när de intierades
//
var delegate = { item: "value", };
var obj = Object.create(delegate, { item: { value: "another value" } });
var obj2 = Object.create(delegate);

obj.item == "another value"; //True
delegate.item == "value"; //true
obj2.item == "value"; //true

delegate.item = "new value";
obj2.item == "new value"; //true

obj2.item = "even newer!";
delegate.item == "new value";//true


var counter = 0;
function Tracked() {
    this.id = counter++;
}
function Logged() {
    this.log = function () {
        console.log(this.id);
    };
}
function ItemType() {
    Tracked.call(this);
    Logged.call(this);
}
ItemType.prototype = Object.create(null, { type: { value: "generic" } });

function SubItemType() {
    ItemType.call(this);
}
SubItemType.prototype = Object.create(ItemType.prototype, { type: { value: "sub", } });
var i = new ItemType(); // id == 0; i.type == generic
var i2 = new ItemType();// id == 1; i.type == generic
var si = new SubItemType();// id == 3; i.type == sub


//Closures
//In cumputer science, a closure is a function thta is evaluated in an enviroment containing one or more bound variables. When called, the function can access these variables.
//Closures: Where a function remebers what happens around it.
//one function defined inside another
(function outer() {
    var x = 5; 
    function inner() {
        console.log(x);
    };
    inner();
    //setTimeout(inner, 5000);
})();
//Kallad senare, callback. 
//Closures fångar information som behövs när den defineras. 
(function main() {
    var goal = 10;
    var counter = 0;
    var tick = setInterval(function () {
        console.log(counter);
        counter += 1;
        if (counter > goal) {
            clearInterval(tick);
        }
    }, 100);
})();


var b = document.querySelector("main"); 
for (var i = 0; i < 5; i++) {
    var a = document.createElement("a"); 
    a.appendChild(document.createTextNode("link"));
    a.href = "#"; 
    //a.onclick = onClick(i); //här ser denna function i hela tiden
    a.onclick = (function(arg){ //Alternativt
        return function () {
            console.log(arg + 1);
        }
    })(i); //skickar med i

    //a.onclick = function () {
    //   console.log(i); //5 alla gånger
    //};

    b.appendChild(a);
}
function onClick(i) {
    return function () {
        console.log(i); 
    }; 
};

var helpers = function () {
    var variabel = 0;

    function priv(arg) {
        return "private function " +arg; 
    }
    return {
        priv: priv,
    }; 
}();
console.log(helpers.priv("arg"));

function helpFunc () {
    var variabel = 0;

    function priv(arg) {
        return "private function " + arg;
    };
    function increase() {
        variabel += 1;
        return variabel;
    };
    return {
        priv: priv,
        increase: increase,
    };
};
var help = helpFunc();
var help2 = helpFunc();
console.log(help.increase()); //1
console.log(help2.increase()); // 1

//Event capturing
//When you use event capturing
//               | |
//---------------| |-----------------
//| element1     | |                |
//|   -----------| |-----------     |
//|   |element2  \ /          |     |
//|   -------------------------     |
//|        Event CAPTURING          |
//-----------------------------------
//the event handler of element1 fires first, the event handler of element2 fires last.

//Event bubbling
//When you use event bubbling
//               / \
//---------------| |-----------------
//| element1     | |                |
//|   -----------| |-----------     |
//|   |element2  | |          |     |
//|   -------------------------     |
//|        Event BUBBLING           |
//-----------------------------------
//the event handler of element2 fires first, the event handler of element1 fires last.



"use strict";

var link = document.getElementById("linkId");
link.onclick = enFunktion; //Inga paranteser
//link.onclick = function () {
//    console.log("klickat");
//};
function enFunktion() {
    console.log("klickat");
}
function enTillFunktion() {
    console.log("klickat en g�ng");
}

//wc3
var link2 = document.getElementById("linkId2"); 
link2.addEventListener("click", enFunktion, false);
link2.addEventListener("click", enTillFunktion, false);

var div = document.querySelector("#content");

div.onclick = function () {
    console.log(this);
};

var alink = document.querySelectorAll("#content a");

for (var i = 0; i < alink.length; i += 1) {
    alink[i].onclick = function () {
        this.style.color = "red"; 
        console.log(this);
        return false; 
    };
}
link.onclick = jump; 

function jump(e) {
    //e = e || event; IE8 fix
    //e.stopPropagation(); f�rhindrar bubbling
    //e inneh�ller bland annat information om vilket object som triggar h�ndelsen mm
}

function Experiment(bombtext) {
    this.getBombText = function () { return bombtext; };

    var aTag = document.getElementById("linkId");

    var that = this;
    console.log(that);

    aTag.onclick = function () {
        //h�r refererar this till aTag
        alert(this.getBombText()); //Failar
        //that refererar 
    };
}

//console.log(new Experiment("boooom"));
//var node = document.getElementById();
//node.classList.add("classattl�ggatill");


var ul = document.querySelector("ul"); 

ul.onclick = function (e) {
    e.preventDefault();
    e.target.style.color = "red";
    console.log(e.target);
}
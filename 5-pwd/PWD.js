"use strict";
var PWD = {//statiska objektet som startar applikationen
    //Denna klass ska sk�ta hanteringen av vilka applikationer som ska startas.
    main: document.querySelector("main"),
    width: 1920,
    height: 946,

    init: function () {
        //intiera alla objekt h�r
        var dragDrop = new DragDrop(this);
        var that = this;
        WindowHandler.init(that.width, that.height);

        //Ska jag hantera dessa fr�n scripten?
        var imageGallery = document.querySelector(".appImage");

        var newGallery = new ImageGallery();
        newGallery.loadFile();
        imageGallery.onclick = function () {
            var newGallery = new ImageGallery();
            WindowHandler.add(that.main, newGallery);
            newGallery.loadFile();
        };

        var memory = document.querySelector(".appMemory");
        memory.onclick = function () {
            WindowHandler.add(that.main, new MemoryGame());
        };
        dragDrop.init();
    }
};
////http://stackoverflow.com/questions/332422/how-do-i-get-the-name-of-an-objects-type-in-javascript
////Vet inte om jag ska anv�nda denna �n
//Object.prototype.getName = function () {
//    var funcNameRegex = /function (.{1,})\(/;
//    var results = (funcNameRegex).exec((this).constructor.toString());
//    return (results && results.length > 1) ? results[1] : "";
//};

//Kan ju anv�nda toString
//window.oncontextmenu = function (e) { //H�gerklick 
//    console.log(e);
//    console.log(e.target);
//    return false;     // cancel default menu
//};

window.onload = function () {
    PWD.init();
};
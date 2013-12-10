"use strict";

window.onload = function () {

    var start = document.querySelector("#start");
    var drag = new Drag();
    drag.InitDragDrop();

    var main = document.querySelector("main")

    start.addEventListener("click", function (e) {
        e.preventDefault(); // Hindra formul�ret fr�n att skickas till servern
        main.appendChild(DragableWindow.init(main));
        drag.InitDragDrop();
    });
};
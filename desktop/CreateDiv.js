"use strict";
//Skapar ett dragable 
var DragableWindow = {

    init: function (mainContainer) {
        var topBar = document.createElement("div"); 
        var closeButton = document.createElement("input");

        closeButton.type = "button";
        closeButton.value = "X";
        closeButton.className = "close";

        topBar.className = "drag";
        topBar.appendChild(closeButton);

        closeButton.onclick = function (e) {
            if (!confirm("Vill du stänga detta fönster")) {
                return;
            }
            setTimeout(function () {
                mainContainer.removeChild(topBar);
            }, 200);
            var style = window.getComputedStyle(topBar);
            //console.log(style.getPropertyValue('height'));
            
            //style.setProperty('height', '100');
            //style.setProperty('width', '100');

            //topBar.style.height = style.getPropertyValue('height') + 'px';
            //topBar.style.width = style.getPropertyValue('width') + 'px';

            topBar.classList.toggle('minimizeTransition');
            topBar.classList.toggle('minimize');
        };

        topBar.style.top = '100px';
        topBar.style.left = '100px';
        return topBar;
    },
}
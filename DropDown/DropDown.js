"use strict";
function DropDown() {
    var dropDownLinks = document.querySelectorAll(".dropDownLink");
    var dropDownMenus = document.querySelectorAll(".dropDownMenu");;

    var that = this; 
    this.init = function () {
        for (var i = 0; i < dropDownLinks.length; i++) {
            dropDownLinks[i].onclick = that.displayMenu; 
        }
    };

    this.displayMenu = function(e) {
        console.log(e);
        console.log(e.target.nextElementSibling);
        e.target.nextElementSibling.className = "visible"; 
    };
}

var createDropDownMenu = {
    //Skapa menyn 
}; 
window.onload = function () {
    var dropdown = new DropDown();
    dropdown.init();
};
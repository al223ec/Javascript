"use strict";

if (!NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

var ul = document.querySelector("#content ul"); //Hämta existerande element
var li = document.createElement("li");
var a = document.createElement("a");
var text = document.createTextNode("Till länken");

li.appendChild(a);
a.appendChild(text);
a.href = "#";
//a.setAttribute("href", "#");
ul.appendChild(li);

//div.innerHTML = "<div>Ersätter</div>"

//var list = div.getElementsByTagName("li"); 
//console.log(list);

//var sammaList = document.querySelectorAll("#content li");
//var divContent = document.querySelector("#content");
//console.log(divContent);
//console.log(sammaList);

//sammaList.forEach(doSomething);

//function doSomething(li) {
//    console.log(li.nodeName);
//}

////.getAttribute("attributnamn");
////.setAttribute("attributename", "värde");

//var nyDiv = document.createElement("div");
//nyDiv.id = "idet";
//nyDiv.className = "classen";
//nyDiv.firstChild = "text";

//divContent.appendChild(nyDiv);

//document.getElementById(idvalue);
//document.getElementsByTagName(tagname); //Elementnamnet a, li, p, 
//node.getElementsByTagName(tagname);
//document.getElementsByClassName(classname); 
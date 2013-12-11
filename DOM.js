//Walk the dom
function walkTheDom(node, func) {
    func(node);
    node = node.firstChild;
    while (node) {
        walkTheDom(node, func);
        node = node.nextSibling;
    }
}
//var node = document.querySelector("body");
//walkTheDom(node, function (node) { console.log(node) });

var node = document.querySelector("main"); 
//console.log(node.style);

node.cloneNode(); //Detta existerar inte på DOM:en
node.cloneNode(true); //"djup cloning

//node.insertBefore(newChild, sibling);
//node.replaceChild(newChild, oldChild); 

//Favor clean code and easy maintence... over performence
//
//Mouse events
//The target is the topmost (z-index) node containing the cursor
//Input events
//The target is the node having focus
//node.addEventListener("", function(){}, false); 

//function lyssnare(e) {
//    e = e || event; 
//    var target = e.target || e.srcElement;

//    console.log(e);
//    console.log("trig");
//}

//node.addEventListener("onmousedown", lyssnare, false);
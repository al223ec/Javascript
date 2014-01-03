"use strict";
//Kan vara ett "statiskt objekt"
function DragDrop(PWD) {
    if (!PWD) { throw Error("Detta objekt m�ste ha en referens till PWO n�r det skapas"); } //Detta kan utvecklas

    var objectX;
    var objectY;
    var mouseStartX;
    var mouseStartY; 
    var targetELement; 
    var allDragElements;

    this.init = function () { //H�mtar alla element som ska vara dragbara
        document.onmousedown = onMouseDown;
        document.onmouseup = onMouseUp;
    };

    //getWidth och height ber�knar an�ndarens h�jd resp bredd
    function getWidth() {
        if (self.innerWidth) { //Denna �r aktuell
            return self.innerWidth;
        }
        else if (document.documentElement && document.documentElement.clientWidth) {
            return document.documentElement.clientWidth;
        }
        else if (document.body) {
            return document.body.clientWidth;
        }
        return 0;
    }

    function getHeight() {
        if (self.innerHeight) { //Denna
            return self.innerHeight;
        }
        else if (document.documentElement && document.documentElement.clientHeight) {
            return document.documentElement.clientHeight;
        }
        else if (document.body) {
            return document.body.clientHeight;
        }
        return 0;
    }

    function onMouseDown(e) {
        if (e.target.className === 'drag') {
            targetELement = e.target;
        } else {
            targetELement = e.target; 
            while (targetELement.parentNode) {
                if (targetELement.className === 'drag') {
                   break;
                }
                targetELement = targetELement.parentNode;
            }
        }
        if(targetELement.className !== 'drag') {
            return;
        }
        //Fixa browsersupport
    
        //Fokus
        allDragElements = document.querySelectorAll(".drag");
        for (var i = 0; i < allDragElements.length; i++) {
            if (allDragElements[i] === targetELement) {
                targetELement.style.zIndex = 1000;
            } else {
                if (allDragElements[i].style.zIndex - 10 > 0) {
                    allDragElements[i].style.zIndex -= 10;
                } else {
                    allDragElements[i].style.zIndex = 0;
                }
            }
        }

        objectX = +(targetELement.style.left.replace(/[^0-9\-]/g, '')); //M�ste ta bort px, annars blir resultatet NaN +omvandling
        objectY = +(targetELement.style.top.replace(/[^0-9\-]/g, ''));

        mouseStartX = e.pageX;
        mouseStartY = e.pageY;

        document.onmousemove = moveWindow; //G�r detta om an�ndare klckar p� n�got dragbart

        //Fixa browsersupport h�r, s� inte text markeras etc
        return false; 
    }
    function onMouseUp(e) {
        if (targetELement) { //Beh�ver endast g�ras om anv�ndaren faktiskt har tryckt p� en "dragable" div
            document.onmousemove = null;
            targetELement = null
        }
    }

    function moveWindow(e) {
        //if (3 > (e.pageX - mouseStartX) || 3 >(e.pageY - mouseStartY)) { return;} //V�nta tills �nv�ndaren har r�rt musen mer �n 3 pixlar
        var nextXPos = objectX + e.pageX - mouseStartX; 

        //Xleds kontroll
        if (targetELement.offsetWidth + nextXPos < PWD.width) {
            if (nextXPos < 0) {
                targetELement.style.left = '0px';
            } else {
                targetELement.style.left = nextXPos + 'px';
            }
        } else {
            targetELement.style.left = PWD.width - targetELement.offsetWidth +'px';
        }

        //yleds kontroll
        var nextYPos = objectY + e.pageY - mouseStartY; 
        if ((targetELement.offsetHeight + nextYPos) < PWD.height) {
            if (nextYPos < 0) {
                targetELement.style.top = '0px';
            } else {
                targetELement.style.top = nextYPos + 'px';
            }
        } else {
            targetELement.style.top = PWD.height - targetELement.offsetHeight + 'px';
        }
    }
};


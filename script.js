/**
 * @author al223ec
 */
(function(){
    "use strict";
	
	
    function minFunktion(){
    
        console.log('Hello funktion');
    }
    
    function medeltal(tal1, tal2, tal3){
    
        return tal1 + tal2 + tal3 / 3;
    }
  

	var secretNumber = Math.floor((Math.random()*100)+1); 
	console.log(secretNumber);
	
    var guessedNumber = parseInt(prompt("Gissa ett tal mellan 1-100, din lilla r�ka"));
	
	//guessedNumber f�r v�rdet nan om konverteringen misslyckas	

	
    if (guessedNumber < 101 && guessedNumber > 0) {
		//En giltig gissning
		//guessedNumber = Number(guessedNumber); //�r detta en ok omvandling
		if(guessedNumber === secretNumber)
		{
			alert('Du gissade r�tt'); 
		}
		else if( guessedNumber < secretNumber)
		{
			console.log('F�r l�gt tal')
		}
		else
		{
			console.log('F�r h�gt tal')
		}
    }
	else
	{
		console.log('Inte ett giltigt tal');
	}
    
}());

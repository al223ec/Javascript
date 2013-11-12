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
	
    var guessedNumber = parseInt(prompt("Gissa ett tal mellan 1-100, din lilla räka"));
	
	//guessedNumber får värdet nan om konverteringen misslyckas	

	
    if (guessedNumber < 101 && guessedNumber > 0) {
		//En giltig gissning
		//guessedNumber = Number(guessedNumber); //Är detta en ok omvandling
		if(guessedNumber === secretNumber)
		{
			alert('Du gissade rätt'); 
		}
		else if( guessedNumber < secretNumber)
		{
			console.log('För lågt tal')
		}
		else
		{
			console.log('För högt tal')
		}
    }
	else
	{
		console.log('Inte ett giltigt tal');
	}
    
}());

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
  /*
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
	*/
	
	
	var minVar = 1; 
	console.log( typeof minVar ); 
    
	minVar = "skdoso"; 
	console.log( typeof minVar ); 
    
	minVar = true; 
	console.log( typeof minVar ); 
    
	minVar = 1.300; 
	console.log( typeof minVar ); 
	
	
	minVar = 'c'; 
	console.log( typeof minVar ); 
    
	var input = prompt('Ange ett tal');
	
	if(isNaN(input))
	{
		console.log(input);
	}
	
	console.log(+input);
	
	var a = +prompt("Ange tal: ");
	console.log(a + 10);
	var _name;
	var _age;
	
	function myFunc(name, age)
	{
		_name = name || "John Doe"; 
		_age = age || "18"; 
	}
	myFunc();
	console.log(_name);
	console.log(_age);
	
	function loopFunc()
	{
		var counter; 
		var property;
		
		for(counter = 0; counter < 10; counter+=1)
		{
			//Gör något
			console.log(counter);
		}
		
		for(property in document){
			console.log(document[property]);
			//Foreach
			//Obs ordlingen kan inte garanteras
		}
	}
}());

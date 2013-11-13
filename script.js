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
    
	var input;
	var numOfGuesses = 7;
	var numOfPerformedGuesses = 0; 
	var guessedNumbers = new Array();
	 
	do {
		input = +prompt('Ange ett tal');//Detta kastar inte ett undantag
	
		if(isNaN(input))
		{
			console.log(input + " Kan inte tolkas som ett tal");
		}
		else
		{
			guessedNumbers[numOfPerformedGuesses] = input; 
			numOfPerformedGuesses++;
		}
	}while(isNaN(input) || guessedNumbers.length < numOfGuesses );
	
	var counter;
	for(counter = 0; counter < guessedNumbers.length; counter++)
	{
		console.log(guessedNumbers[counter]);
	}
	
	
	var _name;
	var _age;
	
	function myFunc(name, age)
	{
		_name = name || "John Doe"; 
		_age = age || "18"; 
	}
	console.log(_name); //undefined 
	console.log(_age);//undefined
	myFunc();
	console.log(_name); //John Doe
	console.log(_age);//18
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

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
    
	function readInput(){
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
	}
	
	function myFunc(name, age)
	{
		_name = name || "John Doe"; 
		_age = age || "18"; 
	}
	
	function loopFunc()
	{
		var counter; 
		var property;
		
		for(counter = 0; counter < 10; counter+=1)
		{
			//G�r n�got
			console.log(counter);
		}
		
		for(property in document){
			console.log(document[property]);
			//Foreach
			//Obs ordlingen kan inte garanteras
		}
	}
	
	function carInfo(brand,year){
		return "Din "+brand+" �r av �rsmodell"+year;
	}
	console.log(carInfo("Chrysler", 2006));
	
	var object = {x:100, y:200};
	var fun = function(){};

	function calculator(calcFunction){
		var var1 = 10; 
		var var2 = 20; 
		
		return calcFunction(var1, var2);
	}
	
	var sum = function(x,y){
		return x + y;
	};		
	
	var answer = calculator(sum); 
	console.log(answer);
	
	//answer = calculator( function(x,y){
		//return x - y;
		//};		
	//);
	//Typeof kan bekr�fta att var �r en function
	console.log(answer);
	
	var color = "blue"; 
	function getColor(){
		return color; 
	}
	console.log(getColor()); //blue, Funkar utan kompileringsfel
	
	function getColorRed(){
		var color = "red"; 
		return color; 
	}
	console.log(getColorRed()); 
	
	var i = 5; 
	
	var f = function(){
		//var minVar; //Deklarera alla varibler i funktionen f�rst
		
		if(i <= 10){
			minVar = 230; 
		}
		
		return minVar; 
	}; 
	
	console.log(f()); //Kompilerar, Javascript har functionscope
	
	//Saknas klasser i Javascript
	//Skapa object
	var rect = new Object(); 
	rect.width = 200; 
	rect.height = 300; 
	
	rect.area = function(){
	
	};
	console.log(rect); 
	//Effektivare s�tt 
	var obj = {
		width : 100,	
		height : 200, 
		del : "tabortdetta",
		info : "Save the world",
		enfunktion : function(){
			return this.width + this.height;
		}		
	};
	
	console.log(obj);
	delete obj.del; 
	
	console.log(obj);
	console.log(obj.info);
	console.log(obj["info"]);
	
	//Arrayer
	var arr = [1,2,3,"f"];
	
	for(var i = 0; i < arr.length; i++)
	{
		console.log(arr[i]);
	}
	var add = function(print){ return "add" + print; };
	var n = arr.map(add);
	
	for(var i = 0; i < arr.length; i++)
	{
		console.log(n[i]);
	}
	//Reduce
	//Filter

	//Datum
	
	var nowDate = new Date();
	console.log(nowDate);
	
	var miliSecs = nowDate.getTime();
	var sec = miliSecs/1000; 
	var min = sec/60; 
	
	console.log(miliSecs);
	console.log(sec);
	console.log(min);
	
	//Try catch 
	//throw new Error("");
	
	try
	{
	}
	catch(error e)
	{
		console.log(e.message);
	}
}());

$( document ).ready(function() {
	var a = {
			1: "&#9856;",
			2: "&#9857;",
			3: "&#9858;",
			4: "&#9859;",
			5: "&#9860;",
			6: "&#9861;"
		}
	
	populateBoard();
    function populateBoard(){		
		for (var i = 1; i <= 6; i++){		
		$(".playground").append('<p class="dice-symbol unmarked">' + a[i] + '</p>');
		}
	}

	var throwCounter = 0;

	function throwDice(dicesToThrow) {
			throwCounter++;

			var dices = [];
			
			
			for(var i = 0; i < dicesToThrow; i++){
				var randomNum = Math.floor((Math.random() * 6) + 1); 
				dices.push(randomNum);
			}

		return dices;
		
	}


	$(".throwDiceButton").click(function(){
		var dicesToThrow = $(".unmarked").length;
		
		var arrayOfThrownDices = throwDice(dicesToThrow);
		for (var i = 0; i < arrayOfThrownDices.length; i++){
			
		$(".choosenDices").append('<p class="dice-symbol">' + a[i] + '</p>');
		}
		
		
		
	});

});





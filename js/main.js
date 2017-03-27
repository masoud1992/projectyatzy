
$(document).ready(function() {


    var throwCounter = 0;

    function throwDice(dicesToThrow) {
        throwCounter++;

        var dices = [];


        for (var i = 0; i < dicesToThrow; i++) {
            var randomNum = Math.floor((Math.random() * 6) + 1);
            dices.push(randomNum);
        }

        return dices;

    }


    $(".throwDiceButton").click(function() {
        var dicesToThrow = $(".unmarked").length;
        throwDice(dicesToThrow);

    });
      //listener on keys
    document.onkeypress = function(event) {
        event = event || window.event;
          //get which key was pressed
        key = event.code;
        // removes excess strings
        key = key.replace(/\D/g, '');
        //make key an int
        key = parseInt(key,10);
        // if it's a number call endturn()
        if (key >= 0 && key <= 9) {
            endTurn();
        }

    };

    function endTurn() {
      //reset counter
        throwCounter = 0;
        //remove old dices from element
        $(this).find(".playground").empty();


    }

});
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





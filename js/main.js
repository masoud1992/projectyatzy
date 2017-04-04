new Dbconn();
$(document).ready(function() {   

    function test (){
        var dices = [1,1,1,1,1];
        var score = null;
        var reference = dices[0];
        var isYatzy = true;

        for(var i = 0; i < dices.length; i++){
            if(dices[i] == dices[0]){
                console.log("d lika med", i);
                
            }
            else{
                isYatzy = false;
                
            }
        }

        if(isYatzy == true){
            score = 50;
        }
        console.log(score);
        return score;
    }


    $(".playground").on("click", function(e) {
        var clickedDice = e.target.id;

        switch (clickedDice) {
            case "diceOne":
                if ($('#diceOne').hasClass('unmarked')) {
                    $('#diceOne').addClass('marked').removeClass('unmarked');
                } else {
                    $('#diceOne').addClass('unmarked').removeClass('marked');
                }
                break;
            case "diceTwo":
                if ($('#diceTwo').hasClass('unmarked')) {
                    $('#diceTwo').addClass('marked').removeClass('unmarked');
                } else {
                    $('#diceTwo').addClass('unmarked').removeClass('marked');
                }
                break;
            case "diceThree":
                if ($('#diceThree').hasClass('unmarked')) {
                    $('#diceThree').addClass('marked').removeClass('unmarked');
                } else {
                    $('#diceThree').addClass('unmarked').removeClass('marked');
                }
                break;
            case "diceFour":
                if ($('#diceFour').hasClass('unmarked')) {
                    $('#diceFour').addClass('marked').removeClass('unmarked');
                } else {
                    $('#diceFour').addClass('unmarked').removeClass('marked');
                }
                break;
            case "diceFive":
                if ($('#diceFive').hasClass('unmarked')) {
                    $('#diceFive').addClass('marked').removeClass('unmarked');
                } else {
                    $('#diceFive').addClass('unmarked').removeClass('marked');
                }
                break;
            default:
                break;
        }

    });



    totalScore();
    var throwCounter = 0;
    var gameOver = false;
    nextStepGuide(throwCounter);

    // räknar antal gånger spelare skrivit poäng, för att vid rätt till evaluera ifGameIsOver
    var inputCounterP1 = 0;
    var inputCounterP2 = 0;
    var inputCounterP3 = 0;
    var inputCounterP4 = 0;



    function throwDice(dicesToThrow) {
        throwCounter++;

        var dices = [];


        for (var i = 0; i < dicesToThrow; i++) {
            var randomNum = Math.floor((Math.random() * 6) + 1);
            dices.push(randomNum);
        }

        return dices;
    }

    var dicesToThrow;
    $(".rollDice").click(function() {
        
        if (throwCounter == 3) {
            throwCounter = 0;
            dicesToThrow = 5;
						// $(".playground").empty();
            displayDice(throwDice(dicesToThrow));
            nextStepGuide(throwCounter);

						if ($('#diceOne').hasClass('marked')) {
								$('#diceOne').addClass('unmarked').removeClass('marked');
						}
						if ($('#diceTwo').hasClass('marked')) {
								$('#diceTwo').addClass('unmarked').removeClass('marked');
						}
						if ($('#diceThree').hasClass('marked')) {
								$('#diceThree').addClass('unmarked').removeClass('marked');
						}
						if ($('#diceFour').hasClass('marked')) {
								$('#diceFour').addClass('unmarked').removeClass('marked');
						}
						if ($('#diceFive').hasClass('marked')) {
								$('#diceFive').addClass('unmarked').removeClass('marked');
						}

        } else {
            dicesToThrow = $(".unmarked").length;
            displayDice(throwDice(dicesToThrow));
            nextStepGuide(throwCounter);
            test();
            
        }

    });

		function endTurn() {
				//reset counter
				throwCounter = 0;
				//remove old dices from element

				nextStepGuide(throwCounter);
		}

    function displayDice(dices) {

        var currentDice = 0;

        for (i = 1; i <= 5; i++) {
            var diceImage = returnNumberAsWord(i);

            if ($('#dice' + diceImage).hasClass('unmarked')) {
                var number = dices[currentDice];
                $('#dice' + diceImage).attr("src", "images/dices/" + number + ".png");
                currentDice += 1;
            }
        }
    }

    function returnNumberAsWord(number) {
        switch (number) {
            case 1:
                return 'One';
                break;
            case 2:
                return 'Two';
                break;
            case 3:
                return 'Three';
                break;
            case 4:
                return 'Four';
                break;
            case 5:
                return 'Five';
                break;
            default:
                break;
        }
    }

    //listener on inputfields blur
var tempKey = null;
    document.onchange = function(event) {

        event = event || window.event;
        var getId = null;
				var key = null;

        getId = event.target.id;
        //get which key was pressed
         key = event.target.value;

				//  if(key<10){
				// 	 tempKey = parseInt(key, 10);
				//  }
        // removes excess strings
        // key = key.replace(/\D/g, '');
        //make key an int
        key = parseInt(key, 10);
        if (key >= 0 && key <= 10000) {
  			// $(".rollDice").unbind('click').click(function() {
                var currentValue = 0;
                // currentValue = document.getElementById(getId).value;
                var tempPlayerField = String(getId);
                tempPlayerField = tempPlayerField.substring(0, tempPlayerField.indexOf('s'));
                inputCountertemp = tempPlayerField;
                tempPlayerField = "#" + tempPlayerField + "Total";
                var currentTotal = 0;
                currentTotal = $(tempPlayerField).text();
                // currentValue = parseInt(currentValue, 10);
                currentTotal = parseInt(currentTotal, 10);
								if(tempKey != null){
									currentTotal = currentTotal - tempKey + key;
								}else{
                currentTotal = currentTotal + key;
								}
                $(tempPlayerField).html("");
                $(tempPlayerField).text(currentTotal);
                totalScore(tempPlayerField);
                // currentValue = 0;
                currentTotal = 0;
                incrementInputCounters(inputCountertemp);
                checkBonus(inputCountertemp);
								throwCounter = 1;
								nextStepGuide(throwCounter);


        }
     }//);

    function totalScore(playerName) {
        var sum = $(playerName).text();
        sum = parseInt(sum, 10);
        if (gameOver) {
            var dataString = {
                userName: "name",
                totalScore: sum
            };
            $.ajax({
                url: "api/Dbconn/insertTotalScore",
                type: "POST",
                dataType: 'json',
                data: JSON.stringify(dataString),
                processData: false,
                contentType: "application/json"
            });
            console.log("ajax har körts");
        }

    }



    function nextStepGuide(stepInt) {

        switch (stepInt) {
            case 0:
                {
                    $(".bg-info").text('Steg 0');
                }
                break;

            case 1:
                {
                    $(".bg-info").text('Steg 1');
                }
                break;

            case 2:
                {
                    $(".bg-info").text('Steg 2');
                }
                break;

            case 3:
                {
                    $(".bg-info").text('Steg 3');
                }
                break;

            default:
                {
                    $(".bg-info").text('Ajjabajja!');
                }
        }

    }

    function checkIfGameIsOver(inputCountertemp) {

        for (var i = 0; i <= 18; i++) {
            inputID = inputCountertemp + "score" + i;
            if (inputID.value != '') {
                alert("Gave over");
            }
        }
    }

    function incrementInputCounters(inputCountertemp) {
        switch (inputCountertemp) {
            case "player1":
                {
                    inputCounterP1++;
                    if (inputCounterP1 >= 24) {
                        checkIfGameIsOver(inputCountertemp);
                    }
                    break;
                }
            case "player2":
                {
                    inputCounterP2++;
                    if (inputCounterP2 >= 24) {
                        checkIfGameIsOver(inputCountertemp);
                    }
                    break;
                }
            case "player3":
                {
                    inputCounterP3++;
                    if (inputCounterP3 >= 24) {
                        checkIfGameIsOver(inputCountertemp);
                    }
                    break;
                }
            case "player4":
                {
                    inputCounterP4++;
                    if (inputCounterP4 >= 24) {
                        checkIfGameIsOver(inputCountertemp);
                    }
                    break;
                }

        }
    }

    function checkBonus(player) {
        // var tempCount = 0;
        var tempValue = 0;
        var currentTotal = 0;
        var tempPlayerTotal = "#" + player + "Total";

        currentTotal = $(tempPlayerTotal).text();
        currentTotal = parseInt(currentTotal, 10);
        for (let i = 1; i < 7; i++) {
            var inputID = player + "score" + i;
            var tempId = document.getElementById(inputID).value;
            if (tempId != '') {
                // tempCount++;
                tempValue += parseInt(tempId, 10);
            }
        }
        tempValue = parseInt(tempValue, 10);

        if (tempValue >= 63) {

            tempPlayer = "." + player + "Bonus";
            $(tempPlayer).text(50);
            $(tempPlayerTotal).html("");
            currentTotal += 50;
            $(tempPlayerTotal).text(currentTotal);
        }

    }


});

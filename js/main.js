new Dbconn();
$(document).ready(function() {

$(document).find(".playground").on("click", function(e) {
	var clickedDice = e.target.id;

	switch(clickedDice)
	{
		case "diceOne":
			if($('#diceOne').hasClass('unmarked')){
				$('#diceOne').addClass('marked').removeClass('unmarked');
			}
			else{
				$('#diceOne').addClass('unmarked').removeClass('marked');
			}
			break;
		case "diceTwo":
			if($('#diceTwo').hasClass('unmarked')){
				$('#diceTwo').addClass('marked').removeClass('unmarked');
			}
			else{
				$('#diceTwo').addClass('unmarked').removeClass('marked');
			}
			break;
		case "diceThree":
			if($('#diceThree').hasClass('unmarked')){
				$('#diceThree').addClass('marked').removeClass('unmarked');
			}
			else{
				$('#diceThree').addClass('unmarked').removeClass('marked');
			}
			break;
		case "diceFour":
			if($('#diceFour').hasClass('unmarked')){
				$('#diceFour').addClass('marked').removeClass('unmarked');
			}
			else{
				$('#diceFour').addClass('unmarked').removeClass('marked');
			}
			break;
		case "diceFive":
			if($('#diceFive').hasClass('unmarked')){
				$('#diceFive').addClass('marked').removeClass('unmarked');
			}
			else{
				$('#diceFive').addClass('unmarked').removeClass('marked');
			}
			break;
		default:
			break;
	}

 });


    // $('#diceOne').addClass('marked').removeClass('unmarked');

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


    $(".rollDice").click(function() {
        var dicesToThrow = $(".unmarked").length;
        displayDice(throwDice(dicesToThrow));
        nextStepGuide(throwCounter);

    });

    function displayDice(dices) {
        console.log(dices);
        var currentDice = 0;

        for (i = 1; i <= 5; i++)
        {
            var diceImage = returnNumberAsWord(i);
            console.log(diceImage);

            if ($('#dice' + diceImage).hasClass('unmarked'))
            {
                var number = dices[currentDice];
                $('#dice' + diceImage).attr("src", "images/dices/" + number + ".png");
                currentDice += 1;
            }
        }
    }

    function returnNumberAsWord(number)
    {
        switch (number)
        {
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

    //listener on keys

    document.onkeypress = function(event) {
        event = event || window.event;
        var getId = null;
        getId = event.target.id;

        //get which key was pressed
        var key = event.code;
        // removes excess strings
        key = key.replace(/\D/g, '');
        //make key an int
        key = parseInt(key, 10);
        if (key >= 0 && key <= 9) {

            $(".rollDice").unbind('click').click(function() {
                var currentValue = 0;
                currentValue = document.getElementById(getId).value;
                var temp = String(getId);
                temp = temp.substring(0, temp.indexOf('s'));
                inputCountertemp = temp;
                temp = "#" + temp + "Total";
                var currentTotal = 0;
                currentTotal = $(temp).text();
                currentValue = parseInt(currentValue, 10);
                currentTotal = parseInt(currentTotal, 10);
                currentTotal = currentTotal + currentValue;
                $(temp).html("");
                $(temp).text(currentTotal);
                endTurn();
                totalScore(temp);
                currentValue = 0;
                currentTotal = 0;
                incrementInputCounters(inputCountertemp);
                checkBonus(inputCountertemp);

            });
        }
    }

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

    // };

    function endTurn() {
        //reset counter
        throwCounter = 0;
        //remove old dices from element
        $(this).find(".playground").empty();
        nextStepGuide(throwCounter);
    }

    function nextStepGuide(stepInt) {

        switch (stepInt) {
            case 0:
                {
                    $(".bg-success").text('Steg 0');
                }
                break;

            case 1:
                {
                    $(".bg-success").text('Steg 1');
                }
                break;

            case 2:
                {
                    $(".bg-success").text('Steg 2');
                }
                break;

            case 3:
                {
                    $(".bg-success").text('Steg 3');
                }
                break;

            default:
                {
                    $(".bg-success").text('Ajjabajja!');
                }
        }

    }



    function checkIfGameIsOver(inputCountertemp) {

        for (var i = 0; i <= 18; i++) {
            inputID = inputCountertemp + "score" + i;
            console.log(inputID);
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
                    console.log(inputCounterP2);
                    if (inputCounterP2 >= 24) {
                        checkIfGameIsOver(inputCountertemp);
                    }
                    break;
                }
            case "player3":
                {
                    inputCounterP3++;
                    console.log(inputCounterP3);
                    if (inputCounterP3 >= 24) {
                        checkIfGameIsOver(inputCountertemp);
                    }
                    break;
                }
            case "player4":
                {
                    inputCounterP4++;
                    console.log(inputCounterP4);
                    if (inputCounterP1 >= 24) {
                        checkIfGameIsOver(inputCountertemp);
                    }
                    break;
                }

        }
    }

    function checkBonus(player) {
        var tempCount = 0;
        var tempValue = 0;
        var currentTotal = 0;
        var tempPlayerTotal = "#" + player + "Total";

        currentTotal = $(tempPlayerTotal).text();
        currentTotal = parseInt(currentTotal, 10);
        for (let i = 1; i < 7; i++) {
            var inputID = player + "score" + i;
            var tempId = document.getElementById(inputID).value;
            if (tempId != '') {
                tempCount++;
                tempValue += parseInt(tempId, 10);
            }
        }
        tempValue = parseInt(tempValue, 10);
        console.log(tempValue);

// tempCount == 6 &&
        if (tempValue >= 63) {

            tempPlayer = "." + player + "Bonus";
            $(tempPlayer).text(50);
            $(tempPlayerTotal).html("");
            currentTotal += 50;
            $(tempPlayerTotal).text(currentTotal);
        }

    }


});

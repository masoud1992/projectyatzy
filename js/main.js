new Dbconn();
$(document).ready(function() {

    $(document).find("#diceOne").on("click", function() {

        if ($('#diceOne').hasClass('unmarked')) {
            $('#diceOne').addClass('marked').removeClass('unmarked');
        } else {
            $('#diceOne').addClass('unmarked').removeClass('marked');
        }
    });

    // $('#diceOne').addClass('marked').removeClass('unmarked');

    totalScore();
    var throwCounter = 0;
    var gameOver = false;
    nextStepGuide(throwCounter);


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
        throwDice(dicesToThrow);
        nextStepGuide(throwCounter);

    });
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


});

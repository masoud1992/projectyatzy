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

    document.onkeypress = function(event) {
        event = event || window.event;

        key = event.code;
        key = key.replace(/\D/g, ''); // removes excess strings

        if (key >= 0 && key <= 9) {
            endTurn();
        }

    };

    function endTurn() {
        throwCounter = 0;
        $(this).find(".playground").empty();


    }

});

$(document).ready(function() {

    totalScore();
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
        var getId = event.target.id;

        //get which key was pressed
        var key = event.code;
        // removes excess strings
        key = key.replace(/\D/g, '');
        //make key an int
        key = parseInt(key, 10);
        if (key >= 0 && key <= 9) {

            $(".rollDice").click(function() {
                var currentValue = document.getElementById(getId).value;

                var temp = String(getId);
                temp = temp.substring(0, temp.indexOf('s'));
                temp = "#"+temp+"Total";
                console.log(temp);
                var currentTotal =   $(document).find(temp).text();
                console.log(currentTotal);

                endTurn();
                totalScore(currentTotal, currentValue);
            });
        }
    }

    function totalScore(currentId, value) {




        // if(current >18){
        //   var dataString = {
        //     userName:"name",
        //     totalScore:current
        //   };
        //   $.ajax({
        //       url: "api/Dbconn/insertTotalScore",
        //       type: "POST",
        //       dataType: 'json',
        //       data: JSON.stringify(dataString),
        //       processData: false,
        //       contentType: "application/json"
        //   });
        //   console.log("ajax har körts");
        // }

    }

    // };

    function endTurn() {
        //reset counter
        throwCounter = 0;
        //remove old dices from element
        $(this).find(".playground").empty();


    }


});

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
      var placeHolder = event.target;
      console.log(placeHolder.id);
      //   event = event || window.event;
      //     //get which key was pressed
      //  key = event.code;
       //
      //   // removes excess strings
      //   key = key.replace(/\D/g, '');
      //   //make key an int
      //   key = parseInt(key,10);

        $(".throwDiceButton").click(function() {
            var key = $(placeHolder).val();
            console.log(key);
            key = parseInt(key,10);
          // if it's a number call endturn()
          if (key >= 0 && key <= 9) {

              endTurn();

              totalScore(key);
            }

        });

        }

    // };

    function endTurn() {
      //reset counter
        throwCounter = 0;
        //remove old dices from element
        $(this).find(".playground").empty();


    }
    function totalScore(a){
    var current =  $(this).find(".playerOne").val();
    current = parseInt((current + a),10);
    console.log(current);
    $(".playerOne").html(current);
    // $(this).find("").val(current);
    }

});

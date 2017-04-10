// new Dbconn();
$(document).ready(function() {
  
  var globalSelectFromDB;
  // saveTotalscoreToDb();
    populateStatLists();//.done(function(){
    //       saveTotalscoreToDb();
    //     });



    $(".playground").on("click", function(e) {
        if (throwCounter != 0)
        {
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

    var activePlayer = 1;

    function changePlayer()
    {

        var playerImage = returnNumberAsWord(activePlayer);

        $('#image' + playerImage).addClass('unmarked').removeClass('marked');
        console.log(playerImage + "changed");

        if (activePlayer == 4) {
            activePlayer = 1;
        } else {
            activePlayer += 1;
        }

        playerImage = returnNumberAsWord(activePlayer);
        $('#image' + playerImage).addClass('marked').removeClass('unmarked');
        console.log(playerImage + 'changed');
    }

    function throwDice() {

		throwCounter++;
		var dices = [1,2,3,4,5];

		for(i=1;i<=5;i++){

			var diceNumber = returnNumberAsWord(i);

			if($('#dice'+diceNumber).hasClass('unmarked')){

				var randomNumber = Math.floor((Math.random()*6)+1);
				dices.splice(i-1,1,randomNumber);


			}
			else if($('#dice'+diceNumber).hasClass('marked')){

				console.log('markerad position på tärning: '+i);
				var diceText=$('#dice'+diceNumber).attr('src');
				diceText=diceText.substr(-5,1);
				var diceValue=parseInt(diceText);

				dices.splice(i-1,1,diceValue);
			}

		}

		console.log('Initial array ' + dices);
		var tempArray = dices;

        getSpelLogik(tempArray);

		console.log('Efter spellogik, dices: ' + dices);
		console.log('Efter spellogik, tempArray: ' + tempArray);

        return dices;
    }

    $(".table").on("click", function(e){
        var plats = e.target.id;
        var score = plats.substr(plats.length - 1);
        var overNineScore = plats.substr(plats.length - 2);

		overNineScore=overNineScore.substr(0,1);
		if(overNineScore==1){
			score=overNineScore+score;
		}
        if(('#' + e.target.id) == ('#player' + activePlayer + 'score' + score) && throwCounter > 0)
        {
            if($('#'+e.target.id).hasClass('unchosen'))
            {
                $('#'+e.target.id).addClass('chosen').removeClass('unchosen');
                endTurn(e.target.id);
            }
        };

    });


     function getSpelLogik(dices){


        for(var f in spellogik){
			if($('#player' + activePlayer + spellogik[f](dices).plats).hasClass('unchosen'))
			{
				$('#player' + activePlayer + spellogik[f](dices).plats).text(spellogik[f](dices).sum);
            }
        }


    }

    var dicesToThrow;
    $(".rollDice").click(function() {

        if (throwCounter == 3) {

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
            displayDice(throwDice());
            nextStepGuide(throwCounter);
        }
        

    });

    function endTurn(plats) {
        for(i=0;i<=15;i++){
            if($("#player"+activePlayer+"score"+i).hasClass("unchosen")){

                 $("#player"+activePlayer+"score"+i).text("");

             }
        }
        resetDices();
        throwCounter=0;
        nextStepGuide(throwCounter);
        updateTotalScore();
        checkIfScoreboardFull();
        changePlayer();
    }

    function checkIfScoreboardFull() {
        if($(".unchosen").length == 0){
            saveTotalscoreToDb();
            gameOver = true;
            console.log("Spelet är slut")


        }
    }

    function displayDice(dices) {

        var currentDice = 0;
        for (i = 1; i <= 5; i++) {
            var diceImage = returnNumberAsWord(i);
			var number = dices[currentDice];

			$('#dice' + diceImage).attr("src", "images/dices/" + number + ".png");

			currentDice += 1;
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
            case 6:
                return 'Six';
                break;
            default:
                break;
        }
    }

    function updateTotalScore()
    {
        var totalScore = 0;

        for (i = 0; i <= 15; i++)
        {
            if ($('#player' + activePlayer + 'score' + i).hasClass('chosen'))
            {
                var score = parseInt($('#player' + activePlayer + 'score' + i).text(), 10);
                totalScore += score;
            }
        }

        $('#player' + activePlayer + 'Total').text(totalScore);
    }

    function totalScore(playerField, playerNumber) {
        var sum = $(playerNumber).text();
        var tempPlayerName = "#" + playerNumber + "Name"
        var userName = $(tempPlayerName).text();
        sum = parseInt(sum, 10);

        var dataString = {
            userName: userName,
            totalScore: sum
        };
        // $.ajax({
        //   type: 'POST',
        //   url:'/queries/insertTotalScore',
        //   contentType: "application/json",
        //   data: JSON.stringify(dataString),
        //   contentType: "application/json"
        // }).done(function(data){
        //   console.log(data);
        // });


    }



    function nextStepGuide(stepInt) {

        switch (stepInt) {
            case 0:
                {
                    $(".bg-info").text('Steg 0, slå ditt första slag');
                }
                break;

            case 1:
                {
                    $(".bg-info").text('Steg 1, du har två slag kvar');
                }
                break;

            case 2:
                {
                    $(".bg-info").text('Steg 2, du har ett slag kvar');
                }
                break;

            case 3:
                {
                    $(".bg-info").text('Steg 3, du har använt alla dina slag');
                }
                break;

            default:
                {
                    $(".bg-info").text('Nu har någonting gått fel, ring vaktmästaren');
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

    function resetDices() {
        for (i = 1; i <= 5; i++) {
            var dice = returnNumberAsWord(i);
            if ($('#dice' + dice).hasClass('marked')) {
                $('#dice' + dice).addClass('unmarked').removeClass('marked');
            }
        }
    }

  function populateStatLists() {

        $.ajax({
            type: 'GET',
            url: '/queries/readAll'
        }).done(function(data) {
            globalSelectFromDB = data;
            saveTotalscoreToDb();
            var totalScoreArray = [];
            var wongamesArray = [];
            for (let i = 0; i < data.length; i++) {
                totalScoreArray.push(data[i].totalScore);
                wongamesArray.push(data[i].wonGames);
            }

            totalScoreArray.sort(function(a, b) {
                return b - a;
            });
            wongamesArray.sort(function(a, b) {
                return b - a;
            });
            data.sort(function(a, b) {
                return b.totalScore - a.totalScore;
            });

            for (let i = 0; i < totalScoreArray.length; i++) {
                let playerName;

                if (totalScoreArray[i] == data[i].totalScore) {
                    playerName = data[i].userName;
                }
                $(".highScoreList").append("<li class='list-group-item'>" +
                    "<span class='badge'>" + totalScoreArray[i] + "</span>" + playerName + "</li>");
                if (i == 7) {
                    break;
                }

            }
            data.sort(function(a, b) {
                return b.wonGames - a.wonGames;
            });
            for (let i = 0; i < wongamesArray.length; i++) {
                let playerName;

                if (wongamesArray[i] == data[i].wonGames) {
                    playerName = data[i].userName;
                }
                $(".wonGamesList").append("<li class='list-group-item'>" +
                    "<span class='badge'>" + wongamesArray[i] + "</span>" + playerName + "</li>");
                if (i == 7) {
                    break;
                }

            }

        });

    }

    function saveTotalscoreToDb(){
      var updateAjax = false;
      var insertAjax = false;
      var dataStringUpdate;
      var dataStringInsert;
      var tempWonGames;
      var tempScore;
      var tempName
      var playersArray = [];
      var scoreArray = [];
      		var j = 0;
      		$(".playerNameInput").each(function(){
      			playersArray[j]=$(this).val();
      			j++;
      		});
          j=0;
          $(".playerScoreTestTotal").each(function(){
      			scoreArray[j]=$(this).text();
      			j++;
      		});

var tempHighestscore = Math.max(...scoreArray);
var dataStringUpdate = [];
      for (let i = 0; i < 4; i++) {
         tempName = playersArray[i];
         tempScore = scoreArray[i];
        for (let j = 0; j < globalSelectFromDB.length; j++) {
          console.log("tempname",tempName);
          console.log("from db",globalSelectFromDB[j].userName);

          if(tempName == globalSelectFromDB[j].userName){
            if(globalSelectFromDB[j].totalScore > tempScore){
              tempScore= globalSelectFromDB[j].totalScore;
            }
             tempWonGames = parseInt(globalSelectFromDB[j].wonGames,10);

              console.log("tempHighestscore", tempHighestscore);
             if(tempScore>=tempHighestscore){
               tempWonGames+=1;
             }else {
               tempWonGames = globalSelectFromDB[j].wonGames;
             }
            //  dataStringUpdate = {
            //     userName: tempName,
            //     totalScore: parseInt(tempScore,10),
            //     wonGames: parseInt(tempWonGames,10)
            // };

                dataStringUpdate.push(parseInt(tempWonGames,10));
                dataStringUpdate.push(parseInt(tempScore,10));
                dataStringUpdate.push(tempName);
            console.log("update",dataStringUpdate);
            updateAjax = true;
            insertAjax = false;
            // continue;
          }else{
            if(tempScore>=tempHighestscore){
              tempWonGames=1;
            }else {
              tempWonGames = 0;
            }
             dataStringInsert = {
                // userName: tempName,
                totalScore: parseInt(tempScore,10),
                wonGames: parseInt(tempWonGames,10)
            };
            console.log("insert",dataStringInsert);
            insertAjax = true;
            updateAjax = false;
            // continue;
          }

        }
console.log("updateAjax",updateAjax);
        if(updateAjax = true){
          $.ajax({
            type: 'POST',
            url:'/queries/updateWonGames',
            contentType: "application/json",
            data: JSON.stringify(dataStringUpdate),
            contentType: "application/json"
          }).done(function(data){
            console.log("update ajax",data);
            updateAjax = false;
            dataStringUpdate.length = 0;
          });
          // continue;
        }

        console.log("insertAjax",insertAjax);
         if (insertAjax = true) {
          $.ajax({
            type: 'POST',
            url:'/queries/insertTotalScore',
            contentType: "application/json",
            data: JSON.stringify(dataStringInsert),
            contentType: "application/json"
          }).done(function(data){
            console.log("insert ajax",data);
              insertAjax = false;
          });
          // continue;
        }
        }


    }

});

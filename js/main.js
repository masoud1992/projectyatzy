// new Dbconn();
$(document).ready(function () {
	var globalSelectFromDB;
	// saveTotalscoreToDb();
	populateStatLists(); //.done(function(){
	//       saveTotalscoreToDb();
	//     });


	$(".playground").on("click", function (e) {
		if (throwCounter != 0) {
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

	function changePlayer() {

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

	function throwDice(dicesToThrow) {
		throwCounter++;

		var dices = [];

		for (var i = 0; i < dicesToThrow; i++) {
			var randomNum = Math.floor((Math.random() * 6) + 1);
			dices.push(randomNum);
		}

		console.log('Antal markerade: ' + $('.playground .marked').length);

		for (i = 1; i <= $('.playground .marked').length; i++) {
			var dice = returnNumberAsWord(i);

			for (i = 1; i <= 5; i++) {
				dice = returnNumberAsWord(i);

				if ($('#dice' + dice).hasClass('marked')) {
					var diceName = $('#dice' + dice).attr('src');
					var diceText = diceName.substr(diceName.length - 5);

					diceText = diceText.substr(0, 1);

					console.log('diceText = ' + diceText);

					var diceNumber = parseInt(diceText);

					//lägg till siffran på rätt index i dices

					dices.push(diceNumber);
				}
			}
		}

		console.log('Dices: ' + dices)

		getSpelLogik(dices);
		return dices;
	}

	$(".table").on("click", function (e) {
		var plats = e.target.id;
		var score = plats.substr(plats.length - 1);

		if (('#' + e.target.id) == ('#player' + activePlayer + 'score' + score) && throwCounter > 0) {
			if ($('#' + e.target.id).hasClass('unchosen')) {
				$('#' + e.target.id).addClass('chosen').removeClass('unchosen');
				endTurn(e.target.id);
			}
		};

	});

	function getSpelLogik(dices) {
		for (var f in spellogik) {

			if ($('#player' + activePlayer + spellogik[f](dices).plats).hasClass('unchosen')) {

				$('#player' + activePlayer + spellogik[f](dices).plats).text(spellogik[f](dices).sum);

			}
			console.log(spellogik[f](dices).sum);
			console.log(spellogik[f](dices).plats);
		}

	}

	var dicesToThrow;
	$(".rollDice").click(function () {
		getPlayerNamesToArray();
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
			dicesToThrow = $(".playground .unmarked").length;
			displayDice(throwDice(dicesToThrow));
			nextStepGuide(throwCounter);

		}
		if (gameOver) {
			totalScore(tempPlayerField, inputCountertemp);
		}

	});

	function endTurn(plats) {
		console.log(plats);
		for (i = 0; i <= 15; i++) {
			if ($("#player" + activePlayer + "score" + i).hasClass("unchosen")) {

				$("#player" + activePlayer + "score" + i).text("");

			}
		}
		resetDices();
		throwCounter = 0;
		nextStepGuide(throwCounter);
		updateTotalScore();
		changePlayer();
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
		case 6:
			return 'Six';
			break;
		default:
			break;
		}
	}

	function updateTotalScore() {
		var totalScore = 0;

		for (i = 0; i <= 15; i++) {
			if ($('#player' + activePlayer + 'score' + i).hasClass('chosen')) {
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
		case 0: {
				$(".bg-info").text('Steg 0, slå ditt första slag');
			}
			break;

		case 1: {
				$(".bg-info").text('Steg 1, du har två slag kvar');
			}
			break;

		case 2: {
				$(".bg-info").text('Steg 2, du har ett slag kvar');
			}
			break;

		case 3: {
				$(".bg-info").text('Steg 3, du har använt alla dina slag');
			}
			break;

		default: {
				$(".bg-info").text('Nu har någonting gått fel, ring vaktmästaren');
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
		case "player1": {
				inputCounterP1++;
				if (inputCounterP1 >= 24) {
					checkIfGameIsOver(inputCountertemp);
				}
				break;
			}
		case "player2": {
				inputCounterP2++;
				if (inputCounterP2 >= 24) {
					checkIfGameIsOver(inputCountertemp);
				}
				break;
			}
		case "player3": {
				inputCounterP3++;
				if (inputCounterP3 >= 24) {
					checkIfGameIsOver(inputCountertemp);
				}
				break;
			}
		case "player4": {
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
		}).done(function (data) {
			globalSelectFromDB = data;
			saveTotalscoreToDb();
			var totalScoreArray = [];
			var wongamesArray = [];
			for (let i = 0; i < data.length; i++) {
				totalScoreArray.push(data[i].totalScore);
				wongamesArray.push(data[i].wonGames);
			}

			totalScoreArray.sort(function (a, b) {
				return b - a;
			});
			wongamesArray.sort(function (a, b) {
				return b - a;
			});
			data.sort(function (a, b) {
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
			data.sort(function (a, b) {
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

	function getPlayerNamesToArray() {
		var playersarray = [];
		var j = 0;
		$(".playerNameInput").each(function () {
			playersarray[j] = $(this).val();
			j++;
		});
		console.log(playersarray);
	}

	function saveTotalscoreToDb() {

		var playersArray = [];
		var scoreArray = [];
		var j = 0;
		$(".playerNameInput").each(function () {
			playersArray[j] = $(this).val();
			j++;
		});
		j = 0;
		$(".playerScoreTestTotal").each(function () {
			scoreArray[j] = $(this).text();
			j++;
		});

		for (let i = 0; i < 4; i++) {
			let tempName = playersArray[i];
			let tempScore = scoreArray[i];

			console.log(globalSelectFromDB);
			// if(tempName != globalSelectFromDB.userName){

			for (let j = 0; j < globalSelectFromDB.length; j++) {
				console.log(globalSelectFromDB[j].userName);
				console.log(tempName);
				if (tempName == globalSelectFromDB[j].userName) {
					if (globalSelectFromDB[j].totalScore > tempScore) {
						tempScore = globalSelectFromDB[j].totalScore;
					}
					let tempWonGames = parseInt(globalSelectFromDB[j].wonGames, 10);
					tempWonGames += 1;
					var dataString = {
						userName: tempName,
						totalScore: parseInt(tempScore, 10),
						wonGames: tempWonGames
					};
					console.log("update", dataString);
					$.ajax({
						type: 'POST',
						url: '/queries/updateWonGames',
						contentType: "application/json",
						data: JSON.stringify(dataString),
						contentType: "application/json"
					}).done(function (data) {
						console.log("update ajax", data);
					});
					break;
				} else {
					var dataString = {
						userName: tempName,
						totalScore: parseInt(tempScore, 10),
						wonGames: 0
					};
					console.log("insert", dataString);

					$.ajax({
						type: 'POST',
						url: '/queries/insertTotalScore',
						contentType: "application/json",
						data: JSON.stringify(dataString),
						contentType: "application/json"
					}).done(function (data) {
						console.log("insert ajax", data);
					});
				}
				break;
			}
			// }
		}
	}

});

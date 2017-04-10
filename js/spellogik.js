var spellogik = {

	ones: function (dices) {
		var score = 0;

		for (let d = 0; d < dices.length; d++) {
			if (dices[d] == 1) {
				score += dices[d];
			}
		}
		return {
			sum: score,
			plats: "score1"
		};
	},

	twos: function (dices) {
		var score = 0;

		for (let d = 0; d < dices.length; d++) {
			if (dices[d] == 2) {
				score += dices[d];
			}
		}
		return {
			sum: score,
			plats: "score2"
		};
	},

	threes: function (dices) {
		var score = 0;

		for (let d = 0; d < dices.length; d++) {
			if (dices[d] == 3) {
				score += dices[d];
			}
		}
		return {
			sum: score,
			plats: "score3"
		};
	},

	fours: function (dices) {
		var score = 0;

		for (let d = 0; d < dices.length; d++) {
			if (dices[d] == 4) {
				score += dices[d];
			}
		}
		return {
			sum: score,
			plats: "score4"
		};
	},

	fives: function (dices) {
		var score = 0;

		for (let d = 0; d < dices.length; d++) {
			if (dices[d] == 5) {
				score += dices[d];
			}
		}
		return {
			sum: score,
			plats: "score5"
		};
	},

	sixes: function (dices) {
		var score = 0;

		for (let d = 0; d < dices.length; d++) {
			if (dices[d] == 6) {
				score += dices[d];
			}
		}

		return {
			sum: score,
			plats: "score6"
		};
	},

	onepair: function (dices) {

		var score = 0;
		var tempArray = [];
		var onepair = false;
		var currentDice = 0;

		for (let i = 1; i <= 6; i++) {
			var count = 0;
			for (let j = 0; j < 5; j++) {
				if (dices[j] == i) {
					currentDice = dices[j];
					count++;
				}

				if (count >= 2) {
					tempArray.push(currentDice);
					count = 0;
				}
			}
		}

		tempArray.sort(function (a, b) {
			return b - a;
		});

		score = tempArray[0] + tempArray[0];

		return {
			sum: score,
			plats: "score7"
		};
	},

	twopair: function (dices) {

		var score = 0;
		var tempArray = [];
		var currentDice = 0;
		var paircounter = 0;

		for (let i = 1; i <= 6; i++) {
			var count = 0;
			for (let j = 0; j < 5; j++) {
				if (dices[j] == i) {
					currentDice = dices[j];
					count++;
				}

				if (count >= 2) {
					tempArray.push(currentDice);
					count = 0;
				}
			}
		}

		if (tempArray.length > 1) {
			score = tempArray[0] + tempArray[0] + tempArray[1] + tempArray[1];
		}

		return {
			sum: score,
			plats: "score8"
		};
	},

	threeOfAKind: function (dices) {

		var score = 0;
		var tempArray = [];
		var currentDice = 0;

		for (let i = 1; i <= 6; i++) {
			var count = 0;
			for (let j = 0; j < 5; j++) {
				if (dices[j] == i) {
					currentDice = dices[j];
					count++;
				}

				if (count == 3) {
					tempArray.push(currentDice);
					count = 0;
					break;
				}
			}
		}

		if (tempArray.length > 0) {
			score = tempArray[0] + tempArray[0] + tempArray[0];
		}

		return {
			sum: score,
			plats: "score9"
		};
	},

	fourOfAKind: function (dices) {

		var score = 0;
		var tempArray = [];
		var currentDice = 0;

		for (let i = 1; i <= 6; i++) {
			var count = 0;
			for (let j = 0; j < 5; j++) {
				if (dices[j] == i) {
					currentDice = dices[j];
					count++;
				}

				if (count == 4) {
					tempArray.push(currentDice);
					count = 0;
					break;
				}
			}
		}

		if (tempArray.length > 0) {
			score = tempArray[0] * 4;
		}

		return {
			sum: score,
			plats: "score10"
		};
	},

	smallStraight: function (dices) {
		var score = null;
		var counter = 0
			var isSmallStraight = false;
		dices.sort(function (a, b) {
			return a - b;
		});

		if (dices[0] == 1) {

			for (var i = 0; i < dices.length; i++) {
				if (dices[i] == counter + 1) {

					isSmallStraight = true;
					counter++;

				} else {
					isSmallStraight = false;
					break;
				}
			}
		}

		if (isSmallStraight) {
			score = 15;
		}

		return {
			sum: score,
			plats: "score11"
		};
	},

	largeStraight: function (dices) {
		var score = null;
		var counter = 1;
		var isLargeStraight = false;
		dices.sort(function (a, b) {
			return a - b;
		});

		if (dices[0] == 2) {

			for (var i = 0; i < dices.length; i++) {
				if (dices[i] == counter + 1) {

					isLargeStraight = true;
					counter++;

				} else {
					isLargeStraight = false;
					break;
				}
			}
		}

		if (isLargeStraight) {
			score = 20;
		}

		return {
			sum: score,
			plats: "score12"
		};
	},

	fullHouse: function (dices) {

		var score = null;

		dices.sort(function (a, b) {
			return a - b;
		});

		if (((dices[0] == dices[1]) && (dices[3] == dices[4])) && ((dices[2] == dices[1]) || (dices[2] == dices[4]))) {
			score = 28;
		}

		return {
			sum: score,
			plats: "score13"
		};

	},

	chance: function (dices) {
		var score = 0;
		for (let d = 0; d < dices.length; d++) {
			score += dices[d];
		}
		return {
			sum: score,
			plats: "score14"
		};
	},

	yatzy: function (dices) {

		var score = null;
		var reference = dices[0];
		var isYatzy = true;

		for (var i = 0; i < dices.length; i++) {
			if (dices[i] == dices[0]) {}
			else {
				isYatzy = false;

			}
		}

		if (isYatzy == true) {
			score = 50;
		}
		return {
			sum: score,
			plats: "score15"
		};
	}

}

	ones: function (dices){
		var score = 0;

		for(let d = 0; d < dices.length; d++){
			if(dices[d] == 1){
				score += dices[d];
			}
		}
		return {sum: score, plats: "score1"};
	}, 

	twos: function (dices){
		var score = 0;

		for(let d = 0; d < dices.length; d++){
            if(dices[d] == 2){
                score += dices[d];
            }
		}
		return {sum: score, plats: "score2"};
	}, 

	threes: function (dices){
		var score = 0;

		for(let d = 0; d < dices.length; d++){
            if(dices[d] == 3){
                score += dices[d];
            }
		}
		return {sum: score, plats: "score3"};
	}, 

	fours: function (dices){
		var score = 0;

		for(let d = 0; d < dices.length; d++){
            if(dices[d] == 4){
                score += dices[d];
            }
		}
		return {sum: score, plats: "score4"};
	}, 

	fives: function (dices){
		var score = 0;

		for(let d = 0; d < dices.length; d++){
            if(dices[d] == 5){
                score += dices[d];
            }
		}
		return {sum: score, plats: "score5"};
	}, 

	sixes: function (dices){
		var score = 0;

		for(let d = 0; d < dices.length; d++){
            if(dices[d] == 6){
                score += dices[d];
            }
        }

		return {sum: score, plats: "score6"};
	},  

	onepair: function (dices){

        var score = 0;
        var tempArray = [];
        var onepair = false;
        var currentDice = 0;

		for(let i = 1; i <= 6; i++){
            var count = 0;
            for(let j = 0; j < 5; j++){
                if(dices [j] == i){
                    currentDice = dices[j];
                    count++;
                }
                
            if(count >= 2){
                tempArray.push(currentDice);
                count = 0;
            }
            }
        }
            
            tempArray.sort(function(a,b){
                return b-a;
            });
            
            score = tempArray[0]+tempArray[0];
                
        return {sum: score, plats: "score7"};
    },

    twopair: function (dices){

        var score = 0;
        var tempArray = [];
        var currentDice = 0;
        var paircounter = 0;

		for(let i = 1; i <= 6; i++){
            var count = 0;
            for(let j = 0; j < 5; j++){
                if(dices [j] == i){
                    currentDice = dices[j];
                    count++;
                }

                
            if(count >= 2){
                tempArray.push(currentDice);
                count = 0;
            }
            }
        }
           
            if(tempArray.length > 1){
            	score = tempArray[0] + tempArray[0] + tempArray[1] + tempArray[1];
            }
    
        return {sum: score, plats: "score8"};
    },

    threeOfAKind: function (dices){

        var score = 0;
        var tempArray = [];
        var currentDice = 0;

		for(let i = 1; i <= 6; i++){
            var count = 0;
            for(let j = 0; j < 5; j++){
                if(dices [j] == i){
                    currentDice = dices[j];
                    count++;
                }
                
            if(count == 3){
                tempArray.push(currentDice);
                count = 0;
                break;
            }
            }
        }

            if(tempArray.length > 0){
            	score = tempArray[0] + tempArray[0] + tempArray[0];
            }
    
        return {sum: score, plats: "score9"};
    },

    fourOfAKind: function (dices){

        var score = 0;
        var tempArray = [];
        var currentDice = 0;

		for(let i = 1; i <= 6; i++){
            var count = 0;
            for(let j = 0; j < 5; j++){
                if(dices [j] == i){
                    currentDice = dices[j];
                    count++;
                }
                
            if(count == 4){
                tempArray.push(currentDice);
                count = 0;
                break;
            }
            }
        }

            if(tempArray.length > 0){
            	score = tempArray[0] * 4;
            }
    
        return {sum: score, plats: "score10"};
    },

    smallStraight: function(dices){
    	var score = null;
        var counter = 0
        var isSmallStraight = false;
        dices.sort(function(a,b){
            return a-b;
        });
        
        if(dices[0] == 1){


            for(var i = 0; i < dices.length; i++){
                if(dices[i] == counter+1){

                    isSmallStraight = true;
                    counter++;

                }
                
                else{
                    isSmallStraight = false;
                    break;
                }
            }
        }

        if(isSmallStraight){
            score = 15;
        }
        
        return {sum: score, plats: "score11"};
    },

    largeStraight: function(dices){
    	var score = null;
        var counter = 1;
        var isLargeStraight = false;
        dices.sort(function(a,b){
            return a-b;
        });
        
        if(dices[0] == 2){


            for(var i = 0; i < dices.length; i++){
                if(dices[i] == counter+1){

                    isLargeStraight = true;
                    counter++;

                }
                
                else{
                    isLargeStraight = false;
                    break;
                }
            }
        }

        if(isLargeStraight){
            score = 20;
        }
        
        return {sum: score, plats: "score12"};
    },

    fullHouse: function(dices){

       var score = null;
        

        dices.sort(function(a,b){
            return a-b;
        });

        if(((dices[0] == dices[1]) &&  (dices[3] == dices[4])) && ((dices[2] == dices[1]) || (dices[2] == dices[4]))) {
            score = 28;
        }
          
        return {sum: score, plats: "score13"};
       
    },

    chance: function(dices){
    	var score = 0;
    	for(let d = 0; d < dices.length; d++){
    		score += dices[d];
    	}
    	return {sum: score, plats: "score14"};
    },

    yatzy: function(dices){
    	
        var score = null;
        var reference = dices[0];
        var isYatzy = true;

        for(var i = 0; i < dices.length; i++){
            if(dices[i] == dices[0]){
                
            }
            else{
                isYatzy = false;
                
            }
        }

        if(isYatzy == true){
            score = 50;
        }
        return {sum: score, plats: "score15"};
    }



			







	}
	ones: function (dices){
		var score = 0;

		for(let d = 0; d < dices.length; d++){
			if(dices[d] == 1){
				score += dices[d];
			}
		}
		return {sum: score, plats: "score1"};
	},

	twos: function (dices){
		var score = 0;

		for(let d = 0; d < dices.length; d++){
            if(dices[d] == 2){
                score += dices[d];
            }
		}
		return {sum: score, plats: "score2"};
	},

	threes: function (dices){
		var score = 0;

		for(let d = 0; d < dices.length; d++){
            if(dices[d] == 3){
                score += dices[d];
            }
		}
		return {sum: score, plats: "score3"};
	},

	fours: function (dices){
		var score = 0;

		for(let d = 0; d < dices.length; d++){
            if(dices[d] == 4){
                score += dices[d];
            }
		}
		return {sum: score, plats: "score4"};
	},

	fives: function (dices){
		var score = 0;

		for(let d = 0; d < dices.length; d++){
            if(dices[d] == 5){
                score += dices[d];
            }
		}
		return {sum: score, plats: "score5"};
	},

	sixes: function (dices){
		var score = 0;

		for(let d = 0; d < dices.length; d++){
            if(dices[d] == 6){
                score += dices[d];
            }
        }

		return {sum: score, plats: "score6"};
	},

	onepair: function (dices){

        var score = 0;
        var tempArray = [];
        var onepair = false;
        var currentDice = 0;

		for(let i = 1; i <= 6; i++){
            var count = 0;
            for(let j = 0; j < 5; j++){
                if(dices [j] == i){
                    currentDice = dices[j];
                    count++;
                }

            if(count >= 2){
                tempArray.push(currentDice);
                count = 0;
            }
            }
        }

            tempArray.sort(function(a,b){
                return b-a;
            });

			if (tempArray.length >= 1)
			{
				score = tempArray[0]+tempArray[0];
            }
        return {sum: score, plats: "score7"};
    },

    twopair: function (dices){

        var score = 0;
        var tempArray = [];
        var currentDice = 0;
        var paircounter = 0;

		for(let i = 1; i <= 6; i++){
            var count = 0;
            for(let j = 0; j < 5; j++){
                if(dices [j] == i){
                    currentDice = dices[j];
                    count++;
                }


            if(count >= 2){
                tempArray.push(currentDice);
                count = 0;
            }
            }
        }

            if(tempArray.length > 1){
            	score = tempArray[0] + tempArray[0] + tempArray[1] + tempArray[1];
            }

        return {sum: score, plats: "score8"};
    },

    threeOfAKind: function (dices){

        var score = 0;
        var tempArray = [];
        var currentDice = 0;

		for(let i = 1; i <= 6; i++){
            var count = 0;
            for(let j = 0; j < 5; j++){
                if(dices [j] == i){
                    currentDice = dices[j];
                    count++;
                }

            if(count == 3){
                tempArray.push(currentDice);
                count = 0;
                break;
            }
            }
        }

            if(tempArray.length > 0){
            	score = tempArray[0] + tempArray[0] + tempArray[0];
            }

        return {sum: score, plats: "score9"};
    },

    fourOfAKind: function (dices){

        var score = 0;
        var tempArray = [];
        var currentDice = 0;

		for(let i = 1; i <= 6; i++){
            var count = 0;
            for(let j = 0; j < 5; j++){
                if(dices [j] == i){
                    currentDice = dices[j];
                    count++;
                }

            if(count == 4){
                tempArray.push(currentDice);
                count = 0;
                break;
            }
            }
        }

            if(tempArray.length > 0){
            	score = tempArray[0] * 4;
            }

        return {sum: score, plats: "score10"};
    },

    smallStraight: function(dices){
    	var score = 0;
        var counter = 0;
        var isSmallStraight = false;

		var tempArray = [];



		for (var i = 0; i < dices.length; i++)
		{
			tempArray.push(dices[i]);
		}

		tempArray.sort(function(a,b){
            return a-b;
        });

		console.log('dices i small straight: ' + dices);

        if(tempArray[0] == 1){


            for(var i = 0; i < tempArray.length; i++){
                if(tempArray[i] == counter+1){

                    isSmallStraight = true;
                    counter++;

                }

                else{
                    isSmallStraight = false;
                    break;
                }
            }
        }


        if(isSmallStraight){
            score = 15;
        }



        return {sum: score, plats: "score11"};
    },

    largeStraight: function(dices){
    	var score = 0;
        var counter = 1;
        var isLargeStraight = false;
		var tempArray = [];


		for (var i = 0; i < dices.length; i++)
		{
			tempArray.push(dices[i]);
		}

		tempArray.sort(function(a,b){
            return a-b;
        });
		console.log('dices i large straight: ' + dices);
		if(tempArray[0] == 2){


            for(var i = 0; i < tempArray.length; i++){
                if(tempArray[i] == counter+1){

                    isLargeStraight = true;
                    counter++;

                }

                else{
                    isLargeStraight = false;
                    break;
                }
            }
        }

        if(isLargeStraight){
            score = 20;
        }

        return {sum: score, plats: "score12"};
    },

    fullHouse: function(dices){

       var score = 0;
	   var tempArray = [];

	   for (var i = 0; i < dices.length; i++)
		{
			tempArray.push(dices[i]);
		}

		tempArray.sort(function(a,b){
            return a-b;
        });

		if(((tempArray[0] == tempArray[1]) &&  (tempArray[3] == tempArray[4])) && ((tempArray[2] == tempArray[1]) || (tempArray[2] == tempArray[4]))) {
            score = 28;
        }
				var count =0;
				for(var i = 0; i < tempArray.length; i++){
            if(tempArray[i] == tempArray[0]){
								count++;
            }
        }
				if(count==5){
					score=0;
				}
        return {sum: score, plats: "score13"};

    },

    chance: function(dices){
    	var score = 0;
    	for(let d = 0; d < dices.length; d++){
    		score += dices[d];
    	}
    	return {sum: score, plats: "score14"};
    },

    yatzy: function(dices){

        var score = 0;
        var reference = dices[0];
        var isYatzy = true;

        for(var i = 0; i < dices.length; i++){
            if(dices[i] == dices[0]){

            }
            else{
                isYatzy = false;

            }
        }

        if(isYatzy == true){
            score = 50;
        }
        return {sum: score, plats: "score15"};
    }











	}

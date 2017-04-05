var spellogik = {

	ones: function (dices){
		var score = 0;

		for(var d in dices){
			if(d == 1){
				score += d;
			}
		}
		return {sum: score, plats: "score1"};
	}, 

	twos: function (dices){
		var score = 0;

		for(var d in dices){
			if(d == 2){
				score += d;
			}
		}
		return {sum: score, plats: "score2"};
	}, 

	threes: function (dices){
		var score = 0;

		for(var d in dices){
			if(d == 3){
				score += d;
			}
		}
		return {sum: score, plats: "score3"};
	}, 

	fours: function (dices){
		var score = 0;

		for(var d in dices){
			if(d == 4){
				score += d;
			}
		}
		return {sum: score, plats: "score4"};
	}, 

	fives: function (dices){
		var score = 0;

		for(var d in dices){
			if(d == 5){
				score += d;
			}
		}
		return {sum: score, plats: "score5"};
	}, 

	sixes: function (dices){
		var score = 0;

		for(var d in dices){
			if(d == 6){
				score += d;
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
                
        return score;
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
    
        return score;
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
    
        return score;
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
    
        return score;
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
        
        return score;
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
        
        return score;
    },

    fullHouse: function(dices){

       var score = null;
        

        dices.sort(function(a,b){
            return a-b;
        });

        if(((dices[0] == dices[1]) &&  (dices[3] == dices[4])) && ((dices[2] == dices[1]) || (dices[2] == dices[4]))) {
            score = 28;
        }
          
        return score;
       
    },

    chance: function(dices){
    	var score = 0;
    	for(var d in dices){
    		score += d;
    	}
    	return score;
    },

    yatzy: function(dices){
    	
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



			







	}
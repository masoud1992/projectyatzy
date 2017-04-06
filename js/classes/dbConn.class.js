class Dbconn extends Base {

  constructor(){
    super();
    // this.saveToDb();
	this.highScoreList();
  }
  
	var highScore;
	
  saveToDb(callback){
    // Just an example of how to run a query
    this.db.insertTotalScore({
        // userName:name,
        // totalScore: current
      }, callback);
  }
  
    highScoreList(){
	  this.db.getHighScore(data){
		  highScore = data;
	  }
  }
  
	updateWonGamesFunction(){
		this.db.updateWonGames({
			userName:name,
			wonGames:wonGames			
		});
	}
	
	insertNewPlayerFunctio(){
		this.db.insertNewPlayer({
			userName:name,
			totalScore:totScore,
			wonGames:wongames
		})
	}

  static get sqlQueries(){
    //
    // Please note: This part of the class is read by
    // the Node server on start so you can not build
    // queries dynamically here.
    //
    // But you can use ? as placeholders for parameters.
    //
    return {
      insertTotalScore: `
        INSERT INTO score SET ?
      `,
	  getHighScore: `
	  SELECT * FROM score
	  `,
	  updateWonGames:`
	  UPDATE score SET wongames = ? WHERE username = ?	  
	  `
	  insertNewPlayer:`
	  INSERT score SET ?
	  `	  
    }
  }
  
  


}

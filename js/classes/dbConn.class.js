class Dbconn extends Base {

  constructor(){
    super();
    // this.saveToDb();
  }

  saveToDb(callback){
    // Just an example of how to run a query
    this.db.insertTotalScore({
        // userName:name,
        // totalScore: current
      }, callback);
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
      `
    }
  }

}

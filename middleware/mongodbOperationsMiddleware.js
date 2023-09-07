
async function findLigData(requestDataBase){
    if(requestDataBase){
        const db =  requestDataBase;
        const dbCollection = db.collection("ligJsonData")
        const findResult = await dbCollection.find({}).toArray();
        //consoleLogMongoResult('findLigData Result: ', findResult);
        return findResult;
      }
}

function consoleLogMongoResult(comments , findResult){
    console.log(comments , findResult)
}

module.exports = { findLigData }
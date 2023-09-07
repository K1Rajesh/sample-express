const { MongoClient } = require('mongodb')



let mongoEnv = process.env.NODE_ENV || 'localHost';
const mongoConfig = require('../configuration/mongodb.config')[mongoEnv];

const connectionUrl = mongoConfig.connectionUrl
const databaseName = "test-app"
let client = null;
let db = null;


async function connectDB(){
    client = new MongoClient(connectionUrl, {useNewUrlParser:true,useUnifiedTopology:true})
    try{
        const result = await client.connect();
        db = result.db(databaseName); 
  
    }
    catch(error){
        myLogger.log("Failed to connect to MongoDB: ", error)
        throw(error)
    }
}

async function mongodbMiddleware(req,res,next){
    try{  
        if(!db) await connectDB();
        req.db = db
        next();
    }
    catch(error){
	console.log("mongodbMiddleware error : ", error)
        res.status(500).send(error)
    }
}

async function closeMongoDB(){
	try{
		if(client){
			await client.close();
			console.log("MongoDB connection closed")
		}
	}
	catch(error){
		console.log("MongoDB connection Failed to close")
		throw error
		
	}
}

module.exports = { mongodbMiddleware, closeMongoDB };



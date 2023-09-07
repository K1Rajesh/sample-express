const express = require('express');
const http = require('http');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const errorhandler = require('errorhandler');
const { mongodbMiddleware, closeMongoDB } = require('./middleware/mongodbMiddleware')


var env = 'development'; // process.env.NODE_ENV || 
const config = require('./configuration/app.config')[env];

console.log('Using configuration', config);


var app = express();

app.set('port', config.app.port);

app.use(morgan('combined'));
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//adding express session to express
app.use(session(
  {
	
    resave: false, //true,
    saveUninitialized: false, //true,
    secret: 'test-express-backend-secret',
	cookie:{
		maxAge: config.cookieMaxAge
	}

  }));


//app.use(express.static(path.join(__dirname, 'public')));

//MongoDB Middlewear
app.use(mongodbMiddleware)

//Adding routes
require('./routes/routes')(app);


// process.on listens to events , SIGINT is application termination with ctrl+c
process.on('SIGINT',async ()=>{
	try{
		await closeMongoDB();
		process.exit(0);
	}
	catch(error){
		process.exit(1);
	}
	
})

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

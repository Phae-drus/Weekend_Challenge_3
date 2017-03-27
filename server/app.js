// requires and global variables
var express = require ( 'express' );
var app = express();
var bodyParser = require( 'body-parser' );
var port = 5000;

//router
var tasks = require( './routes/tasks.js' );


//uses
app.use( express.static( 'server/public/views' ));
app.use( bodyParser.urlencoded( { extended: true }));

app.use( '/tasks', tasks );

//listen
app.listen( port, function(){
    console.log( 'listening on port: ', port);
});

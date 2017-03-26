var express = require ( 'express' );
var app = express();
var bodyParser = require( 'body-parser' );
var port = 5000;


//uses
app.use( express.static( 'server/public/views' ));
app.use( bodyParser.urlencoded( { extended: true }));


//listen
app.listen( port, function(){
    console.log( 'listening on port: ', port);
});

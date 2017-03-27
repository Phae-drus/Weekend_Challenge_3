//routes and globals
var express = require( 'express' );
var router = rexpress.Router();
var pg = require( 'pg' );

//database config
var config = {
  database: 'chi',
  host: 'localhost',
  port: 5432
  max: 5,
  idleTimeoutMillis: 20000
};

//new pool
var pool = new pg.Pool( config );

//router GET


//router POST



//exports
module.exports = router;

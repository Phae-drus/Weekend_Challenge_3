// routes and globals
var express = require('express');
var router = express.Router();
var pg = require('pg');

// database config
var config = {
    database: 'chi',
    host: 'localhost',
    port: 5432,
    max: 5,
    idleTimeoutMillis: 20000
};

// new pool
var pool = new pg.Pool(config);

// router DELETE
router.delete('/delete', function(req, res) {
    pool.connect(function(errorConnectingToDatabase, db, done) {
        var task =  req.params.id

        if (errorConnectingToDatabase) {
            console.log('Error connecting to the database.');
            res.send(500);
        } else {
            db.query('DELETE * FROM "tasks" WHERE "id" =;',
                function(queryError, result) {
                    done();
                    if (queryError) {
                        console.log('Error making query.');
                        res.send(500);
                    } else {
                        console.log(result);
                        res.send(result.rows);
                    }
                });
        }
    });
});

// router GET
router.get('/', function(req, res) {
    pool.connect(function(errorConnectingToDatabase, db, done) {
        if (errorConnectingToDatabase) {
            console.log('Error connecting to the database.');
            res.send(500);
        } else {
            db.query('SELECT * FROM "tasks" ORDER BY "id" DESC;',
                function(queryError, result) {
                    done();
                    if (queryError) {
                        console.log('Error making query.');
                        res.send(500);
                    } else {
                        console.log(result);
                        res.send(result.rows);
                    }
                });
        }
    });
});

// router POST
router.post('/newTask', function(req, res) {
    console.log(req.body);
    var task = req.body;

    pool.connect(function(errorConnectingToDatabase, db, done) {
        if (errorConnectingToDatabase) {
            console.log('Error connecting to the database.');
            res.send(500);
        } else {
            db.query('INSERT INTO "tasks" ("task")' +
                ' VALUES ($1);', [task],
                function(queryError, result) {
                    done();
                    if (queryError) {
                        console.log('Error making query.');
                        res.send(500);
                    } else {
                        res.sendStatus(201);
                    }
                });
        }
    });
});


// exports
module.exports = router;

var express = require('express');
const pgClient = require('../database/pgClient')
var router = express.Router();


/*  
    GET all game records 
    GET /records
*/
router.get('/', function(req, res, next) {
    if (req.query.class || req.query.gameId) return next();
    const gameId = req.query.gameId;

    pgClient.query('SELECT record_id, game_id, name, class, points, attempt, RANK() OVER (ORDER BY points DESC) AS rank FROM game_record', (error, results) => {
        if (error) {
            throw error
        }
  
        var records = results.rows
        res.status(200).json(records)
      })
});


/*  
    GET all game records by game id 
    GET /records?gameId=1
*/
router.get('/', function(req, res, next) {
    if (req.query.class) return next();
    const gameId = req.query.gameId;

    pgClient.query('SELECT  record_id, game_id, name, class, points, attempt, RANK() OVER (ORDER BY points DESC) AS rank FROM game_record WHERE game_id=$1 ORDER BY points DESC',[gameId], (error, results) => {
        if (error) {
            throw error
        }
  
        var records = results.rows
        res.status(200).json(records)
      })
});


/*  
    GET all game records by class name 
    GET /records?class=4b
*/
router.get('/', function(req, res, next) {
    const className = req.query.class

    pgClient.query('SELECT  record_id, game_id, name, class, points, attempt, RANK() OVER (ORDER BY points DESC) AS rank FROM game_record WHERE class=$1 ORDER BY points DESC',[className], (error, results) => {
        if (error) {
            throw error
        }
  
        var records = results.rows
        res.status(200).json(records)
      })
});


// TODO
/* 
    POST game record

   record = {   
        recordId,
        gameId,
        name,
        class,
        points,
        attempt
    }

*/
router.post('/', function(req,res,next){
    console.log(req.body)
    var record = req.body

    pgClient.query(`
    INSERT INTO game_record (game_id, name, class, points, attempt ) VALUES ($1, $2::VARCHAR, $3::VARCHAR, $4, 
    (COALESCE((SELECT max(attempt) FROM game_record WHERE name = $2 AND class = $3), 0 )+1));`,
    [record.gameId, record.name, record.class, record.points], (error, results) => {
        if (error) {
            res.sendStatus(400)
            throw error
        }
      })

    res.sendStatus(200)
})















module.exports = router;

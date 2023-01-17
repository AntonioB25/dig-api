var express = require('express');
//const { io } = require('../bin/www')
const pgClient = require('../database/pgClient')
var currentGameId = require('../database/currentGameId')
const {PythonShell} = require("python-shell");

var router = express.Router();

const MIN = 1000;
const MAX = 999999;


/* GET generated game id */
router.get('/gameId', async function(req, res, next){
 
  var gameId = getRandomInt(MIN,MAX);  
  const { rows } = await pgClient.query('SELECT game_id FROM game_record')

  // get random id until it's not in db
  while(true){
    if(!rows.includes(gameId)){ 
      break;
    }

    gameId = getRandomInt(MIN,MAX)    
  }

  currentGameId = gameId // save current game id
  res.send({gameId})
})


router.get('/gameTest', async function(req, res, next){
 
  var gameId = getRandomInt(MIN,MAX);  
  
  res.send({gameId})
})

/* GET check if game id is valid */
router.get('/validate', function(req, res, next){
  var gameId = req.query.gameId;  

  var valid = gameId == currentGameId
  res.send({valid})
})


/* POST send an event to everyone to start game */
router.post('/start', function(req, res, next) {
    console.log("Trying to send START to everyone...")  
    io.emit('start', { start: 'yes' }); 

    
    res.sendStatus(200);
  });
  


/* GET prediction */
router.get('/prediction', async function(req, res, next){
  var attempt = req.query.attempt;
  var predictionPoints = 0;

  await predict(predictionPoints, attempt).then(res =>{
   predictionPoints = res
  })

  res.send({predictionPoints});
})


module.exports = router;


// run python script with linear regression
function predict(data, attempt){
  return new Promise((resolve, reject) => {
    let result;
    let pyshell = new PythonShell('./python/linearRegression.py', {mode: 'text', args: [attempt]});
    
    pyshell.on('message', function (message) {
      result = JSON.parse(message);
    });
    
    pyshell.on('stderr', function (stderr) {
      console.log(stderr);
    });
    
    pyshell.end(function (err, code, signal) {
      if (err) reject(err);
      console.log('The exit code was: ' + code);
      console.log('The exit signal was: ' + signal);
      console.log('finished');
      resolve(result);
    });
    
  });
}

// generate random int
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
var express = require('express');
var router = express.Router();
const pgClient = require('../database/pgClient')

// TODO
/* POST login teacher */
router.post('/login', function(req,res,next){
  const teacher = req.body
  
  pgClient.query('SELECT * FROM user_account WHERE email=$1',[teacher.email], (error, results) => {
    if (error) {
        throw error
    }

    var userInfo = results.rows[0]

    // user does not exist
    if(userInfo === undefined){
      res.sendStatus(401)
    }

    // compare passwords
    if(teacher.password === userInfo.password){
      // TODO return token....

      res.status(200).json(userInfo)
    } 

    // wrong password
    res.sendStatus(401)
  })

})

/* GET user by user id */
router.get('/:id', function(req,res,next){
  const userId = req.params.id

  pgClient.query('SELECT * FROM user_account WHERE user_id=$1',[userId], (error, results) => {
      if (error) {
          throw error
      }

      var userInfo = results.rows[0]
      delete userInfo.password

      res.status(200).json(userInfo)
    })
})

module.exports = router;


require('dotenv').config();
const postRouter = require('express').Router();
const connection = require('../conf.js');
const bcrypt = require('bcrypt');
const saltRounds = 3;

postRouter.get('/', (req, res) => {
      
    connection.query("SELECT * FROM post", (err, results) => {
      if(err){
        res.status(404).send("Not found");
        console.log(err)
      } else {
        res.status(200).json(results)
          }
    })
  });



  postRouter.post('/add', (req, res) => {
  
    console.log(req.body);
    const toAdd  = req.body
    connection.query("INSERT INTO post SET ?", toAdd, (err, results) => {
    if(err){
        console.log(err)
        res.status(500).send('Server error...');
    } else {
         res.status(201).send("it's okay!");
    }
  });
});

// DELETE requete.


module.exports = postRouter;
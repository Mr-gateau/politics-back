
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
    const { id, code } = req.params;
    const passHash = bcrypt.hash(code, saltRounds, function(_, hash) {
      return hash
  });
    toAdd ={
      user :id,
      key: '',
      intro : '',
      content: '',
      depend: '',
      burn: 0,
      cold: 0
    }
    console.log(toAdd);
    connection.query("INSERT INTO post VALUES ?", toAdd, (err, results) => {
    if(err){
        res.status(500).send('Server error...');
    } else {
         res.status(201).send("it's okay!");
    }
  });
});

// DELETE requete.


module.exports = postRouter;
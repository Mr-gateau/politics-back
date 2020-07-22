
require('dotenv').config();
const postRouter = require('express').Router();
const connection = require('../conf.js');
const bcrypt = require('bcrypt');
const saltRounds = 3;

postRouter.get('/all', (req, res) => {
      
    connection.query("SELECT post.id, post.title, post.intro, post.burn, post.cold FROM post JOIN depends ON post.depend = depends.id ", (err, results) => {
      if(err){
        res.status(404).send("Not found");
        console.log(err)
      } else {
        res.status(200).json(results)
          }
    })
  });

  postRouter.get('/article/:id', (req, res) => {
    const { id } = req.params
    connection.query('SELECT * FROM post WHERE id = ?',id, (err, results) => {
      if(err){
        res.status(404).send("Not found...");
        console.log(err)
      } else {
        res.status(200).json(results[0]);
      }
    })
  })



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
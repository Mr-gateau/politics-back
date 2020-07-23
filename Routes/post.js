var cors = require('cors')
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
        console.log(results)
        res.status(200).json(results)
          }
    })
  });

  postRouter.get('/who/:who', (req, res) => {
    const { who } = req.params;
    console.log(who)
    connection.query("SELECT post.id, post.title, post.intro, burn, cold FROM post JOIN depends ON post.depend = depends.id ORDER BY cold DESC", who, (err, results) => {
      if(err){
        res.status(404).send("Not found");
        console.log(err)
      } else {
        console.log(who)
        res.status(200).json(results)
          }
    })
  })

  postRouter.get('/by/:who', (req, res) => {
    const { who } = req.params;
    console.log(who)
    connection.query("SELECT post.id, post.title, post.intro, post.burn, post.cold FROM post JOIN depends ON post.depend = depends.id WHERE depends.id = ?", who, (err, results) => {
      if(err){
        res.status(404).send("Not found");
        console.log(err)
      } else {
        console.log(results)
        res.status(200).json(results)
          }
    })
  })

  postRouter.get('/article/:id', (req, res) => {
    const { id } = req.params
    connection.query('SELECT title, intro, content, cold, burn FROM post WHERE id = ?',id, (err, results) => {
      if(err){
        res.status(404).send("Not found...");
        console.log(err)
      } else {
        res.status(200).json(results[0]);
      }
    })
  })

  postRouter.put('/modify/:id',  cors(), (req, res, next) => {
    const { id } = req.params;
    const { body } = req;
    connection.query("UPDATE post SET ? WHERE id = ?", [body, id], (err, results)=>{
      if(err){
        console.log(err)
        console.log(body)
        res.status(500).send('Server error...');
    } else {
      console.log(id)
      console.log(body)
         res.status(201).send("it's done!");
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
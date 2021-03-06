var cors = require('cors');
require('dotenv').config();
const postRouter = require('express').Router();
const connection = require('../conf.js');

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
    connection.query(`SELECT post.id, post.title, post.intro, burn, cold FROM post JOIN depends ON post.depend = depends.id ORDER BY ${who} DESC`, (err, results) => {
      if(err){
        res.status(404).send("Not found");
        console.log(err)
      } else {
        res.status(200).json(results);
          }
    })
  })

  postRouter.get('/by/:who', (req, res) => {
    const { who } = req.params;
    console.log(who);
    connection.query("SELECT post.id, post.title, post.intro, post.burn, post.cold FROM post JOIN depends ON post.depend = depends.id WHERE depends.id = ?", who, (err, results) => {
      if(err){
        res.status(404).send("Not found");
        console.log(err);
      } else {
        res.status(200).json(results);
          }
    })
  })

  postRouter.get('/article/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT title, intro, content, cold, burn FROM post WHERE id = ?',id, (err, results) => {
      if(err){
        res.status(404).send("Not found...");
        console.log(err);
      } else {
        res.status(200).json(results[0]);
      }
    });
  });

  postRouter.put('/modify/:id',  cors(), (req, res, next) => {
    const { id } = req.params;
    const { body } = req;
    connection.query("UPDATE post SET ? WHERE id = ?", [body, id], (err, results)=>{
      if(err){
        console.log(err)
        res.status(500).send('Server error...');
    } else {
         res.status(201).send("it's done!");
    }
    });
  });

  postRouter.post('/delete/:id',  cors(), (req, res, next) => {
    const { id } = req.params;
    const { name, key } = req.body;
    connection.query("DELETE from post where user = ? AND id = ? AND key_post = ?",[name, id, key], (err,results) => {
     if(err){
       console.log(err)
       res.status(500).send('Erreur de champ...');
     } else {
       res.status(200).send('Deleted !');
     }
      });

    });

  postRouter.post('/add', (req, res) => {
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

module.exports = postRouter;
var cors = require('cors');
require('dotenv').config();
const comRouter = require('express').Router();
const connection = require('../conf.js');



  comRouter.get('/:who', (req, res) => {
    const { who } = req.params;
    console.log(who);
    connection.query("SELECT commentaire FROM coms WHERE id_article = ?", who, (err, results) => {
      if(err){
        res.status(404).send("Not found");
        console.log(err);
      } else {
        res.status(200).json(results);
          }
    })
  })

  comRouter.post('/add', (req, res) => {
    const toAdd  = req.body
    connection.query("INSERT INTO coms SET ?", toAdd, (err, results) => {
    if(err){
        console.log(err)
        res.status(500).send('Server error...');
    } else {
         res.status(201).send("it's okay!");
    }
  });
});


  module.exports = comRouter;
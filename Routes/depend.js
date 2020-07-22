const dependRouter = require('express').Router();
const connection = require('../conf.js');

dependRouter.get('/', (req, res) => {
    
    connection.query("SELECT * FROM depends", (err, results) => {
      if(err){
        res.status(404).send("Not found");
        console.log(err)
      } else {
        res.status(200).json(results)
          }
    });
  });

  dependRouter.post('/add', (req, res) => {
      const toAdd = req.params;
      console.log(toAdd);
      connection.query("INSERT INTO depends (id, depend_name) VALUES ?", toAdd, (err, results) => {
      if(err){
          res.status(500).send('Server error...');
      } else {
          res.status(201).send('added !');
      }
    });
  });


module.exports = dependRouter;
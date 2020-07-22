const adminRouter = require('express').Router();
const connection = require('../conf.js');
const bcrypt = require('bcrypt');
const saltRounds = 3;

adminRouter.get('/:id', (req, res) => {
    const {id, pass} = req.params.id;
    connection.query("DELETE FROM `post` WHERE `id` = ?",id, (err, results) => {
      if(err){
        res.status(404).send("Not found");
        console.log(err)
      } else {
        res.status(200).json("Deleted !")
          }
    });
  });

module.exports = adminRouter;
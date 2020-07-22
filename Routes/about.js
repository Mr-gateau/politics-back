const aboutRouter = require('express').Router();


aboutRouter.get('/', (req, res) => {
  //connection si besoin
  // resultats
  res.status(200).send('Politics Back-end');
});


module.exports = aboutRouter;
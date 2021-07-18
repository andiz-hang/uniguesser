var express = require('express');
var router = express.Router();
var model = require('../db/model')

router.get('/', function(req, res, next) {
    res.render('game', { title: 'Uniguesser' });
  });

router.post('/', async function(req, res, next) {
  try {
    var result = await model.insertScore(req.body);
    res.json(result)
  } catch (err) {
    res.status(422).send("Unable to save game session!")
  }

});


module.exports = router;

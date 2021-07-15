var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.render('high_scores', { title: 'High Scores' });
  });



module.exports = router;

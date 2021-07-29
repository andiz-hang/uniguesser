var express = require('express');
var router = express.Router();

// /* ORIGINAL GET home page. */
// router.get('/', function(req, res, next) {
//   res.locals.session = req.session
//   res.render('index', { title: 'Express' });
// });

/* GET home page. */
router.get('/', function(req, res, next) {
    res.locals.session = req.session
    if (!req.session.user_id){
        res.render('login');
    } else {
        res.render('profile');
    }
  });
  

module.exports = router;

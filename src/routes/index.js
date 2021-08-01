var express = require('express');
var router = express.Router();
var model = require('../db/model')

/* GET home page. */
router.get('/', async function(req, res, next) {
    res.locals.session = req.session
    if (!req.session.user_id){
        res.render('login');
    } else {
        var info = await model.getUserData(req.session.user_id);
        res.render('profile', { info: info });
    }
});

router.get('/user-info', async function(req, res, next) {
    var info = await model.getUserData(req.session.user_id);
    res.send(info);
});

router.post('/user-info', async function(req, res, next) {
    console.log(req.body);
    await model.editUserData(req.body);
    res.redirect('/');
});

module.exports = router;

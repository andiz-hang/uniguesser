var express = require('express');
var router = express.Router();
var model = require('../db/model')


router.get('/', async function(req, res, next) {
    if (!req.session.user_id){
        req.flash('error', 'You are not logged in.')
        return res.redirect('/');
      } else {
        var schools = await model.getSchools();
        res.render('gallery', { schools: schools });
      }
});

router.get('/:id', async function(req, res, next) {
    var school = await model.getUniversity(req.params.id);
    res.send(school.school_description);
});

module.exports = router;

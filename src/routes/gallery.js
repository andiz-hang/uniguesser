var express = require('express');
var router = express.Router();
var model = require('../db/model')


router.get('/', async function(req, res, next) {
    var schools = await model.getUniversities();
    res.render('gallery', { schools: schools });
});

router.get('/:id', async function(req, res, next) {
    var school = await model.getUniversity(req.params.id);
    res.send(school.school_description);
});

module.exports = router;

var express = require('express');
var router = express.Router();
var model = require('../db/model')


router.get('/', async function(req, res, next) {
    var schools = await model.getUniversities();
    res.render('gallery', { schools: schools});
});

module.exports = router;

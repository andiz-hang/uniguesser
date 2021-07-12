var express = require('express');
var router = express.Router();
var model = require('../db/model')

router.post('/', async function(req, res, next) {
    var result = await model.insertScore(req.body);
    res.json(result)
});

module.exports = router;

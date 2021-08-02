var express = require("express");
var router = express.Router();
var model = require("../db/model");

router.get("/", function (req, res, next) {
  if (!req.session.user_id){
      req.flash('error', 'You are not logged in.')
      return res.redirect('/');
  } else {
      res.render("game", { title: "Uniguesser" });
  }
});

router.post("/", async function (req, res, next) {
  var result = {};
  try {
    if (req.session.user_id) {
      result = await model.insertScore(req.session.user_id, req.body);
    }

    res.json(result);
  } catch (err) {
    res.status(422).send("Unable to save game session!");
  }
});

module.exports = router;

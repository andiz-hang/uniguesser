var express = require("express");
var router = express.Router();
var model = require("../db/model");

router.get("/", function (req, res, next) {
  res.render("high_scores", { title: "High Scores" });
});

router.get("/list", async function (req, res, next) {
  try {
    var highScores = await model.getHighscores();
    var highScoreList = [];

    for (let i = 0; i < highScores.length; i++) {
      highScoreList.push({
        username: highScores[i].username,
        score: highScores[i].score,
        duration: highScores[i].duration,
        created_at: highScores[i].created_at,
        country: highScores[i].country,
      });
    }
    res.json(highScoreList);
  } catch (err) {
    res.status(422).send("Unable to generate the list of highscores!");
  }
});

module.exports = router;

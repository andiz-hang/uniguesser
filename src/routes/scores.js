var express = require("express");
var router = express.Router();
var model = require("../db/model");

router.get("/", function (req, res, next) {
  if (!req.session.user_id){
    res.render('login');
  } else {
    res.render("high_scores", { title: "High Scores" });
  }
});

router.get("/list", async function (req, res, next) {
  try {
    var highScores = await model.getHighscores();
    var highScoreList = [];

    for (let i = 0; i < Math.min(highScores.length, 20); i++) {
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

router.get("/personallist", async function (req, res, next) {
  try {
    var info = await model.getUserData(req.session.user_id);
    var highScores = await model.getHighscores();
    var highScoreList = [];

    for (let i = 0; i < Math.min(highScores.length, 20); i++) {
      if (info.user_id == highScores[i].user_id) {
        highScoreList.push({
          username: highScores[i].username,
          score: highScores[i].score,
          duration: highScores[i].duration,
          created_at: highScores[i].created_at,
          country: highScores[i].country,
        });
      }
    }
    res.json(highScoreList);
  } catch (err) {
    res.status(422).send("Unable to generate the list of personal highscores!");
  }
});

router.get("/country-list", async function (req, res, next) {
  try {
    var highScoreList = [];

    if ((req.session.country).length > 0) {
      var highScores = await model.getHighscoresByCountry(req.session.country);

      for (let i = 0; i < Math.min(highScores.length, 20); i++) {
        highScoreList.push({
          username: highScores[i].username,
          score: highScores[i].score,
          duration: highScores[i].duration,
          created_at: highScores[i].created_at,
          country: highScores[i].country,
        });
      }
    }

    res.json(highScoreList);
  } catch (err) {
    res.status(422).send("Unable to generate the list of highscores!");
  }
});

module.exports = router;

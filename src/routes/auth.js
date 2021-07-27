var express = require('express');
var router = express.Router();
var model = require('../db/model')

/* GET users listing. */
router.get('/login-error', function(req, res, next) {
  res.send('Invalid credentials');
});

router.post('/login-or-register', async function(req, res, next) {
  if (req.body.username && req.body.password) {
    if (req.body.action == 'register') {
      var registeredUser = await model.registerUser({
        username: req.body.username,
        password: req.body.password
      })
      req.session.user_id = registeredUser.user_id
      return res.redirect('/')
    } else if (req.body.action == 'login') {
      var user = await model.loginUser({
        username: req.body.username,
        password: req.body.password
      })
      if (!user) return res.redirect('/login-error')
      req.session.user_id = user.user_id
      req.session.username = user.username
      req.session.email = user.email
      return res.redirect('/')
    } 
  }
  
  res.redirect('/auth/login-error')
});

router.post("/logout", async (req, res) => {
  delete req.session.user_id

  return res.redirect('/')
})

module.exports = router;

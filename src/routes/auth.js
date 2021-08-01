const express = require('express');
const router = express.Router();
const model = require('../db/model')
const bcrypt = require('bcrypt');

const BCRYPT_SALT_ROUNDS = 10

/* GET users listing. */
router.get('/login-error', function(req, res, next) {
  res.send('Invalid credentials');
});

router.post('/login', async function(req, res, next) {
  if (req.body.username && req.body.password) {
    if (req.body.action == 'register') {
      const password_hash = bcrypt.hashSync(req.body.password, BCRYPT_SALT_ROUNDS)
      const registeredUser = await model.registerUser({
        username: req.body.username,
        password: password_hash
      })
      req.session.user_id = registeredUser.user_id
      return res.redirect('/')
    } else if (req.body.action == 'login') {
      const user = await model.getUserByUsername(req.body.username)
      
      if (!user) {
        return res.redirect('/login-error')
      }
      
      const password_hash = user.password
      const isValid = bcrypt.compareSync(req.body.password, password_hash)

      if (isValid) {
        req.session.user_id = user.user_id;
        req.session.username = user.username;
        req.session.email = user.email;
        req.session.country = user.country;
        return res.redirect('/')
      } else {
        return res.redirect('/login-error')
      }
    }
  }
  
  return res.redirect('/auth/login-error')
});

router.post('/register', async function(req, res, next) {
  if (req.body.username && req.body.password) {
    var registeredUser = await model.registerUser({
      username: req.body.username,
      password: req.body.password,
      country: req.body.country
    })
    req.session.user_id = registeredUser.user_id
    return res.redirect('/')
  }
});

router.post("/logout", async (req, res) => {
  delete req.session.user_id

  return res.redirect('/')
})

module.exports = router;

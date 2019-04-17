const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const {User} = require('../models');
const passports = require('../passport');
//const passport = passportmodule.passport;
const authHandler = passports.authHandler;


// const authHandler = passport.authenticate('local', {
//   successRedirect: '/auth2',
//   failureRedirect: '/auth',
// });

// routes
router.post('/auth', authHandler, urlencodedParser, async (req, res) => {
  
});

router.get('/auth', urlencodedParser, async (req, res) => {
  res.render('auth');
});

router.post('/signup', urlencodedParser, async (req, res) => {
  console.log(req.body);

  let user = {
     login: req.body.login,
  };

  user = new User(user);

  user.hash = user.hashPassword(req.body.password);
  console.log(user);
  user.save();
  console.log('user.save()');
  res.redirect('/');
  // res.render('app', { users });
});

module.exports = router;
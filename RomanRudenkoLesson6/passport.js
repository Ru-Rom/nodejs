// const express = require('express');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const session = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');
// const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1/test');
const {User} = require('./models');

// const app = express();

// app.use(bodyParser.json());
// app.use(cookieParser());
// app.use(session({ keys: ['secret'] }));

// app.use(passport.initialize()); // Инициализируем паспорт
// app.use(passport.session());

passport.use(new LocalStrategy(async (username, password, done) => { // Стратегия авторизации по логину и паролю | done калбек который мы вызываем после попытки авторизации удачной или нет
  const user = await User.findOne({username});
  if(user && user.password === user.checkPassword(password)) {
    delete user.password;
    return done(null, user); // удалить из юзера значимую информацию (пароли и пр)
  } else {
    return done(null, false);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => { // Восстанавливает данные пользователя из базы по айди
  const user = await User.findById(id);
  delete user.password;
  done(null, user);
});

const authHandler = passport.authenticate('local', {
  successRedirect: '/auth2',
  failureRedirect: '/user/auth',
});

// module.exports = { passport, authHandler };

module.exports = {
  passport: passport,
  authHandler: authHandler
} 
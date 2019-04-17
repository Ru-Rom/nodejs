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
  // console.log('LocalStrategy выполнилась, ' + username + password);
  const user = await User.findOne({login: username});
  console.log('user.checkPassword(password) ' + user.checkPassword(password));
  if(user && user.checkPassword(password)) {  
    console.log('Проверка пройдена!');
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
  successRedirect: '/',
  failureRedirect: '/user/auth',
});

// module.exports = { passport, authHandler };

module.exports = {
  passport: passport,
  authHandler: authHandler
} 
const path = require('path');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('cookie-parser');
const consolidate = require('consolidate');
const mongoose = require('mongoose');
const {passport} = require('./passport');

mongoose.connect('mongodb://192.168.99.100:32768/todo', { useNewUrlParser: true });

// const {User, Task} = require('./models');

const indexr = require('./routes/index');
const taskr = require('./routes/task');
const userr = require('./routes/user');

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// мидл
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ keys: ['secret'] }));
app.use(passport.initialize()); // Инициализируем паспорт
app.use(passport.session());

app.use('/', indexr);
app.use('/tasks', taskr);
app.use('/user', userr);

app.listen(81);
const path = require('path');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const consolidate = require('consolidate');
const mongoose = require('mongoose');

mongoose.connect('mongodb://192.168.99.100:32768/todo', { useNewUrlParser: true });

const indexr = require('./routes/index');
const taskr = require('./routes/task');

app.engine('hbs', consolidate.handlebars);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// мидл
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', indexr);
app.use('/tasks', taskr);


app.listen(81);
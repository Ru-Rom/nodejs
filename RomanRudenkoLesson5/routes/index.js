const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const router = express.Router();
const {Task} = require('../models');

router.get('/', jsonParser, async (req, res) => {
    const tasks = await Task.find();
    res.render('app', { tasks });
});

module.exports = router;
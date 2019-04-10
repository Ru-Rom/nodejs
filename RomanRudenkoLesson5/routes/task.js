const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const {Task} = require('../models');

// routes
router.post('/', urlencodedParser, async (req, res) => {
    let task = new Task(req.body);
    task = await task.save();
    const tasks = await Task.find();
    res.render('app', { tasks });
});

router.get('/del/:id', urlencodedParser, async (req, res) => {
    const task = await Task.deleteOne({ "_id": req.params.id });
    const tasks = await Task.find();
    res.render('taskRemoved', { tasks });
});

router.get('/edit/:id', async (req, res) => {
    const task = await Task.findOne({ "_id": req.params.id });
    res.render('taskEdit', { task });
});

router.post('/edit/:id', urlencodedParser, async (req, res) => {
    const task = await Task.updateOne({ "_id": req.params.id}, { $set: req.body });
    const tasks = await Task.find();
    res.render('app', { tasks });
});

module.exports = router;
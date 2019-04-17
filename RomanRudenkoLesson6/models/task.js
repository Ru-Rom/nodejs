const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date },
  text: { type: String },
});

module.exports = mongoose.model('Task', taskSchema, 'tasks');
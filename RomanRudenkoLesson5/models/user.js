const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, default: 'Ivan Ivanov', required: true },
  age: { type: Number },
});

module.exports = mongoose.model('User', userSchema, 'users');
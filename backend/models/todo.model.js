const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  userId: { type: String, required: true },
  description: { type: String, required: true },
  isDone: { type: Boolean, default: false },
}, {
  timestamps: true,
});

const Todo = mongoose.model('todo', todoSchema);

module.exports = Todo;
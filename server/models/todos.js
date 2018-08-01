const mongoose = require('mongoose');
const Schema = mongoose.Schema


const todoSchema = new Schema({

  content: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isDone: {
    type: Boolean,
    default: false,
  }

}, {
  timestamps: true
});


const Todo = mongoose.model('ToDo', todoSchema);

module.exports = Todo

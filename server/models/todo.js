const mongoose = require('mongoose')

const { Schema } = mongoose

const todoSchema = new Schema({
  title: {
    type: String,
  },
  time: {
    type: Number,
    default: new Date().getTime(),
  },
  desc: {
    type: String,
    default: '',
  },
  done: {
    type: Boolean,
    default: false,
  },
  tagId: {
    type: String,
    default: '',
  },
  user_uuid: {
    type: String,
  },
})

const Todo = mongoose.model('todo', todoSchema)

module.exports = Todo

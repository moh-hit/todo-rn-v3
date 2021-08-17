const mongoose = require('mongoose')

const { Schema } = mongoose

const habitSchema = new Schema({
  title: {
    type: String,
  },
  icon: {
    type: String,
  },
  completedCount: {
    type: Number,
    default: 0,
  },
  totalCount: {
    type: Number,
  },
  habitColor: {
    type: String,
  },
  habitCode: {
    type: String,
    default: 'times',
  },
  habitRoutine: {
    type: String,
  },
  user_uuid: {
    type: String,
  },
})

const Habit = mongoose.model('habit', habitSchema)

module.exports = Habit

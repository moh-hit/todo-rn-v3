const express = require('express')
const Habit = require('../models/habit')

const router = express.Router()

router.get('/fetch_habits', async (req, res) => {
  try {
    const { user_uuid } = req.query

    await Habit.find({ user_uuid }, (err, habit) => {
      if(err) {
        console.log(err)
      } else {
        if (habit.length === 0) {
          return res.status(201).json({ status: 'success', msg: 'No habit found' })
        }
        return res.status(200).json({ status: 'success', data: habit })
      }
    })
  } catch (err) {
    return res.status(400).json({ status: 'error', msg: err.message })
  }
})

router.post('/create_habit', async (req, res) => {
  try {
    const {
      title, icon, completedCount, totalCount, habitColor, habitCode, habitRoutine, user_uuid,
    } = req.query
    await new Habit({
      title, icon, completedCount, totalCount, habitColor, habitCode, habitRoutine, user_uuid,
    }).save((err, habit) => {
      if(err) {
        console.log(err)
      } else {
        return res.status(200).json({ status: 'success', data: habit })
      }
    })
  } catch (err) {
    return res.status(400).json({ status: 'error', msg: err.message })
  }
})

router.post('/remove_habit', async (req, res) => {
  try {
    const { id } = req.query
    await Habit.findByIdAndDelete(id, (err) => {
      if(err) {
        console.log(err)
      } else {
        return res.status(200).json({ status: 'success', msg: 'Habit deleted successfully' })
      }
    })
  } catch (err) {
    return res.status(400).json({ status: 'error', msg: err.message })
  }
})

module.exports = router

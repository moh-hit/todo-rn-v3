const express = require('express')
const Todo = require('../models/todo')

const router = express.Router()

const isToday = (date) => {
  const today = new Date()
  return date.getDate() === today.getDate()
        && date.getMonth() === today.getMonth()
        && date.getFullYear() === today.getFullYear()
}

router.post('/create_todo', async (req, res) => {
  try {
    const {
      title, desc, done, time, tagId, user_uuid,
    } = req.query
    await new Todo({
      title, desc, done, time, tagId, user_uuid,
    }).save((err, todo) => {
      if(err) {
        console.log(err)
      } else {
        return res.status(200).json({ status: 'success', data: todo })
      }
    })
  } catch (err) {
    return res.status(400).json({ error: true, msg: err.message })
  }
})

router.get('/fetch_todo', async (req, res) => {
  try {
    const { user_uuid, today = false } = req.query

    await Todo.find({ user_uuid }, (err, todo) => {
      let data = []
      if(err) {
        console.log(err)
      } else {
        if (todo.length === 0) {
          return res.status(201).json({ status: 'success', msg: 'No todo found' })
        }
        if(JSON.parse(today)) {
          todo.forEach((item) => {
            if(isToday(new Date(item.time))) {
              data.push(item)
            }
          })
        } else {
          data = todo
        }
        return res.status(200).json({ status: 'success', data })
      }
    })
  } catch (err) {
    return res.status(400).json({ error: true, msg: err.message })
  }
})

router.post('/remove_todo', async (req, res) => {
  try {
    const { id } = req.query
    await Todo.findByIdAndDelete(id, (err) => {
      if(err) {
        res.status(400).json({ error: true, msg: err.message })
      } else {
        return res.status(200).json({ status: 'success', msg: 'Todo deleted successfully' })
      }
    })
  } catch (err) {
    return res.status(400).json({ error: true, msg: err.message })
  }
})

router.post('/toggle_todo_done', async (req, res) => {
  try {
    const { id, done } = req.query
    const doneBool = JSON.parse(done.toLowerCase())
    await Todo.updateOne({ _id: id }, { $set: { done: !doneBool } }, (err) => {
      if(err) {
        res.status(400).json({ error: true, msg: err.message })
      } else {
        return res.status(200).json({ status: 'success', msg: !doneBool ? 'Todo changed to done' : 'Todo changed to pending' })
      }
    })
  } catch (err) {
    return res.status(400).json({ error: true, msg: err.message })
  }
})

module.exports = router

const express = require('express')

const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 5000

const dotenv = require('dotenv')

dotenv.config()

const cors = require('cors')

// MIDDILWARES
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/todo', require('./routes/todoRoutes'))
app.use('/habit', require('./routes/habitRoutes'))

// Catching 404 Error
app.use((req, res, next) => {
  const error = new Error('INVALID ROUTE')
  error.status = 404
  next(error)
})

// Error handler function
app.use((error, req, res) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message,
    },
  })
})

mongoose.connect(process.env.MONGO_URL,
  {
    useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true,
  }).then(() => {
  app.listen(PORT)
  console.log(`SERVER STARTED AT ${PORT}`)
}).catch((err) => {
  console.log('ERR - ', err.message)
})

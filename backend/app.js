const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const postsRouter = require('./routes/posts')
const commentRouter = require('./routes/comments')
const cors = require('cors')
const app = express()
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb+srv://rugsrme:sixdsixd@hopeforum.ti0yb.mongodb.net/hopeforum?retryWrites=true&w=majority', {
       useNewUrlParser: true,
      useUnifiedTopology: true
     })
//mongoose.connect('mongodb://localhost:27017/mongoose-test', {
  //  useNewUrlParser: true, useUnifiedTopology: true
//})
const connection = mongoose.connection
connection.once('open', () => {
  console.log('mongoDB connection established successfully')
})
mongoose.Promise = global.Promise

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, Requested-With, Content-Type, Accept, Authorization'
  )
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/posts', postsRouter)
app.use('/comments', commentRouter)
app.use((req, res, next) => {
  const error = new Error('404 not found')
  error.status = 404
  next(error)
})
app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({ error: { message: error.message } })
})

module.exports = app

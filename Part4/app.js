const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

const middleware = require('./utils/middleware')

logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

//Middleware tokenExtractor before requests
app.use(middleware.tokenExtractor)
//Middleware userExtractor before requests
app.use(middleware.userExtractor)

//make the blogs router into use in our application to dealing with endpoint "api/blogs"
app.use('/api/blogs', blogsRouter)
//make the users router into use in our application to dealing with endpoint "api/users"
app.use('/api/users', usersRouter)
//make login router into use in our application to dealing with endpoint "api/login"
app.use('/api/login', loginRouter)

//Use testing router only if application is running in testing mode
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app

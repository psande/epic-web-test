// Libraries
const express = require('express')
const logger = require('morgan')

// Models
const AccountHandler = require('./AccountHandler')

const app = new express()

app.use(logger('dev'))

app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
})

AccountHandler(app)

module.exports = app

'use strict'
require('dotenv').config()

// Server configuration
const app = require('express')()
const router = require('../routes/')

// Logger configuration
const pino = require('pino')
const logger = require('pino-http')({
    logger: pino(pino.destination(process.env.LOGFILE)),
})

// App configuration
const port = process.env.PORT
app.use(logger)

// Main routes
app.use('/', router)

// Initialize server...
const server = app.listen(port, () =>
    console.log(`serving sqlite database as JSON on port: ${port}`))

module.exports = server

'use strict'

// Server configuration
const app = require('express')()
const router = require('../routes/')

// App configuration
const pino = require('pino')
const logger = require('pino-http')({
    logger: pino(pino.destination(process.env.LOGFILE)),
})

// Incorporate middleware
app.use(logger)
app.use('/', router)

module.exports = { app }

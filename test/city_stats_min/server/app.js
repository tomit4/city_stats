'use strict'
// Server Configuration
const app = require('express')()
const json = require('express').json
const cors = require('cors')
const bodyParser = require('body-parser')
const pino = require('pino')

const logger = require('pino-http')({
    // add defaults to change maximum file size
    logger: pino(pino.destination('logs/test.json')),
    quietReqLogger: true,
    transport: {
        target: 'pino-http-print',
        options: {
            destination: 1,
            all: true,
            translateTime: true
        }
    }
})

const router = require('../routes/')

// App configuration
const port = process.env.PORT || 5000
app.use(
    cors({
        origin: true,
        credentials: true,
    }),
)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(json())
app.use(logger)

// Main routes
app.use('/', router)

// Initialize Server...
const server = app.listen(port, () =>
    console.log(`serving sqlite database as JSON on port: ${port}`))

module.exports = server

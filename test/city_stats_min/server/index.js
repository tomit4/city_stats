const app = require('express')()
const json = require('express').json
const cors = require('cors')
const bodyParser = require('body-parser')
// const router = require('express').Router()
// const parser = require('../utils/parser.js')
// const path = require('path')
const { routes } = require('../routes/routes.js')

// Server configuration
const port = process.env.PORT || 5000
app.use(
    cors({
        origin: true,
        credentials: true,
    }),
)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(json())

// Router configuration
// router.use((req, res, next) => {
  // next()
// })
// app.use('/test', test.js)

// Main routes

// TODO: figure out proper error handling in case of 500 err... crashes when
// nonexistent route/column in table is queried...
app.get('/states/:query?/:field?/:index?', (req, res, next) => 
    routes.statesRouter(req, res, next)
)
// TODO: one more nested field for city_council case ?
app.get('/cities/:query?/:field?/:index?', (req, res, next) => 
    routes.citiesRouter(req, res, next)
)

// Starts Server...
app.listen(port, () => 
    console.log(`Serving sqlite database as JSON on port: ${port}`)
)

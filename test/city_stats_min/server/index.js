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
app.get('/states/:query?', (req, res, next) => 
    routes.statesRouter(req, res, next)
)
app.get('/cities/:query?', (req, res, next) => 
    routes.citiesRouter(req, res, next)
)

// Starts Server...
app.listen(port, () => 
    console.log(`Serving sqlite database as JSON on port: ${port}`)
)

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
app.get('/states/:query?/:field?/:index?', (req, res) => 
    routes.statesRouter(req, res)
)
app.get('/cities/:query?/:field?/:index?/:subindex?', (req, res) => 
    routes.citiesRouter(req, res)
)

// Starts Server...
app.listen(port, () => 
    console.log(`Serving sqlite database as JSON on port: ${port}`)
)

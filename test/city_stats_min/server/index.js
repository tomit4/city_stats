const app = require('express')()
const json = require('express').json
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('../db/sqlite.js')
const parser = require('../utils/parser.js')
const { routes } = require('../routes/routes.js')

// const path = require('path')
// const route = express.Router()

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

// Main routes
// TODO: Add specific routes based off of what data is desired
app.get('/states/:query?', (req, res) => {
    routes.statesRouter(req, res)
})

// TODO: Add specific routes based off of what data is desired
app.get('/cities', (req, res) => {
    routes.citiesRouter(req, res)
})

// Starts Server...
app.listen(port, () => {
    console.log(`Serving sqlite database as JSON on port: ${port}`)
})

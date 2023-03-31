// Server Configuration
const app = require('express')()
const json = require('express').json
const cors = require('cors')
const bodyParser = require('body-parser')
const { routes } = require('../routes/routes.js')
const { handle404Error } = require('../utils/utils.js')

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

// Main routes
// TODO: consider refactor based off of express router (see README.md)
app.get('/states/:query?/:field?/:index?', (req, res) =>
    routes.statesRouter(req, res))

app.get('/cities/:query?/:field?/:index?/:subindex?', (req, res) =>
    routes.citiesRouter(req, res))

app.get('*', (req, res) =>
    handle404Error(res))

// Initialize Server...
const server = app.listen(port, () =>
    console.log(`serving sqlite database as JSON on port: ${port}`))

module.exports = server

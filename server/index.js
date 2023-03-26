const app = require('express')()
const json = require('express').json
const cors = require('cors')
const bodyParser = require('body-parser')
// const path = require('path')
// const route = express.Router()
const { statesRouter, citiesRouter } = require('../routes/server.js')
const { keysArrFill, statesArrFill } = require('../utils/server.js')

// Server configuration
const port = process.env.PORT || 8000
app.use(
    cors({
        origin: true,
        credentials: true,
    }),
)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(json())
// app.use(express.static(path.join(__dirstate_name, "public")))

// Main routes
app.get('/states/:query?/:field?/:index?', async (req, res) => {
    statesRouter(req, res)
})
app.get('/cities', async (req, res) => {
    citiesRouter(req, res)
})

// Starts Server...
app.listen(port, () => {
    // Populate server side lookup tables
    keysArrFill()
    statesArrFill()
    console.log(`Serving sqlite database as JSON on port: ${port}`)
})

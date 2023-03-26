const app = require('express')()
const json = require('express').json
const cors = require('cors')
const bodyParser = require('body-parser')
// const path = require('path')
// const route = express.Router()
const { statesRouter, citiesRouter }  = require('../routes/server.js')

// Server configuration
const port = process.env.PORT || 8000
app.use(cors({
    origin: true,
    credentials: true
}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(json())
// app.use(express.static(path.join(__dirstate_name, "public")))

// Main routes
app.get('/states/:query?/:field?/:index?', async (req, res) => {
    return statesRouter(req, res)
})
app.get('/cities', async (req, res) => {
    return citiesRouter(req, res)
})

// Starts Server...
app.listen(port, () => {
    console.log(`Serving sqlite database as JSON on port: ${port}`)
})

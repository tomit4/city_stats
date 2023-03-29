const app = require('express')()
const json = require('express').json
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('../db/sqlite.js')
const parser = require('../utils/parser.js')
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
app.get('/states', async (req, res) => {
    await db.all('SELECT * FROM states;', [], function (err, rows) {
        parser.prettify(rows)
        return res.send(rows)
    })
})

// TODO: Add specific routes based off of what data is desired
app.get('/cities', async (req, res) => {
    await db.all('SELECT * FROM cities;', [], function (err, rows) {
        parser.prettify(rows)
        return res.send(rows)
    })
})

// Starts Server...
app.listen(port, () => {
    console.log(`Serving sqlite database as JSON on port: ${port}`)
})

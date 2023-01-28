const express = require('express')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./db/sqlite')

const app = express()

app.use(cors({
    origin: true,
    credentials: true
}))

app.use(bodyParser.urlencoded({ extended: false}))
// app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())

const route = express.Router()
const port = process.env.PORT || 8000

app.use('/v1', route)

route.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/data', async (req, res) => {
    await db.all('SELECT * FROM states;', [], function(err, rows) {
        return res.send(rows)
    })
})

app.listen(port, () => {
    console.log(`Serving sqlite database as JSON on port: ${port}`)
})

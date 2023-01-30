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


app.get('/states', async (req, res) => {
    await db.all(`SELECT * FROM states`, [], function(err, rows) {
        return res.send(rows)
    })
})

app.get('/senators', async (req, res) => {
    await db.all(`SELECT * FROM senators`, [], function(err, rows) {
        return res.send(rows)
    })
})

app.get('/senators/:state/:index?', async (req, res) => {
    const { state, index } = req.params;
    const indexInt = index ? parseInt(index) : null;
    await db.all(`SELECT senators FROM states WHERE name = ?`, [state], function(err, rows) {
        if (!index) {
            return res.send(rows)
        } else {
            const senators = JSON.parse(rows[0].senators)
            const senator = senators[indexInt - 1]
            return res.send({ [`senator_${indexInt}`]: senator })
        }
    })
})

app.listen(port, () => {
    console.log(`Serving sqlite database as JSON on port: ${port}`)
})

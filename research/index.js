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


app.get('/states/:state?/:senators?/:index?', async (req, res) => {
    const { state, senators, index } = req.params;
    if (!state) {
        await db.all(`SELECT * FROM states`, [], function(err, rows) {
            return res.send(rows)
        })
    } else {
        await db.all(`SELECT * FROM states WHERE name = ?`, [state], function(err, rows) {
            if (!senators) {
                return res.send(rows)
            } else if (senators !== "senators") {
                return res.send( { ["msg"]: "404: Path Not Found!"})
            } else {
                const senators = JSON.parse(rows[0].senators)
                if (!index) {
                    return res.send({[`${state}_senators`]: senators})
                } else {
                    const indexInt = index ? parseInt(index) : null
                    const senator = senators[index - 1]
                    return res.send({ [`${state}_senator_${indexInt}`]: senator })
                }
            }
        })
    }
})

app.get('/senators/:state?/:index?', async (req, res) => {
    const { state, index } = req.params;
    if (!state) {
        await db.all(`SELECT * FROM senators`, [], function(err, rows) {
            return res.send(rows)
        })
    } else {
        await db.all(`SELECT senators FROM states WHERE name = ?`, [state], function(err, rows) {
            if (!index) {
                return res.send(rows)
            } else {
                const indexInt = index ? parseInt(index) : null
                const senators = JSON.parse(rows[0].senators)
                const senator = senators[indexInt - 1]
                return res.send({ [`senator_${indexInt}`]: senator })
            }
        })
    }
})

app.listen(port, () => {
    console.log(`Serving sqlite database as JSON on port: ${port}`)
})

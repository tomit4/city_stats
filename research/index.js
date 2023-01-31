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

/***********************
* HELPER FUNCTIONS
***********************/
function handleError(res, err) {
    console.error(err)
    return res.send({ ['msg']: `500: ERROR: ${err}`})
}

async function returnAllStates(res) {
    await db.all(`SELECT * FROM states`, [], (err, rows) => {
        if (err)
            handleError(res, err)
        return res.send(rows)
    })
}

function returnSenators(res, state, rows, index, err) {
    if (err)
        handleError(res, err)
    const senators = JSON.parse(rows[0].senators)
    if (!index) {
        return res.send({[`${state}_senators`]: senators})
    } else {
        const indexInt = index ? parseInt(index) : null
        const senator = senators[index - 1]
        if (!senator)
            return res.send({ ['msg']: '404: data not found!'})
        return res.send({ [`${state}_senator_${indexInt}`]: senator })
    }
}

function returnDelegates(res, state, rows, index, err) {
    if (err)
        handleError(res, err)
    const delegates = JSON.parse(rows[0].house_delegates)
    if (!index) {
        return res.send({[`${state}_house_delegates`]: delegates })
    } else {
        const indexInt = index ? parseInt(index) : null
        const delegate = delegates[index - 1]
        if (!delegate) {
            return res.send({ ['msg']: '404: data not found!'})
        } else {
            return res.send({ [`${state}_delegate_${indexInt}`]: delegate })
        }
    }
}

async function returnCongressData(res, state, legislature, index) {
    await db.all(`SELECT * FROM states WHERE name = ?`, [state], (err, rows) => {
        if (err)
            handleError(res, err)
        if (!legislature) {
            return res.send(rows)
        } else if (legislature === "senators") {
            returnSenators(res, state, rows, index, err)
        } else if (legislature === "house_delegates"){
            returnDelegates(res, state, rows, index, err)
        } else {
            return res.send({ ['msg']: '404: data not found!'})
        }
    })
}

/***********************
* MAIN PATH ROUTINE
***********************/
app.get('/states/:state?/:legislature?/:index?', async (req, res) => {
    const { state, legislature, index } = req.params;
    if (!state) {
        returnAllStates(res)
    } else {
        returnCongressData(res, state, legislature, index)
    }
})

app.listen(port, () => {
    console.log(`Serving sqlite database as JSON on port: ${port}`)
})

// TODO: Look over this and see if you can refactor...
const express = require('express')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./db/sqlite')

// these are a bit repetetive, querying the database and pushing the values
// might be more efficient...
const statesArr = require('./states_array.js')
// const keysArr = require('./keys_array.js')
let keysArr = []

const app = express()

app.use(cors({
    origin: true,
    credentials: true
}))

app.use(bodyParser.urlencoded({ extended: false}))
// app.use(express.static(path.join(__dirstate_name, "public")))
app.use(express.json())

// const route = express.Router()
const port = process.env.PORT || 8000

/***********************
* HELPER FUNCTIONS
***********************/
function handle500Error(res, err) {
    console.error(err)
    return res.send({ ['msg']: `500: ERROR: ${err}`})
}

function handle404Error(res) {
    return res.send({ ['msg']: '404: data not found!'})
}

// Immediately populate states keys for easier parsing
const keysArrFill = async (res) => {
    await db.all(
        `SELECT * FROM states`,
        [], (err, rows) => {
            if (err) {
                return handle500Error(res, err)
            } else {
                keysArr = Object.keys(rows[0])
            }
        }
    )
}

/**********************
* STATES QUERIES
**********************/
async function returnAllStates(res) {
    await db.all(
        `SELECT * FROM states`,
        [], (err, rows) => {
        if (err) {
            return handle500Error(res, err)
        } else {
            return res.send(rows)
        }
    })
}

async function returnSingleStateInfo(res, state) {
    await db.all(
        `SELECT * FROM states WHERE state_name = ?`,
        [state], (err, rows) => {
        if (err) {
            return handle500Error(res, err)
        } else {
            return res.send(rows)
        }
    })
}

async function returnFieldData(res, query, field) {
    await db.all(
        `SELECT state_name, ${field} FROM states WHERE state_name = ?`,
        [query], (err, rows) => {
        if (err) {
            return handle500Error(res, err)
        } else {
            return res.send(rows)
        }
    })
}

async function returnCongressData(res, state, legislature, index) {
    await db.all(
        `Select state_name, ${legislature} FROM states WHERE state_name = ?`,
        [state], (err, rows) => {
            if (err) {
                return handle500Error(res, err)
            } else if (legislature) {
                returnLegislature(legislature, res, index, err, rows)
            }
        }
    )
}

function returnLegislature(legislature, res, index, err, rows) {
    if (err){
        return handle500Error(res, err)
    } else {
        const state_name = rows[0].state_name
        const indexInt = index ? parseInt(index) : null
        let legislators = legislature === 'senators' ?
            JSON.parse(rows[0].senators) :
            JSON.parse(rows[0].house_delegates)
        const legislator = legislators[index - 1]
        if (!legislator) {
            return handle404Error(res)
        } else {
            return res.send(
                {
                    ['state_name']: state_name,
                    [`${legislature}_${indexInt}`]: legislator
                }
            )
        }
    }
}

async function parseQuery(res, query, field, index) {
    if (!field && statesArr.includes(query)) {
        returnSingleStateInfo(res, query)
    } else if (!field && keysArr.includes(query)) {
        await db.all(
            `SELECT state_name, ${query} FROM states`,
            (err, rows) => {
            if (err)
                return handle500Error(res, err)
            return res.send(rows)
        })
    } else if (field && statesArr.includes(query)) {
        if (!index && keysArr.includes(field)) {
            returnFieldData(res, query, field)
        } else if (index && keysArr.includes(field)) {
            if (field === "senators" || field === "house_delegates") {
                returnCongressData(res, query, field, index)
            } else {
                return handle404Error(res)
            }
        }
    } else {
        return handle404Error(res)
    }
}

/**********************
* CITIES QUERIES
**********************/
async function returnAllCities(res) {
    await db.all(
        `SELECT * FROM cities`,
        [], (err, rows) => {
        if (err) {
            return handle500Error(res, err)
        } else {
            return res.send(rows)
        }
    })
}

/***********************
* MAIN PATH ROUTINES
***********************/
app.get('/states/:query?/:field?/:index?', async (req, res) => {
    keysArrFill(res)
    const { query, field , index } = req.params;
    if (!query) {
        returnAllStates(res)
    } else {
        parseQuery(res, query, field, index)
    }
})

// TODO: add parsing queries for cities table as well
app.get('/cities', async (req, res) => {
    returnAllCities(res)
})

app.listen(port, () => {
    console.log(`Serving sqlite database as JSON on port: ${port}`)
})

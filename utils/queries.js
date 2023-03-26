// TODO: parse out this queries.js file into states_queries.js and
// cities_queries.js files
const db = require('../db/sqlite')
const {
    keysArr,
    statesArr,
    handle500Error,
    handle404Error,
} = require('../utils/server.js')

const returnAllStates = async res => {
    await db.all(`SELECT * FROM states`, [], (err, rows) => {
        if (err) {
            return handle500Error(res, err)
        } else {
            return res.send(rows)
        }
    })
}
const returnSingleStateInfo = async (res, state) => {
    await db.all(
        `SELECT * FROM states WHERE state_name = ?`,
        [state],
        (err, rows) => {
            if (err) {
                return handle500Error(res, err)
            } else {
                return res.send(rows)
            }
        },
    )
}
const returnFieldData = async (res, query, field) => {
    await db.all(
        `SELECT state_name, ${field} FROM states WHERE state_name = ?`,
        [query],
        (err, rows) => {
            if (err) {
                return handle500Error(res, err)
            } else {
                return res.send(rows)
            }
        },
    )
}
const returnCongressData = async (res, state, legislature, index) => {
    await db.all(
        `SELECT state_name, ${legislature} FROM states WHERE state_name = ?`,
        [state],
        (err, rows) => {
            if (err) {
                return handle500Error(res, err)
            } else if (legislature) {
                returnLegislature(legislature, res, index, err, rows)
            }
        },
    )
}
const returnLegislature = async (legislature, res, index, err, rows) => {
    if (err) {
        return handle500Error(res, err)
    } else {
        const state_name = rows[0].state_name
        const indexInt = index ? parseInt(index) : null
        let legislators =
            legislature === 'senators'
                ? JSON.parse(rows[0].senators)
                : JSON.parse(rows[0].house_delegation)
        const legislator = legislators[index - 1]
        if (!legislator) {
            return handle404Error(res)
        } else {
            return res.send({
                ['state_name']: state_name,
                [`${legislature}_${indexInt}`]: legislator,
            })
        }
    }
}
const parseQuery = async (res, query, field, index) => {
    if (!field && statesArr.includes(query)) {
        returnSingleStateInfo(res, query)
    } else if (!field && keysArr.includes(query)) {
        await db.all(`SELECT state_name, ${query} FROM states`, (err, rows) => {
            if (err) return handle500Error(res, err)
            return res.send(rows)
        })
    } else if (field && statesArr.includes(query)) {
        if (!index && keysArr.includes(field)) {
            returnFieldData(res, query, field)
        } else if (index && keysArr.includes(field)) {
            if (field === 'senators' || field === 'house_delegation') {
                returnCongressData(res, query, field, index)
            } else {
                return handle404Error(res)
            }
        }
    } else {
        return handle404Error(res)
    }
}

const returnAllCities = async res => {
    await db.all(`SELECT * FROM cities`, [], (err, rows) => {
        if (err) {
            return handle500Error(res, err)
        } else {
            return res.send(rows)
        }
    })
}

module.exports = {
    returnAllStates,
    returnSingleStateInfo,
    returnFieldData,
    returnCongressData,
    returnLegislature,
    parseQuery,
    returnAllCities,
}

'use strict'
// Logic that returns data based off of user specific input (i.e. application endpoint)
const db = require('../db/sqlite.js')
const prettify = require('../utils/parser.js')
const { handle404Error, handle500Error } = require('../utils/utils.js')

const returnAll = (table, res, req, query) => {
    if (table === 'favicon.ico') return // weird edge case
    const instance = table === 'states' ? 'state' : 'city'
    const selection = !query ? '*' : `${instance}_name, ${query}`
    try {
        db.all(`SELECT ${selection} FROM ${table}`, (err, rows) => {
            if (!rows) return handle404Error(res, req, err)
            prettify(rows)
            return res.send(rows)
        })
    } catch (err) {
        return handle500Error(res, req, err)
    }
}

const returnSingleInstanceOf = (table, res, req, query, field, index, subindex, nestedObj) => {
    const instance = table === 'states' ? 'state' : 'city'
    const selection = !field ? '*' : `${instance}_name, ${field}`
    const whereStmt = !isNaN(query) ? `WHERE primary_key` : `WHERE ${instance}_name`
    if (!isNaN(field)) return handle404Error(res, req)
    try {
        db.all(
            `SELECT ${selection} FROM ${table} ${whereStmt} = ?`,
            [query],
            (err, rows) => {
                if (!rows || !rows.length) return handle404Error(res, req, err)
                if (nestedObj.includes(field) && index)
                    rows = mutateRows(field, index, subindex, instance, rows)
                // Mutation requires another check
                if (!rows) return handle404Error(res, req, err)
                prettify(rows)
                return res.send(rows)
            },
        )
    } catch (err) {
        return handle500Error(res, req, err)
    }
}

// Embarrassing hacky workaround to get nested routes working properly
const mutateRows = (field, index, subindex, instance, rows) => {
    const nestedVal = JSON.parse(rows[0][field])
    // console.log(`nestedVal >>: ${nestedVal}`)
    const deeplyNestedVal = !isNaN(index) ? nestedVal[index - 1] : nestedVal[index]
    // console.log(`deeplyNestedVal >>: ${deeplyNestedVal}`)
    // console.log(`typeof deeplyNestedVal >>: ${typeof deeplyNestedVal}`)
    // console.log(`is deeplyNestedVal Array? >>: ${Array.isArray(deeplyNestedVal)}`)
    if (!deeplyNestedVal) return undefined
    const mutRows = {}
    mutRows[`${instance}_name`] = rows[0][`${instance}_name`]
    if (!isNaN(index))
        mutRows[`${field}_${index}`] = deeplyNestedVal
    else if (deeplyNestedVal){
        if (deeplyNestedVal && typeof deeplyNestedVal !== 'object') {
            if (!subindex) {
                mutRows[`${field}`] = {}
                mutRows[`${field}`][`${index}`] = deeplyNestedVal
            } else return undefined
        }
        else {
            const parsedVal = JSON.parse(deeplyNestedVal)
            if (!subindex)
                mutRows[`${field}`] = parsedVal
            else if (!isNaN(subindex)) {
                if (parsedVal[subindex - 1]) {
                    mutRows[`${field}`] = {}
                    mutRows[`${field}`][`${index}_${subindex}`] = parsedVal[subindex - 1]
                }
                else return undefined
            }
        }
    }
    else return undefined
    return mutRows
}

module.exports = {
    returnAll,
    returnSingleInstanceOf,
}

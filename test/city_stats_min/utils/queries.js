const db = require('../db/sqlite.js')
const parser = require('../utils/parser.js')
const { handle404Error, handle500Error } = require('../utils/utils.js')

const returnAll = (table, res) => {
    db.all(`SELECT * FROM ${table}`, (err, rows) => {
        if (err) return handle500Error(res, err)
        if (!rows) return handle404Error(res)
        parser.prettify(rows)
        return res.send(rows)
    })
}

const returnAllSpecs = (table, res, query) => {
    const instance = table === 'states' ? 'state' : 'city'
    db.all(`SELECT ${instance}_name, ${query} FROM ${table}`, (err, rows) => {
        if (err) return handle500Error(res, err)
        if (!rows) return handle404Error(res)
        parser.prettify(rows)
        return res.send(rows)
    })
}

const returnSingleInstanceOf = (table, res, query, field, index, subindex, nestedObj) => {
    const instance = table === 'states' ? 'state' : 'city'
    const selection = !field ? '*' : `${instance}_name, ${field}`
    const whereStmt = !isNaN(query) ? `WHERE primary_key` : `WHERE ${instance}_name`
    db.all(
        `SELECT ${selection} FROM ${table} ${whereStmt} = ?`,
        [query],
        (err, rows) => {
            const rowLength = Object.keys(rows).length
            if (nestedObj.includes(field) && index) {
                rows = mutateRows(field, index, subindex, instance, rows)
                rows = rowLength > 1 ? rows : undefined
            }
            if (err) return handle500Error(res, err)
            if (!rows || rowLength === 0) 
                return handle404Error(res)
            parser.prettify(rows)
            return res.send(rows)
        },
    )
}

const mutateRows = (field, index, subindex, instance, rows) => {
    const nestedVal = JSON.parse(rows[0][field])
    const deeplyNestedVal = !isNaN(index) ? nestedVal[index -1] : nestedVal[index]
    const mutRows = {}
    mutRows[`${instance}_name`] = rows[0][`${instance}_name`]
    if (!isNaN(index) && deeplyNestedVal) {
        mutRows[`${field}_${index}`] = deeplyNestedVal
        return mutRows
    } else if (deeplyNestedVal) {
        if (typeof deeplyNestedVal !== 'object') {
            mutRows[`${field}`] = {}
            mutRows[`${field}`][`${index}`] = deeplyNestedVal
            return mutRows
        } else {
            const parsedVal = JSON.parse(deeplyNestedVal)
            if (!subindex) {
                mutRows[`${field}`] = parsedVal
            } else if (!isNaN(subindex)){
                if (parsedVal[subindex - 1]) {
                    mutRows[`${field}`] = {}
                    mutRows[`${field}`][`${index}_${subindex}`] = parsedVal[subindex - 1]
                } else {
                    return
                }
            }
            return mutRows
        }
    }
}

module.exports = {
    returnAll,
    returnAllSpecs,
    returnSingleInstanceOf,
}

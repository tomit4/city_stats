'use strict'
// Recursively goes over any stringified JSON and parses it
const prettify = (rows) => {
    const parse = (rows) => {
        Object.keys(rows).forEach(row => {
            if (rows[row] == 'null') { rows[row] = null }
            if (typeof rows[row] === 'object' && rows[row]) {
                parse(rows[row])
            } else if (typeof rows[row] === 'string') {
                if (rows[row].includes('{') || rows[row].includes('[')) {
                    try {
                        rows[row] = JSON.parse(rows[row])
                        parse(rows[row])
                    }
                    catch (err) {console.warn(`parsing error >>: ${err}`) }
                }
            }
        })
    }
    parse(rows)
    return rows
}

module.exports = prettify

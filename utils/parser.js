'use strict'
// Recursively goes over any stringified JSON and parses it
const prettify = (rows) => {
    const deflate = (rows) => {
        Object.keys(rows).forEach(row => {
            if (rows[row] == 'null') { rows[row] = null }
            if (typeof rows[row] === 'object' && rows[row]) {
                deflate(rows[row])
            } else if (typeof rows[row] === 'string') {
                if (rows[row].includes('{') || rows[row].includes('[')) {
                    try {
                        rows[row] = JSON.parse(rows[row])
                        if (typeof rows[row] === 'object'
                            && rows[row])
                            deflate(rows[row])
                    }
                    catch (err) {console.warn(`parsing error >>: ${err}`) }
                }
            }
        })
    }
    deflate(rows)
    return rows
}

module.exports = prettify

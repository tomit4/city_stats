'use strict'
// Prettifies Nested Values
// TODO: Refactor so not so much nested for loops...
function prettify(rows) {
    for (const key in rows) {
        if (rows[key] === 'null') rows[key] = null
        if (typeof rows[key] === 'object') {
            for (const k in rows[key]) {
                if (rows[key][k] === 'null') rows[key][k] = null
                if (typeof rows[key][k] === 'string') {
                    if (rows[key][k].includes('{') || rows[key][k].includes('[')) {
                        rows[key][k] = JSON.parse(rows[key][k])
                        // embarrassing hacky workaround to avoid city_council
                        // being an array of arrays
                        if (key === 'city_council')
                            rows[key] = rows[key][k]
                        Object.keys(rows[key][k]).forEach(() => prettify(rows[key][k]))
                    }
                }
            }
        }
    }
    return rows
}

module.exports = prettify

'use strict'
// Prettifies Nested Values
function prettify(rows) {
    for (const key in rows)
        if (typeof rows[key] === 'object')
            for (const k in rows[key])
                if (typeof rows[key][k] === 'string')
                    if (rows[key][k].includes('{')) {
                        rows[key][k] = JSON.parse(rows[key][k])
                        Object.keys(rows[key][k]).forEach(() =>
                            prettify(rows[key][k]))
                    } else if (rows[key][k].includes('['))
                        rows[key][k] = JSON.parse(rows[key][k])
}

module.exports = { prettify }

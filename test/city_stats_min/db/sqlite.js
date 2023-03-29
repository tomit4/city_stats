const sqlite3 = require('sqlite3').verbose()
const sdb = require('./states.json')
const cdb = require('./cities.json')
const { createStmts, insertStmts } = require('../utils/sql.js')

const db = new sqlite3.Database(
    './db/metro_stats.db',
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    err => {
        if (err) return console.error(err.message)
        console.log('Connected to the in-memory SQlite states Database.')
    },
)

db.serialize(() => {
    createStmts.forEach(stmt => db.run(stmt))
    insertStmts.populateStates(sdb, db)
    insertStmts.populateCities(cdb, db)
})

module.exports = db

// comment out when running with express
// db.close((err) => {
// if (err) return console.error(err.message)
// console.log('Closing the statesDatabase connection...')
// });

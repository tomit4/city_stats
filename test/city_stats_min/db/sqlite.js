'use strict'
// Database configuration and initialization
const sqlite3 = require('sqlite3').verbose()
const sdb = require('./states.js')
const cdb = require('./cities.json')
const { createStmts, insertStmts } = require('../utils/sql.js')

const db = new sqlite3.Database(
    './db/metro_stats.db',
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    err => {
        if (err) return console.error(err.message)
        console.log('connected to in-memory sqlite database.')
    },
)

// Populate the database
db.serialize(() => {
    createStmts.forEach(stmt => db.run(stmt))
    insertStmts.populateStates(sdb, db)
    insertStmts.populateCities(cdb, db)
})

module.exports = db

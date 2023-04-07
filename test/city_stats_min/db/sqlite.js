'use strict'
// Database configuration and initialization
const sqlite3 = require('sqlite3').verbose()
const sdb = require('./states.json')
const cdb = require('./cities.json')
const { createStmts, insertStmts, alterStmts } = require('../utils/sql.js')

const db = new sqlite3.Database(
    './db/metro_stats.db',
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    err => {
        if (err) return console.error(err.message)
        console.log('connected to in-memory sqlite database.')
    },
)

db.serialize(() => {
    createStmts.forEach(stmt => db.run(stmt))
    insertStmts.populateStates(sdb, db)
    insertStmts.populateCities(cdb, db)
    // TODO: rewrite these to more reflect insertStmts syntax
    db.run(alterStmts.alter('states', 'major_cities'))
    // TODO: Due to synchronicity problems revealed by ava,
    // We'll have to refactor this by using javascript to parse through the
    // states.jsona nd cities.json files first before sending it to a more
    // simplified sql update statement
    sdb.forEach(sd =>
        alterStmts.update(db, 'city_name', 'cities', 'state_name',
                        'states', 'major_cities', sd.state_name)
    )
})

module.exports = db

const sqlite3 = require('sqlite3').verbose()
const data = require('../states.json')
const { createTables, populateStates, populateCongress } = require('./utils.js')

const db = new sqlite3.Database(
    './states.db',
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    err => {
        if (err) return console.error(err.message)
        console.log('Connected to the in-memory SQlite database.')
    },
)

db.serialize(() => {
    createTables(db)
    populateStates(db, data)
    populateCongress(db, data, 'senators')
    populateCongress(db, data, 'house_delegation')
})

module.exports = db

// comment out when running with express
// db.close((err) => {
// if (err) return console.error(err.message)
// console.log('Closing the database connection...')
// });

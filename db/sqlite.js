const sqlite3 = require('sqlite3').verbose()
const statesData = require('./states.json')
const statesDataTest = require('./states_test.json')
const citiesData = require('./cities.json')
const { createTables, populateStates, populateStatesTest, populateCities } = require('./seed.js')

const db = new sqlite3.Database(
    './db/states.db',
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    err => {
        if (err) return console.error(err.message)
        console.log('Connected to the in-memory SQlite states Database.')
    },
)

db.serialize(() => {
    createTables(db)
    populateStates(db, statesData)
    populateStatesTest(db, statesDataTest)
    // populateStatesTest(db, statesData)
    populateCities(db, citiesData)
})

module.exports = db

// comment out when running with express
// db.close((err) => {
// if (err) return console.error(err.message)
// console.log('Closing the statesDatabase connection...')
// });

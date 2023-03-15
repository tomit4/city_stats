const sqlite3 = require('sqlite3').verbose()
const statesData = require('../states.json')
const citiesData = require('../cities.json')
const {
    createTables,
    populateStates,
    populateCongress,
    populateCities,
    populateCityCouncils,
} = require('./seed.js')

const db = new sqlite3.Database(
    './states.db',
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    err => {
        if (err) return console.error(err.message)
        console.log('Connected to the in-memory SQlite statesDatabase.')
    },
)

db.serialize(() => {
    createTables(db)
    populateStates(db, statesData)
    populateCongress(db, statesData, 'senators')
    populateCongress(db, statesData, 'house_delegation')
    populateCities(db, citiesData)
    populateCityCouncils(db, citiesData)
})

module.exports = db

// comment out when running with express
// db.close((err) => {
// if (err) return console.error(err.message)
// console.log('Closing the statesDatabase connection...')
// });

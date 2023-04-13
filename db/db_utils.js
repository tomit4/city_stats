'use strict'
// Utilities that mutate json data for easy use in other parts of application
const sdb = require('./states.json')
const cdb = require('./cities.json')

const returnMajorCities = (sdb, cdb) => {
    const majorCities = []
    sdb.forEach(sd => {
        const singleStateWithCities = {}
        singleStateWithCities.state_name = sd.state_name
        singleStateWithCities.major_cities = []
        cdb.forEach(cd => {
            if (cd.state_name === sd.state_name) {
                singleStateWithCities.major_cities.push(cd.city_name)
            }
        })
        majorCities.push(singleStateWithCities)
    })
    return majorCities
}

const majorCities = returnMajorCities(sdb, cdb)

sdb.forEach(sd => {
    majorCities.forEach(city => {
        if (sd.state_name === city.state_name) {
            sd.major_cities = city.major_cities
        }
    })
})

const stateNames = sdb.map(sd => sd.state_name)
const cityNames = cdb.map(cd => cd.city_name)
const stateKeys = Object.keys(sdb[0])
const cityKeys = Object.keys(cdb[0])
const stateObjs = stateKeys.filter(s => typeof sdb[0][s] === 'object')
const cityObjs = cityKeys.filter(c => typeof cdb[0][c] === 'object')

module.exports = {
    sdb,
    cdb,
    stateNames,
    cityNames,
    stateKeys,
    cityKeys,
    stateObjs,
    cityObjs,
}

'use strict'
const sdb = require('./states.json')
const cdb = require('./cities.json')

// Hacky workaround to address asynchronicity issues with previously used update statement
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

module.exports = sdb

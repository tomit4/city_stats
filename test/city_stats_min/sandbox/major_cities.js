'use strict'
// To be removed along with sandbox folder later, quick fix for refactor

const sdb = require('../db/states.json')
const cdb = require('../db/cities.json')

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

console.log('majorCities >>', majorCities)

const db = require('../db/sqlite')
const statesData = require('../db/states.json')
const citiesData = require('../db/cities.json')
// TODO: Put all this into an object, it shouldn't have a 'this' issue...
// TODO: consider putting these arrays into an object
const keysArr = []
let cityKeysArr = []
const statesArr = []
const citiesArr = []

const handle500Error = (res, err) => {
    console.error(err)
    return res.send({ ['msg']: `500: ERROR: ${err}` })
}

const handle404Error = res => {
    return res.send({ ['msg']: '404: data not found!' })
}

// TODO: Refactor the following, is too repetitive...
const keysArrFill = () => {
    Object.keys(statesData[0]).forEach(k => {
        keysArr.push(k)
    })
}

const citiesKeysArrFill = () => {
    Object.keys(citiesData[0]).forEach(k => {
        cityKeysArr.push(k)
    })
    // TODO: temporary measure until we figure out json objects in sqlite
    cityKeysArr.forEach((k, i) => {
        if (k === 'government') {
            cityKeysArr.splice(i, 1, 'government_type')
            cityKeysArr.splice(i + 1, 0, 'government_mayor')
        } else if (k === 'area') {
            cityKeysArr.splice(i, 1, 'area_city')
            cityKeysArr.splice(i + 1, 0, 'area_land')
            cityKeysArr.splice(i + 2, 0, 'area_water')
            
        } else if (k === 'population') {
            cityKeysArr.splice(i, 1, 'population_city')
            cityKeysArr.splice(i + 1, 0, 'population_density')
            cityKeysArr.splice(i + 2, 0, 'population_metro')
        }
    })
    cityKeysArr = cityKeysArr.map(k => k.toLowerCase())
}

const statesArrFill = () => {
    statesData.forEach(state => {
        statesArr.push(state.state_name)
    })
}

const citiesArrFill = () => {
    citiesData.forEach(city => {
        citiesArr.push(city.city_name)
    })
}

const populateLocalData = () => {
    keysArrFill()
    citiesKeysArrFill()
    statesArrFill()
    citiesArrFill()
    console.log(cityKeysArr)
}

module.exports = {
    keysArr,
    cityKeysArr,
    statesArr,
    citiesArr,
    handle500Error,
    handle404Error,
    populateLocalData,
}

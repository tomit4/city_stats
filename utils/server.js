const db = require('../db/sqlite')
const statesData = require('../db/states.json')
const citiesData = require('../db/cities.json')
const keysArr = []
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
    statesArrFill()
    citiesArrFill()
}

module.exports = {
    keysArr,
    statesArr,
    citiesArr,
    handle500Error,
    handle404Error,
    populateLocalData,
}

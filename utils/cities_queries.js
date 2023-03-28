const db = require('../db/sqlite')
const {
    citiesArr,
    handle500Error,
    handle404Error,
    cityKeysArr,
} = require('../utils/server.js')
// TODO: refactor needed, utils.js doesn't push this???
cityKeysArr.push('city_council')
const returnAllCities = async res => {
    await db.all(`SELECT * FROM cities`, [], (err, rows) => {
        if (err) return handle500Error(res, err)
        return res.send(rows)
    })
}

const _returnSingleCityInfo = async (res, city) => {
    await db.all(
        `SELECT * FROM cities WHERE city_name = ?`,
        [city],
        (err, rows) => {
            if (err) {
                return handle500Error(res, err)
            } else {
                return res.send(rows)
            }
        },
    )
}

const returnCityFieldData = async (res, query, field) => {
    await db.all(
        `SELECT city_name, ${field} FROM cities WHERE city_name = ?`,
        [query],
        (err, rows) => {
            if (err) {
                return handle500Error(res, err)
            } else {
                return res.send(rows)
            }
        }
    )
}


// TODO: Refactor for more advanced queries
// const parseCityQuery = async (res, query, field, index) => {
const parseCityQuery = async (res, query, field) => {
    if (!field && citiesArr.includes(query)) {
        _returnSingleCityInfo(res, query)
    } else if (!field && cityKeysArr.includes(query)){
        await db.all(`SELECT city_name, ${query} FROM cities`, (err, rows) => {
            if (err) return handle500Error(res, err)
            return res.send(rows)
        })
    } else if (field && citiesArr.includes(query)) {
        // console.log("in cities_queries.js: cityKeysArr >>", cityKeysArr)
        if (cityKeysArr.includes(field)) {
            returnCityFieldData(res, query, field)
        }
    } else {
        return handle404Error(res)
    }
}

module.exports = {
    parseCityQuery,
    returnAllCities,
}

const db = require('../db/sqlite')
const {
    citiesArr,
    handle500Error,
    handle404Error,
} = require('../utils/server.js')

const returnAllCities = async res => {
    await db.all(`SELECT * FROM cities`, [], (err, rows) => {
        if (err) {
            return handle500Error(res, err)
        } else {
            return res.send(rows)
        }
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

// TODO: Refactor for more advanced queries
// const parseCityQuery = async (res, query, field, index) => {
const parseCityQuery = async (res, query) => {
    if (citiesArr.includes(query)) {
        _returnSingleCityInfo(res, query)
    } else {
        return handle404Error(res)
    }
}

module.exports = {
    parseCityQuery,
    returnAllCities,
}

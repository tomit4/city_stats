const db = require('../db/sqlite.js')
const sdb = require('../db/states.json')
const cdb = require('../db/cities.json')
const { handleHeadersSentErr } = require('../utils/utils.js')
const parser = require('../utils/parser.js')
const routes = {
    stateNames: sdb.map(sd => sd.state_name),
    citiesNames: cdb.map(cd => cd.city_name),
    statesRouter: function (req, res, next) {
        const { query } = req.params
        switch (true) {
            case !query:
                returnAll('states', res, next)
                break
            case this.stateNames.includes(query):
                returnSingleInstanceOf('states', 'state', res, next, query)
                break
            default:
                res.send({ msg: `${query} not found...` })
        }
    },
    citiesRouter: function (req, res, next) {
        const { query } = req.params
        switch (true) {
            case !query:
                returnAll('cities', res, next)
                break
            case this.citiesNames.includes(query):
                returnSingleInstanceOf('cities', 'city', res, next, query)
                break
            default:
                res.send({ msg: 'no query fields yet' })
        }
    },
}

const returnAll = (entity, res, next) => {
    db.all(`SELECT * FROM ${entity}`, [], (err, rows) => {
        handleHeadersSentErr(res, err, next)
        parser.prettify(rows)
        return res.send(rows)
    })
}

const returnSingleInstanceOf = (table, instance, res, next, query) => {
    db.all(
        `SELECT * FROM ${table} WHERE ${instance}_name = ?`,
        [query],
        (err, rows) => {
            handleHeadersSentErr(res, err, next)
            parser.prettify(rows)
            return res.send(rows)
        },
    )
}

module.exports = { routes }

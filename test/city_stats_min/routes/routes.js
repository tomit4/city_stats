const db = require('../db/sqlite.js')
const sdb = require('../db/states.json')
const cdb = require('../db/cities.json')
const { handleHeadersSentErr } = require('../utils/utils.js')
const parser = require('../utils/parser.js')

const routes = {
    stateNames: sdb.map(sd => sd.state_name),
    stateKeys: Object.keys(sdb[0]),
    citiesNames: cdb.map(cd => cd.city_name),
    cityKeys: Object.keys(cdb[0]),
    statesRouter: function (req, res, next) {
        const { query } = req.params
        switch (true) {
            case !query:
                console.log(this.stateKeys)
                returnAll('states', res, next)
                break
            case this.stateNames.includes(query):
                returnSingleInstanceOf('states', res, next, query)
                break
            case this.stateKeys.includes(query):
                returnAllSpecs('states', res, next, query)
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
                returnSingleInstanceOf('cities', res, next, query)
                break
            case this.cityKeys.includes(query):
                returnAllSpecs('cities', res, next, query)
                break
            default:
                res.send({ msg: 'no query fields yet' })
        }
    },
}

// TODO: Export these functions out to another file, possibly put in object?
const returnAll = (table, res, next) => {
    db.all(`SELECT * FROM ${table}`, (err, rows) => {
        handleHeadersSentErr(res, err, next)
        parser.prettify(rows)
        return res.send(rows)
    })
}

const returnSingleInstanceOf = (table, res, next, query) => {
    const instance = table === 'states' ? 'state' : 'city'
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

const returnAllSpecs = (table, res, next, query) => {
    const instance = table === 'states' ? 'state' : 'city'
    db.all(
        `SELECT ${instance}_name, ${query} FROM ${table}`, (err, rows) => {
            handleHeadersSentErr(res, err, next)
            parser.prettify(rows)
            return res.send(rows)
        }
    )

}

module.exports = { routes }

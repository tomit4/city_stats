const db = require('../db/sqlite.js')
const sdb = require('../db/states.json')
const cdb = require('../db/cities.json')
const { handle404Error } = require('../utils/utils.js')
const { returnAll, returnSingleInstanceOf, returnAllSpecs } = require('../utils/queries.js')

// Routes returned data based off of user query
const routes = {
    // Data needed to be sent down the routes
    stateNames: sdb.map(sd => sd.state_name),
    cityNames: cdb.map(cd => cd.city_name),
    stateKeys: Object.keys(sdb[0]),
    cityKeys: Object.keys(cdb[0]),
    stateObjs: Object.keys(sdb[0]).filter(s => typeof sdb[0][s] === 'object'),
    cityObjs: Object.keys(cdb[0]).filter(c => typeof cdb[0][c] === 'object'),
    // Data prepared for routing
    statesRouter: function (req, res) {
        const table = 'states'
        const nestedObjs = this.stateObjs
        const names = this.stateNames
        const keys = this.stateKeys
        const { query, field, index } = req.params
        this.route(res, table, nestedObjs, names, keys, query, field, index)
    },
    citiesRouter: function (req, res) {
        const table = 'cities'
        const nestedObjs = this.cityObjs
        const names = this.cityNames
        const keys = this.cityKeys
        const { query, field, index, subindex } = req.params
        this.route(res, table, nestedObjs, names, keys, query, field, index, subindex)
    },
    // Main Router Logic (see last require stmt...)
    route: function(res, table, nestedObjs, names, keys, query, field, index, subindex) {
        switch (true) {
            case !query:
                returnAll(table, res)
                break
            case !isNaN(query):
            case names.includes(query):
                returnSingleInstanceOf(table, res, query, field, index, subindex, nestedObjs)
                break
            case keys.includes(query):
                returnAllSpecs(table, res, query)
                break
            default:
                handle404Error(res)
        }
    },
}

module.exports = { routes }

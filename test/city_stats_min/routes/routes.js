'use strict'
// Routing logic that interfaces with both db and server
const {
    stateNames,
    cityNames,
    stateKeys,
    cityKeys,
    stateObjs,
    cityObjs,
} = require('../db/db_utils.js')
const { handle404Error } = require('../utils/utils.js')
const { returnAll, returnSingleInstanceOf } = require('../utils/queries.js')

// Routes returned data based off of user query
const routes = {
    // Data needed to be sent down the routes
    stateNames: stateNames,
    cityNames: cityNames,
    stateKeys: stateKeys,
    cityKeys: cityKeys,
    stateObjs: stateObjs,
    cityObjs: cityObjs,
    // Data prepared for routing
    mainRouter: function (req, res) {
        const { table, query, field, index, subindex } = req.params
        const nestedObjs = table === 'states' ? this.stateObjs : this.cityObjs
        const names = table === 'states' ? this.stateNames : this.cityNames
        const keys = table === 'states' ? this.stateKeys : this.cityKeys
        this.route(
            req,
            res,
            table,
            nestedObjs,
            names,
            keys,
            query,
            field,
            index,
            subindex,
        )
    },
    // Main router logic
    route: function (
        req,
        res,
        table,
        nestedObjs,
        names,
        keys,
        query,
        field,
        index,
        subindex,
    ) {
        switch (true) {
            case !query:
            case keys.includes(query):
                returnAll(table, res, req, query)
                break
            case !isNaN(query):
            case names.includes(query):
                returnSingleInstanceOf(
                    table,
                    res,
                    req,
                    query,
                    field,
                    index,
                    subindex,
                    nestedObjs,
                )
                break
            default:
                handle404Error(res, req)
        }
    },
}

module.exports = { routes }

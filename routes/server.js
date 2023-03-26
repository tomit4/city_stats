const { keysArrFill } = require('../utils/server.js')
const { returnAllStates, returnAllCities, parseQuery } = require('../utils/queries.js')

const routes = {
    async statesRouter(req, res) {
        keysArrFill(res)
        const { query, field , index } = req.params;
        if (!query) {
            returnAllStates(res)
        } else {
            parseQuery(res, query, field, index)
        }
    },
    async citiesRouter(req, res) {
        returnAllCities(res)
    }
}

module.exports = { ...routes }

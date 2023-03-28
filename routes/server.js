const { returnAllStates, returnAllCities, parseQuery, parseCityQuery } = require('../utils/queries.js')

const routes = {
    async statesRouter(req, res) {
        const { query, field , index } = req.params;
        if (!query) {
            returnAllStates(res)
        } else {
            parseQuery(res, query, field, index)
        }
    },
    async citiesRouter(req, res) {
        // TODO: Refactor for more advanced queries
        // const { query, field , index } = req.params;
        const { query, field } = req.params;
        if (!query) {
            returnAllCities(res)
        } else {
            parseCityQuery(res, query, field)
        }
    }
}

module.exports = { ...routes }

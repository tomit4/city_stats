const {
    returnAllStates,
    returnCongressData,
    returnLegislature,
    parseQuery,
} = require('./states_queries.js')

const {
    parseCityQuery,
    returnAllCities,
} = require('./cities_queries.js')

module.exports = {
    returnAllStates,
    returnCongressData,
    returnLegislature,
    parseQuery,
    parseCityQuery,
    returnAllCities,
}

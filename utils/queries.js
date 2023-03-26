const {
    returnAllStates,
    returnSingleStateInfo,
    returnFieldData,
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
    returnSingleStateInfo,
    returnFieldData,
    returnCongressData,
    returnLegislature,
    parseQuery,
    parseCityQuery,
    returnAllCities,
}

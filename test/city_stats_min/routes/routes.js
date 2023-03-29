const db = require('../db/sqlite.js')
const { handle500Error } = require('../utils/utils.js')

const routes = {
    statesRouter: function(req, res) {
        const { query } = req.params
        switch (true) {
            case !query:
                returnAll(res, 'states')
                break
            default:
                res.send({msg: 'no query fields yet'})
        }
    },
    citiesRouter: function(req, res) {
        const { query } = req.params
        switch (true) {
            case !query:
                returnAll(res, 'cities')
                break
            default:
                res.send({msg: 'no query fields yet'})
        }
    },

}

const returnAll = (res, entity) => {
    db.all(`SELECT * FROM ${entity}`, [], (err, rows) => {
        if (err) return handle500Error(res, err)
        return res.send(rows)
    })
}

module.exports = { routes }

const db = require('../db/sqlite')
const helpers = {
    keysArr: [],
    handle500Error(res, err) {
        console.error(err)
        return res.send({ ['msg']: `500: ERROR: ${err}`})
    },
    handle404Error(res) {
        return res.send({ ['msg']: '404: data not found!'})
    },
    async keysArrFill(res) {
    await db.all(
        `SELECT * FROM states`,
        [], (err, rows) => {
            if (err) {
                return this.handle500Error(res, err)
            } else {
                this.keysArr = Object.keys(rows[0])
            }
        }
    )}
}
module.exports = { ...helpers }

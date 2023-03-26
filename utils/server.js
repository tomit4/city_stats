const db = require('../db/sqlite')
const json = require('../db/states.json')
const keysArr = []
const statesArr = []

const handle500Error = (res, err) => {
    console.error(err)
    return res.send({ ['msg']: `500: ERROR: ${err}`})
}

const handle404Error = (res) => {
    return res.send({ ['msg']: '404: data not found!'})
}

const keysArrFill = () => {
    Object.keys(json[0]).forEach(k => {
        keysArr.push(k)
    })
}

const statesArrFill = () => {
    json.forEach(js => {
        statesArr.push(js.state_name)
    })
}

module.exports = {
    keysArr,
    statesArr,
    handle500Error,
    handle404Error,
    keysArrFill,
    statesArrFill,
}

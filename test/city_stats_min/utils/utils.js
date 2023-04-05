'use strict'
// Error handling functions
const handle500Error = (res, req, err) => {
    console.error(err)
    res.status(err.status || 500)
    req.log.error(err)
    return res.render('error', {
        ['msg']: err.message,
        // error: err
        error: {}
    })
}

const handle404Error = res => {
    return res.status(404).
        send({ ['msg']: '404: data not found!' })
}

module.exports = {
    handle500Error,
    handle404Error,
}

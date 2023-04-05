'use strict'
// Error handling functions
const handle500Error = (res, req, err) => {
    if (err) {
        console.error(err)
        res.status(err.status || 500)
        req.log.error(err)
        return res.render('error', {
            ['msg']: err.message,
            // error: err
            error: {}
        })
    } 
    else {
        return res.status(500).
            send({ ['msg']: '500: server failed to retrieve data!' })
    }
}

const handle404Error = (res, req, err) => {
    if (err) {
        console.error(err)
        res.status(err.status || 404)
        req.log.error(err)
        return res.send({ ['msg']: '404: data not found!' })
    } 
    else {
        return res.status(404).
            send({ ['msg']: '404: data not found!' })
    }
}

module.exports = {
    handle500Error,
    handle404Error,
}

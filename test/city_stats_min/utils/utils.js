// Error handling functions
const handle500Error = (res, err) => {
    console.error(err)
    res.status(err.status || 500)
    return res.render('error', {
        ['msg']: err.message,
        error: err
        // default to empty obj in production
        // error: {}
    })
}

const handle404Error = res => {
    res.status(404)
    return res.send({ ['msg']: '404: data not found!' })
}

module.exports = {
    handle500Error,
    handle404Error,
}

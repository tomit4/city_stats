const handle500Error = (res, err) => {
    console.error(err)
    res.status(err.status || 500)
    return res.render('error', {
        ['msg']: err.message,
        // default to empty obj in production
        error: err
    })
}

const handle404Error = res => {
    return res.send({ ['msg']: '404: data not found!' })
}

module.exports = {
    handle500Error,
    handle404Error,
}

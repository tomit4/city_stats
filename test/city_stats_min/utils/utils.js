// Helper functions for less typing
const jsify = (data) => { return JSON.stringify(data) }
const jsprs = (data) => { return JSON.parse(data) }

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
    return res.send({ ['msg']: '404: data not found!' })
}

module.exports = {
    jsify,
    jsprs,
    handle500Error,
    handle404Error,
}

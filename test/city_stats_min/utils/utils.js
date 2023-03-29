const handle500Error = (res, err) => {
    console.error(err)
    return res.send({ ['msg']: `500: ERROR: ${err}` })
}

const handle404Error = res => {
    return res.send({ ['msg']: '404: data not found!' })
}

module.exports = {
    handle500Error,
    handle404Error,
}

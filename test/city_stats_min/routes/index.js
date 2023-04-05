'use strict'
const router = require('express').Router()
const { routes } = require('../routes/routes.js')
const { handle404Error } = require('../utils/utils.js')

router.get('/:table?/:query?/:field?/:index?/:subindex?', (req, res) => {
    routes.mainRouter(req, res)
})

router.get('*', (req, res) => handle404Error(res, req))

module.exports = router

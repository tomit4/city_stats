'use strict'
const request = require('supertest')
const app = require('../server/app')

const testRoutes = (test, numIndexes = 0, entity, db) => {
    const indexes = [...Array(numIndexes).keys()]
    indexes.forEach(index => {
        test.serial(`:=> testing ${entity} route: ${index + 1}`, async t => {
            let mock = {}
            const res = await request(app)
                .get(`/${entity}/${index + 1}`)
                .send()
            db.forEach((data, i) => {
                if (index == i) {
                    mock = data
                    mock.primary_key = index + 1
                }
            })
            t.plan(3)
            t.true(res.ok)
            t.is(res.status, 200)
            t.deepEqual(res.body, [mock])
        })
    })
}

module.exports = testRoutes

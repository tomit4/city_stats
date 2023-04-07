const test = require('ava')
const request = require('supertest')
const { app } = require('../server/app.js')

test('testing 404 return object', async t => {
    // t.plan tells ava how many calls to t you want to do in sequence
    t.plan(1)
    // make a request with supertest
    let res = await request(app).get("/").send()
    t.like(res.body, {
        ['msg'] : '404: data not found!'
    })
    // TODO: reassign res based off of the tests you wish to make
})

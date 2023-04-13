'use strict'
const test = require('ava')
const request = require('supertest')
const app = require('../server/app')

test(':=> testing 404 return object', async t => {
    const res = await request(app).get('/').send()
    t.plan(3)
    t.false(res.ok)
    t.is(res.status, 404)
    t.like(res.body, {
        ['msg']: '404: data not found!',
    })
})

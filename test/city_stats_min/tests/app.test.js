'use strict'
const test = require('ava')
const request = require('supertest')
const { app } = require('../server/app.js')
const { sdb, cdb } = require('../db/db_utils')

const testAll = async (test) => {
    console.log('testing express routes...')
    testAllStateRoutes(test)
    testAllCityRoutes(test)
    test('testing states route with spec field', async t => {
        const res = await request(app).get('/states/1/state_abbreviation').send()
        const mock = [
            {
                state_name: 'Alabama',
                state_abbreviation: 'AL',
            },
        ]
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })
    test('testing 404 return object', async t => {
        const res = await request(app).get('/').send()
        t.plan(3)
        t.false(res.ok)
        t.is(res.status, 404)
        t.like(res.body, {
            ['msg']: '404: data not found!',
        })
    })
}

const testAllStateRoutes = (test) => {
    const indexes = [...Array(50).keys()]
    indexes.forEach(index => {
        test(`testing states route >> ${index}`, async t => {
            let mock = {}
            const res = await request(app).get(`/states/${index + 1}`).send()
            sdb.forEach((sd, i) => {
                if (index == i) {
                    mock = sd
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

// currently all fails due to some issue with parsing city_council
const testAllCityRoutes = (test) => {
    const indexes = [...Array(330).keys()] // ... 0 through 329
    indexes.forEach(index => {
        test(`testing cities route >> ${index}`, async t => {
            let mock = {}
            const res = await request(app).get(`/cities/${index + 1}`).send()
            cdb.forEach((cd, i) => {
                if (index == i) {
                    mock = cd
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

testAll(test)

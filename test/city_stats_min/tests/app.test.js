'use strict'
const test = require('ava')
const request = require('supertest')
const { app } = require('../server/app.js')
const { sdb, cdb } = require('../db/db_utils')

const testAll = async (test) => {
    console.log('testing express routes...')
    // Compares all output from each individual state/city 
    // against original json data
    testRoutes(test, 50, 'states', sdb)
    testRoutes(test, 330, 'cities', cdb)

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

const testRoutes = (test, numIndexes = 0, entity, db) => {
    const indexes = [...Array(numIndexes).keys()]
    indexes.forEach(index => {
        test(`testing ${entity} route >>: ${index + 1}`, async t => {
            let mock = {}
            const res = await request(app).get(`/${entity}/${index + 1}`).send()
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

testAll(test)

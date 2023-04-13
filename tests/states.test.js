'use strict'
const test = require('ava')
const request = require('supertest')
const app = require('../server/app')
const { sdb } = require('../db/db_utils')
const testRoutes = require('../utils/test_utils.js')

const testAllStates = async test => {
    console.log('testing states routes :=>')
    // Compares all output from each individual state/city against original json data
    testRoutes(test, 50, 'states', sdb)

    test(':=> testing states route /Alabama', async t => {
        const res = await request(app).get('/states/Alabama').send()
        const mock = [
            {
                primary_key: 1,
                state_name: 'Alabama',
                state_abbreviation: 'AL',
                date_admitted: '1819-12-14T00:00:00.000Z',
                capital: 'Montgomery',
                largest_city: 'Huntsville',
                govenor: 'Kay Ivey',
                senators: ['Tommy Tuberville', 'Katie Britt'],
                house_delegation: [
                    'Jerry Carl',
                    'Barry Moore',
                    'Mike Rogers',
                    'Robert Aderholt',
                    'Dale Strong',
                    'Gary Palmer',
                    'Terri Sewell',
                ],
                area: {
                    total: '52419 sq mi',
                    land: '50744 sq mi',
                    water: '1675 sq mi',
                },
                elevation: '500 ft',
                population: {
                    total: '5039877',
                    density: '99.1/sq mi',
                    median_household_income: '$52000',
                },
                time_zone: 'UTC-6(CST)',
                latitude: "30°11' N to 35° N",
                longitude: "84°53' W to 88°28' W",
                url: 'https://www.alabama.gov/',
                flag_url:
                    'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Alabama.svg',
                insignia_url:
                    'https://upload.wikimedia.org/wikipedia/commons/f/f7/Seal_of_Alabama.svg',
                major_cities: [
                    'Birmingham',
                    'Huntsville',
                    'Mobile',
                    'Montgomery',
                    'Tuscaloosa',
                ],
            },
        ]
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })

    test(':=> testing states route /state_name', async t => {
        const res = await request(app).get('/states/1/state_name').send()
        const mock = [
            {
                state_name: 'Alabama',
            },
        ]
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })

    test(':=> testing states route /state_abbreviation', async t => {
        const res = await request(app)
            .get('/states/1/state_abbreviation')
            .send()
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

    test(':=> testing states route /date_admitted', async t => {
        const res = await request(app).get('/states/1/date_admitted').send()
        const mock = [
            {
                state_name: 'Alabama',
                date_admitted: '1819-12-14T00:00:00.000Z',
            },
        ]
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })

    test(':=> testing states route /capital', async t => {
        const res = await request(app).get('/states/1/capital').send()
        const mock = [
            {
                state_name: 'Alabama',
                capital: 'Montgomery',
            },
        ]
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })

    test(':=> testing states route /largest_city', async t => {
        const res = await request(app).get('/states/1/largest_city').send()
        const mock = [
            {
                state_name: 'Alabama',
                largest_city: 'Huntsville',
            },
        ]
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })

    test(':=> testing states route /govenor', async t => {
        const res = await request(app).get('/states/1/govenor').send()
        const mock = [
            {
                state_name: 'Alabama',
                govenor: 'Kay Ivey',
            },
        ]
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })

    test(':=> testing states route /senators', async t => {
        const res = await request(app).get('/states/1/senators').send()
        const mock = [
            {
                state_name: 'Alabama',
                senators: ['Tommy Tuberville', 'Katie Britt'],
            },
        ]
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })

    test(':=> testing states route /senators/1', async t => {
        const res = await request(app).get('/states/1/senators/1').send()
        const mock = {
            state_name: 'Alabama',
            senators_1: 'Tommy Tuberville',
        }
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })

    test(':=> testing states route /house_delegation', async t => {
        const res = await request(app).get('/states/1/house_delegation').send()
        const mock = [
            {
                state_name: 'Alabama',
                house_delegation: [
                    'Jerry Carl',
                    'Barry Moore',
                    'Mike Rogers',
                    'Robert Aderholt',
                    'Dale Strong',
                    'Gary Palmer',
                    'Terri Sewell',
                ],
            },
        ]
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })

    test(':=> testing states route /house_delegation/1', async t => {
        const res = await request(app)
            .get('/states/1/house_delegation/1')
            .send()
        const mock = {
            state_name: 'Alabama',
            house_delegation_1: 'Jerry Carl',
        }

        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })

    test(':=> testing states route /area', async t => {
        const res = await request(app).get('/states/1/area').send()
        const mock = [
            {
                state_name: 'Alabama',
                area: {
                    total: '52419 sq mi',
                    land: '50744 sq mi',
                    water: '1675 sq mi',
                },
            },
        ]
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })

    test(':=> testing states route /area/total', async t => {
        const res = await request(app).get('/states/1/area/total').send()
        const mock = {
            state_name: 'Alabama',
            area: {
                total: '52419 sq mi',
            },
        }
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })

    test(':=> testing states route /elevation', async t => {
        const res = await request(app).get('/states/1/elevation').send()
        const mock = [
            {
                state_name: 'Alabama',
                elevation: '500 ft',
            },
        ]
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })

    test(':=> testing states route /population', async t => {
        const res = await request(app).get('/states/1/population').send()
        const mock = [
            {
                state_name: 'Alabama',
                population: {
                    total: '5039877',
                    density: '99.1/sq mi',
                    median_household_income: '$52000',
                },
            },
        ]
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })

    test(':=> testing states route /population/total', async t => {
        const res = await request(app).get('/states/1/population/total').send()
        const mock = {
            state_name: 'Alabama',
            population: {
                total: '5039877',
            },
        }
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })

    test(':=> testing states route /time_zone', async t => {
        const res = await request(app).get('/states/1/time_zone').send()
        const mock = [
            {
                state_name: 'Alabama',
                time_zone: 'UTC-6(CST)',
            },
        ]
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })

    test(':=> testing states route /latitude', async t => {
        const res = await request(app).get('/states/1/latitude').send()
        const mock = [
            {
                state_name: 'Alabama',
                latitude: "30°11' N to 35° N",
            },
        ]
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })

    test(':=> testing states route /longitude', async t => {
        const res = await request(app).get('/states/1/longitude').send()
        const mock = [
            {
                state_name: 'Alabama',
                longitude: "84°53' W to 88°28' W",
            },
        ]
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })

    test(':=> testing states route /url', async t => {
        const res = await request(app).get('/states/1/url').send()
        const mock = [
            {
                state_name: 'Alabama',
                url: 'https://www.alabama.gov/',
            },
        ]
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })

    test(':=> testing states route /flag_url', async t => {
        const res = await request(app).get('/states/1/flag_url').send()
        const mock = [
            {
                state_name: 'Alabama',
                flag_url:
                    'https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_Alabama.svg',
            },
        ]
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })

    test(':=> testing states route /insignia_url', async t => {
        const res = await request(app).get('/states/1/insignia_url').send()
        const mock = [
            {
                state_name: 'Alabama',
                insignia_url:
                    'https://upload.wikimedia.org/wikipedia/commons/f/f7/Seal_of_Alabama.svg',
            },
        ]
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })

    test(':=> testing states route /major_cities', async t => {
        const res = await request(app).get('/states/1/major_cities').send()
        const mock = [
            {
                state_name: 'Alabama',
                major_cities: [
                    'Birmingham',
                    'Huntsville',
                    'Mobile',
                    'Montgomery',
                    'Tuscaloosa',
                ],
            },
        ]
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })

    test(':=> testing states route /major_cities/1', async t => {
        const res = await request(app).get('/states/1/major_cities/1').send()
        const mock = {
            state_name: 'Alabama',
            major_cities_1: 'Birmingham',
        }
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })
}

testAllStates(test)

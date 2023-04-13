'use strict'
const test = require('ava')
const request = require('supertest')
const app = require('../server/app')
const { cdb } = require('../db/db_utils')
const testRoutes = require('../utils/test_utils.js')

const testAllCities = async test => {
    console.log('testing cities routes :=>')
    // Compares all output from each individual state/city against original json data
    testRoutes(test, 330, 'cities', cdb)

    test(':=> testing cities route /Abilene', async t => {
        const res = await request(app).get('/cities/Abilene').send()
        const mock = [
            {
                primary_key: 1,
                city_name: 'Abilene',
                state_name: 'Texas',
                coordinates: '32°27′N 99°45′W',
                counties: ['Taylor', 'Jones'],
                settled_founded: '1881',
                incorporated: '1881',
                government: {
                    type: 'Council-Manager',
                    mayor: 'Anthony Williams',
                    city_council: [
                        'Shane Price',
                        'Jack Rentz',
                        'Donna Albus',
                        'Weldon W. Hurt',
                        'Kyle McAlister',
                        'Travis Craver',
                    ],
                },
                area: {
                    city: '112.09 sq mi',
                    land: '21.40 sq mi',
                    water: '0.53 sq mi',
                },
                elevation: '1719 ft',
                population: {
                    city: '125182',
                    density: '1157/sq mi',
                    metro: '170219',
                },
                time_zone: 'UTC-6 (CST)',
                zip_codes: ['79601-08', '79697-99'],
                area_codes: [325],
                fips_code: '48-01000',
                gnis_feature_ids: ['1329173'],
                url: 'https://www.abilenetx.gov/',
            },
        ]
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })

    test(':=> testing cities route /city_name', async t => {
        const res = await request(app).get('/cities/1/city_name').send()
        const mock = [
            {
                city_name: 'Abilene',
            },
        ]
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })

    test(':=> testing cities route /state_name', async t => {
        const res = await request(app).get('/cities/1/state_name').send()
        const mock = [
            {
                city_name: 'Abilene',
                state_name: 'Texas',
            },
        ]
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })

    test(':=> testing cities route /coordinates', async t => {
        const res = await request(app).get('/cities/1/coordinates').send()
        const mock = [
            {
                city_name: 'Abilene',
                coordinates: '32°27′N 99°45′W',
            },
        ]
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })

    test(':=> testing cities route /counties', async t => {
        const res = await request(app).get('/cities/1/counties').send()
        const mock = [
            {
                city_name: 'Abilene',
                counties: ['Taylor', 'Jones'],
            },
        ]
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })

    test(':=> testing cities route /counties/1', async t => {
        const res = await request(app).get('/cities/1/counties/1').send()
        const mock = {
            city_name: 'Abilene',
            counties_1: 'Taylor',
        }
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })

    test(':=> testing cities route /settled_founded', async t => {
        const res = await request(app).get('/cities/1/settled_founded').send()
        const mock = [
            {
                city_name: 'Abilene',
                settled_founded: '1881',
            },
        ]
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })

    test(':=> testing cities route /incorporated', async t => {
        const res = await request(app).get('/cities/1/incorporated').send()
        const mock = [
            {
                city_name: 'Abilene',
                incorporated: '1881',
            },
        ]
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })

    test(':=> testing cities route /government', async t => {
        const res = await request(app).get('/cities/1/government').send()
        const mock = [
            {
                city_name: 'Abilene',
                government: {
                    type: 'Council-Manager',
                    mayor: 'Anthony Williams',
                    city_council: [
                        'Shane Price',
                        'Jack Rentz',
                        'Donna Albus',
                        'Weldon W. Hurt',
                        'Kyle McAlister',
                        'Travis Craver',
                    ],
                },
            },
        ]
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })

    test(':=> testing cities route /government/type', async t => {
        const res = await request(app).get('/cities/1/government/type').send()
        const mock = {
            city_name: 'Abilene',
            government: {
                type: 'Council-Manager',
            },
        }
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })

    test(':=> testing cities route /government/city_council', async t => {
        const res = await request(app)
            .get('/cities/1/government/city_council')
            .send()
        const mock = {
            city_name: 'Abilene',
            government: [
                'Shane Price',
                'Jack Rentz',
                'Donna Albus',
                'Weldon W. Hurt',
                'Kyle McAlister',
                'Travis Craver',
            ],
        }
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })

    test(':=> testing cities route /government/city_council/1', async t => {
        const res = await request(app)
            .get('/cities/1/government/city_council/1')
            .send()
        const mock = {
            city_name: 'Abilene',
            government: {
                city_council_1: 'Shane Price',
            },
        }
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })

    test(':=> testing cities route /area', async t => {
        const res = await request(app).get('/cities/1/area').send()
        const mock = [
            {
                city_name: 'Abilene',
                area: {
                    city: '112.09 sq mi',
                    land: '21.40 sq mi',
                    water: '0.53 sq mi',
                },
            },
        ]
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })

    test(':=> testing cities route /area/city', async t => {
        const res = await request(app).get('/cities/1/area/city').send()
        const mock = {
            city_name: 'Abilene',
            area: {
                city: '112.09 sq mi',
            },
        }
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })

    test(':=> testing cities route /elevation', async t => {
        const res = await request(app).get('/cities/1/elevation').send()
        const mock = [
            {
                city_name: 'Abilene',
                elevation: '1719 ft',
            },
        ]
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })

    test(':=> testing cities route /population', async t => {
        const res = await request(app).get('/cities/1/population').send()
        const mock = [
            {
                city_name: 'Abilene',
                population: {
                    city: '125182',
                    density: '1157/sq mi',
                    metro: '170219',
                },
            },
        ]
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })

    test(':=> testing cities route /population/city', async t => {
        const res = await request(app).get('/cities/1/population/city').send()
        const mock = {
            city_name: 'Abilene',
            population: {
                city: '125182',
            },
        }
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })

    test(':=> testing cities route /time_zone', async t => {
        const res = await request(app).get('/cities/1/time_zone').send()
        const mock = [
            {
                city_name: 'Abilene',
                time_zone: 'UTC-6 (CST)',
            },
        ]
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })

    test(':=> testing cities route /zip_codes', async t => {
        const res = await request(app).get('/cities/1/zip_codes').send()
        const mock = [
            {
                city_name: 'Abilene',
                zip_codes: ['79601-08', '79697-99'],
            },
        ]
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })

    test(':=> testing cities route /zip_codes/1', async t => {
        const res = await request(app).get('/cities/1/zip_codes/1').send()
        const mock = {
            city_name: 'Abilene',
            zip_codes_1: '79601-08',
        }
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })

    test(':=> testing cities route /area_codes', async t => {
        const res = await request(app).get('/cities/1/area_codes').send()
        const mock = [
            {
                city_name: 'Abilene',
                area_codes: [325],
            },
        ]
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })

    test(':=> testing cities route /area_codes/1', async t => {
        const res = await request(app).get('/cities/1/area_codes/1').send()
        const mock = {
            city_name: 'Abilene',
            area_codes_1: 325,
        }
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })

    test(':=> testing cities route /fips_code', async t => {
        const res = await request(app).get('/cities/1/fips_code').send()
        const mock = [
            {
                city_name: 'Abilene',
                fips_code: '48-01000',
            },
        ]
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })

    test(':=> testing cities route /gnis_feature_ids', async t => {
        const res = await request(app).get('/cities/1/gnis_feature_ids').send()
        const mock = [
            {
                city_name: 'Abilene',
                gnis_feature_ids: ['1329173'],
            },
        ]
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })

    test(':=> testing cities route /gnis_feature_ids/1', async t => {
        const res = await request(app)
            .get('/cities/1/gnis_feature_ids/1')
            .send()
        const mock = {
            city_name: 'Abilene',
            gnis_feature_ids_1: '1329173',
        }
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })

    test(':=> testing cities route /url', async t => {
        const res = await request(app).get('/cities/1/url').send()
        const mock = [
            {
                city_name: 'Abilene',
                url: 'https://www.abilenetx.gov/',
            },
        ]
        t.plan(3)
        t.true(res.ok)
        t.is(res.status, 200)
        t.deepEqual(res.body, mock)
    })
}

testAllCities(test)

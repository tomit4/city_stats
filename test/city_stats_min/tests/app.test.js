'use strict'
const test = require('ava')
const request = require('supertest')
const { app } = require('../server/app.js')

console.log('testing express routes...')
test('testing states route', async t => {
    const res = await request(app).get('/states/1').send()
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
            longitutde: "84°53' W to 88°28' W",
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

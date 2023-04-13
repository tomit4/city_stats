'use strict'
// Simple test to see if prettify parses JSON properly
const test = require('ava')
const prettify = require('../utils/parser')
// Mock data, json as string and parsed
const mock = {
    input: [
        {
            "senators": "[\"Tommy Tuberville\",\"Katie Britt\"]",
            "house_delegation": "[\"Jerry Carl\",\"Barry Moore\"]",
            "area": "{\"total\":\"52419 sq mi\",\"land\":\"50744 sq mi\",\"water\":\"1675 sq mi\"}",
        },
    ],
    output: [
        {
            senators: ['Tommy Tuberville', 'Katie Britt'],
            house_delegation: ['Jerry Carl', 'Barry Moore'],
            area: {
                total: '52419 sq mi',
                land: '50744 sq mi',
                water: '1675 sq mi',
            },
        },
    ],
}

// Ava tests
test(':=> parser prettifies state object', async t => {
    t.deepEqual(prettify(mock.input), mock.output)
})

test(':=> state object without prettify does not pass', async t =>
    t.notDeepEqual(mock.input == mock.output))

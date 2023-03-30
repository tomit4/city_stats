// Prettifies Nested Values
const { jsprs } = require('../utils/utils.js')

const parser = {
    toBeParsed: [
        'senators',
        'house_delegation',
        'area',
        'population',
        'government',
        'counties',
        'zip_codes',
        'area_codes',
        'fips_code',
        'gnis_feature_ids',
    ],
    toRemoveBackSlash: ['government', 'area', 'population'],
    prettify: function (rows) {
        for (const key in rows) {
            const value = rows[key]
            for (const k in value) {
                let v = value[k]
                if (this.toBeParsed.includes(k))
                    value[k] = jsprs(value[k])
                if (this.toRemoveBackSlash.includes(k)) {
                    v = jsprs(v)
                    for (const innerKey in v) {
                        let finVal = value[k][innerKey]
                        finVal =
                            typeof finVal === 'string'
                                ? finVal.replace(/\"/g, '')
                                : jsprs(finVal)
                        value[k][innerKey] = finVal
                    }
                }
            }
        }
    },
}

module.exports = parser

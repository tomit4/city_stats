const parser = {
    toBeParsed: [
        'senators',
        'house_delegation',
        'area',
        'population',
        'government',
        'counties',
        'zip_codes',
        'fips_code',
        'gnis_feature_ids',
    ],
    toRemoveBackSlash: ['government', 'area', 'population'],
    prettify: function (rows) {
        for (const key in rows) {
            const value = rows[key]
            for (const k in value) {
                let v = value[k]
                if (this.toBeParsed.includes(k)) {
                    value[k] = JSON.parse(value[k])
                }
                if (this.toRemoveBackSlash.includes(k)) {
                    v = JSON.parse(v)
                    for (const innerKey in v) {
                        let finVal = value[k][innerKey]
                        finVal =
                            typeof finVal === 'string'
                                ? finVal.replace(/\"/g, '')
                                : JSON.parse(finVal)
                        value[k][innerKey] = finVal
                    }
                }
            }
        }
    },
}

module.exports = parser

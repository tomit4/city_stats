const { createTableStmts, insertStmts, alter, update } = require('./migrate.js')

const createTables = db => 
    createTableStmts.forEach(statement => db.run(statement))

const populateStates = (db, data) => {
    const branches = ['senators', 'house_delegation']
    const valuesToInsert = []
    const insertStates = insertStmts.generateInsert(
        'states',
        insertStmts.state_props,
    )
    Object.keys(data[0]).forEach(key => {
        // TODO: nested objects need to be refactored in how we structure data
        if (key == 'area' || key == 'population') {
            Object.keys(data[0][key]).forEach(k => {
                valuesToInsert.push(`${key}.${k}`)
            })
        } else if (branches.includes(key)) {
        } else {
            valuesToInsert.push(key)
        }
    })
    data.forEach(item => {
        const sqlStmt = db.prepare(insertStates)
        const itemToInsert = _parseValues(valuesToInsert, item)
        // itemToInsert is Array of Arrays
        // console.log(itemToInsert)
        sqlStmt.run(itemToInsert)
        sqlStmt.finalize()
    })
    branches.forEach(branch => {
        _populateCongress(db, data, branch)
    })
}

// HEAVY REFACTOR
const populateStatesTest = (db, data) => {
    const nestedArrs = ['senators', 'house_delegation']
    const nestedObjs = ['area', 'population']
    let valuesToInsert = []
    const insertStates = insertStmts.generateInsert(
        'states_test',
        insertStmts.state_props_test,
    )

    insertStmts.state_props_test.forEach(key => {
        data.forEach(d => {
            if (nestedArrs.includes(key)) {
                d[key] = `json_array('${JSON.stringify(d[key])}')`
            }
            if (nestedObjs.includes(key)) {
                let finalSqlIns = 'json_object('
                Object.keys(d[key]).forEach((k, i) => {
                    // hard coded since all objects have 3 key/value pairs
                    if (i !== 2) {
                        finalSqlIns = `${finalSqlIns}'${k}', '${d[key][k]}', `
                    } else
                        finalSqlIns = `${finalSqlIns}'${k}', '${d[key][k]}')`
                })
                d[key] = finalSqlIns
                valuesToInsert.push(d)
            }
            // console.log('d[key]', d[key])
            // valuesToInsert.push(d)
        })
    }) 
    valuesToInsert = [...new Set(valuesToInsert)]
    const finalArr = []
    valuesToInsert.forEach(val => {
        let interArr = []
        Object.values(val).forEach(v => {
            interArr.push(v)
        })
        finalArr.push(interArr)
    })
    // RETURNS 2
    // console.log('finalArr length >>', finalArr.length)
    data.forEach(() => {
        const sqlStmt = db.prepare(insertStates)
        // RETURNS DUPLICATES OF EACH ITEM IN ARRAY
        finalArr.forEach(arr => {
            sqlStmt.run(arr)
        })
        // RETURNS 1st ENTRY DOUBLE
        // sqlStmt.run(...finalArr)
        // RETURNS EMPTY TABLE
        // sqlStmt.run(finalArr)
        sqlStmt.finalize()
    })
    // valuesToInsert is Array of Objects...
    // console.log('valuesToInsert>>', valuesToInsert)
    // console.log('finalArr>>', ...finalArr)
}

const _parseValues = (valuesToInsert, item) => {
    const itemToInsert = []
    valuesToInsert.forEach(value => {
        if (value === 'area.total') {
            itemToInsert.push(`${item.area.total}`)
        } else if (value === 'area.land') {
            itemToInsert.push(`${item.area.land}`)
        } else if (value === 'area.water') {
            itemToInsert.push(`${item.area.water}`)
        } else if (value === 'population.total') {
            itemToInsert.push(`${item.population.total}`)
        } else if (value === 'population.density') {
            itemToInsert.push(`${item.population.density}`)
        } else if (value === 'population.median_household_income') {
            itemToInsert.push(`${item.population.median_household_income}`)
        } else if (!item[value]) {
        } else {
            itemToInsert.push(item[value])
        }
    })
    return itemToInsert
}

const _populateCongress = (db, data, house) => {
    const key = house === 'senators' ? 'senator_list' : 'house_delegates'
    const updateArgs = [
        'states',
        house,
        key,
        house,
        ['state_state_name', 'states.state_name'],
    ]
    data.forEach(item => {
        const representatives =
            house === 'senators'
                ? `${JSON.stringify(item.senators)}`
                : `${JSON.stringify(item.house_delegation)}`
        const populateArgs = [
            house,
            key,
            representatives,
            item.state_name,
            true,
        ]
        db.run(insertStmts.populate(...populateArgs))
    })
    db.run(alter('states', house))
    db.each(update(...updateArgs), err => {
        if (err) console.error(err.message)
    })
}

const populateCities = (db, data) => {
    const insertCities = insertStmts.generateInsert(
        'cities',
        insertStmts.city_props,
    )
    data.forEach(item => {
        const sqlStmt = db.prepare(insertCities)
        // TODO: nested objects need to be refactored in how we structure data
        // const items = Object.values(item)
        // const keys = Object.keys(item)
        // sqlStmt.run(items)

        // temp measure until all is ready
        sqlStmt.run(
            `${item.city_name}`,
            `${item.state_name}`,
            `${item.coordinates}`,
            `${item.settled_founded}`,
            `${item.incorporated}`,
            `${item.government.type}`,
            `${item.government.mayor}`,
            `${item.area.city}`,
            `${item.area.land}`,
            `${item.area.water}`,
            `${item.elevation}`,
            `${item.population.city}`,
            `${item.population.density}`,
            `${item.population.metro}`,
            `${item.time_zone}`,
            `${item.fips_code}`,
            `${item.url}`,
        )
    })
    _populateCityCouncils(db, data)
}

const _populateCityCouncils = (db, data) => {
    const updateArgs = [
        'cities',
        'city_council',
        'city_council',
        'city_council',
        ['city_city_name', 'cities.city_name'],
    ]
    data.forEach(item => {
        const stringifiedCouncil = JSON.stringify(item.government.city_council)
        const populateArgs = [
            'city_council',
            'city_council',
            stringifiedCouncil,
            item.city_name,
            false,
        ]
        db.run(insertStmts.populate(...populateArgs))
    })
    db.run(alter('cities', 'city_council'))
    db.each(update(...updateArgs), err => {
        if (err) console.log(err.message)
    })
}

module.exports = {
    createTables,
    populateStates,
    populateStatesTest,
    populateCities,
}

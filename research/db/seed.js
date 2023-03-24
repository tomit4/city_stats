const { createTableStmts, insertStmts, alter, update } = require('./migrate.js')

// TODO: separate out create funcs and populate funcs
const createTables = db => {
    createTableStmts.forEach(statement => {
        db.run(statement)
    })
}

const populateStates = (db, data) => {
    const insertStates = insertStmts.generateGenericInsert(
        'states',
        insertStmts.state_props,
    )
    const valuesToInsert = []
    Object.keys(data[0]).forEach(key => {
        if (key == 'area' || key == 'population') {
            Object.keys(data[0][key]).forEach(k => {
                valuesToInsert.push(`${key}.${k}`)
            })
        } else if (key == 'senators' || key == 'house_delegation') {
        } else {
            valuesToInsert.push(key)
        }
    })
    data.forEach(item => {
        const sqlStmt = db.prepare(insertStates)
        const itemToInsert = parseValues(valuesToInsert, item)
        sqlStmt.run(itemToInsert)
        sqlStmt.finalize()
    })
}

const parseValues = (valuesToInsert, item) => {
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

const populateCongress = (db, data, house) => {
    let key = house === 'senators' ? 'senator_list' : 'house_delegates'
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
    const insertCities = insertStmts.generateGenericInsert(
        'cities',
        insertStmts.city_props,
    )
    data.forEach(item => {
        const sqlStmt = db.prepare(insertCities)
        const items = Object.values(item)
        sqlStmt.run(items)
    })
}

const populateCityCouncils = (db, data) => {
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
            ['city_council', 'city_city_name'],
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
    populateCongress,
    populateCities,
    populateCityCouncils,
}

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
        sqlStmt.run(itemToInsert)
        sqlStmt.finalize()
    })
    branches.forEach(branch => {
        _populateCongress(db, data, branch)
    })
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
        // once all is done, delete below and use this
        // const items = Object.values(item)
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
    // TODO: obviously this naming scheme is broken...
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
    populateCities,
}

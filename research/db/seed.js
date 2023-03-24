const { createTableStmts, insertStmts, alter, update } = require('./migrate.js')

// TODO: separate out create funcs and populate funcs
const createTables = db => {
    createTableStmts.forEach(statement => {
        db.run(statement)
    })
}

const populateStates = (db, data) => {
    let valuesToInsert = []
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
        const sqlStmt = db.prepare(insertStmts.states)
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
        let representatives =
            house === 'senators'
                ? `${JSON.stringify(item.senators)}`
                : `${JSON.stringify(item.house_delegation)}`
        db.run(
            insertStmts.populateCongress(
                house,
                key,
                representatives,
                item.state_name,
            ),
        )
    })
    db.run(alter('states', house))
    db.each(update(...updateArgs), err => {
        if (err) console.error(err.message)
    })
}

const populateCities = (db, data) => {
    data.forEach(item => {
        const sqlStmt = db.prepare(insertStmts.cities)
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
            `${item.FIPS_code}`,
            `${item.url}`,
        )
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
        db.run(
            insertStmts.populateCityCouncils(
                'city_council',
                ['city_council', 'city_city_name'],
                [stringifiedCouncil],
                item.city_name,
            ),
        )
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

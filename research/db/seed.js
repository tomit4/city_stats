const { createTableStmts, insertStmts } = require('./migrate.js')

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
        const sqlStmt = db.prepare(insertStmts[0])
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
        sqlStmt.run(itemToInsert)
        sqlStmt.finalize()
    })
}

const populateCongress = (db, data, house) => {
    let key = house === 'senators' ? 'senator_list' : 'house_delegates'
    data.forEach(item => {
        let representatives =
            house === 'senators'
                ? `${JSON.stringify(item.senators)}`
                : `${JSON.stringify(item.house_delegation)}`
        db.run(
            `INSERT OR IGNORE INTO ${house} (
            ${key},
            state_state_name)
            VALUES(
            json('${representatives}'),
            '${item.state_name}')`,
        )
    })
    db.run(`ALTER TABLE states ADD COLUMN ${house} TEXT;`)
    db.each(
        `UPDATE states
        SET ${house} = (SELECT ${key} FROM ${house} WHERE state_state_name = states.state_name)`,
        err => {
            if (err) console.error(err.message)
        },
    )
}

const populateCities = (db, data) => {
    data.forEach((item) => {
        const sqlStmt = db.prepare(insertStmts[1])
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
            `${item.url}`
        )
    })
}

const populateCityCouncils = (db, data) => {
    data.forEach((item) => {
        db.run(
            `INSERT OR IGNORE INTO city_council (
            city_council, city_city_name)
            VALUES(
                json('${JSON.stringify(item.government.city_council)}'),
                '${item.city_name}'
            )
            `
        )
    })
    db.run(`ALTER TABLE cities ADD COLUMN city_council TEXT;`)
    db.each(
        `UPDATE cities
        SET city_council = (SELECT city_council FROM city_council WHERE city_city_name = cities.city_name)`,
        err => {
            if (err) console.log(err.message)
        }

    )
}

module.exports = { createTables, populateStates, populateCongress, populateCities, populateCityCouncils }

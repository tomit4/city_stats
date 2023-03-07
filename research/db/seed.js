const { createTableStmts, insertStmts } = require('./migrate.js')

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
    let key
    if (house === 'senators')
        key = 'senator_list'
    else
        key = 'house_delegates'
    data.forEach(item => {
        let representatives
        if (house === 'senators')
            representatives = `${JSON.stringify(item.senators)}`
        else
            representatives = `${JSON.stringify(item.house_delegation)}`
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

module.exports = { createTables, populateStates, populateCongress }

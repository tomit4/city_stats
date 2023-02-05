const sqlite3 = require('sqlite3').verbose();
const data = require("../states.json")

const db = new sqlite3.Database('./states.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) return console.error(err.message)
    console.log('Connected to the in-memory SQlite database.')
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS states(
        primary_key INTEGER NOT NULL PRIMARY KEY,
        state_name TEXT NOT NULL,
        state_abbreviation TEXT NOT NULL,
        date_admitted TEXT NOT NULL,
        capital TEXT NOT NULL,
        largest_city TEXT NOT NULL,
        govenor TEXT NOT NULL,
        area_total TEXT NOT NULL,
        area_land TEXT NOT NULL,
        area_water TEXT NOT NULL,
        elevation TEXT NOT NULL,
        population_total TEXT NOT NULL,
        population_density TEXT NOT NULL,
        time_zone TEXT NOT NULL,
        latitude TEXT NOT NULL,
        longitude TEXT NOT NULL,
        url TEXT NOT NULL,
        flag_url TEXT NOT NULL,
        insignia_url TEXT NOT NULL
        )`,
    )

    data.forEach((item) => {
        const sqlStmt = db.prepare(`
            INSERT OR IGNORE INTO states (
                state_name,
                state_abbreviation,
                date_admitted,
                capital,
                largest_city,
                govenor,
                area_total,
                area_land,
                area_water,
                elevation,
                population_total,
                population_density,
                time_zone,
                latitude,
                longitude,
                url,
                flag_url,
                insignia_url)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
        `)
        sqlStmt.run(
            `${item.state_name}`,
            `${item.state_abbreviation}`,
            `${item.date_admitted}`,
            `${item.capital}`,
            `${item.largest_city}`,
            `${item.govenor}`,
            `${item.area.total}`,
            `${item.area.land}`,
            `${item.area.water}`,
            `${item.elevation}`,
            `${item.population.total}`,
            `${item.population.density}`,
            `${item.time_zone}`,
            `${item.latitude}`,
            `${item.longitude}`,
            `${item.url}`,
            `${item.flag_url}`,
            `${item.insignia_url}`
        )
        sqlStmt.finalize()
    })

    db.run(`
        CREATE TABLE IF NOT EXISTS senators(
        primary_key INTEGER NOT NULL PRIMARY KEY,
        senator_list TEXT NOT NULL,
        state_state_name TEXT NOT NULL
        )`,
    )

    data.forEach((item) => {
        db.run(
            `INSERT OR IGNORE INTO senators(
            senator_list,
            state_state_name)
            VALUES(
            json('${JSON.stringify(item.senators)}'),
            '${item.state_name}')`,
        )
    })

    db.run(`
        CREATE TABLE IF NOT EXISTS house_delegation(
        primary_key INTEGER NOT NULL PRIMARY KEY,
        house_delegates TEXT NOT NULL,
        state_state_name TEXT NOT NULL
        )`,
    )

    data.forEach((item) => {
        db.run(
            `INSERT OR IGNORE INTO house_delegation(
            house_delegates,
            state_state_name)
            VALUES(
            json('${JSON.stringify(item.house_delegation)}'),
            '${item.state_name}')`,
        )
    })

    db.run(`ALTER TABLE states ADD COLUMN senators TEXT;`)
    db.run(`ALTER TABLE states ADD COLUMN house_delegates TEXT;`)

    db.each(`
        UPDATE states
        SET senators = (SELECT senator_list FROM senators WHERE state_state_name = states.state_name)
    `, (err) => {
        if (err) console.error(err.message)
    })

    db.each(`
        UPDATE states
        SET house_delegates = (SELECT house_delegates FROM house_delegation WHERE state_state_name = states.state_name)
    `, (err) => {
        if (err) console.error(err.message)
    })

})

module.exports = db

// comment out when running with express
// db.close((err) => {
    // if (err) return console.error(err.message)
    // console.log('Closing the database connection...')
// });


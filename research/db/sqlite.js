const sqlite3 = require('sqlite3').verbose();
const data = require("../states_alabama.json")

const db = new sqlite3.Database('./states.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) return console.error(err.message)
    console.log('Connected to the in-memory SQlite database.')
});

// Assign foreign keys and create separate tables for each:
// Add a senatorsId value to the states_alabama.json file
// senatorsId INTENGER NOT NULL,
// FOREIGN KEY ([senatorsId]) REFERENCES "senators" ([senatorsId]) ON DELETE NO ACTION ON UPDATE NO ACTION

// house_delegationId INTENGER NOT NULL,
// FOREIGN KEY ([house_delegationId]) REFERENCES "house_delegation" ([house_delegationId]) ON DELETE NO ACTION ON UPDATE NO ACTION

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS states(
        name TEXT NOT NULL,
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
        insignia_url TEXT NOT NULL)`,
    )

    // create key to be interfaced with here
    db.run(`
        CREATE TABLE IF NOT EXISTS senators(
        senator_list TEXT NOT NULL
        )`,
    )

    // and insert id/key here as well
    data.forEach((item) => {
        db.run(
            `INSERT OR IGNORE INTO senators VALUES (json('${JSON.stringify(item.senators)}'))`,
        )
    })

    data.forEach((item) => {
        const sqlStmt = db.prepare(`
            INSERT OR IGNORE INTO states (
                name,
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
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
        `)
        sqlStmt.run(
            `${item.name}`,
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
})

// comment out when running with express
// db.close((err) => {
    // if (err) return console.error(err.message)
    // console.log('Closing the database connection...')
// });

module.exports = db

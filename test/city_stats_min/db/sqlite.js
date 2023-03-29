const sqlite3 = require('sqlite3').verbose()
const sdb = require('./states.json')
const cdb = require('./cities.json')
const { createStmts } = require('../utils/sql.js')

const db = new sqlite3.Database(
    './db/metro_stats.db',
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    err => {
        if (err) return console.error(err.message)
        console.log('Connected to the in-memory SQlite states Database.')
    },
)

db.serialize(() => {
    createStmts.forEach(stmt => db.run(stmt))
    // TODO: parse these out into separate file somehow...
    sdb.forEach((sd, i) => {
        db.run(
            `INSERT OR IGNORE INTO states VALUES
            (${i + 1},
            ${JSON.stringify(sd.state_name)},
            ${JSON.stringify(sd.state_abbreviation)}, 
            ${JSON.stringify(sd.date_admitted)}, 
            ${JSON.stringify(sd.capital)}, 
            ${JSON.stringify(sd.largest_city)}, 
            ${JSON.stringify(sd.govenor)}, 
            json('${JSON.stringify(sd.senators)}'),
            json('${JSON.stringify(sd.house_delegation)}'),
            json_object('total', '${sd.area.total}', 'land', '${
                sd.area.land
            }', 'water', '${sd.area.water}'),
            ${JSON.stringify(sd.elevation)},
            json_object('total', '${sd.population.total}', 'density', '${
                sd.population.density
            }', 'median_household_income', '${
                sd.population.median_household_income
            }'),
            ${JSON.stringify(sd.time_zone)},
            ${JSON.stringify(sd.latitude)},
            ${JSON.stringify(sd.longitude)},
            ${JSON.stringify(sd.url)},
            ${JSON.stringify(sd.flag_url)},
            ${JSON.stringify(sd.insignia_url)}
            )`,
        )
    })

    cdb.forEach((cd, i) => {
        db.run(
            `INSERT OR IGNORE INTO cities VALUES
            (${i + 1},
            ${JSON.stringify(cd.city_name)},
            ${JSON.stringify(cd.state_name)},
            ${JSON.stringify(cd.coordinates)},
            json('${JSON.stringify(cd.counties)}'),
            ${JSON.stringify(cd.settled_founded)},
            ${JSON.stringify(cd.incorporated)},
            json_object('type', '${cd.government.type}', 'mayor', '${
                cd.government.mayor
            }', 'city_council', json_array('${JSON.stringify(
                cd.government.city_council,
            )}')),
            json_object('city', '${cd.area.city}', 'land', '${
                cd.area.land
            }', 'water', '${cd.area.water}'),
            ${JSON.stringify(cd.elevation)},
            json_object('city', '${cd.population.city}', 'density', '${
                cd.population.density
            }', 'metro', '${cd.population.metro}'),
            ${JSON.stringify(cd.time_zone)},
            json('${JSON.stringify(cd.zip_codes)}'),
            json('${JSON.stringify(cd.area_codes)}'),
            json('${JSON.stringify(cd.fips_code)}'),
            json('${JSON.stringify(cd.gnis_feature_ids)}'),
            ${JSON.stringify(cd.url)}
            )`,
        )
    })
})

module.exports = db

// comment out when running with express
// db.close((err) => {
// if (err) return console.error(err.message)
// console.log('Closing the statesDatabase connection...')
// });

'use strict'
// Main hardcoded sql statements
const createStmts = [
    `CREATE TABLE IF NOT EXISTS states(
    primary_key INTEGER PRIMARY KEY,
    state_name TEXT,
    state_abbreviation TEXT,
    date_admitted TEXT,
    capital TEXT,
    largest_city TEXT,
    govenor TEXT,
    senators TEXT,
    house_delegation TEXT,
    area TEXT,
    elevation TEXT,
    population TEXT,
    time_zone TEXT,
    latitude TEXT,
    longitude TEXT,
    url TEXT,
    flag_url TEXT,
    insignia_url TEXT,
    major_cities TEXT
    )`,
    `CREATE TABLE IF NOT EXISTS cities(
    primary_key INTEGER PRIMARY KEY,
    city_name TEXT,
    state_name TEXT,
    coordinates TEXT,
    counties TEXT,
    settled_founded TEXT,
    incorporated TEXT,
    government TEXT,
    area TEXT,
    elevation TEXT,
    population TEXT,
    time_zone TEXT,
    zip_codes TEXT,
    area_codes TEXT,
    fips_code TEXT,
    gnis_feature_ids TEXT,
    url TEXT
    )`,
]

const insertStmts = {
    populateStates: function(sdb, db) {
        sdb.forEach((sd, i) => {
            db.run(
                `INSERT OR IGNORE INTO states VALUES (
                ${i + 1},
                ${JSON.stringify(sd.state_name)},
                ${JSON.stringify(sd.state_abbreviation)},
                ${JSON.stringify(sd.date_admitted)},
                ${JSON.stringify(sd.capital)},
                ${JSON.stringify(sd.largest_city)},
                ${JSON.stringify(sd.govenor)},
                json('${JSON.stringify(sd.senators)}'),
                json('${JSON.stringify(sd.house_delegation)}'),
                json_object('total', '${sd.area.total}',
                            'land', '${sd.area.land}',
                            'water', '${sd.area.water}'),
                ${JSON.stringify(sd.elevation)},
                json_object('total', '${sd.population.total}',
                            'density', '${sd.population.density}',
                            'median_household_income', '${sd.population.median_household_income}'),
                ${JSON.stringify(sd.time_zone)},
                ${JSON.stringify(sd.latitude)},
                ${JSON.stringify(sd.longitude)},
                ${JSON.stringify(sd.url)},
                ${JSON.stringify(sd.flag_url)},
                ${JSON.stringify(sd.insignia_url)},
                json('${JSON.stringify(sd.major_cities)}')
                )
                `
            )
        })
    },
    populateCities: function(cdb, db) {
        cdb.forEach((cd, i) => {
            db.run(
                `INSERT OR IGNORE INTO cities VALUES(
                ${i + 1},
                ${JSON.stringify(cd.city_name)},
                ${JSON.stringify(cd.state_name)},
                ${JSON.stringify(cd.coordinates)},
                json('${JSON.stringify(cd.counties)}'),
                ${JSON.stringify(cd.settled_founded)},
                ${JSON.stringify(cd.incorporated)},
                json_object('type', '${cd.government.type}',
                            'mayor', '${cd.government.mayor}',
                            'city_council', json_array('${JSON.stringify(cd.government.city_council,)}')),
                json_object('city', '${cd.area.city}',
                            'land', '${cd.area.land}',
                            'water', '${cd.area.water}'),
                ${JSON.stringify(cd.elevation)},
                json_object('city', '${cd.population.city}',
                            'density', '${cd.population.density}',
                            'metro', '${cd.population.metro}'),
                ${JSON.stringify(cd.time_zone)},
                json('${JSON.stringify(cd.zip_codes)}'),
                json('${JSON.stringify(cd.area_codes)}'),
                '${cd.fips_code}',
                json('${JSON.stringify(cd.gnis_feature_ids)}'),
                ${JSON.stringify(cd.url)}
                )`,
            )
        })
    }
}

module.exports = { createStmts, insertStmts }

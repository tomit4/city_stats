// Helper function for less typing
const _jfy = (data) => { return JSON.stringify(data) }

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
    longitutde TEXT,
    url TEXT,
    flag_url TEXT,
    insignia_url TEXT
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
                ${_jfy(sd.state_name)},
                ${_jfy(sd.state_abbreviation)}, 
                ${_jfy(sd.date_admitted)}, 
                ${_jfy(sd.capital)}, 
                ${_jfy(sd.largest_city)}, 
                ${_jfy(sd.govenor)}, 
                json('${_jfy(sd.senators)}'),
                json('${_jfy(sd.house_delegation)}'),
                json_object('total', '${sd.area.total}', 'land', '${
                sd.area.land}', 'water', '${sd.area.water}'),
                ${_jfy(sd.elevation)},
                json_object('total', '${sd.population.total}', 'density', '${
                sd.population.density}', 'median_household_income', '${
                sd.population.median_household_income}'),
                ${_jfy(sd.time_zone)},
                ${_jfy(sd.latitude)},
                ${_jfy(sd.longitude)},
                ${_jfy(sd.url)},
                ${_jfy(sd.flag_url)},
                ${_jfy(sd.insignia_url)})`
            )
        })
    },
    populateCities: function(cdb, db) {
        cdb.forEach((cd, i) => {
            db.run(
                `INSERT OR IGNORE INTO cities VALUES(
                ${i + 1},
                ${_jfy(cd.city_name)},
                ${_jfy(cd.state_name)},
                ${_jfy(cd.coordinates)},
                json('${_jfy(cd.counties)}'),
                ${_jfy(cd.settled_founded)},
                ${_jfy(cd.incorporated)},
                json_object('type', '${cd.government.type}', 'mayor', '${
                    cd.government.mayor
                }', 'city_council', json_array('${_jfy(
                    cd.government.city_council,
                )}')),
                json_object('city', '${cd.area.city}', 'land', '${
                    cd.area.land
                }', 'water', '${cd.area.water}'),
                ${_jfy(cd.elevation)},
                json_object('city', '${cd.population.city}', 'density', '${
                    cd.population.density
                }', 'metro', '${cd.population.metro}'),
                ${_jfy(cd.time_zone)},
                json('${_jfy(cd.zip_codes)}'),
                json('${_jfy(cd.area_codes)}'),
                json('${_jfy(cd.fips_code)}'),
                json('${_jfy(cd.gnis_feature_ids)}'),
                ${_jfy(cd.url)}
                )`,
            )
        })
    }
}

module.exports = {createStmts, insertStmts}

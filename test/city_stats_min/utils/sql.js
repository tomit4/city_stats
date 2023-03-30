// Helper function for less typing
const jsify = (data) => { return JSON.stringify(data) }

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
                ${jsify(sd.state_name)},
                ${jsify(sd.state_abbreviation)}, 
                ${jsify(sd.date_admitted)}, 
                ${jsify(sd.capital)}, 
                ${jsify(sd.largest_city)}, 
                ${jsify(sd.govenor)}, 
                json('${jsify(sd.senators)}'),
                json('${jsify(sd.house_delegation)}'),
                json_object('total', '${sd.area.total}',
                            'land', '${sd.area.land}',
                            'water', '${sd.area.water}'),
                ${jsify(sd.elevation)},
                json_object('total', '${sd.population.total}',
                            'density', '${sd.population.density}',
                            'median_household_income', '${sd.population.median_household_income}'),
                ${jsify(sd.time_zone)},
                ${jsify(sd.latitude)},
                ${jsify(sd.longitude)},
                ${jsify(sd.url)},
                ${jsify(sd.flag_url)},
                ${jsify(sd.insignia_url)})`
            )
        })
    },
    populateCities: function(cdb, db) {
        cdb.forEach((cd, i) => {
            db.run(
                `INSERT OR IGNORE INTO cities VALUES(
                ${i + 1},
                ${jsify(cd.city_name)},
                ${jsify(cd.state_name)},
                ${jsify(cd.coordinates)},
                json('${jsify(cd.counties)}'),
                ${jsify(cd.settled_founded)},
                ${jsify(cd.incorporated)},
                json_object('type', '${cd.government.type}',
                            'mayor', '${cd.government.mayor}', 
                            'city_council', json_array('${jsify(cd.government.city_council,)}')),
                json_object('city', '${cd.area.city}',
                            'land', '${cd.area.land}', 
                            'water', '${cd.area.water}'),
                ${jsify(cd.elevation)},
                json_object('city', '${cd.population.city}',
                            'density', '${cd.population.density}', 
                            'metro', '${cd.population.metro}'),
                ${jsify(cd.time_zone)},
                json('${jsify(cd.zip_codes)}'),
                json('${jsify(cd.area_codes)}'),
                json('${jsify(cd.fips_code)}'),
                json('${jsify(cd.gnis_feature_ids)}'),
                ${jsify(cd.url)}
                )`,
            )
        })
    }
}

module.exports = { createStmts, insertStmts }

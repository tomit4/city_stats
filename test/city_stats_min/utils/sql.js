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

module.exports = { createStmts }

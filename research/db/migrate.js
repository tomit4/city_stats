const createTableStmts = [
    `CREATE TABLE IF NOT EXISTS states(
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
    population_median_household_income TEXT NOT NULL,
    time_zone TEXT NOT NULL,
    latitude TEXT NOT NULL,
    longitude TEXT NOT NULL,
    url TEXT NOT NULL,
    flag_url TEXT NOT NULL,
    insignia_url TEXT NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS senators(
    primary_key INTEGER NOT NULL PRIMARY KEY,
    senator_list TEXT NOT NULL,
    state_state_name TEXT NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS house_delegation(
    primary_key INTEGER NOT NULL PRIMARY KEY,
    house_delegates TEXT NOT NULL,
    state_state_name TEXT NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS cities(
    primary_key INTEGER NOT NULL PRIMARY KEY,
    city_name TEXT NOT NULL,
    state_name TEXT NOT NULL,
    coordinates TEXT,
    settled_founded TEXT,
    incorporated TEXT,
    government_type TEXT,
    government_mayor TEXT,
    area_city TEXT,
    area_land TEXT,
    area_water TEXT,
    elevation TEXT,
    population_city TEXT,
    population_density TEXT,
    population_metro TEXT,
    time_zone TEXT,
    fips_code TEXT,
    url TEXT
    )`,
    `CREATE TABLE IF NOT EXISTS city_counties (
    primary_key INTEGER NOT NULL PRIMARY KEY,
    city_counties TEXT,
    city_city_name TEXT NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS city_council (
    primary_key INTEGER NOT NULL PRIMARY KEY,
    city_council TEXT,
    city_city_name TEXT NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS zip_codes (
    primary_key INTEGER NOT NULL PRIMARY KEY,
    zip_codes TEXT,
    city_city_name TEXT NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS area_codes (
    primary_key INTEGER NOT NULL PRIMARY KEY,
    area_codes TEXT,
    city_city_name TEXT NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS gnis_feature_ids (
    primary_key INTEGER NOT NULL PRIMARY KEY,
    gnis_feature_ids TEXT,
    city_city_name TEXT NOT NULL
    )`
]

const insertStmts = [
    `INSERT OR IGNORE INTO states (
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
    population_median_household_income,
    time_zone,
    latitude,
    longitude,
    url,
    flag_url,
    insignia_url)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `,
    `INSERT OR IGNORE INTO cities (
    city_name,
    state_name,
    coordinates,
    settled_founded,
    incorporated,
    government_type,
    government_mayor,
    area_city,
    area_land,
    area_water,
    elevation,
    population_city,
    population_density,
    population_metro,
    time_zone,
    fips_code,
    url)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `
]

module.exports = { createTableStmts, insertStmts }

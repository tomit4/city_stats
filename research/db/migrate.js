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
    coordinates TEXT NOT NULL,
    settled_founded TEXT NOT NULL,
    incorporated TEXT NOT NULL,
    government_type TEXT NOT NULL,
    government_mayor TEXT NOT NULL,
    area_city TEXT NOT NULL,
    area_land TEXT NOT NULL,
    area_water TEXT NOT NULL,
    elevation TEXT NOT NULL,
    population_city TEXT NOT NULL,
    population_density TEXT NOT NULL,
    population_metro TEXT NOT NULL,
    time_zone TEXT NOT NULL,
    fips_code TEXT NOT NULL,
    url TEXT NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS city_counties (
    primary_key INTEGER NOT NULL PRIMARY KEY,
    city_counties TEXT NOT NULL,
    city_city_name TEXT NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS city_council (
    primary_key INTEGER NOT NULL PRIMARY KEY,
    city_council TEXT NOT NULL,
    city_city_name TEXT NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS zip_codes (
    primary_key INTEGER NOT NULL PRIMARY KEY,
    zip_codes TEXT NOT NULL,
    city_city_name TEXT NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS area_codes (
    primary_key INTEGER NOT NULL PRIMARY KEY,
    area_codes TEXT NOT NULL,
    city_city_name TEXT NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS gnis_feature_ids (
    primary_key INTEGER NOT NULL PRIMARY KEY,
    gnis_feature_ids TEXT NOT NULL,
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
    `
]

module.exports = { createTableStmts, insertStmts }

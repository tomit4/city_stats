const sqlStatements = [
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
    )`
];

const createTables = (db) => {
  sqlStatements.forEach((statement) => {
    db.run(statement);
  });
};

module.exports = { createTables };

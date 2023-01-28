const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('states.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) return console.error(err.message)
    console.log('Connected to the in-memory SQlite database.')
});

// db.serialize (() => {
    // db.run(`CREATE TABLE IF NOT EXISTS peoples(
        // id TEXT NOT NULL UNIQUE,
        // name TEXT NOT NULL,
        // message TEXT NOT NULL)`,
    // )

    // db.run(
        // `INSERT OR IGNORE INTO peoples VALUES
        // (1, 'Brad Pitt', 'this site is dope'),
        // (2, 'Jennifer Lopez', 'this site is ok')`,
    // )
// })


module.exports = db

// db.close((err) => {
    // if (err) return console.error(err.message)
    // console.log('Closing the database connecttion...')
// });

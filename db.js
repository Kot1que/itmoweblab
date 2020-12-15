const sqlite3 = require('sqlite3').verbose()

const DB_SOURCE = "db.sqlite"

let db = new sqlite3.Database(DB_SOURCE, (err) => {
    if (err) {
        console.error(err.message)
        throw err
    } else {
        console.log('DB connection OK')
        db.run(`
            CREATE TABLE cities (id INTEGER PRIMARY KEY UNIQUE, name varchar(64));            
            `, (err) => {
            if (err) {
                console.log("Db exists")
            }
        });
    }
});

module.exports = db

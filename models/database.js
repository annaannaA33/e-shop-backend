const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.resolve(__dirname, "../db/shop.db");

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Error connecting to database", err.message);
    } else {
        console.log("Connection to SQLite database successful");
    }
});

module.exports = db;

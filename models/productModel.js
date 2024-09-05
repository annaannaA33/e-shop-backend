const db = require("./database");

//  to create a product table if it does not exist
const createProductTable = () => {
    const query = `
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        brand TEXT NOT NULL,
        title TEXT NOT NULL,
        picture TEXT NOT NULL,
        color TEXT NOT NULL,
        price INTEGER NOT NULL,
        shortDescription TEXT,
        stockAmount INTEGER NOT NULL


    )`;
    db.run(query, (err) => {
        if (err) {
            console.error("Error creating product table:", err);
        } else {
            console.log("Product table created or already exists");
        }
    });
};

// to get all products
const getAllProducts = (callback) => {
    db.all("SELECT * FROM products", [], (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
};

module.exports = {
    createProductTable,
    getAllProducts,
};

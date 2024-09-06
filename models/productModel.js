const db = require("./database");

//  to create a product table if it does not exist
const createProductTable = () => {
    const query = `
    CREATE TABLE IF NOT EXISTS products (
        item_id INTEGER PRIMARY KEY AUTOINCREMENT,
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

const createUsersTable = () => {
    const query = `
    CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_name TEXT NOT NULL,
    user_surname TEXT NOT NULL,
    user_email TEXT NOT NULL,
    user_phone  TEXT NOT NULL,
    user_role TEXT NOT NULL)`;
    db.run(query, (err) => {
        if (err) {
            console.error("Error creating users table:", err);
        } else {
            console.log("Users table created or already exists");
        }
    });
};

const createOrdersTable = () => {
    const query = `
    CREATE TABLE IF NOT EXISTS orders (
    user_id INTEGER,
    order_id INTEGER PRIMARY KEY AUTOINCREMENT,
    FOREIGN KEY (user_id) REFERENCES users(user_id))`;
    db.run(query, (err) => {
        if (err) {
            console.error("Error creating orders table:", err);
        } else {
            console.log("Orders table created or already exists");
        }
    });
};

const createOrderDetailsTable = () => {
    const query = `
    CREATE TABLE IF NOT EXISTS orderDetails (
    product_id INTERNAL KEY,
    product_quantity INTEGER NOT NULL,
    total_prise INTEGER NOT NULL,
    order_created_date TEXT DEFAULT CURRENT_TIMESTAMP,
    order_modify_date TEXT DEFAULT CURRENT_TIMESTAMP,
    orser_status TEXT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orderDetails(order_id))`;
    db.run(query, (err) => {
        if (err) {
            console.error("Error creating orders table:", err);
        } else {
            console.log("Order details table created or already exists");
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
    createUsersTable,
    createOrdersTable,
    createOrderDetailsTable,
    createUsersTable,
};

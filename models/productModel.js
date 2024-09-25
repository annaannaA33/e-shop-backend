const db = require("./database");

//  to create a product table if it does not exist
const createProductTable = () => {
    const query = `
    CREATE TABLE IF NOT EXISTS products (
        product_id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_type TEXT NOT NULL,
        brand TEXT NOT NULL,
        title TEXT NOT NULL,
        picture TEXT NOT NULL,
        color TEXT NOT NULL,
        price INTEGER NOT NULL,
        shortDescription TEXT,
        stockAmount INTEGER NOT NULL,
        popularity_score INTEGER DEFAULT 0
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
    order_id INTEGER,
    product_id INTEGER,
    total_price INTEGER NOT NULL,
    order_created_date TEXT DEFAULT CURRENT_TIMESTAMP,
    order_modify_date TEXT DEFAULT CURRENT_TIMESTAMP,
    order_status TEXT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
    )`;
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

const getProductById = (productId, callback) => {
    const query = `SELECT * FROM products WHERE product_id = ?`;
    db.get(query, [productId], (err, product) => {
        if (err) {
            return callback(err, null);
        }

        if (!product) {
            return callback(null, null); // product not found
        }

        callback(null, product); // Return product details
    });
};

const getOrderById = (orderId, callback) => {
    const query = `
        SELECT 
            orders.order_id,
            orders.user_id,
            users.user_name,
            users.user_surname,
            users.user_email,
            users.user_phone,
            products.product_id,
            products.title,
            products.brand,
            products.color,
            products.price,
            orderDetails.total_price,
            orderDetails.order_created_date,
            orderDetails.order_modify_date,
            orderDetails.order_status
        FROM 
            orders
        JOIN 
            orderDetails ON orders.order_id = orderDetails.order_id
        JOIN 
            products ON orderDetails.product_id = products.product_id
        JOIN 
            users ON orders.user_id = users.user_id
        WHERE 
            orders.order_id = ?`;

    db.get(query, [orderId], (err, order) => {
        if (err) {
            return callback(err, null);
        }

        if (!order) {
            return callback(null, null); // Order not found
        }

        callback(null, order); // Return order details
    });
};

const increasePopularityScore = (productId, callback = () => {}) => {
    const query = `UPDATE products SET popularity_score = popularity_score + 1 WHERE product_id = ?`;
    db.run(query, [productId], (err) => {
        if (err) {
            return callback(err);
        }
        callback(null);
    });
};

module.exports = {
    createProductTable,
    getAllProducts,
    createUsersTable,
    createOrdersTable,
    createOrderDetailsTable,
    createUsersTable,
    getOrderById,
    getProductById,
    increasePopularityScore,
};

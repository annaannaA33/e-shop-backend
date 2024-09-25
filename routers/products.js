const db = require("../models/database");

const getProductList = (filter = {}, callback) => {
    let query = "SELECT * FROM products";
    let params = [];

    if (filter.product_type) {
        query += " WHERE product_type = ?";
        params.push(filter.product_type);
    }

    db.all(query, params, (err, rows) => {
        if (err) {
            return callback(err, null);
        }
        if (rows.length === 0) {
            callback(null, []);
        }
        callback(null, rows);
    });
};

module.exports = {
    getProductList,
};

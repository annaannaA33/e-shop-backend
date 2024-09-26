const db = require("../models/database");

const getProductList = (filter = {}, callback) => {
    let query = "SELECT * FROM products";
    let params = [];
    let conditions = [];

    if (filter.product_type) {
        conditions.push("product_type = ?");
        params.push(filter.product_type);
    }

    if (filter.color) {
        conditions.push("color = ?");
        params.push(filter.color);
    }

    if (filter.priceRange) {
        const { min, max } = filter.priceRange;
        conditions.push("price BETWEEN ? AND ?");
        params.push(min, max);
    }

    if (filter.brand) {
        conditions.push(" brand = ?");
        params.push(filter.brand);
    }

    if (conditions.lenght > 0) {
        query += WHETE + conditions.join(" AND");
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

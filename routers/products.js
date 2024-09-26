const db = require("../models/database");
const logger = require("../logger/logger");

const getProductList = (filter = {}, callback) => {
    logger.info(
        `Executing getProductList with filter: ${JSON.stringify(filter)}`
    );

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
        conditions.push("brand = ?");
        params.push(filter.brand);
    }

    if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
    }

    if (filter.sort_by && filter.order) {
        query += ` ORDER BY ${filter.sort_by} ${filter.order}`;
    }

    db.all(query, params, (err, rows) => {
        logger.debug(`Database query executed: ${query}`);

        if (err) {
            logger.error(`Error executing database query: ${err.message}`);

            return callback(err, null);
        }
        if (rows.length === 0) {
            logger.info("No products found matching the filter");

            return callback(null, {
                products: [],
                message: "No products found",
            });
        }
        logger.info(`Found ${rows.length} products`);
        return callback(null, rows);
    });
};

module.exports = {
    getProductList,
};

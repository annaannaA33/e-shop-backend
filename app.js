const express = require("express");
const app = express();
const productModel = require("./models/productModel");
const { getProductList } = require("./routers/products");
const db = require("./models/database");
const logger = require("./logger/logger");
const helmet = require("helmet");

const cors = require("cors");

const { sendOrderConfirmationEmail } = require("./routers/orders");
const eventOrchestrator = require("./eventOrchestrator/EmailService");
const axios = require("axios");


const corsOptions = {
    origin: ["http://localhost:5173", "http://localhost:3000","http://127.0.0.1:3000", "https://teila-e-shop.netlify.app"], // Add other ports as needed
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
};
app.use(cors(corsOptions));
/*app.options('/api/orders', cors(corsOptions));*/

app.use(express.json());
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
        },
    })
);


productModel.createProductTable();
productModel.createUsersTable();
productModel.createOrdersTable();
productModel.createOrderDetailsTable();

//get all products
app.get("/api/products", async (req, res) => {
    logger.info(
        `Received GET request to /api/products with query parameters: ${JSON.stringify(
            req.query
        )}`
    );

    const filter = {
        product_type: req.query.product_type
            ? Array.isArray(req.query.product_type)
                ? req.query.product_type
                : [req.query.product_type]
            : [],
        color: req.query.color
            ? Array.isArray(req.query.color)
                ? req.query.color
                : [req.query.color]
            : [],
        brand: req.query.brand
            ? Array.isArray(req.query.brand)
                ? req.query.brand
                : [req.query.brand]
            : [],
        priceRange: {
            min: req.query.min_price ? parseInt(req.query.min_price) : 0,
            max: req.query.max_price ? parseInt(req.query.max_price) : Infinity,
        },
        sort_by: req.query.sort_by,
        order: req.query.order,
    };
    try {
        const products = await new Promise((resolve, reject) => {
            getProductList(filter, (err, result) =>
                err ? reject(err) : resolve(result)
            );
        });
        logger.info(`Sent ${products.length} products in response`);
        res.send(products);
    } catch (err) {
        logger.error(`Error retrieving products: ${err.message}`);
        res.status(500).send("Error retrieving products.");
    }
});

// API endpoint to gett order with order_id
app.get("/", (req, res) => {
    res.send("E-shop backend");
});
app.get("/api/products/:id", (req, res) => {
    const productId = req.params.id;
    //Call function to get info about the product
    productModel.getProductById(productId, (err, product) => {
        if (err) {
            return res
                .status(500)
                .send("Error retrieving product from the database.");
        }

        if (!product) {
            return res.status(404).send("Product not found.");
        }
        // Send the product details as a response
        res.send({
            success: true,
            message: "Product details:",
            product: {
                id: product.product_id,
                product: product.product_type,
                brand: product.brand,
                title: product.title,
                picture: product.picture,
                color: product.color,
                price: product.price,
                shortDescription: product.shortDescription,
                stockAmount: product.stockAmount,
                popularity: product.popularity_score,
            },
        });
        productModel.increasePopularityScore(productId, (err) => {
            if (err) {
                return res
                    .status(500)
                    .send("Error updating product popularity.");
            }
        });
    });
});

app.get("/api/stock/:id", (req, res) => {
    const productId = req.params.id;
    productModel.getProductById(productId, (err, product) => {
        if (err) {
            return res.status(500).send("Error retrieving product.");
        }
        if (!product) {
            return res.status(404).send("Product not found.");
        }
        res.send({ stockAmount: product.stockAmount });
    });
});

app.get("/api/orders/:id", (req, res) => {
    const orderId = req.params.id;

    // Call the getOrderById function
    productModel.getOrderById(orderId, (err, order) => {
        if (err) {
            return res
                .status(500)
                .send("Error retrieving order from the database.");
        }

        if (!order) {
            return res.status(404).send("Order not found.");
        }

        // Send the order details as a response
        res.send({
            success: true,
            order: {
                orderId: order.order_id,
                user: {
                    id: order.user_id,
                    name: order.user_name,
                    surname: order.user_surname,
                    email: order.user_email,
                    phone: order.user_phone,
                },
                product: {
                    id: order.product_id,
                    title: order.title,
                    brand: order.brand,
                    color: order.color,
                    price: order.price,
                },

                order_created_date: order.order_created_date,
                order_modify_date: order.order_modify_date,
                order_status: order.order_status,
            },
        });
    });
});

// https://e-shop-backend-ag4c.onrender.com/api/orders
app.post("/api/orders", async (req, res) => {
    const { productId, userName, userSurname, userEmail, userPhone } = req.body;

    // Validation of entered data
    if (!productId) {
        return res.status(400).send("Product ID is required");
    }
    if (!userName || !userSurname || !userEmail || !userPhone) {
        return res.status(400).send("All user fields are required");
    }

    // Getting product data from the database
    const query = "SELECT * FROM products WHERE product_id = ?";

    db.get(query, [productId], async (err, product) => {
        if (err) {
            return res
                .status(500)
                .send("Error retrieving product from the database.");
        }

        if (!product) {
            return res.status(404).send("Product not found.");
        }

        // Checking whether there is a sufficient quantity of goods in stock
        if (product.stockAmount < 1) {
            return res.status(400).send("Not enough products in stock.");
        }

        // If the product is in stock, create a user
        const userQuery =
            "INSERT INTO users (user_name, user_surname, user_email, user_phone, user_role) VALUES (?, ?, ?, ?, ?)";
        db.run(
            userQuery,
            [userName, userSurname, userEmail, userPhone, "customer"],
            async function (err) {
                if (err) {
                    return res
                        .status(500)
                        .send("Error saving user to the database.");
                }

                const userId = this.lastID;

                // Creating an order in the database
                const orderQuery = "INSERT INTO orders (user_id) VALUES (?)";
                db.run(orderQuery, [userId], async function (err) {
                    if (err) {
                        return res.status(500).send("Error creating order.");
                    }

                    const orderId = this.lastID;

                    // Adding order details
                    const orderDetailsQuery = `
                        INSERT INTO orderDetails (order_id, product_id, total_price, order_created_date, order_modify_date, order_status)
                        VALUES (?, ?, ?, datetime('now'), datetime('now'), ?)
                    `;
                    const totalPrice = product.price * 1; // Assuming a default quantity of 1
                    db.run(
                        orderDetailsQuery,
                        [orderId, productId, totalPrice, "confirmed"],
                        async (err) => {
                            if (err) {
                                return res
                                    .status(500)
                                    .send("Error saving order details.");
                            }

                            // Updating the quantity of goods in the database
                            const updateStockQuery =
                                "UPDATE products SET stockAmount = stockAmount - 1 WHERE product_id = ?";
                            db.run(
                                updateStockQuery,
                                [productId],
                                async (err) => {
                                    if (err) {
                                        return res
                                            .status(500)
                                            .send(
                                                "Error updating product stock."
                                            );
                                    }

                                    // Updating product popularity
                                    productModel.increasePopularityScore(
                                        productId,
                                        (err) => {
                                            if (err) {
                                                return res
                                                    .status(500)
                                                    .send(
                                                        "Error updating product popularity."
                                                    );
                                            }
                                        }
                                    );

                                    // Emit event after order creation
                                    try {
                                        eventOrchestrator.emit(
                                            "orderCreated",
                                            orderId,
                                            userEmail
                                        );

                                        res.send({
                                            success: true,
                                            message:
                                                "Order successfully created, email event emitted. Stock and popularity updated.",
                                            orderId: orderId,
                                            userId: userId,
                                        });
                                    } catch (error) {
                                        return res
                                            .status(500)
                                            .send(error.message);
                                    }
                                }
                            );
                        }
                    );
                });
            }
        );
    });
});

//port env
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

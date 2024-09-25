const express = require("express");
const app = express();
const productModel = require("./models/productModel");
const db = require("./models/database");
// import { productModel } from /... <-- best
// expot const productModel = () => {...}
// import productModeeeel from ...
// import PROOODcutModel from ...

// module.exports

app.use(express.json());
productModel.increasePopularityScore();
productModel.createProductTable();
productModel.createUsersTable();
productModel.createOrdersTable();
productModel.createOrderDetailsTable();

//gett all products
app.get("/api/products", (req, res) => {
    productModel.getAllProducts((err, products) => {
        if (err) {
            return res.status(500).send("error.");
        }
        res.send(products);
    });
});

// API endpoint to gett order with order_id

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

app.post("/api/orders", (req, res) => {
    const { productId, userName, userSurname, userEmail, userPhone } = req.body;

    // Validation of entered data

    if (!productId) {
        return res.status(400).send("Product ID and valid color are required");
    }
    if (!userName || !userSurname || !userEmail || !userPhone) {
        return res.status(400).send("All user fields are required");
    }

    // Getting product data from the database

    const query = "SELECT * FROM products WHERE product_id = ?";

    db.get(query, [productId], (err, product) => {
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
            function (err) {
                if (err) {
                    return res
                        .status(500)
                        .send("Error saving user to the database.");
                }

                const userId = this.lastID;

                // userId
                console.log("New User ID:", userId);

                // Creating an order in the database

                const orderQuery = "INSERT INTO orders (user_id) VALUES (?)";
                db.run(orderQuery, [userId], function (err) {
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
                        (err) => {
                            if (err) {
                                return res
                                    .status(500)
                                    .send("Error saving order details.");
                            }
                            console.log("New order: userId:", userId);

                            // Updating the quantity of goods in the database

                            const updateStockQuery =
                                "UPDATE products SET stockAmount = stockAmount - 1 WHERE product_id = ?";
                            db.run(updateStockQuery, [productId], (err) => {
                                if (err) {
                                    return res
                                        .status(500)
                                        .send("Error updating product stock.");
                                }
                                console.log(productId, product.stockAmount);

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

                                // Sending a response to the client

                                res.send({
                                    success: true,
                                    message:
                                        "Order successfully created, stock updated, popularity updated",
                                    orderId: orderId,
                                    userId: userId,
                                });
                            });
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

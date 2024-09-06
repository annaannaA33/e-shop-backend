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

app.post("/api/orders", (req, res) => {
    const { productId, color, userName, userSurname, userEmail, userPhone } =
        req.body;

    // Validation of entered data

    if (!productId || !color) {
        return res.status(400).send("Product ID and valid color are required");
    }
    if (!userName || !userSurname || !userEmail || !userPhone) {
        return res.status(400).send("All user fields are required");
    }

    // Getting product data from the database

    const query = "SELECT * FROM products WHERE item_id = ?";

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

                // const userId = this.lastID;

                // Creating an order in the database

                const orderQuery = "INSERT INTO orders (user_id) VALUES (?)";
                db.run(orderQuery, [userId], function (err) {
                    if (err) {
                        return res.status(500).send("Error creating order.");
                    }

                    const orderId = this.lastID;

                    // Adding order details

                    const orderDetailsQuery = `
                    INSERT INTO orderDetails (user_id, order_id, item_id, item_quantity, total_prise, order_created_date, order_modify_date, orser_status)
                    VALUES (?, ?, ?, ?, ?, datetime('now'), datetime('now'), ?)
                `;
                    const totalPrice = product.price;
                    db.run(
                        orderDetailsQuery,
                        [userId, orderId, productId, totalPrice, "confirmed"],
                        (err) => {
                            if (err) {
                                return res
                                    .status(500)
                                    .send("Error saving order details.");
                            }

                            // Updating the quantity of goods in the database

                            const updateStockQuery =
                                "UPDATE products SET stockAmount = stockAmount - ? WHERE item_id = ?";
                            db.run(
                                updateStockQuery,
                                [amount, productId],
                                (err) => {
                                    if (err) {
                                        return res
                                            .status(500)
                                            .send(
                                                "Error updating product stock."
                                            );
                                    }

                                    // Sending a response to the client

                                    res.send({
                                        success: true,
                                        message:
                                            "Order successfully created and stock updated",
                                        orderId: orderId,
                                        userId: userId,
                                    });
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

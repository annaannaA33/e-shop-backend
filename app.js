const express = require("express");
const app = express();
const productModel = require("./models/productModel");

app.use(express.json());

productModel.createProductTable();

//gett all products
app.get("/api/products", (req, res) => {
    productModel.getAllProducts((err, products) => {
        if (err) {
            return res.status(500).send("Ошибка получения данных из базы.");
        }
        res.send(products);
    });
});

//port env
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

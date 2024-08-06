const express = require("express");
const app = express();

app.use(express.json());
const products = [
    {
        id: 1,
        name: "product1",
        price: 100,
        description: "some description",
        isInstock: 10,
    },
    {
        id: 2,
        name: "product2",
        price: 400,
        description: "some description",
        isInstock: 10,
    },
    {
        id: 3,
        name: "product3",
        price: 300,
        description: "some description",
        isInstock: 10,
    },
    {
        id: 4,
        name: "product4",
        price: 500,
        description: "some description",
        isInstock: 10,
    },
];

const card = [];

//home api
app.get("/", (req, res) => {
    res.send("hello!");
});

app.get("/api/products", (req, res) => {
    res.send(products);
});

// /api/products/1

app.get("/api/products/:id", (req, res) => {
    const product = products.find((c) => c.id === parseInt(req.params.id));
    if (!product)
        return res
            .status(404)
            .send("the product with the given ID was not found");
    res.send(product);
});

app.put("/api/products/:id/:howMuch"),
    (req, res) => {
        //find the product with id
        const product = products.find((c) => c.id === parseInt(req.params.id));
        //validate is in stock
        if (!product) {
            console.log("Product not found");
            return res
                .status(404)
                .send("the product with this id was not found");
        }

        // Parse the howMuch parameter to an integer
        const howMuch = parseInt(req.params.howMuch);

        //check the howMuch
        if (isNaN(howMuch) || howMuch <= 0) {
            return res
                .status(400)
                .send("The amount must be a positive integer");
        }

        if (product.isInstock < howMuch) {
            return res.status(400).send("not enough in the stock");
        }
        // update the card => card + item
        card.push({ ...product, amount: howMuch });
        //products.isInstock - howMuch
        product.isInstock -= howMuch;
        res.send(product);
    };

//port env
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

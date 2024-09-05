const express = require("express");
const app = express();
const products = [
    {
        id: 1,
        name: "product1",
        price: 100,
        description: "some description1",
        isInstock: 10,
    },
    {
        id: 2,
        name: "product2",
        price: 400,
        description: "some description2",
        isInstock: 10,
    },
    {
        id: 3,
        name: "product3",
        price: 300,
        description: "some description3",
        isInstock: 10,
    },
    {
        id: 4,
        name: "product4",
        price: 500,
        description: "some description4",
        isInstock: 10,
    },
];

const createdOrder = [];

const userInformation = {};

//home api
app.get("/", (req, res) => {
    res.send("hello!");
});

app.get("/api/products", (req, res) => {
    res.send(products);
});

// /api/products/1  here the al info about the product

app.get("/api/products/:id", (req, res) => {
    const product = products.find((c) => c.id === parseInt(req.params.id));
    if (!product)
        return res
            .status(404)
            .send("the product with the given ID was not found");
    res.send(product);
});

//make the order
app.post("/api/orders", (req, res) => {
    const { productId, amount } = req.body;

    if (!productId || !amount) {
        return res.status(400).send("Product ID and valid amount are required");
    } else if (amount <= 0) {
        return res
            .status(400)
            .send("There is not enough of this product in stock");
    }
    const selectedItem = 0;
    selectedItem.amount += amount;

    //const selectedItem = createdOrder.find((item) => item.productId === productId);
    const product = products.find((c) => c.id === parseInt(req.body.productId));
    //if (selectedItem) {

    product.stockAmount -= amount;

    createdOrder.push({ productId, amount });

    console.log(createdOrder);
    console.log(products);

    const microserviceResponse = await fetch("localhost/:3333", {
        data: {
        eventType: 'orderMade',
        firstName: ...,
        last\name: ...,
    }
    })

    res.send({ success: true, createdOrder });
});

// get the order deteils
app.get("/api/createdOrder", (req, res) => {
    res.send(createdOrder);
});

// order confirmation
app.post("/api/checkout", (req, res) => {
    if (cart.length === 0) {
        return res.status(400).send("The cart is empty");
    }

    // TODO  add confirmation logic
    // проверить наличие userInformation всех данных

    //отправить имеил со статусом
    //изменить статус заказа
    cart = []; // then clean the cart
    res.send("Order confirmed! The cart is now empty.");
});

//port env
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

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

const cart = [
    {
        id: 4,
        amount: 5,
    },
];

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

//add item to the cart
app.post("/api/cart", (req, res) => {
    const { productId, amount } = req.body;

    if (!productId || !amount) {
        return res.status(400).send("Product ID and valid amount are required");
    } else if (amount <= 0) {
        return res
            .status(400)
            .send("There is not enough of this product in stock");
    }

    const cartItem = cart.find((item) => item.productId === productId);
    const product = products.find((c) => c.id === parseInt(req.params.id));
    if (cartItem) {
        cartItem.amount += amount;

        product.isInstock = -amount;
    } else {
        cart.push({ productId, amount });
    }
    console.log(cart);
    console.log(products);
    res.send({ success: true, cart });
});

// get the cart
app.get("/api/cart", (req, res) => {
    res.send(cart);
});

// order confirmation
app.post("/api/checkout", (req, res) => {
    if (cart.length === 0) {
        return res.status(400).send("The cart is empty");
    }

    // TODO  add confirmation logic
    cart = []; // then clean the cart
    res.send("Order confirmed! The cart is now empty.");
});

// delete an item from the cat
app.delete("/api/cart/:id", (req, res) => {
    const productId = parseInt(req.params.id);
    const initialCartLength = cart.length;

    cart = cart.filter((item) => item.productId !== productId);

    if (cart.length === initialCartLength) {
        return res.status(404).send("Product not found in cart");
    }

    res.send({ success: true, cart });
});

//port env
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

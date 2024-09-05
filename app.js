const express = require("express");
const app = express();
const productModel = require("./models/productModel");

// import { productModel } from /... <-- best
// expot const productModel = () => {...}
// import productModeeeel from ...
// import PROOODcutModel from ...

// module.exports

app.use(express.json());

productModel.createProductTable();

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
    const { productId, amount, userName, userSurname, userEmail, userPhone} = req.body;

    //проверить все поля предоставленны, провалидировать, userInformation проверить
    //  если да, сохранить пользвоателя, сохранить пользователя
    //берем инфо из бд про  товар
    //отправить имеил со статусом
    //изменить статус заказа
    //response   console/log ответ/ / если товар в наличии и все проверки пройдены, то подствержлаем заказ


    if (!productId || !amount) {
        return res.status(400).send("Product ID and valid amount are required");
    } else if (!userName) {
        return res.status(400).send('userName are required');
    } else if (!userSurname) {
        return res.status(400).send('userSurname are required');
    } else if (!userEmail) {
        return res.status(400).send('userEmail are required');
    } else if (!userPhone) {
        return res.status(400).send('userPhone are required');
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

validateUserDateils() 

//port env
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

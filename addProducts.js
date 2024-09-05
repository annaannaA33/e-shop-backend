const db = require("./models/database.js");

const insertProducts = () => {
    const products = [
        {
            brand: "Apple",
            title: "iPhone 13 Pro",
            picture: "link",
            color: "Graphite",
            price: 100,
            shortDescription: "some description1",
            isInstock: 10,
        },
        {
            brand: "Samsung",
            title: "Galaxy S21",
            picture: "link",
            color: "Phantom Gray",
            price: 799,
            shortDescription: "some description2",
            isInstock: 20,
        },
        {
            brand: "Sony",
            title: "PlayStation 5",
            picture: "link",
            color: "White",
            price: 499,
            shortDescription: "some description3",
            isInstock: 8,
        },
        {
            brand: "Dell",
            title: "XPS 13",
            picture: "link",
            color: "Silver",
            price: 1200,
            shortDescription: "some description4",
            isInstock: 5,
        },
    ];

    products.forEach((product) => {
        const query = `INSERT INTO products (brand, title, picture, color, price, shortDescription, isInstock) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        db.run(
            query,
            [
                product.brand,
                product.title,
                product.picture,
                product.color,
                product.price,
                product.shortDescription,
                product.isInstock,
            ],
            (err) => {
                if (err) {
                    console.error("Error adding product:", err.message);
                } else {
                    console.log(`product ${product.name} was added to the db.`);
                }
            }
        );
    });
};

insertProducts();

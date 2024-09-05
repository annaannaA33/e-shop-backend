const db = require("./models/database.js");

const insertProducts = () => {
    const products = [
        {
            brand: "Apple",
            title: "iPhone 15",
            picture: "link",
            color: "Graphite",
            price: 100,
            shortDescription:
                "Optional body text lorem ipsum dolor sit amet, consectetur adipiscing eli.",
            stockAmount: 10,
        },
        {
            brand: "Samsung",
            title: "Galaxy S21",
            picture: "link",
            color: "Phantom Gray",
            price: 799,
            shortDescription: "some description2",
            stockAmount: 20,
        },
        {
            brand: "Sony",
            title: "PlayStation 5",
            picture: "link",
            color: "White",
            price: 499,
            shortDescription: "some description3",
            stockAmount: 8,
        },
        {
            brand: "Dell",
            title: "XPS 13",
            picture: "link",
            color: "Silver",
            price: 1200,
            shortDescription: "some description4",
            stockAmount: 5,
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
                product.stockAmount,
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

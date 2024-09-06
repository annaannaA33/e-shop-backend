const db = require("./models/database.js");

const insertProducts = () => {
    const products = [
        {
            brand: "Apple",
            title: "iPhone 15",
            picture: "link",
            color: "Black",
            price: 100,
            shortDescription:
                "Optional body text lorem ipsum dolor sit amet, consectetur adipiscing eli.",
            stockAmount: 10,
        },
        {
            brand: "Apple",
            title: "iPhone 15",
            picture: "link",
            color: "Blue",
            price: 100,
            shortDescription:
                "Optional body text lorem ipsum dolor sit amet, consectetur adipiscing eli.",
            stockAmount: 10,
        },
        {
            brand: "Samsung",
            title: "Galaxy S23 FE",
            picture: "link",
            color: "Black",
            price: 799,
            shortDescription:
                "Optional body text lorem ipsum dolor sit amet, consectetur adipiscing eli.",
            stockAmount: 20,
        },
        {
            brand: "Samsung",
            title: "Galaxy S23 FE",
            picture: "link",
            color: "Blue",
            price: 799,
            shortDescription:
                "Optional body text lorem ipsum dolor sit amet, consectetur adipiscing eli.",
            stockAmount: 20,
        },
        {
            brand: "Sony",
            title: "Xperia 10 V",
            picture: "link",
            color: "Blue",
            price: 499,
            shortDescription:
                "Optional body text lorem ipsum dolor sit amet, consectetur adipiscing eli.",
            stockAmount: 0,
        },
        {
            brand: "Sony",
            title: "Xperia 10 V",
            picture: "link",
            color: "Pink",
            price: 499,
            shortDescription:
                "Optional body text lorem ipsum dolor sit amet, consectetur adipiscing eli.",
            stockAmount: 0,
        },
        {
            brand: "Xiaomi",
            title: "Redmi Note 13",
            picture: "link",
            color: "Black",
            price: 1200,
            shortDescription:
                "Optional body text lorem ipsum dolor sit amet, consectetur adipiscing eli.",
            stockAmount: 5,
        },
        {
            brand: "Xiaomi",
            title: "Redmi Note 13",
            picture: "link",
            color: "Yellow",
            price: 1200,
            shortDescription:
                "Optional body text lorem ipsum dolor sit amet, consectetur adipiscing eli.",
            stockAmount: 5,
        },
        {
            brand: "Xiaomi",
            title: "Redmi Note 13",
            picture: "link",
            color: "Pink",
            price: 1200,
            shortDescription:
                "Optional body text lorem ipsum dolor sit amet, consectetur adipiscing eli.",
            stockAmount: 5,
        },
        {
            brand: "OnePlus",
            title: "Nord 3",
            picture: "link",
            color: "Pink",
            price: 1200,
            shortDescription:
                "Optional body text lorem ipsum dolor sit amet, consectetur adipiscing eli.",
            stockAmount: 5,
        },
        {
            brand: "OnePlus",
            title: "Nord 3",
            picture: "link",
            color: "Black",
            price: 1200,
            shortDescription:
                "Optional body text lorem ipsum dolor sit amet, consectetur adipiscing eli.",
            stockAmount: 5,
        },
    ];

    products.forEach((product) => {
        const query = `INSERT INTO products (brand, title, picture, color, price, shortDescription, stockAmount) VALUES (?, ?, ?, ?, ?, ?, ?)`;
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
                    console.log(
                        `product ${product.title} was added to the db.`
                    );
                }
            }
        );
    });
};

insertProducts();

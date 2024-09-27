const db = require("./models/database.js");

const insertProducts = () => {
    const products = [
        {
            product_type: "Mobile phones",
            brand: "Apple",
            title: "iPhone 15",
            picture: "v1727287302/iPhone_15_Black_albt1z.jpg",
            color: "Black",
            price: 100,
            shortDescription:
                "Optional body text lorem ipsum dolor sit amet, consectetur adipiscing eli.",
            stockAmount: 10,
        },
        {
            product_type: "Mobile phones",
            brand: "Apple",
            title: "iPhone 15",
            picture: "v1727287304/iPhone_15_Blue_shprwr.jpg",
            color: "Blue",
            price: 75,
            shortDescription:
                "Optional body text lorem ipsum dolor sit amet, consectetur adipiscing eli.",
            stockAmount: 10,
        },
        {
            product_type: "Mobile phones",
            brand: "Samsung",
            title: "Galaxy S23 FE",
            picture: "v1727287302/Samsung_Galaxy_S23_FE_Black_akgw4o.jpg",
            color: "Black",
            price: 195,
            shortDescription:
                "Optional body text lorem ipsum dolor sit amet, consectetur adipiscing eli.",
            stockAmount: 20,
        },
        {
            product_type: "Mobile phones",
            brand: "Samsung",
            title: "Galaxy S23 FE",
            picture: "v1727287824/Samsung_Galaxy_S23_FE_Blue_kjns9l.webp",
            color: "Blue",
            price: 599,
            shortDescription:
                "Optional body text lorem ipsum dolor sit amet, consectetur adipiscing eli.",
            stockAmount: 20,
        },
        {
            product_type: "Mobile phones",
            brand: "Sony",
            title: "Xperia 10 V",
            picture: "v1727287302/Sony_Xperia_10_V_Blue_fu3rxl.jpg",
            color: "Blue",
            price: 100,
            shortDescription:
                "Optional body text lorem ipsum dolor sit amet, consectetur adipiscing eli.",
            stockAmount: 0,
        },
        {
            product_type: "Mobile phones",
            brand: "Sony",
            title: "Xperia 10 V",
            picture: "v1727287302/Sony_Xperia_10_V_Green_Sage_Green_wrel9j.jpg",
            color: "Green",
            price: 499,
            shortDescription:
                "Optional body text lorem ipsum dolor sit amet, consectetur adipiscing eli.",
            stockAmount: 0,
        },
        {
            product_type: "Mobile phones",
            brand: "Xiaomi",
            title: "Redmi Note 13",
            picture: "v1727287302/Xiaomi_Redmi_Note_13_Black_rd7bpy.png",
            color: "Black",
            price: 750,
            shortDescription:
                "Optional body text lorem ipsum dolor sit amet, consectetur adipiscing eli.",
            stockAmount: 5,
        },
        {
            product_type: "Mobile phones",
            brand: "Xiaomi",
            title: "Redmi Note 13",
            picture: "v1727287303/Xiaomi_Redmi_Note_13_Yellow_otamvu.png",
            color: "Yellow",
            price: 1300,
            shortDescription:
                "Optional body text lorem ipsum dolor sit amet, consectetur adipiscing eli.",
            stockAmount: 5,
        },
        {
            product_type: "Mobile phones",
            brand: "Xiaomi",
            title: "Redmi Note 13",
            picture: "v1727287990/Xiaomi_Redmi_Note_13_Pink_ha1fx4.webp",
            color: "Pink",
            price: 999,
            shortDescription:
                "Optional body text lorem ipsum dolor sit amet, consectetur adipiscing eli.",
            stockAmount: 5,
        },
        {
            product_type: "Mobile phones",
            brand: "OnePlus",
            title: "Nord 3",
            picture: "v1727287303/OnePlus_Nord_3_Green_Misty_Green_nyd6hk.jpg",
            color: "Green",
            price: 1200,
            shortDescription:
                "Optional body text lorem ipsum dolor sit amet, consectetur adipiscing eli.",
            stockAmount: 5,
        },
        {
            product_type: "Mobile phones",
            brand: "OnePlus",
            title: "Nord 3",
            picture: "v1727287784/OnePlus_Nord_3_Black_grgghu.png",
            color: "Black",
            price: 1100,
            shortDescription:
                "Optional body text lorem ipsum dolor sit amet, consectetur adipiscing eli.",
            stockAmount: 5,
        },
        {
            product_type: "Accessories",
            brand: "Samsung",
            title: "Galaxy Watch6 40mm",
            picture: "v1727288045/f_auto_gxfipm.png",
            color: "Black",
            price: 45,
            shortDescription:
                "Optional body text lorem ipsum dolor sit amet, consectetur adipiscing eli.",
            stockAmount: 5,
        },
        {
            product_type: "Accessories",
            brand: "Samsung",
            title: "Galaxy Watch6 40mm",
            picture: "v1727291642/w_600_1_l5awqr.png",
            color: "White",
            price: 251,
            shortDescription:
                "Optional body text lorem ipsum dolor sit amet, consectetur adipiscing eli.",
            stockAmount: 5,
        },
        {
            product_type: "Accessories",
            brand: "Xiaomi",
            title: "Redmi Buds 4",
            picture: "v1727288044/f_auto_1_avliu6.png",
            color: "Black",
            price: 34,
            shortDescription:
                "Optional body text lorem ipsum dolor sit amet, consectetur adipiscing eli.",
            stockAmount: 5,
        },
        {
            product_type: "Accessories",
            brand: "Apple",
            title: "Airpods Max",
            picture: "v1727288044/w_600_eg26rb.png",
            color: "Silver",
            price: 629,
            shortDescription:
                "Optional body text lorem ipsum dolor sit amet, consectetur adipiscing eli.",
            stockAmount: 5,
        },
    ];

    products.forEach((product) => {
        const query = `INSERT INTO products (product_type, brand, title, picture, color, price, shortDescription, stockAmount) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        db.run(
            query,
            [
                product.product_type,
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

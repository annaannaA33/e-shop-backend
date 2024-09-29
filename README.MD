https://e-shop-backend-ag4c.onrender.com/api/products

## Base URLs

In our project we use the following base URLs for images:

iPhone 15 Black: https://res.cloudinary.com/v1727287302/iPhone_15_Black_albt1z.jpg
iPhone 15 Blue: https://res.cloudinary.com/v1727287304/iPhone_15_Blue_shprwr.jpg
Galaxy S23 FE Black: https://res.cloudinary.com/v1727287302/Samsung_Galaxy_S23_FE_Black_akgw4o.jpg
Galaxy S23 FE Blue: https://res.cloudinary.com/v1727287824/Samsung_Galaxy_S23_FE_Blue_kjns9l.webp
Xperia 10 V Blue: https://res.cloudinary.com/v1727287302/Sony_Xperia_10_V_Blue_fu3rxl.jpg
Xperia 10 V Green: https://res.cloudinary.com/v1727287302/Sony_Xperia_10_V_Green_Sage_Green_wrel9j.jpg
Redmi Note 13 Black: https://res.cloudinary.com/v1727287302/Xiaomi_Redmi_Note_13_Black_rd7bpy.png
Redmi Note 13 Yellow: https://res.cloudinary.com/v1727287303/Xiaomi_Redmi_Note_13_Yellow_otamvu.png
Redmi Note 13 Pink: https://res.cloudinary.com/v1727287990/Xiaomi_Redmi_Note_13_Pink_ha1fx4.webp
Nord 3 Green: https://res.cloudinary.com/v1727287303/OnePlus_Nord_3_Green_Misty_Green_nyd6hk.jpg
Nord 3 Black: https://res.cloudinary.com/v1727287784/OnePlus_Nord_3_Black_grgghu.png
Galaxy Watch6 40mm Black: https://res.cloudinary.com/v1727288045/f_auto_gxfipm.png
Galaxy Watch6 40mm White: https://res.cloudinary.com/v1727291642/w_600_1_l5awqr.png
Redmi Buds 4 Black: https://res.cloudinary.com/v1727288044/f_auto_1_avliu6.png
Airpods Max Silver: https://res.cloudinary.com/v1727288044/w_600_eg26rb.png

host:
http://localhost:3000
or
https://e-shop-backend-ag4c.onrender.com

examples to the the api:

check the filters and sort
http://localhost:3000/api/products?product_type=Accessories&min_price=100&max_price=2000&sort_by=price&order=DESC

to use filters
color, min_price /api/products?color=Black&min_price=0&max_price=100
color /api/products?color=Black
color, brand /api/products?color=Black&brand=OnePlus
product_type /api/products?product_type=Mobile phones

to use filter with more then 1 choses:

2 colors /api/products?color=Black&color=Green&min_price=100&max_price=100&sort_by=price&order=DESC

2 brands /api/products?brand=Apple&brand=Xiaomi&sort_by=price&order=DESC

2 product_type /api/products?product_type=Mobile phones&product_type=Accessories&min_price=100&max_price=1000

Sort by price ascending - api/products?product_type=Accessories&min_price=100&max_price=2000&sort_by=price&order=DESC
Sort by price in descending order - /api/products?sort_by=price&&order=DESC
Sort by popularity ASC /api/products?sort_by=popularity_score&&order=ASC
http://localhost:3000/api/products?product_type=Mobile phones&sort_by=price&order=DESC
http://localhost:3000/api/products?product_type=Mobile phones&min_price=100&max_price=2000&sort_by=popularity_score&order=DESC

---

imports:
npm init --yes
npm audit fix
npm install helmet
npm install express
npm install --save-dev nodem
npm i nodemon
npm install sqlite3
npm install better-sqlite3
npm install dotenv
npm install winston
--

run
nodemon app.js

to add products
node addProducts.js

task:
Lead Form:
Products should be ordered via a Lead form.
Validation added to all fields

Order Confirmation:
Send a confirmation email after a successful order and reduce the stock by 1.
Prevent orders for products that are out of stock.

Back-End Developer:
Build microservice (BFF) which provides these capabilities:
[Product API] Get product details to present in front-end.
[Stock API] Get available stock and managed availability.
[Order API] Create order if there is available stock.
[Event API] Register events which will happen in the system: order created, email send and etc.
Create data base to store products details, stock, orders details, evets and user details.
[Event Orchestrator] Create miroservice which monitors events, sends confirmtion email when the order is created, register event when email is send.
Implement logging so it would be possible to trace system behavior over the time.
Write unit tests for Java microservices using a testing framework such as JUnit.
Extend microservice with capability:

/project-root
│
├── /db # Папка для базы данных
│ └── shop.db # Файл базы данных SQLite
│
├── /routes # Папка с роутами для API
│ └── products.js # Роуты для работы с продуктами
│ └── orders.js # Роуты для работы с заказами
│
├── /controllers # Папка с логикой обработки данных
│ └── productController.js
│ └── orderController.js
│
├── /models # Модели для работы с таблицами базы данных
│ └── productModel.js
│ └── orderModel.js
│
├── /middleware # Мидлвары для валидации и других процессов
│
├── app.js # Основной файл для запуска сервера
├── package.json # Файл с зависимостями проекта
└── README.md

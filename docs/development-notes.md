

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
npm install axios

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
to run the project:
run
nodemon app.js

to add products
`npm run db:populate`


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
Extend microservice with capability


/project-root
│
├── /db
│ └── shop.db
│
├── /routes # routs for the API
│ └── products.js
│ └── orders.js
│
├── /controllers # work with db
│ └── productController.js
│ └── orderController.js
│
├── /models # fill the db
│ └── productModel.js
│ └── orderModel.js
│
├── /middleware # Middleware for validation and other processes
│
├── app.js
├── package.json # Файл с зависимостями проекта
└── README.md


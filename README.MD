npm init --yes
npm audit fix

npm install express
npm install --save-dev nodem
npm i nodemon
npm install sqlite3

npm install better-sqlite3
npm install dotenv
npm install winston
--
run
nodemon index.js

to add products
node addProducts.js

Display all e-shop products on the main e-shop page “Mobile phones and accessories”.

Product card:
Brand
Title
Picture
Color
Price
Short description
Stock availability
Order button

Filters:
Implement filters to sort products.

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

[User API] Manage users.

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

---

check the filters and sort
http://localhost:3000/api/products?product_type=Accessories&min_price=100&max_price=2000&sort_by=price&order=DESC

{
"products": [],
"message": "No products found"
}

// to use filters
// http://localhost:3000/api/products?color=Black&min_price=0&max_price=100
// http://localhost:3000/api/products?color=Black
// http://localhost:3000/api/products?color=Black&brand=OnePlus
// http://localhost:3000/api/products?product_type=Mobile phones
// api/products?product_type=Accessories&min_price=100&max_price=2000

// to use sort

// Sort by price ascending - api/products?product_type=Accessories&min_price=100&max_price=2000&sort_by=price&order=DESC
// Sort by price in descending order - http://localhost:3000/api/products?sort_by=price&&order=DESC
// http://localhost:3000/api/products?sort_by=popularity_score&&order=ASC
// http://localhost:3000/api/products?product_type=Mobile phones&sort_by=price&order=DESC
// http://localhost:3000/api/products?product_type=Mobile phones&min_price=100&max_price=2000&sort_by=popularity_score&order=DESC

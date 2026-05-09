## About:
Full-stack educational project from the Women Go Tech Acceleration program in collaboration with Telia Lithuania.
Cross-functional team project.
I was responsible for the backend part.
---
## Live Demo:
https://teila-e-shop.netlify.app
Note: the backend is hosted on a free Render instance, so the first request may take a few seconds.
---
## Run locally:
git clone https://github.com/annaannaA33/e-shop-backend.git
npm install
npm run db:populate  //to create and fill db
npm run dev
---
## API Base URL
http://localhost:3000
Production: https://e-shop-backend-ag4c.onrender.com
---
## API Example:

https://e-shop-backend-ag4c.onrender.com/api/products

https://e-shop-backend-ag4c.onrender.com/api/products?product_type=Accessories&min_price=100&max_price=2000&sort_by=price&order=DESC

---
## Example endpoints:
Products:
GET/api/products -> returns list of products

GET/api/products?product_type=Accessories&min_price=100&max_price=2000&sort_by=price&order=DESC -> returns sorted list by price ascending

Orders:
POST /api/orders → creates new order
Request body:
{ "productId": 2, "userName": "Anna", "userSurname": "Smith", "userEmail": "anna@gmail.com", "userPhone": "+370..." };
---
## Tech Stack:
Node.js
Express.js
SQLite
Axios
Nodemon
---


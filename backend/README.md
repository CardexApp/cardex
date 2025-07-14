# 🛒 Cardex Backend - E-commerce API

Cardex is a fully-featured e-commerce platform backend developed with Django and Django REST Framework (DRF). It is designed to handle customer orders, inventory management, authentication, and admin analytics.

> 🔐 Secured with JWT authentication and permission control for Admin and Customer roles.

---

## 📌 Project Overview

This backend powers the Cardex online store, which supports:

- Customer registration, login, and profile management  
- Product listing, filtering, and reviews  
- Cart functionality and checkout  
- Order history and returns  
- Admin dashboard with analytics and inventory control  

---

## 🧰 Tech Stack

- **Python** 3.11+
- **Django** 4.x
- **Django REST Framework**
- **JWT Auth** via `djangorestframework-simplejwt`
- **PostgreSQL** or **SQLite**
- **Django Filters**
- **Custom Permissions & Serializers**

---

## 🚀 Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/cardex-backend.git
cd cardex-backend
```

### 2. Create a virtual environment and install dependencies

```bash
python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate
pip install -r requirements.txt
```

### 3. Apply migrations

```bash
python manage.py migrate
```

### 4. Run the development server

```bash
python manage.py runserver
```
  It would be running on your local port 8000: [Localhost port](http://127.0.0.1:8000/admin/)

---

## 🔐 Authentication

JWT Authentication is used.

* `/api/token/` – Obtain JWT token
* `/api/token/refresh/` – Refresh token

---

## 📦 API Endpoints

### 🔹 Authentication

| Method | Endpoint               | Description                       |
| ------ | ---------------------- | --------------------------------- |
| POST   | `/api/register/`       | Register as a customer            |
| POST   | `/api/admin-register/` | Register a new admin (admin only) |
| POST   | `/api/token/`          | Obtain JWT token                  |
| POST   | `/api/token/refresh/`  | Refresh JWT token                 |

### 🔹 User

| Method | Endpoint                | Description     |
| ------ | ----------------------- | --------------- |
| GET    | `/api/profile/`         | View profile    |
| PUT    | `/api/profile/update/`  | Update profile  |
| PUT    | `/api/password/change/` | Change password |

### 🔹 Products & Search

| Method | Endpoint                | Description                |
| ------ | ----------------------- | -------------------------- |
| GET    | `/api/products/`        | Get all products           |
| GET    | `/api/products/<id>/`   | Get product detail         |
| GET    | `/api/products/search/` | Search and filter products |
| GET    | `/api/car-types/`       | List all car types         |

### 🔹 Cart

| Method | Endpoint                 | Description           |
| ------ | ------------------------ | --------------------- |
| GET    | `/api/cart/`             | View user cart        |
| POST   | `/api/cart/add/`         | Add item to cart      |
| DELETE | `/api/cart/remove/<id>/` | Remove item from cart |

### 🔹 Orders

| Method | Endpoint                  | Description                        |
| ------ | ------------------------- | ---------------------------------- |
| POST   | `/api/checkout/`          | Place an order from cart           |
| GET    | `/api/order/`             | View user's past orders            |
| PUT    | `/api/order/return/<id>/` | Request return (only if delivered) |

### 🔹 Reviews

| Method | Endpoint                      | Description                |
| ------ | ----------------------------- | -------------------------- |
| POST   | `/api/reviews/create/`        | Leave a product review     |
| GET    | `/api/products/<id>/reviews/` | List reviews for a product |

### 🔹 Contact

| Method | Endpoint           | Description                 |
| ------ | ------------------ | --------------------------- |
| POST   | `/api/contact-us/` | Send message to admin email |

### 🔹 Admin Only

| Method | Endpoint                | Description                    |
| ------ | ----------------------- | ------------------------------ |
| GET    | `/api/admin/stats/`     | Dashboard summary & analytics  |
| GET    | `/api/admin/analytics/` | Advanced sales/order analytics |
| CRUD   | `/api/admin/products/`  | Manage products                |
| CRUD   | `/api/admin/users/`     | Manage users                   |
| CRUD   | `/api/admin/orders/`    | View/update orders             |
| CRUD   | `/api/admin/car-types/` | Manage car types               |
| CRUD   | `/api/admin/makes/`     | Manage car brands              |

---

## 📊 Features

* JWT-based secure authentication
* Custom permissions (`IsAdminUser`, `IsAuthenticated`, `IsStaff`)
* Fully RESTful design with DRF serializers
* Advanced product filtering (price, type, transmission, year, etc.)
* Admin dashboard for real-time metrics
* Inventory tracking and auto-updating
* Return request flow for customers
* Contact form with email integration


---

## 📁 Folder Structure (Simplified)

```
cardex-backend/
├── cardex-backend/
│   ├── media
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── store/
│   ├──migations
│   ├── templates
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── permissions.py
│   ├── views.py
│   ├── serializers.py
│   ├── tests.py
│   ├── urls.py
├── manage.py
├── locustfile.py
├── requirements.txt
└── README.md
```

---

## 🧪 Testing


# 🧪 Testing Guide

## 🚀 Unit Tests (Django)

This project uses Django's built-in test runner to execute **unit and integration tests**.

### ✅ Run all tests
bash
python manage.py test --keepdb
- `--keepdb` preserves the test database between runs, speeding up repeated tests.

### ✅ Run a specific test case or method
bash
python manage.py test store.tests.AuthenticatedCheckoutTest --keepdb
Example output:
Ran 15 tests in 20.3s
OK

---

## ⚡ Performance Testing (Locust)

We use [Locust](https://locust.io/) to run load tests, simulating concurrent users and tracking the performance of critical API endpoints.

---

### ⚙️ 1. Install Locust
Ensure Locust is installed inside your virtual environment:
bash
pip install locust

---

### 📂 2. The `locustfile.py`

This repo includes a `locustfile.py` that:
- Logs in to obtain a JWT token.
- Loads `/api/products/`.
- Adds items to `/api/cart/add/`.
- Can perform guest checkouts (comment/uncomment as needed).

---

### 🚀 3. Running Locust

#### 🖥️ First terminal: start your Django server
bash
python manage.py runserver

#### 🖥️ Second terminal: activate your virtual environment & run Locust

Make sure you are in the project root. Then:

**For macOS / Linux:**
bash
source venv/bin/activate

**For Windows:**
cmd
venv\Scripts\activate

Then start Locust:
bash
locust -f locustfile.py --host=http://127.0.0.1:8000

---

### 🌐 4. Open the Locust Web UI

Navigate in your browser to:
http://localhost:8089
There you can:
- Set the **number of total users** (e.g. `50`)
- Set the **spawn rate** (users spawned per second, e.g. `5`)
- Click **Start swarming** to begin the load test.

---

## 🔥 Notes
- Tests are currently hard-coded to use `product_id=6`. Make sure this exists in your database, or adjust it.
- The performance test prints detailed debug logs for each endpoint call, so you can easily spot errors.
- Use `--keepdb` to speed up repeated Django unit tests.

---


## 🙌 Credits

Developed by the Cardex Team
Computer Science Team Project — CS4870
Aston University

---

## 🌐 Useful Links

Postman Documentation: [Public Postman Documentation](https://documenter.getpostman.com/view/30404283/2sB34hFzzz)
Live URL : [Url to access the hosted version](https://sparkling-chelsae-cardex-cd058300.koyeb.app/)

---

# Cardex Backend API (For frontend)

Base URL: `https://sparkling-chelsae-cardex-cd058300.koyeb.app/`

## Endpoints

### 🔹 Register/SignUp

- `POST /api/register/`  
  Create an account.

- `POST /api/login/`  
  Log into your account.

- `POST /api/token/refresh`  
  Refreh you Access token.

### 🔹 Products

- `GET /api/products/`  
  List all products.

- `GET /api/products/<id>/`  
  Retrieve product details by ID.

### 🔹 Checkout

- `POST /api/guest-checkout/`  
  Guest Checkout.

### 🔹 Car Types

- `GET /api/car-types/`
  List all car types.


### 🔹 Search, Sort, and Filter Guide

**Base Endpoint:**
- `GET https://sparkling-chelsae-cardex-cd058300.koyeb.app/products/search/`

This endpoint supports search, ordering, and filtering through query parameters. Below are examples and descriptions of how to use it:


####  Search Products

Search for products using a keyword in any relevant field

- `GET /api/products/search/?search=toyota`
  Returns all products that contain “toyota” in searchable fields.


####  Sort Products

Sort products based on a specific field.

- `GET /api/products/search/?ordering=price`
  Lists products from lowest to highest price.

- `GET /api/products/search/?ordering=-price`
  Lists products from highest to lowest price.


####  Search + Sort Combined

- `GET /api/products/search/?search=sedan&ordering=-model_year`
  Search for products with "sedan" and sort them by model year (newest first).


####  Filter Products

- `GET /api/products/search/?price=20000`
  Returns products that cost exactly 20,000.

- `GET /api/products/search/?price__gte=10000&price__lte=30000`
  Returns products with prices between 10,000 and 30,000.

- `GET /api/products/search/?car_type__name=sedan`
  Returns only products classified as "sedan".

- `GET /api/products/search/?make__name=Toyota`
  Returns only products with the make "Toyota".

- `GET /api/products/search/?make__name=Toyota&price=20000'`
  Returns Toyota cars priced exactly at 20,000.


You can chain any of the above query parameters to customize search results for your frontend. For example, to search for "SUV" vehicles made by "Honda" under 30,000:

`GET /api/products/search/?search=suv&make__name=Honda&price__lte=30000`





# For Backend Devs Only

1. create VE
2. activate VE


python3 -m venv venv 
source venv/bin/activate 
pip3 install django
pip freeze > requirements.txt

Create/Update tables in database:
    python manage.py makemigrations
    python manage.py migrate


Create Super user(to access admin)
    python manage.py createsuperuser

Run the Server:
    python manage.py runserver

Admin Site:
    http://127.0.0.1:8000/admin/


## How to use the search endpoint for both searching and filtering

    Search:
    http://127.0.0.1:8000/api/products/search/?search=toyota
    
    Order/Sort::
    http://127.0.0.1:8000/api/products/search/?ordering=price -- (lowest to highest)
    http://127.0.0.1:8000/api/products/search/?ordering=-price -- (highest to lowest)
    
    Search & Order/Sort:
    http://127.0.0.1:8000/api/products/search/?search=sedan&ordering=-model_year

    Filter:
    http://127.0.0.1:8000/api/products/search/?price=20000 → exact match
    http://127.0.0.1:8000/api/products/search/?price__gte=10000&price__lte=30000 → price between 10k and 30k
    http://127.0.0.1:8000/api/products/search/?car_type__name=sedan → exact match for car type
    http://127.0.0.1:8000/api/products/search/?make__name=Toyota → filter by make
    http://127.0.0.1:8000/api/products/search/?make__name=Toyota&price=20000 → filter by make and price

https://sparkling-chelsae-cardex-cd058300.koyeb.app/
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

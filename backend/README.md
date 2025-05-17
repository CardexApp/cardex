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


Creating Fixtures(So that we would be able to have thesame data in our database locally)
    

    Step 1: Add Sample Data (in your local admin or with code)
    Use the Django admin to add products, car types, etc. locally after running migrations.

    Step 2: Create a fixtures folder
    mkdir store/fixtures


    Step 3: Export the Data
    You can export data from any app or model using:
    
    `python manage.py dumpdata store > store/fixtures/initial_data.json`

    * `store` is your app name
    * This creates a JSON file with all the data from your app
    * Save the file inside a `fixtures` folder in your app



    Step 4: Commit That File to Git

    Add and push `initial_data.json` like this:

    `
    git add store/fixtures/initial_data.json
    git commit -m "Add fixture for sample data"
    git push
    `

    Step 5: Other People Can Load It
    Once your teammate pulls the project, they can:

    `python manage.py migrate`
    `python manage.py loaddata store/fixtures/initial_data.json`

    This will **populate their local database** with the exact same data you exported — users, products, etc.


    Summary
    Export data  `python manage.py dumpdata store > store/fixtures/initial_data.json` 
    Load data   `python manage.py loaddata store/fixtures/initial_data.json`         


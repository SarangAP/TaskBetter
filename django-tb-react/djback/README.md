# Setup
1. Make a python virtual environemnt and activate it
2. Run `pip install -r requirements.txt`
3. Run `python manage.py makemigrations` and `python manage.py migrate`

# Running
1. In `djback/settings.py`, go to DATABASES and change the line `'PASSWORD' : '<some password>'` to match your MySQL password
2. Run `python manage.py runserver` to bring the server up on localhost:8000

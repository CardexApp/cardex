#!/usr/bin/env bash
set -o errexit

pip install -r requirements.txt

# convert static asset files
python manage.py collectstatic --no-input

# apply any outstanding migrations
python manage.py migrate
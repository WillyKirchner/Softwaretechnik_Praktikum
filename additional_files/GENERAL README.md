# How to start each part of the project

## How to run the docker-image

- have docker installed
- cd to root directory
- run `docker-compose up -d --build` in terminal
- After that, localhost:3000 should be frontend, localhost:5000 Swagger-UI and localhost:9090 phpmyadmin
- a Dummy login, which should work, is name: 'Arbeiter1' and password: 'Passwort1'

## Notes

- Mapping for Swagger-UI and phpmyadmin could be removed for deployment
- username & password for phpmyadmin: root
- to inspect the Backend, use Swagger

## User Client

- is implemented with python
- you need to install the libraries "kivy" "opencv-python" "pillow" "pyzbar"
- then start the application main.py in /userClient

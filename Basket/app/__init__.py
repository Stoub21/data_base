from flask import Flask
from flask_sqlalchemy import SQLAlchemy

with open("config.txt", "r") as file:
    config = file.readlines()
config_dict = dict(line.strip().split(" = ") for line in config if line.strip())
required_keys = ["dbname", "user", "password", "host", "port"]

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{config_dict["user"]}:{config_dict["password"]}@{config_dict["host"]}/{config_dict["dbname"]}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

from app import routes

routes.create_schema_and_data()
import os
from dotenv import load_dotenv
import flask
import flask_sqlalchemy

app = flask.Flask(
    __name__,
    instance_relative_config=False,
    static_folder="../build/static",
    template_folder="../build"
)

load_dotenv()

app.secret_key = os.getenv("SECRET_KEY", "DEFAULT_KEY")
app.config["SESSION_TYPE"] = "filesystem"
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///database.db")
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = flask_sqlalchemy.SQLAlchemy(app)

with app.app_context():
    import server.routes as route
    app.register_blueprint(route.main_route)

import server.models
import server.routes
import server.utils

import os

from server import app, db
from flask_migrate import Migrate

migrate = Migrate(app, db)

if __name__ == "__main__":
    app.run(
        host=getenv("IP", "0.0.0.0"),
        port=int(getenv("PORT", "80")),
        debug=getenv("DEBUG", False),
    )

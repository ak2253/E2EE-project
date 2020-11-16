import json

from flask import request, session
from server import app, db
from server.models.user import User
from server.models.login import Login
from server.utils.hash_salt import compare_plain_hash
from server.routes.signup import same_username

def get_pwd(username):
    query = db.session.query(Login).filter(Login.username == username).one()
    return query.password

def get_id(username):
    query = db.session.query(User).filter(User.username == username).one()
    return query.id

@app.route("/api/login", methods=["POST"])
def login():
    try:
        data = json.loads(request.data)
        username = data['username']
        password = data['password']

        if (same_username(username) is False or compare_plain_hash(get_pwd(username),password) is False):
            return {
                "success": False,
                "message": "Username does not exist or password does not match username. Please try again."
            }
        
        session["id"] = get_id(username)

        return {"success": True, "user_id": session["id"]}
    except json.decoder.JSONDecodeError:
        return {"error": "Malformed request"}, 400

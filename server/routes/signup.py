import json

from flask import request, session
from server import app, db
from server.models.user import User
from server.models.login import Login
from server.utils.hash_salt import hash_salt_password

def same_username(username):
    return User.query.filter_by(username=username).scalar() is not None

@app.route("/api/signup", methods=["POST"])
def sign_up():
    try:
        data = json.loads(request.data)
        username = data['username']
        password = data['password']
        if same_username(username):
            return {
                "success": False,
                "message": "Username, " + username + " has already taken. Please try another username"
            }
        
        user = User(username=username)
        login = Login(username=username, password=password)
        db.session.add(user)
        db.session.add(login)
        db.session.commit()
        
        session["id"] = user.id

        return {"success": True}
    except json.decoder.JSONDecodeError:
        return {"error": "Malformed request"}, 400

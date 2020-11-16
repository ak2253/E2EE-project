import json

from server import app, db
from flask import request, session
from server.models.user import User

def get_username(id):
    query = db.session.query(User).filter(User.id == id).one()
    return query.username

@app.route("/api/message/input", methods=["POST"])
def addMessage():
    try:
        data = json.loads(request.data)
        user_to = data['to']
        message = data['message']
        user_from = get_username(session["id"])
        print(data, user_from)
        return {"success": True}
    except json.decoder.JSONDecoderError:
        return {"error": "Malformed request"}, 400
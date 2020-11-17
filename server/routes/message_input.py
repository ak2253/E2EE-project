import json

from server import app, db
from flask import request, session
from server.models.user import User
from server.models.message import Message

def get_username(id):
    query = db.session.query(User).filter(User.id == id).one()
    return query.username

@app.route("/api/message/input", methods=["POST"])
def addMessage():
    try:
        data = json.loads(request.data)
        user_to = data['to']
        message = data['message']
        if len(message) > 255:
            return {
                "success": False,
                "message": "Message exceeds 255 character limit."
            }
        user_from = get_username(session["id"])
        
        message_class = Message(username_to = user_to, username_from = user_from, message = message)
        db.session.add(message_class)
        db.session.commit()
        
        return {"success": True}
    except json.decoder.JSONDecoderError:
        return {"error": "Malformed request"}, 400
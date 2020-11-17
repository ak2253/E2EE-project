import json

from server import app, db
from flask import request, session
from server.models.user import User
from server.models.message import Message

def get_username(id):
    query = db.session.query(User).filter(User.id == id).one()
    return query.username

def get_messages_history(username1, username2):
    query_all = db.session.query(Message).all()
    filtered_query = []
    for row in query_all:
        if ((row.username_to == username1 and row.username_from == username2) or 
        (row.username_to == username2 and row.username_from == username1)):
            filtered_query.append({
                "id": row.id,
                "username_from": row.username_from,
                "message": row.message
            })
    return filtered_query

@app.route("/api/message/input", methods=["POST"])
def add_message():
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
        
        nMessages = get_messages_history(user_from, user_to)

        return {
            "success": True, 
            "messages": nMessages
        }
    except json.decoder.JSONDecoderError:
        return {"error": "Malformed request"}, 400
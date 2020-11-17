import json

from server import app, db
from flask import request, session
from server.models.message import Message
from server.routes.message_input import get_username

def get_messages(username1, username2):
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

@app.route("/api/message", methods=["POST"])
def get_messages():
    try:
        data = json.loads(request.data)
        username1 = data["to"]
        username2 = get_username(session["id"])
        message_history = get_messages(username1, username2)
        return {
            "success": True,
            "messages": message_history
        }
    except json.decoder.JSONDecoderError:
        return {"error": "Malformed request"}, 400

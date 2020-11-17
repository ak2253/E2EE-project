import json

from server import app, db
from flask import request, session
from server.models.message import Message
from server.routes.message_input import get_username, get_messages_history
from sqlalchemy.orm.exc import NoResultFound

@app.route("/api/message", methods=["POST"])
def get_messages():
    try:
        data = json.loads(request.data)
        username1 = data["to"]
        username2 = get_username(session["id"])
        message_history = []
        try:
            message_history = get_messages_history(username1, username2)
        except NoResultFound:
            return {
                "success": False,
                "messages": []
            }
        return {
            "success": True,
            "messages": message_history
        }
    except json.decoder.JSONDecoderError:
        return {"error": "Malformed request"}, 400

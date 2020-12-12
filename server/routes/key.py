import json

from flask import Blueprint, request, session

key_route = Blueprint(
    "key_route",
    __name__,
)

@key_route.route("/api/localkey", methods=["POST"])
def store_local_key():
    try:
        data = json.loads(request.data)
        private_key = data['private']
        session['private_key'] = private_key
        return {"success": True}

    except json.decoder.JSONDecodeError:
        return {"error": "Malformed request"}, 400

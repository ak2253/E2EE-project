import datetime

from server import db

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username_to = db.Column(db.String(255))
    username_from = db.Column(db.String(255))
    message = db.Column(db.String(500))
    time_sent = db.Column(db.DateTime, default=datetime.datetime.utcnow())

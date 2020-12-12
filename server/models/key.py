from server import db

class Key(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    public = db.Column(db.String(2048))
    private = db.Column(db.String(2048))

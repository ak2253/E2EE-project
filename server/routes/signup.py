import json

from flask import request, session
from server import app, db
from server.models.user import User
from server.models.login import Login
from server.utils.hash_salt import hash_pass

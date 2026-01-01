import jwt
from functools import wraps
from flask import request, jsonify

SECRET = "SECRET_KEY"

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization")
        if not token:
            return jsonify({"error": "Token missing"}), 401
        try:
            data = jwt.decode(token, SECRET, algorithms=["HS256"])
            return f(data["id"], *args, **kwargs)
        except:
            return jsonify({"error": "Invalid token"}), 401
    return decorated

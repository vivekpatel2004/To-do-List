from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from mysql.connector import IntegrityError

from db import get_db
from auth import token_required, SECRET

app = Flask(__name__)
CORS(app)

@app.route("/register", methods=["POST"])
def register():
    data = request.json
    conn = get_db()
    cur = conn.cursor()

    try:
        cur.execute(
            "INSERT INTO users (email, password) VALUES (%s,%s)",
            (data["email"], generate_password_hash(data["password"]))
        )
        conn.commit()

        user_id = cur.lastrowid
        token = jwt.encode({"id": user_id}, SECRET, algorithm="HS256")

        return jsonify({
            "message": "User registered",
            "token": token
        }), 201

    except IntegrityError:
        conn.rollback()
        return jsonify({"error": "Email already registered"}), 400

    finally:
        cur.close()
        conn.close()


@app.route("/login", methods=["POST"])
def login():
    data = request.json
    conn = get_db()
    cur = conn.cursor(dictionary=True)

    try:
        cur.execute("SELECT * FROM users WHERE email=%s", (data["email"],))
        user = cur.fetchone()

        if not user or not check_password_hash(user["password"], data["password"]):
            return jsonify({"error": "Invalid credentials"}), 401

        token = jwt.encode({"id": user["id"]}, SECRET, algorithm="HS256")
        return jsonify({"token": token})

    finally:
        cur.close()
        conn.close()


# ---------- TODOS ----------
@app.route("/todos", methods=["GET"])
@token_required
def get_todos(user_id):
    conn = get_db()
    cur = conn.cursor(dictionary=True)

    try:
        cur.execute("SELECT * FROM todos WHERE user_id=%s", (user_id,))
        return jsonify(cur.fetchall())

    finally:
        cur.close()
        conn.close()


@app.route("/todos", methods=["POST"])
@token_required
def add_todo(user_id):
    title = request.json["title"]
    conn = get_db()
    cur = conn.cursor()

    try:
        cur.execute(
            "INSERT INTO todos (user_id, title) VALUES (%s,%s)",
            (user_id, title)
        )
        conn.commit()
        return jsonify({"message": "Added"}), 201

    finally:
        cur.close()
        conn.close()


@app.route("/todos/<int:id>", methods=["PUT"])
@token_required
def update(user_id, id):
    data = request.json
    conn = get_db()
    cur = conn.cursor()

    try:
        cur.execute(
            "UPDATE todos SET title=%s, completed=%s WHERE id=%s AND user_id=%s",
            (data["title"], data["completed"], id, user_id)
        )
        conn.commit()
        return jsonify({"message": "Updated"})

    finally:
        cur.close()
        conn.close()


@app.route("/todos/<int:id>", methods=["DELETE"])
@token_required
def delete(user_id, id):
    conn = get_db()
    cur = conn.cursor()

    try:
        cur.execute(
            "DELETE FROM todos WHERE id=%s AND user_id=%s",
            (id, user_id)
        )
        conn.commit()
        return jsonify({"message": "Deleted"})

    finally:
        cur.close()
        conn.close()


if __name__ == "__main__":
    app.run(debug=True)

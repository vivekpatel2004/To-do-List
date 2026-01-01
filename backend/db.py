import mysql.connector

def get_db():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="VVcc@4591",
        database="todo_pro"
    )

from dotenv import load_dotenv
import mysql.connector
import os

# Load .env file
load_dotenv()

def get_db():
    return mysql.connector.connect(
        host=os.getenv("MYSQLHOST"),
        user=os.getenv("MYSQLUSER"),
        password=os.getenv("MYSQL_ROOT_PASSWORD"),
        database=os.getenv("MYSQL_DATABASE"),
        port=int(os.getenv("MYSQLPORT"))
    )

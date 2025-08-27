import psycopg2



def get_db_connection():
    DB_NAME = "restaurant"
    USER = "postgres" 
    PASSWORD = "root" 
    HOST = "localhost"
    PORT = "5432"
    conn = psycopg2.connect(
        host = HOST,
        database = DB_NAME,
        user = USER,
        password= PASSWORD,
        port= PORT
    )

    return conn


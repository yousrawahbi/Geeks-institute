import psycopg2
from psycopg2.extras import RealDictCursor
import os

def get_db_connection():
    conn = psycopg2.connect(
        host=os.environ.get('DB_HOST', 'localhost'),
        database=os.environ.get('DB_NAME', 'school'),
        user=os.environ.get('DB_USER', 'postgres'),
        password=os.environ.get('DB_PASSWORD', 'root'),
        port=os.environ.get('DB_PORT', '5432')
    )
    return conn

def init_db():
    """Initialize the database with schema and sample data"""
    conn = get_db_connection()
    cur = conn.cursor()
    
    # Read and execute the seed SQL file
    with open('database/seed/seed_data.sql', 'r') as f:
        sql_commands = f.read()
    
    # Execute each command separately
    for command in sql_commands.split(';'):
        if command.strip():
            cur.execute(command)
    
    conn.commit()
    cur.close()
    conn.close()
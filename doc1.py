from flask import Flask, request, jsonify
import psycopg2
inst=Flask(__name__)

def get_db_connection():
    conn= psycopg2.connect(
            host='localhost',
            database='mydt',
            user='postgres',
            password='root',
            port='5432'
        )
    return conn

@inst.route('/')
def fnc():
    return 'Welcome to our page'

if __name__ == '__main__':
    inst.run(debug=True,port=5001)
    
    


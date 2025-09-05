from flask import Flask, render_template, request, redirect, url_for # type: ignore
import psycopg2
from psycopg2 import Error
from config import get_db_connection

app = Flask(__name__)



def check_connexion():
    """Create and return a database connection"""
    try:
        conn = get_db_connection()
        return conn
    except Error as e:
        print(f"Error connecting to PostgreSQL: {e}")
        return None

@app.route('/')
def index():
    return redirect(url_for('menu'))

@app.route('/menu',methods=['GET'])
def menu():
    """Display all menu items"""
    conn = check_connexion()
    if conn is None:
        return "Database connection failed", 500
    
    try:
        cursor = conn.cursor()
        cursor.execute("SELECT item_id, item_name, item_price FROM menu_items ORDER BY item_id;")
        items = cursor.fetchall()
        cursor.close()
        conn.close()
        return render_template('menu.html', items=items)
    except Error as e:
        print(f"Error fetching menu items: {e}")
        return "Error fetching menu items", 500

@app.route('/add', methods=['GET', 'POST'])
def add_item():
    """Add a new menu item"""
    if request.method == 'POST':
        name = request.form['name']
        price = request.form['price']
        
        if not name or not price:
            return "Name and price are required", 400
        
        try:
            price = float(price)
        except ValueError:
            return "Price must be a number", 400
        
        conn = check_connexion()
        if conn is None:
            return "Database connection failed", 500
        
        try:
            cursor = conn.cursor()
            cursor.execute(
                "INSERT INTO menu_items (item_name, item_price) VALUES (%s, %s);",
                (name, price)
            )
            conn.commit()
            cursor.close()
            conn.close()
            return redirect(url_for('menu'))
        except Error as e:
            print(f"Error adding item: {e}")
            return "Error adding item", 500
    
    return render_template('add_item.html')

@app.route('/delete/<int:item_id>')
def delete_item(item_id):
    """Delete a menu item by ID"""
    conn = check_connexion()
    if conn is None:
        return "Database connection failed", 500
    
    try:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM menu_items WHERE item_id = %s;", (item_id,))
        conn.commit()
        cursor.close()
        conn.close()
        return redirect(url_for('menu'))
    except Error as e:
        print(f"Error deleting item: {e}")
        return "Error deleting item", 500

@app.route('/update/<int:item_id>', methods=['GET', 'POST'])
def update_item(item_id):
    """Update a menu item"""
    conn = check_connexion()
    if conn is None:
        return "Database connection failed", 500
    
    if request.method == 'POST':
        name = request.form['name']
        price = request.form['price']
        
        if not name or not price:
            return "Name and price are required", 400
        
        try:
            price = float(price)
        except ValueError:
            return "Price must be a number", 400
        
        try:
            cursor = conn.cursor()
            cursor.execute(
                "UPDATE menu_items SET item_name = %s, item_price = %s WHERE item_id = %s;",
                (name, price, item_id)
            )
            conn.commit()
            cursor.close()
            conn.close()
            return redirect(url_for('menu'))
        except Error as e:
            print(f"Error updating item: {e}")
            return "Error updating item", 500
    
    # GET request - fetch the item to update
    try:
        cursor = conn.cursor()
        cursor.execute("SELECT item_id, item_name, item_price FROM menu_items WHERE item_id = %s;", (item_id,))
        item = cursor.fetchone()
        cursor.close()
        conn.close()
        
        if item is None:
            return "Item not found", 404
        
        return render_template('update_item.html', item=item)
    except Error as e:
        print(f"Error fetching item: {e}")
        return "Error fetching item", 500

if __name__ == '__main__':
    app.run(debug=True)
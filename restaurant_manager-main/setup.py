
"""
PostgreSQL Database Setup Script for Restaurant Management System
Run this script to create the database and tables with sample data.
"""

import psycopg2
import psycopg2.extras
import os
import sys
from datetime import datetime

# Database configuration
DB_CONFIG = {
    'host': os.getenv('DB_HOST', 'localhost'),
    'user': os.getenv('DB_USER', 'postgres'),
    'password': os.getenv('DB_PASSWORD', 'root'),
    'port': os.getenv('DB_PORT', '5432')
}

DB_NAME = os.getenv('DB_NAME', 'restaurant_db')

def create_database():
    """Create the restaurant database if it doesn't exist"""
    try:
        # Connect to PostgreSQL server (not specific database)
        conn = psycopg2.connect(**DB_CONFIG)
        conn.autocommit = True
        cur = conn.cursor()
        
        # Check if database exists
        cur.execute("SELECT 1 FROM pg_database WHERE datname = %s", (DB_NAME,))
        exists = cur.fetchone()
        
        if not exists:
            cur.execute(f'CREATE DATABASE "{DB_NAME}"')
            print(f"✅ Database '{DB_NAME}' created successfully!")
        else:
            print(f"ℹ️  Database '{DB_NAME}' already exists.")
        
        cur.close()
        conn.close()
        return True
        
    except psycopg2.Error as e:
        print(f"❌ Error creating database: {e}")
        return False

def setup_tables_and_data():
    """Create tables and insert sample data"""
    try:
        # Connect to the specific database
        config = DB_CONFIG.copy()
        config['database'] = DB_NAME
        conn = psycopg2.connect(**config)
        cur = conn.cursor()
        
        print("📋 Creating tables...")
        
        # Drop existing tables (for fresh setup)
        drop_tables = [
            "DROP TABLE IF EXISTS orders CASCADE",
            "DROP TABLE IF EXISTS menu_item_chefs CASCADE", 
            "DROP TABLE IF EXISTS menu_items CASCADE",
            "DROP TABLE IF EXISTS chefs CASCADE",
            "DROP TABLE IF EXISTS categories CASCADE"
        ]
        
        for drop_sql in drop_tables:
            cur.execute(drop_sql)
        
        # Create tables
        tables = [
            # Categories table (secondary entity)
            '''CREATE TABLE categories (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) UNIQUE NOT NULL,
                description TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )''',
            
            # Chefs table (secondary entity)
            '''CREATE TABLE chefs (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                specialty VARCHAR(100),
                experience_years INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )''',
            
            # Menu items table (primary entity)
            '''CREATE TABLE menu_items (
                id SERIAL PRIMARY KEY,
                name VARCHAR(200) NOT NULL,
                description TEXT,
                price DECIMAL(10,2) NOT NULL,
                category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
                is_available BOOLEAN DEFAULT TRUE,
                prep_time INTEGER DEFAULT 15,
                image_url VARCHAR(500),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )''',
            
            # Many-to-many relationship: menu items and chefs
            '''CREATE TABLE menu_item_chefs (
                id SERIAL PRIMARY KEY,
                menu_item_id INTEGER REFERENCES menu_items(id) ON DELETE CASCADE,
                chef_id INTEGER REFERENCES chefs(id) ON DELETE CASCADE,
                UNIQUE(menu_item_id, chef_id)
            )''',
            
            # Orders table for statistics
            '''CREATE TABLE orders (
                id SERIAL PRIMARY KEY,
                menu_item_id INTEGER REFERENCES menu_items(id) ON DELETE CASCADE,
                quantity INTEGER DEFAULT 1,
                order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                customer_name VARCHAR(100),
                status VARCHAR(50) DEFAULT 'pending',
                total_price DECIMAL(10,2)
            )'''
        ]
        
        for table_sql in tables:
            cur.execute(table_sql)
            
        print("✅ Tables created successfully!")
        
        # Insert sample data
        print("📊 Inserting sample data...")
        
        # Categories
        categories_data = [
            ('Appetizers', 'Start your meal with these delicious appetizers'),
            ('Main Courses', 'Hearty and satisfying main dishes'),
            ('Desserts', 'Sweet treats to end your meal perfectly'),
            ('Beverages', 'Refreshing drinks and beverages'),
            ('Salads', 'Fresh and healthy salad options'),
            ('Soups', 'Warm and comforting soups'),
            ('Pasta', 'Italian pasta dishes'),
            ('Seafood', 'Fresh seafood specialties'),
            ('Vegetarian', 'Plant-based delicious options'),
            ('Grilled', 'Grilled specialties')
        ]
        cur.executemany('INSERT INTO categories (name, description) VALUES (%s, %s)', categories_data)
        print("✅ Categories inserted!")
        
        # Chefs
        chefs_data = [
            ('Marco Rodriguez', 'Italian Cuisine', 12),
            ('Sarah Kim', 'Asian Fusion', 8),
            ('James Wilson', 'French Cuisine', 15),
            ('Maria Garcia', 'Mexican Cuisine', 10),
            ('David Chen', 'Chinese Cuisine', 9),
            ('Isabella Rossi', 'Mediterranean', 11),
            ('Ahmed Hassan', 'Middle Eastern', 7),
            ('Emily Johnson', 'Pastry Chef', 6),
            ('Carlos Mendez', 'Grill Master', 14),
            ('Anna Petrov', 'Vegetarian Specialist', 5)
        ]
        cur.executemany('INSERT INTO chefs (name, specialty, experience_years) VALUES (%s, %s, %s)', chefs_data)
        print("✅ Chefs inserted!")
        
        # Menu items
        menu_items_data = [
            ('Caesar Salad', 'Fresh romaine lettuce with parmesan cheese and croutons', 12.99, 5, True, 10),
            ('Grilled Salmon', 'Atlantic salmon with lemon herb seasoning', 24.99, 8, True, 25),
            ('Chocolate Lava Cake', 'Warm chocolate cake with molten center', 8.99, 3, True, 15),
            ('Margherita Pizza', 'Classic pizza with fresh mozzarella and basil', 16.99, 2, True, 20),
            ('Beef Burger', 'Juicy beef patty with lettuce, tomato, and cheese', 14.99, 2, True, 15),
            ('Tom Yum Soup', 'Spicy Thai soup with shrimp and mushrooms', 9.99, 6, True, 12),
            ('Pasta Carbonara', 'Creamy pasta with bacon and parmesan', 18.99, 7, True, 18),
            ('Grilled Chicken Breast', 'Herb-marinated chicken with vegetables', 19.99, 10, True, 22),
            ('Vegetarian Buddha Bowl', 'Quinoa, roasted vegetables, and tahini dressing', 15.99, 9, True, 15),
            ('Tiramisu', 'Classic Italian dessert with coffee and mascarpone', 7.99, 3, True, 5),
            ('Fresh Orange Juice', 'Freshly squeezed orange juice', 4.99, 4, True, 3),
            ('Mushroom Risotto', 'Creamy risotto with wild mushrooms', 17.99, 9, True, 25),
            ('Fish and Chips', 'Beer-battered cod with crispy fries', 16.99, 8, True, 20),
            ('Chicken Wings', 'Spicy buffalo wings with blue cheese dip', 11.99, 1, True, 12),
            ('Greek Salad', 'Traditional Greek salad with feta cheese', 13.99, 5, True, 8)
        ]
        cur.executemany('''INSERT INTO menu_items (name, description, price, category_id, is_available, prep_time) 
                          VALUES (%s, %s, %s, %s, %s, %s)''', menu_items_data)
        print("✅ Menu items inserted!")
        
        # Chef assignments (many-to-many)
        chef_assignments = [
            (1, 5), (2, 9), (3, 8), (4, 1), (5, 9), (6, 2),
            (7, 1), (8, 9), (9, 10), (10, 8), (11, 4), (12, 1),
            (13, 9), (14, 9), (15, 10)
        ]
        cur.executemany('INSERT INTO menu_item_chefs (menu_item_id, chef_id) VALUES (%s, %s)', chef_assignments)
        print("✅ Chef assignments inserted!")
        
        # Sample orders for statistics
        orders_data = [
            (1, 2, 'John Doe', 'completed', 25.98),
            (2, 1, 'Jane Smith', 'completed', 24.99),
            (3, 3, 'Bob Johnson', 'completed', 26.97),
            (4, 1, 'Alice Brown', 'pending', 16.99),
            (5, 2, 'Charlie Davis', 'completed', 29.98),
            (1, 1, 'Eva Wilson', 'completed', 12.99),
            (7, 1, 'Frank Miller', 'completed', 18.99),
            (8, 2, 'Grace Lee', 'completed', 39.98),
            (9, 1, 'Henry Clark', 'completed', 15.99),
            (10, 2, 'Iris Martinez', 'completed', 15.98),
            (11, 3, 'Jack Thompson', 'completed', 14.97),
            (12, 1, 'Kate Rodriguez', 'pending', 17.99),
            (13, 1, 'Liam Anderson', 'completed', 16.99),
            (14, 4, 'Maya Patel', 'completed', 47.96),
            (15, 2, 'Noah Williams', 'completed', 27.98)
        ]
        cur.executemany('''INSERT INTO orders (menu_item_id, quantity, customer_name, status, total_price) 
                          VALUES (%s, %s, %s, %s, %s)''', orders_data)
        print("✅ Sample orders inserted!")
        
        # Commit all changes
        conn.commit()
        print("\n🎉 Database setup completed successfully!")
        print(f"📊 Summary:")
        print(f"   • Database: {DB_NAME}")
        print(f"   • Categories: {len(categories_data)}")
        print(f"   • Chefs: {len(chefs_data)}")
        print(f"   • Menu Items: {len(menu_items_data)}")
        print(f"   • Sample Orders: {len(orders_data)}")
        
        return True
        
    except psycopg2.Error as e:
        print(f"❌ Error setting up database: {e}")
        conn.rollback()
        return False
    finally:
        if conn:
            conn.close()

def main():
    """Main setup function"""
    print("🚀 Starting Restaurant Database Setup...")
    print("=" * 50)
    
    # Check if required environment variables are set
    required_vars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD']
    missing_vars = [var for var in required_vars if not os.getenv(var)]
    
    if missing_vars:
        print("⚠️  Warning: The following environment variables are not set:")
        for var in missing_vars:
            print(f"   • {var}")
        print("\nUsing default values. Consider setting these in your environment:")
        print("   export DB_HOST=localhost")
        print("   export DB_USER=postgres") 
        print("   export DB_PASSWORD=your_password")
        print("   export DB_NAME=restaurant_db")
        print("   export DB_PORT=5432")
        print()
    
    print(f"🔧 Configuration:")
    print(f"   • Host: {DB_CONFIG['host']}")
    print(f"   • Port: {DB_CONFIG['port']}")
    print(f"   • User: {DB_CONFIG['user']}")
    print(f"   • Database: {DB_NAME}")
    print()
    
    # Step 1: Create database
    if not create_database():
        sys.exit(1)
    
    # Step 2: Setup tables and data
    if not setup_tables_and_data():
        sys.exit(1)
    
    print("\n✨ Setup complete! You can now run your Flask application.")
    print("   python app.py")

if __name__ == '__main__':
    main()

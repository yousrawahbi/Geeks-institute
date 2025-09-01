import psycopg2
from menu_item import MenuItem

class MenuManager:
    
    @classmethod
    def _get_connection(cls):
        """Get database connection"""
        try:
            connection = psycopg2.connect(
                database="restaurant_db",
                user="postgres",  # Change this to your PostgreSQL username
                password="root",  # Change this to your PostgreSQL password
                host="localhost",
                port="5432"
            )
            return connection
        except psycopg2.Error as e:
            print(f"Error connecting to database: {e}")
            return None
    
    @classmethod
    def get_by_name(cls, item_name):
        """Return a single MenuItem object by name, or None if not found"""
        connection = cls._get_connection()
        if not connection:
            return None
        
        try:
            cursor = connection.cursor()
            query = "SELECT item_id, item_name, item_price FROM menu_items WHERE item_name = %s"
            cursor.execute(query, (item_name,))
            result = cursor.fetchone()
            
            cursor.close()
            connection.close()
            
            if result:
                return MenuItem(result[1], result[2], result[0])
            else:
                return None
                
        except psycopg2.Error as e:
            print(f"Error retrieving item: {e}")
            cursor.close()
            connection.close()
            return None
    
    @classmethod
    def all_items(cls):
        """Return a list of all MenuItem objects from the database"""
        connection = cls._get_connection()
        if not connection:
            return []
        
        try:
            cursor = connection.cursor()
            query = "SELECT item_id, item_name, item_price FROM menu_items ORDER BY item_name"
            cursor.execute(query)
            results = cursor.fetchall()
            
            cursor.close()
            connection.close()
            
            items = []
            for result in results:
                items.append(MenuItem(result[1], result[2], result[0]))
            
            return items
            
        except psycopg2.Error as e:
            print(f"Error retrieving items: {e}")
            cursor.close()
            connection.close()
            return []

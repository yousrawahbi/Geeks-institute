import psycopg2
from psycopg2 import sql

class MenuItem:
    def __init__(self, item_name, item_price, item_id=None):
        self.item_id = item_id
        self.item_name = item_name
        self.item_price = item_price
    
    def _get_connection(self):
        """Get database connection"""
        try:
            connection = psycopg2.connect(
                database="restaurant_db",
                user="postgres", 
                password="root",  
                host="localhost",
                port="5432"
            )
            return connection
        except psycopg2.Error as e:
            print(f"Error connecting to database: {e}")
            return None
    
    def save(self):
        """Save the item to the database"""
        connection = self._get_connection()
        if not connection:
            return False
        
        try:
            cursor = connection.cursor()
            
            if self.item_id is None:
                # Insert new item
                query = "INSERT INTO Menu_Items (item_name, item_price) VALUES (%s, %s) RETURNING item_id"
                cursor.execute(query, (self.item_name, self.item_price))
                self.item_id = cursor.fetchone()[0]
            else:
                # Update existing item
                query = "UPDATE Menu_Items SET item_name = %s, item_price = %s WHERE item_id = %s"
                cursor.execute(query, (self.item_name, self.item_price, self.item_id))
            
            connection.commit()
            cursor.close()
            connection.close()
            return True
            
        except psycopg2.Error as e:
            print(f"Error saving item: {e}")
            connection.rollback()
            cursor.close()
            connection.close()
            return False
    
    def delete(self):
        """Delete the item from the database"""
        if self.item_id is None:
            print("Cannot delete item: No item_id specified")
            return False
        
        connection = self._get_connection()
        if not connection:
            return False
        
        try:
            cursor = connection.cursor()
            query = "DELETE FROM Menu_Items WHERE item_id = %s"
            cursor.execute(query, (self.item_id,))
            
            if cursor.rowcount == 0:
                print("No item found with this ID")
                return False
            
            connection.commit()
            cursor.close()
            connection.close()
            return True
            
        except psycopg2.Error as e:
            print(f"Error deleting item: {e}")
            connection.rollback()
            cursor.close()
            connection.close()
            return False
    
    def update(self, new_name, new_price):
        """Update the item's name and price"""
        self.item_name = new_name
        self.item_price = new_price
        return self.save()
    
    def __str__(self):
        return f"MenuItem(ID: {self.item_id}, Name: {self.item_name}, Price: ${self.item_price})"
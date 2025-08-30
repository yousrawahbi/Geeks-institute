from week2.day4.ExerciceXP.config import get_db_connection

class MenuItem:
    def __init__(self, name, price):
        self.name = name
        self.price = price

    
    def save(self):
        try:
            connection = get_db_connection.connect()
            cursor = connection.cursor()
            
            query = "INSERT INTO Menu_Items (item_name, item_price) VALUES (%s, %s)"
            cursor.execute(query, (self.name, self.price))
            
            connection.commit()
            print(f"Menu item '{self.name}' saved successfully!")
            
        except get_db_connection.Error as e:
            print(f"Error saving menu item: {e}")
        finally:
            if connection:
                cursor.close()
                connection.close()
    
    
    def delete(self):
        try:
            connection = get_db_connection.connect()
            cursor = connection.cursor()
            
            query = "DELETE FROM Menu_Items WHERE item_name = %s"
            cursor.execute(query, (self.name,))
            
            connection.commit()
            print(f"Menu item '{self.name}' deleted successfully!")
            
        except get_db_connection.Error as e:
            print(f"Error deleting menu item: {e}")
        finally:
            if connection:
                cursor.close()
                connection.close()
                
    def delete(self):
        try:
            connection = get_db_connection.connect()
            cursor = connection.cursor()
            
            query = "DELETE FROM Menu_Items WHERE item_name = %s"
            cursor.execute(query, (self.name,))
            
            connection.commit()
            print(f"Menu item '{self.name}' deleted successfully!")
            
        except get_db_connection.Error as e:
            print(f"Error deleting menu item: {e}")
        finally:
            if connection:
                cursor.close()
                connection.close()
    
    def update(self, new_name=None, new_price=None):
        try:
            connection = get_db_connection.connect()
            cursor = connection.cursor()
            
            if new_name and new_price:
                query = "UPDATE Menu_Items SET item_name = %s, item_price = %s WHERE item_name = %s"
                cursor.execute(query, (new_name, new_price, self.name))
                self.name = new_name
                self.price = new_price
            elif new_name:
                query = "UPDATE Menu_Items SET item_name = %s WHERE item_name = %s"
                cursor.execute(query, (new_name, self.name))
                self.name = new_name
            elif new_price:
                query = "UPDATE Menu_Items SET item_price = %s WHERE item_name = %s"
                cursor.execute(query, (new_price, self.name))
                self.price = new_price
            else:
                print("No updates provided.")
                return
            
            connection.commit()
            print(f"Menu item updated successfully!")
            
        except get_db_connection.Error as e:
            print(f"Error updating menu item: {e}")
        finally:
            if connection:
                cursor.close()
                connection.close()
    

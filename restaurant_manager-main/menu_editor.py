import sys
import os

# Add the current directory to the Python path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

try:
    from menu_item import MenuItem  # Fixed typo in filename
    from menu_manager import MenuManager
except ImportError as e:
    print(f"Error importing modules: {e}")
    print("Please make sure menu_item.py and menu_manager.py are in the same directory as menu_editor.py")
    sys.exit(1)

def show_user_menu():
    """Display the program menu and handle user input"""
    while True:
        print("\n" + "="*40)
        print("    RESTAURANT MENU MANAGER")
        print("="*40)
        print("What would you like to do?")
        print("(V) View an Item")
        print("(A) Add an Item")
        print("(D) Delete an Item")
        print("(U) Update an Item")
        print("(S) Show the Menu")
        print("(Q) Quit")
        print("="*40)
        
        choice = input("Enter your choice: ").upper().strip()
        
        if choice == 'V':
            view_item()
        elif choice == 'A':
            add_item_to_menu()
        elif choice == 'D':
            remove_item_from_menu()
        elif choice == 'U':
            update_item_from_menu()
        elif choice == 'S':
            show_restaurant_menu()
        elif choice == 'Q':
            print("\nThank you for using Restaurant Menu Manager!")
            show_restaurant_menu()
            break
        else:
            print("Invalid choice. Please try again.")

def view_item():
    """View a specific item by name"""
    item_name = input("Enter the name of the item to view: ").strip()
    
    if not item_name:
        print("Item name cannot be empty.")
        return
    
    item = MenuManager.get_by_name(item_name)
    
    if item:
        print(f"\nItem found:")
        print(f"Name: {item.item_name}")
        print(f"Price: ${item.item_price}")
    else:
        print(f"No item found with the name '{item_name}'.")

def add_item_to_menu():
    """Add a new item to the menu"""
    try:
        item_name = input("Enter the item name: ").strip()
        
        if not item_name:
            print("Item name cannot be empty.")
            return
        
        # Check if item already exists
        existing_item = MenuManager.get_by_name(item_name)
        if existing_item:
            print(f"An item with the name '{item_name}' already exists.")
            return
        
        item_price = input("Enter the item price: ").strip()
        
        # Validate price
        try:
            item_price = int(item_price)
            if item_price < 0:
                print("Price cannot be negative.")
                return
        except ValueError:
            print("Price must be a valid number.")
            return
        
        # Create and save the item
        item = MenuItem(item_name, item_price)
        
        if item.save():
            print("Item was added successfully.")
        else:
            print("There was an error adding the item.")
            
    except Exception as e:
        print(f"An error occurred: {e}")

def remove_item_from_menu():
    """Remove an item from the menu"""
    item_name = input("Enter the name of the item to remove: ").strip()
    
    if not item_name:
        print("Item name cannot be empty.")
        return
    
    # Find the item first
    item = MenuManager.get_by_name(item_name)
    
    if item:
        if item.delete():
            print("Item was deleted successfully.")
        else:
            print("There was an error deleting the item.")
    else:
        print("There was an error - item not found.")

def update_item_from_menu():
    """Update an existing item in the menu"""
    try:
        current_name = input("Enter the current name of the item to update: ").strip()
        
        if not current_name:
            print("Item name cannot be empty.")
            return
        
        # Find the item first
        item = MenuManager.get_by_name(current_name)
        
        if not item:
            print("There was an error - item not found.")
            return
        
        print(f"Current item: {item.item_name} - ${item.item_price}")
        
        new_name = input("Enter the new name (press Enter to keep current): ").strip()
        if not new_name:
            new_name = item.item_name
        
        new_price_input = input("Enter the new price (press Enter to keep current): ").strip()
        if not new_price_input:
            new_price = item.item_price
        else:
            try:
                new_price = int(new_price_input)
                if new_price < 0:
                    print("Price cannot be negative.")
                    return
            except ValueError:
                print("Price must be a valid number.")
                return
        
        # Check if new name already exists (and it's different from current name)
        if new_name != item.item_name:
            existing_item = MenuManager.get_by_name(new_name)
            if existing_item:
                print(f"An item with the name '{new_name}' already exists.")
                return
        
        if item.update(new_name, new_price):
            print("Item was updated successfully.")
        else:
            print("There was an error updating the item.")
            
    except Exception as e:
        print(f"An error occurred: {e}")

def show_restaurant_menu():
    """Display the complete restaurant menu"""
    items = MenuManager.all_items()
    
    if not items:
        print("\nThe menu is currently empty.")
        return
    
    print("\n" + "="*40)
    print("         RESTAURANT MENU")
    print("="*40)
    
    for item in items:
        print(f"{item.item_name:<25} ${item.item_price:>3}")
    
    print("="*40)

if __name__ == "__main__":
    show_user_menu()
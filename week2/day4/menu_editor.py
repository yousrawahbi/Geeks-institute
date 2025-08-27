from menu_item import MenuItem
from menu_manager import MenuManager

def show_user_menu():
    while True:
        print("\n--- Restaurant Menu Manager ---")
        print("V - View an Item")
        print("A - Add an Item")
        print("D - Delete an Item")
        print("U - Update an Item")
        print("S - Show the Menu")
        print("X - Exit")
        
        choice = input("Choose an option: ").upper()
        
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
        elif choice == 'X':
            show_restaurant_menu()
            print("Goodbye!")
            break
        else:
            print("Invalid option. Please try again.")

def view_item():
    name = input("Enter item name to view: ")
    item = MenuManager.get_by_name(name)
    if item:
        print(f"Item: {item.name}, Price: {item.price}")
    else:
        print("Item not found!")

def add_item_to_menu():
    name = input("Enter item name: ")
    price = int(input("Enter item price: "))
    item = MenuItem(name, price)
    try:
        item.save()
        print("Item was added successfully!")
    except Exception as e:
        print(f"Error adding item: {e}")

def remove_item_from_menu():
    name = input("Enter item name to delete: ")
    item = MenuItem(name, 0)  # Price doesn't matter for deletion
    try:
        item.delete()
        print("Item was deleted successfully!")
    except Exception as e:
        print(f"Error deleting item: {e}")

def update_item_from_menu():
    old_name = input("Enter current item name: ")
    new_name = input("Enter new item name: ")
    new_price = int(input("Enter new item price: "))
    
    item = MenuItem(old_name, 0)
    try:
        item.update(new_name, new_price)
        print("Item was updated successfully!")
    except Exception as e:
        print(f"Error updating item: {e}")

def show_restaurant_menu():
    items = MenuManager.all_items()
    print("\n--- Restaurant Menu ---")
    for item in items:
        print(f"{item.name}: ${item.price}")

if __name__ == "__main__":
    show_user_menu()
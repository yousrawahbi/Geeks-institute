from menu_item import MenuItem
from menu_manager import MenuManager

# Test the functionality as shown in the codebox
def test_menu_system():
    print("Testing Menu System...")
    print("="*40)
    
    # Test 1: Create and save an item
    print("1. Creating and saving a Burger...")
    item = MenuItem('Burger', 35)
    if item.save():
        print("✓ Burger saved successfully")
    else:
        print("✗ Failed to save Burger")
    
    # Test 2: Delete the item
    print("2. Deleting the Burger...")
    if item.delete():
        print("✓ Burger deleted successfully")
    else:
        print("✗ Failed to delete Burger")
    
    # Test 3: Create, save, and update an item
    print("3. Creating Burger again and updating it...")
    item = MenuItem('Burger', 35)
    item.save()
    if item.update('Veggie Burger', 37):
        print("✓ Updated to Veggie Burger with price $37")
    else:
        print("✗ Failed to update item")
    
    # Test 4: Get item by name
    print("4. Getting 'Beef Stew' by name...")
    item2 = MenuManager.get_by_name('Beef Stew')
    if item2:
        print(f"✓ Found: {item2}")
    else:
        print("✗ Beef Stew not found (this is expected if not in database)")
    
    # Test 5: Get all items
    print("5. Getting all items...")
    items = MenuManager.all_items()
    print(f"✓ Found {len(items)} items:")
    for item in items:
        print(f"   - {item}")
    
    print("="*40)
    print("Test completed!")

if __name__ == "__main__":
    test_menu_system()
sandwich_orders = ["Tuna sandwich", "Pastrami sandwich", "Avocado sandwich", "Pastrami sandwich","Egg sandwich", "Chicken sandwich", "Pastrami sandwich"]

search="Pastrami"

matches = [s for s in sandwich_orders if search.lower() in s.lower()]
print(f"sandwiches containing Pastrami are: {matches}")

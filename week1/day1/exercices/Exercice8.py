# qst 1
sandwich_orders = ["Tuna sandwich", "Pastrami sandwich", "Avocado sandwich", "Pastrami sandwich","Egg sandwich", "Chicken sandwich", "Pastrami sandwich"]
no_item="Pastrami sandwich"
while no_item in sandwich_orders:
    sandwich_orders.remove(no_item)
print(sandwich_orders)

# qst 2;3
finished_sandwiches=[]

# qst 4
L=len(sandwich_orders)
for _ in range(L):
    finished_sandwiches.append(sandwich_orders.pop(0))
print(sandwich_orders)
print(finished_sandwiches)

# qst 5
LF=len(finished_sandwiches)
for i in range(LF):
    print("I made you " + finished_sandwiches[i])
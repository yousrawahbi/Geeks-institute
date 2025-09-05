
family = {"rick": 43, 'beth': 13, 'morty': 5, 'summer': 8}

one_cost = {}
for x, y in family.items():

    if 3 <= y <= 12 :
        cost=10
    elif y< 3:
        cost=0
    else:
        cost=15
    one_cost[x] = cost   

total_cost = sum(one_cost.values())


print("everyone's cost:")
for x, cost in one_cost.items():
    print(f"{x}: ${cost}")

print(f"\nTotal family cost: ${total_cost}")

new_fam = dict({})
n=int(input(f"how much members do you wanna add ?  "))
for i in range(n):
    x = input(f"Enter name of member number {i + 1}: ")
    y = input(f"Enter  {x}'s age: ")
    new_fam[x] = y
    
print("Final dictionary:", new_fam)
one_cost = {}
for x, y in new_fam.items():

    if 3 < int(y) <= 12 :
        cost=10
    elif int(y)<= 3:
        cost=0
    else:
        cost=15
    one_cost[x] = cost   

total_cost = sum(one_cost.values())


print("everyone's cost:")
for x, cost in one_cost.items():
    print(f"{x}: ${cost}")

print(f"\nTotal family cost: ${total_cost}")




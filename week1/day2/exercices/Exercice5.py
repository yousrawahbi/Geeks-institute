import random
def number_comparison(user_number):

    if user_number < 1 or user_number > 100:
        print("Enter a number between 1 and 100!")
        return 
    
    random_number = random.randint(1, 100)
    
    if user_number == random_number:
        print(f"Success! Both numbers are {user_number}!")
    else:
        print(f"Sorry, no match. user number: {user_number}, Random number: {random_number}")


user_num = int(input("Enter a number between 1 and 100: "))
number_comparison(user_num)
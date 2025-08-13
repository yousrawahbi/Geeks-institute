

birthdays = {
    "Salma Guirro": "1992/03/14",
    "Amine Naim": "1986/11/07",
    "Yasmine Tabrani": "2009/01/04",
    "Ali Korchi": "2012/02/15",
    "Rita Jamali": "1994/07/10"
}

print("You can look up the birthdays of the people in the list!")

user_input = input("\nEnter a person's name: ")

birthday = birthdays.get(user_input)

if birthday:
    print(f"\n{user_input}'s birthday is on {birthday}.")
else:
    print(f"\nSorry, we don't have birthday information for {user_input}.")
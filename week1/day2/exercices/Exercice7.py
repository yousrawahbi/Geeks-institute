import random

# qst 1.1
def get_random_temp():
    return random.randint(-10, 40)
current_temp = get_random_temp()

# qst 1.2
print( current_temp)

# qst 2.1

def main():
    current_temp = get_random_temp()
    print(f"The temp right now is  {current_temp} degrees Celsius")

    if current_temp <= 0:
        print("Brrr! It's freezing ! Wear some extra layers today")
    elif 0 < current_temp <= 10:
        print("Chilly weather! Don't forget your coat. ")
    elif 10 < current_temp <= 20:
        print("Good weather today! ")
    elif 20 < current_temp <= 30:
        print("sunny weather today! ")
    else:
        print("Hot weather today!")
if __name__ == "__main__":
    main()
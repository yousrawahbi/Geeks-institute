
users_word = str(input("Enter a word: "))

new_word = ""

for i in range(len(users_word)):
    if new_word == "" :
        new_word += users_word[i]
    elif users_word[i] != users_word[i - 1]:
        new_word += users_word[i]
print(new_word)
word = input("Enter a word: ")

letter_indexes = {}

for index, letter in enumerate(word):
    letter_str = str(letter)
    
    if letter_str not in letter_indexes:
        letter_indexes[letter_str] = []
    
    
    letter_indexes[letter_str].append(index)

print(letter_indexes)
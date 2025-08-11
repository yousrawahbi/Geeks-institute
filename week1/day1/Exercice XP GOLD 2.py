# qst1 :Use a for loop to print all numbers from 1 to 20, inclusive.
for nbr in range(1,21):
    print(nbr)

# qst2 :Using a for loop, that loops from 1 to 20 (inclusive), print out every element which has an even index.
for nbr in range(1,21):
    if nbr%2==0:
        print(nbr+1)
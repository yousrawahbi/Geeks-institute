
names = ['Samus', 'Cortana', 'V', 'Link', 'Mario', 'Cortana', 'Samus']
index=''
user_name=input("Your name : ")
while True:
    index=names.index(str(user_name))
    print(index)
    break
else: print("name not found in the list")



user_nbr=input("Give a number : ")
max=input("Give a length : ")
nmbr=1
multiples=[]
while int(nmbr)<int(max)+1 :
    multiples.append(int(user_nbr)*nmbr)
    nmbr +=1
print(multiples)
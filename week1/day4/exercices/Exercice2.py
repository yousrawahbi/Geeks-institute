class Dog :
    def __init__(self,name,age,weight):
        self.name=name
        self.age=age
        self.weight=weight
    def bark(self):
        
        print(f"{self.name} is barking")
    
    def run_speed(self):
        return self.weight/self.age*10
    
    def fight(self,other_dog):
        first_dog=self.run_speed()*self.weight
        second_dog=other_dog.run_speed()*other_dog.weight
        if first_dog > second_dog:
            print(f"the winner is {self.name}")
        elif first_dog < second_dog:
            print(f"the winner is {other_dog.name}")

        
dog_1=Dog("motcho",13,30)
dog_2=Dog("bianco",3,35)
dog_3=Dog("Caramello",5,15)

dog_1.bark()
dog_2.bark()
dog_3.bark()

dog_1.fight(dog_2)
dog_2.fight(dog_3)
dog_3.fight(dog_1)

print(f"{dog_1.name}'s run speed is: {dog_1.run_speed}")
print(f"{dog_2.name}'s run speed is: {dog_2.run_speed}")
print(f"{dog_3.name}'s run speed is: {dog_3.run_speed}")
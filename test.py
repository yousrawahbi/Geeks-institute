class Dog():
    
    def __init__(self, name_of_the_dog, height_of_dog):
        print("A new dog has been initialized !")
        print("His name is", name_of_the_dog)
        self.name = name_of_the_dog
        self.height= height_of_dog
        
        
        
    def bark(self):
        print(f"The dog's name is :{self.name}")
        
    def jump(self):
        print(f"The dog's name is :{self.name},and his height is : {self.height} ")
        
shelter_dog=Dog('Rex',30)

shelter_dog.jump()
shelter_dog.bark()

class Dog():
    def __init__(self, name_of_the_dog, height_of_dog):
        self.name=name_of_the_dog
        self.height=height_of_dog
        

    def bark(self):
        print(f"{self.name} goes woof!")
        
    def jump(self):
        print(f"{self.name} jumps {self.height*2} cm height!")

    def Bigest_dog(*dogs):
        return max(dogs, key=lambda dog: dog.height)

    bigest = Bigest_dog()
    print(f"The bigest is {bigest.name}, his height is {bigest.height}")

Dog("Tom",13)
Dog("Alex",15).bark()
Dog("Jam",140).jump()

davids_dog=Dog("Rex",50)

sarahs_dog=Dog("Teacup",20)
print("name of dog is",sarahs_dog.name)

sarahs_dog=Dog("Teacup",20).bark()
sarahs_dog=Dog("Teacup",20).jump()
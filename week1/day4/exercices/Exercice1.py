class Pets():
    def __init__(self, animals):
        self.animals = animals

    def walk(self):
        for animal in self.animals:
            print(animal.walk())

class Cat():
    is_lazy = True

    def __init__(self, name, age):
        self.name = name
        self.age = age

    def walk(self):
        return f'{self.name} is just walking around'

class Bengal(Cat):
    def sing(self, sounds):
        return f'{sounds}'

class Chartreux(Cat):
    def sing(self, sounds):
        return f'{sounds}'
#qst1
class Siamese(Cat):
    def sing(self, sounds):
        return f'{sounds}'
#qst2
cat_bengal=Bengal("Kenny",4)
cat_chartreux=Chartreux("Masha",5)
cat_siamese=Siamese("Feng",10)

all_cats=[cat_bengal,cat_chartreux,cat_siamese]

#qst3

sara_pets=Pets(all_cats)

#qst4

sara_pets.walk()
    
    
# qst 1,2 
class Zoo():
    def __init__(self, zoo_name):
        self.name=zoo_name
        self.animals=[]
# qst 3
    def add_animal(self,new_animal):
        if new_animal not in self.animals:
            self.animals.append(new_animal)
            print(f"{new_animal} has been added to the zoo!")
        else:
            print(f"{new_animal} is already in the zoo!")
            
# qst 4            
    def get_animals(self):
        print(f"Animals in the zoo {self.name} are :")
        for animal in self.animals:
            print(f"- {animal}")


# qst 5
    def sell_animal(self, animal_sold):

        if animal_sold in self.animals:
            self.animals.remove(animal_sold)
            print(f"{animal_sold} is sold and removed from the zoo.")
        else:
            print(f"Sorry, {animal_sold} is not in the zoo.")
# qst 6
    def sort_animals(self):

        sorted_animals = sorted(self.animals)
        grouped_animals = {}
        
        for animal in sorted_animals:
            first_letter = animal[0].upper()
            if first_letter not in grouped_animals:
                grouped_animals[first_letter] = []
            grouped_animals[first_letter].append(animal)
        
        return grouped_animals
# qst 7  
    def get_groups(self):
        """Prints all animal groups with their members"""
        grouped_animals = self.sort_animals()
        
        if not grouped_animals:
            print("The zoo has no animals to display.")
            return
        
        print("Animal Groups:")
        for letter, animals in grouped_animals.items():
            if len(animals) == 1:
                print(f"{letter}: {animals[0]}")
            else:
                print(f"{letter}: {', '.join(animals)}")


my_zoo = Zoo("Ain Sebaa")
my_zoo.add_animal("Anaconda")
my_zoo.add_animal("Amal")
my_zoo.add_animal("Snake")
my_zoo.add_animal("semm")
my_zoo.add_animal("babo")
my_zoo.add_animal("Bobryss")

my_zoo.get_animals()
my_zoo.sort_animals()
my_zoo.get_groups()

# qst 8
new_york_zoo = Zoo()

new_york_zoo.add_animal("Lion")
new_york_zoo.add_animal("Tiger")
new_york_zoo.add_animal("Bear")
new_york_zoo.add_animal("Elephant")
new_york_zoo.add_animal("Eagle")

new_york_zoo.get_animals()
new_york_zoo.sort_animals()
new_york_zoo.get_groups()

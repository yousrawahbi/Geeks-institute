class Farm():
    def __init__(self, farm_name):
        self.name=farm_name
        self.animals=[]
        
    def add_animal(self,animal_type,count=1):
        if animal_type in self.animals:
            self.animals[animal_type] += count
            print(f"Added {count} more {animal_type}(s). Total now: {self.animals[animal_type]}")
        else:
            self.animals[animal_type] = count
            print(f"Added {count} {animal_type}(s) to the zoo")
    
    def show_animals(self):
        if not self.animals:
            print("The zoo currently has no animals.")
        else:
            print("Animals in the zoo:")
            for animal, count in self.animals.items():
                print(f"- {animal}: {count}")
    def get_info(self):
        info = [f"\n{self.name} Zoo Inventory:"]
        
        max_name_length = max(len(name) for name in self.animals.keys()) if self.animals else 0
        
        for animal, count in sorted(self.animals.items()):
            info.append(f"{animal.ljust(max_name_length + 2)}: {count}")
    
        info.append("\nE-I-E-I-O!")
        
        return "\n".join(info)
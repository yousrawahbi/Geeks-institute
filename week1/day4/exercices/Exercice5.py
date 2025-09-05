#qst1
from Exercice4 import Family

class TheIncredibles(Family):
    def __init__(self, last_name, members):
        super().__init__(last_name, members)
#qst2        
    def use_power(self, name):
        for member in self.members:
            if member['name'] == name:
                if member['age'] >= 18:
                    print(f"{name}'s power: {member['power']}")
                else:
                    raise Exception(f"{name} is not over 18 years old!")
                return
        print(f"{name} is not a member of the {self.last_name} family.")
#qst3    
    def incredible_presentation(self):
        print("*Here is our powerful family*")
        super().family_presentation()
        print("\nIncredible Details:")
        for member in self.members:
            print(f"Name: {member['name']}, Incredible Name: {member['incredible_name']}, Power: {member['power']}")
#qst4
members = [
    {'name':'Michael','age':35,'gender':'Male','is_child':False,'power': 'fly','incredible_name':'MikeFly'},
    {'name':'Sarah','age':32,'gender':'Female','is_child':False,'power': 'read minds','incredible_name':'SuperWoman'}
]

incredibles_family = TheIncredibles("Incredibles", members)

#qst5
incredibles_family.incredible_presentation()

#qst6
incredibles_family.born(name='Jack', age=0, gender='Male', is_child=True, power='Unknown Power', incredible_name='BabyJack')

#qst7
incredibles_family.incredible_presentation()


try:
    incredibles_family.use_power('Michael')
    incredibles_family.use_power('Jack')
except Exception as e:
    print(f"Error: {e}")
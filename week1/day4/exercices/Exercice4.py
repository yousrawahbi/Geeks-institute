#qst1

class Family:
    def __init__(self, last_name, members):
        self.members = members
        self.last_name = last_name
#qst2        
    def born(self,**kwargs):
        self.members.append(kwargs)
        print("Congratulations to {self.last_name }for your new baby {kwargs.get('name')}}!")
        
    def is_18(self,name):
        for member in self.members:
            if member['name'] == name:
                return member.get('age', 0) >= 18
        return False 
             
    def family_presentation(self):
        print(f"{self.last_name} family members are: ")
        for member in self.members:
            print(f"  - {member['name']}, Age: {member.get('age', 'N/A')}, Gender: {member.get('gender', 'N/A')}, Child: {member.get('is_child', False)}")

f_members = [
    {'name': 'Michael', 'age': 35, 'gender': 'Male', 'is_child': False},
    {'name': 'Sarah', 'age': 32, 'gender': 'Female', 'is_child': False}
]

family = Family("Smith", f_members)

family.born(name='Rita', age=0, gender='Female', is_child=True)
print(f"Is Michael over 18? {family.is_18('Michael')}")
print(f"Is Emma over 18? {family.is_18('Emma')}")
family.family_presentation()
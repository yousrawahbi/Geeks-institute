from Exercice2 import Dog
import random
class PetDog(Dog):

    def __init__(self,name,age,weight,trained=False):
        super().__init__(name,age,weight)
        self.trained=trained
    
    def train(self):
        super().bark()
        self.trained=True

    def play(self,*args):
        dog_names=[self.name]+[dog.name for dog in args]
        print(f"{' ,'.join(dog_names)} are playing together")
        
        
    
    def do_a_trick(self):
        if self.train:
            tricks = [
            f"{self.name} does a barrel roll",
            f"{self.name} stands on his back legs",
            f"{self.name} shakes your hand",
            f"{self.name} plays dead"
            ]
        print(random.choice(tricks))
            
        
        
        
dog1 = PetDog("Rex", 3, 15)
dog2 = PetDog("Max", 5, 20)
dog3 = PetDog("Buddy", 4, 18)
dog1.train()  
dog1.play(dog2, dog3)  
dog1.do_a_trick()
dog2.do_a_trick()
dog3.do_a_trick()
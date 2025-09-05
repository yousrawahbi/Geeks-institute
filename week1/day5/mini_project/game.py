import random

class Game:
    def get_user_item(self):
        while True:
            user_input = input("Select an item (r.rock/p.paper/s.scissors): ").lower()
            if user_input in ['r', 'p', 's']:
                return user_input
            print("Invalid input. Please choose r, p, or s.")

    def get_computer_item(self):
        return random.choice(['r', 'p', 's'])

    def get_game_result(self, user_item, computer_item):
        if user_item == computer_item:
            return 'draw'
        winning_combinations = {
            'r': 's',
            'p': 'r',
            's': 'p'
        }
        if winning_combinations[user_item] == computer_item:
            return 'win'
        return 'loss'

    def play(self):
        user_item = self.get_user_item()
        computer_item = self.get_computer_item()
        result = self.get_game_result(user_item, computer_item)
        
        print(f"You selected {user_item}. The computer selected {computer_item}. ", end='')
        if result == 'win':
            print("You win!")
        elif result == 'loss':
            print("You lose!")
        else:
            print("You drew!")
        
        return result
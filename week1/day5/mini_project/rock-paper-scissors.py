from game import Game

def get_user_menu_choice():
    print("\nMenu:")
    print("g. Play a new game")
    print("x. Show scores and exit")
    
    
    while True:
        choice = input("Enter your choice (g_x): ")
        if choice in ['g', 'x']:
            return choice
        print("Invalid input. Please enter g or x.")

def print_results(results):
    print("\nGame Results:")
    print(f"You won {results.get('win', 0)} times")
    print(f"You lost: {results.get('loss', 0)} times")
    print(f"You drew: {results.get('draw', 0)} times")
    print("\nThank you for playing!")

def main():
    results = {'win': 0, 'loss': 0, 'draw': 0}
    
    while True:
        choice = get_user_menu_choice()
        
        if choice == 'g':
            game = Game()
            result = game.play()
            results[result] += 1
        elif choice == 'x':
            print_results(results)
        
            break

if __name__ == "__main__":
    main()
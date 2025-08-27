import sqlite3
import hashlib
import getpass 


# PART1
users = {
    "user1": "pass1",
    "user2": "pass2",
    "user3": "pass3"
}

logged_in = None

while True:
    command = input("Enter command: login or exit ").strip().lower()
    
    if command == "exit":
        break
        
    elif command == "login":
        username = input("Username: ").strip()
        password = input("Password: ").strip()
        
        if username in users and users[username] == password:
            print("you are now logged in")
            logged_in = username
        else:
            print("Invalid username or password")
            
    else:
        print("Unknown command. Use 'login' or 'exit'.")
# PART2
        if username not in users:
                signup = input("Would you like to sign up? (yes/no): ").strip().lower()
                if signup == "yes":
                    while True:
                        new_username = input("Choose a username: ").strip()
                        if new_username in users:
                            print("Username already exists. Please choose another one.")
                        else:
                            break
                    new_password = input("Choose a password: ").strip()
                    
                    # Add new user to dictionary
                    users[new_username] = new_password
                    print("Account created successfully! You can now log in.")
            
        else:
            print("Unknown command. Use 'login' or 'exit'.")
            
# PART3 

def init_db():
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS users
                 (username TEXT PRIMARY KEY, password TEXT)''')
    

    initial_users = [
        ('user1', hash_password('pass1')),
        ('user2', hash_password('pass2')),
        ('user3', hash_password('pass3'))
    ]
    
    for username, password in initial_users:
        try:
            c.execute("INSERT INTO users VALUES (?, ?)", (username, password))
        except sqlite3.IntegrityError:
            # User already exists, skip
            pass
    
    conn.commit()
    conn.close()


def hash_password(password):
    """Simple password hashing using SHA-256"""
    return hashlib.sha256(password.encode()).hexdigest()


def get_user(username):
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    c.execute("SELECT * FROM users WHERE username=?", (username,))
    user = c.fetchone()
    conn.close()
    return user

def add_user(username, password):
   
    hashed_password = hash_password(password)
    conn = sqlite3.connect('users.db')
    c = conn.cursor()
    try:
        c.execute("INSERT INTO users VALUES (?, ?)", (username, hashed_password))
        conn.commit()
        success = True
    except sqlite3.IntegrityError:
       
        success = False
    finally:
        conn.close()
    return success

init_db()

logged_in = None

while True:
    command = input("\nEnter command (login/signup/exit): ").strip().lower()
    
    if command == "exit":
        break
        
    elif command == "login":
        username = input("Username: ").strip()
        password = input("Password: ").strip()
        
        user = get_user(username)
        if user and user[1] == hash_password(password):
            print("You are now logged in")
            logged_in = username
        else:
            print("Invalid username or password")
            if not user:
                signup = input("Would you like to sign up? (yes/no): ").strip().lower()
                if signup == "yes":
                    while True:
                        new_username = input("Choose a username: ").strip()
                        if get_user(new_username):
                            print("Username already exists. Please choose another one.")
                        else:
                            break
                    
                    new_password = input("Choose a password: ")
                    if add_user(new_username, new_password):
                        print("Account created successfully! You can now log in.")
                    else:
                        print("Error creating account. Please try again.")
            
    elif command == "signup":
        while True:
            new_username = input("Choose a username: ").strip()
            if get_user(new_username):
                print("Username already exists. Please choose another one.")
            else:
                break
        
        new_password = input("Choose a password: ")
        if add_user(new_username, new_password):
            print("Account created successfully! You can now log in.")
        else:
            print("Error creating account. Please try again.")
            
    else:
        print("Unknown command. Use 'login', 'signup', or 'exit'.")
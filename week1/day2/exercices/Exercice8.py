data = [
    {
        "question": "What is Baby Yoda's real name?",
        "answer": "Grogu"
    },
    {
        "question": "Where did Obi-Wan take Luke after his birth?",
        "answer": "Tatooine"
    },
    {
        "question": "What year did the first Star Wars movie come out?",
        "answer": "1977"
    },
    {
        "question": "Who built C-3PO?",
        "answer": "Anakin Skywalker"
    },
    {
        "question": "Anakin Skywalker grew up to be who?",
        "answer": "Darth Vader"
    },
    {
        "question": "What species is Chewbacca?",
        "answer": "Wookiee"
    }
]
def run_quiz(data):
    correct = 0
    incorrect = 0
    wrong_answers = []
    
    for item in data:
        user_answer = input(item["question"] + " ").strip()
        if user_answer.lower() == item["answer"].lower():
            correct += 1
        else:
            incorrect += 1
            wrong_answers.append({
                "question": item["question"],
                "user_answer": user_answer,
                "correct_answer": item["answer"]
            })
    
    show_results(correct, incorrect, wrong_answers)
    
    if incorrect > 3:
        play_again = input("\nYou had more than 3 wrong answers. Would you like to play again? (yes/no) ").strip().lower()
        if play_again == "yes":
            run_quiz(data)

def show_results(correct, incorrect, wrong_answers):
    print("\nQuiz Results:")
    print(f"Correct answers: {correct}")
    print(f"Incorrect answers: {incorrect}")
    
    if wrong_answers:
        print("\nQuestions you answered wrong:")
        for item in wrong_answers:
            print(f"\nQuestion: {item['question']}")
            print(f"Your answer: {item['user_answer']}")
            print(f"Correct answer: {item['correct_answer']}")
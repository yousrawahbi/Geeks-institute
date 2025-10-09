const express = require('express');
const router = express.Router();

const allTriviaQuestions = [
    { id: 1, question: "What is the capital of France?", answer: "Paris", options: ["Berlin", "London", "Paris", "Rome"] },
    { id: 2, question: "Which planet is known as the Red Planet?", answer: "Mars", options: ["Jupiter", "Mars", "Venus", "Saturn"] },
    { id: 3, question: "What is the largest mammal in the world?", answer: "Blue whale", options: ["Elephant", "Blue whale", "Giraffe", "Human"] },
    { id: 4, question: "What is the chemical symbol for water?", answer: "H2O", options: ["CO2", "O2", "H2O", "N2"] },
    { id: 5, question: "Who painted the Mona Lisa?", answer: "Leonardo da Vinci", options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"] },
    { id: 6, question: "What is the highest mountain in Africa?", answer: "Mount Kilimanjaro", options: ["Mount Everest", "Mount Kilimanjaro", "Mount Elbrus", "Mount Fuji"] },
    { id: 7, question: "Which element has the atomic number 1?", answer: "Hydrogen", options: ["Helium", "Oxygen", "Hydrogen", "Carbon"] },
    { id: 8, question: "In what year did the Titanic sink?", answer: "1912", options: ["1905", "1912", "1918", "1923"] },
    { id: 9, question: "What is the currency of Japan?", answer: "Yen", options: ["Won", "Yuan", "Euro", "Yen"] },
    { id: 10, question: "What is the longest river in the world?", answer: "Nile", options: ["Amazon", "Nile", "Yangtze", "Mississippi"] },
];

// --- In-memory Game State (Simplified for a single player/demo) ---
// In a real application, this would be per-user, likely using sessions or a database
let currentQuizState = {
    score: 0,
    questionsOrder: [], // Shuffled order of question IDs
    currentQuestionIndex: -1,
    gameOver: false
};

// Helper function to shuffle an array (Fisher-Yates)
function shuffleArray(array) {
    const shuffled = [...array]; // Create a shallow copy
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Helper to get a question by ID
function getQuestionById(id) {
    return allTriviaQuestions.find(q => q.id === id);
}

// --- API Endpoints ---

// GET /api/quiz/new - Start or restart the quiz
router.get('/new', (req, res) => {
    currentQuizState.score = 0;
    currentQuizState.questionsOrder = shuffleArray(allTriviaQuestions.map(q => q.id)); // Shuffle IDs
    currentQuizState.currentQuestionIndex = 0;
    currentQuizState.gameOver = false;

    const firstQuestionId = currentQuizState.questionsOrder[currentQuizState.currentQuestionIndex];
    const questionData = getQuestionById(firstQuestionId);

    if (questionData) {
        // Only send necessary question data to the client (no answer)
        res.json({
            questionId: questionData.id,
            question: questionData.question,
            options: shuffleArray([...questionData.options]) // Shuffle options each time
        });
    } else {
        res.status(500).json({ message: 'Error starting quiz: No questions available.' });
    }
});

// GET /api/quiz/current - Get the current question (useful for page refresh)
router.get('/current', (req, res) => {
    if (currentQuizState.gameOver) {
        return res.json({ gameOver: true, score: currentQuizState.score, totalQuestions: currentQuizState.questionsOrder.length });
    }
    if (currentQuizState.currentQuestionIndex === -1 || currentQuizState.currentQuestionIndex >= currentQuizState.questionsOrder.length) {
        // Quiz not started or finished, prompt client to start new
        return res.status(404).json({ message: 'Quiz not in progress. Please start a new quiz.' });
    }

    const questionId = currentQuizState.questionsOrder[currentQuizState.currentQuestionIndex];
    const questionData = getQuestionById(questionId);

    if (questionData) {
        res.json({
            questionId: questionData.id,
            question: questionData.question,
            options: shuffleArray([...questionData.options])
        });
    } else {
        res.status(500).json({ message: 'Error retrieving current question.' });
    }
});


// POST /api/quiz/answer - Submit an answer to the current question and move to the next
router.post('/answer', (req, res) => {
    if (currentQuizState.gameOver || currentQuizState.currentQuestionIndex === -1) {
        return res.status(400).json({ message: 'Quiz is not active or has ended. Please start a new quiz.' });
    }

    const { questionId, guess } = req.body;

    if (!questionId || !guess) {
        return res.status(400).json({ message: 'Question ID and guess are required.' });
    }

    const actualQuestionId = currentQuizState.questionsOrder[currentQuizState.currentQuestionIndex];
    if (questionId !== actualQuestionId) {
        // This check prevents submitting an answer for a question not currently presented
        return res.status(400).json({ message: 'Attempting to answer an out-of-sync question.' });
    }

    const questionData = getQuestionById(questionId);

    if (!questionData) {
        return res.status(404).json({ message: 'Question not found.' });
    }

    const isCorrect = questionData.answer.toLowerCase() === String(guess).toLowerCase();

    if (isCorrect) {
        currentQuizState.score++;
    }

    currentQuizState.currentQuestionIndex++; // Move to the next question

    let nextQuestionData = null;
    let quizOver = false;

    // Check if the quiz is over
    if (currentQuizState.currentQuestionIndex >= currentQuizState.questionsOrder.length) {
        currentQuizState.gameOver = true;
        quizOver = true;
    } else {
        const nextQuestionId = currentQuizState.questionsOrder[currentQuizState.currentQuestionIndex];
        const nextQ = getQuestionById(nextQuestionId);
        if (nextQ) {
            nextQuestionData = {
                questionId: nextQ.id,
                question: nextQ.question,
                options: shuffleArray([...nextQ.options])
            };
        }
    }

    res.json({
        isCorrect,
        correctAnswer: questionData.answer,
        score: currentQuizState.score,
        totalQuestionsAnswered: currentQuizState.currentQuestionIndex, // Or currentQuestionIndex (before increment) + 1
        quizOver,
        nextQuestion: nextQuestionData // Will be null if quiz is over
    });
});

// GET /api/quiz/score - Display the user’s final score at the end of the quiz
router.get('/score', (req, res) => {
    res.json({
        finalScore: currentQuizState.score,
        totalQuestions: allTriviaQuestions.length, // Or currentQuizState.questionsOrder.length
        gameOver: currentQuizState.gameOver
    });
});

module.exports = router;
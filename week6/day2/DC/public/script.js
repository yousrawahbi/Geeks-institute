const questionDisplay = document.getElementById('questionDisplay');
const optionsContainer = document.getElementById('optionsContainer');
const feedbackMessage = document.getElementById('feedbackMessage');
const currentScoreSpan = document.getElementById('currentScore');
const totalQuestionsAnsweredSpan = document.getElementById('totalQuestionsAnswered');
const restartQuizBtn = document.getElementById('restartQuizBtn');

const finalScoreArea = document.getElementById('finalScoreArea');
const finalScoreValueSpan = document.getElementById('finalScoreValue');
const totalQuestionsValueSpan = document.getElementById('totalQuestionsValue');
const playAgainBtn = document.getElementById('playAgainBtn');

// --- Game State (Client-side mirror) ---
let currentQuestionId = null; // ID of the question currently displayed
let currentScore = 0;
let questionsAnsweredCount = 0; // Number of questions user has attempted

// --- API Endpoints ---
const API_BASE_URL = '/api/quiz';

// --- Functions ---

/**
 * Updates the score display on the UI.
 */
function updateScoreDisplay() {
    currentScoreSpan.textContent = currentScore;
    totalQuestionsAnsweredSpan.textContent = questionsAnsweredCount;
}

/**
 * Clears feedback message and removes any styling.
 */
function clearFeedback() {
    feedbackMessage.textContent = '';
    feedbackMessage.classList.remove('correct', 'incorrect');
}

/**
 * Fetches and displays the next question from the server.
 */
async function fetchAndDisplayQuestion() {
    clearFeedback();
    optionsContainer.innerHTML = '<button class="option-btn" disabled>Loading question...</button>'; // Show loading state
    questionDisplay.textContent = 'Loading question...';

    try {
        const response = await fetch(`${API_BASE_URL}/current`); // Fetch current question or check game state
        if (!response.ok) {
            // If current fails, try to start a new one (e.g., first load or server restart)
            if (response.status === 404 || response.status === 400) { // Quiz not active or ended
                return await startNewQuiz(); // This will fetch and display the first question
            }
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        if (data.gameOver) {
            displayFinalScore(); // If current indicates game is over
            return;
        }

        renderQuestion(data); // Render the fetched question
    } catch (error) {
        console.error('Error fetching question:', error);
        feedbackMessage.textContent = 'Failed to load question. Please try restarting the quiz.';
        feedbackMessage.classList.add('incorrect');
        // Ensure options are disabled on error
        optionsContainer.innerHTML = '<button class="option-btn" disabled>Error loading</button>';
    }
}

/**
 * Starts a new quiz session by resetting state on the server and fetching the first question.
 */
async function startNewQuiz() {
    clearFeedback();
    currentScore = 0;
    questionsAnsweredCount = 0;
    updateScoreDisplay();
    hideFinalScoreArea(); // Hide final score area

    optionsContainer.innerHTML = '<button class="option-btn" disabled>Starting quiz...</button>';
    questionDisplay.textContent = 'Starting quiz...';

    try {
        const response = await fetch(`${API_BASE_URL}/new`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        renderQuestion(data); // Display the first question
    } catch (error) {
        console.error('Error starting new quiz:', error);
        feedbackMessage.textContent = 'Failed to start quiz. Please try again.';
        feedbackMessage.classList.add('incorrect');
        // Ensure options are disabled on error
        optionsContainer.innerHTML = '<button class="option-btn" disabled>Error starting</button>';
    }
}

/**
 * Renders the question and its options on the UI.
 * @param {object} questionData - The question object from the API.
 */
function renderQuestion(questionData) {
    currentQuestionId = questionData.questionId; // Store the ID of the current question
    questionDisplay.textContent = questionData.question;
    optionsContainer.innerHTML = ''; // Clear previous options

    questionData.options.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('option-btn');
        button.textContent = option;
        button.dataset.answer = option; // Use a data attribute to store the answer for validation
        button.addEventListener('click', handleOptionClick);
        optionsContainer.appendChild(button);
    });
    // Enable all option buttons
    optionsContainer.querySelectorAll('.option-btn').forEach(btn => btn.disabled = false);
}

/**
 * Handles the click event on an answer option button.
 * Submits the user's guess to the server.
 * @param {Event} event - The click event object.
 */
async function handleOptionClick(event) {
    const userGuess = event.target.dataset.answer; // Get the chosen answer from the data attribute

    // Disable all options immediately after a guess to prevent multiple submissions
    optionsContainer.querySelectorAll('.option-btn').forEach(btn => btn.disabled = true);

    try {
        const response = await fetch(`${API_BASE_URL}/answer`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ questionId: currentQuestionId, guess: userGuess })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Update client-side score based on server's response
        currentScore = data.score;
        questionsAnsweredCount++;
        updateScoreDisplay();

        // Provide feedback on the guess
        if (data.isCorrect) {
            feedbackMessage.textContent = 'Correct! 🎉';
            feedbackMessage.classList.add('correct');
        } else {
            feedbackMessage.textContent = `Incorrect. The answer was "${data.correctAnswer}". 😢`;
            feedbackMessage.classList.add('incorrect');
        }

        // Move to the next question or end the quiz
        setTimeout(() => { // Give a brief moment for feedback to be read
            if (data.quizOver) {
                displayFinalScore();
            } else if (data.nextQuestion) {
                renderQuestion(data.nextQuestion);
            } else {
                // Fallback, if nextQuestion is null but quiz isn't over (shouldn't happen with proper backend)
                feedbackMessage.textContent = 'Issue loading next question. Please restart.';
                feedbackMessage.classList.add('incorrect');
                optionsContainer.querySelectorAll('.option-btn').forEach(btn => btn.disabled = true);
            }
        }, 1500); // Wait 1.5 seconds before moving on
    } catch (error) {
        console.error('Error submitting answer:', error);
        feedbackMessage.textContent = 'Error submitting answer. Please try again.';
        feedbackMessage.classList.add('incorrect');
        optionsContainer.querySelectorAll('.option-btn').forEach(btn => btn.disabled = true); // Keep disabled on error
    }
}

/**
 * Displays the final score area and hides the game area.
 */
async function displayFinalScore() {
    try {
        const response = await fetch(`${API_BASE_URL}/score`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        finalScoreValueSpan.textContent = data.finalScore;
        totalQuestionsValueSpan.textContent = data.totalQuestions; // Use total questions from server
        
        document.querySelector('.game-area').classList.add('hidden');
        finalScoreArea.classList.remove('hidden');
        
        currentQuestionId = null; // Reset current question ID on game over
        currentScore = data.finalScore; // Ensure client score matches server
        questionsAnsweredCount = data.totalQuestions;
        updateScoreDisplay(); // Update final score in score area too

    } catch (error) {
        console.error('Error fetching final score:', error);
        finalScoreArea.innerHTML = '<h2>Error!</h2><p>Could not load final score.</p><button id="playAgainBtn" class="main-btn">Play Again</button>';
        document.querySelector('.game-area').classList.add('hidden');
        finalScoreArea.classList.remove('hidden');
    }
}

/**
 * Hides the final score area and shows the game area, ready for a new quiz.
 */
function hideFinalScoreArea() {
    finalScoreArea.classList.add('hidden');
    document.querySelector('.game-area').classList.remove('hidden');
}

// --- Event Listeners ---
restartQuizBtn.addEventListener('click', startNewQuiz);
playAgainBtn.addEventListener('click', startNewQuiz); // Use the same function for play again

// --- Initial Game Load ---
document.addEventListener('DOMContentLoaded', fetchAndDisplayQuestion); // Fetch the initial question or start new quiz
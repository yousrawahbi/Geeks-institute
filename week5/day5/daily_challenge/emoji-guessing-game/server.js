const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Emoji database
const emojis = [
    { emoji: '😀', name: 'Smile' },
    { emoji: '🐶', name: 'Dog' },
    { emoji: '🌮', name: 'Taco' },
    { emoji: '🐱', name: 'Cat' },
    { emoji: '🚗', name: 'Car' },
    { emoji: '🍕', name: 'Pizza' },
    { emoji: '⚽', name: 'Soccer Ball' },
    { emoji: '📱', name: 'Mobile Phone' },
    { emoji: '🎮', name: 'Video Game' },
    { emoji: '🍎', name: 'Apple' },
    { emoji: '🏀', name: 'Basketball' },
    { emoji: '📚', name: 'Books' },
    { emoji: '🎸', name: 'Guitar' },
    { emoji: '☕', name: 'Coffee' },
    { emoji: '🎁', name: 'Gift' },
    { emoji: '⏰', name: 'Alarm Clock' },
    { emoji: '🔑', name: 'Key' },
    { emoji: '💡', name: 'Light Bulb' },
    { emoji: '📷', name: 'Camera' },
    { emoji: '🎵', name: 'Music Note' }
];

// Game state and leaderboard
let leaderboard = [];
let currentGame = null;

// Utility function to get random elements from array
function getRandomElements(arr, count) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Generate a new game question
function generateQuestion() {
    const correctEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    const incorrectOptions = getRandomElements(
        emojis.filter(e => e.name !== correctEmoji.name), 
        3
    ).map(e => e.name);
    
    const allOptions = [correctEmoji.name, ...incorrectOptions];
    const shuffledOptions = getRandomElements(allOptions, 4);
    
    return {
        emoji: correctEmoji.emoji,
        correctAnswer: correctEmoji.name,
        options: shuffledOptions,
        questionId: Date.now()
    };
}

// Routes

// Serve the main game page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Get a new question
app.get('/api/question', (req, res) => {
    currentGame = generateQuestion();
    res.json({
        emoji: currentGame.emoji,
        options: currentGame.options,
        questionId: currentGame.questionId
    });
});

// Submit a guess
app.post('/api/guess', (req, res) => {
    const { guess, questionId, playerName } = req.body;
    
    if (!currentGame || currentGame.questionId !== parseInt(questionId)) {
        return res.status(400).json({ error: 'Invalid question' });
    }
    
    const isCorrect = guess === currentGame.correctAnswer;
    
    res.json({
        correct: isCorrect,
        correctAnswer: currentGame.correctAnswer,
        playerGuess: guess
    });
});

// Submit score to leaderboard
app.post('/api/score', (req, res) => {
    const { playerName, score } = req.body;
    
    if (!playerName || typeof score !== 'number') {
        return res.status(400).json({ error: 'Invalid score data' });
    }
    
    leaderboard.push({ playerName, score, date: new Date().toLocaleDateString() });
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 10); // Keep top 10
    
    res.json({ success: true });
});

// Get leaderboard
app.get('/api/leaderboard', (req, res) => {
    res.json(leaderboard);
});

// Start server
app.listen(PORT, () => {
    console.log(`🎮 Emoji Guessing Game running on http://localhost:${PORT}`);
});
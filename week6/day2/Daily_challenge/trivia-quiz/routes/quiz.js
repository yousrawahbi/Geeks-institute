const express = require('express');
const router = express.Router();

const triviaQuestions = [
  {
    id: 1,
    question: "What is the capital of France?",
    answer: "Paris",
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    answer: "Mars",
  },
  {
    id: 3,
    question: "What is the largest mammal in the world?",
    answer: "Blue whale",
  },
  {
    id: 4,
    question: "Who wrote 'Romeo and Juliet'?",
    answer: "William Shakespeare",
  },
  {
    id: 5,
    question: "What is the chemical symbol for gold?",
    answer: "Au",
  }
];

const userSessions = new Map();

function createSession() {
  const sessionId = Math.random().toString(36).substr(2, 9);
  userSessions.set(sessionId, {
    currentQuestionIndex: 0,
    score: 0,
    answers: [],
    completed: false
  });
  return sessionId;
}

function getCurrentQuestion(sessionId) {
  const session = userSessions.get(sessionId);
  if (!session || session.completed) return null;
  
  return triviaQuestions[session.currentQuestionIndex];
}

router.get('/', (req, res) => {
  const sessionId = createSession();
  
  const currentQuestion = getCurrentQuestion(sessionId);
  
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Trivia Quiz</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; }
        .question { background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .form-group { margin-bottom: 15px; }
        input[type="text"] { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; }
        button { background: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }
        button:hover { background: #0056b3; }
        .feedback { padding: 10px; border-radius: 4px; margin: 10px 0; }
        .correct { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
        .incorrect { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
        .progress { margin-bottom: 20px; color: #666; }
      </style>
    </head>
    <body>
      <h1>Trivia Quiz</h1>
      <div class="progress">
        Question ${userSessions.get(sessionId).currentQuestionIndex + 1} of ${triviaQuestions.length}
      </div>
      <div class="question">
        <h3>${currentQuestion.question}</h3>
        <form method="POST" action="/quiz">
          <input type="hidden" name="sessionId" value="${sessionId}">
          <div class="form-group">
            <label for="answer">Your Answer:</label>
            <input type="text" id="answer" name="answer" required>
          </div>
          <button type="submit">Submit Answer</button>
        </form>
      </div>
      <p><a href="/quiz/score?sessionId=${sessionId}">View Score</a></p>
    </body>
    </html>
  `);
});

router.post('/', (req, res) => {
  const { sessionId, answer } = req.body;
  
  if (!sessionId || !userSessions.has(sessionId)) {
    return res.redirect('/quiz');
  }
  
  const session = userSessions.get(sessionId);
  const currentQuestion = getCurrentQuestion(sessionId);
  
  if (!currentQuestion) {
    return res.redirect(`/quiz/score?sessionId=${sessionId}`);
  }
  
  const userAnswer = answer.trim().toLowerCase();
  const correctAnswer = currentQuestion.answer.toLowerCase();
  const isCorrect = userAnswer === correctAnswer;
  
  if (isCorrect) {
    session.score++;
  }
  
  session.answers.push({
    question: currentQuestion.question,
    userAnswer: answer,
    correctAnswer: currentQuestion.answer,
    isCorrect: isCorrect
  });
  
  session.currentQuestionIndex++;
  if (session.currentQuestionIndex >= triviaQuestions.length) {
    session.completed = true;
  }
  
  const nextQuestion = getCurrentQuestion(sessionId);
  
  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Trivia Quiz - Feedback</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; }
        .feedback { padding: 15px; border-radius: 8px; margin: 20px 0; }
        .correct { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
        .incorrect { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
        .question { background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        button, a.button { background: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; text-decoration: none; display: inline-block; }
        button:hover, a.button:hover { background: #0056b3; }
        .progress { margin-bottom: 20px; color: #666; }
      </style>
    </head>
    <body>
      <h1>Trivia Quiz</h1>
      <div class="feedback ${isCorrect ? 'correct' : 'incorrect'}">
        <h3>${isCorrect ? '✅ Correct!' : '❌ Incorrect!'}</h3>
        <p><strong>Question:</strong> ${currentQuestion.question}</p>
        <p><strong>Your answer:</strong> ${answer}</p>
        ${!isCorrect ? `<p><strong>Correct answer:</strong> ${currentQuestion.answer}</p>` : ''}
      </div>
  `;
  
  if (nextQuestion) {
    html += `
      <div class="progress">
        Question ${session.currentQuestionIndex + 1} of ${triviaQuestions.length}
      </div>
      <div class="question">
        <h3>${nextQuestion.question}</h3>
        <form method="POST" action="/quiz">
          <input type="hidden" name="sessionId" value="${sessionId}">
          <div class="form-group">
            <label for="answer">Your Answer:</label>
            <input type="text" id="answer" name="answer" required>
          </div>
          <button type="submit">Submit Answer</button>
        </form>
      </div>
    `;
  } else {
    html += `
      <div class="question">
        <h2>Quiz Completed!</h2>
        <p>You've answered all questions.</p>
        <a href="/quiz/score?sessionId=${sessionId}" class="button">View Final Score</a>
      </div>
    `;
  }
  
  html += `
      <p><a href="/quiz">Start New Quiz</a></p>
    </body>
    </html>
  `;
  
  res.send(html);
});

router.get('/score', (req, res) => {
  const { sessionId } = req.query;
  
  if (!sessionId || !userSessions.has(sessionId)) {
    return res.redirect('/quiz');
  }
  
  const session = userSessions.get(sessionId);
  
  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Trivia Quiz - Final Score</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; }
        .score { background: #e9ecef; padding: 30px; border-radius: 8px; text-align: center; margin-bottom: 20px; }
        .score-number { font-size: 3em; font-weight: bold; color: #007bff; }
        .answer { padding: 10px; margin: 10px 0; border-radius: 4px; }
        .correct { background: #d4edda; border-left: 4px solid #28a745; }
        .incorrect { background: #f8d7da; border-left: 4px solid #dc3545; }
        a.button { background: #007bff; color: white; padding: 10px 20px; border-radius: 4px; text-decoration: none; display: inline-block; }
        a.button:hover { background: #0056b3; }
      </style>
    </head>
    <body>
      <h1>Quiz Results</h1>
      <div class="score">
        <h2>Your Final Score</h2>
        <div class="score-number">${session.score}/${triviaQuestions.length}</div>
        <p>${Math.round((session.score / triviaQuestions.length) * 100)}%</p>
      </div>
      
      <h2>Answer Review</h2>
  `;
  
  session.answers.forEach((answer, index) => {
    html += `
      <div class="answer ${answer.isCorrect ? 'correct' : 'incorrect'}">
        <p><strong>Question ${index + 1}:</strong> ${answer.question}</p>
        <p><strong>Your answer:</strong> ${answer.userAnswer}</p>
        ${!answer.isCorrect ? `<p><strong>Correct answer:</strong> ${answer.correctAnswer}</p>` : ''}
        <p><strong>Result:</strong> ${answer.isCorrect ? '✅ Correct' : '❌ Incorrect'}</p>
      </div>
    `;
  });
  
  html += `
      <div style="margin-top: 30px;">
        <a href="/quiz" class="button">Play Again</a>
        <a href="/" style="margin-left: 10px;">Home</a>
      </div>
    </body>
    </html>
  `;
  
  res.send(html);
});

module.exports = router;
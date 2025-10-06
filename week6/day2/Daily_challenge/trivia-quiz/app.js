const express = require('express');
const quizRouter = require('./routes/quiz');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use('/quiz', quizRouter);

app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to the Trivia Quiz Game!</h1>
    <p><a href="/quiz">Start Quiz</a></p>
  `);
});

app.listen(PORT, () => {
  console.log(`Trivia Quiz server running on http://localhost:${PORT}`);
});
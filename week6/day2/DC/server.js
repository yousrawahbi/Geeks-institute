const express = require('express');
const path = require('path');
const quizRouter = require('./routes/quiz'); 

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/quiz', quizRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((req, res, next) => {
    res.status(404).send('<h1>404 Not Found</h1><p>The requested API endpoint or resource was not found.</p>');
});

app.use((err, req, res, next) => {
    console.error(err.stack); 
    res.status(500).send('<h1>500 Internal Server Error</h1><p>Something went wrong on the server.</p>');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Quiz API Endpoints available at http://localhost:3000/api/quiz');
});
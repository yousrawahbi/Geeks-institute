import express from 'express';
import {todosRouter} from './routes/todos.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/todos', todosRouter);

app.get('/', (req, res) => {
    res.json({ message: 'To-Do List API is running!' });
});

app.listen(PORT, () => {
    console.log(`To-Do API Server is running on http://localhost:${PORT}`);
});

export default app;
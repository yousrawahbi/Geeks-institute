import express from 'express';
import path from 'path';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(express.json());
app.use(express.static(path.join(path.resolve(), 'public')));

app.use('/', userRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require('express');
const app = express();
const taskRoutes = require('/routes/taskRoutes');

app.use(express.json());

app.use('/tasks', taskRoutes);

app.use((req,res) => {
    res.status(404).json({ error: 'Route not found' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
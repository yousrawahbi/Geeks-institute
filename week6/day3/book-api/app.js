const express = require('express');
const bookRoutes = require('./server/routes/bookRoutes');

const app = express();
const PORT = 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Use book routes
app.use('/api/books', bookRoutes);

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Book API is running!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
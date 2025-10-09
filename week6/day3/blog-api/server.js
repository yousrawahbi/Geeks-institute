const express = require('express');
const cors = require('cors');
const postsRoutes = require('./routes/postsRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/posts', postsRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'Blog API Server is running!',
        endpoints: {
            'GET /posts': 'Get all posts',
            'GET /posts/:id': 'Get post by ID',
            'POST /posts': 'Create new post',
            'PUT /posts/:id': 'Update post',
            'DELETE /posts/:id': 'Delete post'
        }
    });
});

app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
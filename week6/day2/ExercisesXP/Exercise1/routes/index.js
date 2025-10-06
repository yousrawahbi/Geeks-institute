import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the Homepage!',
        timestamp: new Date().toISOString()
    });
});

router.get('/about', (req, res) => {
    res.json({
        message: 'About Us Page',
        description: 'This is a simple Express.js application',
        version: '1.0.0'
    });
});

export { router as indexRouter };
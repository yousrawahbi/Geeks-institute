const express = require('express');
const router = express.Router();

const emojis = ["😀", "🎉", "🌟", "🎈", "👋"];

router.get('/', (req, res) => {
  res.render('form', { emojis, error: null });
});

router.post('/greet', (req, res) => {
  const { name, emoji } = req.body;

  if (!name || name.trim() === '') {
    return res.render('form', {
      emojis,
      error: 'Please enter your name.'
    });
  }

  res.render('greeting', { name, emoji });
});

module.exports = router;
const express = require('express');
const app = express();
const booksRouter = require('./routes/books');

app.use(express.json());
app.use('/books', booksRouter);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

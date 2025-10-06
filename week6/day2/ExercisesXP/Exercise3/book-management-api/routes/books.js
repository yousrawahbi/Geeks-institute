const express = require('express');
const router = express.Router();

let books = [];
let nextId = 1;

const findBookById = (id) => {
  return books.find(book => book.id === parseInt(id));
};

router.get('/', (req, res) => {
  res.json({
    message: 'Books retrieved successfully',
    data: books
  });
});

router.get('/:id', (req, res) => {
  const book = findBookById(req.params.id);
  
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  
  res.json({
    message: 'Book retrieved successfully',
    data: book
  });
});

router.post('/', (req, res) => {
  const { title, author, publishedYear } = req.body;
  
  if (!title || !author) {
    return res.status(400).json({ 
      error: 'Title and author are required fields' 
    });
  }
  
  const newBook = {
    id: nextId++,
    title,
    author,
    publishedYear: publishedYear || null,
    createdAt: new Date().toISOString()
  };
  
  books.push(newBook);
  
  res.status(201).json({
    message: 'Book created successfully',
    data: newBook
  });
});

router.put('/:id', (req, res) => {
  const book = findBookById(req.params.id);
  
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  
  const { title, author, publishedYear } = req.body;
  
  if (title) book.title = title;
  if (author) book.author = author;
  if (publishedYear !== undefined) book.publishedYear = publishedYear;
  book.updatedAt = new Date().toISOString();
  
  res.json({
    message: 'Book updated successfully',
    data: book
  });
});

router.delete('/:id', (req, res) => {
  const bookIndex = books.findIndex(book => book.id === parseInt(req.params.id));
  
  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }
  
  const deletedBook = books.splice(bookIndex, 1)[0];
  
  res.json({
    message: 'Book deleted successfully',
    data: deletedBook
  });
});

module.exports = router;
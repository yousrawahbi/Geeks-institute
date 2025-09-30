const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let posts = [
  { id: 1, title: 'First Post', content: 'This is my first blog post!' },
  { id: 2, title: 'Second Post', content: 'This is my second blog post!' }
];
let nextId = 3;

app.get('/posts', (req, res) => {
  res.json(posts);
});
app.get('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find(p => p.id === id);
  
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  
  res.json(post);
});

app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  
  const newPost = {
    id: nextId++,
    title,
    content
  };
  
  posts.push(newPost);
  res.status(201).json(newPost);
});

app.put('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const postIndex = posts.findIndex(p => p.id === id);
  
  if (postIndex === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }
  
  const { title, content } = req.body;
  
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  
  posts[postIndex] = { id, title, content };
  res.json(posts[postIndex]);
});

app.delete('/posts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const postIndex = posts.findIndex(p => p.id === id);
  
  if (postIndex === -1) {
    return res.status(404).json({ error: 'Post not found' });
  }
  
  posts = posts.filter(p => p.id !== id);
  res.status(204).send();
});

app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Blog API server running on http://localhost:${PORT}`);
});
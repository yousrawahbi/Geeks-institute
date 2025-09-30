import express from 'express';
import { 
  fetchPosts, 
  fetchPostById, 
  createPost, 
  updatePost, 
  deletePost 
} from './data/dataService.js';

const app = express();
const PORT = 5000;

app.use(express.json());

app.get('/api/posts', async (req, res) => {
  try {
    const posts = await fetchPosts();
    console.log('Data successfully retrieved from JSONPlaceholder API');
    res.json(posts);
  } catch (error) {
    console.error('Error in /api/posts route:', error.message);
    res.status(500).json({ 
      error: 'Failed to retrieve posts',
      details: error.message 
    });
  }
});

app.get('/api/posts/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id) || id < 1) {
      return res.status(400).json({ error: 'Invalid post ID' });
    }
    
    const post = await fetchPostById(id);
    console.log(`Post ${id} successfully retrieved from JSONPlaceholder API`);
    res.json(post);
  } catch (error) {
    console.error(`Error in /api/posts/${req.params.id} route:`, error.message);
    res.status(500).json({ 
      error: 'Failed to retrieve post',
      details: error.message 
    });
  }
});

app.post('/api/posts', async (req, res) => {
  try {
    const { title, body, userId } = req.body;
    
    if (!title || !body || !userId) {
      return res.status(400).json({ 
        error: 'Title, body, and userId are required' 
      });
    }
    
    const newPost = await createPost({ title, body, userId });
    console.log('New post created (simulated)');
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error in POST /api/posts route:', error.message);
    res.status(500).json({ 
      error: 'Failed to create post',
      details: error.message 
    });
  }
});

app.put('/api/posts/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id) || id < 1) {
      return res.status(400).json({ error: 'Invalid post ID' });
    }
    
    const { title, body, userId } = req.body;
    
    if (!title || !body || !userId) {
      return res.status(400).json({ 
        error: 'Title, body, and userId are required' 
      });
    }
    
    const updatedPost = await updatePost(id, { title, body, userId });
    console.log(`Post ${id} updated (simulated)`);
    res.json(updatedPost);
  } catch (error) {
    console.error(`Error in PUT /api/posts/${req.params.id} route:`, error.message);
    res.status(500).json({ 
      error: 'Failed to update post',
      details: error.message 
    });
  }
});

app.delete('/api/posts/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id) || id < 1) {
      return res.status(400).json({ error: 'Invalid post ID' });
    }
    
    await deletePost(id);
    console.log(`Post ${id} deleted (simulated)`);
    res.status(204).send();
  } catch (error) {
    console.error(`Error in DELETE /api/posts/${req.params.id} route:`, error.message);
    res.status(500).json({ 
      error: 'Failed to delete post',
      details: error.message 
    });
  }
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'CRUD API with External Data',
    endpoints: {
      getAllPosts: 'GET /api/posts',
      getPostById: 'GET /api/posts/:id',
      createPost: 'POST /api/posts',
      updatePost: 'PUT /api/posts/:id',
      deletePost: 'DELETE /api/posts/:id'
    }
  });
});

app.listen(PORT, () => {
  console.log(`CRUD API server running on http://localhost:${PORT}`);
});
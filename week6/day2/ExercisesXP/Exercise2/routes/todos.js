import express from 'express';
const router = express.Router();


export { router as todosRouter };
let todos = [];
let nextId = 1

router.get('/', (req, res) => {
    res.json({
        message: 'All to-do items retrieved successfully',
        data: todos
    });
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
    
    if (!todo) {
        return res.status(404).json({ error: 'To-do item not found' });
    }
    
    res.json({
        message: 'To-do item retrieved successfully',
        data: todo
    });
});

router.post('/', (req, res) => {
    const { title, description, completed = false } = req.body;
    
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }
    
    const newTodo = {
        id: nextId++,
        title,
        description: description || '',
        completed: Boolean(completed),
        createdAt: new Date().toISOString()
    };
    
    todos.push(newTodo);
    
    res.status(201).json({
        message: 'To-do item created successfully',
        data: newTodo
    });
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, description, completed } = req.body;
    const todoIndex = todos.findIndex(t => t.id === id);
    
    if (todoIndex === -1) {
        return res.status(404).json({ error: 'To-do item not found' });
    }
    
    if (title !== undefined) todos[todoIndex].title = title;
    if (description !== undefined) todos[todoIndex].description = description;
    if (completed !== undefined) todos[todoIndex].completed = Boolean(completed);
    todos[todoIndex].updatedAt = new Date().toISOString();
    
    res.json({
        message: 'To-do item updated successfully',
        data: todos[todoIndex]
    });
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todoIndex = todos.findIndex(t => t.id === id);
    
    if (todoIndex === -1) {
        return res.status(404).json({ error: 'To-do item not found' });
    }
    
    const deletedTodo = todos.splice(todoIndex, 1)[0];
    
    res.json({
        message: 'To-do item deleted successfully',
        data: deletedTodo
    });
});

export default router;
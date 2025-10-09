const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname,'../data/task.json');


const readTasks = () => {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

const writeTasks = (tasks) => {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), 'utf-8');
};


exports.getAllTasks = (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
};

exports.getTaskById = (req, res) => {
  const tasks = readTasks();
  const task = tasks.find(t => t.id == req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
};

exports.createTask = (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });

  const tasks = readTasks();
  const newTask = {
    id: Date.now(),
    title,
    description: description || ''
  };

  tasks.push(newTask);
  writeTasks(tasks);
  res.status(201).json(newTask);
};


exports.updateTask = (req, res) => {
  const { title, description } = req.body;
  const tasks = readTasks();
  const taskIndex = tasks.findIndex(t => t.id == req.params.id);

  if (taskIndex === -1) return res.status(404).json({ error: 'Task not found' });
  if (!title) return res.status(400).json({ error: 'Title is required' });

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title,
    description: description || ''
  };

  writeTasks(tasks);
  res.json(tasks[taskIndex]);
};

exports.deleteTask = (req, res) => {
  const tasks = readTasks();
  const newTasks = tasks.filter(t => t.id != req.params.id);

  if (tasks.length === newTasks.length) return res.status(404).json({ error: 'Task not found' });

  writeTasks(newTasks);
  res.json({ message: 'Task deleted successfully' });
};
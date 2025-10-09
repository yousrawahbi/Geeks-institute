import express from 'express';
import fs from 'fs/promises';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const usersFile = 'users.json';

// Helper: read users from JSON file
async function readUsers() {
  try {
    const data = await fs.readFile(usersFile, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Helper: write users to JSON file
async function writeUsers(users) {
  await fs.writeFile(usersFile, JSON.stringify(users, null, 2));
}

// POST /register
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, username, password } = req.body;
  if (!firstName || !lastName || !email || !username || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const users = await readUsers();

    // Check username or email exists
    if (users.find(u => u.username === username)) {
      return res.status(409).json({ message: 'Username already exists' });
    }
    if (users.find(u => u.email === email)) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: uuidv4(),
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
    };

    users.push(newUser);
    await writeUsers(users);

    res.status(201).json({ message: `User ${username} registered successfully!` });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const users = await readUsers();
    const user = users.find(u => u.username === username);

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.json({ message: `Welcome back, ${user.username}!` });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /users
router.get('/users', async (req, res) => {
  try {
    const users = await readUsers();
    const usersSafe = users.map(({ password, ...rest }) => rest);
    res.json(usersSafe);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /users/:id
router.get('/users/:id', async (req, res) => {
  try {
    const users = await readUsers();
    const user = users.find(u => u.id === req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const { password, ...userSafe } = user;
    res.json(userSafe);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT /users/:id
router.put('/users/:id', async (req, res) => {
  try {
    const { firstName, lastName, email, username, password } = req.body;
    const users = await readUsers();
    const userIndex = users.findIndex(u => u.id === req.params.id);

    if (userIndex === -1) return res.status(404).json({ message: 'User not found' });

    if (username && users.some((u, idx) => u.username === username && idx !== userIndex)) {
      return res.status(409).json({ message: 'Username already in use' });
    }
    if (email && users.some((u, idx) => u.email === email && idx !== userIndex)) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    if (firstName) users[userIndex].firstName = firstName;
    if (lastName) users[userIndex].lastName = lastName;
    if (email) users[userIndex].email = email;
    if (username) users[userIndex].username = username;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      users[userIndex].password = hashedPassword;
    }

    await writeUsers(users);
    const { password: _, ...updatedUser } = users[userIndex];
    res.json({ message: 'User updated', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/todo', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Task Schema
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
});

const Task = mongoose.model('Task', taskSchema);

// Routes
app.get('/api/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.post('/api/tasks', async (req, res) => {
    const { title } = req.body;
    if (!title) return res.status(400).send('Title is required');
    const newTask = new Task({ title });
    await newTask.save();
    res.status(201).json(newTask);
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

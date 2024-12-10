import React, { useState, useEffect } from 'react';
import './styles.css';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

  
    useEffect(() => {
        fetch('http://localhost:5000/api/tasks')
            .then((res) => res.json())
            .then((data) => setTasks(data))
            .catch((err) => console.error('Error fetching tasks:', err));
    }, []);

     
    const addTask = () => {
        if (!newTask) return;
        fetch('http://localhost:5000/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newTask }),
        })
            .then((res) => res.json())
            .then((task) => {
                setTasks([...tasks, task]);
                setNewTask('');
            })
            .catch((err) => console.error('Error adding task:', err));
    };

    return (
        <div className="app">
            <h1>To-Do List</h1>
            <div className="task-input">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task..."
                />
                <button onClick={addTask}>Add</button>
            </div>
            <ul className="task-list">
                {tasks.map((task) => (
                    <li key={task._id}>{task.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;

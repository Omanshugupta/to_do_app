import React, { useState } from 'react';
import axios from 'axios';

const AddTask = () => {
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/api/tasks', { title })
            .then(() => {
                setTitle('');
                window.location.reload(); 
            })
            .catch((error) => console.log(error));
    };

    return (
        <div>
            <h1>Add a New Task</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter task title"
                    required
                />
                <button type="submit">Add Task</button>
            </form>
        </div>
    );
};

export default AddTask;

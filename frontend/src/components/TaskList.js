import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/tasks')
            .then((response) => setTasks(response.data))
            .catch((error) => console.log(error));
    }, []);

    return (
        <div>
            <h1>Task List</h1>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id}>{task.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;

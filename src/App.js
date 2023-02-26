
import './App.css';
import React, { useState, useEffect } from 'react';
import http from "./http-common";

// function App() {
  
  const App = () => {
    
    const [tasks, setTasks] = useState([]);
    const [name, setname] = useState('');
  
    
    useEffect(() => {
      http.get('/gettasks')
        .then(response => {
          setTasks(response.data);
        });
    }, []);
  

  
    const handleNewTask = () => {
     
     { http.post('/tasks', { name: name,status:"Created"})
        .then(response => {
          setTasks([...tasks, response.data]);
          setname('');
        });
    };
  };
    
    const handleTaskStatus = (id) => {
      const taskIndex = tasks.findIndex(task => task.id === id);
      const task = tasks[taskIndex];
  
      http.put(`/tasks/status/${id}`, {status: 'COMPLETED' })
        .then((response) => { http.get('/gettasks')
        .then(response => {
          setTasks(response.data);
        });
        });
       

    };
  
    const handleTaskDelete = (id) => {
      http.delete(`/delete/${id}`)
        .then(() => {
          setTasks(tasks.filter(task => task.id !== id));
        });
    };
  return (
    <div> 
      <div>
      <h4>TASK</h4>
        {/* <input type="text" value={newTaskText} onChange={e => setNewTaskText(e.target.value)} /> */}
        <input type="text" value={name} required onChange={e => setname(e.target.value)} />
        <button onClick={handleNewTask}><span>+</span> Add a task</button>

      </div>
      <ul className="tastList">
        {tasks.map(task => (
          <li key={task.id}>
            {/* <span onClick={() => handleTaskStatus(task.id)}>○</span> */}
            <input
                type="checkbox"
                value={task.status}
                checked={task.status=="COMPLETED"}
                onClick={() => handleTaskStatus(task.id)}
                // onChange={e => setstatus(e.target.checked)}           
                   />
            <span>&nbsp;{task.name}</span>
            
            <button onClick={() => handleTaskDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;


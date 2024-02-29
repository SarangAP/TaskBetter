import React, { useState } from "react";
import TaskCard from "./TaskCard";


function TasksView({tasks}) {
  // const [tasks, setTasks] = useState([]);

  // const addTask = (task) => {
  //   setTasks([...tasks, task]);
  // }
  return (
    <div className="container-fluid h-125 pt-5 pb-5 pl-2 pr-2 rounded-4" style={{
        backgroundColor: "#A1D0D0",
      }}>
            {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <TaskCard task={task} />
            // <li key={task.id}>{task.title} - {task.description}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TasksView;

import React, { useState, useEffect } from "react";
import TaskCard from "./TaskCard";

function TasksView({ tasks, handleDelete, handleUpdate }) {
  // const [tasks, setTasks] = useState([]);

  // const addTask = (task) => {
  //   setTasks([...tasks, task]);
  // }
  useEffect(() => {
    const fetchTasksOnLoad = async () => {
      fetch("http://127.0.0.1:8000/tasks/", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + sessionStorage.getItem("token"),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Getting data",data);
        })
        .catch((error) => {
          console.log("Error gettign data",error);
        });
    };
  }, []);
  return (
    <div
      className="container pt-5 pb-5 pl-2 pr-2 rounded-4 text-center overflow-scroll"
      style={{
        backgroundColor: "#A1D0D0",
        height: "80vh",
      }}
    >
      {tasks.length === 0 ? (
        <div className="row m-2 d-inline-block">
          <p>No tasks yet.</p>
        </div>
      ) : (
        <div className="row m-2 text-left">
          <ul>
            {tasks.map((task) => (
              <TaskCard task={task} handleDelete={handleDelete} handleUpdate={handleUpdate} />
              // <li key={task.id}>{task.title} - {task.description}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TasksView;

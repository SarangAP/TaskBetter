import React, { useState } from "react";
import TaskForm from "./TaskForm";
import TasksView from "./TasksView";

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };
  const deleteTask = (taskD) => {
    // temp code for deleting task, need to create post req to backend
    // for full functionality
    const updatedTasks = tasks.filter((task) => {
      return task.title !== taskD.title || task.body !== taskD.body;
    });
    setTasks(updatedTasks);
  };
  // implement task update
  // such that when completed updates backend
  const updateTask = (taskU) => {};

  return (
    <div
      className="container-fluid vh-100"
      style={{
        // backgroundColor: "#A1D0D0",
        fontFamily: "Lexend Exa, sans-serif",
      }}
    >
      <div className="row m-4 mt-0 h-75">
        <div className="col-md-1"></div>
        <div className="col-md-3">
          <h4 className="m-2">Create a Task</h4>
          <TaskForm addTask={addTask} />
        </div>
        <div className="col-md-3"></div>
        <div className="col-md-4 mt-3">
          <TasksView tasks={tasks} handleDelete={deleteTask} />
        </div>
        <div className="col-md-1"></div>
      </div>
    </div>
  );
};

export default TaskPage;

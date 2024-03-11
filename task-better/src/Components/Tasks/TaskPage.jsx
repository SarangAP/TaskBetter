import React, { useState } from "react";
import TaskForm from "./TaskForm";
import TasksView from "./TasksView";

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

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
          <TasksView tasks={tasks} />
        </div>
        <div className="col-md-1"></div>
      </div>
    </div>
  );
};

export default TaskPage;

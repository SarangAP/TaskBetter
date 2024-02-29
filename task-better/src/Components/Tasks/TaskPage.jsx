import React from "react";
import TaskForm from "./TaskForm";

const TaskPage = () => {
  return (
    <div
      className="container-fluid"
      style={{
        backgroundColor: "#A1D0D0",
        fontFamily: "Lexend Exa, sans-serif",
      }}
    >
      <div className="row">
        <div className="col">
          <h1>Task Better</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <TaskForm />
        </div>
      </div>
    </div>
  );
};

export default TaskPage;

import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TasksView from "./TasksView";

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
        console.log("Getting data", data);
        setTasks([...data])
      })
      .catch((error) => {
        console.log("Error gettign data", error);
      });
  };
  useEffect(() => {
    fetchTasksOnLoad()
  }, []);

  useEffect(() => {
    if (!user) {
      console.log("NO USER");
      setUser(JSON.parse(sessionStorage.getItem("user")));
      console.log("USER FOUND", user);
    }
  });

  useEffect(() => { console.log(tasks) }, [tasks])

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };
  const deleteTask = (taskD) => {
    // Sending backedn DELETE req to delete task
    taskD.delete = true
    fetch("http://127.0.0.1:8000/tasks/", {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify(taskD)
    }).then(response => response.json())
      .then(data => {
        console.log("Task Deleted", data)
      })
      .catch(error => {
        console.log("Error deleting task", error)
      })
    const updatedTasks = tasks.filter(task => task.task_id != taskD.task_id)
    setTasks(updatedTasks)
  };

  // implment task update/tasks
  // such that when completed updates backend
  const updateTask = (taskU) => {
    console.log(taskU)
    fetch("http://127.0.0.1:8000/tasks/", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify(taskU)
    }).then(response => response.json())
      .then(data => {
        console.log("Task Updated", data)
      })
      .catch(error => {
        console.log("Error updating task", error)
      })
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
          <TaskForm addTask={addTask} />        </div>
        <div className="col-md-3"></div>
        <div className="col-md-4 mt-3">
          <TasksView tasks={tasks} handleDelete={deleteTask} handleUpdate={updateTask} />
        </div>
        <div className="col-md-1"></div>
      </div>
    </div>
  );
};

export default TaskPage;

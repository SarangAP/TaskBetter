import React, { useState, useEffect } from "react";
import TaskCard from "./TaskCard";

function TasksView({ tasks, handleDelete, handleUpdate }) {
  // const [tasks, setTasks] = useState([]);

  // const addTask = (task) => {
  //   setTasks([...tasks, task]);
  // }
  const [filterType, setFilterType] = useState("none");
  const [filter, setFilter] = useState("");
  const [filterTasks, setFilterTasks] = useState(tasks);

  // You can use this 'tasks' array in your React component or elsewhere in your application.
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
          console.log("Getting data", data);
        })
        .catch((error) => {
          console.log("Error gettign data", error);
        });
    };
  }, []);

  useEffect(() => {
    const filterUpdate = () => {
      const filterTasks = tasks.filter((task) => {
        if (filterType === "none") {
          return true;
        }
        if (filterType === "name") {
          return task.title.includes(filter);
        } else if (filterType === "date" && filter !== "") {
          return task.due_date === filter;
        }
        return true; // Show all tasks if no filter applied
      });
      setFilterTasks(filterTasks);
    };

    filterUpdate(); // Call filterUpdate initially
  }, [tasks, filterType, filter]); // Add filter and filterType as dependencies

  const handleSelectChange = (e) => {
    setFilterType(e.target.value);
    setFilter('')
  };

  const handleInputChange = (e) => {
    setFilter(e.target.value);
  };
  return (
    <div
      className="container pt-3 pb-5 pl-2 pr-2 rounded-4 text-center overflow-scroll"
      style={{
        backgroundColor: "#A1D0D0",
        height: "80vh",
      }}
    >
      <div class="d-flex">
        <select class="col-md-3" onChange={handleSelectChange}>
          <option value="none">None</option>
          <option value="name">Name</option>
          <option value="date">Date</option>
        </select>
        {filterType === "name" ? (
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Task Title"
            onChange={handleInputChange}
            value={filter}
          />
        ) : (
          <input
            type="date"
            className="form-control"
            id="dueDate"
            value={filter}
            onChange={handleInputChange}
          />
        )}
      </div>
      {tasks.length === 0 ? (
        <div className="row m-2 d-inline-block">
          <p>No tasks yet.</p>
        </div>
      ) : (
        <div className="row m-2 text-left">
          <ul>
            {filterTasks.map((task) => (
              <TaskCard
                task={task}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
              />
              // <li key={task.id}>{task.title} - {task.description}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TasksView;

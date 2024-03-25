import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [dueDate, setDueDate] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if title and description are empty
    if (title.trim() === "" || description.trim() === "" || dueDate === "") {
      console.log("Title and description cannot be empty");
      alert("Please fill out all the field");
      // return;
    } else {
      fetch("http://127.0.0.1:8000/tasks/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + sessionStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, completed }), // will need to add due date here when django view is modified
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response data
          console.log("New Task that is being added",data);
          console.log("Selected due date", dueDate);
          if (Array.isArray(data.title) || Array.isArray(data.description))
            throw new Error("Invalid title or description");
          addTask(data);
          setTitle("");
          setDescription("");
          setDueDate("");
        })
        .catch((error) => {
          // Handle any errors
          console.error(error);
        });
    }
  };

  return (
    <div
      className="container pt-5 pb-5 pl-2 pr-2 rounded-4 overflow-scroll text-center"
      style={{
        backgroundColor: "#A1D0D0",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            id="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div classname="mb-3">
          <label> Set due date</label>
          <input
            type="date"
            className="form-control"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            />
        </div>
        <br></br>
        <button type="submit" className="btn btn-primary mx-auto">
          Submit
        </button>
      </form>
    </div>
  );
};

export default TaskForm;

import React, { useState } from "react";

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(0);
  const [due_date, setDueDate] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(JSON.stringify({ title, description, completed, due_date }))
    // Check if title and description are empty
    if (title.trim() === "" || description.trim() === "" || due_date === "") {
      console.log("Title and description cannot be empty");
      alert("Please fill out all the field");
      // return;
    } else {
      fetch("http://35.221.5.174:8000/tasks/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + sessionStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, completed, due_date }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response data
          console.log("New Task that is being added",data);
          console.log("Selected due date", due_date);
          if (Array.isArray(data.title) || Array.isArray(data.description))
            throw new Error("Invalid title or description");
          addTask(data);
          setTitle("");
          setDescription("");
          setDueDate("");
        })
        .catch((error) => {
          console.log('error')
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
        <div className="mb-3">
          <label> Set due date</label>
          <input
            type="date"
            className="form-control"
            id="dueDate"
            value={due_date}
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

import React, { useState } from "react";

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if title and description are empty
    if (title.trim() === "" || description.trim() === "") {
      console.log("Title and description cannot be empty");
      // return;
    } else {
      fetch("http://127.0.0.1:8000/tasks/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + sessionStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, completed }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response data
          console.log("New Task that is being added",data);
          if (Array.isArray(data.title) || Array.isArray(data.description))
            throw new Error("Invalid title or description");
          addTask(data);
          setTitle("");
          setDescription("");
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
        <button type="submit" className="btn btn-primary mx-auto">
          Submit
        </button>
      </form>
    </div>
  );
};

export default TaskForm;

import React, { useState, useEffect } from "react";

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    getUserProfile();
  }, []);

  useEffect(() => {
    console.log("Current user is: ", currentUser.username);
  }, [currentUser]);
  
  //Using profile view to retrieve username of current logged in user
  const getUserProfile = () => {
    fetch("http://127.0.0.1:8000/profile/", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + sessionStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCurrentUser(data);
        console.log(currentUser.username);
      })
      .catch((error) => {
        console.error("Error getting user info:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if title and description are empty
    if (title.trim() === "" || description.trim() === "") {
      console.log("Title and description cannot be empty");
      // return;
    }

    // Temporary code for displaying created tasks in tasks view
    addTask({ title, body: description,});

       
    fetch("http://127.0.0.1:8000/tasks/", {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Token '+sessionStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, user: currentUser.username }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
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

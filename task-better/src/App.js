import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import TaskPage from "./Components/Tasks/TaskPage";
import Profile from "./Components/Profile";
import Authenticated from "./Components/Template/Authenticated";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/home" element={<Authenticated page={<Home/>}/>} />
        <Route path="/tasks" element={<Authenticated page={<TaskPage />}/>} />
        <Route path="/profile" element={<Authenticated page={<Profile />}/>} />
      </Routes>
    </Router>
  );
}

export default App;

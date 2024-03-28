import React, {} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import TaskPage from "./Components/Tasks/TaskPage";
import Profile from "./Components/Profile/Profile";
import Authenticated from "./Components/Template/Authenticated";
import Register from "./Components/Register/Register"
import Landing from "./Components/Landing/Landing"
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <Router>
      <div className="pages">
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/home" element={<Authenticated page={<Home/>}/>} />
        <Route path="/tasks" element={<Authenticated page={<TaskPage />}/>} />
        <Route path="/profile" element={<Authenticated page={<Profile />}/>} />
      </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

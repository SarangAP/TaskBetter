import React, { useEffect } from "react";
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
import ReactGA from "react-ga";
import PrivacyPolicy from "./Components/Privacy/Privacy";
import Terms from "./Components/Terms/Terms";
import Leaderboard from "./Components/Leaderboard/Leaderboard";
import ErrorPage from "./Components/404/404";

function App() {
  useEffect(() => {
    ReactGA.initialize("G-L5GP1M1ZKF");
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  return (
    <Router>
      <div className="pages">
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/privacy" element={<PrivacyPolicy/>} />
        <Route path="/terms" element={<Terms/>} />
        <Route path="/home" element={<Authenticated page={<Home/>}/>} />
        <Route path="/tasks" element={<Authenticated page={<TaskPage />}/>} />
        <Route path="/profile" element={<Authenticated page={<Profile />}/>} />
        <Route path="/leaderboard" element={<Authenticated page={<Leaderboard />}/>} />
        <Route path="*" element={<ErrorPage />} />

      </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

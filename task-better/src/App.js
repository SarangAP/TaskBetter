import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login'
import Home from './Components/Home/Home';
import TaskPage from './Components/Tasks/TaskPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tasks" element={<TaskPage />} />
      </Routes>
    </Router>

  );
}

export default App;

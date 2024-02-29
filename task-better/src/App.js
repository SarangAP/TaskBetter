import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login'
import Home from './Components/Home/Home';
import Nav from './Components/Nav/Nav';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginContainer />} />
        <Route path="/home" element={<DefaultContainer><Home/></DefaultContainer>} />
      </Routes>
    </Router>

  );
}
const LoginContainer = () => (
  <div className="container">
    <Login />
  </div>
);

// Default Container (Includes navigation bar)
const DefaultContainer = ({ children }) => (
  <div>
    <Nav/>
    {children}
  </div>
);


export default App;

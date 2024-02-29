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
        <Route element={<DefaultContainer/>}> <Route path="/home" element={<Home />} /></Route>
      </Routes>
    </Router>

  );
}
const LoginContainer = () => (
  <div className="container">
    {/* <Route exact path="/" element={<Redirect to="/login" />} /> */}
    <Route path="/login" element={<Login />} />
  </div>
);

// Default Container (Includes navigation bar)
const DefaultContainer = ({ children }) => (
  <div>
    <Nav/>
    <div className="container">
      {children}
    </div>
  </div>
);


export default App;

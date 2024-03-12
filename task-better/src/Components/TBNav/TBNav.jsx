import React from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa'; // Example icon from React Icons
import './TBNav.css'

const TBNav = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          TaskBetter
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FaBars />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/Home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/logout">
                Logout
              </Link>
            </li>
            
              <div class="dropdown">
    <button class="dropbtn">Profile
      <i class="fa fa-caret-down"></i>
    </button>
    <div class="dropdown-content">
      <a href="#">Link 1</a>
      <a href="#">Link 2</a>
      <a href="#">Link 3</a>
    </div>
  </div>
   
    <select name="" id=""> 
        <option value="rigatoni">Rigatoni</option> 
        <option value="dave">Dave</option> 
        <option value="pumpernickel">Pumpernickel</option> 
        <option value="reeses">Reeses</option> 
    </select>
          </ul>
          </div>
        </div>
      </nav>
            
    
    
          
            
          
        
  );
};

export default TBNav;



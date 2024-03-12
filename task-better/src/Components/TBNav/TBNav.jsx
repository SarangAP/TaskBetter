import React, {useState} from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa"; // Example icon from React Icons
import "./TBNav.css";

const TBNav = () => {
  const [showAccountMenu, setAccountMenu] = useState(false)
  const handleProfileClick = ()=>{
    setAccountMenu(true)
  }
  const closeAccountMenu = () => {
    setAccountMenu(false)
  }
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
            <li className="nav-item">
              <label className="nav-link" onClick={handleProfileClick}>
              Profile
              </label>
              { showAccountMenu ? (
              
              <div className="h-auto w-10 position-absolute d-flex flex-column rounded-4 dropdown p-4 ">
                <p onClick={closeAccountMenu}>Hello There</p>
                <Link>This is an item</Link>
                <Link>This is an item</Link>
                <Link>This is an item</Link>
                <Link>This is an item</Link>
              </div>) : (<></>)
              }
            </li>

            {/*<div className="dropdown">
              <button className="dropbtn">
                <Link className="">
                Profile
                </Link>
                <i className="fa fa-caret-down"></i>
              </button>
              <div className="dropdown-content">
                <a href="#">Link 1</a>
                <a href="#">Link 2</a>
                <a href="#">Link 3</a>
              </div>
            </div>*/}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default TBNav;

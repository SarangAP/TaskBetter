import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa"; // Example icon from React Icons
import "./TBNav.css";

const TBNav = () => {
  const [showAccountMenu, setAccountMenu] = useState(false);
  const handleProfileClick = () => {
    setAccountMenu(true);
  };
  const closeAccountMenu = () => {
    setAccountMenu(false);
  };
  const logout = async () => {
    /*Need to add the back end request for logout if implemented*/
    try {
      const response = await fetch("http://localhost:8000/logout/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Token ' + sessionStorage.getItem('token')
        },
      });
      if (response.ok) {
        console.log("Logout successful", response);
        response.json().then((data) => {
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("user");
          window.location.href = "/";
        });
      } else {
        const data = await response.json();
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }

  };
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
              <Link className="nav-link" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tasks">
                Tasks
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <label className="nav-link" onClick={handleProfileClick}>
                Quick Dropdown
              </label>
              {showAccountMenu ? (
                <div className="h-auto w-10 position-absolute d-flex flex-column rounded-4 dropdown p-4 ">
                  <p onClick={closeAccountMenu}>Click to Close</p>
                  <label className="nav-link" onClick={logout}>
                    Logout
                  </label>
                </div>
              ) : (
                <></>
              )}
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

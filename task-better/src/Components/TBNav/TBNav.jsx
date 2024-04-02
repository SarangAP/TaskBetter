import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa"; // Example icon from React Icons
import "./TBNav.css";
import TaskBetter_Image from "./TaskBetterLogo.svg";

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
          Authorization: "Token " + sessionStorage.getItem("token"),
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

  const buttonbug = () => {
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/home">
          {/*<img src={TaskBetter_Image} alt="TaskBetter Logo" />*/}
          <label className="fs-2">Task</label><label className="fs-2" style={{'color':'#008be6'}}>Better</label>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={buttonbug}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link hoverlink" to="/home">
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
                More
              </label>
              {showAccountMenu ? (
                <div className="h-auto w-10 position-absolute d-flex flex-column rounded-4 dropdown p-4" style={{'z-index': '1000'}}>
                  <p onClick={closeAccountMenu}>Click to Close</p>
                  <label className="nav-link" onClick={logout}>
                    Logout
                  </label>
                </div>
              ) : (
                <></>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default TBNav;

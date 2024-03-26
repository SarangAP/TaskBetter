import React from "react";
import { Link } from "react-router-dom";
import TaskBetter_Image from "../TBNav/TaskBetterLogo.svg";
import "./Landing.css";

const Landing = () => {
  return (
    <div>
      <div className="landing-container">
        <div className="landing-content">
          <div className="logo">
            <img src={TaskBetter_Image} alt="TaskBetter Logo" className="logo-img" />
          </div>
          <h1 className="landing-heading">Welcome to TaskBetter</h1>
          <p className="landing-text">Your go-to platform for efficient task management.</p>
          <div className="buttons">
            <Link to="/login" className="btn btn-primary">Login</Link>
            <Link to="/register" className="btn btn-secondary">Register</Link>
          </div>
        </div>
      </div>

      <div className="about-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <h2 className="section-heading">About Us</h2>
              <p className="section-text">We can discuss about us here</p>
            </div>
          </div>
        </div>
      </div>

      <div className="who-we-are-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <h2 className="section-heading">Who We Are</h2>
              <p className="section-text">Might add team member info here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;

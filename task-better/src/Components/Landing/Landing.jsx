import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TaskBetter_Image from "../TBNav/TaskBetterLogo.svg";
import "./Landing.css";

const Landing = () => {
  const TeamMember = ({ name, title }) => {
    return (
      <div className="team-member">
        <h2 className="name">{name}</h2>
        <p className="title">{title}</p>
      </div>
    );
  };
  const TaskAnimation = () => {
    return (
      <div className="animated-text">
        <span className="task-part">T</span>
        <span className="task-part">a</span>
        <span className="task-part">s</span>
        <span className="task-part">k</span>
        <span className="better-part">B</span>
        <span className="better-part">e</span>
        <span className="better-part">t</span>
        <span className="better-part">t</span>
        <span className="better-part">e</span>
        <span className="better-part">r</span>
      </div>
    );
  };
  return (
    <div>
      <div className="landing-container">
        <div className="landing-content">
          <div className = "fade-logo">
            <TaskAnimation />
          </div>
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
                <div className="team-members">
                  <div className="team-member">
                  <TeamMember
                    name="Sarang Patel"
                    title="Founder"
                  />
                  </div>
                  <div className="team-member">
                  <TeamMember
                    name="Burhanuddin Mogul"
                    title="Frontend Developer"
                  />
                  </div>
                  <div className="team-member">
                  <TeamMember
                    name="Raymond Moody"
                    title="Backend Developer"
                  />
                  </div>
                  <div className="team-member">
                  <TeamMember
                    name="Romil Patel"
                    title="Frontend Developer"
                  />
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;

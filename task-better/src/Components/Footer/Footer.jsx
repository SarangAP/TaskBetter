import React from "react";
import "./Footer.css";
import TaskBetter_Image from "../TBNav/TaskBetterLogo.svg"

const Footer = () => {
    return (
      <footer className="footer">
        <div className="content">
          <div className="logo">
            <img src={TaskBetter_Image} alt="TaskBetter Logo" />
          </div>
          <nav className="footer-nav">
            <div className="link-title">
              <h2>Links</h2>
            </div>
            <ul>
              <li><a href="/">Welcome Page</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
            </ul>
          </nav>
        </div>
        <div className="copyright">
        <p>© 2024 TaskBetter | All Rights Reserved</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
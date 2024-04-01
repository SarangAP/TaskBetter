import React, { useState } from "react";
import "./Footer.css";
import TaskBetter_Image from "../TBNav/TaskBetterLogo.svg"

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("You have successfully signed up!");
    setEmail("");
  }

  const handleChange = (e) => {
    setEmail(e.target.value);
  }

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
              <li><a href="/home">Home</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms & Conditions</a></li>
            </ul>
          </nav>
          <div className="newsletter">
            <h5>Sign up for our newsletter</h5>
            <form onSubmit={handleSubmit} >
              <input type="email"
              name="email"
              placeholder="Enter your email here" 
              value={email}
              onChange={handleChange}
              required
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="copyright">
        <p>© 2024 TaskBetter | All Rights Reserved</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
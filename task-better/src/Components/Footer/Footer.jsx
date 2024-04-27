import React, { useState } from "react";
import "./Footer.css";
import TaskBetter_Image from "../TBNav/TaskBetterLogo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail("");
    toast("You have successfully signed up!");
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <footer className="footer container-fluid ">
      <div className="content row">
        <div className="logo col-md-3">
          <img src={TaskBetter_Image} alt="TaskBetter Logo" />
        </div>

        <nav className="footer-nav col-md-2">
          <div className="link-title">
            <h2>Links</h2>
          </div>
          <div className="footer-lists">
          <ul>
            <li className="footer-li">
              <a href="/">Welcome Page</a>
            </li>
            <li className="footer-li">
              <a href="/home">Home</a>
            </li>
            <li className="footer-li">
              <a href="/contact-us">Contact Us</a>
            </li>
          </ul>

          <ul>
            <li className="footer-li">
              <a href="/privacy">Privacy Policy</a>
            </li>
            <li className="footer-li">
              <a href="/terms">Terms & Conditions</a>
            </li>
          </ul>
          </div>
        </nav>
        <div className="logoTwo col-md-2">
          <FaInstagram />

          <FaFacebook />

          <FaTwitterSquare />
        </div>
        <div className="newsletter col-md-2">
          <h5>Sign up for our newsletter</h5>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
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
      <div className="copyright row">
        <p>© 2024 TaskBetter | All Rights Reserved</p>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </footer>
  );
};

export default Footer;

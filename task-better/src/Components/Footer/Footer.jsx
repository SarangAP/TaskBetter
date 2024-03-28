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
          <p>TaskBetter will include links to pages</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
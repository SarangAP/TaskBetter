import React from "react";
import { Link } from 'react-router-dom';
import "./404.css";

const ErrorPage = () => {
  return (
    <div className="error-page">
      <h1>Error 404 - Page Not Found</h1>
      <p>We're sorry, this page doesn't seem to exist.</p>
      <div className="home-link">
        <Link to="/home">Go back Home</Link>
      </div>
    </div>
  );
};

export default ErrorPage;
import React, { useState, useEffect } from "react";
import { useNavigate, Link} from "react-router-dom";
import "./Login.css";
import TaskBetter_Image from "../TBNav/TaskBetterLogo.svg"

const Login = ({ }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const sessionToken = sessionStorage.getItem("token");
    if (sessionToken) {
      // Session token exists, navigate to the home page
      window.location.href = "/home";
    }
    // Add other logic or cleanup if needed
  }, []);

  const handleLogin = async () => {
    try {
      console.log("Before fetch:", username, password);
      const response = await fetch("http://127.0.0.1:8000/login/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      console.log("After fetch:", username, password);
      if (response.ok) {
        console.log("Login successful", response);
        response.json().then((data) => {
          sessionStorage.setItem("token", data.token);
          sessionStorage.setItem("user", JSON.stringify(data));
          navigate("/home", { state: { currentUser: data } });
        });
      } else {
        const data = await response.json();
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    
    <div className="wrapper">
    <div className="login-logo">
      <img src={TaskBetter_Image} alt="TaskBetter Logo" /> </div>
      <form>
        <h1 className="loginHeader">Login Here</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="submit-button">
          <button type="button" onClick={handleLogin}>
            Log in
          </button>
        </div>
        <div className="submit-button">
        <Link to="/register">
          <button type="button"  to="/register">
              Register for an account
          </button>
        </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;

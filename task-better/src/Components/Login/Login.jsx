import React, { useState, useEffect } from "react";
import { useNavigate, Link} from "react-router-dom";
import "./Login.css";
import TaskBetter_Image from "../TBNav/TaskBetterLogo.svg"
import { CgProfile } from "react-icons/cg";
import { FaLock } from "react-icons/fa";

const Login = ({ }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  //Scrolling to top of screen after page redirect
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    const sessionToken = sessionStorage.getItem("token");
    if (sessionToken) {
      // Session token exists, navigate to the tasks page
      window.location.href = "/tasks";
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
          navigate("/tasks", { state: { currentUser: data } });
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
  <div className="login-container">
    <div className="logo-img"> 
          <label className="fs-1">Task</label><label className="fs-1" style={{'color':'#008be6'}}>Better</label>
    </div>
    <div className="loginHeader">
      <div className="login-title">Login</div>
      <div className="login-underline"></div>
    </div>
  <div className="login-fields">
  <div className="login-field">
    <CgProfile />
    <input
    type="text"
    placeholder="Username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    onClick={handleLogin}
    required
    />
  </div>
  <div className="login-field">
  <div className="input">
    <FaLock />
    <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
    />
  </div>
  </div>
</div>
<div className="submit-container-login">
  <Link to="/register" className="login-submit">Register</Link>
  <div className="login-submit" onClick={handleLogin}>Login</div>
</div>
  </div>
)
}

export default Login;

import React, { useState, useEffect } from "react";
import { useNavigate, Link} from "react-router-dom";
import "./Register.css";
import TaskBetter_Image from "../TBNav/TaskBetterLogo.svg"
import { MdPersonOutline } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleRegistration = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/register/', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Registration was successful');
        navigate('/login');
      } else { 
        console.error('Registration failed somewhere');
        setErrorMessage('Something went wrong registering try again');
        //clearing form fields if issue registering
        setFormData({
          username: '',
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        });
      }
    } catch (error) {
      console.error('Error during registration process:', error);
      setErrorMessage('Something went wrong registering try again');
             //clearing form fields if issue registering
             setFormData({
              username: '',
              firstName: '',
              lastName: '',
              email: '',
              password: '',
            });
    }
  };

  return (
    <div className="register-container">
      <div className="logo-img-register">
      <img src={TaskBetter_Image} alt="TaskBetter Logo" />
      </div>
      <div className="registerHeader">
        <div className="register-title">Register</div>
        <div className="register-underline"></div>
      </div>
      <div className="register-fields">
        <div className="register-field">
        <MdPersonOutline />
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />
        </div>
        <div className="register-field">
        <MdPersonOutline />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />
        </div>
        <div className="register-field">
        <CgProfile />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        </div>
        <div className="register-field">
        <MdEmail />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        </div>
        <div className="register-field">
        <FaLock />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        </div>
      </div>
      <div className="submit-container-register">
      <Link to="/login" className="register-submit">Have an account?</Link>
      <div className="register-submit" onClick={handleRegistration}>Register</div>
      </div>
    </div>
  )
}

export default Register;

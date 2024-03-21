import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
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
        navigate('/');
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
    <form className = "centered-items" onSubmit={handleRegistration}>
    <div>
    <h1 className="register-header">Register Here</h1>
    </div>
    <br />
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          style={{ marginLeft: '12px' }}
        />
      </label>
      <br />

      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          style={{ marginLeft: '8px' }}
        />
      </label>
      <br />

      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          style={{ marginLeft: '8px' }}
        />
      </label>
      <br />

      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={{ marginLeft: '41px' }}
        />
      </label>
      <br />

      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          style={{ marginLeft: '10px' }}
        />
      </label>
      <br />

      <button type="submit">Register</button>

      <br />
      <br />
      <div classname="errorMessage">
      {errorMessage}
      </div>
    </form>
  );
};

export default Register;

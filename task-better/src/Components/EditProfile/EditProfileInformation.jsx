import React, { useState, useEffect } from 'react';
import "./EditProfileInformation.css"
import { Link } from "react-router-dom";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    setUser("");
    toast("You have successfully changed your user info!")
  }
  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/profile/', {
          method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+sessionStorage.getItem('token')
            },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } 
        else {
          console.error('Error getting profile', response.status);
        }
      }
      catch (errorMessage) {
        console.error('Error mid fetch', errorMessage);
      }
      finally {
        setLoading(false);
      }
    };

    getProfile();
  }, []); 

  return (
    <div>
      <div className="profile-container">
      <div className="welcome-profile"><h2>You may edit your information here</h2></div>
      {loading ? (
        <p>Loading profile info now</p> //sometimes doesn't load immediately
      ) : user ? (
        <div className="user-information">
                      <Link to="/profile" className="btn btn-secondary">Back to Profile Page</Link>

          
          <div className="user-info">
            <p><b>User ID: </b> {user.id}</p>
          </div>
          <div className="user-info">
            <p><b>Username:</b> <input type="text" name="username"/></p>
            
          </div>
          <div className="user-info">
            <p><b>First Name: </b> <input type="text" name="firstname"/></p>
           </div>
          <div className="user-info">
            <p><b>Last Name: </b><input type="text" name="lastname"/></p>
          </div>
          <div className="user-info">
            <p><b>Email: </b><input type="text" name="email"/></p>
          </div>
          <div className="user-info">
            <p><b>Password: </b><input type="text" name="password"/></p>
          </div>
          <div className="user-info">
            <p><b>Date joined:</b> {user.date_joined}</p>
          </div>
          <button type="submit" className="btn btn-primary mx-auto" onSubmit={handleSubmit}>
          Submit
        </button>
        </div>
      ) : (
        <p>Error loading profile</p>
      )}
      </div>
    </div>
  );
};

export default Profile;

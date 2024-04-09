import React, { useState, useEffect } from 'react';
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await fetch('http://localhost:8000/profile/', {
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
      <div className="welcome-profile"><h2>Welcome to your Profile Page</h2></div>
      {loading ? (
        <p>Loading profile info now</p> //sometimes doesn't load immediately
      ) : user ? (
        <div className="user-information">
          <div className="user-info">
            <p><b>User ID: </b> {user.id}</p>
          </div>
          <div className="user-info">
            <p><b>Username: </b>{user.username}</p>
          </div>
          <div className="user-info">
            <p><b>First Name: </b>{user.first_name}</p>
           </div>
          <div className="user-info">
            <p><b>Last Name: </b>{user.last_name}</p>
          </div>
          <div className="user-info">
            <p><b>Email: </b>{user.email}</p>
          </div>
          <div className="user-info">
            <p><b>Date joined:</b> {user.date_joined}</p>
          </div>
        </div>
      ) : (
        <p>Error loading profile</p>
      )}
      </div>
    </div>
  );
};

export default Profile;

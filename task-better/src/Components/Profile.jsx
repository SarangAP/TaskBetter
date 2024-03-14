import React, { useState, useEffect } from 'react';

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
      <h2>Welcome to your Profile Page</h2>
      {loading ? (
        <p>Loading profile info now</p> //sometimes doesn't load immediately
      ) : user ? (
        <div>
          <p>User ID: {user.id}</p>
          <p>Username: {user.username}</p>
          <p>First Name: {user.first_name}</p>
          <p>Last Name: {user.last_name}</p>
          <p>Email: {user.email}</p>
          <p>Date joined: {user.date_joined}</p>
        </div>
      ) : (
        <p>Error loading profile</p>
      )}
    </div>
  );
};

export default Profile;

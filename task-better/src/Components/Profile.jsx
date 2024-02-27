import React from 'react';
import { useLocation } from 'react-router-dom';
const Profile = () => {
  const location = useLocation();
  return (
    <div>
      <h1>Welcome to your profile page</h1>
      <p>Below is your information</p>
    </div>
  );
};

export default Profile;
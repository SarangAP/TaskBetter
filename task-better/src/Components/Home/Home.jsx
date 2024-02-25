import React from 'react';
import { useLocation } from 'react-router-dom';
const Home = () => {
  const location = useLocation();
  const { currentUser } = location.state;
  return (
    <div>
      <h1>Welcome { currentUser } to Task Better</h1>
      <p>This will serve as our homepage/dashboard</p>
    </div>
  );
};

export default Home;
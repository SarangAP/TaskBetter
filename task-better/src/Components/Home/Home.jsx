import React, { useEffect, useState } from "react";
import "./Home.css";

const Home = ({ currentUser }) => {
  const [user, setUser] = useState(null)
  useEffect(() => {
    if (!user) {
      console.log("NO USER");
      setUser(JSON.parse(sessionStorage.getItem("user")));
      console.log("USER FOUND", user);
    }
  });
  return (
    <div>
      {user ? (
        <>
        <div className="home-container">
          <div className="welcome-title">
            <h1>Welcome {user.username} to TaskBetter</h1>
          </div>
            <div className="text-descriptions">

          </div>  
        </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Home;

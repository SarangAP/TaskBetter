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
          <div className="welcome">
            <h1>Welcome {user.username} to Task Better</h1>
            </div>
            <div className="text-content">
          <p>This will serve as our homepage/dashboard, this is where we will have info talking about our product, modify this text here</p>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Home;

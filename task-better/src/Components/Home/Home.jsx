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
          <h1>Welcome {user.username} to Task Better</h1>
          <p>This will serve as our homepage/dashboard</p>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Home;

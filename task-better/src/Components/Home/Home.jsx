import React, { useEffect, useState } from "react";

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
          <p>TaskBetter is a platform where people are able to manage their tasks efficiently. With everyone's lives being pretty busy, it can be easy to lose track. Everyone lifestyles vary. TaskBetter also allows people to participate in a game where they can earn points after completing a task. Having this feature will let people have a fun experience with task management. TaskBetter would like for users to compete with other users and have fun with it. </p>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Home;

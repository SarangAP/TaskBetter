import React, { useState, useEffect } from 'react';
import "./Leaderboard.css";

const Leaderboard = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:8000/leaderboard/');
        if (!response.ok) {
          throw new Error('The leaderboard fetch failed');
        }
        const userStats = await response.json();
        
        setStats(userStats);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1>Task Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Tasks Completed</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.completed_tasks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;

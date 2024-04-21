import React, { useState, useEffect } from 'react';
import "./Leaderboard.css";

const Leaderboard = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://35.221.5.174:8000/leaderboard/');
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
    <div className="leaderboard-main">
      <h1 className="leaderboard-title">Task Leaderboard</h1>
      <div className="leaderboard-table">
          <div className="leaderboard-row">
            <table className="leaderboard-table">
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
      </div>
    </div>
  );
};


export default Leaderboard;

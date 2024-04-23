import React, { useState, useEffect, useRef } from 'react';
import "./Leaderboard.css";
import Chart from 'chart.js/auto'

const Leaderboard = () => {
  const [stats, setStats] = useState([]);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/leaderboard/');
        if (!response.ok) {
          throw new Error('The leaderboard fetch failed');
        }
        const userStats = await response.json();
        console.log(userStats);
        
        setStats(userStats);
      } catch (error) {
        console.error(error)
      }
    };

    fetchStats();
  }, []);
  useEffect(() => {
    const generateChart = () => {
      const ctx = chartRef.current.getContext('2d');
      const labels = stats.map(user => user.username);
      const scoreData = stats.map(user => user.total_score);
    
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Total Score',
            data: scoreData,
            backgroundColor: 'rgba(88,88,215,1)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(255, 255, 255, 0.9)'
              },
              ticks: {
                font: {
                  size: 15,
                  color: 'black'
                }
              }
            },
            x: {
              grid: {
                color: 'rgba(255, 255, 255, 0.9)'
              },
              ticks: {
                font: {
                  size: 20,
                  color: 'black'
                }
              }
            }
          },
          plugins: {
            legend: {
              display: false
            },
            title: {
              display: true,
              text: 'User Scores',
              padding: {
                top: 10,
                bottom: 10
              },
              font: {
                size: 25
              }
            }
          },
          layout: {
            padding: 20
          },
          maintainAspectRatio: true,
          responsive: true,
          backgroundColor: 'rgba(255, 255, 255, 0.9)'
        }
      });
    };
    
    if (stats.length > 0) {
      generateChart();
    }
  }, [stats]);
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
                  <th>Total Score</th>
                </tr>
              </thead>
              <tbody>
                {stats.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.completed_tasks}</td>
                    <td>{user.total_score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </div>
      {stats.length > 0 && <canvas ref={chartRef}></canvas>}
    </div>
  );
};


export default Leaderboard;

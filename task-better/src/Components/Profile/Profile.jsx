import React, { useState, useEffect } from 'react';
import "./Profile.css";
import { Link } from "react-router-dom";
import Chart from "chart.js/auto";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/profile/', {
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
  useEffect(() => {
    const fetchTasksOnLoad = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/tasks/", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Token " + sessionStorage.getItem("token"),
          },
        });

        if (response.ok) {
          const tasksData = await response.json();
          console.log(tasksData);
          setTasks(tasksData);
          renderChart(tasksData);
          renderPieChart(tasksData);
          renderDueDatePieChart(tasksData);
          rendertasksCreatedTimeGraph(tasksData);

        } else {
          console.log("Error getting tasks", response.status);
        }
      } catch (error) {
        console.log("Error getting tasks", error);
      }
    };

    fetchTasksOnLoad();
  }, []);

  //Task Priority Breakdown bar chart
  const renderChart = (tasksData) => {
    const priorities = [0, 0, 0, 0];
    let totalTasks = 0;

    tasksData.forEach(task => {
      priorities[task.priority - 1]++;
      totalTasks++;
    });

    const ctx = document.getElementById('priorityChart');

    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Priority 1', 'Priority 2', 'Priority 3', 'Priority 4'],
        datasets: [{
          label: 'Tasks',
          data: priorities,
          backgroundColor: [
            'rgba(255, 255, 0, 1)',
            'rgba(34, 0, 255, 1)',
            'rgba(255, 105, 180, 1)',
            'rgba(255, 135, 10, 1)'
          ],
          borderColor: [
            'rgba(255, 255, 0, 1)',
            'rgba(34, 0, 255, 1)',
            'rgba(255, 105, 180, 1)',
            'rgba(255, 135, 10, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(255,255,255,1)'
            },
            ticks: {
              color: 'white',
              font: {
                size: 15,
              }
            }
          },
          x: {
            grid: {
              color: 'rgba(255,255,255,1)'
            },
            ticks: {
              color: 'white',
              font: {
                size: 15,
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
            text: 'Priority Breakdown',
            color: 'white',
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
        backgroundColor: 'rgba(255, 255, 255, 1)'
      }
    });
  };

  //Task Completion Rate Pie Chart
  const renderPieChart = (tasksData) => {
    let completedTasks = 0;
    let incompleteTasks = 0;
  
    tasksData.forEach(task => {
      if (task.completed === 2) {
        completedTasks++;
      } else {
        incompleteTasks++;
      }
    });
    
    const totalTasks = completedTasks + incompleteTasks;
    const completedPercentage = ((completedTasks / totalTasks) * 100).toFixed(2);
    const incompletePercentage = ((incompleteTasks / totalTasks) * 100).toFixed(2);

    console.log("Completed percentage:", completedPercentage);
    console.log("Incomplete percentage:",incompletePercentage);

    const ctx = document.getElementById('taskPieChart');
    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: [`Completed Tasks (${completedPercentage}%)`, `Incomplete Tasks (${incompletePercentage}%)`],
        datasets: [{
          label: 'Amount',
          data: [completedTasks, incompleteTasks],
          backgroundColor: [
            'rgba(0, 210, 0, 1)',
            'rgba(224, 36, 36, 1)'
          ],
          borderColor: [
            'rgba(0, 210, 0, 1)',
            'rgba(224, 36, 36, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Completion Status',
            color: 'white',
            padding: {
              top: 10,
              bottom: 10
            },
            font: {
              size: 25
            }
          },
          legend: {
            display: true,
            labels: {
              color: 'white'
            }
          }
        }
      }
    });
  };

  //Due Date Completion Pie Chart
  const renderDueDatePieChart = (tasksData) => {
    let tasksCompletedBeforeDueDate = 0;
    let tasksCompletedAfterDueDate = 0;
  
    tasksData.forEach(task => {
      if (task.completed === 2 && new Date(task.completed_date) <= new Date(task.due_date)) {
        tasksCompletedBeforeDueDate++;
      } else if (task.completed === 2 && new Date(task.completed_date) > new Date(task.due_date)) {
        tasksCompletedAfterDueDate++;
      }
    });
  
    const totalTasks = tasksCompletedBeforeDueDate + tasksCompletedAfterDueDate;
    const beforeDueDatePercentage = ((tasksCompletedBeforeDueDate / totalTasks) * 100).toFixed(2);
    const afterDueDatePercentage = ((tasksCompletedAfterDueDate / totalTasks) * 100).toFixed(2);

    const ctx = document.getElementById('dueDatePieChart');
    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }
  
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: [`Completed Before Due Date (${beforeDueDatePercentage}%)`, `Completed After Due Date (${afterDueDatePercentage}%)`],
        datasets: [{
          label: 'Amount',
          data: [tasksCompletedBeforeDueDate, tasksCompletedAfterDueDate],
          backgroundColor: [
            'rgba(0, 210, 0, 1)',
            'rgba(224, 36, 36, 1)'
          ],
          borderColor: [
            'rgba(0, 210, 0, 1)',
            'rgba(224, 36, 36, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Due Date Achievement',
            color: 'white',
            padding: {
              top: 10,
              bottom: 10
            },
            font: {
              size: 25
            }
          },
          legend: {
            display: true,
            labels: {
              color: 'white'
            }
          }
        }
      }
    });
  };

  //Tasks Created over time line graph
  const rendertasksCreatedTimeGraph = (tasksData) => {
    const createdDates = {};
    const currentDate = new Date();
    const lastMonthDate = new Date();
    lastMonthDate.setMonth(currentDate.getMonth() - 1);

    tasksData.forEach(task => {
      const createdDate = new Date(task.created);
      if (createdDate >= lastMonthDate) {
        const dateString = createdDate.toDateString();
        if (createdDates[dateString]) {
          createdDates[dateString]++;
        } else {
          createdDates[dateString] = 1;
        }
      }
    });

    const labels = Object.keys(createdDates);
    const data = labels.map(label => createdDates[label]);

    const ctx = document.getElementById('tasksCreatedTimeGraph');
    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Tasks Created',
          data: data,
          borderColor: 'rgba(255, 0, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(255,255,255,1)'
            },
            ticks: {
              color: 'white',
              font: {
                size: 15,
              }
            }
          },
          x: {
            grid: {
              color: 'rgba(255,255,255,1)'
            },
            ticks: {
              color: 'white',
              font: {
                size: 15,
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
            text: 'Tasks Created Over Time',
            color: 'white',
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
        backgroundColor: 'rgba(255, 255, 255, 1)'
      }
    });
  };
  return (
    <div>
      <div className="profile-container">
      <div className="welcome-profile"><h2>Welcome to your Profile Page</h2></div>
      {loading ? (
        <p>Loading profile info now</p> //sometimes doesn't load immediately
      ) : user ? (
        <div className="user-information">
          
          
          <div className="user-info">
            <p><b>User ID: </b> {user.id}</p>
          </div>
          <div className="user-info">
            <p><b>Username: </b>{user.username}</p>
          </div>
          <div className="user-info">
            <p><b>First Name: </b>{user.first_name}</p>
           </div>
          <div className="user-info">
            <p><b>Last Name: </b>{user.last_name}</p>
          </div>
          <div className="user-info">
            <p><b>Email: </b>{user.email}</p>
          </div>
          
          <div className="user-info">
            <p><b>Date joined:</b> {user.date_joined}</p>
          </div>
         <center><Link to="/editprofile" className="btn btn-secondary">Edit Profile Information</Link></center>

        </div>
      ) : (
        <p>Error loading profile</p>
      )}
      </div>
      <div className="tasks-insights">
        <div className="priority-chart">
          <canvas id="priorityChart"></canvas>
        </div>
        <div className="pie-chart">
          <canvas id="taskPieChart"></canvas>
        </div>
        <div className="pie-chart">
          <canvas id="dueDatePieChart"></canvas>
        </div>
        <div className="created-chart">
          <canvas id="tasksCreatedTimeGraph"></canvas>
        </div>
      </div>
    </div>
  );
};

export default Profile;

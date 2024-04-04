import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TasksView from "./TasksView";
import Calendar from 'react-calendar';
import moment from "moment"
import { Modal, Button } from 'react-bootstrap';
import 'react-calendar/dist/Calendar.css';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchTasksOnLoad = async () => {
    fetch("http://127.0.0.1:8000/tasks/", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + sessionStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Getting data", data);
        setTasks([...data])
      })
      .catch((error) => {
        console.log("Error getting data", error);
      });
  };
  useEffect(() => {
    fetchTasksOnLoad()
  }, []);

  useEffect(() => {
    if (!user) {
      console.log("NO USER");
      setUser(JSON.parse(sessionStorage.getItem("user")));
      console.log("USER FOUND", user);
    }
  });

  useEffect(() => { console.log(tasks) }, [tasks])

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };
  const deleteTask = (taskD) => {
    // Sending backend DELETE req to delete task
    taskD.delete = true
    fetch("http://127.0.0.1:8000/tasks/", {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify(taskD)
    }).then(response => response.json())
      .then(data => {
        console.log("Task Deleted", data)
      })
      .catch(error => {
        console.log("Error deleting task", error)
      })
    const updatedTasks = tasks.filter(task => task.task_id != taskD.task_id)
    setTasks(updatedTasks)
  };

  // implment task update/tasks
  // such that when completed updates backend
  const updateTask = (taskU) => {
    console.log(taskU)
    fetch("http://127.0.0.1:8000/tasks/", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify(taskU)
    }).then(response => response.json())
      .then(data => {
        console.log("Task Updated", data)
      })
      .catch(error => {
        console.log("Error updating task", error)
      })
  };

  const handleDateClick = (date) => {
    const dueTasks = tasks.filter(task => moment(task.due_date).isSame(date, 'day'));
    console.log("Due Tasks: ", dueTasks);
    setSelectedTasks(dueTasks);
    setSelectedDate(date);
    setShowModal(true);
  };

  const calDates = ({ date, view }) => {
    if (view === 'month') {
      const dueTasks = tasks.filter(task => moment(task.due_date).isSame(date, 'day'));
      if (dueTasks.length > 0) {
        return (
          <p style={{ fontSize: '9px', margin: 0, padding: 0 }}>{dueTasks.length} task(s)</p>
        );
      }
    }
    return null;
  };

  return (
    <div
      className="container-fluid vh-100"
      style={{
        // backgroundColor: "#A1D0D0",
        fontFamily: "Lexend Exa, sans-serif",
      }}
    >
      <div className="row m-4 mt-3 h-75">
        <div className="col-md-3">
          <h4 className="m-2">Create a Task</h4>
          <TaskForm addTask={addTask} />
        </div>
          <div className="col-md-4 mt-3">
          <Calendar
            onChange={calDates}
            value={selectedDate}
            className="react-calendar"
            tileContent={calDates}
            onClickDay={handleDateClick}
          />
        </div>
        <div className="col-md-5 mt-3">
          <TasksView tasks={tasks} handleDelete={deleteTask} handleUpdate={updateTask} />  
        </div>
        <div className="col-md-1"></div>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Tasks for {moment(selectedDate).format('MMMM DD, YYYY')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTasks.length > 0 ? (
          <ul>
            {selectedTasks.map(task => (
              <li key={task.task_id}>
                <h3>{task.title}</h3>
                <p>Description: {task.description}</p>
                <p>Due date: {moment(task.due_date).format("MM/DD/YYYY")}</p>
                <p>Priority: {task.priority}</p>
                <p>Completed: {task.completed.toString()}</p>
                <p>Task created: {moment(task.created).format("MMMM DD, YYYY h:mm:ss A")}</p>
              </li>
            ))}
          </ul>
          ) : (
            <p>No tasks due this day</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TaskPage;

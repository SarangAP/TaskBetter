import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login'
import Home from './Components/Home/Home';
import TaskPage from './Components/Tasks/TaskPage';
import Profile from './Components/Profile';
import TBNav from './Components/TBNav/TBNav';

function App() {

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      console.log("Session Token", sessionStorage.getItem("token"));
    }
    // const json = await user.json();
    // await
    // console.log('User:', user.json());
  }, []);



  return (
    <Router>
      <Routes>
       {/* <Route path="/" element={<LoginContainer />} /> */ }
        <Route path="/home" element={<DefaultContainer ><Home/></DefaultContainer>} />
        <Route path="/" element={<Login/>} />
        {/*<Route path="/home" element={<Home />} />*/}
        <Route path="/tasks" element={<DefaultContainer><TaskPage /></DefaultContainer>} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>

  );
}

// Default Container (Includes navigation bar)
const DefaultContainer = ({ currentUser, children }) => (
  <div>
    <TBNav currentUser={currentUser}/>
    {children}
  </div>
);


export default App;

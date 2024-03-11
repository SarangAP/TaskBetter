import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login'
import Home from './Components/Home/Home';
import TaskPage from './Components/Tasks/TaskPage';
import Profile from './Components/Profile';
import TBNav from './Components/TBNav/TBNav';

function App() {
  const [user, setUser] = useState(null);

  useEffect( () => {
    // const json = await user.json();
    // await 
    if(user)
      user.json().then(data => console.log(data));
      // console.log('User:', user.json());
  }, [user])

  return (
    <Router>
      <Routes>
       {/* <Route path="/" element={<LoginContainer />} /> */ }
        <Route path="/home" element={<DefaultContainer><Home/></DefaultContainer>} />
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tasks" element={<DefaultContainer><TaskPage /></DefaultContainer>} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>

  );
}

// Default Container (Includes navigation bar)
const DefaultContainer = ({ children }) => (
  <div>
    <TBNav/>
    {children}
  </div>
);


export default App;

import React, {useState } from 'react';

const LogoutButton = ({onLogout}) => {
    return <button onClick={onLogout}></button>;
};

const Logout = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const handleLogout = () => {
        setIsLoggedIn(false);
    }
    return (
        <div>
          {isLoggedIn ? (
            <div>
              <h1>Welcome User!</h1>
              <LogoutButton onLogout={handleLogout} />
            </div>
          ) : (
            <h1>You are logged out.</h1>
          )}
        </div>
      );
}



export default Logout;
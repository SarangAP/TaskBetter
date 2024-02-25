import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Home from '../Home/Home';

import './Login.css';

//const navigate = useNavigate();

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginCheck, setLoginCheck] = useState(false);

    const handleLogin = async () => {
        try {
            console.log('Before fetch:', username, password);
            const response = await fetch('http://127.0.0.1:8000/login/', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });
            console.log('After fetch:', username, password);
            if (response.ok) {
                console.log('Login successful');
                setLoginCheck(true);
            } else {
                const data = await response.json();
                console.error(data.message);
                setLoginCheck(false);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setLoginCheck(false);
        }
    };

    return (
        <div className="wrapper">
            <form>
                <h1>Login Here</h1>
                <div className='input-box'>
                    <input
                        type="text"
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className='input-box'>
                    <input
                        type="password"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => 
                            setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className='submit-button'>
                    <button type="button" onClick={handleLogin}>
                        Log in
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;

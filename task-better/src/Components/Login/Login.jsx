import React from 'react'
import './Login.css';
const Login = () => {
    return (
        <div className="wrapper">
            <form action ="">
                <h1>Login Here</h1>
                <div className='input-box'>
                    <input type="text" placeholder = 'Username' required />
                </div>

                <div className='input-box'>
                    <input type="password" placeholder = 'Password' required />
                </div>
            </form>
        </div>
    )
}

export default Login
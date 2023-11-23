// src/Login.js
import './styles.css';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleLogin = () => {
        // TODO: Add your login logic here
        // For demonstration purposes, let's consider any email/password as a successful login
        const isLoginSuccessful = email && password;

        if (isLoginSuccessful) {
            // Redirect to the SellNow page after successful login
            history.push('/sell-now');
        } else {
            // Handle login failure (display an error message, etc.)
            console.error('Login failed');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form>
                <label>Email:</label>
                <input type="email" value={email} onChange={handleEmailChange} />

                <label>Password:</label>
                <input type="password" value={password} onChange={handlePasswordChange} />

                <br />
                <button type="button" onClick={handleLogin}>
                    Log In
                </button>

                <br />

                <Link to="/forget-password">Forget Password</Link>
                <br />
                <Link to="/signup">Sign Up</Link>
            </form>
        </div>
    );
};

export default Login;

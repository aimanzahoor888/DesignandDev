// src/Registration.js
import './styles.css';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signedUp, setSignedUp] = useState(false);
    const history = useHistory();

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSignUp = () => {
        // Add logic to send data to the server (Node.js backend)
        console.log('Email:', email);
        console.log('Password:', password);
        // For simplicity, consider signup successful after a delay
        setTimeout(() => {
            setSignedUp(true);
        }, 1000);
    };

    useEffect(() => {
        if (signedUp) {
            history.push('/sell-now');
        }
    }, [signedUp, history]);

    return (
        <div>
            <h2>Thrifn Registration</h2>
            <form>
                <label>Email:</label>
                <input type="email" value={email} onChange={handleEmailChange} />

                <label>Password:</label>
                <input type="password" value={password} onChange={handlePasswordChange} />
                <br />
                <button type="button" onClick={handleSignUp}>
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Registration;

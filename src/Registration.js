// src/Registration.js
import './styles.css';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registrationError, setRegistrationError] = useState('');
    const history = useHistory();

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSignUp = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
});


            if (response.ok) {
                // Registration successful, redirect to ThankYou page
                history.push('/thank-you');
            } else {
                // Handle registration error
                const data = await response.json();
                setRegistrationError(data.message);
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

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

                {registrationError && (
                    <div style={{ color: 'red', marginTop: '10px' }}>{registrationError}</div>
                )}
            </form>
        </div>
    );
};

export default Registration;
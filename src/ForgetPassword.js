// src/ForgetPassword.js
import 'whatwg-fetch';

import './styles.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');

    const handleEmailChange = (e) => setEmail(e.target.value);

    const handleForgetPassword = async () => {
        console.log('Submit button clicked'); // Add this line
        try {
            // TODO: Send forget password request to the backend
            const response = await fetch('/api/forget-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                // Display a message that an email has been sent for password reset
                console.log('Password reset email sent');
            } else {
                // Handle forget password error
                console.error('Forget password failed');
            }
        } catch (error) {
            console.error('Error during forget password:', error);
        }
    };

    return (
        <div>
            <h2>Forget Password</h2>
            <label>Email:</label>
            <input type="email" value={email} onChange={handleEmailChange} />
        
            <button type="button" onClick={handleForgetPassword}>
                Submit
            </button>
            <br></br>
            <Link to="/login">Back to Login</Link>
        </div>
    );
};

export default ForgetPassword;

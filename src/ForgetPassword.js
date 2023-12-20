// ForgetPassword.js
import 'whatwg-fetch';

import './styles.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');

    const handleEmailChange = (e) => setEmail(e.target.value);

    const handleForgetPassword = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/forget-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
    
            if (response.ok) {
                console.log('Password reset email sent');
                // Display a success message to the user
                alert('Password reset email sent successfully');
            } else {
                const data = await response.json();
                if (response.status === 404) {
                    // User not found (account does not exist)
                    alert('Account does not exist on this email.');
                } else {
                    // Handle other errors
                    console.error('Forget password failed:', data.message);
                    alert('Forget password failed. Please try again.');
                }
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
            <br />
            <Link to="/login">Back to Login</Link>
        </div>
    );
};

export default ForgetPassword;
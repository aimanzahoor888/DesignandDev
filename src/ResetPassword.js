//ResetPassword.js
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const ResetPassword = () => {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [email, setEmail] = useState('');
    const [resetSuccess, setResetSuccess] = useState(false); // New state for reset success

    useEffect(() => {
        // Fetch the email associated with the reset token
        const fetchEmail = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/fetch-email/${token}`);
                const data = await response.json();

                if (response.ok) {
                    setEmail(data.email);
                } else {
                    console.error('Error fetching email:', data.message);
                }
            } catch (error) {
                console.error('Error fetching email:', error);
            }
        };

        fetchEmail();
    }, [token]);

    const handlePasswordChange = (e) => setNewPassword(e.target.value);

    const handleResetPassword = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, token, newPassword }),
            });

            if (response.ok) {
                // Display a message that the password has been reset successfully
                setResetSuccess(true);
            } else {
                // Handle reset password error
                console.error('Password reset failed');
            }
        } catch (error) {
            console.error('Error during password reset:', error);
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            {resetSuccess ? (
                <p>Password reset successfully! You can now login with your new password.</p>
            ) : (
                <>
                    <p>Resetting password for {email}</p>
                    <label>New Password:</label>
                    <input type="password" value={newPassword} onChange={handlePasswordChange} />

                    <button type="button" onClick={handleResetPassword}>
                        Reset Password
                    </button>
                </>
            )}
            <br />
            <Link to="/login">Back to Login</Link>
        </div>
    );
};

export default ResetPassword;
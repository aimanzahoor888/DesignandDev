// src/ForgetPassword.js
import './styles.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [forgetPasswordError, setForgetPasswordError] = useState('');

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
          setForgetPasswordError('Account does not exist with this email.');
        } else {
          // Handle other errors
          console.error('Forget password failed:', data.message);
          setForgetPasswordError('Forget password failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error during forget password:', error);
    }
  };

  return (
    <div style={{ display: 'flex', height: '97vh', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      {/* Background image container with blur effect */}
      <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: -1, filter: 'blur(10px)' }}>
        <img src="/Image1.jpg" alt="Background" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
      </div>

      {/* Content container */}
      <div style={{ width: '400px', padding: '20px', background: '#a7bed3', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ color: '#000000', fontSize: '2em', marginBottom: '20px', fontFamily: 'Argent CF', fontWeight: 'bold', letterSpacing: '4px', textShadow: '4px 4px 4px rgba(0, 0, 0, 0.5)' }}>No worries ! Enter your email to recover </h2>

        <form style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={{ marginBottom: '5px', color: '#000000' }}>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} style={{ padding: '8px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #A8CABA' }} />

          <button type="button" onClick={handleForgetPassword} style={{ background: '#f1ffc4', color: '#000000', padding: '10px', borderRadius: '4px', cursor: 'pointer' }}>
            Submit
          </button>

          {forgetPasswordError && <div style={{ color: '#FF4500', marginTop: '10px', textAlign: 'center' }}>{forgetPasswordError}</div>}
        </form>

        <br />
        <Link to="/login" style={{ color: '#007BFF', textDecoration: 'none' }}>Back to Login</Link>
      </div>
    </div>
  );
};

export default ForgetPassword;

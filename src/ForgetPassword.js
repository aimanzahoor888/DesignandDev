// src/ForgetPassword.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const gradientBackground = 'linear-gradient(to right, #607F8B, #D8675B)';

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
    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', background: '#FCF6F5', color: '#000000' }}>
      {/* Forget Password container */}
      <div style={{ width: '80%', maxWidth: '400px', padding: '20px', background: '#FCF6F5', borderRadius: '8px',  textAlign: 'center' }}>
        <h2 style={{ color: '#000000', fontSize: '2em', marginBottom: '20px', fontFamily: 'kalnia', fontWeight: 'bold', letterSpacing: '4px', textShadow: '4px 4px 4px rgba(0, 0, 0, 0.5)' }}>No worries! Enter your email to recover</h2>

        <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <label style={{ marginBottom: '5px', color: '#000000' }}>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} style={{ padding: '8px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #A8CABA', width: '100%' }} />

          <button type="button" onClick={handleForgetPassword} style={{ background: '#C68763', color: '#FFFFFF', padding: '10px', borderRadius: '4px', cursor: 'pointer', width: '100%',fontFamily:'kalnia' }}>
           <b>Submit</b>
          </button>

          {forgetPasswordError && <div style={{ color: '#FF4500', marginTop: '10px', textAlign: 'center' }}>{forgetPasswordError}</div>}
        </form>

        <br />
        <Link to="/login" style={{ color: '#000000', textDecoration: 'none', fontFamily:'kalnia',display: 'block', marginTop: '20px', fontFamily: 'Argent CF' }}>Back to Login</Link>
      </div>
    </div>
  );
};

export default ForgetPassword;

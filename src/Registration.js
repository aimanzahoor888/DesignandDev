// src/Registration.js
import './styles.css';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const gradientBackground = 'linear-gradient(to right, #607F8B, #D8675B)';

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
    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', background: gradientBackground }}>
      {/* Registration container */}
      <div style={{ width: '80%', maxWidth: '400px', padding: '20px', background: '#D99B82', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{
          color: '#000000',
          fontSize: '2em',
          textTransform: 'uppercase',
          marginBottom: '20px',
          fontFamily: 'Kalnia',
          fontWeight: 'bold',
          letterSpacing: '4px',
          textShadow: '4px 4px 4px rgba(0, 0, 0, 0.5)',
          textAlign: 'center',
        }}>
          THr!ftN Registration
        </h2>

        <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <label style={{ marginBottom: '5px', color: '#000000' }}>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} style={{ padding: '8px', marginBottom: '15px', borderRadius: '4px', border: '1px solid #A8CABA', width: '100%' }} />

          <label style={{ marginBottom: '5px', color: '#000000' }}>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} style={{ padding: '8px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #A8CABA', width: '100%' }} />

          <button type="button" onClick={handleSignUp} style={{ background: '#607F8B', color: '#FFFFFF', padding: '10px', borderRadius: '4px', cursor: 'pointer', fontFamily: 'Kalnia', width: '100%' }}>
            <b>Sign Up</b>
          </button>

          {registrationError && <div style={{ color: '#FF4500', marginTop: '10px', textAlign: 'center' }}>{registrationError}</div>}
        </form>
      </div>
    </div>
  );
};

export default Registration;

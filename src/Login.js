// Login.js
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const gradientBackground = 'linear-gradient(to right, #607F8B, #D8675B)';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        history.push('/sell-now');
      } else {
        setErrorMessage('Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', background: '#FCF6F5' }}>
      {/* Login container */}
      <div style={{ width: '80%', maxWidth: '400px', padding: '20px', background: '#FCF6F5', borderRadius: '8px' }}>
        <h2 style={{
          color: '#000000',
          fontSize: '3em',
          textTransform: 'uppercase',
          marginBottom: '20px',
          fontFamily: 'Kalnia',
          fontWeight: 'bold',
          letterSpacing: '4px',
          textShadow: '4px 4px 4px rgba(0, 0, 0, 0.5)',
          textAlign: 'center',
        }}>
          THr!ftN
        </h2>

        <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <label style={{ marginBottom: '5px', color: '#000000' }}>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} style={{ padding: '8px', marginBottom: '15px', borderRadius: '4px', border: '1px solid #A8CABA', width: '100%' }} />

          <label style={{ marginBottom: '5px', color: '#000000' }}>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} style={{ padding: '8px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #A8CABA', width: '100%' }} />

          <button type="button" onClick={handleLogin} style={{ background: '#C68763', color: '#FFFFFF', padding: '10px', borderRadius: '4px', cursor: 'pointer', fontFamily: 'Kalnia', width: '100%' }}>
            <b>Log In</b>
          </button>

          {errorMessage && <p style={{ color: '#FF4500', marginTop: '10px', textAlign: 'center' }}>{errorMessage}</p>}

          <div style={{ marginTop: '15px', textAlign: 'center' }}>
            <Link to="/forget-password" style={{ color: '#000000', textDecoration: 'none', fontFamily:'kalnia' }}>Forgot Password ?</Link>
          </div>

          <Link to="/signup" style={{ background:  '#C68763', color: '#FFFFFF', textDecoration: 'none', fontSize: '1.3em', padding: '10px 40px', borderRadius: '4px', marginTop: '20px', display: 'block', textAlign: 'center', fontFamily: 'kalnia' }}><b>Sign Up</b></Link>
        </form>
      </div>
    </div>
  );
};

export default Login;

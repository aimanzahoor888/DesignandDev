// Login.js
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

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
    <div style={{ display: 'flex', height: '97vh', backgroundImage: `url('/Image1.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Left side with image */}
      <div style={{ flex: 1.5, background: 'rgba(198, 226, 233, 0.8)', padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* Add your image source here */}
        <img src='/Image1.jpg' alt="Your Image" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
      </div>

      {/* Right side with login form */}
      <div style={{ flex: 0.7, padding: '20px', background: 'rgba(198, 226, 233, 0.8)', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', background: '#a7bed3', padding: '10px 20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{
            color: '#000000',
            fontSize: '2em',
            textTransform: 'uppercase',
            marginBottom: '0',
            fontFamily: 'Greycliff CF',
            fontWeight: 'bold',
            letterSpacing: '4px',
            textShadow: '4px 4px 4px rgba(0, 0, 0, 0.5)',
          }}>
            THr!ftN
          </h2>

          <Link to="/signup" style={{ fontFamily: 'Argent CF', background: '#f1ffc4', color: '#000000', textDecoration: 'none', fontSize: '1.2em', padding: '10px 15px', borderRadius: '4px' }}>Sign Up</Link>
        </header>

        <div style={{
          width: '80%',
          borderRadius: '8px',
          padding: '20px',
          marginTop: '20px',
          fontFamily: 'Argent CF',
          background: '#a7bed3',
        }}>
          <h2 style={{ color: '#000000', fontSize: '1.5em', marginBottom: '10px', fontFamily: 'Argent CF' }}>Login</h2>
          <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <label style={{ marginBottom: '5px', color: '#000000' }}>Email:</label>
            <input type="email" value={email} onChange={handleEmailChange} style={{ padding: '8px', marginBottom: '15px', borderRadius: '4px', border: '1px solid #A8CABA', width: '100%' }} />

            <label style={{ marginBottom: '5px', color: '#000000' }}>Password:</label>
            <input type="password" value={password} onChange={handlePasswordChange} style={{ padding: '8px', marginBottom: '20px', borderRadius: '4px', border: '1px solid #A8CABA', width: '100%' }} />

            <button type="button" onClick={handleLogin} style={{ background: '#f1ffc4', color: '#000000', padding: '10px', borderRadius: '4px', cursor: 'pointer', width: '100%' }}>
              Log In
            </button>

            {errorMessage && <p style={{ color: '#FF4500', marginTop: '10px', textAlign: 'center' }}>{errorMessage}</p>}

            <div style={{ marginTop: '15px' }}>
              <Link to="/forget-password" style={{ color: '#007BFF', marginRight: '10px', textDecoration: 'none' }}>Forgot Password ?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

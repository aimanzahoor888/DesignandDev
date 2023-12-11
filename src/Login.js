import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // New state for error message
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
        // Redirect to the SellNow page after successful login
        history.push('/sell-now');
      } else {
        // Handle login failure (set error message)
        setErrorMessage('Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Thriftn</h1>
      </header>
      <div>
        <h2>Login</h2>
        <form>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />

          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />

          <br />
          <button type="button" onClick={handleLogin}>
            Log In
          </button>

          {/* Display error message if there is one */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <br />

          <Link to="/forget-password">Forget Password</Link>
          <br />
          <Link to="/signup">Sign Up</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;

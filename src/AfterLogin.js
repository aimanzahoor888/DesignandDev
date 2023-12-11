// src/AfterLogin.js
import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const AfterLogin = () => {
  return (
    <div className="container">
      <div className="centered-content">
        <h2>Welcome! You are logged in.</h2>
        <Link to="/sell-now">
          <button>Sell Now</button>
        </Link>
      </div>
    </div>
  );
};

export default AfterLogin;
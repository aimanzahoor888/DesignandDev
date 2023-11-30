// src/SellNow.js
import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const SellNow = () => {
  return (
    <div className="container">
      <header>
        <h1>Thriftn</h1>
      </header>
      <div>
        <h2>Welcome!</h2>
        <Link to="/choose-category">
          <button>Sell Now</button>
        </Link>
      </div>
    </div>
  );
};

export default SellNow;

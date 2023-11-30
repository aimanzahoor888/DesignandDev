// src/ChooseCategory.js
import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const ChooseCategory = () => {
  return (
    <div>
      <header>
        <h1>Thriftn</h1>
      </header>
      <div className="container">
        <h2>Categories</h2>
        <div className="button-container">
          <Link to="/sell/clothes">
            <button>Clothes</button>
          </Link>
          <Link to="/sell/books">
            <button>Books</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChooseCategory;

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
          <Link to="/add-product"> {/* Update the link to point to /add-product */}
            <button>Clothes</button>
          </Link>
          <Link to="/add-product"> {/* Update the link to point to /add-product */}
            <button>Books</button>
          </Link>
        </div>
        <Link to="/">Go back</Link> {/* Update the link path based on your routes */}
      </div>
    </div>
  );
};

export default ChooseCategory;

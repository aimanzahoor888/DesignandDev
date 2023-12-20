// ChooseCategory.js
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import SellerInfo from './SellerInfo';
import './styles.css';

const ChooseCategory = () => {
  

  const [personalInfo, setPersonalInfo] = useState({});
  const [showSellerInfo, setShowSellerInfo] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleContinue = (info) => {
    setPersonalInfo(info);
    setShowSellerInfo(false);
  };

  console.log('Rendering ChooseCategory');

  return (
    <div>
      <header>
        <h1>Thriftn</h1>
      </header>
      <div className="container">
        {showSellerInfo ? (
          <SellerInfo onContinue={handleContinue} selectedCategory={selectedCategory} />
        ) : (
          <>
            <h2>Categories</h2>
            <div className="button-container">
              <button
                onClick={() => {
                  setSelectedCategory('Clothes');
                  setShowSellerInfo(true);
                }}
              >
                Clothes
              </button>
              <button
                onClick={() => {
                  setSelectedCategory('Product');
                  setShowSellerInfo(true);
                }}
              >
                Books
              </button>
            </div>
          </>
        )}
        <Link to="/">Go back</Link>
      </div>
    </div>
  );
};

export default ChooseCategory;
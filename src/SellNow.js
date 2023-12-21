// src/SellNow.js
import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const SellNow = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#c6e2e9',
        margin: '0',
        padding: '0',
        width: '100%',
        boxSizing: 'border-box',
      }}
      className="container"
    >
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px', // Reduced margin from 20px to 10px
          background: '#a7bed3',
          padding: '10px 20px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          boxSizing: 'border-box',
        }}
      >
        <h1
          style={{
            color: '#000000',
            fontSize: '2em',
            textTransform: 'uppercase',
            margin: '0',
            fontFamily: 'Greycliff CF',
            fontWeight: 'bold',
            letterSpacing: '4px',
            textShadow: '4px 4px 4px rgba(0, 0, 0, 0.5)',
          }}
        >
          THr!ftN
        </h1>
        <div>
          <Link
            to="/wishlist"
            style={{
              fontFamily: 'Argent CF',
              background: '#f1ffc4',
              color: '#000000',
              textDecoration: 'none',
              fontSize: '1.2em',
              padding: '10px 15px',
              borderRadius: '4px',
              marginRight: '10px',
            }}
          >
            Wish List
          </Link>
          <Link
            to="/your-products"
            style={{
              fontFamily: 'Argent CF',
              background: '#f1ffc4',
              color: '#000000',
              textDecoration: 'none',
              fontSize: '1.2em',
              padding: '10px 15px',
              borderRadius: '4px',
              marginRight: '10px',
            }}
          >
            Your Products
          </Link>
          <Link
            to="/choose-category"
            style={{
              fontFamily: 'Argent CF',
              background: '#f1ffc4',
              color: '#000000',
              textDecoration: 'none',
              fontSize: '1.2em',
              padding: '10px 15px',
              borderRadius: '4px',
            }}
          >
            Sell Now
          </Link>
        </div>
      </header>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            width: '100%',
            borderRadius: '8px',
            padding: '20px',
            marginTop: '0px', // Reduced margin from 20px to 10px
            fontFamily: 'Argent CF',
            background: '#c6e2e9',
            boxSizing: 'border-box',
          }}
        >
          {/* Content for the main section */}
        </div>
      </div>
    </div>
  );
};

export default SellNow;

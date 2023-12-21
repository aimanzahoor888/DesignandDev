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
          marginBottom: '10px',
          background: '#a7bed3',
          padding: '10px 20px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
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
              marginRight: '20px', // Added margin for separation
            }}
          >
            THr!ftN
          </h1>
          {/* Make the search bar longer */}
          <input
            type="text"
            placeholder="Search...."
            style={{
              padding: '4px',
              borderRadius: '5px',
              marginTop:'3.5%',
              width: '400px', // Adjust the width as needed
              border: '1px solid #000000',
            }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Wishlist button in heart shape */}
          <Link
            to="/wishlist"
            style={{
              fontFamily: 'Argent CF',
              background: '#f1ffc4',
              color: '#000000',
              textDecoration: 'none',
              fontSize: '1.2em',
              padding: '10px 15px',
              borderRadius: '50%', // Make it a circle
              marginRight: '10px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="24"
              height="24"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </Link>
          {/* Other navigation links */}
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
            My Items
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
            marginTop: '0px',
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

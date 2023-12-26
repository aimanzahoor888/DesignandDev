// src/ThankYou.js
//import './styles.css';
import React from 'react';
import { Link } from 'react-router-dom';

const gradientBackground = 'linear-gradient(to right, #607F8B, #D8675B)';

const ThankYou = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', background: gradientBackground }}>
      {/* Thank You container */}
      <div style={{ width: '80%', maxWidth: '400px', padding: '20px', background: '#D99B82', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>

        <div className="thank-you-content" style={{ marginBottom: '20px' }}>
          <h4 style={{ color: '#000000', fontSize: '2em', marginBottom: '20px', fontFamily: 'Kalnia' }}>Thank you for creating your account!</h4>
          <Link to="/sell-now" style={{ color: '#000000', textDecoration: 'none', background: '#607F8B', padding: '10px 15px', borderRadius: '4px', display: 'inline-block', fontFamily: 'Kalnia' }}><b>Next</b></Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;

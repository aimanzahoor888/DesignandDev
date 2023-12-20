// src/ThankYou.js
import './styles.css';
import React from 'react';
import { Link } from 'react-router-dom';

const ThankYou = () => {
  return (
    <div style={{ display: 'flex', height: '97vh', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', position: 'relative' }}>
      {/* Background image container with blur effect */}
      <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: -1, filter: 'blur(10px)' }}>
        <img src="/Image1.jpg" alt="Background" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
      </div>

      {/* Content container */}
      <div style={{ width: '400px', padding: '20px', background: '#a7bed3', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>

        <div className="thank-you-content" style={{ marginBottom: '20px' }}>
          <h4 style={{ color: '#000000', fontSize: '1.5em', marginBottom: '20px', fontFamily: 'Argent CF' }}>Thank you for creating your account !</h4>
          <Link to="/sell-now" style={{ color: '#000000', textDecoration: 'none', background: '#f1ffc4', padding: '10px 15px', borderRadius: '4px', display: 'inline-block' }}><b>Next</b></Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;

// src/ThankYou.js
import './styles.css';
import React from 'react';
import { Link } from 'react-router-dom';

const ThankYou = () => {
    return (
        <div>
            <header>
                <h1>Thriftn</h1>
            </header>
            <div className="thank-you-content">
                <h4 >Thank you for creating your account</h4>
                <Link to="/sell-now">Next</Link>
            </div>
        </div>
    );
};

export default ThankYou;
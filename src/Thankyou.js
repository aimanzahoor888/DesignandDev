// src/ThankYou.js
import './styles.css';
import React from 'react';
import { Link } from 'react-router-dom';

const ThankYou = () => {
    return (
        <div>
            <h3>Thank you for creating your account</h3>
            <Link to="/login">Next</Link>
        </div>
    );
};

export default ThankYou;

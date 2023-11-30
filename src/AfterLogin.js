// src/AfterLogin.js
import React from 'react';
import { Link } from 'react-router-dom';

const AfterLogin = () => {
    return (
        <div>
            <h2>Welcome! You are logged in.</h2>
            <Link to="/sell-now">
                <button>Sell Now</button>
            </Link>

    
        </div>
    );
};

export default AfterLogin;

// src/ChooseCategory.js
import React from 'react';
import { Link } from 'react-router-dom';

const ChooseCategory = () => {
    return (
        <div>
            <h2>Categories</h2>
            <div>
                <Link to="/sell/clothes">
                    <button>Clothes</button>
                </Link>
                <Link to="/sell/books">
                    <button>Books</button>
                </Link>
            </div>
        </div>
    );
};

export default ChooseCategory;

// src/AddProduct.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const AddProduct = () => {
  const [product, setProduct] = useState('');
  const [products, setProducts] = useState([]);

  const handleInputChange = (e) => {
    setProduct(e.target.value);
  };

  const handleAddProduct = () => {
    if (product.trim() !== '') {
      setProducts([...products, product]);
      setProduct('');
    }
  };

  const handleDeleteProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  return (
    <div>
      <header>
        <h1>Thriftn</h1>
      </header>
      <div className="container">
        <h2>Add Product</h2>
        <div className="button-container">
          <input
            type="text"
            placeholder="Enter product name"
            value={product}
            onChange={handleInputChange}
          />
          <button onClick={handleAddProduct}>Add</button>
        </div>
        <h3>Product List</h3>
        <ul>
          {products.map((p, index) => (
            <li key={index}>
              {p}
              <button onClick={() => handleDeleteProduct(index)}>Delete</button>
            </li>
          ))}
        </ul>
        <Link to="/choose-category">Go Back</Link>
      </div>
    </div>
  );
};

export default AddProduct;

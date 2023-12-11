// src/AddProduct.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductDetails from './ProductDetails'; // Import ProductDetails component
import './styles.css';

const AddProduct = () => {
  const [productTitle, setProductTitle] = useState('');
  const [productPicture, setProductPicture] = useState(null);
  const [productDescription, setProductDescription] = useState('');
  const [productRating, setProductRating] = useState(1);
  const [productPrice, setProductPrice] = useState('');
  const [submittedProduct, setSubmittedProduct] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Create a new product object
    const newProduct = {
      title: productTitle,
      picture: productPicture,
      description: productDescription,
      rating: productRating,
      price: productPrice,
    };

    try {
      // Send the product data to the server
      await sendProductToServer(newProduct);
      setSubmittedProduct(newProduct); // Set the submitted product
    } catch (error) {
      console.error('Error submitting product:', error);
    }
  };

  const handlePictureChange = (e) => {
    // Get the selected file
    const file = e.target.files[0];

    // Read the file as a data URL and set it to the state
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductPicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to send the product data to the server
  // Function to send the product data to the server
const sendProductToServer = async (product) => {
  try {
    const response = await fetch('http://localhost:5000/api/add-product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error('Failed to add product');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};


  return (
    <div>
      <header>
        <h1>Thriftn</h1>
      </header>
      <h2>Add Product</h2>
      <div className="container">
        {!submittedProduct ? (
          <form onSubmit={handleFormSubmit}>
            <label>Product Title:</label>
            <input type="text" value={productTitle} onChange={(e) => setProductTitle(e.target.value)} />

            <label>Product Picture:</label>
            <input type="file" accept="image/*" onChange={handlePictureChange} />

            <label>Product Description:</label>
            <textarea value={productDescription} onChange={(e) => setProductDescription(e.target.value)}></textarea>

            <label>Product Rating:</label>
            <select value={productRating} onChange={(e) => setProductRating(e.target.value)}>
              {[1, 2, 3, 4, 5].map((rating) => (
                <option key={rating} value={rating}>
                  {rating}
                </option>
              ))}
            </select>

            <label>Product Price:</label>
            <input type="text" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />

            <button type="submit">Submit</button>
          </form>
        ) : (
          <ProductDetails product={submittedProduct} />
        )}
        <Link to="/choose-category">Go back</Link>
      </div>
    </div>
  );
};

export default AddProduct;
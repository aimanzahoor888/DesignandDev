// ProductDetails.js
import React from 'react';

const ProductDetails = ({ product }) => {
  return (
    <div>
      <h2>Product Details</h2>
      <p>
        <strong>Title:</strong> {product.title}
      </p>
      {product.picture && (
        <div><p>
          <strong>Picture:</strong>
          <img src={product.picture} alt={product.title} style={{ maxWidth: '100%', maxHeight: '200px' }} /></p>
        </div>
      )}
      <p>
        <strong>Description:</strong> {product.description}
      </p>
      <p>
        <strong>Rating:</strong> {product.rating}
      </p>
      <p>
        <strong>Price:</strong> {product.price}
      </p>
    </div>
  );
};

export default ProductDetails;

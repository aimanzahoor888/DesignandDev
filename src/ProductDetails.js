// src/ProductDetails.js
import React from 'react';

const ProductDetails = ({ product }) => {
  return (
    <div>
      <h2>Product Details</h2>
      
      {product.pictures && (
        <div>
          <p>
            <strong>Pictures:</strong>
            {product.pictures.map((picture, index) => (
              <img
                key={index}
                src={picture}
                alt={`Product ${index + 1}`}
                style={{ maxWidth: '100%', maxHeight: '200px', marginRight: '10px' }}
              />
            ))}
          </p>
        </div>
      )}
      <p>
        <strong>Title:</strong> {product.title}
      </p>
      {product.bookType && ( // Conditionally render book details
        <>
          <p>
            <strong>Book Type:</strong> {product.bookType}
          </p>
          {product.bookType === 'Other' && product.otherBookType && (
            <p>
              <strong>Other Book Type:</strong> {product.otherBookType}
            </p>
          )}
          {product.authorName && (
            <p>
              <strong>Author Name:</strong> {product.authorName}
            </p>
          )}
        </>
      )}
      {product.size && ( // Conditionally render clothes details
        <>
          {product.stitchPreference && (
            <p>
              <strong>Stitching Preference:</strong> {product.stitchPreference}
            </p>
          )}
          <p>
            <strong>Size:</strong> {product.size}
          </p>
        </>
      )}
      {product.description && ( // Conditionally render description
        <p>
          <strong>Description:</strong> {product.description}
        </p>
      )}
      <p>
        <strong>Condition:</strong> {product.condition}
      </p>
      {product.fabric && (
        <p>
          <strong>Fabric:</strong> {product.fabric}
        </p>
      )}
      {product.color && (
        <p>
          <strong>Color:</strong> {product.color}
        </p>
      )}
      <p>
        <strong>Price:</strong> {product.price}
      </p>
    </div>
  );
};

export default ProductDetails;
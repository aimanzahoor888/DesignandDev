// ProductPreview.js

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProductPreview.css'; // Import the CSS file
const ProductPreview = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch product details based on productId
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${productId}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>; // Add a loading state
  }

  return (
    <div className="product-preview-container">
      {/* Display detailed information about the product */}
      <h2>{product.title}</h2>
      {/* Display other details */}
      {Object.entries(product).map(([key, value]) => (
        // Only render fields with values
        value && key !== '_id' && key !== '__v' ? (
          key === 'pictures' ? (
            // Render images if the field is 'pictures'
            <div key={key}>
              <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
              {value.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Product ${index + 1}`}
                  style={{ maxWidth: '100%', maxHeight: '200px', marginRight: '10px' }}
                />
              ))}
            </div>
          ) : (
            // Render other fields
            <p key={key}>
              <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
            </p>
          )
        ) : null
      ))}
      {/* Link to go back to the SellNow page */}
      <Link to="/sell-now">Go Back to SellNow</Link>
    </div>
  );
};

export default ProductPreview;


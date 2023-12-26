import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(to right, #607F8B, #D8675B);
  color: #000000;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  width: 100%;
  box-sizing: border-box;
`;

const ProductDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 900px;
  box-sizing: border-box;
  background-color: #D99B82;
  padding: 70px;
  border-radius: 8px;
  max-height: 780px;
`;

const ProductDetails = ({ product }) => {
  return (
    <DetailsContainer>
      <ProductDetailsContainer>
        <h2 style={{ textAlign: 'center', fontSize: '2em', fontFamily: 'kalnia', color: '#000000' }}>Product Details</h2>

        {product.pictures && (
          <div>
            <p style={{ fontSize: '1em', fontFamily: 'kalnia', color: '#000000' }}>
              <strong>Pictures:</strong>
              {product.pictures.map((picture, index) => (
                <img
                  key={index}
                  src={picture}
                  alt={`Product ${index + 1}`}
                  style={{ maxWidth: '50%', maxHeight: '200px', marginRight: '10px' }}
                />
              ))}
            </p>
          </div>
        )}

        <p>
          <strong>Title:</strong> {product.title}
        </p>

        {product.category && (
          <p>
            <strong>Category:</strong> {product.category}
          </p>
        )}

        {product.bookType && (
          <p>
            <strong>Book Type:</strong> {product.bookType}
          </p>
        )}

        {product.otherBookType && (
          <p>
            <strong>Other Book Type:</strong> {product.otherBookType}
          </p>
        )}

        {product.authorName && (
          <p>
            <strong>Author Name:</strong> {product.authorName}
          </p>
        )}

        {product.size && (
          <p>
            <strong>Size:</strong> {product.size}
          </p>
        )}

        {product.stitchPreference && (
          <p>
            <strong>Stitching Preference:</strong> {product.stitchPreference}
          </p>
        )}

        {product.description && (
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

        <Link to="/sell-now">
          <button type="button">Sell Now</button>
        </Link>
      </ProductDetailsContainer>
    </DetailsContainer>
  );
};

export default ProductDetails;



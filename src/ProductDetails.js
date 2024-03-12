// ProductDetails.js
import React, { useState } from 'react';
import styled from 'styled-components';

const ProductDetailsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: -2%;
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  position: relative;
`;

const ImageSlider = styled.div`
  flex: 1;
  display: flex;
  align-items: stretch;
  position: relative;
`;

const Img = styled.img`
  width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 2em;
  color: #000;
  cursor: pointer;
`;

const PrevButton = styled(NavigationButton)`
  left: 0;
`;

const NextButton = styled(NavigationButton)`
  right: 0;
`;

const ProductInfoContainer = styled.div`
  flex: 1;
  padding: 20px;
  font-size: 1.2em;
  margin-left: 1%;
`;

const ProductInfoTitle = styled.h2`
  font-size: 1.5em;
  margin-bottom: 20px;
  color: #333;
  text-align: left;
`;

const ProductInfoItem = styled.div`
  margin-bottom: 15px;
`;

const ProductInfoLabel = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

const ProductInfoValue = styled.span`
  color: #555;
`;

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const ProductDetails = ({ product }) => {
  const [currentPictureIndex, setCurrentPictureIndex] = useState(0);

  const handleNextPicture = () => {
    setCurrentPictureIndex((prevIndex) =>
      prevIndex < product.pictures.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePrevPicture = () => {
    setCurrentPictureIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : product.pictures.length - 1
    );
  };

  return (
    <ProductDetailsContainer>
      <ImageContainer>
        {product.pictures && product.pictures.length > 1 && (
          <ImageSlider>
            <PrevButton onClick={handlePrevPicture}>&lt;</PrevButton>
            <Img
              src={product.pictures[currentPictureIndex]}
              alt={`Product ${currentPictureIndex + 1}`}
            />
            <NextButton onClick={handleNextPicture}>&gt;</NextButton>
          </ImageSlider>
        )}

        {!product.pictures || product.pictures.length <= 1 ? (
          <div className="single-image">
            {product.pictures && product.pictures.length === 1 && (
              <Img
                src={product.pictures[0]}
                alt="Product"
              />
            )}
          </div>
        ) : null}
      </ImageContainer>

      <ProductInfoContainer>
        <ProductInfoTitle>{capitalizeFirstLetter(product.title)}</ProductInfoTitle>

        {product.category && (
          <ProductInfoItem>
            <ProductInfoLabel>Category:</ProductInfoLabel>
            <ProductInfoValue>{capitalizeFirstLetter(product.category)}</ProductInfoValue>
          </ProductInfoItem>
        )}

        {product.bookType && (
          <ProductInfoItem>
            <ProductInfoLabel>Book Type:</ProductInfoLabel>
            <ProductInfoValue>{capitalizeFirstLetter(product.bookType)}</ProductInfoValue>
          </ProductInfoItem>
        )}

        {product.otherBookType && (
          <ProductInfoItem>
            <ProductInfoLabel>Other Book Type:</ProductInfoLabel>
            <ProductInfoValue>{capitalizeFirstLetter(product.otherBookType)}</ProductInfoValue>
          </ProductInfoItem>
        )}

        {product.authorName && (
          <ProductInfoItem>
            <ProductInfoLabel>Author Name:</ProductInfoLabel>
            <ProductInfoValue>{capitalizeFirstLetter(product.authorName)}</ProductInfoValue>
          </ProductInfoItem>
        )}

{product.publisher && (
          <ProductInfoItem>
            <ProductInfoLabel>Publisher:</ProductInfoLabel>
            <ProductInfoValue>{capitalizeFirstLetter(product.publisher)}</ProductInfoValue>
          </ProductInfoItem>
        )}

        {product.publicationYear && (
          <ProductInfoItem>
            <ProductInfoLabel>Publication Year:</ProductInfoLabel>
            <ProductInfoValue>{product.publicationYear}</ProductInfoValue>
          </ProductInfoItem>
        )}

        {product.isbn && (
          <ProductInfoItem>
            <ProductInfoLabel>ISBN:</ProductInfoLabel>
            <ProductInfoValue>{product.isbn}</ProductInfoValue>
          </ProductInfoItem>
        )}

        {product.pageCount && (
          <ProductInfoItem>
            <ProductInfoLabel>Number of Pages:</ProductInfoLabel>
            <ProductInfoValue>{product.pageCount}</ProductInfoValue>
          </ProductInfoItem>
        )}

{product.language && (
          <ProductInfoItem>
            <ProductInfoLabel>Language:</ProductInfoLabel>
            <ProductInfoValue>{capitalizeFirstLetter(product.language)}</ProductInfoValue>
          </ProductInfoItem>
        )}

        {product.stitchPreference && (
          <ProductInfoItem>
            <ProductInfoLabel>Stitching Preference:</ProductInfoLabel>
            <ProductInfoValue>{capitalizeFirstLetter(product.stitchPreference)}</ProductInfoValue>
          </ProductInfoItem>
        )}
        
        {product.size && (
          <ProductInfoItem>
            <ProductInfoLabel>Size:</ProductInfoLabel>
            <ProductInfoValue>{capitalizeFirstLetter(product.size)}</ProductInfoValue>
          </ProductInfoItem>
        )}

        {product.fabric && (
          <ProductInfoItem>
            <ProductInfoLabel>Fabric:</ProductInfoLabel>
            <ProductInfoValue>{capitalizeFirstLetter(product.fabric)}</ProductInfoValue>
          </ProductInfoItem>
        )}

        {product.color && (
          <ProductInfoItem>
            <ProductInfoLabel>Color:</ProductInfoLabel>
            <ProductInfoValue>{capitalizeFirstLetter(product.color)}</ProductInfoValue>
          </ProductInfoItem>
        )}

        {product.description && (
          <ProductInfoItem>
            <ProductInfoLabel>Description:</ProductInfoLabel>
            <ProductInfoValue>{capitalizeFirstLetter(product.description)}</ProductInfoValue>
          </ProductInfoItem>
        )}

        <ProductInfoItem>
          <ProductInfoLabel>Condition:</ProductInfoLabel>
          <ProductInfoValue>{capitalizeFirstLetter(product.condition)}</ProductInfoValue>
        </ProductInfoItem>

        <ProductInfoItem>
          <ProductInfoLabel>Price:</ProductInfoLabel>
          <ProductInfoValue>{product.price}</ProductInfoValue>
        </ProductInfoItem>
      </ProductInfoContainer>
    </ProductDetailsContainer>
  );
};

export default ProductDetails;

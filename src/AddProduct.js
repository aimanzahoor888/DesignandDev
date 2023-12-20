// AddProduct.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Switch from 'react-switch';
import ProductDetails from './ProductDetails';
import './styles.css';

const AddProduct = () => {
  const [productTitle, setProductTitle] = useState('');
  const [productPictures, setProductPictures] = useState([]);
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  
  const [bookType, setBookType] = useState(''); // Added bookType state
  const [otherBookType, setOtherBookType] = useState('');
  const [productCondition, setProductCondition] = useState('Excellent');
  const [isNegotiationEnabled, setIsNegotiationEnabled] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [submittedProduct, setSubmittedProduct] = useState(null);
  const [error, setError] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !productTitle ||
      !bookType || // Check for bookType if category is 'Books'
      (bookType === 'Other' && !otherBookType) || // Check for otherBookType if bookType is 'Other'
      !productCondition ||
      productPictures.length === 0
    ) {
      setError('Please fill in all required fields.');
      return;
    }

    const newProduct = {
      title: productTitle,
      pictures: productPictures,
      description: productDescription,
      price: productPrice,
      bookType: bookType === 'Other' ? otherBookType : bookType,
      condition: productCondition,
      isNegotiationEnabled, 
      authorName,
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
    const files = e.target.files;

    if (files) {
      const pictureArray = Array.from(files).map((file) => URL.createObjectURL(file));
      setProductPictures(pictureArray);
    }
  };

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
            <p style={{ color: 'red' }}>* Fields are required to fill</p>

            <label>
              Product Pictures<span>*</span>:
            </label>
            <input type="file" accept="image/*" multiple onChange={handlePictureChange} />

            <label>
              Product Title<span>*</span>:
            </label>
            <input type="text" value={productTitle} onChange={(e) => setProductTitle(e.target.value)} />

            

            <label>
              Author Name:
            </label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
            />

            <label>
            Book Type<span>*</span>:
          </label>
          <select value={bookType} onChange={(e) => setBookType(e.target.value)}>
            <option value="">Select Book Type</option>
            <option value="Action">Action</option>
            <option value="Romantic">Romantic</option>
            <option value="Historical">Historical</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Mystery">Mystery</option>
            <option value="Education Purpose">Education Purpose</option>
            <option value="Other">Other</option>
          </select>

          {bookType === 'Other' && (
            <div>
              <label>
                Other Book Type<span>*</span>:
              </label>
              <input
                type="text"
                value={otherBookType}
                onChange={(e) => setOtherBookType(e.target.value)}
              />
            </div>
          )}
            <label>
            Product Condition<span>*</span>:
          </label>
          <select value={productCondition} onChange={(e) => setProductCondition(e.target.value)}>
            <option value="Excellent">Excellent</option>
            <option value="Very Good">Very Good</option>
            <option value="GOOD">GOOD</option>
            <option value="Average">Average</option>
            <option value="Bad">Bad</option>
          </select>

            <label>
              Product Description:
            </label>
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            ></textarea>

            

            <label>
              Product Price<span>*</span>:
            </label>
            <input type="text" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />

            <label>
            Want to allow customer to bargain?If yes then enable the button.
            <Switch
              checked={isNegotiationEnabled}
              onChange={() => setIsNegotiationEnabled(!isNegotiationEnabled)}
            />
          </label>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <button type="submit">Submit</button>
          </form>
        ) : (
          <ProductDetails product={submittedProduct} />
        )}
        {!submittedProduct && (
  <Link to="/seller-info">
    <button>Back to Seller Info</button>
  </Link>
)}
        <Link to="/choose-category">Go back</Link>
      </div>
    </div>
  );
};

export default AddProduct;
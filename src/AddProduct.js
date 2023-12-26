// AddProduct.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Switch from 'react-switch';
import ProductDetails from './ProductDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import './styles.css';

const AddProduct = () => {
  const [products, setProducts] = useState([]);
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
  const [searchQuery, setSearchQuery] = useState('');
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
  const handleSearch = () => {
    const results = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    console.log(results);
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
  const buttonStyle = {
    fontFamily: 'kalnia',
  background: 'white',
  color: 'black',
  textDecoration: 'none',
  fontSize: '1.2em',
  padding: '10px 15px',
  border: '2.5px solid #C68763',
  borderRadius: '8px',
  marginLeft: '10px',
  cursor: 'pointer',
  };
  return (
    <div
    style={{
      display: 'flex',
      background: 'linear-gradient(to right,#607F8B,#D8675B)',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      margin: '0',
      padding: '0',
      width: '100%',
      boxSizing: 'border-box',
    }}
  >
    <header style={{ background: 'transparent', color: 'black', padding: '20px', textAlign: 'center', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <h1 style={{ margin: '0', fontFamily: 'kalnia', fontWeight: 'bold', fontSize: '2.7em' }}>
          THr!ftN
        </h1>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: '10px', borderRadius: '5px', marginTop: '3.5%', width: '420px', border: '2px solid #C68763' }}
        />
        <FontAwesomeIcon icon={faSearch} style={{ fontSize: '1.5em', marginLeft: '10px', cursor: 'pointer' }} onClick={handleSearch} />
      </div>
      <div>
        <Link to="/choose-category" style={buttonStyle}>
          Sell Now
        </Link>
        <Link to="/donate" style={buttonStyle}>
          Donate
        </Link>
        <Link to="/wishlist" style={buttonStyle}>
          Wishlist
        </Link>
        <Link to="/logout" style={buttonStyle}>
          Log Out
        </Link>
      </div>
    </header>
          {/* ... (rest of the component) ... */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h2 style={{ textAlign: 'center', fontSize: '1em', fontFamily: 'Greycliff CF', color: '#000000' }}></h2>
              <div
                className="dark-container"
                style={{
                  display: 'flex',
                  marginTop:'50px',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: '#607F8B',
                  padding: '50px',
                  lineHeight:'80%',
                  height:'20%',
                  marginTop:'50px',
                  borderRadius: '8px',
                  width: '140%', // Adjusted width to make it a bit smaller
                  boxSizing: 'border-box',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  marginBottom: '10px',
                  maxHeight: '985px', // Adjusted height to make it shorter
                  //overflow: 'auto', // Added overflow property for scrolling if needed
          
        }}
      >
      <h2  style={{ textAlign: 'center', fontSize: '2.5em', fontFamily: 'kalnia', color: '#000000' }}>Add Books</h2>
      <div
          className="light-container"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%', // Adjusted width to make it a bit bigger
            maxWidth: '800px',
            boxSizing: 'border-box',
            backgroundColor: '#D99B82',
            padding: '70px', // Adjusted padding to make it a bit bigger
            borderRadius: '8px',
            maxHeight: '780px', // Adjusted height to make it shorter
            //overflow: 'auto', // Added overflow property for scrolling if needed
          }}
        >
          {!submittedProduct ? (
            <form
              onSubmit={handleFormSubmit}
              style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '5px' }}
            >
            <p style={{ color: 'red', textAlign: 'center' }}>* Fields are required to fill</p>

            <label style={{ flex: '1', textAlign: 'left', color: '#000000' ,fontSize: '1.3em'}}>
            Pictures<span style={{ color: 'red' }}>*</span>:
            </label>
            <input type="file" accept="image/*" multiple onChange={handlePictureChange} />

            <label style={{ flex: '1', textAlign: 'left', color: '#000000' ,fontSize: '1.3em'}}>
            Title<span style={{ color: 'red' }} >*</span>:
            </label>
            <input type="text" value={productTitle} onChange={(e) => setProductTitle(e.target.value)} />

            

            <label style={{ flex: '1', textAlign: 'left', color: '#000000' ,fontSize: '1.3em'}}>
              Author Name:
            </label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
            />

            <label style={{ flex: '1', textAlign: 'left', color: '#000000' ,fontSize: '1.3em'}}>
            Book Genre<span>*</span>:
          </label>
          <select value={bookType} onChange={(e) => setBookType(e.target.value)}>
            <option value="">Select Book Genre</option>
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
                Other:<span>*</span>:
              </label>
              <input
                type="text"
                value={otherBookType}
                onChange={(e) => setOtherBookType(e.target.value)}
              />
            </div>
          )}
            <label style={{ flex: '1', textAlign: 'left', color: '#000000' ,fontSize: '1.3em'}} >
            Condition<span style={{ color: 'red' }}>*</span>:
          </label>
          <select value={productCondition} onChange={(e) => setProductCondition(e.target.value)}>
          <option value="">Select Book Condition</option>
            <option value="Excellent">Excellent</option>
            <option value="Very Good">Very Good</option>
            <option value="Average">Average</option>
            <option value="Bad">Bad</option>
          </select>

            <label style={{ flex: '1', color: '#000000',fontSize: '1.3em'}}>
            Description:
            </label>
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            ></textarea>

            

            <label style={{ flex: '1', textAlign: 'left', color: '#000000' ,fontSize: '1.3em'}}>
               Price<span style={{ color: 'red' }}>*</span>:
            </label>
            <input type="text" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />

            <label style={{ textAlign: 'left', color: '#000000',fontSize: '1.3em' }}>
            Let the customer negotiate price ?
            <Switch
              checked={isNegotiationEnabled}
              onChange={() => setIsNegotiationEnabled(!isNegotiationEnabled)}
            />
          </label>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <button 
            type="submit"
            style={{
              background: '#FFFFFF', // Match the background color
              color: '#000000', // Match the font color
              padding: '10px',
              cursor: 'pointer',
            }}>Submit</button>
          </form>
        ) : (
          <ProductDetails product={submittedProduct} />
        )}
        
        <Link to="/choose-category"></Link>
      </div>
    </div>
    </div>
    </div>
  );
};

export default AddProduct;
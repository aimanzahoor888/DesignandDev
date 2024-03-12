//AddClothes.js
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'; 
import Switch from 'react-switch';

import ProductDetails from './ProductDetails';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  display: flex;
  background: linear-gradient(to right, #607F8B, #D8675B);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  width: 100%;
  box-sizing: border-box;
`;

const Header = styled.header`
  background: transparent;
  color: black;
  padding: 20px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const AddClothes = () => {
  
  const [productTitle, setProductTitle] = useState('');
  const [products, setProducts] = useState([]);
  const [productPictures, setProductPictures] = useState([]);
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  //const [productLength, setProductLength] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productCondition, setProductCondition] = useState('Excellent');
  const [isNegotiationEnabled, setIsNegotiationEnabled] = useState(false); 
  const [fabric, setFabric] = useState('');
  const [otherFabric, setOtherFabric] = useState(''); 
  const [color, setColor] = useState('');
  const [stitchPreference, setStitchPreference] = useState(''); // Added stitch preference state
  const [size, setSize] = useState(''); // Added size state
  const [submittedProduct, setSubmittedProduct] = useState(null);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!productTitle || !productCategory || !productCondition || productPictures.length === 0) {
      setError('Please fill in all required fields.');
      return;
    }

    const newProduct = {
      title: productTitle,
      pictures: productPictures,
      description: productDescription,
      price: productPrice,
     // length: productLength,
      category: productCategory,
      condition: productCondition,
      isNegotiationEnabled,
      fabric, 
      color, 
      stitchPreference,
      size,
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
  const handleSearch = () => {
    const results = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    console.log(results);
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
        <Link to="/sell-now" style={{ textDecoration: 'none', color: 'black' }}>
          <h1 style={{ margin: '0', fontFamily: 'kalnia', fontWeight: 'bold', fontSize: '2.7em' }}>
            THr!ftN
          </h1>
          </Link>
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
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: '#607F8B',
                  padding: '40px',
                  //lineHeight:'90%',
                  height:'20%',
                  marginTop:'50px',
                  borderRadius: '8px',
                  width: '95%', // Adjusted width to make it a bit smaller
                  boxSizing: 'border-box',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  marginBottom: '10px',
                  maxHeight: '985px', // Adjusted height to make it shorter
                  //overflow: 'auto', // Added overflow property for scrolling if needed
          
        }}
      >
       <h2 style={{ textAlign: 'center', fontSize: '2.5em', fontFamily: 'kalnia', color: '#000000' }}>Add Clothes</h2>
        <div
          className="light-container"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%', // Adjusted width to make it a bit bigger
            maxWidth: '900px',
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

              <label style={{ textAlign: 'left',fontSize: '1.3em',color:'#000000' }}>
                Pictures<span style={{ color: 'red' }}>*</span>:
              </label>
              <input type="file" accept="image/*" multiple onChange={handlePictureChange} style={{ padding: '10px' }} />
  
              <div style={{ display: 'flex', gap: '10px' }}>
              <label style={{ flex: '1', textAlign: 'left', color: '#000000',fontSize: '1.3em' }}>
                Title<span style={{ color: 'red' }}>*</span>:
                <input type="text" value={productTitle} onChange={(e) => setProductTitle(e.target.value)} style={{ padding: '10px'}} />
              </label>

              <label style={{ textAlign: 'left', color: '#000000', fontSize: '1.3em', position: 'relative' }}>
  Category<span style={{ color: 'red' }}>*</span>:
  <div style={{ position: 'relative' }}>
    <div style={{ display: 'inline-block' }}>
      <select
        value={productCategory}
        onChange={(e) => setProductCategory(e.target.value)}
        style={{
          padding: '10px',
          //position: 'absolute',
          top: '100%',
          left: '5%',
        }}
      >
        <option value="">Select Category</option>
        <option value="men">Men</option>
        <option value="women">Women</option>
        <option value="kids">Kids</option>
        {/* Add other categories as needed */}
      </select>
    </div>
  </div>
</label>
            </div>
  
              {productCategory && (
                <>
                  {productCategory !== 'kids' && (
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <label style={{ flex: '1', textAlign: 'left', color: '#000000',fontSize: '1.3em' }}>
                        Type<span style={{ color: 'red' }}>*</span>:
                        <select
                          value={stitchPreference}
                          onChange={(e) => setStitchPreference(e.target.value)}
                          required
                          style={{ padding: '10px' }}
                        >
                          <option value="">Type</option>
                          <option value="stitched">Stitched</option>
                          <option value="unstitched">Unstitched</option>
                        </select>
                      </label>
  
                      {stitchPreference === 'stitched' && (
                       <label style={{ flex: '1', textAlign: 'left', color: '#000000', fontSize: '1.3em'}}>
                       Size<span style={{ color: 'red' }}>*</span>:
                       <div style={{ position: 'relative' }}>
                         <div style={{ display: 'inline-block' }}>
                           <select
                             value={size}
                             onChange={(e) => setSize(e.target.value)}
                             required
                             style={{
                               padding: '10px',
                               //position: 'absolute',
                               top: '10%',
                               left: 0,
                             }}
                           >
                             <option value="">Select Size</option>
                             <option value="XS">XS</option>
                             <option value="S">S</option>
                             <option value="M">M</option>
                             <option value="L">L</option>
                             <option value="XL">XL</option>
                           </select>
                         </div>
                       </div>
                     </label>
                     
                      )}
  
                      {stitchPreference === 'unstitched' && (
                        <label style={{ flex: '1', textAlign: 'left', color: '#000000',fontSize: '1.3em' }}>
                         Size (in meters or inches)<span style={{ color: 'red' }}>*</span>:
                          <input
                            type="text"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                            required
                            style={{ padding: '10px' }}
                          />
                        </label>
                      )}
                    </div>
                  )}
  
                  {productCategory === 'kids' && (
                    <label style={{ textAlign: 'left', color: '#000000' }}>
                     Size<span style={{ color: 'red' }}>*</span>:
                      <select value={size} onChange={(e) => setSize(e.target.value)} required style={{ padding: '10px' }}>
                        <option value="">Select Size</option>
                        <option value="1/2Y">1/2Y</option>
                        <option value="2/3Y">2/3Y</option>
                        <option value="3/4Y">3/4Y</option>
                        <option value="4/5Y">4/5Y</option>
                        <option value="5/6Y">5/6Y</option>
                        <option value="6/7Y">6/7Y</option>
                        <option value="7/8Y">7/8Y</option>
                        <option value="8/9Y">8/9Y</option>
                        <option value="9/10Y">9/10Y</option>
                        <option value="11/12Y">11/12Y</option>
                        {/* Add other size options as needed */}
                      </select>
                    </label>
                  )}
                </>
              )}
  
              <div style={{ display: 'flex', gap: '10px' }}>
                <label style={{ flex: '1', textAlign: 'left', color: '#000000' ,fontSize: '1.3em'}}>
                  Condition<span style={{ color: 'red' }}>*</span>:
                  <select value={productCondition} onChange={(e) => setProductCondition(e.target.value)} style={{ padding: '10px' }}>
                    <option value="Excellent">Excellent</option>
                    <option value="Very Good">Very Good</option>
                    <option value="Average">Average</option>
                    <option value="Bad">Bad</option>
                  </select>
                </label>
  
                <label style={{ flex: '1', marginLeft:'42%',textAlign: 'left', color: '#000000',fontSize: '1.3em'}}>
                  Description:
                  <textarea
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    style={{ padding: '8px',marginLeft:'2%' }}
                  ></textarea>
                </label>
              </div>
  
              <label style={{ textAlign: 'left', color: '#000000' ,fontSize: '1.3em'}}>
                Fabric:
                <select value={fabric} onChange={(e) => setFabric(e.target.value)} style={{ padding: '10px' }}>
                  <option value="">Select Fabric</option>
                  <option value="Lawn">Lawn</option>
                  <option value="Chiffon">Chiffon</option>
                  <option value="Cotton">Cotton</option>
                  <option value="Crepe">Crepe</option>
                  <option value="Denim">Denim</option>
                  <option value="Lace">Lace</option>
                  <option value="Leather">Leather</option>
                  <option value="Linen">Linen</option>
                  <option value="Satin">Satin</option>
                  <option value="Silk">Silk</option>
                  <option value="Velvet">Velvet</option>
                  <option value="Wool">Wool</option>
                  <option value="Other">Other</option>
                </select>
                {fabric === 'Other' && (
                  <div>
                    <label style={{ textAlign: 'left', color: '#000000' }}>
                      Other Fabric:
                      <input
                        type="text"
                        value={otherFabric}
                        onChange={(e) => setOtherFabric(e.target.value)}
                        style={{ padding: '10px' }}
                      />
                    </label>
                  </div>
                )}
              </label>
  
              <div style={{ display: 'flex', gap: '10px' }}>
              <label style={{ flex: '1', textAlign: 'left', color: '#000000', fontSize: '1.3em' }}>
    Color:
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        style={{ padding: '5px' }}
      />
      <input
        type="text"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        placeholder="Enter color"
        style={{ padding: '10px', marginLeft: '5px', width: '150px' }}
      />
    </div>
  </label>
  
                <label style={{ flex: '1', textAlign: 'left', color: '#000000' ,fontSize: '1.3em'}}>
                  Price<span style={{ color: 'red' }}>*</span>:
                  <input
                    type="text"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    style={{ padding: '10px' }}
                  />
                </label>
              </div>
  
              <label style={{ textAlign: 'left', color: '#000000',fontSize: '1.3em' }}>
                Let the customer negotiate price ?
                <Switch
                  checked={isNegotiationEnabled}
                  onChange={() => setIsNegotiationEnabled(!isNegotiationEnabled)}
                />
              </label>
  
              {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

<button
  type="submit"
  style={{
    background: '#FFFFFF', // Match the background color
    color: '#000000', // Match the font color
    padding: '10px',
    cursor: 'pointer',
  }}
>
  Submit
</button>
</form>
) : (
<ProductDetails product={submittedProduct} />
)}
 {submittedProduct && (
<Link
            to="/choose-category"
            style={{
              textAlign: 'center',
              color: '#000000', // Match the font color
              textDecoration: 'none',
              padding: '10px',
            }}
          >
           Go back
          </Link>
 )}
        </div>
      </div>
      </div>
      </div>
  );
};

export default AddClothes;



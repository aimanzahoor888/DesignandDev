//AddClothes.js
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import Switch from 'react-switch';

import ProductDetails from './ProductDetails';
import './styles.css';

const AddClothes = () => {
  
  const [productTitle, setProductTitle] = useState('');
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

    return (
      <div>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px',
          background: '#a7bed3',
          padding: '10px 20px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h1
            style={{
              color: '#000000',
              fontSize: '2em',
              textTransform: 'uppercase',
              margin: '0',
              fontFamily: 'Greycliff CF',
              fontWeight: 'bold',
              letterSpacing: '4px',
              textShadow: '4px 4px 4px rgba(0, 0, 0, 0.5)',
              marginRight: '20px', // Added margin for separation
            }}
          >
            THr!ftN
          </h1>
          {/* Make the search bar longer */}
          <input
            type="text"
            placeholder="Search...."
            style={{
              padding: '4px',
              borderRadius: '5px',
              marginTop: '3.5%',
              width: '400px', // Adjust the width as needed
              border: '1px solid #000000',
            }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Wishlist button in heart shape */}
          <Link
            to="/wishlist"
            style={{
              fontFamily: 'Argent CF',
              background: '#f1ffc4',
              color: '#000000',
              textDecoration: 'none',
              fontSize: '1.2em',
              padding: '10px 15px',
              borderRadius: '50%', // Make it a circle
              marginRight: '10px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="24"
              height="24"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </Link>
          {/* Other navigation links */}
          <Link
            to="/your-products"
            style={{
              fontFamily: 'Argent CF',
              background: '#f1ffc4',
              color: '#000000',
              textDecoration: 'none',
              fontSize: '1.2em',
              padding: '10px 15px',
              borderRadius: '4px',
              marginRight: '10px',
            }}
          >
            My Items
          </Link>
          <Link
            to="/choose-category"
            style={{
              fontFamily: 'Argent CF',
              background: '#f1ffc4',
              color: '#000000',
              textDecoration: 'none',
              fontSize: '1.2em',
              padding: '10px 15px',
              borderRadius: '4px',
            }}
          >
            Sell Now
          </Link>
        </div>
      </header>
      {/* ... (rest of the component) ... */}
         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h2 style={{ textAlign: 'center', fontSize: '1em', fontFamily: 'Greycliff CF', color: '#000000' }}>Clothes</h2>
              <div
                className="dark-container"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: '#a7bed3',
                  padding: '50px',
                  borderRadius: '8px',
                  width: '55%', // Adjusted width to make it a bit smaller
                  boxSizing: 'border-box',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  marginBottom: '10px',
                  maxHeight: '985px', // Adjusted height to make it shorter
                  //overflow: 'auto', // Added overflow property for scrolling if needed
          
        }}
      >
       <h2 style={{ textAlign: 'center', fontSize: '2.5em', fontFamily: 'Greycliff CF', color: '#000000' }}>Add Clothes</h2>
        <div
          className="light-container"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%', // Adjusted width to make it a bit bigger
            maxWidth: '900px',
            boxSizing: 'border-box',
            backgroundColor: '#c6e2e9',
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
                        Stitching Preference<span style={{ color: 'red' }}>*</span>:
                        <select
                          value={stitchPreference}
                          onChange={(e) => setStitchPreference(e.target.value)}
                          required
                          style={{ padding: '10px' }}
                        >
                          <option value="">Select Stitching Preference</option>
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
                         Size (in meters)<span style={{ color: 'red' }}>*</span>:
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
                    <option value="GOOD">GOOD</option>
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
                <label style={{ flex: '1', textAlign: 'left', color: '#000000',fontSize: '1.3em' }}>
                  Color:
                  <input type="text" value={color} onChange={(e) => setColor(e.target.value)} style={{ padding: '10px' }} />
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
    background: '#f1ffc4', // Match the background color
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
        </div>
      </div>
      </div>
      </div>
  );
};


export default AddClothes;
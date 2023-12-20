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
      <header>
        <h1>Thriftn</h1>
      </header>
      <h2>Add Clothes</h2>
      <div className="container">
        {!submittedProduct ? (
          <form onSubmit={handleFormSubmit}>
            <p style={{ color: 'red' }}>* Fields are required to fill</p>

            <label>
              Pictures<span>*</span>:
            </label>
            <input type="file" accept="image/*" multiple onChange={handlePictureChange} />

            <label>
              Title<span>*</span>:
            </label>
            <input type="text" value={productTitle} onChange={(e) => setProductTitle(e.target.value)} />

            

            <label>
          Product Category<span>*</span>:
        </label>
        <select value={productCategory} onChange={(e) => setProductCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
          {/* Add other categories as needed */}
        </select>

        {productCategory && (
          <>
            {productCategory !== 'kids' && (
              <>
                <label>
                  Stitching Preference<span>*</span>:
                </label>
                <select
                  value={stitchPreference}
                  onChange={(e) => setStitchPreference(e.target.value)}
                  required
                >
                  <option value="">Select Stitching Preference</option>
                  <option value="stitched">Stitched</option>
                  <option value="unstitched">Unstitched</option>
                </select>

                {stitchPreference === 'stitched' && (
                  <>
                    <label>
                      Size<span>*</span>:
                    </label>
                    <select
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      required
                    >
                      <option value="">Select Size</option>
                      <option value="XS">XS</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                    </select>
                  </>
                )}

                {stitchPreference === 'unstitched' && (
                  <>
                    <label>
                      Size (in meters)<span>*</span>:
                    </label>
                    <input
                      type="text"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      required
                    />
                  </>
                )}
              </>
            )}

            {productCategory === 'kids' && (
              <>
                <label>
                  Size<span>*</span>:
                </label>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  required
                >
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
              </>
            )}
          </>
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
              Description:
            </label>
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            ></textarea>

<label>
              Fabric:
            </label>
            <select value={fabric} onChange={(e) => setFabric(e.target.value)}>
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
                <label>
                  Other Fabric:
                </label>
                <input
                  type="text"
                  value={otherFabric} // Use otherFabric state here
                  onChange={(e) => setOtherFabric(e.target.value)}
                />
              </div>
            )}

            <label>
              Color:
            </label>
            <input type="text" value={color} onChange={(e) => setColor(e.target.value)} />


            <label>
              Price<span>*</span>:
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
        



        <Link to="/choose-category">Go back</Link>
      </div>
    </div>
  );
};

export default AddClothes;
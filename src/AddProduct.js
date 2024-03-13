// AddProduct.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Switch from 'react-switch';
import ProductDetails from './ProductDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

import './styles.css';
//import './SellNow.css';

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
// Additional state variables for book-related fields
  const [publicationYear, setPublicationYear] = useState('');
  const [publisher, setPublisher] = useState('');
  const [language, setLanguage] = useState('');
  const [otherLanguage, setOtherLanguage] = useState('');
  const [isbn, setIsbn] = useState('');
  const [pageCount, setPageCount] = useState('');
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
publicationYear,
      publisher,
      language: language === 'Other' ? otherLanguage : language,
      isbn,
      pageCount,
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

  const formContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '800px',
    boxSizing: 'border-box',
    backgroundColor: '#D99B82',
    padding: '70px',
    borderRadius: '8px',
    margin: '20px', 
  };
  const labelStyle = {
    marginBottom: '5px',
    fontSize: '1.3em',
    color: '#000000',
    width: '100%',
    boxSizing: 'border-box',
  };

  const inputStyle = {
    marginBottom: '15px',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1em',
    width: '100%',
    boxSizing: 'border-box',
  };

  const selectStyle = {
    ...inputStyle, // Inherits most styles from input
  };

  const errorStyle = {
    color: 'red',
    marginBottom: '10px',
  };
  const darkContainerStyle = {
    ...formContainerStyle,
    backgroundColor: '#FCF6F5',
  };

  const lightContainerStyle = {
    ...formContainerStyle,
    backgroundColor: '#D99B82',
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        margin: '0',
        padding: '0',
        width: '100%',
        boxSizing: 'border-box',
        background: '#FCF6F5',
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

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ textAlign: 'center', fontSize: '1em', fontFamily: 'Greycliff CF', color: '#000000' }}></h2>
        <div className="dark-container" style={darkContainerStyle}>
          <h2 style={{ textAlign: 'center', fontSize: '2.5em', fontFamily: 'kalnia', color: '#000000' }}>Add Books</h2>

          <div className="light-container" style={lightContainerStyle}>
            {!submittedProduct ? (
              <form
                onSubmit={handleFormSubmit}
                style={{padding:'1px', width: '110%',display: 'flex', flexDirection: 'column', gap: '5px' }}
              >
                <p style={{ color: 'red', textAlign: 'center' }}>* Fields are required to fill</p>

                <label style={{ ...labelStyle, flex: '1', textAlign: 'left' }} htmlFor="pictures">
                  Pictures<span style={{ color: 'red' }}>*</span>:
                </label>
                <input style={inputStyle} type="file" accept="image/*" multiple onChange={handlePictureChange} />

                <label style={{ ...labelStyle, flex: '1', textAlign: 'left' }} htmlFor="productTitle">
                  Title<span style={{ color: 'red' }}>*</span>:
                </label>
                <input style={inputStyle} type="text" value={productTitle} onChange={(e) => setProductTitle(e.target.value)} />

                {/* ... (other form fields) ... */}

            

                <label style={{ ...labelStyle, flex: '1', textAlign: 'left' }}>
  Author Name:
</label>
<input
  style={inputStyle}
  type="text"
  value={authorName}
  onChange={(e) => setAuthorName(e.target.value)}
/>

<label style={{ ...labelStyle, flex: '1', textAlign: 'left' }}>
                  Book Genre<span>*</span>:
                </label>
                <select style={inputStyle} value={bookType} onChange={(e) => setBookType(e.target.value)}>
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
                    <label style={labelStyle}>
                      Other:<span style={{ color: 'red' }}>*</span>:
                    </label>
                    <input
                      style={inputStyle}
                      type="text"
                      value={otherBookType}
                      onChange={(e) => setOtherBookType(e.target.value)}
                    />
                  </div>
                )}

<label style={{ ...labelStyle, flex: '1', textAlign: 'left' }}>
  Publication Year:
</label>
{/* Apply styles to the wrapper div */}
<div style={{ position: 'relative', display: 'inline-block' }}>
  <select
    style={{
      ...inputStyle,
      // Set the appearance property to none to disable default styling
      WebkitAppearance: 'none',
      MozAppearance: 'none',
      appearance: 'none',
    }}
    value={publicationYear}
    onChange={(e) => setPublicationYear(e.target.value)}
  >
    <option value="">Select Publication Year</option>
    {/* Generate options for years up to 2023 */}
    {Array.from({ length: 30 }, (_, index) => {
      const year = new Date().getFullYear() - index;
      return (
        <option key={year} value={year}>
          {year}
        </option>
      );
    })}
  </select>
  {/* Add a down arrow using Font Awesome icon */}
  <FontAwesomeIcon
    icon={faAngleDown}
    style={{
      position: 'absolute',
      top: '40%',
      right: '5px', // Adjust this value to position the arrow
      transform: 'translateY(-60%)',
      pointerEvents: 'none', // Make sure the arrow doesn't interfere with clicking the select
      fontSize: '0.8em',
    }}
  />
</div>


<label style={{ ...labelStyle, flex: '1', textAlign: 'left' }}>
  Publisher:
</label>
<input
  style={inputStyle}
  type="text"
  value={publisher}
  onChange={(e) => setPublisher(e.target.value)}
/>

<label style={{ ...labelStyle, flex: '1', textAlign: 'left' }}>
  Language<span style={{ color: 'red' }}>*</span>:
</label>
<select style={inputStyle} value={language} onChange={(e) => setLanguage(e.target.value)}>
  <option value="">Select Language</option>
  <option value="English">English</option>
  <option value="Spanish">Spanish</option>
  <option value="French">French</option>
  <option value="German">German</option>
  <option value="Other">Other</option>
</select>

{language === 'Other' && (
  <div>
    <label style={labelStyle}>
      Other Language:<span style={{ color: 'red' }}>*</span>:
    </label>
    <input
      style={inputStyle}
      type="text"
      value={otherLanguage}
      onChange={(e) => setOtherLanguage(e.target.value)}
    />
  </div>
)}

<label style={{ ...labelStyle, flex: '1', textAlign: 'left' }}>
  ISBN:
</label>
<input style={inputStyle} type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} />

<label style={{ ...labelStyle, flex: '1', textAlign: 'left' }}>
  Page Count:
</label>
<input style={inputStyle} type="text" value={pageCount} onChange={(e) => setPageCount(e.target.value)} />

{/* ... (other form fields) ... */}

         

          <label style={{ ...labelStyle, flex: '1', textAlign: 'left' }}>
                  Condition<span style={{ color: 'red' }}>*</span>:
                </label>
                <select style={inputStyle} value={productCondition} onChange={(e) => setProductCondition(e.target.value)}>
                  <option value="">Select Book Condition</option>
                  <option value="Excellent">Excellent</option>
                  <option value="Very Good">Very Good</option>
                  <option value="Average">Average</option>
                  <option value="Bad">Bad</option>
                </select>

                {/* ... (other form fields) ... */}

                <label style={{ ...labelStyle, flex: '1', textAlign: 'left' }}>
                  Description:
                </label>
                <textarea
                  style={inputStyle}
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                ></textarea>

                {/* ... (other form fields) ... */}

                <label style={{ ...labelStyle, flex: '1', textAlign: 'left' }}>
                  Price<span style={{ color: 'red' }}>*</span>:
                </label>
                <input style={inputStyle} type="text" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />

                {/* ... (other form fields) ... */}

                <label style={{ ...labelStyle, textAlign: 'left' }}>
                  Let the customer negotiate price?
                  <Switch
                    checked={isNegotiationEnabled}
                    onChange={() => setIsNegotiationEnabled(!isNegotiationEnabled)}
                  />
                </label>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <button
                  type="submit"
                  style={{
                    background: '#FFFFFF',
                    color: '#000000',
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
          </div>
        </div>
      </div>
    </div>
  );
};


export default AddProduct;

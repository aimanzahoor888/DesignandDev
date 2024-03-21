// ChooseCategory.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SellerInfo from './SellerInfo';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faRobot } from '@fortawesome/free-solid-svg-icons'; // Import the faRobot icon from '@fortawesome/free-solid-svg-icons'; 
// Import the faShoppingCart icon

const ChooseCategory = () => {
  const [personalInfo, setPersonalInfo] = useState({});
  const [products, setProducts] = useState([]);
  const [showSellerInfo, setShowSellerInfo] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleContinue = (info) => {
    setPersonalInfo(info);
    setShowSellerInfo(false);
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSearch = () => {
    const results = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    console.log(results);
  };

  const chatbotIconStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: '#C68763',
    color: 'white',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.5em',
    textDecoration: 'none',
  };

  const buttonStyle = {
    fontFamily: 'kalnia',
  background: 'white',
  color: 'black',
  textDecoration: 'none',
  fontSize: '1em',
  padding: '8px 10px',
  border: '2.5px solid #C68763',
  borderRadius: '8px',
  marginLeft: '10px',
  cursor: 'pointer',
  };

  

  console.log('Rendering ChooseCategory');

  return (
    <div
      style={{
        display: 'flex',
        background: '#FCF6F5',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        margin: '0',
        padding: '20px',
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
          <Link to="/about-us" style={buttonStyle}>
            About Us
          </Link>
          <Link to="/logout" style={buttonStyle}>
            Log Out
          </Link>
        </div>
      </header>
      <div
        className="container"
        style={{
          background: '#FCF6F5',
          padding: '20px',
          borderRadius: '8px',
          border: '5px solid #C68763',
          boxSizing: 'border-box',
        }}
      >
        {showSellerInfo ? (
          <SellerInfo onContinue={handleContinue} selectedCategory={selectedCategory} />
        ) : (
          <>
            <h2 style={{ marginBottom: '20px', fontSize: '2.5em', fontFamily: 'kalnia', color: '#000000' }}>Categories</h2>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '30px',
              }}
            >
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setShowSellerInfo(true);
                }}
                style={buttonStyle}
              >
                All
              </button>
              <button
                onClick={() => {
                  setSelectedCategory('Home Accessories');
                  setShowSellerInfo(true);
                }}
                style={buttonStyle}
              >
                Home Accessories
              </button>
              <button
                onClick={() => {
                  setSelectedCategory('Electronics');
                  setShowSellerInfo(true);
                }}
                style={buttonStyle}
              >
                Electronics
              </button>
              <button
                onClick={() => {
                  setSelectedCategory('Product');
                  setShowSellerInfo(true);
                }}
                style={buttonStyle}
              >
                Books
              </button>
              <button
                onClick={() => {
                  setSelectedCategory('Pet Care');
                  setShowSellerInfo(true);
                }}
                style={buttonStyle}
              >
                Pet Care
              </button>
              <button
                onClick={() => {
                  setSelectedCategory('Clothes');
                  setShowSellerInfo(true);
                }}
                style={buttonStyle}
              >
                Clothes
              </button>
            </div>
          </>
        )}
        <Link to="/sell-now"></Link>
      </div>
      <Link to="/live-chat-bot" style={chatbotIconStyle}>
        <FontAwesomeIcon icon={faRobot} />
      </Link>
    </div>
  );
};

export default ChooseCategory;



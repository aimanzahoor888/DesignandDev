import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import { useHistory } from 'react-router-dom';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col } from 'antd';//check1

import { faSearch } from '@fortawesome/free-solid-svg-icons';

//import productImage1 from './images/product1.png';
//import productImage2 from './images/product2.png';
import productImage1 from './images/product1.png';
import productImage2 from './images/product2.png';
import productImage3 from './images/product3.png';
import productImage4 from './images/product4.png';
import recommendedProductImage1 from './images/recommended1.jpeg';
import recommendedProductImage2 from './images/recommended2.jpeg';
import recommendedProductImage3 from './images/recommended3.jpeg';
import recommendedProductImage4 from './images/recommended4.jpeg';
import MenImage1 from './images/men1.jpeg';
import MenImage2 from './images/men2.jpeg';
import MenImage3 from './images/men3.jpeg';
import MenImage4 from './images/men4.jpeg';
import MenImage5 from './images/men5.jpeg';
import MenImage6 from './images/men6.jpeg';
import MenImage7 from './images/men7.jpeg';
import WomenImage1 from './images/women1.jpeg';
import WomenImage2 from './images/women2.jpeg';
import WomenImage3 from './images/women3.jpeg';
import WomenImage4 from './images/women4.jpeg';
import WomenImage5 from './images/women5.jpeg';
import WomenImage6 from './images/women6.jpeg';
import WomenImage7 from './images/women7.jpeg';

const gradientBackground = 'linear-gradient(to right,#607F8B,#D8675B)';

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  centerMode: true,
  centerPadding: '0',
  autoplay: true,
 autoplaySpeed: 4000,

};

const headerButtonStyle = {
  fontFamily: 'kalnia',
  background: 'white',
  color: 'black',
  textDecoration: 'none',
  fontSize: '1.2em',
  padding: '10px 15px',
  border:'2px solid #C68763',
  borderRadius: '8px',
  marginLeft: '10px',
  cursor: 'pointer',
};

const searchContainer = {
  display: 'flex',
  alignItems: 'center',
};

const searchInput = {
  padding: '10px',
  borderRadius: '5px',
  marginTop: '3.5%',
  width: '420px',
  border: '2px solid #C68763',
};

const searchIconStyle = {
  fontSize: '1.5em',
  marginLeft: '10px',
  cursor: 'pointer',
};
// Utility function to get the title based on the index
const getTitle = (index) => {
  const titles = [
    'How to influence people',
    'Grey cotton T shirt',
    'It ends with us',
    'Honey bee Hoodie',
  ];
  return titles[index] || 'Default Title';
};

// Utility function to get the price based on the index
const getPrice = (index) => {
  const prices = ['Rs.150', 'Rs.300', 'Rs.200', 'Rs.600'];
  return prices[index] || 'Default Price';
};

const styles = {
  // ... (existing styles)

  searchInput: {
    padding: '10px',
    borderRadius: '5px',
    marginTop: '3.5%',
    width: '420px',
    border: '2px solid #C68763',
  },

  searchIconStyle: {
    fontSize: '1.5em',
    marginLeft: '10px',
    cursor: 'pointer',
  },

  // ... (more existing styles)
};

const SellNow = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  const history = useHistory();
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchRecommendedProducts();
    setIsSearchClicked(false);
  }, [searchQuery]);

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

  const fetchRecommendedProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/recommended-products');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setRecommendedProducts(data);
      console.log('Recommended Products:', data);
    } catch (error) {
      console.error('Error fetching recommended products:', error);
    }
  };

  const handleSearch = () => {
    const results = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(results);

    // Redirect to original SellNow page when search is cleared
    if (searchQuery === '' && results.length === 0) {
      history.push('/sell-now');
    }

    // Clear search results when search query is empty
    if (searchQuery === '') {
      setSearchResults([]);
    }
    setIsSearchClicked(true);
  };
  

  /*const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/delete-product/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchProducts();
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };*/

  const imageContainerStyle = {
  border: '10px solid #FFFFFF',
  borderRadius: '8px',
  padding: '8px',
  marginBottom: '10px',
  width: '30%',  // Adjusted width
  cursor: 'pointer',
  boxSizing: 'border-box',
  marginLeft: '20px', // Adjusted margin on the left
  marginRight: '20px', // Adjusted margin on the right
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  
};
  return (
    <div style={{ background: '#FCF6F5', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      {/* Header */}
      <header style={{ background: 'transparent', color: 'black', padding: '20px', textAlign: 'center', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: '0', fontFamily: 'kalnia', fontWeight: 'bold', fontSize: '2.7em' }}>
            THr!ftN
          </h1>
        </div>
        <div style={searchContainer}>
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
          <FontAwesomeIcon icon={faSearch} style={styles.searchIconStyle} onClick={handleSearch} />
        </div>
        {/* Display "No results found" message if there are no search results */}
      {isSearchClicked &&searchQuery !== '' && searchResults.length === 0 && (
        <p style={{ textAlign: 'center', fontSize: '1.5em', fontWeight: 'bold', color: 'red' }}>No results found</p>
      )}
        <div>
          <Link to="/choose-category" style={headerButtonStyle}>
            Sell Now
          </Link>
          <Link to="/donate" style={headerButtonStyle}>
            Donate
          </Link>
          <Link to="/wishlist" style={headerButtonStyle}>
            Wishlist
          </Link>
          <Link to="/logout" style={headerButtonStyle}>
            Log Out
          </Link>
        </div>
      </header>
       

      {/* Slider */}
      {searchResults.length === 0 && (
        <div style={{ padding: '85px 110px',boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <section style={{marginTop:'45px', margin: '20px 0', maxWidth: '100%', width: '100%', margin: 'auto' }} className="slider">
            
            <Slider {...sliderSettings}>
              <div style={{ textAlign: 'center' }}>
                <img src={productImage1} alt="Product 1" style={{ width: '80%', height: 'auto', margin: '0 auto' }} />
              </div>
              <div style={{ textAlign: 'center' }}>
                <img src={productImage2} alt="Product 2" style={{ width: '80%', height: 'auto', margin: '0 auto' }} />
              </div>
              <div style={{ textAlign: 'center' }}>
                <img src={productImage3} alt="Product 3" style={{ width: '80%', height: 'auto', margin: '0 auto' }} />
              </div>
              <div style={{ textAlign: 'center' }}>
                <img src={productImage4} alt="Product 4" style={{ width: '80%', height: 'auto', margin: '0 auto' }} />
              </div>
            </Slider>
          </section>
        </div>
      )}

      {/* New Items Section */}
      <section style={{ margin: '20px 0', marginTop:'20px',marginBottom: '20px', maxWidth: '800px', width: '90%', margin: 'auto' }} className="slider">
      {searchResults.length === 0 && (
    <h2 style={{ color: 'black', fontSize: '2em', fontFamily: 'kalnia', marginBottom: '10px' }}>Newly Added</h2>)}
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px', width: '100%' }}>
      {searchResults.length > 0 ? (
        searchResults.map((product, index) => (
          <div
            key={index}
            style={{
              ...imageContainerStyle,
              height: '300px',  // Adjusted height
              display: 'flex',
              width: '30%',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: '28px', // Added margin on the left
              marginRight: '28px', 
              marginTop:'70px',
            }}
            onClick={() => history.push(`/product-preview/${product._id}`)}
          >
        
          {product.pictures && product.pictures.length > 0 ? (
            <img
              src={product.pictures[0]}
              alt={`Product ${index + 1}`}
              style={{ alignItems:'center',padding:'8px',width: '50%', height: 'auto', marginBottom: '10px', alignContent: 'center'  }}
              onError={(e) => console.error(`Error loading image for product ${index + 1}:`, e)}
            />
          ) : (
            <p>No image available</p>
          )}
          <p style={{ fontSize: '1.2em', fontWeight: 'bold', marginBottom: '5px' }}>{product.title}</p>
          <p style={{ fontSize: '1em' }}>Price: Rs{product.price}</p>
          </div>
        ))
      ) : (
        products.map((product, index) => (
          <div
            key={index}
            style={{
              ...imageContainerStyle,
               height: '300px',  // Adjusted height
              display: 'flex',
              width: '30%',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: '28px', // Added margin on the left
              marginRight: '28px', 
             // objectFit: 'cover',
              
            }}
            onClick={() => history.push(`/product-preview/${product._id}`)}
          >
          {product.pictures && product.pictures.length > 0 ? (
            <img
              src={product.pictures[0]}
              alt={`Product ${index + 1}`}
              style={{alignItems:'center',padding:'8px',width: '50%', height: 'auto', marginBottom: '10px', alignContent: 'center' }}
              onError={(e) => console.error(`Error loading image for product ${index + 1}:`, e)}
            />
          ) : (
            <p>No image available</p>
          )}
          <p style={{ fontSize: '1.2em', fontWeight: 'bold', marginBottom: '5px' }}>{product.title}</p>
          <p style={{ fontSize: '1em' }}>Price: Rs{product.price}</p>
          </div>
        ))
      )}
    </div>
  </section>

     {/* Recommended for You Section */}
<section style={{ margin: '100px 100px', marginTop:'50px',marginBottom: '50px', maxWidth: '90%', width: '150%', margin: 'auto' }}>
  <h2 style={{ color: 'black', fontSize: '2em', fontFamily: 'kalnia', marginBottom: '10px' }}>Recommended for You</h2>
  <Slider {...sliderSettings}slidesToShow={3}>
    <div>
      <img src={recommendedProductImage1} alt="Product 5" style={{ height: '300px', borderRadius: '8px', width: '50%', margin: 'auto', padding: '8px', border: '10px solid #FFFFFF' }} />
     
    </div>
    <div>
      <img src={recommendedProductImage2} alt="Product 6" style={{ height: '300px', borderRadius: '8px', width: '50%', margin: 'auto', padding: '8px', border: '10px solid #FFFFFF' }} />
    </div>
    <div>
      <img src={recommendedProductImage3} alt="Product 7" style={{ height: '300px', borderRadius: '8px', width: '50%', margin: 'auto', padding: '8px', border: '10px solid #FFFFFF' }} />
    </div>
    <div>
      <img src={recommendedProductImage4} alt="Product 8" style={{ height: '300px', borderRadius: '8px', width: '50%', margin: 'auto', padding: '8px', border: '10px solid #FFFFFF' }} />
    </div>
  </Slider>
</section>
 {/* Men's Collection Section */}
<section style={{ margin: '20px 0', marginTop:'50px',marginBottom: '50px', maxWidth: '90%', width: '100%', margin: 'auto' }}>
  <h2 style={{ color: 'black', fontSize: '2em', fontFamily: 'kalnia', marginBottom: '10px' }}>Men's collection</h2>
  <Slider {...sliderSettings}slidesToShow={3}>
    <div>
      <img src={MenImage1} alt="men1" style={{ height: '300px', borderRadius: '8px', width: '50%', margin: 'auto', padding: '8px', border: '10px solid #FFFFFF' }} />
    </div>
    <div>
      <img src={MenImage2} alt="men2" style={{ height: '300px', borderRadius: '8px', width: '50%', margin: 'auto', padding: '8px', border: '10px solid #FFFFFF' }} />
    </div>
    <div>
      <img src={MenImage3} alt="men3" style={{ height: '300px', borderRadius: '8px', width: '50%', margin: 'auto', padding: '8px', border: '10px solid #FFFFFF' }} />
    </div>
    <div>
      <img src={MenImage4} alt="men4" style={{ height: '300px', borderRadius: '8px', width: '50%', margin: 'auto', padding: '8px', border: '10px solid #FFFFFF' }} />
    </div>
  </Slider>
</section>
{/* Women's Collection Section */}
<section style={{ margin: '20px 0', marginTop:'50px',marginBottom: '50px', maxWidth: '90%', width: '100%', margin: 'auto' }}>
  <h2 style={{ color: 'black', fontSize: '2em', fontFamily: 'kalnia', marginBottom: '10px' }}>Women's collection</h2>
  <Slider {...sliderSettings}slidesToShow={3}>
    <div>
      <img src={WomenImage1} alt="women1" style={{ height: '300px', borderRadius: '8px', width: '50%', margin: 'auto', padding: '8px', border: '10px solid #FFFFFF' }} />
    </div>
    <div>
      <img src={WomenImage2} alt="women2" style={{ height: '300px', borderRadius: '8px', width: '50%', margin: 'auto', padding: '8px', border: '10px solid #FFFFFF' }} />
    </div>
    <div>
      <img src={WomenImage3} alt="women3" style={{ height: '300px', borderRadius: '8px', width: '50%', margin: 'auto', padding: '8px', border: '10px solid #FFFFFF' }} />
    </div>
    <div>
      <img src={WomenImage4} alt="women4" style={{ height: '300px', borderRadius: '8px', width: '50%', margin: 'auto', padding: '8px', border: '10px solid #FFFFFF' }} />
    </div>
  </Slider>
</section>

      {/* Footer */}
      <footer
        style={{
          background: '#FCF6F5',
          color: 'black',
          textAlign: 'center',
          padding: '20px',
          //position: 'relative',
          bottom: '0',
          left: '0',
          width: '100%',
        }}
      >
        &copy; 2023 THr!ftN. All rights reserved.
      </footer>
    </div>
  );
};

export default SellNow;

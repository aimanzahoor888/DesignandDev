// ProductPreview.js
import React, { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const gradientBackground = '#FCF6F5';
//display: flex;should add
const ProductPreviewContainer = styled.div`
display: flex;
  max-width: 1000px;
  margin: 0 auto;
  
`;

const ProductImageContainer = styled.div`
  flex: 1;
  margin-top: 11%;
  margin-left:12%;
`;

const ProductImage = styled.img`
  width: 90%;
  max-height: 100%;
  object-fit: cover;
  
`;

const ImageNavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  margin-top: 10%;
`;

const NavigationButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  margin-top: 10%;
`;


const ProductDetails = styled.div`
  flex: 1;
  padding: 15px;
  display: flex;
  flex-direction: column;
  margin-top: 10%;
  margin-left: 5%;

  h2 {
    color: #333;
    font-size: 1.6em;
    margin-bottom: 3px;
  }

  p {
    margin-bottom: 3px;
    font-size: 1.2em;
    color: #3f444d;
    font-weight: medium;
  }

  strong {
    font-weight: bolder;
    color: #333;
  }
`;

const ProductTitle = styled.h2`
  color: #007bff;
`;

const ProductDetail = styled.p`
  margin-bottom: 10px;
`;

const BackButtonContainer = styled.div`
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
`;

const BackButton = styled.button`
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
  padding: 30px 65px;
  cursor: pointer;
  border: 1px solid #007bff;
  border-radius: 8px;
`;

const ProductPreview = () => {
  const { productId } = useParams();
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('search');
  const history = useHistory();
  const [previewSearchQuery, setPreviewSearchQuery] = useState('');
  const [currentPictureIndex, setCurrentPictureIndex] = useState(0);

  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${productId}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    const queryParams = new URLSearchParams(location.search);
    const currentSearchQuery = queryParams.get('search') || '';
    setPreviewSearchQuery(currentSearchQuery);

    fetchProductDetails();
  }, [productId, location.search]);

  const goBackToSearchResults = () => {
    const searchQueryParam = encodeURIComponent(previewSearchQuery || '');
    const searchResultsURL = `/sell-now?search=${searchQueryParam}`;
    history.push(searchResultsURL);
  };

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

  const handleSearch = () => {
    const results = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    console.log(results);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (

    <div className='ch'style={{ background: gradientBackground }}>
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
            value={previewSearchQuery}
            onChange={(e) => setPreviewSearchQuery(e.target.value)}
            style={{ padding: '10px', borderRadius: '5px', marginTop: '3.5%', width: '420px', border: '2px solid #C68763' }}
          />
          <FontAwesomeIcon icon={faSearch} style={{ fontSize: '1.5em', marginLeft: '10px', cursor: 'pointer' }} onClick={handleSearch} />
        </div>
        <div>
          <Link to="/choose-category" style={{ fontFamily: 'kalnia', background: 'white', color: 'black', textDecoration: 'none', fontSize: '1.2em', padding: '10px 15px', border: '2.5px solid #C68763', borderRadius: '8px', marginLeft: '10px', cursor: 'pointer' }}>
            Sell Now
          </Link>
          <Link to="/donate" style={{ fontFamily: 'kalnia', background: 'white', color: 'black', textDecoration: 'none', fontSize: '1.2em', padding: '10px 15px', border: '2.5px solid #C68763', borderRadius: '8px', marginLeft: '10px', cursor: 'pointer' }}>
            Donate
          </Link>
          <Link to="/wishlist" style={{ fontFamily: 'kalnia', background: 'white', color: 'black', textDecoration: 'none', fontSize: '1.2em', padding: '10px 15px', border: '2.5px solid #C68763', borderRadius: '8px', marginLeft: '10px', cursor: 'pointer' }}>
            Wishlist
          </Link>
          <Link to="/logout" style={{ fontFamily: 'kalnia', background: 'white', color: 'black', textDecoration: 'none', fontSize: '1.2em', padding: '10px 15px', border: '2.5px solid #C68763', borderRadius: '8px', marginLeft: '10px', cursor: 'pointer' }}>
            Log Out
          </Link>
        </div>
      </header>
    
    <ProductPreviewContainer>
      <ProductImageContainer>
        {product.pictures && product.pictures.length > 1 && (
          <React.Fragment>
            <ImageNavigationContainer>
              <NavigationButton onClick={handlePrevPicture}>&lt;</NavigationButton>
              <ProductImage src={product.pictures[currentPictureIndex]} alt={`Product`} />
              <NavigationButton onClick={handleNextPicture}>&gt;</NavigationButton>
            </ImageNavigationContainer>
            <div>{currentPictureIndex + 1} of {product.pictures.length}</div>
          </React.Fragment>
        )}
        {!product.pictures || product.pictures.length <= 1 && (
          <ProductImage src={product.pictures[0]} alt={`Product`} />
        )}
      </ProductImageContainer>
      <ProductDetails>
       {/* <ProductTitle>{product.title}</ProductTitle>*/}
        {Object.entries(product).map(([key, value]) => (
          value && key !== '_id' && key !== '__v' && key !== 'pictures' ? (
            <ProductDetail key={key}>
              <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
            </ProductDetail>
          ) : null
        ))}
        <BackButtonContainer>
        <Link to={`/sell-now`}>
          <button >Go Back</button>
          </Link>
          <Link to={`/buyer-info/${productId}`}>
            <button>Buy Now</button>
          </Link>
        </BackButtonContainer>

        
        
          
      </ProductDetails>
    </ProductPreviewContainer>
    </div>
  );
};

export default ProductPreview;

import React, { useEffect, useState } from 'react';
import { useParams, useHistory, useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  max-width: 600px;
  margin-top: 50px;
  margin: 50px auto;
  padding: 20px;
  background-color: #D99B82;
  
`;
const gradientBackground = '#FCF6F5';
const ProductImage = styled.img`
  display: block;
  margin: 0;
  width: 200px;
  height: auto;
  margin-top: 50px;
  margin-bottom: 20px;
`;
const Button = styled.button`
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px;
`;
const Header = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

const Details = styled.div`
  margin-bottom: 20px;
`;

const DetailLabel = styled.span`
  font-weight: bold;
`;

const DeliveryCharges = styled.p`
  margin-bottom: 10px;
`;

const TotalBill = styled.h3`
  margin-bottom: 20px;
`;

const PaymentMethod = styled.div`
  margin-top: 20px;
`;

const RadioButton = styled.input`
  margin-right: 5px;
`;

const Label = styled.label`
  cursor: pointer;
`;
const SelectPayment = styled.select`
  padding: 10px;
  font-size: 16px;
`;



const Billing = () => {
  const { productId } = useParams();
  const location = useLocation();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const campus = queryParams.get('campus');
  const email = queryParams.get('email');
  const searchQuery = new URLSearchParams(location.search).get('search');
  const history = useHistory();
  const [previewSearchQuery, setPreviewSearchQuery] = useState('');
  const [product, setProduct] = useState(null);
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  const [totalBill, setTotalBill] = useState(0);
  const [formData, setFormData] = useState({ email: '' });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${productId}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const productData = await response.json();
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    // Calculate delivery charges based on campus
    if (campus === 'OTHER') {
      setDeliveryCharges(200);
    } else {
      setDeliveryCharges(0);
    }
  }, [campus]);

  const handleSearch = () => {
    const results = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    console.log(results);
  };

  useEffect(() => {
    // Calculate total bill
    if (product) {
      const productPrice = parseFloat(product.price);
      setTotalBill(productPrice + deliveryCharges);
    }
  }, [product, deliveryCharges]);
  const handleConfirmOrder = () => {
    // Handle confirming the order
    // Navigate to the order confirmation page
    history.push('/order-confirmation');
  };

  
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
    <Container>
    <Header> </Header>
        {product && (
          <div>
            <ProductImage src={product.pictures[0]} alt="Product" />
            <Details>
              <p><DetailLabel>Title:</DetailLabel> {product.title}</p>
              <p><DetailLabel>Price:</DetailLabel> ${product.price}</p>
            </Details>
          </div>
        )}
        <p><DetailLabel>Delivery Charges:</DetailLabel> ${deliveryCharges}</p>
        <p><DetailLabel>Total Bill:</DetailLabel> ${totalBill.toFixed(2)}</p>
        
         <p> <DetailLabel>Payment Method:</DetailLabel></p>
          <SelectPayment id="paymentMethod">
            <option value="cashOnDelivery">Cash on Delivery</option>
            {/* Add more payment options here */}
          </SelectPayment>
          <Button onClick={handleConfirmOrder}>Confirm Order</Button>
      </Container>
    </div>
  );
};

export default Billing;

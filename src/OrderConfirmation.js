import React, { useEffect, useState } from 'react';
import { useParams, useHistory, useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  height: 900px;
  
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
  border-radius: 8px;
  cursor: pointer;
`;

const gradientBackground = '#FCF6F5';

const Header = styled.h2`

  font-size: 30px;
 background: #D99B82;
  text-align: center;
`;

const Content = styled.div`

  text-align: center;
  max-width: 600px;
  margin: 90px auto;
  padding: 30px;
  background: #D99B82;
`;

const OrderConfirmation = () => {
  return (
    <div style={{ background: gradientBackground }}>
      <header style={{ background: 'transparent', color: 'black', padding: '20px', textAlign: 'center', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Link to="/sell-now" style={{ textDecoration: 'none', color: 'black' }}>
            <h1 style={{ margin: '0', fontFamily: 'kalnia', fontWeight: 'bold', fontSize: '2.7em' }}>
              THr!ftN
            </h1>
          </Link>
        </div>
        {/* Add other header elements as needed */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search for products..."
            
            style={{ padding: '10px', borderRadius: '5px', marginTop: '3.5%', width: '420px', border: '2px solid #C68763' }}
          />
          <FontAwesomeIcon icon={faSearch} style={{ fontSize: '1.5em', marginLeft: '10px', cursor: 'pointer' }}  />
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
        
        <Content>
        <Header>Your order is pending.</Header>
        <p style={{ color: 'black',fontSize: '1.2em',fontWeight:'bold'}}>You will shortly receive an email confirmation for your order.</p>
        <Button as={Link} to="/sell-now">Continue Shopping</Button>
        </Content>
      </Container>
    </div>
  );
};

export default OrderConfirmation;

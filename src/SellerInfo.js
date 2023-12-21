// SellerInfo.js
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const SellerInfo = ({ onContinue, selectedCategory }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const history = useHistory();

  useEffect(() => {
    // Load the stored state from localStorage
    const storedState = JSON.parse(localStorage.getItem('sellerInfo'));
    if (storedState) {
      setFirstName(storedState.firstName);
      setLastName(storedState.lastName);
      setCity(storedState.city);
      setAddress(storedState.address);
      setPostalCode(storedState.postalCode);
      setPhoneNumber(storedState.phoneNumber);
      setEmail(storedState.email);
    }
  }, []); // Empty dependency array means this effect runs once after the initial render

  const handleContinue = () => {
    // Check if all fields are filled
    if (!firstName || !lastName || !city || !address || !postalCode || !phoneNumber || !email) {
      alert('Please fill in all fields.');
    } else {
      const sellerInfo = {
        firstName,
        lastName,
        city,
        address,
        postalCode,
        phoneNumber,
        email,
      };

      // Save the state to localStorage
      localStorage.setItem('sellerInfo', JSON.stringify(sellerInfo));

      onContinue(sellerInfo);

      // Now, navigate to the selected category page
      history.push(`/add-${selectedCategory.toLowerCase()}`);
    }
  };

  return (
    <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '10vh',
          backgroundColor: '#c6e2e9', // Match the background color of ChooseCategory
          padding: '20px', // Adjust the padding to make the outer container smaller
          borderRadius: '8px', // Add border radius for rounded corners
          boxSizing: 'border-box',
      }}
    >
      <h2
        style={{
          marginBottom: '20px',
          fontSize: '3em',
          fontFamily: 'Greycliff CF', // Match the font family
          color: '#000000', // Match the font color
        }}
      >
        Personal Information
      </h2>
      <form
        style={{
          width: '90%',
          maxWidth: '600px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <div style={{ display: 'flex', gap: '10px' }}>
          <label style={{ flex: '1' ,color: '#000000'}}>
            First Name:
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </label>
          <label style={{ flex: '1' ,color: '#000000' }}>
            Last Name:
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </label>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <label style={{ flex: '1' ,color: '#000000' }}>
            City:
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
          </label>
          <label style={{ flex: '1' ,color: '#000000' }}>
            Full Address:
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          </label>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <label style={{ flex: '1'  ,color: '#000000'}}>
            Postal Code:
            <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
          </label>
          <label style={{ flex: '1' ,color: '#000000' }}>
            Phone Number:
            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </label>
        </div>
        <label style={{ color: '#000000' }}>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <button
          type="button"
          onClick={handleContinue}
          style={{
            background: '#f1ffc4', // Match the background color
            color: '#000000', // Match the font color
            padding: '10px',
            cursor: 'pointer',
          }}
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default SellerInfo;

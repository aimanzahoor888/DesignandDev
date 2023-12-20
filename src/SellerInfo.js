// SellerInfo.js
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './styles.css';

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
    console.log('onContinue:', onContinue);
    console.log('selectedCategory:', selectedCategory);
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
    <div>
      <h2>Personal Information</h2>
      <form>
        <label>
          First Name:
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </label>
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </label>
        <label>
          City:
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
        </label>
        <label>
          Full Address:
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </label>
        <label>
          Postal Code:
          <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
        </label>
        <label>
          Phone Number:
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <button type="button" onClick={handleContinue}>
          Continue
        </button>
      </form>
    </div>
  );
};

export default SellerInfo;
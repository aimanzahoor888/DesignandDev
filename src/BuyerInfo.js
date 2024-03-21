// BuyerInfo.js
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #D99B82;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const campuses = ['SCIT', 'SLASS', 'SB', 'SWAD', 'MAIN CAFETRIA', 'ADMISSION OFFICE', 'OTHER'];

const BuyerInfo = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    city: '',
    postalCode: '',
    campus: '',
    otherCampus: '', // New state for the custom location
  });

  const { productId } = useParams();
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if address is provided
    if (!formData.address) {
      console.error('Please provide your address');
      return; // Exit the function if address is not provided
    }
  
    try {
      console.log(formData);
      const response = await fetch('http://localhost:5000/api/buyer-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log('Form data sent successfully');
        // Redirect to billing page
        const queryParams = new URLSearchParams({
          campus: formData.campus,
          email: formData.email, // Append email to query string
        });
        history.push(`/billing/${productId}?${queryParams.toString()}`);
      } else {
        console.error('Error sending form data:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending form data:', error);
    }
  };
  

  

  return (
    <Container>
      <Title>Enter Buyer Information</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Email:</Label>
          <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label>First Name:</Label>
          <Input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label>Last Name:</Label>
          <Input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label>Phone Number:</Label>
          <Input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label>Address:</Label>
          <Input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label>City:</Label>
          <Input type="text" name="city" value={formData.city} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label>Postal Code:</Label>
          <Input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} required />
        </FormGroup>
        <FormGroup>
          <Label>Campus:</Label>
          <Select name="campus" value={formData.campus} onChange={handleChange} required>
            <option value="">Select campus</option>
            {campuses.map((campus) => (
              <option key={campus} value={campus}>
                {campus}
              </option>
            ))}
          </Select>
        </FormGroup>
        {/* Conditionally render input field for other campus */}
        {formData.campus === 'OTHER' && (
          <FormGroup>
            <Label>Other Campus:</Label>
            <Input
              type="text"
              name="otherCampus"
              value={formData.otherCampus}
              onChange={handleChange}
              placeholder="Enter Other Campus"
              required
            />
          </FormGroup>
        )}
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default BuyerInfo;

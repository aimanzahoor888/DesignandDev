import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faRobot} from '@fortawesome/free-solid-svg-icons'; 

const AboutUs = () => {
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
        <h1 style={{ margin: '0', fontFamily: 'kalnia', fontWeight: 'bold', fontSize: '2.7em' }}>
            THr!ftN
          </h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* You can include search input and icon here if needed */}
        </div>
        <div>
          <a href="./sell-now" style={buttonStyle}>
            Sell Now
          </a>
          <a href="#donate" style={buttonStyle}>
            Donate
          </a>
          {/* Add more links here if needed */}
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
        <h2 style={{ marginBottom: '20px', fontSize: '2.5em', fontFamily: 'kalnia', color: '#000000' }}>About Us!</h2>
        <p>
          Thriftn' is your ultimate destination for eco-friendly shopping and selling. We're passionate about sustainability and providing a platform for individuals to thrift. Thrifting is not just about buying and selling old items; it's a lifestyle choice that promotes reusing and recycling goods while reducing waste. Our platform allows you to buy and sell pre-loved items that are in good condition, giving them a new lease on life.
        </p>
        <p>
          In addition to thrifting, we also offer the option to donate items. We believe in giving back to the community and supporting those in need. By donating through Thriftn', you can make a positive impact and contribute to a more sustainable future.
        </p>
        <p>
          Safety and security are our top priorities at Thriftn'. You can trust our platform to provide a safe environment for buying, selling, and donating. If you ever have any questions or concerns, our dedicated support team is here to help. Reach out to us anytime at <a href="mailto:Thriftn@gmail.com" style={{ color: '#C68763', textDecoration: 'none' }}>Thriftn@gmail.com</a> or utilize our live chat bot, available 24/7, for immediate assistance.
        </p>
        <p style={{ fontWeight: 'bold', textAlign: 'center' }}>Join us in our mission to do amazing shopping while making a positive difference. Whether you're looking to make some extra money by selling your pre-loved items, declutter your space, or find affordable treasures, Thriftn' is here to help you every step of the way.</p>
        <p style={{ textAlign: 'center' }}>Let's thrift responsibly and create a more sustainable future together with Thriftn'!</p>
        <p style={{ fontWeight: 'bold', textAlign: 'center' }}>Thanks For Visiting Our Site<br /><br />
          <span style={{ color: '#C68763', fontSize: '16px', fontWeight: 'bold', textAlign: 'center' }}>Have a nice day!</span>
        </p>
      </div>
      <Link to="/live-chat-bot" style={chatbotIconStyle}>
        <FontAwesomeIcon icon={faRobot} />
      </Link> {/* Link to the chatbot page */}
    </div>
  );
};

export default AboutUs;

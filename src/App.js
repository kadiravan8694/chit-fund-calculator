// src/App.js

import React, { useState, useEffect } from 'react';
import './App.css';

// Import FontAwesome components and icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Calculator />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

/* Header Component */
const Header = () => {
  return (
    <header className="header">
      <h1>Chit Fund Calculator</h1>
    </header>
  );
};

/* Footer Component */
const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; 2024 Chit Fund Calculator</p>
    </footer>
  );
};

/* Contact Section Component */
const ContactSection = () => {
  return (
    <section className="contact-section">
      <h2>Get in Touch with Us for Support, Sales, or General Inquiries!</h2>
      <div className="contact-details">
        {/* Stylized Name */}
        <p className="stylized-name">
          <span className="red">K</span>
          <span className="blue">adiravan&nbsp;</span>
          <span className="red">K</span>
          <span className="blue">alidoss..!</span>
        </p>

        {/* Contact Items */}
        <div className="contact-item">
          <FontAwesomeIcon icon={faMobileAlt} className="icon" />
          <a href="tel:+919003264685" className="contact-link">+91-9003264685</a>
        </div>
        <div className="contact-item">
          <FontAwesomeIcon icon={faEnvelope} className="icon" />
          <a href="mailto:kadiravankalidoss@gmail.com" className="contact-link">kadiravankalidoss@gmail.com</a>
        </div>
        <div className="contact-item">
          <FontAwesomeIcon icon={faLinkedin} className="icon" />
          <a href="https://www.linkedin.com/in/kadiravank" target="_blank" rel="noopener noreferrer" className="contact-link">LinkedIn</a>
        </div>
        <div className="contact-item">
          <FontAwesomeIcon icon={faInstagram} className="icon" />
          <a href="https://www.instagram.com/jack.kadir/" target="_blank" rel="noopener noreferrer" className="contact-link">Instagram</a>
        </div>
      </div>
    </section>
  );
};

/* Calculator Component */
const Calculator = () => {
  const defaultValues = {
    netAmount: 100000,
    membersCount: 20,
    askedValue: 8000,
  };

  const [netAmount, setNetAmount] = useState(defaultValues.netAmount);
  const [membersCount, setMembersCount] = useState(defaultValues.membersCount);
  const [askedValue, setAskedValue] = useState(defaultValues.askedValue);
  const [isEditing, setIsEditing] = useState(false);
  const [result, setResult] = useState(null);

  // Load saved values from localStorage on component mount
  useEffect(() => {
    const savedValues = JSON.parse(localStorage.getItem('chitFundValues'));
    if (savedValues) {
      setNetAmount(savedValues.netAmount);
      setMembersCount(savedValues.membersCount);
      setAskedValue(savedValues.askedValue);
    }
  }, []);

  // Handle saving edited values to localStorage
  const handleSave = () => {
    const values = {
      netAmount,
      membersCount,
      askedValue,
    };
    localStorage.setItem('chitFundValues', JSON.stringify(values));
    setIsEditing(false);
  };

  // Handle resetting values to default
  const handleReset = () => {
    setNetAmount(defaultValues.netAmount);
    setMembersCount(defaultValues.membersCount);
    setAskedValue(defaultValues.askedValue);
    setResult(null);
    localStorage.removeItem('chitFundValues');
  };

  // Handle calculation of the result
  const handleCalculate = () => {
    const calculatedResult = (Number(netAmount) - Number(askedValue)) / Number(membersCount);
    setResult(calculatedResult.toFixed(2));
  };

  return (
    <div className="calculator">
      <div className="input-group">
        <label>Net Amount:</label>
        <input
          type="number"
          value={netAmount}
          onChange={(e) => setNetAmount(e.target.value)}
          disabled={!isEditing}
        />
      </div>
      <div className="input-group">
        <label>Members Count:</label>
        <input
          type="number"
          value={membersCount}
          onChange={(e) => setMembersCount(e.target.value)}
          disabled={!isEditing}
        />
      </div>
      <div className="input-group">
        <label>Asked Value:</label>
        <input
          type="number"
          value={askedValue}
          onChange={(e) => setAskedValue(e.target.value)}
          disabled={!isEditing}
        />
      </div>
      <div className="button-group">
        {!isEditing ? (
          <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
        ) : (
          <button className="save-btn" onClick={handleSave}>Save</button>
        )}
        <button className="reset-btn" onClick={handleReset}>Reset</button>
      </div>
      <div className="result-section">
        <div className="result">
          <p>Result: {result !== null ? result : 'N/A'}</p>
        </div>
        <button className="calculate-btn" onClick={handleCalculate} disabled={isEditing}>
          Calculate
        </button>
      </div>
    </div>
  );
};

export default App;

// src/components/ContactCard.js

import React from 'react';
import './ContactCard.css';

const ContactCard = ({ name, email, phone, linkedin }) => {
  return (
    <div className="contact-card">
      <h3>{name}</h3>
      <p>Email: <a href={`mailto:${email}`}>{email}</a></p>
      <br></br>
      <p>Phone: <a href={`tel:${phone}`}>{phone}</a></p>
      <br></br>
      <p>LinkedIn: <a href={linkedin} target="_blank" rel="noopener noreferrer">{linkedin}</a></p>
    </div>
  );
};

export default ContactCard;

// src/components/ContactUs.js

import React from 'react';
import ContactCard from './ContactCard';
import './ContactUs.css';

const teamMembers = [
  {
    name: 'Ishi Vashishtha',
    email: 'ishivashishtha@gmail.com',
    phone: '9219234454',
    linkedin: 'https://www.linkedin.com/in/ishivashishtha',
  },
  {
    name: 'Pavitra Patil',
    email: 'pavitrapatil@gmail.com',
    phone: '9219234455',
    linkedin: 'https://www.linkedin.com/in/pavitapatil',
  },
  {
    name: 'Disha Tangade',
    email: 'dishatangade@gmail.com',
    phone: '9219234456',
    linkedin: 'https://www.linkedin.com/in/dishatangade',
  },
];

const ContactUs = () => {
  return (
    <div className="contact-us">
      {teamMembers.map((member, index) => (
        <ContactCard
          key={index}
          name={member.name}
          email={member.email}
          phone={member.phone}
          linkedin={member.linkedin}
        />
      ))}
    </div>
  );
};

export default ContactUs;

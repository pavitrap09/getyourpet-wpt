import React, { Component } from 'react';
import './AboutUs.css';

class AboutUs extends Component {
  render() {
    return (
      <div className="about-us">
        <header className="about-us-header">
          <h1>About Us</h1>
          <p id="p1">Welcome to Get Your Pet</p>
        </header>
        <section className="about-us-content">
          <h2>Our Mission</h2>
          <p>
            At Get Your Pet, our mission is to connect loving families with their perfect pets. We are dedicated to providing healthy, happy pets and exceptional customer service to ensure every pet finds a forever home.
          </p>

          <h2>Our History</h2>
          <p>
            Get Your Pet was born out of a shared passion for animals and a commitment to enhancing the bond between pets and their owners. Since our founding as a college project, we have grown into a trusted name in the pet industry, remaining true to our roots and values.
          </p>

          <h2>Meet Our Team</h2>
          
          <p>
            Our team is a group of dedicated animal lovers who work tirelessly to ensure the well-being of every pet that comes through our doors. With a focus on compassion and excellence, we strive to provide the best possible care and support for both pets and their new families.
          </p>

          <div className="leadership">
            <div className="leader">
              <h3>Compassionate Care</h3>
              <p>
                Our team provides compassionate care to all pets, ensuring they are healthy and happy before joining their new families.
              </p>
            </div>
            <div className="leader">
              <h3>Expertise and Knowledge</h3>
              <p>
                We bring a wealth of knowledge and experience in pet care, guiding our customers to make informed decisions about their new companions.
              </p>
            </div>
            <div className="leader">
              <h3>Customer Support</h3>
              <p>
                We are dedicated to providing ongoing support and advice to our customers, helping to foster strong, loving relationships between pets and their owners.
              </p>
            </div>
          </div>

          <h2>Our Values</h2>
          <ul>
            <li>Compassion</li>
            <li>Responsibility</li>
            <li>Customer Satisfaction</li>
            <li>Community</li>
          </ul>

          <h2>Contact Us</h2>
          <p>
            We would love to hear from you! Reach out to us at{' '}
            <a href="mailto:info@getyourpet.com">info@getyourpet.com</a> or call us at (123) 456-7890.
          </p>
        </section>
      </div>
    );
  }
}

export default AboutUs;

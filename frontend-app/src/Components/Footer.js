// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from '../Images/logo.jpeg';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-col">
          <Link to="/" className="footer-heading-link">
            <img src={logo} alt="Logo" className="footer-logo" />
          </Link>
        </div>
        <div className="footer-col">
          <Link to="/contact" className="footer-heading-link">
            <h3 className="text-office">
              Office
              <div className="underline">
                <span />
              </div>
            </h3>
          </Link>
          <p>CDAC</p>
          <p>KHARGHAR NAVI MUMBAI</p>
          <p className="email">getyourpet@gmail.com</p>
          <p className="phone">+92 304 110 0028</p>
        </div>
        <div className="footer-col">
          <Link to="/about" className="footer-heading-link">
            <h3>
              Menu
              <div className="underline">
                <span />
              </div>
            </h3>
          </Link>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/team">Our Team</Link></li>
            <li><Link to="/testimonials">Testimonials</Link></li>
          </ul>
        </div>
        <div className="social-icons">
          <a href="#"><i className="fa-brands fa-facebook" /></a>
          <a href="#"><i className="fa-brands fa-instagram" /></a>
          <a href="#"><i className="fa-brands fa-youtube" /></a>
          <a href="#"><i className="fa-brands fa-google-plus" /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

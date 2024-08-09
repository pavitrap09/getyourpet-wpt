
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">GETYOURPET</div>
      </div>
      <div className="navbar-center">
        <ul className="navbar-menu">
          <li className="navbar-item"><Link to="/">Home</Link></li>
          <li className="navbar-item"><Link to="/about">About</Link></li>
          <li className="navbar-item"><Link to="/contact">Contact Us</Link></li>
          {token ? (
            <>
              <li className="navbar-item"><Link to="/account">Account</Link></li>
              <li className="navbar-item"><button onClick={handleLogout} className="logout-button">Logout</button></li>
              <li className="navbar-item sell-button"><Link to="/sell">Sell</Link></li>
            </>
          ) : (
            <>
              <li className="navbar-item"><Link to="/login">Login</Link></li>
              <li className="navbar-item"><Link to="/signup">Sign Up</Link></li>
            </>
          )}
        </ul>
      </div>
      <div className="navbar-right">
        <div className="navbar-search">
          <input type="text" placeholder="Search..." className="search-input" />
          <button className="search-button">Search</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

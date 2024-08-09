import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/items');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const handleAdvertiseClick = (id) => {
    navigate(`/advertise/${id}`);
  };

  return (
    <div className="home-container">
      <h1>Welcome to GetYourPet</h1>
      <div className="card-container">
        {items.length > 0 ? (
          items.map((item) => (
            <div key={item._id} className="card" onClick={() => handleAdvertiseClick(item._id)}>
              <img 
                src={`http://localhost:5000/${item.image}`} 
                alt={item.title} 
                className="card-image"
              />
              <div className="card-details">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <p>Price: {item.price}</p>
                {item.contact && (
                  <div className="contact-details">
                    <p>Contact Name: {item.contact.name}</p>
                    <p>Contact Email: {item.contact.email}</p>
                    <p>Contact Phone: {item.contact.phone}</p>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No animals listed yet.</p>
        )}
      </div>
    </div>
  );
};

export default Home;

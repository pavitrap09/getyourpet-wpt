import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Advertise.css';

const Advertise = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/items/${id}`);
        setItem(response.data);
      } catch (error) {
        console.error('Error fetching item:', error);
      }
    };

    fetchItem();
  }, [id]);

  const handleChatClick = () => {
    navigate(`/chat/${item.contact.id}`);
  };

  return (
    <div className="advertise-container">
      {item ? (
        <>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <p>Price: {item.price}</p>
          {item.image && (
            <img src={`http://localhost:5000/${item.image}`} alt={item.title} className="advertise-image" />
          )}
          {item.contact && (
            <div className="contact-details">
              <h3>Contact Information</h3>
              <p>Name: {item.contact.name}</p>
              <p>Email: {item.contact.email}</p>
              <p>Phone: {item.contact.phone}</p>
              <button onClick={handleChatClick} className="chat-button">
                Chat with Owner
              </button>
            </div>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Advertise;
